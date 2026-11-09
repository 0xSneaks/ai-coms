# JustMogIt — VENUE AMENDMENT: mogz.fun is OUT as a launch venue

- **When:** 2026-11-07 18:00 ET · **Who:** muse (ai-coms debt clearing)
- **Source of the ruling:** owner (Sneaks), chat 2026-11-07 15:43 ET — "we might deploy on pump or float fuck.mogz.fun.there is no volume"
- **Effect:** this amendment supersedes every earlier board/project line that routes a launch, an adapter build, or a callout through mogz.fun.

## The ruling

- **VERIFIED (owner ruling, 2026-11-07 15:43 ET):** mogz.fun is **OUT** as a launch venue — no volume.
- **Deploy venue = pump.fun OR Float (floatlaunch.xyz), UNDECIDED.** No venue pick has been made. Nobody builds venue-specific launch code for either one until the owner rules.

## Consequences (effective now)

1. **The proven Mogz create payload request is CANCELLED.** The open board request `[claude-code → muse, sneaks] · PROVIDE the proven Mogz create payload (request + response shape, quote = SOL, firstBuyQuote = 0) as a file in 0xSneaks/just-mog-it; Task 1 adapter blocked on it · OPEN` is marked **CANCELLED — cancelled-by-owner-ruling** on BOARD.md by this same run (read-back verified). Muse will not commit the payload, and the request should not be re-asked under the old Task 1 framing. Item (1) of claude-code's parked blockers list (see handoffs/2026-11-07_1524_claude-code_justmogit-fix-pass.md) is superseded by this ruling in the same way.
2. **Claude Code Task 5b (Mogz adapter) is CANCELLED / misdirected — do not build it.** The `mogit/` money-core gates work stands in full (PR #5: kill switch persisted, 3/day, 0.025 SOL cap on quote and simulated spend, SOL-only quote, first buy exactly 0, fail-closed). The PR #5 review flow continues on its own track, unaffected by this amendment.
3. **Mogz callouts for our own launches are PARKED.** Callouts are a mogz token-page feature; with mogz out as the venue, future launches have nothing to call out on there. `bot/callout.py` stays as landed; it is not extended, and the callout-wallet question is moot.
4. **What does NOT change:** This amendment governs where future launches deploy; it unwinds nothing. (One historical launch reference was removed from this handoff by owner order 2026-11-09.)

## Record hygiene done in this run

- BOARD.md: the payload request line → CANCELLED (cancelled-by-owner-ruling); Latest handoffs line added for this handoff (list held at 10).
- projects/justmogit-bot.md: the To-do line "Commit the proven Mogz create payload to just-mog-it, then build the preview-default adapter (Task 1)" is struck and marked CANCELLED with a pointer here. Historical lines that mention mogz (Launch #001, the Mogz pilot results) are records, not directions, and are preserved unchanged.

## Also cleared in this run — DeepSeek direct-smoke handoffs re-filed (Debt 2)

- Claude verified on 2026-11-07 that `handoffs/2026-11-07_1216_muse_justmogit-deepseek-direct-smoke.md` did **not** exist in this GitHub repo (it existed only in the local clone). Muse re-checked GitHub at the start of this run: **both 1216 and 1300 returned 404** (VERIFIED via API read).
- Both files existed in the local clone and are now filed on GitHub, **byte-identical** to the local copies (sha256 match on fresh read-back):
  - `handoffs/2026-11-07_1216_muse_justmogit-deepseek-direct-smoke.md` — commit `7e29904c49b338e781499d8180ecd2330cd1711d` (direct adapter run: cases 1–5 PASS, case 6 UNVERIFIED by design)
  - `handoffs/2026-11-07_1300_muse_justmogit-deepseek-timeout-fix.md` — commit `52210922c62a8bd8ebeaf12ac8491857daa71312` (timeout diagnosis + runner-layer warm-up fix; the "20/20 first-attempt passes" figure stands in that file as muse-REPORTED, as written)
- The on-record evidence chain is unchanged: Codex handoffs `2026-11-07_1348_codex_justmogit-direct-smoke.md` (Actions run 42403035798, 5/5) and `2026-11-07_1302_codex_coms-pwa-deepseek-live.md`, plus CI run **42407864926** (SUCCESS — the repo DEEPSEEK_API_KEY works).

— muse, 2026-11-07 18:00 ET
