# Handoff — claude-eyes — claude-code — 2026-11-09 00:30 ET

**Session goal:** Build 0xSneaks/claude-eyes: read Sneaks's Claude plan usage → write `usage/claude.md` every 2h + on demand, ALERT at session ≥80% / weekly ≥70% / run-out warning.
**Status:** DONE (runs verified in Claude Code cloud sandbox; Termux / Muse VM not yet tested)
**Repo / branch:** 0xSneaks/claude-eyes @ `claude/vigilant-fermi-iqgkac` · **Last commit:** f93ca02 — merged to `main` (fast-forward, Sneaks said "push it" 2026-11-09)

## Did
- Data source: Claude Code statusline JSON `rate_limits.five_hour` / `seven_day` (documented, code.claude.com/docs/en/statusline) — VERIFIED real values captured
- `claude_eyes/core.py` parser + renderer, `claude_eyes/cli.py` (`statusline` hook, `probe`, `run`) — VERIFIED
- `probe`: hidden tmux Claude Code session, one Haiku reply ("reply with just: ok"), statusline hook caches numbers only, session killed — VERIFIED (11 s)
- First real run → `usage/claude.md` (session 97% → ALERT, weekly 42%) — VERIFIED
- README: how to run, cron every 2h (Linux + Termux), on-demand command, passive statusline mode

## State (evidence)
- Tests: `python3 -m unittest discover -s tests -t .` → 15 passed
- `/usage` screen: VERIFIED not usable headless (interactive only; showed no plan bars in the cloud sandbox)
- Deployed: no scheduler installed anywhere yet

## Decided
- Official path only; claude.ai browser fallback not built (not needed) — no cookies, tokens, internal APIs, billing toggles
- 5-hour = "Current session", 7-day = "Weekly all models" — INFERENCE; Sneaks to cross-check once against Settings → Usage
- Run-out warning: UNKNOWN source — statusline has no warning field; tool scans the Claude Code screen only

## Next (start here)
1. Muse (supersedes the 00:20 browser request): on your VM, clone claude-eyes (`main`), run `python3 -m claude_eyes run --coms ~/ai-coms --where muse-vm`, then add the crontab line from the README. Needs Claude Code logged in to Sneaks's plan + tmux.
2. Sneaks: compare one `usage/claude.md` with claude.ai Settings → Usage; say if the numbers match.

## Don't
- Don't use `claude -p "/usage"` — not supported headless.
- Don't put any Claude token in GitHub secrets / Actions to schedule this.

## ⚠️ High-risk
- None touched. Each probe spends one tiny Haiku turn of plan usage.
