# Handoff — paperclip (Paperclip AI live test on Muse's VM) — 2026-10-21 06:15 ET
Agent: muse (operator). Experiment: paperclip/EXPERIMENT-MUSE.md, live run.

## Did
- VERIFIED Phase 0: Node 24, npm 10, persistence (nohup/tmux), 89G free; Claude CLI 2.1.306 + OpenCode 1.19.3 installed.
- VERIFIED Phase 1: Claude login via claude setup-token (1-year OAuth token, paperclip user secret store only); git credential stored (paperclip user) — plain git push to ai-coms proven (commit 67fef66).
- VERIFIED Phase 2: Paperclip 2026.1012.0 running on the VM as non-root user `paperclip` (server lives in a Muse runtime session; no systemd user manager). Company "Sneaks AI" imported; company secrets in the encrypted store (names only: CLAUDE_CODE_OAUTH_TOKEN, GITHUB_TOKEN).
- PLAN CHANGE (Sneaks): OpenCode free models rate-limited (shared Zen quota) -> Codex added. Codex CLI 0.163.0 installed; login via device auth on Sneaks's ChatGPT account (token on VM only); `codex exec "reply OK"` = OK. CEO agent switched opencode_local -> codex_local. Codex agent imported (engineer, reports to CTO).
- VERIFIED Phase 3 / EXPERIMENT-1 (task SNE-3): CEO delegated on its own (created SNE-4 for Claude Code). Claude Code created + pushed experiments/exp-1.md to main: content "EXP-1 · done by claude-code · 2026-10-21 05:44 ET · code BLUE-0321", delivery commit 4ac06b72bfbade2c85e5b181d64ca08655f6deed. CEO independently verified content, commented the commit link, closed SNE-3. PASS with one operator intervention (below).
- VERIFIED Phase 4 / EXPERIMENT-2 (task SNE-5), relay Claude Code -> Codex: CEO reassigned the whole task to Claude Code (no sub-task). Board paused Claude Code mid-run + posted "RELAY: simulated usage limit · next step: create and push experiments/exp-2.md". Codex finished it: experiments/exp-2.md = "EXP-2 · codex · 2026-10-21 06:10:49 EDT", commit df5c5ff2a58b12b74882f2f801b4b6b6dda8586c — on branch codex/sne-5-exp-2, NOT main. SNE-5 closed. PASS per the relay definition (Codex finished), with deviations below.

## State with proof
- Server: healthy on the VM (health endpoint ok, version 2026.1012.0). Agents: Muse (CEO, codex_local, heartbeat 3600s), Claude Code (CTO, claude_local, unpaused), Codex (engineer, codex_local). All cwd ~/ai-coms, GitHub secret bound.
- PLATFORM FINDING 1 (dispatch): in this build every wake (assignment, manual, invoke) is skipped unless heartbeat.wakeOnDemand=true, and heartbeat.enabled=false blocks all runs. "Timer off / assignment only" therefore = enabled:true + wakeOnDemand:true + wakeOnAssignment:true + long intervalSec (CTO + Codex set to 86400). EXP-1 needed this fix + one operator wake before Claude Code would run.
- PLATFORM FINDING 2 (relay routing): an agent's cross-issue write is rejected when its run is not bound to that issue ("supplied run ID invalid for cross-issue writes"). The CEO found the RELAY, chose Codex as finisher, but could not execute the reassignment; the board executed it. Also: when the CEO owns a task via reassignment (not parent/child), a paused assignee surfaces the relay to the board, not the CEO.
- PLATFORM FINDING 3: one zombie heartbeat run (2026-10-21 08:48 UTC, opencode rate-limit era) still shows status running; harmless so far.
- exp-2.md sits on branch codex/sne-5-exp-2; merging it to main is Sneaks's call, not done here.

## Decided
- CEO runs on codex_local (Sneaks's ChatGPT plan) instead of rate-limited OpenCode free models. OpenCode Go: Sneaks has no Go subscription (VERIFIED from his console 2026-10-21); only a $10 Zen balance — not used.
- Claude Code and Codex heartbeats left enabled with intervalSec 86400 + wake-on-assignment (see Finding 1); literal timer-off breaks dispatch in this build.

## Next exact first step
- Sneaks reviews the Phase 5 table in chat; if he wants exp-2.md on main, merge branch codex/sne-5-exp-2 (one PR or fast-forward).

## Don't
- Don't put any key/token in ai-coms, tasks, or chat. Secrets live in the paperclip user's store + Paperclip's encrypted store only.
- Don't set wakeOnDemand=false or heartbeat.enabled=false on any agent you expect to receive work — dispatch silently skips it.
- Don't touch the 7 local repo AGENTS.md pushes (held by Sneaks's order).
