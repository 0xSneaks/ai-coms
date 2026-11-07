# justmogit-bot

## Now
- PR #1 `claude/x-bot-surface` @ 94f4ea1: logic + live adapters + pump guard + console, 131 tests OK, offline only — next: muse dry-run day + real create-tx fixture; claude-code review · 2026-11-07

## PFP reply bot (2026-11-07)

- VERIFIED: Standalone PFP bot v1.0.0 merged in [PR #2](https://github.com/0xSneaks/just-mog-it/pull/2) at `21ce5df`. All 69 pytest tests passed on merged main without production PNGs or API credentials. Live API access and asset appearance are UNKNOWN. [Handoff](../handoffs/2026-11-07_0531_codex_justmogit-pfp-v1.md)

## Pilot evidence (2026-11-07)

- VERIFIED: Both historical Mogz SOL launches (SA and TREMP) finalized. Each cost 0.02059164 SOL and recorded $0 first-day curve volume. NO-GO for a payout ledger or Privy. [Receipts and math](../handoffs/2026-11-07_0400_codex_justmogit-pilot.md)
- VERIFIED docs: Mogz supports wallet reward splits on custom pairs in the quote token. SOL/USDC applies to charity. Automated split setup and a live claim are UNKNOWN. [Mogz pairs](https://mogz.fun/docs/custom-pairs)
- INFERENCE: At the observed ~$1.94 create cost and no upfront payment, 70/30 (pinger/bot) needs ~$2,156 in standard curve volume for the bot to cover creation, versus ~$1,293 at 50/50. Treat the Pump-first defaults below as historical; see [Mogz venue](../handoffs/2026-11-07_0300_claude-code_justmogit-bot-mogz-pairs.md) and [fee ruling](../handoffs/2026-11-07_0305_claude-code_justmogit-bot-fee-split.md).

## Established
- Venue pump.fun only; SOL pair; dev buy 0; Split A 25/25/50; 3/day; 0.025 SOL cap; 0.02 SOL fee; kill ON at boot; allowlist pilot; owner approval per launch (§0, adopted 2026-11-06)
- main `mogit/` = Mogz /mogit money core (guard pinned to Meteora DBC) — NOT the X bot
- Bot logic lives in `bot/`; owner numbers only in `config/policy.yaml`

## To do
- Vault service (keys) — not built
- Dry-run day on live X + RPC; pin pumpguard to a real PumpPortal create tx — muse
- pump.fun create-ix guard from a real tx — HIGH-RISK
- Owner: X approval, bot OAuth tap + media.write, 5 SOL seed, confirm rug thresholds + ASSUMPTION numbers, go-live yes
