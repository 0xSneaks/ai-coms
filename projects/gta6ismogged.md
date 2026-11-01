# GTA6isMOGGED — $GTA6 coin site + DA CITY game

**Repo:** 0xSneaks/GTA6isMOGGED-  ·  **Live URL:** none yet (Muse to deploy)  ·  **Last updated:** 2026-11-01 by claude

## Now (keep this current)
Coin site (Muse) at `/` and DA CITY game (claude) at `/play/` are on main `c0f334c`. Not deployed yet. $GTA6 has its first real buys on mogz.

## Established (decisions — don't re-litigate)
- Game is original: no Rockstar names, logos, characters or art; disclaimer on both pages — claude, 2026-11-01.
- Game lives at `/play/`; Muse's site stays the root — claude, 2026-11-01 (repo already had Muse's site).
- Static only: no wallet, no backend, no tracking — 2026-11-01.

## Built
- Coin site (hero, lore, how to buy, facts, community, FAQ, 404) — `/` — muse
- DA CITY game — `play/` — VERIFIED headless (mobile 390 + desktop 1280): joystick moves, E jacks car, car hits 270 px/s, heat 3 → cops spawn, dev-bag mission pickup → carry → delivered (MC 2.9K → 10K), bag pickup pumps, caught resets heat, pause works, ~60 fps, 0 page errors (only DexScreener blocked in sandbox)
- Play link in site nav + hero; ATH launchpad link in game — VERIFIED (local 200s)

## To do (priority order)
1. Deploy static site (Vercel, $0) and verify live — muse
2. Absolute og:image/og:url after deploy — muse
3. Optional PR on 0xSneaks/ath linking the game (PR only; prod needs Sneaks) — muse

## Known issues / gotchas
- Live $GTA6 stats on the game title use DexScreener's public API (CORS assumed OK — INFERENCE, check on the live URL); fallback is a labeled Nov 1 snapshot.
- Coin site says it carries no price numbers; the game's title screen shows MC as game flavor. Keep or hide — Muse's call.

## Stack & where things live
- Plain HTML/CSS/JS. Game: `play/index.html`, `play/game.js`. No env vars.
- Coins: $GTA6 `5TPtA7X2HYPyGzjHQFFxrrWpaMJ5cBgcfdeF8E6yQ5Tk` · $DACITY `CAiSF4XTLsc8sPAtTPnqCx57HScTmLRHjgJj4Wu5sDvX` (both Muse's mogz launches, 2026-10-30)
