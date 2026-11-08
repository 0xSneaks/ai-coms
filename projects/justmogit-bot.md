- VERIFIED (codex independent review 2026-11-07 22:40 ET): **CHANGES @ 78fb7973b282a2b9a165552709050e5cbd6c29b3**; fresh checkout/install, 528 passed. SOL and historical mogit USD blockers pass; mog-me spent/_room/_book still accept negative USD and corrupt daily balances. Merge held; implementation session to patch, reviewer made no source edits. [Finding](../handoffs/2026-11-07_2240_codex_justmogit-pr5-independent-review.md)

# justmogit-bot

## Now
- VERIFIED (codex, 2026-11-07 22:29 ET): PR #5 amount-validation fixes pushed at `78fb7973b282a2b9a165552709050e5cbd6c29b3`; requirements install succeeded; **528 passed in 8.08s**. Exact SOL conversion and fail-closed USD validation at flow/ledger boundaries. Independent re-review OPEN at this new head; merge held. [Handoff](../handoffs/2026-11-07_2229_codex_justmogit-pr5-amount-fixes.md)
- VERIFIED (codex, 2026-11-07 18:48 ET): independent re-review of PR #5 at `1c6942a` returned **CHANGES** with **430 offline tests passed**. Approval and kill regressions pass. The SOL quote can round down across the cap, and negative USD reaches the signer boundary. PR remains open for the Luna implementation lane and then Codex re-review. [Handoff](../handoffs/2026-11-07_1848_codex_justmogit-pr5-rereview.md)
- VERIFIED (codex / GPT 6 Luna, 2026-11-07 18:36 ET): PR #5 four-fix implementation pushed at `1c6942a02fbc81df9a8de8e807a0331f0e888063`; clean credential-free venv `pip install -r requirements.txt` succeeded and `python -m pytest -q` = **430 passed in 7.67s**. PR head confirmed at full SHA, open/unmerged. Independent Codex re-review requested; no live X/Gemini/transaction action. [Handoff](../handoffs/2026-11-07_1836_codex_justmogit-pr5-implementation.md)
- VERIFIED (codex, 2026-11-07 17:16 ET): bot PR #5 @ `485fa70` reviewed, **CHANGES**, 420 offline tests passed. Claude Code owns approval/kill checks, invalid amount and pre-sign budget fixes. Shades wording proposed for front, three-quarter and profile. PR stays unmerged pending re-review. [Handoff](../handoffs/2026-11-07_1716_codex_justmogit-pr5-review.md)
- VERIFIED (muse, 2026-11-07 17:11 ET): Task 3 drafts FILED — pinned "follow + tag 'mog me'" post (primary + 2 alternates) and voice notes B1–B4 (welcome / delivered / queue busy / rescue-story template), DeepSeek-drafted and muse-curated. DRAFT ONLY: nothing posted; Sneaks flips go-live. Drafts: `~/workspace/narrative-ops/justmogit-bot/pinned-and-voice-drafts-2026-11-07.md` → [handoff](../handoffs/2026-11-07_1711_muse_justmogit-task3-drafts.md)
- VERIFIED owner ruling (Sneaks, 2026-11-07): **Muse is the friendly voice of @justmogit_bot; no humans.** Muse curates mog-me during testing; Sneaks flips autopost when happy. [Handoff](../handoffs/2026-11-07_1649_claude-code_justmogit-social-voice.md)
- INTENT (Sneaks, chat 2026-11-07): **placement is what matters**. The shades must follow the head (angled, straight on, side) and go with the picture; the traits are not set in stone. Built at bot `18fefa7` (419 tests): a pose read (view, tilt, up/down, eye spots, art style, existing glasses), pose-specific placement instructions, and a fit check on every result that retries a bad fit. Quality is UNVERIFIED until Gemini is funded Monday.
- INTENT (Sneaks, chat 2026-11-07): the main issue is **colours and placement matching the picture**. Mogs are **NFT-style with traits**: some get PIT VIPER on the frames, some a GET MOGGED caption, some plain glasses. Built at bot commit `d686031` (385 tests). Traits are drawn once per mog and saved. The picture's own palette goes to Gemini as hex colours, and the caption uses it too. The prompt carries a fit checklist. Real colour and placement quality is UNVERIFIED until Gemini is funded on Monday. The site (pfp.html is a showcase) keeps the simpler random logo prompt.
- INTENT (Sneaks, chat 2026-11-07 ~16:45 ET): **PIT VIPER frame logo is random per mog** ("some will have it, some won't"), at 50/50. The shades stay in the pfp's own art style. Mog-me budget stays $5/day with a $10 ceiling. Built: bot `03eb791` (377 tests), site pfp-changer `d410d56`. The same prompt text is in both. Step 0 of the new plan block was VERIFIED; PR #5 is at 371 tests, not 266 (now 377).
- INTENT (Sneaks, chat 2026-11-07): mog-me can go to **$10/day if it becomes really popular** (more mogs = more training signal). Built at `9e8161b`: active budget $5.00, hard ceiling $10.00, never raised automatically. Every budget skip is logged as `mogme_budget_hit`, and `mogme-list` shows spend and hits from the last 24 h. To raise, set `mog_me.daily_budget_usd` up to `10.00`.
- VERIFIED (claude-code 15:49 ET): [PR #5](https://github.com/0xSneaks/just-mog-it/pull/5) open, Codex-gated — mogit/ money-core gates (kill/3-day/0.025 cap/SOL-only/first-buy 0), DeepSeek timeout ruling, venue-aware reply, smoke workflow ref fix, docs truth; 266 tests (clean venv). PR #1 closed (contained in main). Launch #001 metadata read BLOCKED (RPC 403). [Handoff](../handoffs/2026-11-07_1549_claude-code_justmogit-consolidated.md)
- VERIFIED (claude-code 2026-11-07 15:24 ET): DeepSeek is LIVE and working (`DeepSeekEvaluator`, `deepseek-flash`). Actions run 42407864926 success/PASS. PR #4 merged to main `b5e18a5` (206 tests). Timeout ruling (12 s adapter, boot warm-up, one caller retry, then skip), Mogz callout step, NFA regression test and v0 docs archive are on `claude/admiring-mayer-3n4uj8` (246 tests) awaiting Codex review. Mogz create adapter BLOCKED on the missing payload. Launch #001 metadata read BLOCKED (RPC 403 here). [Handoff](../handoffs/2026-11-07_1524_claude-code_justmogit-fix-pass.md)
- VERIFIED fact: Launch #001 was made by hand through an external executor, not the bot. mogz.fun (Meteora DBC, SOL pair), CA `3cHj1iCgZb18Q8ZrqbsAtwNGjn6gifQRqnCedHhdmogz`, dev buy 0. The pump.fun pipeline is specced, not built.
- INTENT (Sneaks, 2026-11-07): Keep **Bags Pay** on the table as a future option for JustMogIt. Integration fit and terms are unevaluated. [Handoff](../handoffs/2026-11-07_1218_codex_justmogit-bags-pay-option.md)

- ⚠️ ANNOTATION (claude-code 2026-11-07 15:49 ET): Launch #001 fired on mogz.fun (manual). Owner ruling 2026-11-07: mogz out (no volume); venue is pump.fun or Float, undecided. No Tuesday 2026-11-10 launch. Plan: PFP changer → followers → coin launch. Muse must reconcile launch-001-pack.md + the execution Space (not reachable from the repos).
- VERIFIED owner decision (2026-11-07): **Pump.fun for launches and relaunches for now**. This supersedes the older Mogz venue clause. The pair design continues to use dynamic narrative selection, with eligibility checked on Pump. [Owner decision](../handoffs/2026-11-07_0601_codex_justmogit-pump-venue.md)
- INTENT (claude-code, 2026-11-07 14:45 ET): payouts on Pump use fee sharing locked at launch (bot 30% / pinger 70% minus tiers). Pinger claims on pump.fun with X login, so there is no weekly send. X support is UNVERIFIED and needs one live test approved by Sneaks. [Payout note](../handoffs/2026-11-07_1445_claude-code_justmogit-bot-pump-payout.md)

- PR #1 `claude/x-bot-surface` @ 94f4ea1: logic + live adapters + pump guard + console, 131 tests OK, offline only — next: muse dry-run day + real create-tx fixture; claude-code review · 2026-11-07

## PFP reply bot (2026-11-07)

- VERIFIED: Standalone PFP bot v1.0.0 merged in [PR #2](https://github.com/0xSneaks/just-mog-it/pull/2) at `21ce5df`. All 69 pytest tests passed on merged main without production PNGs or API credentials. Live API access and asset appearance are UNKNOWN. [Handoff](../handoffs/2026-11-07_0531_codex_justmogit-pfp-v1.md)

## Pair-decision status (2026-11-07)

- VERIFIED: The [direct DeepSeek Actions run](https://github.com/0xSneaks/just-mog-it/actions/runs/42403035798) at `cc91881` passed all five checks on the first POST without a warm-up. No live 429 was observed. Preview only. [Handoff](../handoffs/2026-11-07_1348_codex_justmogit-direct-smoke.md)

- REPORTED by Muse via Sneaks: Five live direct-adapter checks passed at `cc91881`, followed by 20/20 first-attempt repeat cases. Codex verified the 12-second adapter timeout behavior in source. Raw evidence link and direct 429 remain outstanding. [Review](../handoffs/2026-11-07_1302_codex_coms-pwa-deepseek-live.md) · ⟶ SUPERSEDED (claude-code 2026-11-07): DeepSeek is live and working; Actions run 42407864926 PASS, repo secret proven

- VERIFIED: The 12:14 ET owner order assigns the direct DeepSeek run to Muse and evidence review to Codex. Direct verification later completed on GitHub Actions. [Execution handoff](../handoffs/2026-11-07_1255_codex_justmogit-smoke-execution.md)

- VERIFIED: [DeepSeek retry and request audit](https://github.com/0xSneaks/just-mog-it/commit/cc9188102823a96ea857dddf2766372c1b0d7f16) checks the five-second per-retry limit, missing-header backoff and exclusion of hostile mention prose from serialized HTTP. Fresh checkout passed 40 focused and 204 total tests. This offline baseline preceded the successful direct run. [Handoff](../handoffs/2026-11-07_0934_codex_justmogit-deepseek-retry-audit.md)

- VERIFIED: [Preview failure audit](https://github.com/0xSneaks/just-mog-it/commit/1e2985cae499e53b07c8e19344fa663afcf2309e) adds evaluator failure kinds to the ledger. Fresh checkout passed 37 focused and 201 total tests. Live model smoke blocked on an absent DeepSeek key in the workspace. [Handoff and manual smoke command](../handoffs/2026-11-07_0909_codex_justmogit-deepseek-audit.md) · ⟶ SUPERSEDED (claude-code 2026-11-07): DeepSeek is live and working; Actions run 42407864926 PASS, repo secret proven

- VERIFIED: [Shape-only DeepSeek adapter](https://github.com/0xSneaks/just-mog-it/commit/c37212d532fc4312537204b55c3e0d9d41e381d2) delegates all target and quote policy to the preview validator. Fresh checkout passed 35 focused and 199 total offline tests. [Handoff](../handoffs/2026-11-07_0901_codex_justmogit-deepseek-shape.md)

- VERIFIED: [Opt-in DeepSeek evaluator](https://github.com/0xSneaks/just-mog-it/commit/c2efb4e6267194ab04bfd7e2069db2ca8e4973d5) integrates through the existing preview factory path. Fresh checkout passed 28 adapter tests and 192 total. Live API and metadata wiring are pending. [Handoff](../handoffs/2026-11-07_0848_codex_justmogit-deepseek-preview.md) · ⟶ SUPERSEDED (claude-code 2026-11-07): DeepSeek is live and working; Actions run 42407864926 PASS, repo secret proven

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
- ⏸ OWNER (Sneaks 2026-11-07): owner decisions parked to Monday 2026-11-09; buy domain justmog.it first
- ~~Commit the proven Mogz create payload to just-mog-it, then build the preview-default adapter (Task 1)~~ — **CANCELLED 2026-11-07** (owner ruling 15:43 ET: mogz.fun OUT as a launch venue — no volume; deploy venue = pump.fun OR Float, undecided) → [amendment](../handoffs/2026-11-07_1800_muse_justmogit-venue-amendment.md)
- Run `scripts/read_launch_metadata.py` on env "JustMogIt (bot + site + coms)" (Task 3.4)
- Owner: merge justmogit-site PR #1 (prod deploy)
- Vault service (keys) — not built
- Dry-run day on live X + RPC; pin pumpguard to a real PumpPortal create tx — muse
- pump.fun create-ix guard from a real tx — HIGH-RISK
- Owner: X approval, bot OAuth tap + media.write, 5 SOL seed, confirm rug thresholds + ASSUMPTION numbers, go-live yes
