/**
 * Stake currency is abstracted so the rest of the engine never assumes a
 * particular unit. The only implementation is play-credits.
 *
 * v1 ships on play-credits. SOL stakes are parked for v2 — do not add a
 * SOL (or any on-chain) deposit, escrow, payout, or stake flow, not even
 * a stub that moves funds. Credits are never sold and never cashed out.
 */

import { localKV, type KV } from './store';

export type CurrencyId = 'play-credits';

export type ClaimStatus = {
  canClaim: boolean;
  reason: 'ready' | 'claimed' | 'capped';
  grant: number;
  day: string;
};

export type CreditResult = { applied: boolean; balance: number };

export interface StakeCurrency {
  readonly id: CurrencyId;
  readonly displayName: string;
  readonly symbol: string;
  readonly cashable: false;
  readonly purchasable: false;
  getBalance(userId: string): number;
  claimStatus(userId: string, nowMs: number): ClaimStatus;
  /** Claim the daily grant once per UTC day. Idempotent. Soft cap 2,000. */
  applyDailyGrant(userId: string, nowMs: number): CreditResult & { granted: number };
  /** Debit a play-credit ticket. Idempotent when `opId` is supplied. */
  tryDebit(userId: string, amount: number, memo: string, opId?: string): boolean;
  /** Credit a payout, refund, or grant. Idempotent when `opId` is supplied. */
  credit(userId: string, amount: number, memo: string, opId?: string): CreditResult;
}

export const DAILY_GRANT = 200;
export const SOFT_CAP = 2000;

type LedgerFile = {
  balances: Record<string, number>;
  lastGrantUtcDay: Record<string, string>;
  ops: Record<string, number>;
};

export function utcDay(nowMs: number): string {
  return new Date(nowMs).toISOString().slice(0, 10);
}

function emptyFile(): LedgerFile {
  return { balances: {}, lastGrantUtcDay: {}, ops: {} };
}

function load(kv: KV, key: string): LedgerFile {
  try {
    const raw = kv.get(key);
    if (!raw) return emptyFile();
    const parsed = JSON.parse(raw) as Partial<LedgerFile>;
    return {
      balances: parsed.balances ?? {},
      lastGrantUtcDay: parsed.lastGrantUtcDay ?? {},
      ops: parsed.ops ?? {},
    };
  } catch {
    return emptyFile();
  }
}

export function createPlayCredits(opts?: { storageKey?: string; kv?: KV }): StakeCurrency {
  const storageKey = opts?.storageKey ?? 'uod.credits.v1';
  const kv = opts?.kv ?? localKV();
  const read = () => load(kv, storageKey);
  const write = (f: LedgerFile) => kv.set(storageKey, JSON.stringify(f));

  const api: StakeCurrency = {
    id: 'play-credits',
    displayName: 'Play credits',
    symbol: 'cr',
    cashable: false,
    purchasable: false,
    getBalance(userId) {
      return read().balances[userId] ?? 0;
    },
    claimStatus(userId, nowMs) {
      const file = read();
      const day = utcDay(nowMs);
      if (file.lastGrantUtcDay[userId] === day) {
        return { canClaim: false, reason: 'claimed', grant: 0, day };
      }
      const bal = file.balances[userId] ?? 0;
      if (bal >= SOFT_CAP) {
        return { canClaim: false, reason: 'capped', grant: 0, day };
      }
      return { canClaim: true, reason: 'ready', grant: Math.min(DAILY_GRANT, SOFT_CAP - bal), day };
    },
    applyDailyGrant(userId, nowMs) {
      const day = utcDay(nowMs);
      const opId = `grant:${userId}:${day}`;
      const file = read();
      const bal = file.balances[userId] ?? 0;
      if (file.ops[opId] != null || file.lastGrantUtcDay[userId] === day) {
        return { applied: false, granted: 0, balance: bal };
      }
      if (bal >= SOFT_CAP) {
        file.lastGrantUtcDay[userId] = day;
        file.ops[opId] = 0;
        write(file);
        return { applied: true, granted: 0, balance: bal };
      }
      const granted = Math.min(DAILY_GRANT, SOFT_CAP - bal);
      file.balances[userId] = bal + granted;
      file.lastGrantUtcDay[userId] = day;
      file.ops[opId] = granted;
      write(file);
      return { applied: true, granted, balance: file.balances[userId]! };
    },
    tryDebit(userId, amount, _memo, opId) {
      if (amount <= 0 || !Number.isFinite(amount)) return false;
      const file = read();
      if (opId && file.ops[opId] != null) return true; // already applied
      const bal = file.balances[userId] ?? 0;
      if (bal < amount) return false;
      file.balances[userId] = bal - amount;
      if (opId) file.ops[opId] = -amount;
      write(file);
      return true;
    },
    credit(userId, amount, _memo, opId) {
      const file = read();
      const bal = file.balances[userId] ?? 0;
      if (opId && file.ops[opId] != null) return { applied: false, balance: bal };
      if (amount <= 0 || !Number.isFinite(amount)) return { applied: false, balance: bal };
      file.balances[userId] = bal + amount;
      if (opId) file.ops[opId] = amount;
      write(file);
      return { applied: true, balance: file.balances[userId]! };
    },
  };
  return api;
}
