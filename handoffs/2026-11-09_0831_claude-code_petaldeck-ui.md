# Handoff — cherry-launch-room (PetalDeck UI) — claude-code — 2026-11-09 08:31 ET

**Session goal:** Replace PetalDeck's main screen with a pump.fun-style create-coin flow (UI only); A–H harness → hidden /debug; then Sneaks's Compact Mode spec (forwarded by the spike session 13:21Z).
**Status:** DONE (dry-run only, not deployed by me)
**Repo / branch:** 0xSneaks/cherry-launch-room @ `ccr-554d0091-ew1ew2` (off `spike/sign-only` @ cab60a7) · **Last commit:** `250b15a`

## Did
- New main screen at `/` — `index.html`, `src/app/{main,form,launch,config,tiers}.ts`, `src/app/styles.css` — VERIFIED (Playwright 390/360 px)
- Form calls one function: `createLauncher(deps).buildLaunch(formData)` → wraps unchanged `src/launch/engine.ts`. `LAUNCH_VARIANT='engine'`, `LAUNCH_MODE='dry-run'` (sign, never send; no live mode exists) — VERIFIED
- 5% recipient from server: `GET /api/config` (`api/config.ts`, `src/server/feeConfig.ts`): env `PETALDECK_FEE_WALLET`, else pinned APP_FEE_WALLET; invalid env → 500, launch blocked. Signer == recipient → launch blocked before any RPC/sign (unit test + browser) — VERIFIED
- A–H harness: `spike/index.html` → `debug/index.html` (src/spike/main.ts unchanged). `/spike/` and `/?debug=1` redirect to `/debug/` — VERIFIED locally; Vercel redirect UNVERIFIED until deploy
- Compact Mode: tiers from app-root height (ResizeObserver): ≥700 full · 450–699 compact · <450 minimal; focused input never flips tier; sheet capped to app height — VERIFIED (live resize 844→600→420→720 = full/compact/minimal/full; focus at 600 then 300 px stays compact; blur → minimal)
- ESLint added (`npm run lint`); 2 warnings in engine.test.ts (unused imports, left untouched on purpose)

## State (evidence)
- Build: pass — `npm run build` (dev preview hook absent from dist)
- Tests: pass — `npm test` 11 files / 104 tests; `tsc --noEmit` exit 0; `npm run lint` exit 0
- Protected files: `git diff --stat cab60a7 -- src/launch src/spike/{build,constants,main,session,result}.ts src/server/cherryAuth.ts api/auth api/rpc.ts` = empty
- Screens: repo `docs/screens/` (390×844 empty/filled/confirm/error/fee-wallet-blocked; 390×450 + 390×350 empty/filled/more/confirm)
- Confirm sheet on live mainnet state (public RPC, simulation only, funded public wallet): SOL pair + 0.1 SOL buy ≈ 0.1087 SOL
- Deployed: no

## Decided
- Built on `spike/sign-only` (engine + harness live there), not `codex/scaffold` (React wizard, diverged) — no Sneaks ruling
- Dry-run signing stays owner-gated (SPIKE_OWNER_WALLETS); others get "Creating coins opens soon" — keeps the 11:58 gate decision
- Compact: fee line stays visible as one line (it's the fee disclosure); minimal moves it into More options. Confirm sheet always shows the 95/5 split
- Not added: banner image, holder rewards (policy OFF), metadata/IPFS pin (dry-run uses a placeholder URI)

## Next (start here)
1. Sneaks: Cherry signs you in as **Ftui…3GYp = the fee wallet** (his 13:24 screenshot) → new form blocks it by design. Pick: set Preview `PETALDECK_FEE_WALLET` to another wallet you control, or sign in with a different wallet. Harness at `/debug/` still works.
2. Deploy the branch to Preview; point portal App URL to `/` when ready (`/spike/` keeps landing on the harness).
3. Tap A→H on `/debug/`, paste results; Sneaks approves a variant → then live mode (send + Pinata pin) is a separate, reviewed change.
4. Optional: `VERCEL_PREVIEW_FEEDBACK_ENABLED=0` on Preview hides the Vercel Toolbar button Sneaks saw.

## Don't
- Don't edit `src/launch/*`, `src/spike/{build,constants,main,session}.ts`, `src/server/cherryAuth.ts`, `api/auth`, `api/rpc.ts` for UI work.
- Don't merge `main` blindly: main has e184c69 (LICENSE/logo/README) not in spike/sign-only.

## ⚠️ High-risk (wallets, signing, auth, prod, money)
- `PETALDECK_FEE_WALLET` env now controls where 5% of creator fees go (fallback = pinned constant). Anyone with Vercel env access can redirect it → independent review + restrict env access.
- `src/app/launch.ts` sign() path (dry-run): review before any live mode.
