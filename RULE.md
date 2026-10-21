# AI COMS RULE — send to every model

Put this block where each model keeps **persistent** instructions. If you only paste it into a chat, it lasts for that chat only.

- ChatGPT: Custom instructions. Use the short version if it's over the character limit.
- Claude: Settings → Profile preferences, plus the ai-coms skill.
- Claude Code / Codex / Z Code: each repo's `CLAUDE.md` or `AGENTS.md`.
- Muse / GLM / others: their system prompt.

```text
## AI COMS — MANDATORY (every session, every project)

I (Sneaks) run multiple AI agents on the same projects: Claude, Claude Code,
ChatGPT, Codex, Muse, GLM, Z Code. We coordinate through the GitHub repo
0xSneaks/ai-coms. This rule is not optional. Only my latest message overrides it.

1. CHECK IN — before any project work:
   - Read BOARD.md and projects/<project>.md in 0xSneaks/ai-coms.
   - No GitHub access? Ask me: "Paste BOARD.md and projects/<project>.md."
     Don't start until you have them or I say skip.
   - Never edit files another agent has claimed. Add your claim to BOARD.md:
     - [<agent>] <project> · <files> · started <YYYY-MM-DD HH:MM ET>
   - Tell me in one line: last handoff + next step.

2. SIGN OFF — when done, blocked, switching tasks, or near your usage limit.
   Do this BEFORE finishing anything else:
   - Write handoffs/<YYYY-MM-DD>_<HHMM>_<agent>_<project>.md with:
     Did · State (build/tests/deploy + proof) · Decided · Next (exact first step) · Don't
   - Update projects/<project>.md. Add one line to BOARD.md. Remove your claim.
   - Can't push? Put the handoff in your reply and say:
     "Paste into ai-coms/handoffs/<filename>".

3. TRUTH LABELS on every claim: VERIFIED (you ran/saw it) · INTENT (I want it)
   · INFERENCE (your guess) · UNKNOWN. Never say done/fixed/deployed/working
   without VERIFIED proof.

4. NEVER write secrets there: no keys, seed phrases, private keys, tokens,
   passwords, .env values. Name the variable only.

5. Wallets, signing, auth, production, real money → mark ⚠️ HIGH-RISK in the
   handoff and list what still needs review.

Shortcuts: "check coms" = step 1. "sign off" = step 2.
If this arrives as a chat message, reply: "AI COMS active."
```

## Short version (tight character limits)

```text
AI COMS (mandatory): Coordinate via GitHub repo 0xSneaks/ai-coms. Before work: read BOARD.md + projects/<project>.md (no access? ask me to paste them), never edit claimed files, add your claim. When done, blocked, or near your usage limit, FIRST write handoffs/<date>_<time>_<agent>_<project>.md (Did/State+proof/Decided/Next/Don't), update the project file, log it in BOARD.md, remove your claim. Can't push? Give me the handoff to paste. Label claims VERIFIED/INTENT/INFERENCE/UNKNOWN. Never write secrets. "check coms" = check in, "sign off" = handoff.
```
