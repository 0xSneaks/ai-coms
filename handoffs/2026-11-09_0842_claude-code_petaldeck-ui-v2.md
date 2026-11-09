# Handoff — cherry-launch-room (PetalDeck UI v2) — claude-code — 2026-11-09 08:42 ET

**Session goal:** Sneaks: rebuild main screen to pump.fun's "Create new coin" structure (own words/assets), existing theme tokens only, buy sheet + confirm sheet, UI only; fix patchy outline.
**Status:** DONE (dry-run only, not deployed by me)
**Repo / branch:** 0xSneaks/cherry-launch-room @ `ccr-554d0091-ew1ew2` · **Last commit:** `5e21d07`

## Did
- Layout: top bar (logo + wallet chip) → title/"Coin details"/lock note → card 1 (name, ticker auto-upper, description, social links fold, pool pair tiles SOL/USDC/Custom + mint check, creator rewards Creator | Holders "Soon", mayhem toggle + line) → card 2 (image/video dashed upload, file + size rules, banner fold) → on-chain info strip → fee line → Create coin — `index.html`, `src/app/*` — VERIFIED (Playwright 390 + 360)
- Flow: Create → initial-buy sheet (chips 0.1/0.5/1, Skip) → `buildLaunch(formData)` → confirm sheet → Sign in Cherry (one approval, dry-run) — VERIFIED to the sheet; actual Cherry sign UNVERIFIED (no Cherry here)
- Routing (`src/app/config.ts` ROUTES): SOL → C+D shapes, USDC → F, Custom → H, Mayhem → G; all via unchanged engine. `HARNESS_RESULTS` all 'untested' — no results table found (ai-coms + spike session transcript searched) — UNKNOWN
- Holders disabled "Soon": no variant covers holder rewards + 95/5 (policy HOLDER_REWARD_ALLOWED=false) — VERIFIED from code
- Colours: codex/scaffold token set verbatim (dark + light), tints via color-mix of tokens — INFERENCE that these are "PetalDeck's existing tokens" (only named token set in the repo; spike page had ad-hoc hexes)
- Patchy outline: selected tiles/segments now solid 1px borders (old inset box-shadow); banner glow rebuilt in float + dither (visible rings gone) — VERIFIED by contrast-boosted render
- Split view kept: ≤699 px app height pins Create coin; sheets fit 450 px — VERIFIED

## State (evidence)
- `npm run lint` exit 0 · `tsc --noEmit` exit 0 · `npm test` 11 files / 106 · `npm run build` ok (dev hook absent from dist)
- `git diff --stat cab60a7 -- src/launch src/spike/{build,constants,main,session,result}.ts src/server/cherryAuth.ts api/auth api/rpc.ts` = empty
- Confirm sheet with live mainnet state (simulation only): SOL + 0.1 SOL ≈ 0.1087 SOL
- Screens: repo `docs/screens/` 1-empty … 6-error, 7-split-450-*
- Deployed: no

## Next (start here)
1. Sneaks: in Cherry switch the active wallet to **BGa7…YD7R** (not Ftui…3GYp = fee wallet) → new form works; or keep Ftui and set Preview env `PETALDECK_FEE_WALLET` to another wallet you own.
2. Sneaks: tap A→H on `/debug/`, "Copy results table", paste → update `HARNESS_RESULTS` in `src/app/config.ts`.
3. muse: hide Vercel Toolbar on Preview (see board request).
4. Deploy branch to Preview; portal App URL → `/` when happy. Upload `public/brand/petaldeck-banner-v2.png` as portal banner.

## Don't
- Don't touch `src/launch/*`, `src/spike/{build,constants,main,session}.ts`, `src/server/cherryAuth.ts`, `api/auth`, `api/rpc.ts` for UI work.
- Don't enable live send until Sneaks approves a variant and send + IPFS pin are reviewed.

## ⚠️ High-risk
- `PETALDECK_FEE_WALLET` env decides where 5% goes (fallback = pinned constant): restrict Vercel env access; independent review before live.
- Upload rules (15 MB image / 30 MB video / 5 MB banner, 1000×1000, 3:1) are ASSUMPTIONS, not verified against pump.fun.
