# Codex → Claude — HL Calm Hub bounded UI fixes

Date: 2026-11-13 01:39 EST
Repository: 0xSneaks/Zen-trade
PR: https://github.com/0xSneaks/Zen-trade/pull/1 (DRAFT, UNMERGED)
Coordination: https://github.com/0xSneaks/ai-coms/issues/19
VERDICT: BLOCKED — build/type-check fail outside authorized UI scope; mobile browser QA blocked.

## Did

- VERIFIED: Read BOARD, project, latest import handoff and Codex/all inbox; claimed review lane. Deferred unrelated inbox requests under Sneaks's current task.
- VERIFIED: Retrieved existing Git objects through authenticated connector after private CLI clone lacked credentials. Reconstructed and checked all 39 blob hashes, every tree and the exact original commit `b59c3d82b9eab5954ea255684965cafccac64d15`. No source regeneration or re-import.
- VERIFIED: Installed dependencies with `npm install --no-package-lock`; no lockfile or dependency/config changes.
- VERIFIED: Baseline npm test 32/32 PASS, typecheck/build FAIL with three errors. Added millisecond regressions: 2 FAIL before fix. Separate React DOM fixture harness reproduced five application failures before fixes (5 FAIL / 1 PASS): permission on mount, false complete-history disclosure, stale balances/orders after event, absent stale indicator after disconnect, ignored funding events.
- VERIFIED: Fixed timestamp units; retained partial-history flag because capped calls cannot prove full coverage; bounded displayed P&L to the current 30-day window. Moved notification permission to explicit opt-in and gated delivery, suppressing snapshots/replay. Added serialized refresh on order/fill/funding/reconnect/focus/online/visibility and 30s poll, 10s timeout and 45s stale threshold. Preserved cancellation guards. Exposed stale account/order data, represented socket-open separately from stream correctness, handled offline/subscription-error status, and added CONNECTING to UI types. Added 44px minimum controls and wrapping safeguards (visual acceptance UNVERIFIED).
- VERIFIED: Published one fast-forward commit on existing review branch. No merge/deploy, no orders, signing, keys or spending.

## State + proof

**Exact final source SHA: `db763d8df00952c7a6eab6aeff78d9ce037b9927`**

Final tree `18420c58fc79484b063cd6fdccda6b66fb566f01` matches local tested content and GitHub. GitHub compare confirms exactly eight modified files, all within the permitted twelve. Working tree clean; remaining 31 source/assets unchanged.

| Feature/check | Method | Result/evidence |
|---|---|---|
| Dependency install | `npm install --no-package-lock` | PASS, exit 0, [log](assets/2026-11-13-hl-terminal-android/final-install.log) |
| Type-check | `npx tsc --noEmit` | FAIL, exit 2, exactly two protected-file errors, [log](assets/2026-11-13-hl-terminal-android/final-typecheck.log) |
| Repository tests | `npm test` | PASS, exit 0, 33/33 in five files, [log](assets/2026-11-13-hl-terminal-android/final-tests.log) |
| Zero-address build | `VITE_HL_USER=0x0000000000000000000000000000000000000000 npm run build` | FAIL, exit 2, tsc stops before Vite, [log](assets/2026-11-13-hl-terminal-android/final-build.log) |
| Home, Chart, COMS, Projects, Activity, Home → Trading → Back | React createRoot + jsdom, synthetic zero-address REST/WS fixtures | PASS DOM behavior, included in 12/12 supplemental regressions; **not browser/360px acceptance** |
| Data lifecycle | Real app/info client/transport with fake network/socket and IndexedDB | PASS for refresh after order/funding/reconnect/poll; stale after disconnect/offline/age; recovery after API error; subscription-error status retained |
| Notifications | React DOM click handler and adapter spy | PASS no mount prompt, explicit opt-in call, silent before opt-in, suppress snapshot/replay; real OS/browser user activation/delivery UNVERIFIED |
| Supplemental DOM console | Captured console.error, asserted empty per test | PASS, zero errors across 12 tests, [log](assets/2026-11-13-hl-terminal-android/final-app.log) |
| 360px browser + browser console | Playwright launch attempted; shared browser fallback attempted | BLOCKED: missing bundled Chromium; installed Chromium then fails `socket() failed: Operation not permitted (1)` under sandbox socket policy. Shared browser localhost returns `net::ERR_CONNECTION_REFUSED`. No screenshots or browser-console capture obtained. [attempt log](assets/2026-11-13-hl-terminal-android/baseline-browser.log) |
| Diff scope/whitespace | Git hashes, GitHub compare, git diff --check | PASS; no protected/config/dependency/lockfile changes |

Raw before/after logs, both supplemental test scripts/config, dependency versions and rerun instructions are in [evidence](assets/2026-11-13-hl-terminal-android/RUN.md). Fixture values are synthetic; no real account or live feeds were used.

Changed files:

- `src/App.tsx`
- `src/components/ChartView.tsx`
- `src/components/HomeView.tsx`
- `src/components/TradingView.tsx`
- `src/components/__tests__/hubLogic.test.ts`
- `src/components/hubLogic.ts`
- `src/components/hubTypes.ts`
- `src/styles/global.css`

## Decided

VERIFIED: Kept changes within UI scope. Build remains blocked by:

1. `src/__tests__/fillLedger.test.ts:18` TS2322: expression-bodied beforeEach returns MemoryPersistence; proposed change is `beforeEach(() => { p = new MemoryPersistence(); });`.
2. `src/domain/notifications.ts:8` TS6133: unused `order` parameter in shouldNotify; proposed change is rename parameter `_order`, preserving behavior and signature type.

INTENT: Request Sneaks's approval for precisely these two small changes outside the twelve UI files, then rerun typecheck/tests/build. Neither fix has been applied. No dependency/tsconfig workaround.

## Next — note for Claude

INTENT: Claude independently checks **`db763d8df00952c7a6eab6aeff78d9ce037b9927`**, reads the actual logs, reviews the refresh/notification/window handling and reports APPROVED/CHANGES/BLOCKED at that exact SHA in issue #19. Run 360px browser QA in an environment that supports Chromium, capturing screenshots and browser console errors. This dispatch is not an ACK or completed independent verification.

First unblock: owner approves the two exact protected-file changes above. Any subsequent source changes create a NEW final SHA requiring Claude verification at that SHA. Owner alone authorizes merge and deployment.

Remaining limitations (VERIFIED from code or UNKNOWN runtime):

- Full 30-day fill/funding completeness is unproven; partial flag intentionally stays true. No pagination/reconciliation proof was added.
- Charts/market prices, AI COMS reader, project live data, MOONBOYHL and Grok decision feeds remain unavailable or explicitly UNVERIFIED manual rows. No feed represented as live.
- Transport still does not prove subscription ACK/liveness via heartbeat; UI says Socket open only. Real network reconnect, server shape validation, malformed data, OS notifications, Android/PWA install, security of deployment and browser layout remain unverified.
- Timeout stops UI waiting; protected info client does not support aborting the underlying request. Refreshes are coalesced in the UI, but network rate/latency behavior needs real read-only validation.

## Don't

No trades/order writes, signing, secrets, spend, deployment, main merge, protected-file edits without owner approval, or fabricated browser/live-data acceptance. Wallets/auth/prod/money are ⚠️ HIGH-RISK and remain owner-gated. Claim released; unrelated requests unchanged.
