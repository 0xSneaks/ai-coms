# Handoff — claude-eyes install on muse-vm — muse — 2026-11-09 00:45 ET

**Session goal:** Install 0xSneaks/claude-eyes on Muse's VM per Sneaks's order (supersedes the 00:20 claude.ai browser usage-watch — browser route closed).
**Status:** DONE — tests pass, first VM run posted usage/claude.md, 2h schedule live.

## Did
- Cloned 0xSneaks/claude-eyes @ f93ca02 to ~/claude-eyes; skimmed all source (455 lines): read-only, no cookie/token/key handling; only tmux + git subprocess calls — VERIFIED
- Tests: `python3 -m unittest discover -s tests -t .` → **15 passed** — VERIFIED
- First run blockers found + fixed on the VM:
  1. `claude` was not on PATH for tmux sessions (CLI lives in ~/.npm-global/bin) → probe died instantly, exit 127. Fixed: symlink ~/.local/bin/claude → ~/.npm-global/bin/claude.
  2. ai-coms clone had no git identity → claude-eyes' internal commit failed (128). Fixed: repo-local user.name/user.email set (Sneaks noreply identity).
  3. `git push` over HTTPS cannot work from this VM (no username prompt possible). claude-eyes tolerates the failed push; pending commits are pushed via ~/workspace/ops/push-aicoms-pending.py (GitHub git-data API, every object SHA verified against local before the ref moves).
- First successful VM run output (2026-11-09 00:41 ET, commits 04a1755 + f75bc5f pushed, remote main verified):
  - **ALERT — Claude usage high (session 98% ≥ 80%; run-out warning shown)**
  - Current session (5-hour): **98%**, resets Mon 2026-11-09 01:40 ET
  - Weekly — all models (7-day): **42%**, resets Sat 2026-11-14 14:00 ET
  - Warning, word for word: "You've used 98% of your 5-hour limit · resets 1:40am (America/New_York) · /upgrade to keep using Claude Code"
  - Note: the VM's Claude Code login shows **Claude Pro** (v2.1.312); numbers match Claude's 97% reading minutes earlier — same account meter.
- Crontab: **NO** — this VM has no crontab binary/daemon at all. Equivalent installed instead: Muse scheduled job `claude-eyes-usage-watch`, every 2h, runs the exact README command (same PATH line incl. $HOME/.local/bin), logs to ~/.cache/claude-eyes/cron.log, pushes pending commits via the ops wrapper, and messages Sneaks only on ALERT (his exact alert wording) or hard failure. First scheduled run ~02:44 ET.
- On demand ("check claude usage"): `cd ~/claude-eyes && python3 -m claude_eyes run --coms ~/ai-coms --where muse-vm` + the push wrapper.

## Still Sneaks's
- One-time cross-check: compare one usage/claude.md reading vs claude.ai Settings → Usage to confirm the 5h/7d label mapping (INFERENCE in the README).

## Don't
- Don't re-add a system crontab if one appears later without removing the Muse job first — double runs double-spend probe turns.
