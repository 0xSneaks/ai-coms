# Handoff — muse-tune-up — claude-code — 2026-10-21 05:59 ET

**Session goal:** CC handoff from Muse via Sneaks: vet + trial 4 tools (Headroom proxy, codebase-memory-mcp, Chrome DevTools MCP, Cloudflare security-audit-skill).
**Status:** PARTIAL — trials done in a Claude Code cloud sandbox; **nothing installed on Muse's VM** (no route to it from this session).
**Repo / branch:** 0xSneaks/muse-tune-up @ feat/tool-trials-round-2  ·  **Last commit:** c92f339 (no PR opened; not asked)

## Did
- Report: `trials/tool-trials-2026-10-21/TOOL-TRIALS.md` + harness + MusePark `findings.json` — VERIFIED (pushed)
- Headroom: proxy measured vs local fake upstream — VERIFIED numbers in report
- codebase-memory-mcp: indexed MusePark @5595f0d, 4/4 structural queries vs hand ground truth — VERIFIED
- chrome-devtools-mcp 1.11.0: trace + network + console on github.com page, stats/CrUX off — VERIFIED
- security-audit-skill: SkillSpector scan (all 14 hits FP, read by hand) + quick audit of MusePark; findings.json passes the skill validator — VERIFIED

## State (evidence)
- Verdicts: Headroom FIX-FIRST · codebase-memory-mcp PASS (trial) · chrome-devtools-mcp PASS (trial) · security-audit-skill FIX-FIRST
- Headroom token mode: 182 KB JSON array −63% but kept only 15/37 records whole (lossy; relies on headroom_retrieve). Default cache mode 0%. gpt-4o model names fail open to 0% when tiktoken can't download.
- Tests: n/a (no code changes to any product repo)
- Deployed: no

## Decided
- No sub-agents for the security-audit full mode (not authorized) — single-agent quick profile, stated as partial coverage.
- MusePark creation-fee finding left needs_validation (no forge/solc; installs forbidden).

## Next (start here)
1. Muse on the VM: chrome-devtools-mcp + codebase-memory-mcp per the exact configs/removal steps in TOOL-TRIALS.md §2–3.
2. Headroom only after: HEADROOM_BEACON=off DO_NOT_TRACK=1 HEADROOM_OFFLINE=1, port ≠ 8787, tiktoken pre-cached, then an LLM quality A/B on a real GMGN workload + one bench run.
3. MusePark owner: review evm/factory creation-fee finding (AmpMarketFactory.sol:42–49); confirm with a forge test.

## Don't
- Don't trust `headroom --no-telemetry` to stop uploads — it doesn't stop the beacon.
- Don't run codebase-memory-mcp's installer without expecting a ~/.bashrc PATH edit.
- Don't use headroom's default proxy port 8787 (maestro).

## ⚠️ High-risk
- MusePark finding touches fee/spam control on contracts that escrow funds — needs the repo's implementer + adversarial reviewer + verifier (MusePark AGENTS.md rule) before any fix.
