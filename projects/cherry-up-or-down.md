# Up or Down

**Status:** OPEN · **Owner:** Cherry Gap Bot (spec) · **Repo:** none yet · **Live URL:** none · **Last updated:** 2026-11-20 00:32 ET by muse
**Stage:** BUILD · **Owner:** muse · **Next:** portal appIds + hosting + Pyth key + receiving wallet + ART (grok-bot); ship gate = Sneaks publishes · **Gate:** Sneaks publish; v2 SOL parked

## Now

Spec filed 2026-11-19 (America/New_York) and set as the **v1 credits** build the same night: Sneaks decided v1 ships on play-credits ("keep it safe, then we'll move to SOL"). The SOL / Partner house book is **parked for v2** — [v2-sol-partner.md](cherry-up-or-down/v2-sol-partner.md). See **v2 migration** below.

This is a **family of 10 listings**: one hub plus nine single-pair apps, all sitting on one shared engine. No app repo or portal listing yet.

Sneaks's scope (same day): own both the single-pair slots and the all-in-one slot so nobody can undercut the family.

Fabok signed off a local scaffold 2026-11-19 23:53 ET: engine + Coins hub + BTC template at `/workspace/cherry/up-or-down` (play-credits only; no Kalshi API; no deploy). Shots: [hub](../handoffs/assets/2026-11-19-cherry-up-or-down/screenshot-hub-360.png), [BTC](../handoffs/assets/2026-11-19-cherry-up-or-down/screenshot-btc-360.png). That scaffold already keeps stake currency behind a `StakeCurrency` adapter with play-credits as the only implementation — that is the abstract stake interface v1 must keep so v2 can swap in SOL.

Fabok signed off the v1 credits economy 2026-11-20 00:01 ET on the same local path: daily claim 200 / soft cap 2,000, tickets 10/25/50/100, idempotent ledger (`cherry_id ?? sub`), exposure caps (`E_round` 10,000), configurable feed-stale breaker, cosmetics stub (no payment/wallet), ticket + claim + settlement UI on the hub and BTC screens. Tests + `vite build` green. Shots: [hub](../handoffs/assets/2026-11-20-cherry-up-or-down/screenshot-hub-360.png), [BTC](../handoffs/assets/2026-11-20-cherry-up-or-down/screenshot-btc-360.png). Still local only — no deploy, no SOL fund-moving code. → [handoff](../handoffs/2026-11-20_0001_fabok_cherry-up-or-down.md).

Fabok copied that scaffold into this repo at [app/](cherry-up-or-down/app/) on 2026-11-20 00:14 ET, with a run/architecture README, and filed a request for Muse to fill out the rest (see **Next**). No deploy, no secrets, no SOL fund-moving code. → [handoff](../handoffs/2026-11-20_0014_fabok_cherry-up-or-down.md).


## Next

Sneaks routed remaining v1 fill-out to **Muse** (2026-11-20: "Push what's needed in coms and I'll have muse fill out the rest."). Start from [app/](cherry-up-or-down/app/) and its [README](cherry-up-or-down/app/README.md). The board request is `[fabok → muse] cherry-up-or-down`.

Muse should:

1. Real `appId`s and `/.well-known/cherry-app.json` per listing (hub + 9 pairs, each on its own origin).
2. Server-side launch-token verify (replace `app/server/auth-stub.ts`; key users by `cherry_id ?? sub`).
3. Wire `VITE_PYTH_API_KEY` once Sneaks provides it. Never commit the key.
4. Cosmetics checkout + receiving wallet after Sneaks confirms the wallet: `withAppReference` + ≤80-char label; unlock only after confirmation.
5. Remaining 8 pair apps from the BTC template.
6. ART to the console-grade bar (icon / cover / in-app).
7. 5M / Daily / Weekly / Monthly tabs + Crypto Leader race.
8. Hosting + CSP + private test rooms.

**Ship gate:** Sneaks publishes. **v2 SOL** stays parked at [v2-sol-partner.md](cherry-up-or-down/v2-sol-partner.md) — do not implement fund-moving SOL. **Hard rules:** credits never sold or cashed out; no deploy, publish, or spend without Sneaks's yes.

### Fill-out status — 2026-11-20 00:32 ET (muse)

Board request `[fabok → muse] cherry-up-or-down` is **DONE** —
[handoff](../handoffs/2026-11-20_0032_muse_cherry-up-or-down.md).

- (1) appIds + domain proof: **done as far as code can go** —
  `app/src/config/listings.json` is the single source of truth; all 10
  appIds are still `TODO_APP_ID_*` (portal ids do not exist, none invented);
  every build writes `dist/.well-known/cherry-app.json` for its listing
  (`VITE_LISTING`, `scripts/build-listing.mjs`).
- (2) Launch-token verify: **done** — `app/server/auth.ts` replaces the
  stub; tested (wrong-app / expired / garbage / tampered / placeholder
  appId all rejected).
- (3) Pyth key: **blocked on Sneaks** — code reads it from env only, mock
  fallback labeled. Never commit the key.
- (4) Cosmetics checkout: **blocked on the receiving wallet** — stub stays;
  no wallet address anywhere in the tree.
- (5) Remaining 8 pair apps: **done** — all nine pairs are first-class
  listings (per-listing builds; pair listings open on their pair screen).
- (6) ART: **blocked — grok-bot's lane.** No grok-bot art for this family
  exists in the repo. Still missing: 10 icons, 10 covers, 9:16 hub splash,
  pair-screen chrome kit.
- (7) Tabs + Crypto Leader: **done/verified** — 15 MIN + HOURLY live, 5M /
  Daily / Weekly / Monthly greyed "soon"; Leader card tappable, race is v2.
- (8) Hosting + CSP + test rooms: **prepared only** (`app/DEPLOY-PLAN.md`,
  `app/vercel.json`). Nothing deployed.

**Correction — Partner status is UNCONFIRMED.** The parked v2 file says
"Sneaks says he is a Cherry Partner"; treat that as unconfirmed, not
established (live portal tier showed Verified, and a Partner-agreement
request to team@cherry.fun was drafted). Nothing here un-parks v2.

## Family (no "Cherry" in any name)

| Listing | App name | v1 markets |
| --- | --- | --- |
| Hub | **Up or Down** | All nine pairs, plus a Crypto Leader card (race playable in v2) |
| Pair | **BTC Up or Down** | BTC only |
| Pair | **ETH Up or Down** | ETH only |
| Pair | **SOL Up or Down** | SOL only |
| Pair | **ZEC Up or Down** | ZEC only |
| Pair | **XRP Up or Down** | XRP only |
| Pair | **NEAR Up or Down** | NEAR only |
| Pair | **HYPE Up or Down** | HYPE only |
| Pair | **DOGE Up or Down** | DOGE only |
| Pair | **BNB Up or Down** | BNB only |

Other name ideas (rejected for v1, kept if a listing is taken): Markline, Tape Call, Open Mark, Coin Windows, Pulse Tape. Do not use "Cherry" in any app name, icon lettering, or cover type.

## Architecture

One shared engine / back end, ten front-end listings.

**Shared engine (one deployable service):** N(d) pricing, constant-spread house book, Pyth 60-second settlement, **abstract stake interface** (v1 = play-credits), exposure caps, feed-stale circuit breaker, credits ledger, cosmetics store, room leaderboards, sale ledger. This file remains the spec. The v1 play-credits scaffold now lives at [app/](cherry-up-or-down/app/) (Sneaks 2026-11-20: push what's needed in coms so Muse can fill out the rest). Do not commit secrets, `.env` files, `node_modules`, or `dist`.

**Ten listings:** each front end is its own Cherry mini app with its **own `appId`** and its own `/.well-known/cherry-app.json` on its own origin. Subdomains are fine (example shape, not a claim of a live domain: `hub.example`, `btc.example`, …). Each listing verifies launch tokens for **its** `appId`.

**Shared account:** credits and cosmetic unlocks are keyed by `cherry_id` (fallback `sub`) and are **shared across all 10 apps**. A skin bought in BTC Up or Down is equipped in the hub and in every other pair app. A daily credit grant is once per `cherry_id`, not once per listing.

**Build order:** shared engine first, then the hub, then the nine single-pair apps from one template (pair screen + that asset's theme). Tapping a hub card opens the matching single-pair screen — in the hub webview for a first paint, and via `navigate` / deep link into the pair listing when that app is installed.

## Abstract stake interface

Pricing, the 3% / 3-credit overround book, lock, settlement, payouts, exposure caps, and the circuit breaker are **currency-agnostic**. They operate on a stake unit `Stake { amount, currency }`, not on a hard-coded credits type.

v1 implements `currency = Credits`. The only v1 implementation is the play-credits ledger (daily grant, soft cap, no sale, no cash-out). v2 implements `currency = SOL` against the house treasury, using the parked spec. The engine must not branch on currency except inside the adapter (debit, credit, refund, and — for SOL only — on-chain confirm + treasury payout).

Required adapter methods (names can match the existing `StakeCurrency` adapter):

- `debit(cherry_id, amount)` / `credit(cherry_id, amount)` / `refund(cherry_id, amount)` — atomic ledger updates; credits never go on-chain
- `accept(bet)` only after the debit is final, and only before the round lock (v1 default lock: **30 seconds before close**, same as v2, so the engine stays shared)
- `payout(bet, result)` is **idempotent**
- `balance(cherry_id)` and, for v1, grant + soft-cap enforcement

Do not add a SOL implementation in v1. Do not take SOL stakes, escrow, or treasury payouts until the parked v2 file is un-parked by Sneaks.

## Spec

### Loop (10s)

open the hub in a room → pick a pair card (or open a pair listing directly) → see Price to beat vs Current, Chance, and the countdown → tap Up or Down with play-credits → watch the window → result + `cherry.share`.

### Screens

**Hub ("Coins" list).** Primary references: [hub-ref-1.png](cherry-up-or-down/hub-ref-1.png), [hub-ref-2.png](cherry-up-or-down/hub-ref-2.png), [hub-ref-3.png](cherry-up-or-down/hub-ref-3.png). Must include:

- back arrow and a **Coins** title
- tabs **15 MIN / HOURLY / DAILY / WEEKLY / MONTHLY** — v1 ships **15 MIN** and **HOURLY**; DAILY, WEEKLY, and MONTHLY stay greyed **"soon"** until math and liquidity are proven
- one card per pair: asset icon, title `XXX 15 MIN` (or `XXX 1 HOUR` on the Hourly tab), a countdown in the asset color, and a pie timer
- **Price to beat** next to **Current**, with a red/green arrow delta
- a sparkline in the asset color
- **Up %** in a green pill and **Down %** in a red pill
- bottom-left credits volume for the window, bottom-right room-message count
- a **Crypto Leader — 15 minutes** race card showing the top 2 coins with multipliers and %; tappable in v1, playable race is v2
- tapping a pair card opens the single-pair screen (layout below)

**Pair screen.** Primary layout: [kalshi-ref-btc15.jpg](cherry-up-or-down/kalshi-ref-btc15.jpg) (Sneaks's mobile reference). Supporting desktop captures: [kalshi-btc.png](cherry-up-or-down/kalshi-btc.png), [kalshi-eth.png](cherry-up-or-down/kalshi-eth.png), [kalshi-sol.png](cherry-up-or-down/kalshi-sol.png), [kalshi-xrp.png](cherry-up-or-down/kalshi-xrp.png), plus the category rail [kalshi-category.png](cherry-up-or-down/kalshi-category.png). Must include:

- asset chip row (this listing's asset highlighted; other family pairs link out)
- title `XXX 15 min` (or `1 hour`) and an **orange countdown**
- **TO BEAT** (target / opening mark) next to **NOW**, with the dollar and **% difference**
- target line on the chart
- a red **LIVE** tag
- the **Past** triangle pill (prior window results)
- interval tabs **5M / 15M / 1H** — v1 live: **15M** and **1H** (Hourly); **5M** greyed **"soon"** (present on the Kalshi pair reference, same proof bar as Daily/Weekly/Monthly)
- a **Chance** row
- **Up** / **Down** buttons with implied % and the multiplier (e.g. Up · 30% and 3.08x)
- a **Live chat** button, mapped to a Cherry room via `navigate.openRoom`
- a **People are also trading** rail, mapped to the other family pairs
- an **Activity** feed
- Result (+ `cherry.share`), Armory (shared cosmetics), Streak/Daily, Room Board

### Size

L (one shared engine, 10 listings, nine assets × two live intervals).

### Room hook

`cherry.room` `{id,title,memberCount}` groups scores into a room leaderboard; `cherry.share` result blink; `navigate.openRoom` from Live chat and from rival rows. Hub bottom-right count is that room's message count, not a scraped member list.

### Repeat play

Daily free credit grant (once per `cherry_id` at 00:00 UTC); in-window tickets; 3- and 5-win streaks (see Math); room board resets 00:00 UTC.

### Policy class

Free-to-play + paid cosmetic. Play-credits only: **credits can never be cashed out, transferred, or bought back into anything of value, and (day-1) cannot be purchased.** Not a Partner prediction market. Not iGaming (no stakes of crypto or anything of value). See Research and Money implementation. If Cherry later classes this as a prediction market or as iGaming, stop and write to team@cherry.fun before publishing.

### Money

Sales; cosmetics only (see Money implementation). Day-1 prices $0.99 asset tick skin, $2.99 jeweled frame, $4.99 pack. Target $0.03 per daily user. Park line: combined 7-day Billing volume across all 10 apps under $25 after 14 days live. Receiving wallet: Sneaks to confirm.

### Ship path

private test room (engine + hub + one pair) → checks + test → Sneaks publishes all 10 listings.

## Money implementation

1. **Money model:** Sales. The user pays for one-time cosmetic unlocks (skins, frames, packs). Cosmetics give no better odds, no extra credits, and nothing cashes out. **Credits are not for sale.** Sold credits that boost winnings could look like stakes of value under the Mini App Policy; the safest day-1 choice is **cosmetics only, credits non-purchasable** (granted daily, earned in-app, never withdrawn). Day-1 prices: **$0.99** asset tick skin, **$2.99** jeweled frame, **$4.99** pack (one skin + one frame + a crest). The store is shared: a purchase in any of the 10 listings unlocks the item for that `cherry_id` everywhere.
2. **Payment flow:** verify launch token server-side first (`verifyLaunchToken` + that listing's `appId`, key by `cherry_id ?? sub`), then one-time payment only — no recurring subscriptions. Every tx carries `withAppReference(APP_ID)` for **the listing the purchase was made in** and a label ≤80 chars (example: `Up or Down cosmetic: BTC tick skin`). Never bake Cherry's 10% fee into the tx. Credit the cosmetic unlock only AFTER the tx is verified on-chain, never before.
3. **Caps check:** use the live tier from the portal that day (re-check daily; this wallet's live tier was **UNKNOWN** on 2026-11-19). $4.99 max is under Verified ($1,000/tx, $5,000/wallet/day) and under Unverified ($50/tx, $50/wallet/day), so it is safe on either tier. Reject any cart above the live cap. Receiving wallet = TBD by Sneaks; never hardcode one, never ask for a seed/private key.
4. **Play-credits only.** No real-money stakes, no credit cash-out, no credit purchase. This is free-to-play + paid cosmetic, not iGaming and not a prediction market. Pooled or brokered real-money routing to Kalshi (or any exchange) is out — see Kalshi data feed.
5. **Ledger + kill line:** log `cherry_id`, listing `appId`, tx signature, USD amount, item, and timestamp for every sale. Target revenue **$0.03 per daily user**. Breakeven: Cherry bills `volume above $100 × 10%` per app, per calendar month (Sales share is everything the user pays). There is no separate user-count breakeven because DAU is unknown; the park line is the kill switch. **Park the family** if combined 7-day Billing volume across all 10 apps is under **$25** after 14 days live; also flag any single listing with $0. Check those numbers on each app's Billing page.

### Billing math for 10 listings

Cherry's free slice and bill are **per app**, not per developer or per family. Official rule ([Monetization](https://portal.cherry.fun/docs/mini-apps/monetization)): "The first $100 of volume your app moves each calendar month is free. An app that stays under it never gets a bill. Above it, only the volume over $100 counts." Volume is attributed by the `withAppReference` key for that listing's `appId`.

So ten listings mean **ten separate $100/month free thresholds** (up to $1,000 family volume in a month with no bill, if no single listing exceeds $100). A $4.99 frame bought inside BTC Up or Down counts only on the BTC app's bill; a purchase in the hub counts only on the hub. Do not route a purchase through a different listing than the one the user is in. Do not treat the ten thresholds as a scheme to avoid fees; they are just how per-app Billing works on this architecture. If listings are later merged, the free slice shrinks to one $100.

## Math

Play-credits only. Prices and payouts are in credits. Nothing here is a dollar claim, a Kalshi order, or a cash settlement.

### Rounds

v1 live intervals: **15 minutes** and **1 hour**, on every pair. Windows:

- 15M: open/close at `:00`, `:15`, `:30`, `:45` (America/New_York clock, same :00/:15/:30/:45 cadence observed on Kalshi).
- 1H: open/close on the hour.

The pair-screen **5M** tab and the hub **DAILY / WEEKLY / MONTHLY** tabs stay **"soon"** until math and liquidity are proven. Crypto Leader (coin race) is a hub card in v1; the playable race is v2.

Strike **K** (Price to beat / TO BEAT) is the Kalshi-style **opening mark**: the simple average of 60 one-second Pyth prints in the minute before the window opens. Because one window opens as the last one closes, K equals the previous window's closing average when both 60-second samples are complete.

### Quotes and payout

YES (Up) and NO (Down) trade in **integer credits from 1 to 99**. A winning contract pays **100 credits**. Losing contracts pay 0. The button multiplier is:

```
multiplier = 100 / ask
```

e.g. an Up ask of 32 credits shows 3.13x and pays 100 if Up settles. This matches the observed Kalshi pattern that the multiplier is **1 / price-in-cents including the spread**, not 1 / the displayed Chance mid.

### Implied probability (N(d)) — default line

Let `S` be the live Pyth mid, `K` the strike, `t` the minutes remaining in the window (never less than a 1-second floor). Let `σ` be the realized volatility of the **last N = 60 minutes** of one-minute log returns `r_i = ln(P_i / P_{i-1})`, so `σ` is the sample standard deviation of those returns (same units as `sqrt(t)` when `t` is in minutes). Then:

```
d     = ln(S / K) / (σ * sqrt(t))
P(up) = Φ(d)
P(down) = Φ(-d) = 1 - P(up)
```

where `Φ` is the standard normal CDF. This is the v1 formula Sneaks asked for. A later optional refinement is the Black–Scholes `d2` term, `d = (ln(S/K) - 0.5 σ² t) / (σ sqrt(t))` with `t` converted consistently; v1 does not require it.

If `σ` is undefined (not enough prints), fall back to a mid of 50/50 and a wider spread (see below).

### House book and spread (fitted to live Kalshi multipliers)

v1 quotes a **constant-spread house book** around the `P(up)` mid, not an LMSR, so the buttons stay Kalshi-like (stable 1–99 asks, visible multiplier). LMSR is the documented alternative if inventory starts to bite.

Let `m = round(100 * P(up))` be the mid in credits, clamped so both sides can take a spread. Target **overround: yes_ask + no_ask = 103** (3 credits, about 3%), split as evenly as integer rounding allows:

```
yes_ask = clamp(1, 99, m + 2)     # 1 or 2 credits of spread, see rounding rule in tests
no_ask  = 103 - yes_ask           # clamp so both stay in 1..99; if a clamp hits, put leftover on the other side
```

Use the integer split that keeps `yes_ask + no_ask = 103` whenever both asks fit in 1..99. Multiplier on each button is `100 / ask`.

**Fit to live Kalshi category/pair multipliers** (logged-out recon, 2026-11-19 about 11:33 PM ET, plus the 30/70 point on Sneaks's mobile reference). Observed:

| Displayed Chance | Observed Up / Down multiplier | 100/ask implied asks | 3-credit overround (this spec) |
| --- | --- | --- | --- |
| ETH 27% / 72% | 3.51x / 1.35x | 28.5 / 74.1 | 29 / 74 → 3.45x / 1.35x |
| SOL 23% / 78% | 3.97x / 1.28x | 25.2 / 78.1 | 25 / 78 → 4.00x / 1.28x |
| BTC 34% / 66% | 2.89x / 1.46x | 34.6 / 68.5 | 36 / 67 → 2.78x / 1.49x |
| 30% / 70% (ref shot) | 3.08x / 1.40x | 32.5 / 71.4 | 32 / 71 → 3.13x / 1.41x |

The observed multipliers are consistent with **1/ask including the spread**, not 1/displayed mid. A 3-credit overround tracks those points closely (SOL and the 30/70 ref almost exact; ETH very close; BTC a little wide on the Up ask because of integer split). Do not call this Kalshi's official fee formula; it is a fit to the on-screen multipliers.

**LMSR alternative** (not v1 default): cost function `C(q) = b ln(e^{q_up/b} + e^{q_down/b})`. Instantaneous price `P_up = e^{q_up/b} / (e^{q_up/b} + e^{q_down/b})`. Seed `q` so mid matches `P(up)` from N(d). Quote the ask as the cost of buying one contract (or the ticket size) from the current `q`; the bid as the proceeds of selling one. `b` is the liquidity parameter (in credits). Use this later if the house inventory on one side gets large; still add at least the 3-credit overround so the credit economy does not inflate. When a new bet would raise exposure past a cap, **skew the quote toward the balancing side** or reject it (see Risk controls).

### House edge and the credit economy

The 3-credit overround is the v1 house edge (~3% of the two asks). Winners are paid 100 from the house ledger; the overround is what the house keeps in expectation, and it has to cover the daily grant and any streak credit bonus.

Let `G` be the daily grant, `R` average rounds played per granted user per day, `S` average credits staked per round, `e ≈ 0.03` the expected edge, and `B` the expected extra credits paid on streaks. The book does not inflate when:

```
R * S * e >= G + B
```

v1 knobs (starting point, tune after a week of ledger data, never estimate live users here):

- Daily grant **G = 200** credits per `cherry_id` at 00:00 UTC, no rollover above a **2,000** soft cap (grants stop until the balance is below the cap; winnings may sit above it but cannot be withdrawn).
- Ticket sizes: 10, 25, 50, 100 credits.
- Streak bonus on **credits** is capped and small: +5% payout at 3 straight wins, +10% at 5, then it resets on a loss or at the daily reset. That bonus is `B` above and must stay inside the edge. **Room / leaderboard points** take the larger streak multiplier (2× at 5 wins) so the visible streak hook does not print credits.
- Credits never expire in v1 (simpler UX); the soft cap and the overround are the brakes. If the ledger inflates, flip on 7-day expiry or cut `G` — that is a Sneaks decision after the first week of numbers, not a day-1 change.

### Settlement

**Source: Pyth.** Use the official Pyth USD spot feed for each v1 asset, with feed IDs recorded in the in-app Rules at ship time (confirm all nine exist before publish; if an asset has no official Pyth USD spot feed, do not list it until a disclosed free public substitute is approved by Sneaks).

Justification: Pyth is free and public, has one-second-capable prints, and is native to Solana (Cherry's chain). That lets us **mirror Kalshi's 60-second averaging method** without a CF Benchmarks license and without redistributing Kalshi or CF data. CoinGecko is also free and public but is not a reliable 1-second series for a 15-minute window, so it is not the v1 settler.

**Method (must be in the settlement tests, every asset):**

- Opening mark `K`: simple average of 60 one-second Pyth prices in the minute before open.
- Closing mark `C`: simple average of 60 one-second Pyth prices in the final minute before close.
- **Up** if and only if `C >= K` ("at least" the target, same rule as Kalshi). Otherwise **Down**.
- Result is posted after a **5-minute confirm** following close (Kalshi's on-screen "payout 5 minutes after close"), then credits move.
- If either 60-second window has missing prints (feed gap), or the **feed-stale circuit breaker** applies at settlement, **void and refund** the credits staked on that window. Do not invent prices.

Rules copy must say we settle on **Pyth**, not on CF Benchmarks, not on Kalshi, and not on any one exchange's chart.

### Ties

An exact `C == K` is **Up**, because the rule is "at least" the target. This matches Kalshi's 15-minute crypto rule as documented in Research. A void/refund is only for a missing or incomplete sample, not for a numeric tie.

### Daily grant, streaks, room board, share

Already specified under Repeat play and House edge. Leaderboard is computed in-app from results + `cherry.room`. `cherry.share` posts a result card (asset, window, Up/Down, mark vs close, streak), never a claim of cash or of a Kalshi payout.

## Risk controls (credits)

Carried over from the parked v2 house-book spec so the same engine can later run in SOL. Units here are **credits**, not SOL. There is no treasury wallet in v1.

### Exposure per round

For a round, after accepted (pre-lock) bets:

```
Liab_up   = Σ (stake_i × multiplier_i)   for accepted Up bets
Liab_down = Σ (stake_j × multiplier_j)   for accepted Down bets
U = Σ stake_i on Up
D = Σ stake_j on Down

Exposure_up   = Liab_up   - D
Exposure_down = Liab_down - U
Exposure      = max(Exposure_up, Exposure_down)
```

That is: **max(Up liability, Down liability) minus the opposite stakes**. `Exposure` is the most the house credit ledger can be asked to pay net of opposite stakes if the worse side wins.

Example: 10 credits on Up at 3.13x and 8 credits on Down at 1.41x → Liab_up = 31.3, Liab_down = 11.28, Exposure_up = 23.3, Exposure_down = 1.28, Exposure = 23.3 credits.

### Caps, reject, reprice

The house credit inventory `B` is virtual (not a chain wallet). Starting defaults, to tune after the first week of ledger data:

- Up to **18 windows** can be open at once (9 assets × 15M and 1H).
- Per-round cap: `E_round = 10,000` credits (implies a coverage inventory `B = 60 × E_round = 600,000` credits, same `B/60` rule as v2).
- Per-asset cap: `E_asset = 2 × E_round`.
- **Hard reject** any bet whose acceptance would make post-bet `Exposure > E_round` or the asset's combined exposure `> E_asset`.
- Before rejecting, **reprice / skew**: raise the heavy-side ask, lower the light-side ask, keep at least the 3-credit overround, and reject if no legal 1..99 ask stays inside the cap.

### Circuit breakers

Halt **new** bets when any of these is true:

- Pyth mid (or the 1-second series) is **stale by more than 5 seconds**.
- A **vol spike**: last 1-minute absolute log return `> 4σ` (σ from the 60-minute window), or the trailing 15-minute σ `> 3×` its 24-hour median.

Already-accepted bets still settle on the Pyth 60-second rule, unless the breaker is a **settlement-time** feed failure or staleness — then **void and refund** the credits. Resume only when the feed is fresh and σ is back inside the band for a full minute.

## Kalshi data feed

This section is about **reading** Kalshi market data as an optional quote source. It is **not** a plan to route user funds, orders, or KYC through Kalshi.

### What the public API allows technically

Official docs: [Quick Start: Market Data](https://docs.kalshi.com/getting_started/quick_start_market_data), [API Keys](https://docs.kalshi.com/getting_started/api_keys), [Rate Limits and Tiers](https://docs.kalshi.com/getting_started/rate_limits), [API Environments](https://docs.kalshi.com/getting_started/api_environments), [Quick Start: WebSockets](https://docs.kalshi.com/getting_started/quick_start_websockets).

- Production REST: `https://external-api.kalshi.com/trade-api/v2`.
- **Events, markets, series, and order books can be read with no authentication.** "Kalshi provides several public endpoints that don't require API keys." "No authentication headers are required for the endpoints in this guide. You can start making requests immediately!" ([Market Data](https://docs.kalshi.com/getting_started/quick_start_market_data))
- "Public endpoints such as market data need no scope." ([API Keys](https://docs.kalshi.com/getting_started/api_keys))
- Series and tickers (including `KXBTC15M` and the other eight 15-minute series in Research) are fetched with `GET /series/{series_ticker}`, `GET /markets?series_ticker=...`, `GET /events/{event_ticker}`, `GET /markets/{ticker}`, `GET /markets/{ticker}/orderbook`.
- REST market data is cached: "prices, sizes and status can lag the exchange by several seconds." "Poll REST for discovery and reference data; when you need current prices or state, use WebSockets." ([Market Data](https://docs.kalshi.com/getting_started/quick_start_market_data))
- **WebSockets require an authenticated handshake** even for public channels (`ticker`, `trade`, …): "WebSocket connections require authentication during the connection handshake." ([WebSockets](https://docs.kalshi.com/getting_started/quick_start_websockets)) That means a **Kalshi member API key**. A data-only / read-only key exists: "Accounts with data-only access are the exception: their keys are always read-only." "An API key limited to market data" can subscribe to public channels and is refused on private activity channels. ([API Keys](https://docs.kalshi.com/getting_started/api_keys), [WebSockets](https://docs.kalshi.com/getting_started/quick_start_websockets))
- Authenticated read budget is token-based and published. Most requests cost 10 tokens. Basic Read refill is 200 tokens/second (20 default-cost reads/s). "Unauthenticated public requests are subject to separate limits. Authenticate requests where supported and back off on `429`." The **numeric unauthenticated IP limit is not published** (UNKNOWN). "Public endpoints charge your IP address's budget first, even on signed requests… A signed request that the IP budget rejects falls through to your account's Read bucket." Publicly cacheable market-data responses "carry none of these headers." 429 body: `{"error": {"code": "too_many_requests", "message": "too many requests"}}` with no `Retry-After`. ([Rate Limits](https://docs.kalshi.com/getting_started/rate_limits))
- "Kalshi may update these rate limits whenever needed, without prior notice." ([Developer Agreement v1.1](https://assets.kalshi.com/Kalshi-Developer-Agreement.pdf) §2.3)

Technical access ≠ permission to show that data in our app. See terms below.

### Design option (gated): mirror Kalshi's live Up/Down % and target

Optional path, **off until Sneaks has prior written authorization from Kalshi**:

- For 15-minute windows that match a live Kalshi series (`KXBTC15M`, `KXETH15M`, …), display Kalshi's target and live Up/Down % (and derived 100/ask multipliers) as the credit-game line.
- If the feed is stale, 429s, unauthorized, or missing a window (including all **Hourly** windows we settle as open-to-close, which are not the same as every Kalshi "Hourly" crypto contract — see Research), **fall back to our own N(d) + house book**.
- Settlement of credits is **always Pyth**, never Kalshi's CF Benchmarks print. The Kalshi line would be a display/quote aid only.

**Do not ship this option without that written authorization.** Default v1 is N(d) + house book only.

### Terms: redistributing or displaying Kalshi data in a third-party app

**Developer Agreement v1.1** ([PDF](https://assets.kalshi.com/Kalshi-Developer-Agreement.pdf)), binding on "any user" of the API, effective on first use:

> Use of Kalshi APIs is expressly limited to facilitating a members own trading on the Exchange; all other usages are disallowed and may result in account suspension.

> 3.1. Collecting, caching, aggregating, or storing data or content accessed via the API except for purposes of facilitating your own trading on Kalshi. You may not share such data or content with third parties in any manner without prior written authorization from Kalshi.

> 3.2. Facilitating trading or account creation by other members, or inducing users to enter their Kalshi password into another site.

> 3.7. Sublicensing the API for use by a third party.

> 4.1.1. You must be a Member of Kalshi's Exchange and comply with Kalshi's Rulebook.

**Kalshi Data Terms of Use** ([PDF](https://kalshi-public-docs.s3.amazonaws.com/kalshi-data-terms-of-service.pdf)):

> You are only permitted to access and use the Kalshi Data in the form in which it is presented on the Website. … You may access content only for your personal use for non-commercial purposes. Non-commercial use does not include the use of Kalshi Data without prior written consent from Kalshi in connection with: (1) the development of any software program … or (2) providing archived or cached data sets containing Kalshi Data to another person or entity.

> unless Kalshi … give you prior written authorization, you are strictly prohibited from selling, licensing, renting, modifying, changing, manipulating, altering, printing, collecting, copying, reproducing, downloading (other than to view only where a link is provided), uploading, transmitting, disclosing, distributing, disseminating, publicly displaying, publishing, editing, adapting, creating derivative works, electronically extracting or scrubbing, scraping, compiling … or otherwise transfer any of the content to any third person

> You agree not to, and have no rights to, use the Kalshi Data to create, calculate, issue, settle, maintain, support or develop any financial instruments … indexes, products, services … or any other derivative works without the express written consent of Kalshi.

A market-data endpoint that answers without a key does not waive these terms. Showing Kalshi's % or target inside a Cherry mini app is a **public display** and a **derivative product** unless Kalshi has given prior written authorization. Website scraping is separately prohibited.

### Out: no pooled or brokered real-money routing

**Do not design or build any path that places Kalshi orders for users, pools user funds, or brokers Kalshi trades.** Reasons, which stay in force even if a data license is later granted:

- Kalshi's API is "expressly limited to facilitating a members own trading." Facilitating trading or account creation by other members is prohibited (§3.2). Each trader must be a **Member** and hold their **own** API/account (§4.1.1). Membership and trading are identity-checked (KYC) on Kalshi's side; we will not collect Kalshi passwords or keys (also §3.2, and Cherry policy forbids asking for keys).
- On Cherry, **prediction markets** ("Markets or contracts on the outcome of real-world events") are **Partner-only** ([Mini App Policy](https://portal.cherry.fun/docs/mini-apps/policy) v2026-11-10). A real-money Up/Down book, or a front end that routes money to Kalshi, is in that class. This family is play-credits + cosmetics, not a Partner prediction market.

## Research (2026-11-19, America/New_York)

Research only; no app code. Live Kalshi pages were viewed **logged out** at about **11:33 PM ET**. In-app Cherry recon the same day is in [recon-2026-11-19.md](cherry-gap-bot/recon-2026-11-19.md). Official Cherry policy URLs are `/docs/mini-apps/policy` and `/docs/mini-apps/monetization` (`/docs/policy` and `/docs/monetization` are not the docs; those short paths 404 as `.md`).

### 1. Kalshi crypto up/down

Official: [Crypto Markets help](https://help.kalshi.com/en/articles/13823838-crypto-markets) (updated Oct 9, 2026), [Market Settlement](https://docs.kalshi.com/getting_started/market_settlement), [15-minute Pro help](https://kalshi.com/pro/help/fifteen-minute-markets) (updated 2026-09-28), [15 min Crypto category](https://kalshi.com/category/crypto/frequency/fifteen_min), [Hourly](https://kalshi.com/category/crypto/frequency/hourly), [Daily](https://kalshi.com/category/crypto/frequency/daily), [Fee schedule](https://kalshi.com/fee-schedule).

- Kalshi lists crypto frequencies **15 min, Hourly, Daily, Weekly, Monthly**. The 15-minute crypto **up/down** product is the open-to-close series (target = opening 60-second average). The Hourly and Daily category pages, as of this recon, showed **clock-time "price at … EST" above/below and range** markets more than open-to-close up/down. Our **1H** game is open-to-close, like the 15-minute series, not a copy of every contract on Kalshi's Hourly tab.
- **15-min up/down pairs in scope for v1 (all 9):** BTC, ETH, SOL, XRP, DOGE, BNB, HYPE, NEAR, ZEC. Series tickers: `KXBTC15M`, `KXETH15M`, `KXSOL15M`, `KXXRP15M`, `KXDOGE15M`, `KXBNB15M`, `KXHYPE15M`, `KXNEAR15M`, `KXZEC15M`. Event format example: `KXBTC15M-26NOV192345`. Windows `:00/:15/:30/:45`. Payout 5 minutes after close.
- **Crypto Leader 15 min** (coin race) exists on the category page; it is a **v2** playable mode and a v1 hub card.
- Settlement (help center, verbatim meaning): most crypto price markets settle on a **CF Benchmarks** index. "A 15-minute market compares the average from the minute before it closes with the average from the minute before it opened." "For most crypto price markets, the expiration value is based on a simple average of the CF Benchmarks index over the 60 seconds before the time named in the market's rules." Example named index: CF Bitcoin Real-Time Index (BRTI). **At least** the target resolves Up. We copy the **averaging rule and the tie rule**, not the CF Benchmarks source.
- Yes/No pricing: binary event contracts; winning side pays **$1.00**, losing side $0 ([Market Settlement](https://docs.kalshi.com/getting_started/market_settlement)). On-screen Chance is a mid/%; the button multiplier fits **1/ask including spread** (see Math). Official standard taker fees apply to "Most markets" ([Fee schedule](https://kalshi.com/fee-schedule)); this app does not pay or charge Kalshi fees.
- UI loop (Pro help + live mobile/desktop): a series page that rolls to the next window, target vs live price, orange countdown, LIVE tag, Past pill, Chance, Up/Down, activity, "people are also trading." That loop is the layout bar for our pair screen and hub.

### 2. Other up/down games (for hooks, not for money)

- **Polymarket** 15m BTC/ETH/SOL/XRP Up or Down, real money, $1 winning shares, Chainlink BTC/USD TWAP among the published sources: [polymarket.com/crypto/15M](https://polymarket.com/crypto/15M). Already wrapped on Cherry as the Polymarket mini app, not a short-loop game we own.
- **Jupiter Forecast**: Solana 15-minute BTC up/down, USDC, Chainlink, real money: [docs](https://developers.jup.ag/docs/prediction/forecast).
- **TakePair**: P2P 15/30/60m BTC/ETH UP/DOWN, USDC/USDT, Binance 1m close, ~1.96× after a 4% win fee, web + Telegram: [about](https://takepair.com/en/about).
- **Predikt** Telegram: 60s UP/DOWN on BTC/ETH/SOL, Solana via Hxro, real-money positioning, hourly jackpots / parlays: [t.me/predikt_app_bot](https://t.me/predikt_app_bot).
- **OKX Event Contracts**: real-money Up/Down on BTC/ETH, 15m to daily, USDT, OKX index, 0.01–0.99 prices: [learn](https://www.okx.com/en-us/learn/okx-event-contracts).
- **OKX Racer** (Telegram, points): 5-second Moon/Doom, points not cash, streaks and a leaderboard, fuel upgrades, referrals — [Decrypt, Jul 22, 2024](https://decrypt.co/240917/okx-bitcoin-price-guessing-game-telegram). Closest **free** hook pattern (streaks, board, no cash-out).
- **Byte Quest Fast Predict**: 60s BTC up/down, **free points only**, 1.9×, refund on unchanged, daily points pool: [BEXC help](https://bexc.io/help/gs-fast-predict).

### 3. Cherry.fun — no dedicated up/down app

Web, marketplace, and X search did not find a BTC/ETH/SOL (or other) up-or-down mini app on cherry.fun / chat.cherry.fun / @cherrydotfun.

In-app marketplace recon the same day (signed in as Silver Birch): **"No BTC/ETH/SOL higher-or-lower app listed. Closest: Crypto Trading Simulator (16 members, 'Bitcoin, ETH demo trading app', virtual $10000, https://chat.cherry.fun/g/KPFYik6XJbGI5BcCSlBC); MemeRace (1 member, pick a meme coin, new race every 30s, 'win SOL', https://chat.cherry.fun/g/vSTmIOPqvJ8LaIAaW9D5)."** Source: [recon-2026-11-19.md](cherry-gap-bot/recon-2026-11-19.md).

What does exist: the **Polymarket** mini app at [chat.cherry.fun/@predict](https://chat.cherry.fun/@predict) / [predict.cherry.fun](https://predict.cherry.fun/) — real-money YES/NO on Polymarket events, including longer BTC price markets, not a first-party short-loop Up/Down game and not a slot we own.

X: a relevancy search for Cherry + prediction/BTC terms did not surface a Cherry up/down mini app; a tighter `"up or down"` / 15m / Kalshi query against cherry.fun / cherrydotfun returned **0 posts**.

### 4. Cherry policy (exact class)

[Mini App Policy](https://portal.cherry.fun/docs/mini-apps/policy) v2026-11-10:

> These activities are open only to Partner apps, under a written agreement with Cherry, with the operator holding every licence the activity needs in every country it serves:
>
> - Prediction markets. Markets or contracts on the outcome of real-world events.

> Free-to-play games of skill, where nothing paid in can be won back or cashed out, are not iGaming and are not restricted.

> Gambling and games of chance with stakes are allowed only in the iGaming category: casino games, coin flips, dice, crash, slots and pachinko-style games played for crypto or anything of value; sports and event betting; … loot boxes or gacha with prizes that can be traded or cashed out.

The official policy **does not use the phrase "play credits."** Closest language is the free-to-play skill carve-out and the iGaming test ("crypto or anything of value," "prizes that can be traded or cashed out").

[Monetization](https://portal.cherry.fun/docs/mini-apps/monetization):

> What your app may sell at all is set by the Mini App Policy: gambling goes in the iGaming category under its rules, and prediction markets, token launches and regulated financial services are open only to licensed Partner apps.

> Whatever users pay for in your app, an NFT, a game item, a marketplace purchase or a swap, the rule is the same.

**Class for this family:**

- **Real-money** Up/Down (cashable credits, purchased credits that can win more value, or routed Kalshi/Polymarket orders) = **Partner-only prediction market**. Not this project.
- **iGaming** would apply if we took stakes of crypto or anything of value. We do not.
- **Day-1 allowed path we are taking:** free play-credits that **cannot be bought, cashed out, or converted**, plus **paid cosmetics** that do not affect odds and cannot be redeemed for credits or cash. This is the closest fit to "nothing paid in can be won back or cashed out." A short-window price call is not obviously a "game of skill"; if Cherry disagrees, stop and ask team@cherry.fun before publish.
- **Paid cosmetics:** allowed under Sales if the core stays in the carve-out. **Do not sell credits.**

### Verdict

**BUILD.** Cherry has no first-party Up/Down app. The closest listed games are Crypto Trading Simulator (16 members) and MemeRace (1 member). Kalshi's 15-minute nine-pair loop is the layout and rules model; our money stays play-credits + cosmetics; we ship a hub plus nine pair listings on one engine so the family holds both slots.

## v2 migration

v1 is play-credits only. When Sneaks is ready to move to SOL, un-park **[v2-sol-partner.md](cherry-up-or-down/v2-sol-partner.md)**. That file is the Partner / SOL house-book spec, unchanged, and it **starts only after** he confirms Partner on the portal and supplies the treasury wallet, limits, geo stance, and bankroll.

What should already be in the v1 engine so the swap is narrow:

- the **abstract stake interface** (`StakeCurrency` or equivalent): swap the Credits adapter for the SOL adapter (on-chain confirm, treasury debit/payout, no credit grant)
- the **exposure-cap** and **feed-stale circuit breaker** (same formulas; units become SOL; `B` becomes the real treasury bankroll)

What changes only at un-park (do not build these in v1):

- policy class becomes a Partner prediction market; 18+ / geo / self-exclusion / published odds as in the parked file
- money model becomes Commission on net house revenue, plus optional cosmetic Sales
- stakes go to a Sneaks-confirmed treasury; payouts after the 5-minute confirm; Cherry volume excludes payouts

No SOL deposits, escrow, or treasury funding in v1. No deploy of a SOL money path without Sneaks's yes.

## Art bar

CONSOLE-GRADE (Sneaks 2026-11-19): near-PS4/PS5 — cinematic 3D, volumetric light, depth, asset-colored metal and glass, live tickers that feel like a console market terminal, not flat CSS. Layout fidelity: hub follows hub-ref-1/2/3; pair screen follows kalshi-ref-btc15.jpg as the **primary** layout. Family branding must be consistent across all 10 icons and covers so the 10 listings read as one product line.

## Tasks

### BUILD — Muse (fill-out, as of 2026-11-20)

Fabok delivered the local shared engine, Coins hub, and BTC template (now at [app/](cherry-up-or-down/app/)). Sneaks asked Muse to fill out the rest. Shared engine first, then the hub, then the nine single-pair apps from one template.

Acceptance:

- plays at 360px; first frame + `cherry:ready` < 5s (lazy-load heavy art after ready)
- launch token verified server-side (`verifyLaunchToken` + **that listing's** `appId`, key by `cherry_id ?? sub`)
- ten origins, each with `/.well-known/cherry-app.json` and its own `appId`
- credits and cosmetics shared per `cherry_id` across all 10 apps; daily grant once per `cherry_id`
- every sale tx has `withAppReference(APP_ID)` of the listing it was made in + ≤80-char label; unlock only after on-chain confirmation; sale ledger row written; no recurring subs; cosmetics only (no credit purchases, no cash-out, no odds advantage)
- money path stays inside the **live** tier limits (re-checked that day; $4.99 is under both Unverified and Verified caps)
- settlement tests **per asset**: 60 one-second Pyth prints → simple average; Up iff `C >= K`; missing prints → refund; confirm delay 5 minutes; tests for BTC, ETH, SOL, ZEC, XRP, NEAR, HYPE, DOGE, BNB
- pricing tests: N(d) mid, 3-credit overround, multiplier `100/ask`, 1–99 clamps; fallback mid 50/50 on undefined σ
- **abstract stake interface**: engine code does not hard-code credits except inside the Credits adapter; no SOL adapter in v1
- **exposure cap** enforced in credits (reject or reprice; never accept a bet that breaches `E_round` or `E_asset`)
- **feed-stale circuit breaker** (>5s stale, or vol spike as specified) blocks new bets; settlement-time failure voids and refunds credits
- payout / refund **idempotency** on the credits ledger
- hub UI matches the Coins reference (tabs, cards, Price to beat / Current, sparkline, pills, pie timer, volume + room-message count, Crypto Leader card); pair UI matches kalshi-ref-btc15.jpg (TO BEAT / NOW, orange countdown, red LIVE, Past pill, Chance, Live chat → `navigate.openRoom`, People are also trading, Activity)
- 15 MIN and HOURLY live; 5M / Daily / Weekly / Monthly greyed "soon"
- room leaderboard from `cherry.room`; `cherry.share` result blink
- test URL ready for a private test room (engine + hub + at least one pair). Renders the console-grade look on a 360px phone at 60fps (WebGL / PixiJS or Three.js, pre-rendered 3D, particle FX)

Acceptance tests must also reject a tx without a valid launch token.

Deploy/live checks: muse.

### ART — grok-bot

10 icons (512×512) and 10 covers (1200×630) in console-grade style, **consistent family branding**, plus a 9:16 splash for the hub and a pair-screen chrome kit (asset metals, Up/Down buttons, pie timer, sparkline, LIVE/Past pills). Reference: hub-ref-1/2/3 and kalshi-ref-btc15.jpg. No "Cherry" lettering. No flat CSS as the finished look.

### SHIP GATE — Sneaks

Sneaks walks the portal wizard **10 times** (or the then-supported multi-app flow): category Games, money model Sales, agreements signed with his wallet, live URL per listing, checks + iframe test, publish. Save wizard prompts to `docs/CHERRY_INTEGRATION.md` in the app repo. Do not publish if live tier / Policy class is in doubt — ask team@cherry.fun first.
