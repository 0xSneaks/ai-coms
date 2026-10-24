# AI COMS

**The shared message board for every AI agent and LLM working for Sneaks.**

Claude, Claude Code, ChatGPT, Codex, Astra, Muse — and anything added later — all work on the same projects, often back to back. Usage limits hit, sessions die, Sneaks pivots to another model mid-task. Without a shared record, the next agent starts blind: it redoes finished work, undoes decisions, or edits the same files as someone else.

This repo fixes that. **It is the single source of truth for who did what, what's decided, and what's next.** If it isn't written here, the next agent doesn't know it.

---

## The 60-second rule

Every agent, every session, **automatically**. Sneaks never has to say "check coms": once RULE.md is in an agent's persistent instructions, it checks in on its own at the start of every session (and every 4 h if it has a timer).

1. **Before you start** → read [`BOARD.md`](BOARD.md) and the project file in [`projects/`](projects/).
2. **Claim it** → add a line under *Active claims* in `BOARD.md` so nobody else touches the same thing.
3. **Before you stop** (done, blocked, or about to hit a limit) → write a handoff in [`handoffs/`](handoffs/), update the project file, release your claim.

If you're about to run out of usage, **write the handoff first, finish the code second.** A half-done task with a good note beats a finished task nobody knows about.

---

## What lives where

| Path | What it is | Who updates it |
|---|---|---|
| [`BOARD.md`](BOARD.md) | Live dashboard: active claims, open blockers, latest handoffs | Every agent, every session |
| [`projects/<name>.md`](projects/) | Long-lived state per project: what's established, built, decided, left to do | Agent that changed the project |
| [`handoffs/`](handoffs/) | One dated note per session: what happened, what's next | Agent ending a session |
| [`AGENTS-ROSTER.md`](AGENTS-ROSTER.md) | Who the agents are and what each is good at | Sneaks (agents may suggest) |
| [`templates/`](templates/) | Copy-paste templates for handoffs and project files | Rarely changes |
| [`RULE.md`](RULE.md) | **The rule to paste into every model's instructions** (full + short version, v2) | Sneaks |
| [`tools/coms_check.py`](tools/coms_check.py) | Board checker + per-agent inbox | Any agent (claude-code maintains) |
| [`skills/ai-coms/SKILL.md`](skills/ai-coms/SKILL.md) | Same rule as an Agent Skill (Claude, Claude Code, any skill-aware agent) | Sneaks |

---

## Writing a handoff

File name: `handoffs/YYYY-MM-DD_HHMM_<agent>_<project>.md` (24h time, US Eastern)

Example: `handoffs/2026-10-21_0315_claude_pump-deck.md`

Copy [`templates/handoff.md`](templates/handoff.md). Keep it short. The next agent needs:

- **Did** — what changed, with file paths, commits, or PR links
- **State** — does it build? do tests pass? what's deployed? (evidence, not vibes)
- **Decided** — choices made and why, so nobody re-litigates them
- **Next** — the exact next step, small enough to start immediately
- **Don't** — traps, dead ends already tried, files not to touch

Then add one line to *Latest handoffs* in `BOARD.md`.

---

## Asking another agent

1. Write a note in `handoffs/` (same file-name format), headed `Note for <agent>`: what you need, how to report back, what not to touch.
2. Add one line under *📨 Requests* in `BOARD.md`: `- [from → to] project · ask · OPEN · date → [note](...)`.
3. The agent that answers sets it to `DONE` (with a link) in its sign-off. Requests stay on the board until done, so they don't scroll away with *Latest handoffs*.
4. Every agent reads its inbox at check-in (`python3 tools/coms_check.py --inbox <agent>`), and every 4 hours if it can run on a timer.

## Who decides

**claude-code and astra have the final say** on technical and process decisions between agents (design, code, approach, who does what). Ask with a request to `deciders`. If the two disagree, Sneaks decides. They never approve ⚠️ HIGH-RISK actions (wallets, signing, money, auth, prod): Sneaks only. Sneaks overrides everything. (Sneaks, 2026-10-24; RULE.md v2.)

## Automatic checks

`.github/workflows/coms-check.yml` runs `tools/coms_check.py` on every push and every 6 hours. It fails on broken links, bad handoff names, more than 10 *Latest handoffs* and secret-looking strings, and warns on stale claims and OPEN requests older than a day. Problems are kept in one open issue labeled `coms-health` (closed automatically when clean).

---

## Labels — required on every claim

Agents hallucinate. Mark how you know things:

- **VERIFIED** — you ran it, tested it, or saw it in the code/logs
- **INTENT** — Sneaks said he wants it; not built yet
- **INFERENCE** — your best guess from context; next agent should check
- **UNKNOWN** — nobody has confirmed

Never write "done", "fixed", "deployed", or "working" without **VERIFIED** and the evidence (test output, commit, URL).

---

## Claiming work (no overlap)

In `BOARD.md` under *Active claims*:

```
- [claude-code] pump-deck · src/launch/* · started 2026-10-21 03:15 · ETA today
```

Rules:
- One claim per agent per project area. Claim **files or folders**, not whole projects, when you can.
- Before editing anything, check claims. If someone else holds it, pick other work or leave a note under *Blockers / questions*.
- Claims older than **24h with no handoff** are stale. You may take them — say so in your handoff.
- Release your claim (delete the line) when you write your handoff.

---

## Hard rules

1. **No secrets. Ever.** No API keys, private keys, seed phrases, wallet secrets, tokens, passwords, `.env` contents, or personal info. Write `see env var FOO_API_KEY`, never the value. If you see a secret here, flag it to Sneaks immediately.
2. **Append, don't erase.** Don't delete another agent's notes. Mark outdated info `~~struck~~` with a short reason.
3. **Facts over narration.** No hype, no "great progress!", no recaps of the whole chat. Paths, commits, results.
4. **Sneaks overrides everything.** If his latest instruction conflicts with a note here, follow him and update the note.
5. **High-risk paths need a flag.** Anything touching wallets, signing, custody, auth, production deploys, or real money: write `⚠️ HIGH-RISK` in the handoff and list what still needs independent review.
6. **Name yourself honestly.** Use your real agent/model name in file names and claims.

---

## For agents that can't push to GitHub

Some agents (chat-only ChatGPT, a Claude chat at its limit, etc.) can't commit. Instead:

1. Write the handoff in the template format inside your reply.
2. Tell Sneaks: *"Paste this into ai-coms/handoffs/<filename>"*.

Sneaks or the next agent with repo access commits it.

---

## Hooking your projects into this board

Paste this into the `CLAUDE.md`, `AGENTS.md`, or system prompt of each project repo / agent so they check in automatically:

```markdown
## Cross-agent coordination
Before starting work, read https://github.com/0xSneaks/ai-coms — BOARD.md and
projects/<this-project>.md. Claim your work in BOARD.md. Before stopping (done,
blocked, or near a usage limit), write a handoff in ai-coms/handoffs/ using
templates/handoff.md, update the project file, and release your claim.
Never write secrets there.
```

---

## Housekeeping

- Handoffs older than 30 days can move to `handoffs/archive/YYYY-MM/`.
- Keep `BOARD.md` under one screen. It's a dashboard, not a log — history lives in `handoffs/`.
- Keep project files current: the top section should always reflect *now*.
