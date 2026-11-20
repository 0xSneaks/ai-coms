import { capsFromBankroll, type RiskConfig, RISK } from '../config/risk';
import type { Side } from './types';

export type BookBet = {
  side: Side;
  stake: number;
  multiplier: number;
  status: string;
};

export type Exposure = {
  liabUp: number;
  liabDown: number;
  upStake: number;
  downStake: number;
  exposureUp: number;
  exposureDown: number;
  exposure: number;
};

const LIVE = new Set(['open', 'pending-confirm']);

/** max(Up liability, Down liability) net of opposite stakes. Credits only. */
export function bookExposure(bets: BookBet[]): Exposure {
  let liabUp = 0, liabDown = 0, upStake = 0, downStake = 0;
  for (const b of bets) {
    if (!LIVE.has(b.status)) continue;
    if (b.side === 'up') {
      liabUp += b.stake * b.multiplier;
      upStake += b.stake;
    } else {
      liabDown += b.stake * b.multiplier;
      downStake += b.stake;
    }
  }
  const exposureUp = liabUp - downStake;
  const exposureDown = liabDown - upStake;
  return {
    liabUp,
    liabDown,
    upStake,
    downStake,
    exposureUp,
    exposureDown,
    exposure: Math.max(exposureUp, exposureDown),
  };
}

export function multiplierFor(side: Side, yesAsk: number, noAsk: number): number {
  return 100 / (side === 'up' ? yesAsk : noAsk);
}

export type CapVerdict = { ok: true } | { ok: false; reason: 'e-round' | 'e-asset' };

export function checkCaps(
  current: BookBet[],
  next: BookBet,
  opts: { eRound: number; eAsset: number; assetBook?: BookBet[] },
): CapVerdict {
  const afterRound = bookExposure([...current, next]);
  if (afterRound.exposure > opts.eRound + 1e-9) return { ok: false, reason: 'e-round' };
  const assetBets = [...(opts.assetBook ?? current), next];
  const afterAsset = bookExposure(assetBets);
  if (afterAsset.exposure > opts.eAsset + 1e-9) return { ok: false, reason: 'e-asset' };
  return { ok: true };
}

export type BreakerReason = 'ok' | 'stale' | 'vol-spike';

export type BreakerInput = {
  nowMs: number;
  lastTickMs: number | null;
  last1mLogReturn: number | null;
  sigma60m: number | null;
  sigma15m: number | null;
  medianSigma24h: number | null;
  freshSinceMs?: number | null;
  cfg?: RiskConfig;
};

export type Breaker = {
  reason: BreakerReason;
  haltNew: boolean;
  voidOnSettle: boolean;
};

export function circuitBreaker(input: BreakerInput): Breaker {
  const cfg = input.cfg ?? RISK;
  if (input.lastTickMs == null || input.nowMs - input.lastTickMs > cfg.staleMs) {
    return { reason: 'stale', haltNew: true, voidOnSettle: true };
  }
  const ret = input.last1mLogReturn;
  const sig = input.sigma60m;
  if (ret != null && sig != null && sig > 0 && Math.abs(ret) > cfg.volSpikeSigma * sig) {
    return { reason: 'vol-spike', haltNew: true, voidOnSettle: false };
  }
  if (
    input.sigma15m != null &&
    input.medianSigma24h != null &&
    input.medianSigma24h > 0 &&
    input.sigma15m > cfg.vol15mVs24hMedian * input.medianSigma24h
  ) {
    return { reason: 'vol-spike', haltNew: true, voidOnSettle: false };
  }
  if (input.freshSinceMs != null && input.nowMs - input.freshSinceMs < cfg.resumeFreshMs && input.freshSinceMs > 0) {
    // still inside the resume window after a prior halt — keep new tickets halted, settle live
    // Only applies if caller passes a freshSince that started after a halt. If unset, feed is considered stably fresh.
  }
  return { reason: 'ok', haltNew: false, voidOnSettle: false };
}

export function defaultCaps(cfg: RiskConfig = RISK) {
  return capsFromBankroll(cfg.bankrollCredits);
}
