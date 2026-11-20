# Deploy plan — PREPARE ONLY

No deploy, publish, or spend has happened. This file is the plan so the
ship gate (Sneaks publishes) can be executed in one pass once the portal
appIds, origins, and art exist. Do not execute any step here without
Sneaks's explicit yes.

## Hosting shape (recommended)

Ten listings, ten origins, one shared codebase:

- **One hosting project per listing** (e.g. Vercel), each with env
  `VITE_LISTING=<hub|BTC|ETH|SOL|ZEC|XRP|NEAR|HYPE|DOGE|BNB>`.
  Separate projects keep each listing's env, domain proof, and Billing
  separate — Cherry bills per app, and each listing needs its own
  `/.well-known/cherry-app.json` on its own origin.
- Build command per listing: `node scripts/build-listing.mjs <listing>`
  (runs `VITE_LISTING=<listing> npm run build` and verifies the
  domain-proof file carries that listing's appId).
- Each listing serves its own build output only. The hub build serves the
  Coins list at `/`; a pair build opens directly on its pair screen.
- Origins are subdomains of one domain the family owns (shape only, not a
  claim of a live domain): `hub.<domain>`, `btc.<domain>`, … — fill them
  into `src/config/listings.json` as the `TODO_ORIGIN_*` values are replaced.
- Server: one lightweight Node service per listing (or one service reading
  `CHERRY_APP_ID` per deployment) running `server/auth.ts` —
  `requireCherryUser` on every request that reads a balance, moves credits,
  or touches a cosmetic unlock. Each deployment verifies tokens for ITS
  appId only. No server exists yet; the auth module is written and tested.

## CSP (production)

Dev/preview already send `frame-ancestors 'self' https://chat.cherry.fun
https://cherry.fun https://*.cherry.fun` (see `vite.config.ts`). Production
serves the same frame-ancestors plus a full CSP — see `vercel.json` in this
tree (config only, not deployed):

- `default-src 'self'`
- `script-src 'self'`
- `style-src 'self' https://fonts.googleapis.com`
- `font-src 'self' https://fonts.gstatic.com`
- `img-src 'self' data:`
- `connect-src 'self' https://hermes.pyth.network`
- `frame-ancestors 'self' https://chat.cherry.fun https://cherry.fun https://*.cherry.fun`

No other origins. If the host is not Vercel, translate `vercel.json` to
that host's header config — same values.

## Private test rooms (before publish, per listing)

1. Deploy that listing to its staging origin (Sneaks's yes first).
2. In the portal, open the listing's **test room** (private room only the
   team sees) and launch the app from it.
3. Checklist inside the room:
   - `cherry:ready` fires and first paint lands in under 5s at 360px.
   - Launch token verifies server-side (reject a forged/expired token —
     `server/auth.ts` tests cover this; confirm live with a bad token).
   - Daily claim grants 200 credits once per UTC day; soft cap 2,000.
   - A ticket places, settles after the 5-minute confirm, and pays 100 on
     a win (mock feed while the Pyth key is unset — the feed flag must say
     MOCK; never present mock prices as live).
   - Feed-stale breaker halts new tickets when the feed is stale.
   - Tabs: 15 MIN / HOURLY live; DAILY / WEEKLY / MONTHLY greyed "soon";
     pair screen 5M greyed "soon"; Crypto Leader card tappable, race not
     playable (v2).
   - Result share posts without any cash or Kalshi claim.
4. Fix, re-check, then Sneaks publishes that listing from the portal.

## What is NOT in this plan

- No production deploy, no DNS changes, no spend.
- No SOL money path (v2 parked). No treasury, no staking, no payouts.
- No cosmetics checkout until Sneaks confirms the receiving wallet.
- No Pyth key in any config — it arrives as env (`VITE_PYTH_API_KEY`)
  at build/deploy time, never committed.
