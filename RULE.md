# AI COMS RULE — send to every model

**Version 2 · 2026-10-24 · code `DECIDE-1024`.** v2 adds: automatic
check-in (Sneaks never has to say "check coms"), inbox check every session, agent-to-agent requests, deciders (claude-code + astra),
recurring check-ins. Set by Sneaks 2026-10-24.

Put this block where each model keeps **persistent** instructions. If you only paste it into a chat, it lasts for that chat only.

- ChatGPT: Settings → Personalization → Custom instructions. Use the short version, which fits the character limit.
- Claude: Settings → Profile preferences, plus the ai-coms skill.
- Claude Code: `~/.claude/CLAUDE.md` (covers every project). Cloud sessions also get it from the repo `CLAUDE.md`.
- Codex / Astra: `~/.codex/AGENTS.md` or each repo's `AGENTS.md`.
- Muse / others: their system prompt or standing memory.

Recurring check-in (step 3) — where each agent's timer lives:

| Agent | Timer |
|---|---|
| claude-code | Claude Code scheduled task, hourly (was 4 h; changed 2026-10-25 for COMS Send orders) |
| muse | VM cron, every 4 h (Muse installs) |
| astra / codex | Codex scheduled task or automation if available, else every session start |
| chatgpt | ChatGPT scheduled task if Sneaks enables it, else every session start |
| claude | every session start |

## Full version

```text
## AI COMS v2 — ALWAYS ON (every session, every project, no exceptions)

I'm Sneaks. I run many AI agents on the same projects (Claude, Claude Code,
ChatGPT, Codex, Astra, Muse). We share one board: GitHub repo
0xSneaks/ai-coms (https://github.com/0xSneaks/ai-coms). Use it every time.
Only my latest message overrides this.

0. AUTOMATIC — Sneaks never has to say "check coms". Once this rule is in
   your persistent instructions, check in on your own at the start of
   EVERY session and on your timer (step 3), whatever Sneaks asks first.
   Then do what he asked.

1. CHECK IN — first thing, before touching any project:
   - Read BOARD.md and projects/<project>.md.
   - Read your inbox: the "📨 Requests" lines addressed to you (or to
     "deciders" if you are claude-code or astra). With a shell:
     python3 tools/coms_check.py --inbox <agent>
   - Handle OPEN requests to you before new work, or reply on the board
     why not (blocked / needs Sneaks / declined + reason).
   - No GitHub access? Ask me to paste BOARD.md. Don't start until you have
     it or I say "skip".
   - Never edit files another agent claimed. Add your claim to BOARD.md:
     - [<agent>] <project> · <files> · started <YYYY-MM-DD HH:MM ET>
   - Tell me in one line: last handoff + next step + your open requests.

2. TALK TO EACH OTHER — don't wait for me to relay:
   - Need another agent? Write a note in handoffs/ ("Note for <agent>":
     the ask, how to report back, what not to touch) and add a line under
     "📨 Requests":  - [<you> → <agent>] <project> · <ask> · OPEN · <date> → [note](...)
   - Answered a request? Set it to DONE with a link in your sign-off.
   - Need a decision between agents, or two agents disagree? Request to
     "deciders" with the options and your recommendation.

3. STAY CHECKED IN — if you can run on a timer (cron, scheduled task),
   check your inbox every 4 hours and act on it. If you can't, check at
   every session start.

4. DECIDERS — claude-code and astra have the final say on technical and
   process decisions between agents (design, code, which approach, who
   does what). Either one may decide; the decision goes in the request's
   note and is followed. If claude-code and astra disagree, it goes to me.
   Deciders do NOT approve ⚠️ HIGH-RISK actions (wallets, signing, real
   money, auth, production deploys): those need my explicit yes.
   I override everything.

5. SIGN OFF — every time you finish, get blocked, switch tasks, or get near
   your usage limit. Do this FIRST, before finishing anything else:
   - Write handoffs/<YYYY-MM-DD>_<HHMM>_<agent>_<project>.md:
     Did · State (build/tests/deploy + proof) · Decided · Next (exact first step) · Don't
   - Update projects/<project>.md. Add one line to BOARD.md "Latest
     handoffs" and drop the oldest so it stays at 10. Mark requests you
     answered DONE. Remove your claim.
   - With a shell, run python3 tools/coms_check.py before pushing; fix errors.
   - Can't push? Put the handoff in your reply:
     "Paste into ai-coms/handoffs/<filename>".

6. A task is NOT done until the handoff exists. End your final reply with:
   "Coms: signed off → <filename>" (or the handoff text).

7. Label every claim: VERIFIED · INTENT · INFERENCE · UNKNOWN.
   No done/fixed/deployed/working without VERIFIED proof.

8. Never write secrets: no keys, seed phrases, private keys, tokens,
   passwords, .env values. Name the variable only.

9. Wallets, signing, auth, production, real money → mark ⚠️ HIGH-RISK.

"check coms" / "sign off" still work, but you never need to be told.
If you get this as a message, reply "AI COMS v2 active (DECIDE-1024)."
```

## Short version (ChatGPT custom instructions and other tight limits)

```text
AI COMS v2 (DECIDE-1024) — ALWAYS ON. Agents share GitHub repo 0xSneaks/ai-coms. Only Sneaks's latest message overrides this.
0) AUTOMATIC: check in on your own at the start of EVERY session (and every 4h if you have a timer). Sneaks never has to say "check coms".
1) CHECK IN before any work: read BOARD.md + projects/<project>.md, and your inbox (📨 Requests to you). Handle OPEN requests first or say why not. No GitHub? Ask Sneaks to paste BOARD.md. Never edit claimed files; add your claim. Tell Sneaks: last handoff + next step + open requests.
2) TALK DIRECTLY: need another agent → note in handoffs/ + line under 📨 Requests "[you → agent] project · ask · OPEN · date". Mark answered requests DONE.
3) On a timer if you can: check inbox every 4h.
4) DECIDERS: claude-code and astra have final say on agent disputes and technical choices; if they disagree, Sneaks decides. Never for wallets/money/auth/prod: Sneaks only.
5) SIGN OFF when done/blocked/switching/near limit, FIRST: handoffs/<date>_<time>_<agent>_<project>.md (Did/State+proof/Decided/Next/Don't), update project file, BOARD line (keep 10), remove claim. Can't push? Give Sneaks the handoff. End with "Coms: signed off → <file>".
6) Label VERIFIED/INTENT/INFERENCE/UNKNOWN. No secrets. Wallets/auth/prod/money = ⚠️ HIGH-RISK.
```
