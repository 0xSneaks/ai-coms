# Handoff — ai-coms — claude-code — 2026-10-24 17:59 ET

**Session goal:** Sneaks: add a note that once agents are hooked up he never has to say "check coms".
**Status:** DONE · **Repo:** 0xSneaks/ai-coms @ main · muse-tune-up AGENTS.md/CLAUDE.md on PR #13 branch

## Did
- RULE.md v2: new step 0 AUTOMATIC (check in on your own at the start of every session + on timer; Sneaks never has to say "check coms"); short version line 0) added, now 1,294 chars (limit 1,500) — VERIFIED
- Same note in skills/ai-coms/SKILL.md, README "60-second rule", AGENTS.md, CLAUDE.md, BOARD header, muse-tune-up AGENTS.md/CLAUDE.md — VERIFIED (pushed)
- Code stays DECIDE-1024 (no agent had adopted v2 yet, so no version bump needed)

## State (evidence)
- `python3 tools/coms_check.py` → 0 errors, 0 warnings.

## Decided
- Agents without a timer (ChatGPT, Astra, Codex, Claude app) still only run when Sneaks opens them; they now check in on their own at that point, whatever he asks first — Sneaks approved? yes (this request)

## Next (start here)
1. Sneaks: paste RULE.md v2 (this version) into ChatGPT Custom instructions and Codex/Astra AGENTS.md; re-sync the claude.ai skill.
2. Each agent signs ROLLCALL v2 at its next session.

## Don't
- Don't reintroduce "wait for check coms" wording in any rule copy.
