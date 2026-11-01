# Handoff — muse → claude-code — 2026-11-01 04:07 ET — HL×Kalshi brain: fair-value model build

**Sneaks's ruling (2026-11-01 03:50 ET) — the architecture:**
- HLBOTV2 = the eyes (Hyperliquid whale tracking, multi-timeframe setups, funding/OI, confluence scoring; read-only, never trades).
- kalshi-trader = the hands (execution only, behind kill switch / preview→approval / Face ID-signed prod approvals / $25 caps / audit log).
- hl-intel-bot = retired, do not merge.
- The bridge is Kalshi's BTC markets: KXBTC (range) + KXBTCD (above/below), where HL perp signals map.
- What's missing is the brain. **Builder split set by Sneaks:** mapper, paper mode, P&L ledger → Muse's side (in flight now); **the fair-value model and anything touching gates/signing → Claude Code, with independent review.**

**Your deliverable: the fair-value model.**
- Purpose: given BTC spot, a Kalshi strike, and time to expiry, estimate P(BTC above the strike at expiry) honestly enough that edge = model_prob − Kalshi ask − fees means something.
- Inputs available: spot (Coinbase public), realized vol / ATR from candle history (1m/5m), time-to-expiry in seconds, strike.
- Interface contract (Muse's side is being built to this now): a pure function `prob_above(spot, strike, tte_seconds, vol) -> float in [0,1]` — no I/O, no trading code, no signing code. A pure vol-estimator function from candles is welcome alongside it.
- Deliver as `projects/kalshi-brain/fairvalue_model.py` plus its tests in this repo (ai-coms) so Muse can integrate it and the crew can read it. If you'd rather build in a code repo, name it and Muse will pull from there.

**Acceptance bar:**
1. Sanity against the Black-Scholes digital (cash-or-nothing) value on synthetic inputs, within a stated tolerance, with the comparison in the tests.
2. Monotonicity, tested: probability falls as strike rises (for "above"), behaves correctly as TTE shrinks ATM, tends to 0/1 far ITM/OTM.
3. Vol estimator documented: window, annualization, behavior on thin/flat data.
4. Every assumption in writing in the module (distribution choice, drift treatment, why). Known weaknesses (jump risk, expiry-minute effects) named in the docstring, not hidden.
5. No dependency on the executor, the signing path, or any credential. The model advises; it never places anything.

**Review:** after Muse integrates it behind the interface, Claude (evaluator) reviews the integrated brain before any live use, per Sneaks's split. Muse will also run a historical calibration check (model probabilities vs settled hourly BTC outcomes) as the paper scoreboard's first dataset.

**Context that shapes the model:** HLBOTV2 signals are 1h/4h reads, so the mapped markets are hourly/daily KXBTCD — be honest at those horizons; do not tune for the 15-minute series. Signal shape (from Muse's recon): setup records carry coin, 0–100 confluence score, direction (long/short — neutral produces no setup), entry/stop/targets, a high/med/low confidence label, and a crowding block (ΔOI, funding). Full field list available on request.

**Explicitly not in scope:** the time-boxed budget-approval idea (Sneaks has not ruled on it — nothing on the signing path gets designed until he does), any executor change, any live fire.

**Ask:** confirm you'll take it, where you'll deliver it, and anything you need from Muse's side — interface changes included; the contract above is a draft until you answer.
