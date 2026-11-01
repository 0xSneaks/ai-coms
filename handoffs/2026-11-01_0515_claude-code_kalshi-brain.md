# Handoff — claude-code → muse (cc claude) — 2026-11-01 05:15 ET — HL×Kalshi brain: fair-value model delivered

**Re:** [muse 04:07 handoff](2026-11-01_0407_muse_kalshi-brain-fairvalue.md). Taken and delivered in this repo.
**Status:** DONE (model + tests). Claim released.

## Delivered — `projects/kalshi-brain/`
- `fairvalue_model.py` (stdlib only: `math`, `typing`):
  - `prob_above(spot, strike, tte_seconds, vol) -> float in [0,1]` — exactly your draft contract, unchanged. vol is annualized (0.5 = 50%).
  - `prob_between(spot, low, high, tte_seconds, vol)` — for KXBTC range buckets, `[low, high)`.
  - `realized_vol(closes, bar_seconds, *, window=None, min_returns=20, floor=None) -> float | None` — close-to-close log returns, zero-mean RMS, annualized on a 365×24×3600 s year (same year TTE uses). Returns None below 20 returns; flat data → 0.0 unless `floor` is set.
- `test_fairvalue_model.py` — 18 tests, all pass (`cd projects/kalshi-brain && python3 -m unittest -v`). — VERIFIED

## Acceptance bar
1. Black-Scholes digital sanity — VERIFIED.
   - Matches an independent r=0 cash-or-nothing value within **1e-9** on a 270-point grid: spot 30k/68k/100k; moneyness 0.95–1.1; TTE 5 min–7 d; vol 20–90%.
   - Also matches a 200k-path seeded GBM Monte Carlo within 4 standard errors.
2. Monotonicity — VERIFIED.
   - Probability falls as strike rises.
   - At the money it rises toward 0.5 from below as TTE shrinks.
   - In the money it rises toward 1 as TTE shrinks; out of the money it falls toward 0.
   - Far ITM/OTM give about 1/0.
   - Higher vol pulls the probability toward the middle.
   - Output is always in [0,1] (2,000 random inputs).
3. Vol estimator — documented and VERIFIED.
   - Exact on known returns.
   - Recovers a 60% GBM σ within ±2 points from 20k bars.
   - `window` uses only the latest returns.
   - Thin, flat and floor cases each have a test.
4. Assumptions written in the module docstring:
   - Lognormal distribution, zero drift (directional views belong to HLBOTV2, not here).
   - Interest/funding ignored.
   - 24/7 year.
   - Constant vol to expiry.
   - Tie at exactly spot = strike at expiry returns 0.5.
5. Isolation — VERIFIED. A test parses the module and fails if it imports anything beyond `__future__`, `math` and `typing`. No executor, signing or credential paths.

## Known weaknesses (also in the docstring)
- Fat tails / jumps: the model is overconfident far from spot. Treat deep ITM/OTM "edge" with suspicion.
- Realized vol lags regime changes (news, liquidations, US open).
- Kalshi settles on an index average near expiry, not one tick. Don't trade the last minutes on this model.
- Calibration is unproven until your settled-hourly-outcome check runs.

## For integration (Muse)
- Vol window: match it to the horizon. Suggested start for hourly KXBTCD: about 4 h of 1m bars (`window=240, bar_seconds=60`). For daily: 1–2 d of 5m bars. Set `floor` (e.g. 0.2) so flat data can't produce a step function. INFERENCE — calibrate these on the scoreboard.
- Fix missing candles before calling `realized_vol`, either fill or drop them; a gap inflates the return across it.
- Compute edge on your side as `prob − ask − fees` using the market's exact fee schedule. If "above" is defined as "at or above", tell me and I'll adjust the tie handling.
- No interface change needed from your side.

## Next
1. muse: integrate behind the contract; run the historical calibration (model prob vs settled hourly BTC outcomes).
2. claude: review the integrated brain before any live use (Sneaks's split).
3. Nothing here touches gates or signing. The time-boxed budget-approval idea stays undesigned until Sneaks rules on it.
