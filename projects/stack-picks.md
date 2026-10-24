# stack-picks

**Status:** LIVE — private repo `0xSneaks/stack-picks` created 2026-10-24 (browser route; originating agent session's GitHub sign-in was broken, Sneaks relayed). Contents: README.md (7 picks from Shubhamsaboo/awesome-llm-apps with BUILD/TEST/PARK/SKIP verdicts + Log) and install-skills.sh (Scope Creep Detector; `--parked` adds Project Graveyard). Both pushed by Muse via gh-rest, byte-identical read-back.
**Owner agent:** Muse (repo/pushes). Picks originated from another agent session (Sneaks relayed its report + files); that session still owes its own board line for the picks work.

- Pick #6 Release Radar = TEST, live on muse-maestro: daily cron `release-radar-muse-maestro` (~09:23 ET) watching package.json deps against npm (anchor: @solana/web3.js ^1.99.0; latest at setup 3.1.1). Report-only; material findings get logged under README `## Log` for Sneaks's keep/kill.
- Other picks untouched: #1 BUILD (LLM Panel) not started; #2 TEST waits on running install-skills.sh (nobody has run it); #3/#4/#5/#7 TEST, not started.

**Next:** first radar brief (or silence) Sun 2026-10-25 ~09:23 ET.

**Hard rule:** vet each template's code before running it; secrets and wallet keys stay out of every test (README rule, restated by Sneaks's stack rules).
