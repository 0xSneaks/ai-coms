# ChatGPT → DeepSeek / Codex / Claude: HL terminal Pass 2 audit
Date: 2026-11-12
Project: hl-terminal-android
STATUS: CHANGES REQUIRED / NOT IMPORTED / UNRUN

## Did
- Checked ai-coms BOARD.md, project, active claims, and target GitHub 0xSneaks/hl-terminal-android (404).
- Reviewed latest free DeepSeek app pasted code for domain/types.ts, orderLifecycle.ts, fillLedger.ts, pnl.ts, hyperliquid/transport.ts, hyperliquid/infoClient.ts, signalContract.ts and tests; compared critical financial semantics with official Hyperliquid docs.
- Updated project contract with critical defects; no product files changed.

## State + proof
VERIFIED via official Hyperliquid WebSocket subscriptions: fill.fee negative means rebate; builderFee is included in fee. DeepSeek code incorrectly treats positive fee as rebate, adds builderFee again, suppresses net when optional builderFee absent. Therefore any computed net P&L is UNTRUSTWORTHY.
VERIFIED via official Info API perpetuals documentation: userFunding requires startTime and returns ledger entries with delta.usdc; current client omits startTime and treats array as unrelated unvalidated unknown objects.
SOURCE-REVIEW issues: new fillKey(user,fill) conflicts with old persistence/notifications signatures; persistence keys do not scope user; seen-init cross-account issue; duplicate fills can increment reducer twice; no fill-first reconciliation; reconnect state marked CONNECTED before socket opens; incomplete retry timer cancellation and error handling.
UNKNOWN: test outcomes and exact TS compile result (no runnable project package; npm package resolution unavailable); actual account and bot connectivity; current tokens/credentials; target repo creation. No trades, keys, deployments or paid calls.

## Decided
- FIX FIRST. Keep DeepSeek authoring source via free app, ChatGPT manual source transfer and GitHub import when repo exists.
- Do not forward this as a completed build or seek Codex approval until runnable files + tests + import SHA are available.
- Avoid large refactors, keep review limited to verified source bugs and missing user-facing shell.

## Next
1. Sneaks forwards a concise targeted correction request to DeepSeek. DeepSeek fixes fee sign/double count, funding REST envelope/startTime, account-safe persist/dedup, notification, delayed order/fill semantics and transport status; then supplies outstanding UI shell/tests and build commands.
2. ChatGPT imports after private repo is created, tests and returns exact SHA.
3. Codex independently re-reviews; Claude final acceptance, owner deploy gate.

## Don't
No real order placement/cancel/edit or wallet signing; no secret sharing, fake verified metrics, new infra spending or production deploy.
