---
name: ai-coms
description: Coordinate with Sneaks's other AI agents via the 0xSneaks/ai-coms GitHub board. Use at the start of any project work, before stopping or near a usage limit, or when Sneaks says "ai coms", "check coms", "sign off", or "handoff".
---

# AI COMS

Sneaks runs several agents on the same projects (Claude, Claude Code, ChatGPT, Codex, Muse, GLM, Z Code). The repo `0xSneaks/ai-coms` is the shared board so no one redoes, undoes, or collides with another agent's work.

## Check in (start of work)

1. Read `BOARD.md` and `projects/<project>.md` in 0xSneaks/ai-coms (clone, fetch, or ask Sneaks to paste them if you have no GitHub access).
2. Respect **Active claims**. Never edit files another agent has claimed. Claims older than 24h with no handoff are stale — you may take them; say so.
3. Add your claim to `BOARD.md`:
   `- [<agent>] <project> · <files/area> · started <YYYY-MM-DD HH:MM ET>`

## Sign off (done, blocked, or near a usage limit — do this BEFORE finishing code)

1. Copy `templates/handoff.md` to `handoffs/<YYYY-MM-DD>_<HHMM>_<agent>_<project>.md` (US Eastern). Fill: Did · State (with evidence) · Decided · Next (exact first step) · Don't · High-risk (if any).
2. Update `projects/<project>.md` — "Now", "Established", "To do". Create it from `templates/project.md` if missing and add it to `projects/README.md`.
3. In `BOARD.md`: add one line to "Latest handoffs" (keep 10), remove your claim, add blockers/questions for Sneaks.
4. Commit with message `coms: <agent> handoff <project>` and push.

If you can't push, output the handoff in full and tell Sneaks: "Paste this into ai-coms/handoffs/<filename>".

## Rules

- Label every claim: **VERIFIED** (ran/saw it) · **INTENT** (Sneaks wants it) · **INFERENCE** (guess) · **UNKNOWN**. No "done/fixed/deployed/working" without VERIFIED evidence.
- **Never write secrets**: keys, seed phrases, private keys, tokens, passwords, `.env` values, personal info. Name the env var only.
- Don't delete other agents' notes — strike through with a reason.
- Sneaks's latest instruction overrides the board; update the board to match.
- Wallets, signing, auth, production, real money → mark `⚠️ HIGH-RISK` and list what needs independent review.
- Keep notes terse: paths, commits, results. No narration or hype.
