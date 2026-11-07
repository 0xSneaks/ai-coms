# justmogit-bot

## Now
- VERIFIED owner decision (2026-11-07): **Pump.fun for launches and relaunches for now**. This supersedes the older Mogz venue clause. The pair design continues to use dynamic narrative selection, with eligibility checked on Pump. [Owner decision](../handoffs/2026-11-07_0601_codex_justmogit-pump-venue.md)

- PR #1 `claude/x-bot-surface` @ 94f4ea1: logic + live adapters + pump guard + console, 131 tests OK, offline only — next: muse dry-run day + real create-tx fixture; claude-code review · 2026-11-07

## PFP reply bot (2026-11-07)

- VERIFIED: Standalone PFP bot v1.0.0 merged in [PR #2](https://github.com/0xSneaks/just-mog-it/pull/2) at `21ce5df`. All 69 pytest tests passed on merged main without production PNGs or API credentials. Live API access and asset appearance are UNKNOWN. [Handoff](../handoffs/2026-11-07_0531_codex_justmogit-pfp-v1.md)

## Pair-decision status (2026-11-07)

- VERIFIED: [DeepSeek retry and request audit](https://github.com/0xSneaks/just-mog-it/commit/cc9188102823a96ea857dddf2766372c1b0d7f16) checks the five-second per-retry limit, missing-header backoff and exclusion of hostile mention prose from serialized HTTP. Fresh checkout passed 40 focused and 204 total tests. Live smoke awaits a connected environment. [Handoff](../handoffs/2026-11-07_0934_codex_justmogit-deepseek-retry-audit.md)

- VERIFIED: [Preview failure audit](https://github.com/0xSneaks/just-mog-it/commit/1e2985cae499e53b07c8e19344fa663afcf2309e) adds evaluator failure kinds to the ledger. Fresh checkout passed 37 focused and 201 total tests. Live model smoke blocked on an absent DeepSeek key in the workspace. [Handoff and manual smoke command](../handoffs/2026-11-07_0909_codex_justmogit-deepseek-audit.md)

- VERIFIED: [Shape-only DeepSeek adapter](https://github.com/0xSneaks/just-mog-it/commit/c37212d532fc4312537204b55c3e0d9d41e381d2) delegates all target and quote policy to the preview validator. Fresh checkout passed 35 focused and 199 total offline tests. [Handoff](../handoffs/2026-11-07_0901_codex_justmogit-deepseek-shape.md)

- VERIFIED: [Opt-in DeepSeek evaluator](https://github.com/0xSneaks/just-mog-it/commit/c2efb4e6267194ab04bfd7e2069db2ca8e4973d5) integrates through the existing preview factory path. Fresh checkout passed 28 adapter tests and 192 total. Live API and metadata wiring are pending. [Handoff](../handoffs/2026-11-07_0848_codex_justmogit-deepseek-preview.md)

- VERIFIED: [Pump pair preview branch](https://github.com/0xSneaks/just-mog-it/commit/0e5b9bb65ce06e63c14518a7a41af1529677aa1b) adds registry decoding, curve/PumpSwap resolution, guarded preview decisions, a SQLite queue and offline receipt checks. Fresh checkout passed 33 focused and 164 total tests. Provider and launch execution are pending. [Build handoff](../handoffs/2026-11-07_0721_codex_justmogit-pair-fixture-build.md)

- VERIFIED: PFP PR #2 does not implement the pair evaluator. The launch PR #1 branch still probes SOL only. Pair implementation is pre-build pending author-payload proof, metadata and failure contract, and provider choice. [Scope and prerequisites](../handoffs/2026-11-07_0546_codex_justmogit-pair-scope.md)

- VERIFIED: Pump SDK listed 230 quote mints at slot 466487151. Both NVDA and SPY issuer variants were registered. The checked stock mints fail Mogz's documented custom-quote rules. Keep venue admission and issuer provenance separate. [Audit](../handoffs/2026-11-07_0559_codex_justmogit-stock-quotes.md)

- INTENT: Proposed X ping outcomes and reply wording drafted for DeepSeek. [Reply contract](../handoffs/2026-11-07_0603_codex_justmogit-ping-replies.md)

- VERIFIED: DeepSeek's two example flows are fixtures. Supplied mints fail the claimed live identities, and the tested launch parser requires `mog it <CA>` or another supported phrase. [Audit](../handoffs/2026-11-07_0626_codex_justmogit-reply-example-audit.md)

- INTENT: Proposed one Python registry reader, SQLite operator queue and venue-specific liquidity measures. Complete runnable fixtures and owner-approved launch thresholds are pending. [Fixture and adapter review](../handoffs/2026-11-07_0634_codex_justmogit-fixture-contract.md)

- VERIFIED: PR #1 baseline passed 131 tests at `94f4ea1`. The supplied 20-case suite references seven absent modules and needs parser, same-quote, receipt and SDK parity corrections. [Supplied fixture audit](../handoffs/2026-11-07_0641_codex_justmogit-supplied-fixture-audit.md)

## Pilot evidence (2026-11-07)

- VERIFIED: Both historical Mogz SOL launches (SA and TREMP) finalized. Each cost 0.02059164 SOL and recorded $0 first-day curve volume. NO-GO for a payout ledger or Privy. [Receipts and math](../handoffs/2026-11-07_0400_codex_justmogit-pilot.md)
- VERIFIED docs: Mogz supports wallet reward splits on custom pairs in the quote token. SOL/USDC applies to charity. Automated split setup and a live claim are UNKNOWN. [Mogz pairs](https://mogz.fun/docs/custom-pairs)
- INFERENCE: At the observed ~$1.94 create cost and no upfront payment, 70/30 (pinger/bot) needs ~$2,156 in standard curve volume for the bot to cover creation, versus ~$1,293 at 50/50. This was a historical Mogz pilot. See the [fee ruling](../handoffs/2026-11-07_0305_claude-code_justmogit-bot-fee-split.md) for historical payout context.

## Historical launch-bot defaults
- Venue pump.fun only; SOL pair; dev buy 0; Split A 25/25/50; 3/day; 0.025 SOL cap; 0.02 SOL fee; kill ON at boot; allowlist pilot; owner approval per launch (§0, adopted 2026-11-06)
- main `mogit/` = Mogz /mogit money core (guard pinned to Meteora DBC) — NOT the X bot
- Bot logic lives in `bot/`; owner numbers only in `config/policy.yaml`

## To do
- Vault service (keys) — not built
- Dry-run day on live X + RPC; pin pumpguard to a real PumpPortal create tx — muse
- pump.fun create-ix guard from a real tx — HIGH-RISK
- Owner: X approval, bot OAuth tap + media.write, 5 SOL seed, confirm rug thresholds + ASSUMPTION numbers, go-live yes
