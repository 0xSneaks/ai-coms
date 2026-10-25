# Handoff — Read-only FOMO history monitor architecture — ChatGPT — 2026-10-25 11:09 ET

## Did
- Reviewed owner request: daily session detection and resumable full-history collection from fixed named fomo.family profiles; local ~977 rows; token registry uses token page URL, never ticker.
- Read BOARD.md, RULE.md v2 (DECIDE-1024), projects/muse-tune-up.md and latest muse-tune-up handoff. No pending OPEN request specifically to ChatGPT for this project. Existing claude-code muse-control-plane claim untouched.
- Confirmed FOMO web has user sign-in (fomo.family official blog); reviewed Playwright persistent contexts and auth storage caveats; verified SQLite unique/ON CONFLICT behavior from official docs.
- Produced design recommendation only: one daily OS scheduler + dedicated operator-logged-in Playwright profile + guarded authenticated read-only proof + one sequential resumable worker + SQLite transactions, row uniqueness, page checkpoints, per-profile coverage tracking, safety stop on 429/CAPTCHA.

## State and proof
- VERIFIED (documentation): Playwright persistent profile reuses cookies/local storage but cannot share userDataDir across concurrent browser instances; default Chrome profile use unsupported. SQLite ON CONFLICT DO NOTHING supports logical idempotence.
- VERIFIED (repository): muse-tune-up has existing ops/browser and ops/jobs on main as documented in project's file; their suitability for FOMO collection has NOT been verified.
- UNKNOWN: actual authenticated FOMO probe selectors/endpoints; source support for complete history vs selected leaderboards; ToS/robots allowance; whether new collector exists in Yolo-crawl-; current runtime status.
- NOT BUILT, NOT TESTED, NOT DEPLOYED: no collector change, live site login, or network fetch conducted; no secrets read.

## Decided (proposal, not runtime decision)
- Check once daily; after manual login optionally operator triggers one immediate check.
- Require corroborating authenticated identity plus a fresh protected read-only resource. Landing page/200/cookie alone not sufficient; ambiguity pauses.
- Use one OS-level process lock plus durable lease/heartbeat; old worker must be proven stopped before takeover.
- Per page SQLite BEGIN/COMMIT: insert only validated complete records using stable per-profile transaction/event identifiers; checkpoint only after successful page commit. Never dedupe by token URL/ticker; registry identity remains canonical chain + token page URL.
- Treat 401/logged-out as quiet PAUSED_AUTH; 429/CAPTCHA as latched stop + one owner alert, no automatic retry or challenge bypass. Unexpected schema/zero-row responses fail closed.
- Full-history guarantee requires initial end-to-end pagination proof; maintain profile coverage and periodic reconciliation where permitted. Resume cannot fix history the site does not expose.

## Next
1. Operator or implementing agent independently validates one signed-in and one logged-out page read-only probe and proves full-history source availability; records selectors/response evidence without credentials.
2. Only then implement minimal collector/checkpointed state machine and test crash replay, concurrent invocations, mid-run logout, CAPTCHA/429, schema drift and backlog; no live financial buttons.
3. Confirm site automation/data-use permissions before enabling scheduled collection.

## Don't
- Don't ask automation to log in or export/share session credentials.
- Don't click Buy/Sell/Max/presets/amount controls, execute trades, bypass bot checks, hammer pages, or treat leaderboards as history.
- Don't modify or interfere with existing Muse trading runtime or claude-code active claims.
