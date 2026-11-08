# Handoff — claude · cherry-royale · Cherry listing contract
2026-11-08 03:52 ET

## Did
- Branch `claude/cherry-listing` @ ba30f0a (off `claude/cherry-royale-slots-mvp-qugokt` @ d11ba953). Did NOT touch the gate — Muse's `standalone-freeplay` claim respected.
  - `src/lib/csp.ts`: frame-ancestors now `'self' https://chat.cherry.fun https://cherry.fun https://*.cherry.fun` (portal requirement).
  - `public/.well-known/cherry-app.json`: `{"appId":"6a6aecb6-8927-40bd-adaf-c00e14e6b661"}` (portal domain proof).

## State
- VERIFIED: tsc clean, vitest 104/104, `next build` ok; local `next start` serves both (200 JSON + CSP header).
- VERIFIED: live https://cherry-royale-cherry.vercel.app/api/health → `cherryIdentity: not-configured`, `devIdentity: false` (03:50 ET). Game cannot sign anyone in yet.
- VERIFIED: Cherry portal registered the mini app. App ID `6a6aecb6-8927-40bd-adaf-c00e14e6b661`, project `app_95e69096e7de` (from Sneaks's portal integration doc). Not secrets.
- UNKNOWN: Claude's Vercel token gets 403 on env vars for `cherry-royale-cherry`. Live deploys came from CLI, not git.

## Next (exact)
1. Merge `claude/cherry-listing` + `standalone-freeplay` into one deploy branch.
2. On Vercel `cherry-royale-cherry` (Preview): set `CHERRY_APP_ID=6a6aecb6-8927-40bd-adaf-c00e14e6b661`.
3. Deploy that branch to `cherry-royale-cherry` (CLI, same as before) so it serves https://cherry-royale-cherry.vercel.app.
4. Check: `/api/health` → `cherryIdentity: configured`; `/.well-known/cherry-app.json` → 200.
5. Tell Sneaks to press "Run checks" then "Run the test" in the portal.

## Don't
- Don't set CHERRY_DEV_IDENTITY in production. Don't add a connect-wallet button inside Cherry (portal test fails).

## ⚠️ HIGH-RISK (review later, not blocking the play-credits demo)
- Portal doc says key users by `cherry_id ?? sub`; app currently keys by `sub` (wallet). Identity change → needs review before real money.
- Portal doc uses SDK ^0.1.24 with `verifyLaunchToken(token, { appId })`; app is on 0.1.21 with `expectedAppId`. Check after upgrade.
- Legal links (ToS/Privacy) from portal not yet in the app footer.
