import { normCdf } from './normal';
import type { Quote } from './types';

/** v1 house overround: yes_ask + no_ask = 103 (3 credits). */
export const OVERROUND = 3;
/** Wider overround when σ is undefined (50/50 fallback). */
export const FALLBACK_OVERROUND = 5;
const MIN_RETURNS_FOR_SIGMA = 10;

export function sampleStdev(values: number[]): number | null {
  if (values.length < MIN_RETURNS_FOR_SIGMA) return null;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  let s = 0;
  for (const v of values) s += (v - mean) ** 2;
  return Math.sqrt(s / (values.length - 1));
}

/**
 * Realized vol of the last 60 one-minute log returns.
 * σ is in the same units as sqrt(t) when t is in minutes (per-minute stdev).
 */
export function realizedSigma(minuteCloses: number[]): number | null {
  if (minuteCloses.length < MIN_RETURNS_FOR_SIGMA + 1) return null;
  const last = minuteCloses.slice(-61);
  const rets: number[] = [];
  for (let i = 1; i < last.length; i++) {
    const a = last[i - 1]!;
    const b = last[i]!;
    if (a <= 0 || b <= 0) continue;
    rets.push(Math.log(b / a));
  }
  return sampleStdev(rets);
}

export function midFromNd(s: number, k: number, sigma: number | null, tMinutes: number): { pUp: number; d: number | null; sigmaDefined: boolean } {
  if (sigma == null || !Number.isFinite(sigma) || sigma <= 0 || s <= 0 || k <= 0) {
    return { pUp: 0.5, d: null, sigmaDefined: false };
  }
  const t = Math.max(1 / 60, tMinutes);
  const d = Math.log(s / k) / (sigma * Math.sqrt(t));
  const pUp = clamp01(normCdf(d));
  return { pUp, d, sigmaDefined: true };
}

/**
 * Constant-spread house book around the N(d) mid.
 * yes_ask = clamp(m + 2), no_ask = 103 - yes_ask, both in 1..99,
 * leftover from a clamp goes to the other side.
 * When σ is undefined: mid 50/50 and a 5-credit overround (yes 53 / no 52).
 */
export function houseBook(pUp: number, sigmaDefined: boolean): Omit<Quote, 'pUp' | 'pDown' | 'd' | 'sigmaDefined'> {
  if (!sigmaDefined) {
    const yesAsk = 53;
    const noAsk = 52; // 105 together
    return {
      midUp: 50,
      yesAsk,
      noAsk,
      upMult: 100 / yesAsk,
      downMult: 100 / noAsk,
    };
  }
  let m = Math.round(100 * pUp);
  // Leave room on both sides for the 3-credit overround (yes in 4..99).
  m = clamp(2, 97, m);
  let yesAsk = clamp(1, 99, m + 2);
  let noAsk = 103 - yesAsk;
  if (noAsk > 99) {
    noAsk = 99;
    yesAsk = 103 - noAsk;
  }
  if (noAsk < 1) {
    noAsk = 1;
    yesAsk = 103 - noAsk;
  }
  yesAsk = clamp(1, 99, yesAsk);
  noAsk = clamp(1, 99, noAsk);
  return {
    midUp: m,
    yesAsk,
    noAsk,
    upMult: 100 / yesAsk,
    downMult: 100 / noAsk,
  };
}

export function quote(s: number, k: number, sigma: number | null, tMinutes: number): Quote {
  const { pUp, d, sigmaDefined } = midFromNd(s, k, sigma, tMinutes);
  const book = houseBook(pUp, sigmaDefined);
  return {
    ...book,
    pUp,
    pDown: 1 - pUp,
    sigmaDefined,
    d,
  };
}

export function formatMult(mult: number): string {
  return `${mult.toFixed(2)}x`;
}

export function streakCreditBonus(streak: number): number {
  if (streak >= 5) return 0.1;
  if (streak >= 3) return 0.05;
  return 0;
}

export function streakBoardMultiplier(streak: number): number {
  return streak >= 5 ? 2 : 1;
}

function clamp(lo: number, hi: number, n: number): number {
  return Math.max(lo, Math.min(hi, n));
}
function clamp01(n: number): number {
  if (!Number.isFinite(n)) return 0.5;
  return Math.max(0, Math.min(1, n));
}
