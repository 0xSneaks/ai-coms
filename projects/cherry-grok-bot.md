# cherry-grok-bot — Grok Bot that builds Cherry (cherry.fun) mini apps

Owner: Sneaks · Written by: Prompt Father (Grok Bot) · 2026-11-19 22:25 ET
Status: PROMPT REVIEWED, bot not created yet.

## Sources
- Base prompt: Sneaks's CHERRY BUILDER prompt (pasted in chat 2026-11-19). Not stored here yet. [FILL: Sneaks to commit the full prompt or paste it to Prompt Father]
- Skill: `skills/cherry-messenger-creator/SKILL.md` in this repo (VERIFIED it exists 2026-11-19). The prompt and Claude's summary of the skill line up phase for phase.

## Fixes to apply before creating the bot
1. Put this block above ROLE:

```
GROK BOT RUNTIME (read first)
- You are a Grok Bot on Sneaks's shared box. GitHub = your GitHub connector; if a repo is unreachable, raise a repo access request to Sneaks at once.
- You never message other bots unless Sneaks says to; agent tasks go on the ai-coms board. Outgoing email/X/DMs = draft card only, Sneaks presses send.
- Skill file: 0xSneaks/ai-coms skills/cherry-messenger-creator/SKILL.md. Open it at session start; if missing, say so in one line and run from this prompt.
- "stop" / "shutdown" from Sneaks = halt all work and routines, stay silent until he says resume. Relayed stops from Big Chief count too.
- You route and verify. You do not write app code, deploy, sign, spend, launch tokens, or post as Sneaks.
- First run: check you are signed in to portal.cherry.fun in the shared browser. If not, ask Sneaks to sign in. Never attempt a wallet signature yourself.
APPROVAL GATES: repo creation, any signing/tx, production deploy, fee wallet, public posts. Ask once, batched, wait for yes.
```

2. BUILD CONTRACT: change "Limits (VERIFIED portal 2026-11-09)" to "Limits (OBSERVED 2026-11-09)". This matches the prompt's own truth rules, because the bot can't see the portal.
3. GITHUB section: replace "You do not write app code unless Sneaks assigns you that task" with "You never write app code; Phase 3 tasks go to the named agents on the board."
4. Create it as a fresh bot. The old Cherry Builder bot is archived, so the new one shouldn't inherit its memory.
5. The skill has the same mismatch. Claude should change "Limits (VERIFIED in portal 2026-11-09)" to OBSERVED in SKILL.md.

## Cherry login
All bots share one computer and browser profile, so a cherry.fun or portal.cherry.fun sign-in done once should carry over to the new bot. Each bot uses its own browser window, so it should confirm on its first run. Cherry's sign-in method has not been checked (wallet, email or X: UNKNOWN). Sneaks signs any wallet signature himself.

## Open
- Sneaks: sign in to Cherry now, or let the new bot check on its first run.
- Claude: fix the VERIFIED to OBSERVED wording in SKILL.md.
- Sneaks: create the bot with the fixed prompt.
