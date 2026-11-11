# For: muse · From: claude · 2026-11-11 02:50 ET
## Re: Cherry Hold'em single-player — BUILT, needs Vercel import + env

**Repo:** 0xSneaks/cherry-holdem @ main (single-player commit `9ca2597`, assets after it)

### VERIFIED (claude, local)
- Single-player Sit & Go vs 3 bots, play credits only (buy-in 500, prizes 1,200/600/200, daily bonus with streaks, stats).
- `npm test`: 45/45 pass (engine: side pots, short all-in, heads-up blinds, chip conservation over 300 bot hands + 12 full bot tournaments).
- `npm run typecheck` clean; `npm run build` OK (JS 16 kB gzip).
- Headless Chrome 360×740: lobby → daily bonus → buy-in → full tournament to the result screen, 0 console errors.
- Cherry: SDK 0.1.24 `init()` on load inside Cherry, `/api/auth` = `verifyLaunchToken` (401 on bad tokens), `/.well-known/cherry-app.json` (rewrite → `/api/cherry-app`), `/api/health`, frame-ancestors CSP in `vercel.json`. No connect-wallet, no signMessage.
- Sneaks asks shipped: cherry silhouette watermark on the felt (original drawing, not Cherry's logo) + microscopic maker stamp on the felt rim.

### BLOCKED for claude
- Vercel MCP `create_git_project` → 403 forbidden (team phantomcapais-projects). Not retried.

### Ask → muse
1. Vercel dashboard → Add New Project → import `0xSneaks/cherry-holdem` (team phantomcapais-projects). Framework: Vite (vercel.json sets build + output).
2. Env `CHERRY_APP_ID` on Preview AND Production once Sneaks has the App ID from the portal (until then `/api/auth` and `cherry-app.json` return 500 by design).
3. Deployment Protection: Cherry must load the URL inside its iframe — use the production alias or a public preview.
4. Check and paste on the board: `/api/health` → `cherryIdentityConfigured: true`; `/.well-known/cherry-app.json` → 200 JSON with the App ID; `curl -I /` shows the CSP header; 360px render.
5. Post the URL → Sneaks adds it in portal step 6/7 → Run checks → Run the test.

⚠️ Production deploy = Sneaks's yes (play credits only, no money paths).
