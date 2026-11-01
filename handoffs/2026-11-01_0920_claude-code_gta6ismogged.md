# Handoff — claude-code → claude, muse (cc Sneaks) — 2026-11-01 09:20 ET — GTA6isMOGGED react: assessment + optimizations

**Re:** [Sneaks order 07:33](../orders/2026-11-01_0733_2612f43854c0.md) (REACT: check the repo, optimize the build).
**Repo:** 0xSneaks/GTA6isMOGGED- @ `def8708` (read-only clone). I pushed nothing to it. claude owns the game build and muse owns the site and deploy, so these are proposals for them.

## Assessment
The build is in good shape. The highest-value fixes are the two below that stop a broken page; the rest is polish.

- VERIFIED: the landing page `/` loads in ~0.6 s at phone size (390 px) with 0 console errors and no sideways scroll.
- VERIFIED: `/play/` (DA CITY) parses (`node --check` OK). The game's main loop runs at ~60 fps headless, and game state initialises.
- UNKNOWN: the 3D scene was not rendered here. This sandbox can't reach cdnjs, so three.js didn't load. Their CI smoke test (Playwright) is the right check for this.
- VERIFIED: the $DACITY address in the site matches muse's narrative-ops launch ledger (`CAiSF4…sDvX`). The $GTA6 address matches projects/gta6.md.
- VERIFIED: the price box falls back cleanly. If DexScreener fails it shows "SNAPSHOT NOV 1", not a fake "LIVE".
- VERIFIED: if three.js fails to load, the player gets a toast ("3D engine didn't load…").

## Optimizations, ranked
1. **Self-host three.js.** Copy `three.min.js` r128 into `play/vendor/` and point the script tag there. Today one cdnjs hiccup means no game. If it stays on the CDN, at least add an `integrity` (SRI) hash + `crossorigin`. Cost: one file (~600 KB, cached).
2. **Catch WebGL failure.** `new THREE.WebGLRenderer(...)` (game.js ~line 865) has no try/catch. On devices with WebGL off or blocked, it throws and the game silently dies with no message (INFERENCE from the code). Wrap it and reuse the existing toast.
3. **Shrink `play/og.png`** from 453 KB to about 80–120 KB (JPEG/WebP at 1200×630). Link previews on X and Telegram unfurl faster and fail less. The landing page's share card is already 38 KB.
4. **Fonts on `/play/`:** keep `display=swap` (already set). Optionally self-host the two families too, for the same single-point-of-failure reason as #1.
5. Keep CI as is. The smoke workflow already runs `node --check` plus a headless play-through on every push and PR. Nothing to add.

## Not in scope / gated
- Deploy, domain and public posts stay gated on Sneaks; muse holds the go-live request.
- The `og:url`/`og:image` links point at `gta6ismogged.vercel.app`, which won't resolve until that deploy happens. That's expected.
- No trades or wallet actions.

## Next
1. claude: fixes #1–#3 in the game repo (one small commit; the smoke CI covers it).
2. muse: deploy per its go-live request once Sneaks says go, then confirm `/` and `/play/` live with phone screenshots.
