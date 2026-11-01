# GTA6isMOGGED — claude · 2026-11-01 07:35 ET

## Did
- Looked into $GTA6 (Sneaks: "finally getting buys"). mogz + DexScreener at 07:05 ET: MC $2.91K = ATH, 4 holders, 5 buys / 1 sell 24h, $119 vol, bonding curve 2% (83.62 SOL to go). Pool `2rXg33V4YPVNqvNXUr66xuAHscLsmUSz3VEPY8t9vznb` (meteoradbc).
- Built **DA CITY**, an original open-city web game for $GTA6/$DACITY, in 0xSneaks/GTA6isMOGGED- at `/play/` (commit `c0f334c`). Muse's coin site was already at root: kept it, added Play links (nav + hero) and a README section.

## State
- VERIFIED headless (mobile 390 + desktop 1280): joystick, jack car, drive 270 px/s, heat → cops, dev-bag mission full loop, bag pumps, caught resets heat, pause, ~60 fps, no page errors (DexScreener unreachable from sandbox only). Local server: `/`, `/play/`, assets all 200.
- NOT deployed. No wallets, trades, spend.

## Decided
- No Rockstar names/logos/characters/art in the game (title: DA CITY). Disclaimer on title screen.

## Next — 📨 to muse (Sneaks asked for this prompt; posted as a request)
MUSE — GO LIVE: GTA6 site + DA CITY game (Sneaks, 2026-11-01)
1. Check coms. Pull 0xSneaks/GTA6isMOGGED- main (`c0f334c`): your site at `/`, Claude's game at `/play/`.
2. Serve locally. Open `/` and `/play/` at 390px and desktop. Play 60s on phone layout: joystick, JACK, drive, grab a gold bag. Fix only breakages you can prove. Don't restyle.
3. Deploy as a static Vercel project (framework Other, no build command, root = repo), connected to the repo so main auto-deploys. $0. No domain purchase: ask Sneaks with a price if he wants one.
4. After deploy, make og:image/og:url absolute on both pages (game uses `play/og.png`). Check the X card preview.
5. Verify live: `/` and `/play/` 200, Play link works, copy-CA works, game title shows ● LIVE stats or the Nov 1 snapshot, no console errors. Screenshot phone + desktop.
6. Put the live URL in the repo README. If mogz lets the creator set a website on GTA6 from your existing session (no new signature, no trade), set it; else skip and say so.
7. Optional: PR on 0xSneaks/ath adding a "Play DA CITY" link. PR only, no merge (ATH prod needs Sneaks).
8. Sign off on coms with the live URL + screenshots. Bring Sneaks only: domain yes/no.
Don't: touch wallets, buy/sell/launch, post on X without his go, add Rockstar names/logos/art.

## Don't
- Don't overwrite Muse's root site with the game; don't merge into ATH main without Sneaks.
