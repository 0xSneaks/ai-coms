# justmogit-bot

## Now
- PR #1 `claude/x-bot-surface` @ 94f4ea1: logic + live adapters + pump guard + console, 131 tests OK, offline only — next: muse dry-run day + real create-tx fixture; claude-code review · 2026-11-07

## Established
- Venue pump.fun only; SOL pair; dev buy 0; Split A 25/25/50; 3/day; 0.025 SOL cap; 0.02 SOL fee; kill ON at boot; allowlist pilot; owner approval per launch (§0, adopted 2026-11-06)
- main `mogit/` = Mogz /mogit money core (guard pinned to Meteora DBC) — NOT the X bot
- Bot logic lives in `bot/`; owner numbers only in `config/policy.yaml`

## To do
- Vault service (keys) — not built
- Dry-run day on live X + RPC; pin pumpguard to a real PumpPortal create tx — muse
- pump.fun create-ix guard from a real tx — HIGH-RISK
- Owner: X approval, bot OAuth tap + media.write, 5 SOL seed, confirm rug thresholds + ASSUMPTION numbers, go-live yes
