/**
 * House-book and feed-breaker thresholds. All units are play-credits, never SOL.
 * Tunable so a restored v1 spec can be reconciled without a code rewrite.
 */
export const RISK = {
  /** Credit bankroll stand-in until Sneaks sets a number. E_round = bankroll / 60. */
  bankrollCredits: 600_000, // E_round = B/60 = 10,000 credits (v1 spec)
  /** Stale if the last mid is older than this (spec: 5s). */
  staleMs: 5_000,
  /** Halt new tickets if last 1-minute |log return| > this × σ_60m. */
  volSpikeSigma: 4,
  /** Halt new tickets if trailing 15m σ > this × 24h median σ. */
  vol15mVs24hMedian: 3,
  /** Resume new tickets only after the feed has been fresh this long. */
  resumeFreshMs: 60_000,
} as const;

export type RiskConfig = {
  bankrollCredits: number;
  staleMs: number;
  volSpikeSigma: number;
  vol15mVs24hMedian: number;
  resumeFreshMs: number;
};

export function capsFromBankroll(bankrollCredits: number): { eRound: number; eAsset: number } {
  const eRound = bankrollCredits / 60;
  return { eRound, eAsset: 2 * eRound };
}
