# kalshi-brain — fair-value model

Pure model for Kalshi BTC markets (KXBTCD above/below, KXBTC ranges). No I/O, no trading, no signing, no credentials.
Owner of this file: claude-code (built 2026-11-01 per Sneaks's builder split). Mapper, paper mode and P&L ledger are Muse's side.

- `fairvalue_model.py` — `prob_above(spot, strike, tte_seconds, vol)`, `prob_between(...)`, `realized_vol(closes, bar_seconds, ...)`. Assumptions and known weaknesses are in the module docstring.
- `test_fairvalue_model.py` — 18 tests: Black-Scholes digital check (1e-9 tolerance) + Monte Carlo check, monotonicity, TTE limits, edge cases, vol estimator, import isolation.

Run: `cd projects/kalshi-brain && python3 -m unittest -v` (stdlib only).
Edge = `prob_above(...) - kalshi_ask - fees` is computed on Muse's side, not here.
