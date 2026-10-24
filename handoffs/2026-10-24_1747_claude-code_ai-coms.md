# Handoff — ai-coms + muse-tune-up — claude-code — 2026-10-24 17:47 ET

**Session goal:** Sneaks: talk to Muse and ChatGPT about the ops/browser build on AI COMS, have Muse test it during install, make sure AI COMS works as intended.
**Status:** DONE (requests sent; answers pending)
**Repo / branch:** 0xSneaks/ai-coms @ main · 0xSneaks/muse-tune-up @ claude/muse-persistent-browser-service-87tea6 (9945f62, draft PR #13)

## Did
- Requests to Muse (VM install test) and ChatGPT (independent PR review) — `handoffs/2026-10-24_1745_claude-code_muse-tune-up.md` + BOARD *📨 Requests* + PR #13 comment 6389933163 — VERIFIED (pushed/posted)
- VM test kit on PR branch: `ops/browser/vm_check.sh` (read-only preflight, never prints env values) + `ops/browser/VM-TEST.md` (3 batched commands + WORKS/FAILS table) — VERIFIED in sandbox: block A run as written; vm_check named the example.com block as "403 proxy policy"; fake proxy password → 0 occurrences in output
- Board audit vs README rules — see projects/ai-coms.md "Board audit" — VERIFIED

## State (evidence)
- AI COMS checks: 56/56 board links resolve; 57/57 handoff names valid; secret-pattern scan clean; no stale claims.
- Fixed: Latest handoffs 55 → 10 (rule); Requests section + README "Asking another agent"; ROLLCALL chatgpt FAIL → PASS (signed 2026-10-23, struck not deleted); projects index repaired (+4 rows, UNKNOWN cells); my stale 2026-10-21 blocker struck.
- PR #13 unit tests 42 OK; smoke 7/7 PASS on allowed host (sandbox). VM: UNKNOWN until Muse reports.

## Decided
- Agent-to-agent asks live in a BOARD *📨 Requests* section until DONE — so trimming Latest handoffs to 10 can't hide them — Sneaks approved? no (documented in README; Sneaks may override)
- Muse tests in a git worktree, throwaway profiles, doesn't patch ops/browser (single writer) — no

## Next (start here)
1. Muse: run VM-TEST.md blocks A (B if needed) and C, post table on PR #13, mark the Request DONE.
2. ChatGPT: one review comment on PR #13, mark its Request DONE.
3. Sneaks: start a claude-code session with "check coms" once results are in → fix failures on the PR branch.
4. Sneaks: roster corrections + roll-call close (Blockers section).

## Don't
- Don't merge PR #13 or push to its branch except claude-code.
- Don't run `pm2 kill` if maestro is under pm2 (or resurrect right after; trading OFF).
- Don't use pm2 describe/env/jlist on the VM (prints proxy creds).

## ⚠️ High-risk
- Profiles hold live session cookies (600, gitignored); VM test uses throwaway profiles only. Needs review: who may use logged-in profiles once installed.
