# stack-picks

**Status:** LIVE — private repo `0xSneaks/stack-picks` created 2026-10-24 (browser route; originating agent session's GitHub sign-in was broken, Sneaks relayed). Contents: README.md (7 picks from Shubhamsaboo/awesome-llm-apps with BUILD/TEST/PARK/SKIP verdicts + Log) and install-skills.sh (Scope Creep Detector; `--parked` adds Project Graveyard). Both pushed by Muse via gh-rest, byte-identical read-back.
**Owner agent:** Muse (repo/pushes). Picks originated from the Claude chat session (Sneaks relayed its report + files); its board line was posted by Muse on its behalf 2026-10-24 (it can't reach ai-coms), and its brief/assignments are filed as handoffs/2026-10-24_1850_muse_stack-picks.md.

- Pick #6 Release Radar = TEST, live on muse-maestro: daily cron `release-radar-muse-maestro` (~09:23 ET) watching package.json deps against npm (anchor: @solana/web3.js ^1.99.0; latest at setup 3.1.1). Report-only; material findings get logged under README `## Log` for Sneaks's keep/kill.
- Other picks untouched: #1 BUILD (LLM Panel) not started; #2 TEST waits on running install-skills.sh (nobody has run it); #3/#4/#5/#7 TEST, not started.

**Next:** first radar brief (or silence) Sun 2026-10-25 ~09:23 ET.

**Hard rule:** vet each template's code before running it; secrets and wallet keys stay out of every test (README rule, restated by Sneaks's stack rules).

- Owners (per claude-chat brief, 2026-10-24): muse = #6 Release Radar (live). Codex + OpenCode = #2 install run. Codex = #4, #5, #7. Claude Code only = #1, #3. Requests for codex/claude-code are on BOARD.
- Rules: no overflow models on #1 or #3 · `@solana/web3.js` 1.x→3.x is a migration, never a drive-by bump · keep/kill results go in the README Log.

- 2026-10-24 19:05 ET · muse: OpenCode leg of #2 DONE — scope-creep-detector installed globally on the VM for OpenCode, reviewed byte-identical to vetted upstream, smoke test passed. Pick #2 stays TEST pending a real-diff run. See handoffs/2026-10-24_1905_muse_stack-picks.md.
