# Portal checklist — the 10 listings

Ship gate is Sneaks publishes. Nothing here is deployed or published yet.
Every appId below is a `TODO_APP_ID_*` placeholder: portal-created appIds do
**not** exist yet. Do not invent one — a placeholder is the honest state.

## The 10 listings

| # | Listing | App name | Portal appId | Origin | v1 markets |
| --- | --- | --- | --- | --- | --- |
| 1 | `hub` | Up or Down | `TODO_APP_ID_HUB` | `TODO_ORIGIN_HUB` | All 9 pairs + Crypto Leader card |
| 2 | `BTC` | BTC Up or Down | `TODO_APP_ID_BTC` | `TODO_ORIGIN_BTC` | BTC 15m / 1h |
| 3 | `ETH` | ETH Up or Down | `TODO_APP_ID_ETH` | `TODO_ORIGIN_ETH` | ETH 15m / 1h |
| 4 | `SOL` | SOL Up or Down | `TODO_APP_ID_SOL` | `TODO_ORIGIN_SOL` | SOL 15m / 1h |
| 5 | `ZEC` | ZEC Up or Down | `TODO_APP_ID_ZEC` | `TODO_ORIGIN_ZEC` | ZEC 15m / 1h |
| 6 | `XRP` | XRP Up or Down | `TODO_APP_ID_XRP` | `TODO_ORIGIN_XRP` | XRP 15m / 1h |
| 7 | `NEAR` | NEAR Up or Down | `TODO_APP_ID_NEAR` | `TODO_ORIGIN_NEAR` | NEAR 15m / 1h |
| 8 | `HYPE` | HYPE Up or Down | `TODO_APP_ID_HYPE` | `TODO_ORIGIN_HYPE` | HYPE 15m / 1h |
| 9 | `DOGE` | DOGE Up or Down | `TODO_APP_ID_DOGE` | `TODO_ORIGIN_DOGE` | DOGE 15m / 1h |
| 10 | `BNB` | BNB Up or Down | `TODO_APP_ID_BNB` | `TODO_ORIGIN_BNB` | BNB 15m / 1h |

No "Cherry" in any app name, icon lettering, or cover type.

## What Sneaks does per listing (portal wizard, 10 times)

1. Open the listing wizard (`portal.cherry.fun/dashboard/launch`).
2. App: name + one-line pitch + category **Games** + icon + cover.
   (Icon/cover art is grok-bot's lane — see "ART still missing" below.)
3. Who runs it: individual, legal name, country, email + Telegram.
4. Where it runs: chains (Solana), countries not served, age rating **18+**.
5. Money: **Sales** (cosmetics only — credits are never sold or cashed out).
6. Terms: Cherry's standard Terms + Privacy Policy, and the Developer
   Agreement for this app, accepted with his wallet.
7. Copy the listing's **appId** from the portal.

## What to paste where (after the portal gives an appId)

| Portal value | Paste it here |
| --- | --- |
| Listing appId | `src/config/listings.json` — replace that listing's `TODO_APP_ID_*` |
| Listing appId (server) | `CHERRY_APP_ID` env on that listing's server deployment (one value per listing — each listing verifies tokens for ITS appId only) |
| Listing origin (hosting URL) | `src/config/listings.json` — replace that listing's `TODO_ORIGIN_*` |
| Domain proof | served automatically: every build writes `dist/.well-known/cherry-app.json` for its listing (see `scripts/gen-domain-proof.mjs` to preview it; `scripts/build-listing.mjs <id>` to build + verify one listing) |

After pasting: rebuild that listing, confirm
`dist/.well-known/cherry-app.json` carries the real appId, open the
listing's private test room (see DEPLOY-PLAN.md), then publish.

## Blocked on Sneaks (not build work)

- **Portal appIds** — all 10, per the table above.
- **Origins / hosting** — pick the host (see DEPLOY-PLAN.md), then fill the
  `TODO_ORIGIN_*` values.
- **`VITE_PYTH_API_KEY`** — the live price feed key. The code reads it from
  env only and falls back to a labeled mock without it. Never commit it.
- **Receiving wallet for cosmetics** — checkout is stubbed until he confirms
  the wallet. No wallet address is written anywhere in this tree.
- **ART (grok-bot's lane)** — still missing, all of it: 10 icons (512×512),
  10 covers (1200×630), one 9:16 hub splash, and the pair-screen chrome kit
  (asset metals, Up/Down buttons, pie timer, sparkline, LIVE/Past pills).
  The inline SVG glyphs in `src/ui/icons.ts` are placeholders, not the
  console-grade art. Nothing in this tree is grok-bot art — no art assets
  for this family exist in the repo yet.

## Do not publish if…

- the live tier / Policy class is in doubt — ask team@cherry.fun first
  (the family is play-credits + cosmetics, not a prediction market and not
  iGaming, per the spec's Policy class section).
- v2 SOL is un-parked — it is not. No SOL stakes, escrow, treasury, or
  payout code exists in v1 and none may be added without Sneaks un-parking
  `../v2-sol-partner.md` first.
