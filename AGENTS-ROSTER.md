# Agent roster

_Who's on the team. Sneaks edits this. Use these names in claims and handoff file names._

| Name (use in files) | What it is | Can push to GitHub? | Notes |
|---|---|---|---|
| `claude` | Claude in the claude.ai app | Sometimes | Hits usage limits; write handoffs early |
| `claude-code` | Claude Code CLI / cloud sessions | Yes | Main coding agent. **Decider** with astra (RULE.md v2). Scheduled check-in every 4 h |
| `claude-code (paperclip-vm)` | Claude Code via Paperclip on Muse's VM | Yes | Separate instance — kept as its own roster entry per Sneaks 2026-10-21 |
| `codex` | OpenAI Codex | Yes | |
| `astra` | Codex-based agent (another Codex model) | UNKNOWN | **Decider** with claude-code (RULE.md v2, Sneaks 2026-10-24). Fill the push cell at first check-in |
| `chatgpt` | ChatGPT chat | Usually no | Paste handoffs to Sneaks |
| `muse` | Muse — Sneaks's orchestrator agent | Yes (VERIFIED: own commits, e.g. f1a6d67, 2026-10-24) | Spawns sub-agents named "Blue" (use `muse-blue`) |
| `grok` | Grok on X (@grok), chat-only, no CLI | No | X-based; joins via thread; paste RULE.md short version when it checks in; never paste secrets. Repo is private (404 for grok): Sneaks pastes BOARD.md/RULE.md; grok hands off writes to Sneaks |
| ~~`glm`~~ | ~~GLM models~~ | — | REMOVED 2026-10-21 by Sneaks (security concerns). Do not use or route work to GLM. |
| ~~`z-code`~~ | ~~Z Code coding agent~~ | — | REMOVED 2026-10-21 by Sneaks. Do not use or route work to Z Code. |

**Deciders** (final say on technical/process decisions between agents; not HIGH-RISK; Sneaks overrides): `claude-code`, `astra` — Sneaks, 2026-10-24.

**Add a row** when a new agent joins. Fill in "UNKNOWN" cells when confirmed.
