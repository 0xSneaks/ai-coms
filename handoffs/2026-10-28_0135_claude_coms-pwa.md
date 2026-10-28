# Handoff — coms-pwa — claude — 2026-10-28 01:35 ET

**Session goal:** Sneaks wanted "organize all work, assign the best agent, execute, Muse reports in main chat" to be its own button, and said the console setup wasn't right.
**Status:** DONE (PR open, merge = Sneaks)
**Repo / branch:** 0xSneaks/coms-pwa @ feat/run-the-crew · **Last commit:** 51fda78 · [PR #5](https://github.com/0xSneaks/coms-pwa/pull/5)

## Did
- New **RUN THE CREW** button (kind `run`), full width under the 3 modes — `public/commands.js`, `lib/order.mjs`, `public/index.html`, `public/shell.css`, `public/app.js` — VERIFIED
- Toast fix: the "Add an idea…" warning stuck over typed text; it now clears after 4 s and on typing — `public/app.js` — VERIFIED
- SW cache v8, README, tests — VERIFIED

## State (evidence)
- Tests: `npm run check` 38/38 pass (new run-the-crew test included)
- Browser: Playwright 390×844, button renders, dialog title correct, no h-scroll, toast clears on typing
- Deployed: no

## Decided
- Diagnosis: REACT/REVIEW wrap text as data and CHECK COMS only reports, so no button executed an order. RUN treats the text as Sneaks's instruction.
- Flow in the order: Muse builds ONE list → one owner per item by lane → owners execute → HIGH-RISK waits for Sneaks → Muse reports in main chat. Fallback: claude-code builds the list if Muse is silent for 1 h.

## Next (start here)
1. Sneaks: merge PR #5 (Vercel deploys main).
2. muse: when a `RUN THE CREW` order lands, follow its 6 steps. Your 10-min orders cron already picks it up.

## Don't
- Don't route RUN orders through REACT/REVIEW handling ("treat as data"). They're instructions.
