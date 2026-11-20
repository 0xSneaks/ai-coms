import type { Asset } from '../config/pairs';
import { RISK, type RiskConfig } from '../config/risk';
import { streakCreditBonus } from './math';
import type { StakeCurrency } from './currency';
import { bookExposure, checkCaps, defaultCaps, multiplierFor, type BookBet } from './risk';
import { localKV, type KV } from './store';
import type { Interval, Position, Side, TicketSize } from './types';

export type LedgerState = {
  userId: string;
  streak: number;
  boardPoints: number;
  positions: Position[];
};

export type PlaceFail = 'insufficient' | 'e-round' | 'e-asset' | 'halted' | 'duplicate';
export type PlaceResult = { ok: true; position: Position } | { ok: false; reason: PlaceFail };

const STATE_PREFIX = 'uod.ledger.v1.';

function loadState(kv: KV, userId: string): LedgerState {
  try {
    const raw = kv.get(STATE_PREFIX + userId);
    if (!raw) return { userId, streak: 0, boardPoints: 0, positions: [] };
    const parsed = JSON.parse(raw) as LedgerState;
    return {
      userId,
      streak: parsed.streak ?? 0,
      boardPoints: parsed.boardPoints ?? 0,
      positions: parsed.positions ?? [],
    };
  } catch {
    return { userId, streak: 0, boardPoints: 0, positions: [] };
  }
}

/**
 * Play-credit game ledger. All balance changes go through StakeCurrency.
 * No on-chain or cash movements live here.
 */
export class GameLedger {
  constructor(
    private readonly currency: StakeCurrency,
    private userId: string,
    private readonly opts: { kv?: KV; risk?: RiskConfig } = {},
  ) {}

  private kv(): KV {
    return this.opts.kv ?? localKV();
  }

  private save(state: LedgerState): void {
    this.kv().set(STATE_PREFIX + this.userId, JSON.stringify(state));
  }

  setUser(userId: string): void {
    this.userId = userId;
  }

  getUserId(): string {
    return this.userId;
  }

  getCurrency(): StakeCurrency {
    return this.currency;
  }

  balance(): number {
    return this.currency.getBalance(this.userId);
  }

  claimDaily(nowMs: number) {
    return this.currency.applyDailyGrant(this.userId, nowMs);
  }

  claimStatus(nowMs: number) {
    return this.currency.claimStatus(this.userId, nowMs);
  }

  state(): LedgerState {
    const s = loadState(this.kv(), this.userId);
    s.userId = this.userId;
    return s;
  }

  liveBets(asset: Asset, interval: Interval, windowStart: number): BookBet[] {
    return this.state()
      .positions.filter(
        (p) => p.asset === asset && p.interval === interval && p.windowStart === windowStart,
      )
      .map((p) => ({
        side: p.side,
        stake: p.stake,
        multiplier: multiplierFor(p.side, p.yesAsk, p.noAsk),
        status: p.status,
      }));
  }

  assetLiveBets(asset: Asset): BookBet[] {
    return this.state()
      .positions.filter((p) => p.asset === asset)
      .map((p) => ({
        side: p.side,
        stake: p.stake,
        multiplier: multiplierFor(p.side, p.yesAsk, p.noAsk),
        status: p.status,
      }));
  }

  placeTicket(args: {
    asset: Asset;
    interval: Interval;
    windowStart: number;
    side: Side;
    stake: TicketSize;
    yesAsk: number;
    noAsk: number;
    nowMs: number;
    /** When true, new tickets are rejected (feed stale / vol spike). */
    halted?: boolean;
    id?: string;
  }): PlaceResult {
    if (args.halted) return { ok: false, reason: 'halted' };
    const id = args.id ?? `${this.userId}:${args.asset}:${args.interval}:${args.windowStart}:${args.nowMs}:${args.side}:${args.stake}`;
    const existing = this.state().positions.find((p) => p.id === id);
    if (existing) return { ok: false, reason: 'duplicate' };

    const next: BookBet = {
      side: args.side,
      stake: args.stake,
      multiplier: multiplierFor(args.side, args.yesAsk, args.noAsk),
      status: 'open',
    };
    const caps = defaultCaps(this.opts.risk ?? RISK);
    const cap = checkCaps(this.liveBets(args.asset, args.interval, args.windowStart), next, {
      eRound: caps.eRound,
      eAsset: caps.eAsset,
      assetBook: this.assetLiveBets(args.asset),
    });
    if (!cap.ok) return { ok: false, reason: cap.reason };

    const debited = this.currency.tryDebit(this.userId, args.stake, `ticket ${args.asset} ${args.side}`, `debit:${id}`);
    if (!debited) return { ok: false, reason: 'insufficient' };

    const pos: Position = {
      id,
      userId: this.userId,
      asset: args.asset,
      interval: args.interval,
      windowStart: args.windowStart,
      side: args.side,
      stake: args.stake,
      yesAsk: args.yesAsk,
      noAsk: args.noAsk,
      placedAt: args.nowMs,
      status: 'open',
    };
    const s = this.state();
    s.positions.push(pos);
    this.save(s);
    return { ok: true, position: pos };
  }

  markPending(id: string): void {
    const s = this.state();
    const p = s.positions.find((x) => x.id === id);
    if (p && p.status === 'open') {
      p.status = 'pending-confirm';
      this.save(s);
    }
  }

  /**
   * Settle a ticket. Idempotent: repeating the same result is a no-op and
   * will not credit twice. A void refunds the stake.
   */
  resolve(id: string, result: 'up' | 'down' | 'void'): Position | undefined {
    const s = this.state();
    const p = s.positions.find((x) => x.id === id);
    if (!p) return undefined;

    const terminal =
      result === 'void' ? 'refunded' : p.side === result ? 'won' : 'lost';
    if (p.status === 'won' || p.status === 'lost' || p.status === 'refunded') {
      return p;
    }
    if (p.status !== 'open' && p.status !== 'pending-confirm') return p;

    if (terminal === 'refunded') {
      this.currency.credit(this.userId, p.stake, `refund ${p.asset}`, `refund:${id}`);
      p.status = 'refunded';
      p.payout = p.stake;
      this.save(s);
      return p;
    }

    const won = terminal === 'won';
    if (won) {
      const ask = p.side === 'up' ? p.yesAsk : p.noAsk;
      const base = p.stake * (100 / ask);
      const bonus = streakCreditBonus(s.streak + 1);
      const payout = Math.round(base * (1 + bonus));
      this.currency.credit(this.userId, payout, `payout ${p.asset}`, `payout:${id}`);
      p.status = 'won';
      p.payout = payout;
      s.streak += 1;
      s.boardPoints += Math.round(p.stake * (s.streak >= 5 ? 2 : 1));
    } else {
      p.status = 'lost';
      p.payout = 0;
      s.streak = 0;
    }
    this.save(s);
    return p;
  }

  openFor(asset: Asset, interval: Interval, windowStart: number): Position | undefined {
    return this.state().positions.find(
      (p) =>
        (p.status === 'open' || p.status === 'pending-confirm') &&
        p.asset === asset &&
        p.interval === interval &&
        p.windowStart === windowStart,
    );
  }

  resultsFor(asset: Asset, interval: Interval): Position[] {
    return this.state()
      .positions.filter((p) => p.asset === asset && p.interval === interval)
      .sort((a, b) => b.placedAt - a.placedAt);
  }

  windowVolume(asset: Asset, interval: Interval, windowStart: number): number {
    return this.state()
      .positions.filter(
        (p) => p.asset === asset && p.interval === interval && p.windowStart === windowStart,
      )
      .reduce((n, p) => n + p.stake, 0);
  }

  exposure(asset: Asset, interval: Interval, windowStart: number) {
    return bookExposure(this.liveBets(asset, interval, windowStart));
  }
}
