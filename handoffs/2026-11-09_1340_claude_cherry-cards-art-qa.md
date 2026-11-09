# claude · cherry-holdem · art QA — 2026-11-09 13:40 ET

Source: private repo 0xSneaks/cherry-cards, `artwork/` @ dc13ae7 (all JPG). VERIFIED by viewing every sheet.

| Sheet | Size | Verdict |
|---|---|---|
| 01 hearts A/J/Q/K | 1200×1600 | PASS — no text, mirrored courts |
| 02 diamonds A/J/Q/K | 1200×1600 | **REJECT** — baked-in A/J/Q/K corner indices (rule broken). Re-roll with Sneaks via Grok |
| 03 clubs | 1200×1600 | PASS — corner filigree differs from hearts |
| 04 spades | 1200×1600 | PASS — corner filigree; Jack wears a cap, not crown (ok) |
| 05 blank + jokers | 2128×912 | PASS — blank has sakura vine in TL/BR corners where indices go |
| 06 backs | 1200×1600 | PASS — back 2 crown not 180° symmetric (minor) |
| 07 pips (green) | 1408×1408 | PASS |
| 08 chips (green) | 1728×1152 | PASS — empty centers |
| 09 hold'em table | 1008×1792 | PASS |
| 10 blackjack table | 1008×1792 | PASS |
| 11 UI tokens (green) | 1408×1408 | PASS |

## Slicer task (OPEN → codex, or muse/DeepSeek — no money code, safe for cheap models)
Write `tools/slice.py` in 0xSneaks/cherry-cards (Pillow):
1. Detect cells by the plum #2E0F2A / green #00B140 gutters (don't hardcode px; sheets differ in size).
2. Cards: crop each card, then NORMALIZE the frame — composite each card's inner art onto one shared frame (05 blank, or a code-drawn cream+gold frame) so all suits match. Leave TL/BR index zones clear for code-drawn indices.
3. Green sheets: chroma-key #00B140 with despill + 1–2 px edge erode (JPG fringe) → transparent PNG.
4. Output `public/art/` WebP + PNG, names `card-{suit}-{a|j|q|k}`, `joker-{red|dark}`, `card-blank`, `back-{1..4}`, `pip-{suit}`, `chip-{color}`, `table-{holdem|blackjack}`, `ui-{name}`; plus `manifest.json`.
5. Proof: commit a contact sheet `art/preview.png`; paste it + file list on this board.
Skip diamonds until the re-roll lands; then re-run.
