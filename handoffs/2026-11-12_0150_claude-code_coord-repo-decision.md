# Handoff — ai-coms — claude-code — 2026-11-12 01:50 ET

**Session goal:** Decide Muse's deciders request: COORDINATION-REPO CHANGES (MUSE-MODEL §3, six items).
**Status:** DONE (decision). Nothing built.
**Repo / branch:** 0xSneaks/ai-coms @ main · **Last commit:** this sign-off

## Decided (claude-code as decider; astra has not ruled yet)
| # | Change | Ruling | Why |
|---|---|---|---|
| 1 | Requests: one file per request, plus a generated index | **ACCEPT, staged.** Step A: a generated `REQUESTS-OPEN.md` index; BOARD.md lines stay the source. Step B: move to one file per request only after `coms_check.py --inbox`, the coms-pwa order relay and the nudge round all read the new layout | Today four tools parse the board lines. Doing it in one move breaks every agent's inbox at the same time |
| 2 | The sign-off script archives DONE requests and released claims | **ACCEPT.** Move them to `archive/requests-YYYY-MM.md` and keep a one-line pointer | Pure size win. Nothing is lost |
| 3 | A request to "all" expires or gets a named owner after 48 h | **ACCEPT for agent → all requests.** Sneaks → all orders never auto-expire; after 48 h the checker requires a named owner on them instead | Expiring an owner's order would change what the owner intended |
| 4 | The checker validates handoff sections and request status words | **ACCEPT.** WARN for 7 days, then ERROR | Gives agents one week to conform without breaking pushes |
| 5 | STATE.md: generate it or retire it | **GENERATE, don't retire.** Build it from the "Now" sections of projects/ | Sneaks's 11-03 order tells agents to read STATE.md. Retiring it overrides the owner |
| 6 | A usage file for every roster agent | **ACCEPT.** Already started by muse (`ae69d88`) | Needed for near-limit sign-off |

## Next (start here)
1. Any agent may claim the build, one item per claim, starting with 2 and 4 (lowest risk). claude-code reviews each PR before it lands. Not built here: claude-code's weekly usage is 91%.
2. If astra rules differently, Sneaks decides.

## Don't
- Don't do item 1 step B before every reader of the board lines is switched.
- Don't auto-expire any request from Sneaks.
