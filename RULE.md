# AI COMS RULE — send to every model

Put this block where each model keeps **persistent** instructions. If you only paste it into a chat, it lasts for that chat only.

- ChatGPT: Settings → Personalization → Custom instructions. Use the short version, which fits the character limit.
- Claude: Settings → Profile preferences, plus the ai-coms skill.
- Claude Code: `~/.claude/CLAUDE.md` (covers every project).
- Codex / Z Code: `~/.codex/AGENTS.md` or each repo's `AGENTS.md`.
- Muse / others: their system prompt.

## Full version

```text
## AI COMS — ALWAYS ON (every session, every project, no exceptions)

I'm Sneaks. I run many AI agents on the same projects (Claude, Claude Code,
ChatGPT, Codex, Muse, Z Code). We share one board: GitHub repo
0xSneaks/ai-coms (https://github.com/0xSneaks/ai-coms). Use it every time.
Only my latest message overrides this.

1. CHECK IN — first thing, before touching any project:
   - Read BOARD.md and projects/<project>.md.
   - No GitHub access? Ask me to paste them. Don't start until you have
     them or I say "skip".
   - Never edit files another agent claimed. Add your claim to BOARD.md:
     - [<agent>] <project> · <files> · started <YYYY-MM-DD HH:MM ET>
   - Tell me in one line: last handoff + next step.

2. SIGN OFF — every time you finish, get blocked, switch tasks, or get near
   your usage limit. Do this FIRST, before finishing anything else:
   - Write handoffs/<YYYY-MM-DD>_<HHMM>_<agent>_<project>.md:
     Did · State (build/tests/deploy + proof) · Decided · Next (exact first step) · Don't
   - Update projects/<project>.md. Add one line to BOARD.md. Remove your claim.
   - Can't push? Put the handoff in your reply:
     "Paste into ai-coms/handoffs/<filename>".

3. A task is NOT done until the handoff exists. End your final reply with:
   "Coms: signed off → <filename>" (or the handoff text).

4. Label every claim: VERIFIED · INTENT · INFERENCE · UNKNOWN.
   No done/fixed/deployed/working without VERIFIED proof.

5. Never write secrets: no keys, seed phrases, private keys, tokens,
   passwords, .env values. Name the variable only.

6. Wallets, signing, auth, production, real money → mark ⚠️ HIGH-RISK.

"check coms" = step 1 · "sign off" = step 2.
If you get this as a message, reply "AI COMS active."
```

## Short version (ChatGPT custom instructions and other tight limits)

```text
AI COMS — ALWAYS ON. I run many AI agents on the same projects. Shared board: GitHub repo 0xSneaks/ai-coms. Only my latest message overrides this.
1) CHECK IN before any project work: read BOARD.md + projects/<project>.md (no GitHub access? ask me to paste them; don't start without them unless I say skip). Never edit files another agent claimed. Add your claim. Tell me the last handoff + next step in one line.
2) SIGN OFF when done, blocked, switching tasks, or near your usage limit — do it FIRST: write handoffs/<date>_<time>_<agent>_<project>.md (Did / State + proof / Decided / Next / Don't), update the project file, log it in BOARD.md, remove your claim. Can't push? Give me the handoff to paste.
3) A task isn't done until the handoff exists. End final replies with "Coms: signed off → <filename>".
4) Label claims VERIFIED/INTENT/INFERENCE/UNKNOWN. Never write secrets. Wallets/auth/prod/money = ⚠️ HIGH-RISK.
"check coms" = check in · "sign off" = handoff.
```
