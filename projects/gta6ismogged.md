# GTA6isMOGGED — $GTA6 coin site + DA CITY game

**Repo:** 0xSneaks/GTA6isMOGGED-  ·  **Live URL:** https://gta6ismogged.vercel.app (game at /play/, deployed by muse)  ·  **Last updated:** 2026-11-01 by muse

## Now (keep this current)
LIVE on Vercel (project `gta6ismogged`, team phantomcapais-projects, production READY, git-connected to main — pushes auto-deploy). Current main `def8708` (claude repo polish on top of muse's og-tag commit `23d52883`). Muse verified the live build end-to-end 2026-11-01 — full report + screenshots: `handoffs/2026-11-01_0810_muse_gta6-live.md`. $GTA6 stats at verification: MCAP $2.91K / ATH $2.91K / 24H B/S 5/1 (LIVE on the game title, matching mogz).

## Established (decisions — don't re-litigate)
- Game is original: no Rockstar names, logos, characters or art; disclaimer on both pages — claude, 2026-11-01.
- Game lives at `/play/`; Muse's site stays the root — claude, 2026-11-01 (repo already had Muse's site).
- Static only: no wallet, no backend, no tracking — 2026-11-01.

## Built
- Coin site (hero, lore, how to buy, facts, community, FAQ, 404) — `/` — muse
- DA CITY game — `play/` — VERIFIED headless (mobile 390 + desktop 1280): joystick moves, E jacks car, car hits 270 px/s, heat 3 → cops spawn, dev-bag mission pickup → carry → delivered (MC 2.9K → 10K), bag pickup pumps, caught resets heat, pause works, ~60 fps, 0 page errors (only DexScreener blocked in sandbox)
- Play link in site nav + hero — VERIFIED (local 200s). ATH launchpad link was in the game title, REMOVED 2026-11-01 per Sneaks: the launchpad is merged + live (ath-ebon.vercel.app) but not launch-ready until Sneaks signs the fee config on /admin. Re-add only after that. The game's own "ATH" = player's all-time-high score, unrelated to the launchpad.
- DA CITY v2 (`3ba5128`): Moon Key island + 2 bridges, ATH Tower + MOGZ HQ, 6-mission story then side jobs, fleeing target cars, bystanders filming (heat), original procedural radio — VERIFIED headless (full story loop, bridge crossing, 60 fps, no page errors). Private preview artifact for Sneaks: claude.ai/artifact/PaketgySBJ1a4qgLe4rGZh
- DA CITY v3 (`92f0be2`): full 3D (three.js r128 from cdnjs, all geometry/textures generated in code), day/night, shadows on desktop, chase cam with wall collision, camera-relative stick — VERIFIED headless with software WebGL (story loop, side jobs, cops, pause, no page errors). Real-device FPS UNKNOWN: Sneaks/muse test on a phone. Live URL showed v2 text at 07:50 ET; v3 should auto-deploy from main (UNVERIFIED).

## To do (priority order)
1. ~~Deploy static site (Vercel, $0) and verify live~~ — DONE by muse 2026-11-01 (see handoff)
2. ~~Absolute og:image/og:url after deploy~~ — DONE by muse 2026-11-01 (commit `23d52883`; verified live + Twitterbot view)
3. Optional PR on 0xSneaks/ath linking the game — DONE: PR OPEN https://github.com/0xSneaks/ath/pull/2 (branch `muse/play-da-city-link`, commit `ff90319e`). PR only, not merged; prod needs Sneaks.

## Known issues / gotchas
- Live $GTA6 stats on the game title: CONFIRMED working on the live URL by muse 2026-11-01 — title shows ● LIVE (DexScreener values matching mogz API: MC $2,894 / ATH $2,907 / B/S 5/1); the labeled Nov 1 snapshot appears first, then flips to LIVE. Fallback works as designed.
- Mogz coin `website` field: display-only in mogz's client; no edit route from the creator session (no PATCH in the API surface) — the site URL is NOT set on the GTA6 mogz page. Would need a mogz-side edit flow/signature; skipped per Sneaks's order.
- Coin site says it carries no price numbers; the game's title screen shows MC as game flavor. Keep or hide — Muse's call.

## Stack & where things live
- Plain HTML/CSS/JS. Game: `play/index.html`, `play/game.js`. No env vars.
- Coins: $GTA6 `5TPtA7X2HYPyGzjHQFFxrrWpaMJ5cBgcfdeF8E6yQ5Tk` · $DACITY `CAiSF4XTLsc8sPAtTPnqCx57HScTmLRHjgJj4Wu5sDvX` (both Muse's mogz launches, 2026-10-30)

## Update — 2026-11-01
TRIPO_API_KEY secret set in 0xSneaks/GTA6isMOGGED- (GitHub Actions). Claude can build the Tripo Action.
