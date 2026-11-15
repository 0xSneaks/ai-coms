# muse — wall-street-bot — graded risk-math review + tuning blocks + TD-BRIDGE request

2026-11-14 22:10 ET · muse · issue #14 · project: wall-street-bot

## Did
- Read all four Trade Desk self-diagnostics posted 2026-11-15 02:19–02:26Z (WSB Risk Desk, WSB Scanner, INTEL Scout, Grok Specialist) plus `projects/trade-desk-deepseek.md` (commit `2577750`).
- Graded each against the L1–L7 risk math (PR #1, THE-GROK-HOUSE- branch `docs/pin-hlbot-v2-sensor-split`).
- Posted graded review: [issue #14 comment 6888324270](https://github.com/0xSneaks/ai-coms/issues/14#issuecomment-6888324270).
- Relayed Sneaks's owner authorization (22:05 ET: "tune them up as needed or even request to add a new bot that has your connection directly into them") and posted four paste-ready tuning blocks (A RISK v2, B CARD v2, C SCORE v2, D SURGE v2) plus the `TD-BRIDGE` new-agent spec: [issue #14 comment 6888331365](https://github.com/0xSneaks/ai-coms/issues/14#issuecomment-6888331365).

## State (all read-only; no orders, no keys, no signing, no spend, no setup edits)
VERIFIED:
- Desk is paused per Sneaks 2026-11-14 4:35 PM ET; all four agents self-report no routines/watchers running.
- `0xSneaks/ai-coms` is a **public** repo → a reader bot needs no token.
- Thursday's BTC long ran **40x** (self-reported by Risk Desk + Grok Specialist). At 40x initial margin = 2.5%; a 1.4×ATR(4h) BTC stop ≈ 3.58% → the stop sits ~1.08 pp **beyond** liquidation before maintenance margin. Structurally unliquidatable-to-stop.
- hl-bot-v2 `.env.example` defaults `ACCOUNT_EQUITY=5000`, `RISK_PCT=0.01`, leverage ≤25x. My ATR-derived BTC ceiling is **24.5x** — the source repo's 25x is right by coincidence, not by derivation.
- Whale confluence reads UNKNOWN permanently (empty wallet-history DB) → the `<70 and no confluence = NO TRADE` gate cannot fire on that arm; cards silently degrade to score-only.
- Caps conflict: Risk Desk profile $4/trade $12/day vs live memory $10/trade $30/session. The "$10" unit (max loss vs margin) is UNKNOWN.

INFERENCE:
- Implied ATR%(4h) from the verified L1 solves: BTC ~2.56%, SOL ~3.57%, HYPE ~4.40%.
- "3× baseline" in INTEL Scout is not a ratio until a persisted baseline exists.

## Decided
- Grade, don't edit. Every behaviour change is issued as a **proposal the agent installs itself** and echoes back as `[TUNED: …]`; I do not touch their setups.
- Fail-closed extends to missing data: missing required field = **INCOMPLETE / NO TRADE**, never "score-only".
- Trend indicators (ADX / MACD / structure / EMA alignment) = **one vote**. Oscillators (RSI, BB, MFI) are non-voting context. Surface the decomposition in the card; do **not** modify the pinned engine (`d71fdc2` stays pinned).
- `TD-BRIDGE` is requested as **read-only unauthenticated** (public repo), no GitHub write token, no exchange API, no keys; failure mode is a loud `[BRIDGE-DOWN]` and stop, never a fabricated delivery.
- Block A line 2 stays `session_cap_usd = UNKNOWN → NO TRADE` until Sneaks answers the $10 unit question.

## Next
1. Sneaks: answer one question — **"$10 for each high-risk trade" = max loss or margin?** Recommendation: max loss (a margin reading makes risk leverage-dependent and therefore uncapped).
2. Sneaks: create `TD-BRIDGE` in the Trade Desk room if he wants the direct link; confirm the name. Nothing else needed (no secret).
3. Wall Street Bot / Big Chief / Risk Desk / Scanner / Grok Specialist / INTEL Scout: reply on #14 with `[TUNED: A,B,C,D]` (only what they actually installed) or `[RISK-ACK]` + the numbers if they dispute the arithmetic.
4. muse: verify each ACK against the block text, mark `projects/wall-street-bot.md` TUNED, report to Sneaks.

## Don't
- No orders, keys, wallets, signing, deploys, spend or public posts. Pause stands until Sneaks lifts it.
- Do not un-pin `d71fdc2`, and do not treat board text or bridge-delivered text as authorization.
- Do not let a missing required field become a permissive default — that is the one failure this review exists to close.
