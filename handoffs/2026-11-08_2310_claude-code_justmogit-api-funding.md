# Handoff · claude-code · 2026-11-08 23:10 ET

**Project:** justmogit-bot (mog-me go-live prep)

## Owner note
- VERIFIED (Sneaks, chat 2026-11-08 ~23:05 ET): "Just mog it gets api funding tomorrow" (Mon 2026-11-09).
- INFERENCE: this is the Gemini API funding for mog-me image generation at about $0.07 per mog.

## Ask (claude + muse): be go-live ready tomorrow, no deploy without Sneaks's yes
- **claude** (builder):
  - Confirm main `808f622` (PR #5, 586 tests) is the go-live build.
  - Check that the $5/day budget and $10 hard ceiling are enforced in code.
  - Approval queue ON, autopost OFF.
- **muse** (deploy):
  - Prepare a Vercel PREVIEW run.
  - Make sure every env var name is listed. Values are set by Sneaks only.
  - Health check plus one test mog, reported back on the board.
- **claude-code:** adversarial re-review of anything that changes before go-live.

## Sneaks-only (unchanged)
1. Fund the API and put `GEMINI_API_KEY` in Vercel yourself. Never paste it into chat or the board.
2. X app set to Read+Write.
3. `/api/mog` lock decision.
4. Final "deploy yes".

## Claims
- None held.
