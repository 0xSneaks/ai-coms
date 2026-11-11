# Handoff — cherry-holdem — claude-code — 2026-11-11 03:10 ET

**Session goal:** PART 2 of [0300 handoff](2026-11-11_0300_claude_holdem-portal-and-finish.md): Vercel deploy (Preview first), CU/IR/KP in-app block, Cherry Terms/Privacy links, portal self-check, `CHERRY_APP_ID`.
**Status:** PARTIAL — Preview live; App ID / Project ID / legal URLs blocked on PART 1 step H (portal prompt not saved yet).
**Repo / branch:** 0xSneaks/cherry-holdem @ `claude/cherry-holdem-portal-deploy-mye3cp` · **Last commit:** `3eb7997`

## Did
- Vercel project `cherry-holdem` (prj_uQdrwIornck2t0MlNk122ZiXWgmQ) created in phantomcapais-projects via REST, linked to the GitHub repo, framework Vite — VERIFIED (API response).
- Deployment Protection (Vercel Authentication) OFF for this project so Cherry's iframe can load Preview URLs — VERIFIED (`ssoProtection: null`, `passwordProtection: null`).
- CU/IR/KP in-app block: `middleware.ts` (Vercel Routing Middleware, `x-vercel-ip-country`) → 451 HTML page (API → 451 JSON); `/.well-known/cherry-app.json` exempt; 4 tests in `src/middleware.test.ts` — VERIFIED (tests). Live block from a blocked country: UNKNOWN (can't spoof Vercel geo header).
- Legal links: `shared/cherry-listing.ts` holds `CHERRY_PROJECT_ID` + `CHERRY_APP_ID` (empty) → Terms/Privacy links `https://portal.cherry.fun/legal/<ProjectID>/<AppID>/{terms,privacy}` render in the lobby footer + blocked page once both are filled. URL pattern from the launch-room portal prompt — INFERENCE that holdem's prompt uses the same pattern; its prompt wins.
- README with run/deploy/listing steps.

## State (evidence)
- Tests: `npm test` 49/49 · `npm run typecheck` clean · `npm run build` OK — VERIFIED @ 3eb7997.
- Preview: https://cherry-holdem-5p0jgd18y-phantomcapais-projects.vercel.app (dpl_FxaWqr9bTxF18gJEzwefS9Ch4ZM4, target preview, READY) — VERIFIED via Vercel MCP fetch:
  - `/` → 200, `content-security-policy: frame-ancestors 'self' https://chat.cherry.fun https://cherry.fun https://*.cherry.fun`, no X-Frame-Options.
  - `/api/health` → 200 `{"ok":true,"cherryIdentityConfigured":false}` (no App ID yet).
  - `/.well-known/cherry-app.json` → 500 `CHERRY_APP_ID_MISSING` (by design until env set).
  - `/api/auth` junk-token 401: NOT RUN (sandbox can't reach *.vercel.app directly; MCP fetch is GET-only; needs App ID anyway).
- 360×740 headless (local build of 3eb7997): no horizontal scroll, lobby → table, 0 console errors — VERIFIED.
- Production: NOT deployed. ⚠️ One accidental production-target deploy (dpl_FvNaFrNECxPjPspxGT32SLvL8dDq, from a REST call without `target`) was CANCELED during build — `aliasAssigned: false`, never served. Lesson: use branch pushes for Preview, never the deployments API without a target.
- First Preview (6063527) 500'd: `MIDDLEWARE_INVOCATION_FAILED` (ESM import needs `.js`) → fixed in 3eb7997.

## Portal self-check (launch-room prompt §10 as template — holdem prompt not saved yet)
- [x] https + frame-ancestors, no X-Frame-Options — VERIFIED on Preview.
- [x] No connect button / signature request — VERIFIED (grep: no wallet/sign code).
- [ ] `cherry-app.json` 200 with App ID — BLOCKED on App ID.
- [x] Users keyed by `cherry_id ?? sub` — VERIFIED `api/auth.ts`.
- [–] Tx labels / reference key / POLICY_DENIED + USER_REJECTED — N/A (no transactions).
- [ ] Backend rejects wrong aud/iss/exp — via SDK `verifyLaunchToken` (INFERENCE); live test after App ID.
- [ ] Terms + Privacy linked — BLOCKED on App ID + Project ID.
- [x] 360 px dark — VERIFIED.

## Decided
- Branch pushes = Preview; `main` = Production only on Sneaks's yes — Sneaks: "Preview first. Ask me before Production."
- Protection off for this project (public, play credits only) — required for Cherry iframe per 0300 handoff.

## Next (start here)
1. Sonnet/Sneaks: finish portal step H → save prompt verbatim to `docs/CHERRY_INTEGRATION.md` → post App ID + Project ID here.
2. Any agent: fill both IDs in `shared/cherry-listing.ts`; set env `CHERRY_APP_ID` on Preview + Production (REST: POST /v10/projects/prj_uQdrwIornck2t0MlNk122ZiXWgmQ/env, teamId team_4T9nErrDGecNcX5d212vAWhQ); push the branch → new Preview.
3. Re-check: health `true`, cherry-app.json 200 with ID, `/api/auth` junk token → 401, legal links visible; run the holdem prompt's own self-check.
4. Sneaks adds the Preview URL in portal step 6/7 → Run checks → Run the test.
5. Production: Sneaks's yes → merge branch to `main` (env must exist on Production first, or boot = 500).

## Don't
- Don't call POST /v13/deployments without `target` — it went to production.
- Don't edit `src/poker/*`, auth beyond `verifyLaunchToken`, prizes/credits.

## ⚠️ High-risk
- Production deploy pending Sneaks's yes. No money/wallet paths in this app.
