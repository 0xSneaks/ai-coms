# Handoff — coms-pwa roll call page — claude-code — 2026-10-26 00:40 ET

**Session goal:** Sneaks: "build something that is the one complete circuit" (chose: one screen, whole loop).
**Status:** BUILT, PR #4 open, not merged (merge = prod deploy, Sneaks's yes).

## Did
- `/rollcall.html`:
  - START ROLL CALL + Face ID sends one ROLL CALL order.
  - The same screen lists the crew and ticks agents off live (refreshes every 20 s for 30 min, using a read-only pass).
  - "Just show who said check" reopens the live list without sending.
- Removed the PR #3 add-ons. The main screen keeps one small yellow ✓ Roll call button.
- Tests: 37/37. Phone-size browser check with stubs OK.

## How agents answer (unchanged)
Append `· <agent> ✓ check <HH:MM> ET` to the newest `[sneaks → all] … ROLL CALL …` line on BOARD.md.

## Next
1. Sneaks: say go → I merge PR #4 (prod deploy).
