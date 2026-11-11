# For: grok-bot · From: claude · 2026-11-11 02:00 ET
## Re: Cherry number cards — re-illustrate 36 cards, HEARTS FIRST

**Kind:** ORDER (Sneaks's order, relayed by muse → [handoff](2026-11-11_0145_muse_claude-cherry-cards-redo.md)) · **Project:** cherry-holdem · **Repo:** 0xSneaks/cherry-cards, branch `main`
**Status:** OPEN — hearts only. Do NOT start diamonds until claude marks hearts PASS on the board line.

### Pre-check (claude, VERIFIED against cherry-cards @ 8cecebc6, 2026-11-11 02:00 ET)
- Commit dc13ae7 added all 11 sheets: `artwork/01-hearts-ace-court.jpg`, `02-diamonds-ace-court.jpg`, `03-clubs-ace-court.jpg`, `04-spades-ace-court.jpg`, `05-blank-and-jokers.jpg`, `06-card-backs.jpg`, `07-suit-pips.jpg`, `08-chips.jpg`, `09-holdem-table.jpg`, `10-blackjack-table.jpg`, `11-ui-tokens.jpg` (+ README.md). All 11 present on main.
- `artwork/numbers/` holds all 36 flat files: `card-{hearts,diamonds,clubs,spades}-{2..10}.jpg`. None missing.
- Note: `artwork/02-diamonds-ace-court.jpg` was re-rolled in 72168a0 (corner letters removed). Use the **main** version of every sheet as reference, not the dc13ae7 blob.

---

## BRIEF (verbatim, sheet paths filled in)

Re-illustrate the 36 number cards (2–10, all 4 suits) of the Cherry deck as illustrated art, in the same hand and style as your 11 original sheets in 0xSneaks/cherry-cards (commit dc13ae7). They replace the flat template versions. Don't trace, stamp, or reuse that template.

Match the deck on every card:
- Palette: plum #2E0F2A background, cream #F7EEDC face, cherry red #C8102E, pink #FF5C8A, gold #D4A73A.
- Same card frame and proportions as sheets 01–04 (`artwork/01-hearts-ace-court.jpg`, `artwork/02-diamonds-ace-court.jpg`, `artwork/03-clubs-ace-court.jpg`, `artwork/04-spades-ace-court.jpg`): one upright portrait card per image, on the plum background.
- Sakura vines, cherry motifs, and gold filigree worked along the edges and through the open space between pips, the way the courts, jokers (05, `artwork/05-blank-and-jokers.jpg`), and backs (06, `artwork/06-card-backs.jpg`) carry them. Each suit follows its own court sheet for colors and motifs: 01 hearts (`artwork/01-hearts-ace-court.jpg`), 02 diamonds (`artwork/02-diamonds-ace-court.jpg`), 03 clubs (`artwork/03-clubs-ace-court.jpg`), 04 spades (`artwork/04-spades-ace-court.jpg`).
- Pips: glossy and gold-trimmed, the same family as sheet 07 (`artwork/07-suit-pips.jpg`) and the Aces. Illustrated, not flat stamps. Every card gets its own art, with no repeated template.

Playing rules (don't change these):
- Rank is shown by pip count only, in the standard layouts:
  2: top and bottom center
  3: the 2 layout plus center
  4: the four corners of the pip field
  5: the 4 layout plus center
  6: two columns of 3
  7: the 6 layout plus one center-upper pip
  8: the 6 layout plus center-upper and center-lower pips
  9: two columns of 4 plus center
  10: two columns of 4 plus center-upper and center-lower pips
- Bottom-half pips are rotated 180°.
- No text anywhere: no digits, letters, or corner indices.
- The top-left and bottom-right index corners stay empty: no pips, vines, or flowers there. Indices get added in code later.

Process and delivery:
- One suit at a time, hearts first. Deliver the hearts set and wait for verification before starting the next suit.
- Commit to main at artwork/numbers/card-{suit}-{rank}.jpg, replacing the flat files. Don't touch the 11 original sheets.
- Report the commit hash, the file list, and a per-card pip-count checklist.
- Reject your own card before delivery if it looks template-flat, repeats another card's art, has the wrong pip count, or has anything in the index corners.

---

### How to report (grok-bot)
Append to this order's `[claude → grok-bot]` line on BOARD.md: `· grok-bot ✓ hearts <commit hash> <HH:MM> ET`, and put the file list + per-card pip checklist in a handoff `handoffs/<date>_<time>_grok-bot_number-cards-hearts.md`.

### What happens next (claude)
claude verifies each card side by side against sheets 01–06 and the matching court sheet, counts pips, checks both index corners are empty, then marks PASS (next suit opens) or sends back single failed cards by name. Verdicts go to Sneaks and muse with the hash and file list. Nothing is "done" without the commit hash.
