# muse-tune-up

**Repo:** 0xSneaks/muse-tune-up  ·  **Live URL:** none  ·  **Last updated:** 2026-10-25 01:27 ET by claude-code (PRs #13, #14, #15 MERGED to main b6865c8)

## Now (keep this current)

- **VERIFIED (Muse VM report, 2026-10-25 01:50 ET):** [PR #13 round-2 WORKS/FAILS table](https://github.com/0xSneaks/muse-tune-up/pull/13#issuecomment-6394097166) @ merged head `3528f79`: A0 `vm_check: 0 FAIL` (584 MiB memory WARN); A2 57 tests OK (1 skipped); A3–A10 smoke 8/8 PASS (CAPTCHA escalation + hostile-page rejection); C2 app-scoped cold start 5 s, health ready. **C1 FAILS**: supervised relay upstream CONNECT `407 Proxy Authentication Required` and Chromium `ERR_INVALID_AUTH_CREDENTIALS`/HTTP 502, twice including after PM2 app deletion and fresh ensure; same relay standalone in current shell env and curl through egress proxy get 200. **INFERENCE:** PM2 proxy credentials/environment stale. `ensure.sh:56` already uses `startOrRestart --update-env`, so that flag alone is not a verified fix. D SKIP; E HELD/not installed until A+C pass. Initial incomplete API pull/PATH errors resolved before clean A. Existing Muse C1 request remains OPEN; ChatGPT corroborating request points to same fix, not parallel work. [ChatGPT handoff](../handoffs/2026-10-25_0214_chatgpt_muse-tune-up.md).
- **VERIFIED (Claude Code sandbox only):** [PR #13 baseline comment 6393723293](https://github.com/0xSneaks/muse-tune-up/pull/13#issuecomment-6393723293) claims 57 tests OK, smoke 8/8 and 1,323 unauthenticated requests with zero leaks; do not confuse these with Muse's VM evidence or a working C1 proxy.

- **MERGED 2026-10-25 01:25 ET (Sneaks's instruction):** #13 → 18e00da, #14 → fb27610, #15 → b6865c8, each pinned to its tested head. VERIFIED on merged main (CC sandbox): ops/browser, timing, jobs, health, proxy-relay suites OK; smoke 8/8. **Nothing installed on Muse's VM yet.** [Handoff](../handoffs/2026-10-25_0127_claude-code_muse-tune-up.md).
- **Muse-speed builds (2026-10-25 01:20 ET, claude-code):** 3 PRs from Claude's approved list for Muse's speed audit. VERIFIED in a CC sandbox only; VM tests → Muse. [Handoff](../handoffs/2026-10-25_0120_claude-code_muse-tune-up.md).
  - [PR #14](https://github.com/0xSneaks/muse-tune-up/pull/14) `ops/timing/`: seconds per stage (spawn/browser/tool/verify), p50/p95 summary, `--budget-s 180`. 19 tests; synthetic 5-task sample report.
  - [PR #13](https://github.com/0xSneaks/muse-tune-up/pull/13) @ 3528f79: a test for each ChatGPT finding (fixes were in 609d908). 57 tests; smoke 8/8 with real CloakBrowser + pm2; 1,323-request unauthenticated sweep with 0 leaks. Map: [comment 6393723293](https://github.com/0xSneaks/muse-tune-up/pull/13#issuecomment-6393723293).
  - [PR #15](https://github.com/0xSneaks/muse-tune-up/pull/15) `ops/jobs/`: checkpointed job runner, per-item fsynced output, resume after SIGKILL, detached `start.sh` (systemd-run/setsid) + cron backstop. 13 tests.

- **ChatGPT independent PR #13 review (2026-10-24 18:01 ET):** VERIFIED static-source review posted [one comment](https://github.com/0xSneaks/muse-tune-up/pull/13#issuecomment-6390064173) at head b58ab5c: CHANGES REQUESTED for unauthenticated localhost endpoints including handoff links, VM-test `pm2 kill`/forced worktree removal, credential persistence, state limits, and real-browser CSRF coverage. **VM behavior UNKNOWN;** Muse's WORKS/FAILS remains OPEN. [Handoff](../handoffs/2026-10-24_1801_chatgpt_muse-tune-up.md).
Upgrade program items 1–10 merged to main (PRs #4–#7, plus #8/#9 health fixes). Tool trials round 2: report on branch feat/tool-trials-round-2 (c92f339), **PR #10 open** for review; combined verdict on issue #3 (comment 6314578890). Round-2 tools ARE now installed on Muse's VM by Muse (2026-10-21 AM, smoke-verified): codebase-memory-mcp, Chrome DevTools MCP, Headroom (not wired — FIX-FIRST conditions in issue #3 comment).


- CAPTCHA handoff reviewed by Muse 2026-10-24 (handoff 0035): PASS WITH NOTES — VM tests 8 pass / 4 e2e skip (green in CC sandbox); tunnel method reported to Sneaks before first real use; Headroom stays installed, NOT wired (CC retrieval test).

- **ops/browser (2026-10-24, claude-code):** persistent supervised CloakBrowser service, [draft PR #13](https://github.com/0xSneaks/muse-tune-up/pull/13), branch `claude/muse-persistent-browser-service-87tea6` @ 9ebd5c7. VERIFIED in CC sandbox only: smoke 7/7 PASS (kill Chrome → pm2 revive 3.0s, session persisted, handoff fired), 42 unit tests. VM smoke NOT run. Handoff: [2026-10-24_1741_claude-code_muse-tune-up.md](../handoffs/2026-10-24_1741_claude-code_muse-tune-up.md).


## Advisory: trade anomaly semantics (2026-10-26)
- **INTENT:** Muse checks current official documentation and actual MUSE market-data host; if CoinGecko's GeckoTerminal-powered trade endpoint is used, compare same pool/window with anomaly filter default versus anomalous trades included and report signal impact. UNKNOWN applicability; read-only only. [Request](../handoffs/2026-10-26_1120_chatgpt_muse-tune-up.md).

## Advisory: FOMO read-only history monitor (2026-10-25 11:09 ET)
- **DESIGN ONLY — NOT IMPLEMENTED:** one daily local checker using a dedicated manually authenticated Playwright browser context, strong authenticated-only read-only proof, one SQLite-backed checkpointed collector, unique event keys, per-profile full-history coverage and fail-closed 429/CAPTCHA latched stop. Zero purchase/action UI interaction.
- **UNKNOWN:** source's complete trade history affordance, suitable account-specific auth probe, automation permission, compatibility with existing ops/browser/jobs; do not equate the historical ~977 rows with completeness.
- **Next:** confirm safe signed-in/logged-out probe and complete per-profile page history with operator, then code/tests only in a separately claimed area. [Handoff](../handoffs/2026-10-25_1109_chatgpt_muse-tune-up.md).

## Established (decisions — don't re-litigate)
- Context-Mode not added; Headroom is the trial for that slot — Muse/Sneaks, 2026-10-21
- chrome-devtools-mcp must run with --no-usage-statistics --no-performance-crux — 2026-10-21

## Built
- Browser service — `ops/browser/` — on main (PR #13) — VERIFIED sandbox (smoke 8/8, 57 tests); VM round 2 pending; captcha escalation needs feat/captcha-handoff on main
- Stage-timing logger — `ops/timing/` — on main (PR #14) — VERIFIED sandbox (19 tests); VM baseline pending
- Checkpointed job runner — `ops/jobs/` — on main (PR #15) — VERIFIED sandbox (13 tests); systemd mode + VM UNCONFIRMED
- Health checker — `ops/health/` — VERIFIED (tests)
- Proxy relay — `ops/proxy-relay/` — VERIFIED (tests)
- Tool trials report — `trials/tool-trials-2026-10-21/TOOL-TRIALS.md` — VERIFIED

## Codex research task (2026-10-24)
- **VERIFIED research/design complete; runtime upgrade BLOCKED.** [Draft PR #12](https://github.com/0xSneaks/muse-tune-up/pull/12), branch `codex/external-reference-audit-2026-10-24`, remote `2f2f4c37d84170db16d7e6c922d4c6aef1869658`. Main unchanged; 10 added files confined to `research/external-reference-2026-10-24/`.
- **Evidence:** 19 research-integrity tests PASS; 3 upstream pins / 48 inspected-file hashes verified; 68 baseline paths inventoried. 46 synthetic runtime cases are NOT_RUN; runtime A/B, latency/cost/quality/P&L NOT MEASURED. No runtime feature implemented.
- **Decisions:** TEST selective Vibe review/gate/replay and LibreChat permission/audit patterns; PARK Fincept code reuse (contradictory license files); KILL full engines/second frontends. No upstream code copied/installed, no added dependencies or recurring services/costs.
- **Blocker / next:** current trading runtime is absent from tune-up repo; no live VM supplied. Muse/runtime owner provides current source commit/file map, redacted snapshots and test command (no secrets); map interfaces and existing independent vetoes before implementing optional modules.
- **Tracking:** https://github.com/0xSneaks/muse-tune-up/issues/11 (leave open).
- **Handoff:** [2026-10-24_0022_codex_muse-tune-up.md](../handoffs/2026-10-24_0022_codex_muse-tune-up.md).
- **Non-overlap / safety:** Claude Code captcha/headroom work untouched. No live trades, production changes, wallet access, payments, subscriptions or deploys. Required SHADOW/KILL_SWITCH and <=1%/one-position controls unchanged, not independently confirmed live.

## Muse trading-intel pass (2026-10-24)
- **VERIFIED runtime located + implemented.** Runtime = 0xSneaks/Yolo-crawl- @ `8829b228` (VM-local; remote branch of the same name diverged at `d507839`). Sanitized manifest on issue #11 (comment 6380218606). GMGN is absent from this runtime by documented decision (FOMO leg is canonical).
- **VERIFIED smallest upgrade:** default-off shadow sidecar `desk/intel/` (evidence envelope + deterministic sizing + shadow gate), new files only, on branch `muse/trading-intel-sidecar-2026-10-24` (local `8c0deae`). Draft PR [Yolo-crawl- #4](https://github.com/0xSneaks/Yolo-crawl-/pull/4) against API-recreated mirror base (tree hashes verified byte-exact). Results on issue #11 (comment 6380291804): 46/46 adversarial cases pass; suite 148→160 tests with the identical single pre-existing failure; sidecar 0 tokens / $0 / no calls when disabled.
- **Next:** owner reconciles Yolo-crawl- local/remote divergence and reviews PR #4; held-out quality A/B needs owner-supplied redacted snapshots + thresholds. Judge-provider note (snapshot defaults to GLM; owner dropped GLM 2026-10-19) flagged on issue #11, not changed.

## To do (priority order)
00. Muse-speed VM tests: timing PR #14 and jobs PR #15 reported DONE by Muse (tables on PRs); browser PR #13 round 2 A PASS/C2 PASS but **C1 FAIL** (supervised relay 407), so browser block E remains HELD. Claude Code fixes PM2 relay environment provenance; Muse reruns C1 and posts proof before any install.
0a. ops/browser PR #13: VM round-2 table posted (6394097166); ChatGPT reviewed and handed C1 to Claude Code. Next: fix 407 stale-env cause without leaking credentials or touching unrelated PM2 apps; Muse re-tests C1; block E (ensure.sh/PM2 startup/15-min cron) stays held until A+C pass.
0. CAPTCHA handoff (`ops/captcha-handoff/`, branch feat/captcha-handoff 5a53deb): tunnel + one real errand on the VM — Muse, after Sneaks's review
1. ~~Install chrome-devtools-mcp + codebase-memory-mcp on the VM~~ DONE by Muse 2026-10-21 (VM smoke-verified)
2. ~~Headroom quality A/B~~ — 2026-10-24 retrieval check: streaming drops records silently, retrieval turns cost +27%, lossless 0–1% → recommend NOT wiring (PR #10 addendum)
3. MusePark creation-fee finding: filed as MusePark issue #32 — forge test + fix review — MusePark owner
4. Review/merge PR #10 — Sneaks

## Known issues / gotchas
- Headroom beacon on by default; --no-telemetry does not disable it
- codebase-memory-mcp installer edits ~/.bashrc

## Stack & where things live
- Docs per item at repo root (MAESTRO.md, SCAN.md, PASSKEY.md, VOICE.md, CONTEXT.md, EVALS.md, ROUTING.md, MEMORY-PILOT.md); trials under `trials/`

- 2026-10-24 17:19 ET: Muse filed a build request for Claude Code (at Sneaks's instruction): `ops/browser/` — a persistent, supervised browser service (durable profiles, proxy/TLS/UA baked in, localhost control surface, CAPTCHA-handoff escalation, restart-survival smoke test). Full spec: handoffs/2026-10-24_1719_muse_muse-tune-up.md. Deliverable: draft PR from Claude Code, not merged.

- Update 2026-10-24 18:08 ET (muse): PR #13 VM install test DONE on Muse's VM — direct-proxy Chromium browsing FAILS (ERR_TUNNEL_CONNECTION_FAILED), relay path 7/7 PASS, cold start 9s, coingecko partial (challenge null, load timeout). Full WORKS/FAILS table: https://github.com/0xSneaks/muse-tune-up/pull/13#issuecomment-6390108259 · handoff handoffs/2026-10-24_1808_muse_muse-tune-up.md. Next: claude-code wires relay supervision on the branch, then Sneaks reviews PR #13.
