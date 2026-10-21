# muse-tune-up

**Repo:** 0xSneaks/muse-tune-up  ·  **Live URL:** none  ·  **Last updated:** 2026-10-21 by claude-code

## Now (keep this current)
Upgrade program items 1–10 merged to main (PRs #4–#7, plus #8/#9 health fixes). Tool trials round 2 report on branch feat/tool-trials-round-2 (c92f339), not yet reviewed. Nothing from round 2 installed on Muse's VM.

## Established (decisions — don't re-litigate)
- Context-Mode not added; Headroom is the trial for that slot — Muse/Sneaks, 2026-10-21
- chrome-devtools-mcp must run with --no-usage-statistics --no-performance-crux — 2026-10-21

## Built
- Health checker — `ops/health/` — VERIFIED (tests)
- Proxy relay — `ops/proxy-relay/` — VERIFIED (tests)
- Tool trials report — `trials/tool-trials-2026-10-21/TOOL-TRIALS.md` — VERIFIED

## To do (priority order)
1. Install chrome-devtools-mcp + codebase-memory-mcp on the VM (TOOL-TRIALS.md §2–3) — Muse
2. Headroom quality A/B with real GMGN workload + bench, beacon off — Muse
3. MusePark creation-fee finding: forge test + fix review — MusePark owner

## Known issues / gotchas
- Headroom beacon on by default; --no-telemetry does not disable it
- codebase-memory-mcp installer edits ~/.bashrc

## Stack & where things live
- Docs per item at repo root (MAESTRO.md, SCAN.md, PASSKEY.md, VOICE.md, CONTEXT.md, EVALS.md, ROUTING.md, MEMORY-PILOT.md); trials under `trials/`
