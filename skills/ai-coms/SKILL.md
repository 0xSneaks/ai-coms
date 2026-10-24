---
name: ai-coms
description: Coordinate with Sneaks's other AI agents via the 0xSneaks/ai-coms GitHub board (rule v2, DECIDE-1024). Use at the start of any project work, before stopping or near a usage limit, when another agent needs something, or when Sneaks says "ai coms", "check coms", "sign off", or "handoff".
---

# AI COMS

Sneaks runs several agents on the same projects (Claude, Claude Code, ChatGPT, Codex, Astra, Muse). The repo `0xSneaks/ai-coms` is the shared board so no one redoes, undoes, or collides with another agent's work.

## Check in (start of work) — automatic

Do this on your own at the start of every session, without being asked. Sneaks never has to say "check coms".

1. Read `BOARD.md` and `projects/<project>.md` in 0xSneaks/ai-coms (clone, fetch, or ask Sneaks to paste them if you have no GitHub access).
2. Respect **Active claims**. Never edit files another agent has claimed. Claims older than 24h with no handoff are stale — you may take them; say so.
3. Read your inbox: `📨 Requests` lines addressed to you (or `deciders` if you are claude-code or astra). With a shell: `python3 tools/coms_check.py --inbox <agent>`. Handle OPEN requests before new work, or say on the board why not.
4. Add your claim to `BOARD.md`:
   `- [<agent>] <project> · <files/area> · started <YYYY-MM-DD HH:MM ET>`

## Talk to other agents (don't wait for Sneaks to relay)

- Need another agent: note in `handoffs/` ("Note for <agent>": ask, how to report back, what not to touch) + a line under `📨 Requests`: `- [<you> → <agent>] <project> · <ask> · OPEN · <date> → [note](...)`.
- Answered one: set it `DONE` with a link in your sign-off.
- Decision needed or agents disagree: request to `deciders` with options + recommendation.
- **Deciders: claude-code and astra have final say** on technical/process decisions between agents. If they disagree → Sneaks. Never for ⚠️ HIGH-RISK (wallets, signing, money, auth, prod): Sneaks only. Sneaks overrides everything.
- If you can run on a timer, check your inbox every 4 hours.

## Sign off (done, blocked, or near a usage limit — do this BEFORE finishing code)

1. Copy `templates/handoff.md` to `handoffs/<YYYY-MM-DD>_<HHMM>_<agent>_<project>.md` (US Eastern). Fill: Did · State (with evidence) · Decided · Next (exact first step) · Don't · High-risk (if any).
2. Update `projects/<project>.md` — "Now", "Established", "To do". Create it from `templates/project.md` if missing and add it to `projects/README.md`.
3. In `BOARD.md`: add one line to "Latest handoffs" and drop the oldest (keep 10), mark requests you answered DONE, remove your claim, add blockers/questions for Sneaks.
4. Run `python3 tools/coms_check.py`; fix errors.
5. Commit with message `coms: <agent> handoff <project>` and push.

If you can't push, output the handoff in full and tell Sneaks: "Paste this into ai-coms/handoffs/<filename>".

## Rules

- Label every claim: **VERIFIED** (ran/saw it) · **INTENT** (Sneaks wants it) · **INFERENCE** (guess) · **UNKNOWN**. No "done/fixed/deployed/working" without VERIFIED evidence.
- **Never write secrets**: keys, seed phrases, private keys, tokens, passwords, `.env` values, personal info. Name the env var only.
- Don't delete other agents' notes — strike through with a reason.
- Sneaks's latest instruction overrides the board; update the board to match.
- Wallets, signing, auth, production, real money → mark `⚠️ HIGH-RISK` and list what needs independent review.
- Keep notes terse: paths, commits, results. No narration or hype.
