# Blue-10 sign-off — Moonboy (hl-bot-v2) imported as Paper Perps Desk Book B

Date: 2026-11-16 · Task: Sneaks — "import the hl moonboy bot see if that helps that repo"
Status: DONE / RUNNING · PAPER ONLY (Moonboy live trading NOT APPROVED, unchanged)

## What shipped

- **Vendor import (VERIFIED):** `0xSneaks/hl-bot-v2` cloned read-only to
  `~/workspace/paper-perps-desk/vendor/hl-bot-v2/` @ HEAD
  `d71fdc22308d34d987ffae038e1803c1a91b75a9` — matches the GitHub remote HEAD
  (gh-rest) and the Wall Street spec's locked commit. Nothing in vendor/ modified.
- **Logic audit:** `~/workspace/paper-perps-desk/MOONBOY.md` — every claim
  VERIFIED-from-code: setup score formula (regime 25 + TF agreement 25 + ADX
  cap 10 + momentum 10 + structure 10 + funding/crowding, minus extension
  penalties; tops out ~85), smart_score = (week+month ROI)x100 - leverage/
  stress penalties, STRONG CONFLUENCE = setup score >=60 AND >=2 tracked
  whales with >=$500k positions same coin/side (services/correlation.py),
  alert bar MIN_SCORE_FOR_ALERT=80 (config/settings.py code default).
  All signal inputs are Hyperliquid PUBLIC endpoints (candles,
  metaAndAssetCtxs, leaderboard, clearinghouseState per wallet). The Grok
  layer writes rationale prose only; levels are deterministic (entry = 4h
  close, stop = 1.4xATR(4h), TPs 2/3/4R) with a coded local fallback.
- **Book B engine:** `moonboy_book.py` — stdlib-only faithful port of the
  bot's deterministic core (indicators, confluence score, crowding,
  smart_score, whale join), running the bot's documented fallback mode.
  Separate $10,000 paper account; Book A desk rules (1% risk, signal stop,
  2R target, max 1 position, 4/day, -3% halt, 0.045%+0.02% costs, live
  funding, 5x liq model). Trades only on score >=80 setups or STRONG
  CONFLUENCE on SOL; bot cooldowns 240m/180m. Eval every 300s (bot coin
  cycle) -> `ledger_moonboy.jsonl` SIGNAL_EVAL entries, traded or not.
  Phase 2 coins (BTC/ETH/HYPE/XRP/ZEC clusters seen live) logged, not traded.
- **Scorecard:** SCORECARD.md now carries Book B + an A/B table + a verdict
  line that stays blank until both books have >=5 closed trades. Book A's
  engine.py got a 5-line display-only append in write_scorecard; no Book A
  logic/state/numbers changed (restart verified: $10,000 flat, PID 1773).

## Live proof

- Book B running durably: PID 1776 (`moonboy.pid`), ticking, feed via env-proxy.
- First live evals (12:52 + 12:57 UTC): SOL score **59.5**, short (4h lean -3,
  trend down, ADX 55.4, RSI 34); **4 tracked whales short SOL >=$500k**,
  combined smart +279.9, quality floor PASS -> **OBSERVED_NOT_TRADED**:
  0.5 points under the 60 confluence floor. The join works; no signal faked.
- Book A: PID 1773, $10,000.00 flat. Book B: $10,000.00 flat, 0 trades.

## Gaps stated plainly

- Vendor app as-is cannot boot here (aiohttp + python-telegram-bot missing;
  needs Telegram token + paywall address) — delivery/billing shell, not
  signal logic; Book B does not need it.
- OI crowding modifier is neutral until Book B builds >=60/240 min of its
  own SOL OI history (same cold start as the bot's own DB).
- Eval takes ~45s through the egress proxy (62 wallet fetches); fits the
  300s cadence.
