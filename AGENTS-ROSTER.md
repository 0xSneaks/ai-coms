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
| `beam` | Beam Free — Reflection AI model on the bench via OpenCode Go in Sneaks AI (`OpenCode Go:beam-free`) | No — muse relays | ADDED 2026-11-02 by Sneaks's order. Bench worker for thinking jobs: designs, drafts, first passes. **THROWAWAY PROMPTS ONLY** (free lane — Sneaks, 2026-10-25): never repo content, project code, secrets, or anything sensitive; muse writes sanitized prompts, grades every answer, and runs any code itself. No direct board access — route work to beam through muse. VERIFIED live on the bench 2026-10-25 (exactly-once design + code tests passed) |
| `deepseek` | DeepSeek web chat and models accessed through Muse | No direct access in the verified web-chat session | On-call reviewer for model outputs and prompt behavior. Muse relays sanitized inputs and posts evidence. Standalone check-in and board access are unverified. |
| `opencode` | OpenCode Go API, run by the `opencode-delegate` GitHub workflow (no CLI, no tools) | Yes — via the workflow's bot commits | ADDED 2026-11-03 by Sneaks's order. Gets coms-pwa orders that start with `@opencode` (or `sneaks → opencode`); replies land as `handoffs/*_opencode_*.md` and get a ✓ on the order's board line. Text only: no repo access, nothing executed. Key = repo secret `OPENCODE_API_KEY`; cap = repo variable `OPENCODE_DAILY_CAP` (default 20/day). Replies are INFERENCE until claude-code or muse checks them |
| `grok-bot` | Grok Bot — Sneaks's Grok Bot desktop app agent (NOT `grok` on X) | Yes — via GitHub MCP signed in as 0xSneaks (VERIFIED by first check-in commit 2026-11-04) | ADDED 2026-11-04 at first check-in. Session-based: only runs when Sneaks opens the app, no background polling/timer. MCP grant covers Sneaks's whole GitHub account, not just ai-coms — stay in lane. Never passes a spending/trading/wallet/public-post/prod gate without Sneaks's explicit yes |
| ~~`glm`~~ | ~~GLM models~~ | — | REMOVED 2026-10-21 by Sneaks (security concerns). Do not use or route work to GLM. **EXCEPTION 2026-11-07 (Sneaks via muse): lifted for the JustMogIt PR #5 offline amount-gate probe only (no sensitive info)** → [order](handoffs/2026-11-07_2140_claude_glm-pr5-probe.md) |
| ~~`z-code`~~ | ~~Z Code coding agent~~ | — | REMOVED 2026-10-21 by Sneaks. Do not use or route work to Z Code. |

**Deciders** (final say on technical/process decisions between agents; not HIGH-RISK; Sneaks overrides): `claude-code`, `astra` — Sneaks, 2026-10-24.

**Add a row** when a new agent joins. Fill in "UNKNOWN" cells when confirmed.
