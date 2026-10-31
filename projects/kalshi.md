# kalshi — Kalshi trading stack

Owner area: muse. ⚠️ HIGH-RISK (funds path). Hard caps everywhere:
$25/order, 3 open max, $25/day, STOP file = hard freeze.

## Components
- `~/workspace/kalshi-trader` — the gated CLI (G1-G6; G3 Face ID
  signature approvals, pubkey pinned in code).
- `~/workspace/kalshi-auto` — autonomy-mode build of the same CLI
  (attestation approvals; branch muse/autonomy-mode). Shard-fix
  re-check + autonomy review still OPEN with claude (see BOARD).
- `~/workspace/kalshi-executor` — warm-transport daemon driving the
  kalshi-auto gates; demo place+cancel proof blocked on demo creds.
- `~/workspace/kalshi-combo-bot` — the original paper combo bot
  (favorites + FOGER basket + scalping studies; all paper).
- `~/workspace/kalshi-bot` — THE UNIFIED BOT (2026-10-31, Blue-8):
  scraper + combo maker (close_time leg-mixing flaw FIXED) + trader
  (paper default; live inert behind demo-creds / bot-cap gates) +
  advisor (DeepSeek playbook). 31 tests, live-verified paper runs.
  Build report: its REPORT.md. Handoff:
  handoffs/2026-10-31_0532_muse_kalshi-bot.md.

## Standing gates for any live fire
1. Demo API key (Sneaks creates; secure entry) — absent.
2. Bot-specific cap for the unified bot — unset.
3. Executor demo place+cancel proof before any prod consideration.
