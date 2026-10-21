# muse-tune-up

**Repo:** 0xSneaks/muse-tune-up  ·  **Live URL:** none  ·  **Last updated:** 2026-10-21 by Muse

## Now (keep this current)
Upgrade program items 1–10 merged to main (PRs #4–#7, plus #8/#9 health fixes). Tool trials round 2: report on branch feat/tool-trials-round-2 (c92f339), **PR #10 open** for review; combined verdict on issue #3 (comment 6314578890). Round-2 tools ARE now installed on Muse's VM by Muse (2026-10-21 AM, smoke-verified): codebase-memory-mcp, Chrome DevTools MCP, Headroom (not wired — FIX-FIRST conditions in issue #3 comment).

## Established (decisions — don't re-litigate)
- Context-Mode not added; Headroom is the trial for that slot — Muse/Sneaks, 2026-10-21
- chrome-devtools-mcp must run with --no-usage-statistics --no-performance-crux — 2026-10-21

## Built
- Health checker — `ops/health/` — VERIFIED (tests)
- Proxy relay — `ops/proxy-relay/` — VERIFIED (tests)
- Tool trials report — `trials/tool-trials-2026-10-21/TOOL-TRIALS.md` — VERIFIED

## To do (priority order)
1. ~~Install chrome-devtools-mcp + codebase-memory-mcp on the VM~~ DONE by Muse 2026-10-21 (VM smoke-verified)
2. Headroom quality A/B with real GMGN workload + bench, beacon off — Muse, on Sneaks's word
3. MusePark creation-fee finding: filed as MusePark issue #32 — forge test + fix review — MusePark owner
4. Review/merge PR #10 — Sneaks

## Known issues / gotchas
- Headroom beacon on by default; --no-telemetry does not disable it
- codebase-memory-mcp installer edits ~/.bashrc

## Stack & where things live
- Docs per item at repo root (MAESTRO.md, SCAN.md, PASSKEY.md, VOICE.md, CONTEXT.md, EVALS.md, ROUTING.md, MEMORY-PILOT.md); trials under `trials/`
