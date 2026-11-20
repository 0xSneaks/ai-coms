# Banner Brawl

**Status:** OPEN · **Owner:** Cherry Gap Bot (spec) · **Repo:** none yet · **Live URL:** none · **Last updated:** 2026-11-19 by cherry-gap-bot

## Now
Spec filed 2026-11-19. Build, art, and ship gate are unclaimed. No app repo or portal listing yet.

## Spec

### Loop (10s)
open in a room → tap the falling petals in rhythm for 30s → score adds to your room's banner height → see room rank → share result.

### Screens
Play · Result (+share) · Room Board (today's room-vs-room + in-room top players) · Armory (cosmetics) · Streak/Daily

### Size
M

### Room hook
`cherry.room` `{id,title,memberCount}` groups scores; room-vs-room daily standings computed in-app (score per active player so small rooms can win); `cherry.share` result blink; `navigate.openRoom` from rival rows.

### Repeat play
one free scored run per day + practice runs, 7-day streak crest, daily room reset at 00:00 UTC, weekly season crest.

### Policy class
skill/free + paid cosmetic (not iGaming; no prizes paid out).

### Money
Sales; Cherry bill = (monthly volume above $100) × 10%; day-1 prices $0.99 banner skin, $2.99 jeweled frame, $4.99 crest pack; scales with more paying wallets (each wallet caps far below limits); target $0.03 per daily user (e.g. ~3% of players buy a $0.99 item daily or equivalent); park line: 7-day Billing volume under $25 after 14 days live; receiving wallet: Sneaks to confirm.

### Ship path
private test room → checks + test → Sneaks publishes.

## Money implementation
1. **Money model:** Sales. The user pays for one-time cosmetic unlocks (no score advantage, nothing cashes out). Day-1 prices: $0.99 banner skin, $2.99 jeweled frame, $4.99 crest pack (contents per spec above).
2. **Payment flow:** verify launch token server-side first (`verifyLaunchToken` + `appId`, key by `cherry_id ?? sub`), then one-time payment only — no recurring subscriptions. Every tx carries `withAppReference(APP_ID)` and a label ≤80 chars. Never bake Cherry's 10% fee into the tx. Credit the cosmetic unlock only AFTER the tx is verified on-chain, never before.
3. **Caps check:** use the live tier from the portal that day. $4.99 max is far under Verified $1,000/tx and Unverified $50/tx, so it's safe on either tier. Reject any cart above the live cap. Receiving wallet = TBD by Sneaks; never hardcode one, never ask for a seed/private key.
4. **Play-credits only.** No real-money stakes and no cash-out. This is skill/free + paid cosmetic, not iGaming.
5. **Ledger + kill line:** log `cherry_id`, tx signature, USD amount, item, and timestamp for every sale. Target revenue $0.03 per daily user. Breakeven is not separately stated in the existing spec. Park if 7-day Billing volume is under $25 after 14 days live; check that number against the app's Billing page.

## Tasks

### BUILD — claude-code (auth + money path) with codex (UI/scaffold)
Acceptance: plays at 360px; first frame + `cherry:ready` < 5s; launch token verified server-side (`verifyLaunchToken` + `appId`, key by `cherry_id ?? sub`); every tx has `withAppReference(APP_ID)` + ≤80-char label; cosmetic prices $0.99/$2.99/$4.99 one-time, inside the $50/tx Unverified cap; no recurring subs; cosmetics give no score advantage and nothing cashes out; CU/IR/KP/SD blocked; room leaderboard built in-app from `cherry.room`; `cherry.share` result blink; test URL ready for the private test room. Renders the console-grade look on a 360px phone at 60fps: WebGL (PixiJS or Three.js) with pre-rendered 3D art, particle FX, and screen-shake/bloom on hits; first frame still <5s (lazy-load heavy assets after cherry:ready). Acceptance tests: tx rejected without valid launch token; unlock granted only after on-chain confirmation; every tx has withAppReference + <=80-char label; sale ledger row written per sale.

Deploy/live checks: muse.

### ART — grok-bot
ART — grok-bot: CONSOLE-GRADE bar (Sneaks 2026-11-19): near-PS5 look — cinematic 3D-rendered banners and crests, volumetric light, depth of field, wet-stone reflections, jewel tones, gold filigree, sakura particle trails; reference keyart-v1.jpg. Deliver: 9:16 splash, 512x512 icon, 1200x630 cover, 6 crests, 4 banner skins, petal/hit FX sprite sheets. No flat CSS anywhere.

### SHIP GATE — Sneaks
Sneaks walks the portal wizard (category Games, money model Sales), accepts agreements with his wallet, adds live URL, runs checks + iframe test, publishes. Save wizard prompt to `docs/CHERRY_INTEGRATION.md` in the app repo.
