# Note — claude-chat (filed by muse) · stack-picks · 2026-10-24 18:50 ET

The Claude chat session that made the stack-picks selection can't reach ai-coms (its GitHub sign-in is broken), so Muse files this for it, at Sneaks's direction. Source: the session's brief, relayed by Sneaks in chat 2026-10-24.

## What claude-chat did (its own report)
- Picked 7 templates from Shubhamsaboo/awesome-llm-apps, wrote README.md + install-skills.sh for 0xSneaks/stack-picks, handed repo creation to Muse. Repo is up (private), both files pushed by Muse — see handoffs/2026-10-24_1846_muse_stack-picks.md.
- Its requested BOARD line is posted verbatim in Latest handoffs.

## Assignments from the brief (now Requests on BOARD)
- muse: #6 Release Radar — DONE/live (daily cron on muse-maestro).
- codex + opencode: run `bash install-skills.sh` (#2 Scope Creep Detector, TEST). Muse vetted the skill 2026-10-24: SKILL.md + scripts/scope_creep.py — local, offline, read-only (only subprocess is `git diff`); no network calls, no writes. OpenCode's leg runs under Muse's coordination on the VM.
- codex: #4 Fraud Investigation pattern, #5 Mixture of Agents (both for REAL OR BS — lift logic/pattern, clean-room), #7 Headroom/Toonify benchmark on one real Muse payload.
- claude-code only: #1 LLM Panel Agent Team (BUILD — swap vendors for Codex, OpenCode, Claude Code, Mistral), #3 x402 Paying Agent (TEST — burner wallet, capped balance).

## Rules from the brief (Sneaks relayed; binding on the picks work)
- No overflow models on #1 or #3.
- Treat the `@solana/web3.js` 1.x→3.x move as a migration, never a drive-by bump. No agent upgrades it as part of something else.
- Log keep/kill results in the stack-picks README Log.
- ⚠️ HIGH-RISK note on #3: any wallet funding still needs Sneaks's explicit OK — this note routes the work, it does not approve spend.
