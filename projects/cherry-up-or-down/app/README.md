# Up or Down

Local v1 scaffold for the family specified in [`projects/cherry-up-or-down.md`](../../cherry-up-or-down.md). Official names: **Up or Down** (hub) and **BTC Up or Down** (pair template). Do not put “Cherry” in any app name, icon lettering, or cover type.

This tree is play-credits only. The SOL / Partner house book is parked at [`../v2-sol-partner.md`](../v2-sol-partner.md). Do not add SOL deposit, escrow, payout, treasury, or stake code.

Credits are never sold and never cashed out. There is no buy-credits path. Revenue, when Sneaks opens it, is cosmetics only.

## How to run and test

```bash
cd projects/cherry-up-or-down/app
npm install
npm test          # engine + credits-economy selftests (src/engine/selftest.ts)
npx tsc --noEmit
npm run dev       # http://127.0.0.1:5173/       hub
                  # http://127.0.0.1:5173/#/btc  BTC pair screen
npm run build     # tsc --noEmit && vite build
npm run preview   # http://127.0.0.1:4173/
```

Dev and preview bind to `127.0.0.1` and send a `Content-Security-Policy` `frame-ancestors` header for Cherry origins (see `vite.config.ts`).

Do not deploy, publish, spend, or sign anything unless Sneaks explicitly says yes. Do not call a Kalshi API or display Kalshi market data.

## Architecture

One shared engine, a Coins hub, and a single-pair template. The other eight pair listings are config-ready in `src/config/pairs.ts` / `src/config/apps.ts` and should be forked from the BTC screen, each later on its own origin and `appId`.

| Area | Path | Role |
| --- | --- | --- |
| Engine | `src/engine/` | N(d) pricing, 3-credit house book, 60s strike/close averages, settlement (Up iff `C >= K`), windows |
| Hub | `src/ui/hub.ts`, `#/` | Coins list: 15 MIN and HOURLY live; Daily / Weekly / Monthly greyed “soon”; Crypto Leader card stub |
| Pair template | `src/ui/market.ts`, `#/btc` | BTC 15m/1h screen: TO BEAT / NOW, chart, tickets, Up/Down, also-trading rail, live chat stub |
| `StakeCurrency` | `src/engine/currency.ts` | Abstract stake adapter. Only implementation: play-credits (`Credits`). Debit / credit / refund / payout. Not cashable, not purchasable. |
| Ledger | `src/engine/ledger.ts` | Per-user KV keyed by `cherry_id ?? sub`. Idempotent `claimDaily`, `placeTicket`, `resolve` (payout / refund / debit op ids). Ticket sizes 10 / 25 / 50 / 100. |
| Risk + breaker | `src/engine/risk.ts`, `src/config/risk.ts` | `E_round = bankroll/60` (10,000 credits), `E_asset = 2×E_round`. Hard-reject on cap breach. Halt new tickets when the feed is stale past `staleMs` (default 5s) or a vol spike fires; void + refund at settlement if still stale. |
| Pricing feed | `src/engine/pricing.ts` | Pyth Hermes when `VITE_PYTH_API_KEY` is set; otherwise a labeled mock. Missing settlement prints are voided, never invented. |
| Cosmetics | `src/engine/cosmetics.ts` | Catalog stub ($0.99 / $2.99 / $4.99). `purchaseCosmetic_STUB` throws. No payment code, no receiving wallet. |
| Auth | `server/auth.ts` | Server-side `verifyLaunchToken` + that listing's `appId`; keys users by `cherry_id ?? sub`. Rejects forged/expired/wrong-app tokens and placeholder appIds. Framework-free `requireCherryUser` reads `Authorization: Bearer <token>`. Tested in `src/engine/selftest.ts` with a local JWKS. |
| Manifest | `public/.well-known/cherry-app.json` (dev) + build-time `dist/.well-known/cherry-app.json` | Written per listing at build time by the `cherryDomainProof` plugin in `vite.config.ts` (see `scripts/gen-domain-proof.mjs`). Each listing serves its own file on its own origin. |
| Handshake | `src/cherry.ts` | `cherry.init()` immediately when inside Cherry so `cherry:ready` fires within 5s. |

Users are keyed by `cherry_id ?? sub` once launch-token verify exists. Until then the local ledger uses a demo user id.

360×800 shots: `screenshot-hub-360.png`, `screenshot-btc-360.png`.

## What's done (v1 scaffold + Muse fill-out 2026-11-20)

- Shared engine + Coins hub + BTC template, mobile-first 360px
- Daily claim: 200 credits once per UTC day, button in the econ bar
- Soft cap 2,000 (grants pause at/above cap; winnings may exceed)
- Ticket selector, balance pill, win/loss/void settlement banners
- Exposure caps and configurable feed-stale circuit breaker
- Idempotent ledger tests plus cap / claim / breaker / settlement tests — `npm test` green
- `StakeCurrency` kept abstract; play-credits only
- Cosmetics catalog stub only
- **Fill-out (2026-11-20):** 10-listing config in `src/config/listings.json`
  (single source of truth; all appIds still `TODO_APP_ID_*` placeholders —
  portal ids do not exist yet); per-listing builds via
  `scripts/build-listing.mjs <listing>` (env `VITE_LISTING`); domain-proof
  file written per build; server-side launch-token verify in
  `server/auth.ts` with tests (wrong-app / expired / garbage / tampered /
  placeholder-appId all rejected); pair listings open directly on their
  pair screen; 15 MIN + HOURLY live, 5M / Daily / Weekly / Monthly greyed
  "soon", Crypto Leader card tappable with the race parked for v2; hosting +
  CSP + test-room plan in `DEPLOY-PLAN.md`; portal steps in
  `PORTAL-CHECKLIST.md`; production headers in `vercel.json` (config only).

## What's not done (for Sneaks / grok-bot)

- **Portal appIds (Sneaks):** all 10 listings — create in the portal, paste
  into `src/config/listings.json` (see PORTAL-CHECKLIST.md).
- **Origins + hosting (Sneaks):** pick the host, fill `TODO_ORIGIN_*`,
  deploy per DEPLOY-PLAN.md. No deploy has happened.
- **`VITE_PYTH_API_KEY` (Sneaks provides, never commit the key):** the code
  reads it from env only (`readPythApiKey` in `src/engine/pricing.ts`,
  tested) and falls back to a labeled mock without it.
- **Cosmetics checkout + receiving wallet (blocked):** stub stays. No wallet
  address is written anywhere in this tree.
- **ART (grok-bot's lane):** 10 icons (512×512), 10 covers (1200×630), one
  9:16 hub splash, pair-screen chrome kit. No grok-bot art for this family
  exists in the repo yet; the inline SVG glyphs in `src/ui/icons.ts` are
  placeholders. Ship gate = Sneaks publishes.

## Config and environment

| Name | Where | Notes |
| --- | --- | --- |
| `VITE_PYTH_API_KEY` | env (optional) | Hermes Bearer key, required by Pyth since 2026-08-26. Leave unset for the labeled mock. **Never commit the value.** Sneaks provides it when going live. Read only via `readPythApiKey` (`src/engine/pricing.ts`). |
| `VITE_LISTING` | env (build time) | Which listing this build serves: `hub` (default) or a pair id (`BTC`, `ETH`, …). Drives `CURRENT_LISTING` and the domain-proof file. Use `scripts/build-listing.mjs <listing>`. |
| `CHERRY_APP_ID` | server env (per listing) | The listing's real portal appId, for `server/auth.ts`. One value per listing deployment. Never a `TODO_` placeholder in production. |
| `APP_IDS` / `LISTINGS` | `src/config/listings.json` (+ `src/config/apps.ts`) | Single source of truth for all 10 listings. Placeholders `TODO_APP_ID_*` / `TODO_ORIGIN_*` until Sneaks pastes real values. Never hardcode a receiving wallet here. |
| `RISK` | `src/config/risk.ts` | `bankrollCredits` 600,000 → `E_round` 10,000; `staleMs` 5,000; vol-spike multipliers; `resumeFreshMs` 60,000. |
| `CURRENT_LISTING` | `src/config/apps.ts` | From `VITE_LISTING`; this tree is served as the hub origin by default. A pair listing opens directly on its pair screen. |
| Daily grant / soft cap | `src/engine/currency.ts` | 200 / 2,000 |

No `.env` files are committed. Do not add secrets, payment credentials, or a receiving wallet to this tree.
