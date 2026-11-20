# cherry-filigree-duel — Filigree Duel

Status: PICK 2026-11-20 (cherry-gap-bot) · verdict TEST · awaiting Sneaks yes. Claim: none yet.

**Pitch:** Ornate 3-card duels you challenge your room to: beat my hand, climb the room's crest ladder.
**Loop (10 s):** tap Duel → draw 5 illustrated cards → pick 3 and order them → 3 cinematic clashes resolve vs a challenger's saved "ghost hand" → win/loss + crest points → Share or Rematch.
**Why async ghost hands:** no realtime netcode, never a dead "waiting for opponent" screen; any room member's last hand is a playable opponent.

## Screens
1. Home (first frame <1 s): today's Daily Duel, streak flame, room crest ladder top 3, Duel button
2. Draw & pick (5 cards, drag/tap to order 3)
3. Clash (3 rounds, 3D card flips, lighting, particle hits)
4. Result (crest points, streak, Share-to-room, Rematch)
5. Room Ladder (in-app, from room context)
6. Collection / Shop (cosmetic card backs, frames, Codex track)
7. Support + rules (how scoring works)

Size: **M** (art-heavy; game logic small). Reuse: Grok card art pipeline from 0xSneaks/cherry-cards (frames/slicer) — new deck, not poker cards.

## Room hook (documented APIs only)
- Room ladder built in-app keyed by cherry.room.id (no leaderboard API is documented); shows cherry.room.title.
- cherry.share({route:"/duel/:id", params≤4KB, height, caption:"Beat my hand"}) posts a challenge blink (needs inline:render); opening it plays that ghost hand.
- Room-vs-room weekend: top 10 hands of two rooms auto-duel; result card shared to both rooms.
- navigate.userProfile on ladder names. No scraping members.

## Repeat play
Daily Duel (same deck seed for whole room, compare scores) · streaks with flame tiers · 5 free ranked duels/day + unlimited casual · weekly room ladder reset · collection stats (win %, best hand).

## Policy class
**Skill/free + paid cosmetic.** Nothing paid in can be won back or cashed out; no stakes, no paid card power (cosmetics only, no pay-to-win). Not iGaming, not Partner-only. Name has no "Cherry". Never call it endorsed/approved by Cherry or present Verified as a safety mark. Block CU, IR, KP, SD + sanctioned regions in-app. Support channel; act on reports within 72h.

## MONEY IMPLEMENTATION (PLAYBOOK Standards)
1. **Model: Sales** (Cherry bills 10% of what users pay, monthly volume above $100). Users pay for cosmetics only. Day-1 USD prices:
   - Crest card back (single): **$1.99** → one animated card back
   - Gilded Frame set (5 frames): **$4.99** → 5 card frames + profile crest border
   - Sakura Codex 30-day (one-time, expires, no renewal): **$6.99** → 30-day cosmetic reward track (one item every 3 days of play)
2. **Payment flow (builder):** verify launch token server-side first (verifyLaunchToken + appId, key users by cherry_id ?? sub) → one-time payment only, no recurring subscriptions → every tx withAppReference(APP_ID) + label ≤80 chars (e.g. "Filigree Duel: Gilded Frame set") → never bake Cherry's 10% into the tx → unlock only AFTER on-chain verification (amount, recipient, reference, replay protection).
3. **Caps:** live tier for Sneaks's projects UNKNOWN today (shared browser portal is a non-owner wallet). Max single price $6.99 fits every tier incl. Unverified ($50/tx, $50/wallet/day); server rejects any tx above the tier read from the launch token that session. Receiving wallet: Sneaks to confirm, from env, never hardcoded; never ask for seed/private key.
4. **Play-credits only** for gameplay; no real-money stakes (would be iGaming — not proposed).
5. **Sale ledger:** cherry_id, tx signature, USD amount, item, timestamp per sale; reconcile weekly with the app's Billing page (volume, tx count, users). TARGETS (not data): 3% of daily users buy, avg $4.50 → ~$0.14 gross per daily user per day; breakeven ≈ $30/month hosting + art reruns → ~140 paying-user-days/month; **7-day park line: under $25 gross Billing volume or under 50 users in the first full week after publish.** Scale: more paying wallets = linear revenue; per-wallet caps irrelevant at these prices.

## Ship path
Private test room → portal checks + 360px phone iframe test (cherry:ready ≤5 s) → Sneaks publishes.

## Board tasks
- **BUILD — fabok** (review: codex on money path). Repo 0xSneaks/filigree-duel (Sneaks to create or approve). Acceptance: plays at 360px with no horizontal scroll; first frame <1 s and cherry:ready ≤5 s; server-side launch-token verify; withAppReference + ≤80-char label on every tx, no fee baked in; unlock only after on-chain verify; prices ≤$6.99 and tier-cap rejection test; CSP frame-ancestors 'self' https://chat.cherry.fun https://cherry.fun https://*.cherry.fun, no X-Frame-Options, /.well-known/cherry-app.json {"appId"} on every origin; region block; support link; test-room ready; wizard prompt saved as docs/CHERRY_INTEGRATION.md. Branch + PR only, no production deploy without Sneaks.
- **ART — grok-bot** (QA: claude). Near-PS4/PS5 console-grade: cinematic 3D-rendered cards, ornate portraits, gold filigree, sakura, jeweled color, real lighting/depth — never flat CSS. Deliver 24-card base deck, 6 card backs, 5 frames, icon + cover, clash VFX sheet.
- **Ship gate — Sneaks:** walks the portal (Sales model declared), accepts Terms + Developer Agreement + Mini App Policy with wallet, publishes.

## Sneaks-only (max 3)
1. Yes/no on the pick; create the portal project (owner wallet) for the App ID.
2. Confirm the receiving wallet (set in hosting env yourself).
3. Read the live tier on the owner-wallet portal (Verified/Partner) — the shared browser is on HZ69…txhW with 0 projects.
