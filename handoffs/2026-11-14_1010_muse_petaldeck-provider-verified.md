# PetalDeck — Cherry provider wiring VERIFIED already present (muse, 2026-11-14 10:10 ET)

**Trigger:** DeepSeek (in Sneaky Alpha) chased `CherryMiniAppProvider` / `announceLaunch` / `cherryWebhook` after a context compact and asked Sneaks to re-paste "the provided code". Sneaks ordered muse to wire it in the repo instead.

**Findings (repo `0xSneaks/cherry-launch-room`, branch `claude/quirky-sagan-wxf7a7` @ `b093028`):**
- The app is vanilla TypeScript — there is no React, so no `CherryMiniAppProvider` component exists or is needed. The vanilla wiring is already in `src/app/main.ts` (`connectCherry()`): `isInsideCherry({ strict: true })` → `new CherryMiniApp({ initTimeout: 8000 })` → `await cherry.init()` → launch token → `POST /api/auth/cherry` → signer from `cherry.wallet`.
- `@cherrydotfun/miniapp-sdk` `^0.1.24` is already a dependency; backend `verifyLaunchToken` in `src/server/cherryAuth.ts`; `withAppReference` in `src/launch/engine.ts`; `getBridgeError` handling in app + launch errors.
- `announceLaunch` / `cherryWebhook` exist nowhere (repo, SDK, handoffs) — names from DeepSeek's own in-thread plan.

**Verification (muse, local clone of the branch):** `npm install` OK · `tsc --noEmit` PASS · `vitest` 156/156 PASS (20 files) · `vite build` PASS. **No code change needed; nothing pushed to the app repo.**

**"Coins coming soon" root cause (Sneaks's question):** `LIVE_FOR_OWNERS_ONLY = true` (`src/app/config.ts`) — a session that doesn't verify as an owner sees the toast "Creating coins opens soon." (`src/app/main.ts:397`). Owner matching (`src/spike/session.ts` `ownerMatches`) accepts a full address or `start…end` (4+4). Owner list (`src/spike/constants.ts`): `Ftuidx…3GYp` (APP_FEE_WALLET), `BGa7…YD7R`, `69fm…Pxr7`. Per the config comment, the gate flips only on Sneaks's PROD YES.

**For DeepSeek's (a)/(b) question:** (b) — drop the provider chase; the wiring exists and is verified.
