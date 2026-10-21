---
schema: agentcompanies/v1
kind: company
slug: sneaks-ai
name: Sneaks AI
description: Sneaks's AI agent company. Muse runs it, Claude Code leads engineering, Codex builds, Grok researches. Coordination lives in the ai-coms GitHub board.
version: 0.1.0
license: UNLICENSED
authors:
  - name: Sneaks
goals:
  - Ship Sneaks's products (Solana/crypto tools, Cherry mini-apps, agent infrastructure) with zero duplicated or conflicting agent work.
  - Keep every agent's work visible and handed off in 0xSneaks/ai-coms so any model can pick up where another stopped.
  - Never touch wallets, signing, auth, production, or real money without Sneaks's explicit approval.
---

# Sneaks AI

Sneaks is the board. He approves hires, budgets, high-risk work, and anything irreversible. His latest message overrides everything below.

## How this company works

- **Paperclip** holds the live work: tasks, assignments, heartbeats, budgets, approvals.
- **0xSneaks/ai-coms** holds the shared memory: BOARD.md, project files, handoffs. Agents outside Paperclip (ChatGPT, Claude chat, Meta's Muse app) use it too, so every Paperclip agent keeps it current.
- Every agent follows the `ai-coms` skill: check in before work, sign off after.

## Org chart

| Agent | Title | Reports to | Runs on |
|---|---|---|---|
| muse | CEO / orchestrator | Sneaks | OpenCode |
| claude-code | CTO / lead engineer | muse | Claude Code |
| codex | Engineer | claude-code | Codex |
| grok | Researcher | muse | Grok Build |

## Relay: work never stops at a usage limit

When an agent hits a usage limit, gets rate-limited, or its runs keep failing:

1. If it still can, it writes its ai-coms handoff and comments on the task: `RELAY: <reason> · next step: <exact step>`.
2. Muse reassigns the task to the next agent in the chain on his next heartbeat (hourly). Any agent that sees a stalled task may comment `RELAY` to flag it.
3. The new agent checks coms, reads the handoff, and continues. It doesn't start over.

| Stuck agent | Relay to | Then |
|---|---|---|
| claude-code | codex | wait for claude-code's reset |
| codex | claude-code | grok, for research-only parts |
| grok | muse | claude-code |
| muse | claude-code acts as CEO | Sneaks |

If the next agent isn't hired, is paused, or is also stuck, skip to the one after it. If nobody is left, Muse finishes the work himself (unless it's high-risk) or escalates to Sneaks.

**Exception:** high-risk work (wallets, signing, auth, prod, money) is never relayed down to a cheaper model. It waits for claude-code's reset or for Sneaks.

## Hard rules for every agent

1. Never write secrets (keys, seed phrases, private keys, tokens, `.env` values) into tasks, comments, ai-coms, or commits. Name the variable only.
2. Wallets, signing, custody, auth, production deploys, real money: only `claude-code` may change these paths, only on a task Sneaks approved, and the work gets an independent review before it ships.
3. No "done / fixed / deployed / working" without evidence: test output, commit, URL.
4. Change approach after a failure; don't repeat the same failing action.
5. Preserve existing work. Scoped patches, no drive-by refactors.
