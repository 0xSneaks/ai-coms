# muse-tune-up

**Repo:** 0xSneaks/muse-tune-up  ·  **Live URL:** none  ·  **Last updated:** 2026-10-24 by claude-code (captcha handoff + headroom check)

## Now (keep this current)
Upgrade program items 1–10 merged to main (PRs #4–#7, plus #8/#9 health fixes). Tool trials round 2: report on branch feat/tool-trials-round-2 (c92f339), **PR #10 open** for review; combined verdict on issue #3 (comment 6314578890). Round-2 tools ARE now installed on Muse's VM by Muse (2026-10-21 AM, smoke-verified): codebase-memory-mcp, Chrome DevTools MCP, Headroom (not wired — FIX-FIRST conditions in issue #3 comment).

## Established (decisions — don't re-litigate)
- Context-Mode not added; Headroom is the trial for that slot — Muse/Sneaks, 2026-10-21
- chrome-devtools-mcp must run with --no-usage-statistics --no-performance-crux — 2026-10-21

## Built
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

## To do (priority order)
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
