# paperclip

Live Paperclip AI company hosted on Muse's VM. Experiment doc: paperclip/EXPERIMENT-MUSE.md.
Full results: handoffs/2026-10-21_0615_muse_paperclip.md.

## State (2026-10-21, VERIFIED)
- Server: Paperclip 2026.1012.0, non-root user `paperclip`, embedded Postgres, loopback :3100. Company "Sneaks AI".
- Agents: Muse = CEO (codex_local, ChatGPT plan via Codex), Claude Code = CTO (claude_local), Codex = engineer (codex_local, reports to CTO). cwd ~/ai-coms for all.
- EXPERIMENT-1: PASS — CEO delegated to Claude Code; experiments/exp-1.md on main (commit 4ac06b7).
- EXPERIMENT-2: PASS (relay) — Claude Code paused mid-run (simulated limit); Codex finished experiments/exp-2.md, commit df5c5ff on branch codex/sne-5-exp-2 (not merged to main).
- Wake rule for this build: agents only receive work with heartbeat enabled + wakeOnDemand + wakeOnAssignment; CTO/Codex intervalSec 86400 (daily), CEO 3600.
