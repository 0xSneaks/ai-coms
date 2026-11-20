# Up or Down

**Status:** OPEN · **Owner:** Cherry Gap Bot (spec) · **Repo:** none yet · **Live URL:** none · **Last updated:** 2026-11-19 23:53 ET by fabok

**Stage:** BUILD · **Owner:** fabok (local scaffold) · **Next:** remaining 8 pair listings from the template, then ART (grok-bot) and the 10-listing ship gate (Sneaks) · **Gate:** Sneaks publish; money path for real-money stakes ON HOLD

## Now

Spec updated 2026-11-19 (America/New_York). Sneaks says he **is a Cherry Partner**. The **live tier is still to be confirmed** on the owning wallet's portal; the **Partner agreement sets the limits** (not yet shared). This is a **family of 10 listings**: one hub plus nine single-pair apps, on one shared engine.

**Users stake SOL. There are no play-credits.** Policy class is a **Partner prediction market**. No deploy, no publish, and no treasury funding without Sneaks's yes.

Fabok local scaffold signed off 2026-11-19 23:53 ET: engine + Coins hub + BTC template at `/workspace/cherry/up-or-down` (no app repo, no deploy). Shots: [hub](../handoffs/assets/2026-11-19-cherry-up-or-down/screenshot-hub-360.png), [BTC](../handoffs/assets/2026-11-19-cherry-up-or-down/screenshot-btc-360.png). The running scaffold keeps stake currency behind a `StakeCurrency` adapter with **play-credits as the only implementation**; no SOL deposit, escrow, payout, or stake flow was built. Money path stays on hold pending Sneaks. ART and the 10-listing ship gate remain open.

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

**Shared engine:** N(d) pricing, 3% overround house book, exposure caps, Pyth 60-second settlement, treasury bet/payout flow, optional cosmetics store, room leaderboards, sale and bet ledger. Treasury **signing keys never go in client code or the repo**. Payouts need a signer Sneaks controls. No app UI code in this repo; this file is the spec only.

**Ten listings:** each front end is its own Cherry mini app with its **own `appId`** and its own `/.well-known/cherry-app.json` on its own origin. Subdomains are fine. Each listing verifies launch tokens for **its** `appId`.

**Shared account:** optional cosmetic unlocks are keyed by `cherry_id` (fallback `sub`) and are **shared across all 10 apps**. Bets, limits, and self-exclusion are also per `cherry_id` (and per payment wallet) across the family.

**Build order:** shared engine first, then the hub, then the nine single-pair apps from one template. Tapping a hub card opens the matching single-pair screen — in the hub webview for a first paint, and via `navigate` / deep link into the pair listing when that app is installed.

## Spec

### Loop (10s)

open the hub in a room → pick a pair card (or open a pair listing directly) → see Price to beat vs Current, Chance, and the countdown → stake SOL on Up or Down (one tx, after on-chain confirmation, before the 30s lock) → watch the window → after the 5-minute confirm, treasury pays or the stake is refunded → `cherry.share`.

### Screens

**Hub ("Coins" list).** Primary references: [hub-ref-1.png](cherry-up-or-down/hub-ref-1.png), [hub-ref-2.png](cherry-up-or-down/hub-ref-2.png), [hub-ref-3.png](cherry-up-or-down/hub-ref-3.png). Must include:

- back arrow and a **Coins** title
- tabs **15 MIN / HOURLY / DAILY / WEEKLY / MONTHLY** — v1 ships **15 MIN** and **HOURLY**; DAILY, WEEKLY, and MONTHLY stay greyed **"soon"** until math and liquidity are proven
- one card per pair: asset icon, title `XXX 15 MIN` (or `XXX 1 HOUR` on the Hourly tab), a countdown in the asset color, and a pie timer
- **Price to beat** next to **Current**, with a red/green arrow delta
- a sparkline in the asset color
- **Up %** in a green pill and **Down %** in a red pill
- bottom-left **SOL volume** for the window, bottom-right room-message count
- a **Crypto Leader — 15 minutes** race card showing the top 2 coins with multipliers and %; tappable in v1, playable race is v2
- tapping a pair card opens the single-pair screen (layout below)

**Pair screen.** Primary layout: [kalshi-ref-btc15.jpg](cherry-up-or-down/kalshi-ref-btc15.jpg) (Sneaks's mobile reference). Supporting desktop captures: [kalshi-btc.png](cherry-up-or-down/kalshi-btc.png), [kalshi-eth.png](cherry-up-or-down/kalshi-eth.png), [kalshi-sol.png](cherry-up-or-down/kalshi-sol.png), [kalshi-xrp.png](cherry-up-or-down/kalshi-xrp.png), plus the category rail [kalshi-category.png](cherry-up-or-down/kalshi-category.png). Must include:

- asset chip row (this listing's asset highlighted; other family pairs link out)
- title `XXX 15 min` (or `1 hour`) and an **orange countdown**
- **TO BEAT** (target / opening mark) next to **NOW**, with the dollar and **% difference**
- target line on the chart
- a red **LIVE** tag
- the **Past** triangle pill (prior window results)
- interval tabs **5M / 15M / 1H** — v1 live: **15M** and **1H**; **5M** greyed **"soon"**
- a **Chance** row and published house edge / odds (see Policy)
- **Up** / **Down** buttons with implied % and the multiplier (e.g. Up · 30% and 3.08x)
- stake entry in SOL (day-1 min 0.01 SOL, max per caps below)
- a **Live chat** button, mapped to a Cherry room via `navigate.openRoom`
- a **People are also trading** rail, mapped to the other family pairs
- an **Activity** feed
- Result (+ `cherry.share`), Armory (optional cosmetics), Room Board, Limits / self-exclusion, Support

First-run and every session: **18+ age gate**, geo/eligibility check, and a clear "no guaranteed or expected return" line before any stake sheet.

### Size

L (one shared engine, 10 listings, nine assets × two live intervals, real-money treasury).

### Room hook

`cherry.room` `{id,title,memberCount}` groups scores into a room leaderboard; `cherry.share` result blink (never a claim of a guaranteed return or of a Kalshi payout); `navigate.openRoom` from Live chat and from rival rows. Hub bottom-right count is that room's message count, not a scraped member list.

### Repeat play

In-window SOL tickets until the 30-second lock; room board resets 00:00 UTC. Streaks are **leaderboard / cosmetic hooks only** — they do not increase SOL payouts (that would raise house exposure). No daily credit grant.

### Policy class

**Prediction market (Partner-only), under Sneaks's Partner agreement.** Users stake SOL on the outcome of a real-world event (whether the Pyth USD price of an asset finishes at or above the opening mark). This is not a free-to-play credit game and is not listed as iGaming, but several iGaming fair-play and safety rules are applied as a conservative real-money bar (quoted below). If the Partner agreement or Cherry classes this differently, stop and follow the agreement / team@cherry.fun before publishing.

See **Policy constraints (quoted)** below.

### Money

**Commission** on the house book: Cherry bills **10% of the house share we keep** (net house revenue after payouts and refunds). Optional **Sales** cosmetics on top (see Money implementation). Stakes go to a treasury wallet Sneaks confirms, never hardcoded. Day-1 min stake **0.01 SOL**. Max stake in USD is the live Partner limit, **UNKNOWN** until Sneaks shares the agreement; **default to the Verified caps of $1,000/tx and $5,000/wallet/day** until confirmed. Park line and target revenue: see Risk math.

### Ship path

private test room (engine + hub + one pair, **devnet or a Sneaks-approved test treasury only**) → checks + test → Sneaks's **separate yeses** for treasury funding, then publish of the 10 listings. **No deploy, publish, or treasury funding without Sneaks's yes.**

## Policy constraints (quoted)

Canonical docs (the short paths `/docs/policy` and `/docs/wallet` 404; these are the published pages): [Mini App Policy](https://portal.cherry.fun/docs/mini-apps/policy) v2026-11-10 and [Wallet and limits](https://portal.cherry.fun/docs/mini-apps/wallet). Monetization: [Monetization](https://portal.cherry.fun/docs/mini-apps/monetization). This page explains rules, it is not legal advice.

### Partner-only prediction markets

Policy, Tiers: Partner is obtained by "A written agreement with Cherry." Partner limits are **"By agreement"** (not the Verified $1,000 / $5,000 figures). Restricted categories:

> These activities are open only to Partner apps, under a written agreement with Cherry, with the operator holding every licence the activity needs in every country it serves:
>
> - **Prediction markets.** Markets or contracts on the outcome of real-world events.

> **Your licences, your law.** You decide whether your games are lawful wherever they can be played, and hold every licence they need. Cherry does not check that you do.

(The "licences, your law" sentence sits in the iGaming list; the Partner-restricted paragraph also requires "the operator holding every licence the activity needs in every country it serves.")

> This page explains rules, it is not legal advice. You decide which laws apply to your app and hold the licences they require. Cherry does not check that you do.

Sneaks is the operator. Cherry does not hold or pay out stakes. From iGaming (operator rule, applied because we run a house book):

> **You are the operator.** You run the games, set their rules, odds and return to player, control the contracts and wallets that receive stakes, pay out winnings and deal with players. Cherry is not the operator, organiser, promoter, host or licensee of any game, never accepts, holds or pays out stakes or winnings, and is not a party to any wager.

### 18+ age gate

> Mini apps are for adults: users must be at least the age of legal majority where they live (typically 18). Your app is not directed at children and does not knowingly collect their data. Rate your app 18+ when it can ask users to sign a transaction that moves value, shows real-money prices or prizes, or has mature content.

iGaming also: "**Adults only.** The app is rated 18+ and admits only people old enough to gamble lawfully where they are."

**Build:** 18+ rating, a blocking age gate before any stake sheet, refuse minors.

### Published odds and the house edge

iGaming fair-play: "**Fair play.** Publish the odds or the return to player, and offer players limits and self-exclusion."

v1 publishes, on the pair screen and in Rules: the live Up/Down ask, the multiplier (`100/ask`), and the **3% overround** (house edge in a balanced book ≈ 2.91% of stakes; see Risk math). Odds must not be misstated.

> No promotion that misstates odds, prices or returns, and no unsolicited messages to users through bots tied to your app.

### Per-user limits and self-exclusion

Fair-play requires offering **limits and self-exclusion**. Wallet limits (trust tier) are a separate, platform-enforced cap:

> Limits count the value that **leaves the user's wallet** in a transaction, in USD, measured by simulating it. Swaps count their input, payments count the amount paid.

| | Unverified | Verified | Partner |
| --- | --- | --- | --- |
| Per transaction | $50 | $1,000 | By agreement |
| Per wallet, per app, per day | $50 | $5,000 | By agreement |

> The daily limit resets at 00:00 UTC.

Until the Partner agreement is on hand, **treat max stake as the Verified caps: $1,000/tx and $5,000/wallet/day**, converted to SOL at the live USD price at bet time, and also enforce them in-app (do not rely only on Cherry's `TX_LIMIT` / `DAILY_LIMIT`). Offer stricter **user-set limits** and a **self-exclusion** control (pause this `cherry_id` for a chosen period or indefinitely). Family-wide: daily cap is per wallet per app on Cherry's side, but our in-app cap should also cover the family so a user cannot 10× the risk by hopping listings — default **one family-wide daily USD cap** equal to the Partner (or default Verified) daily cap. Confirm with Sneaks.

`POLICY_DENIED` + `TX_LIMIT` / `DAILY_LIMIT` must show the Wallet doc messages ("Offer a smaller amount" / "Daily limit reached, try again tomorrow").

### Country blocks; US is a legal question for Sneaks

Every app:

> Cherry blocks every app in Cuba, Iran, North Korea and Sudan, and every iGaming app in the countries listed above. Your app also may not serve Crimea, Sevastopol or the other Russian-occupied regions of Ukraine, including the occupied parts of the Donetsk, Luhansk, Kherson and Zaporizhzhia regions, any other country or region under comprehensive sanctions or embargo administered by the United States, the United Nations Security Council, the European Union or the United Kingdom, any country where self-custodial wallets or digital assets are prohibited, or anyone who is the target of sanctions or on a restricted-party list. Declare the other countries you do not serve in your listing, and block them inside your app as well.

The iGaming-only automatic list (Australia, Belgium, China, France, Germany, Italy, the Netherlands, Singapore, Spain, Sweden, Turkey, the United Arab Emirates, the United Kingdom and the **United States**) is written for **"every iGaming app."** This product is classed as a **prediction market**, not iGaming, so that list is **not automatically quoted as applying**. Real-money prediction markets are still restricted or licensed in many countries and in **US states**. **The United States (and state-by-state treatment) is a legal question for Sneaks.** Do not serve the US, or any other country where this activity is unlicensed or unlawful, until he confirms the Partner agreement and the licence map. Block CU, IR, KP, SD and the sanctioned regions above on day 1. Declare every additional block in the listing and enforce it in-app.

### Not on iOS — only if this class is treated as iGaming

> **Not on iOS.** iGaming apps are not offered in Cherry's iOS app.

The policy says this **for iGaming**, not in the prediction-market paragraph. **UNKNOWN** whether Cherry also hides Partner prediction markets on iOS. Ask Sneaks / team@cherry.fun before relying on iOS distribution. If Cherry treats this listing as iGaming, iOS is unavailable and the iGaming country list applies in full.

### Support channel and 72h report SLA

> Give users a working support channel in your app and act on reports within 72 hours. Refunds and disputes are between you and your users.

**Build:** in-app support entry on every listing, 72-hour SLA on reports, operator = Sneaks.

### No guaranteed or expected returns

> No app, of any tier, states or implies a guaranteed or expected return.

Show this on the gate, the stake sheet, and the Rules. `cherry.share` cards must not imply a guaranteed return.

### Wallet and transaction rules (real-money play)

> Users hold their own keys. Your app never receives a user's private key, recovery phrase or wallet password, and never asks for them or for a one-time code.

> Your app reaches users' wallets only through the Cherry SDK. It shows no wallet-connect button of its own, and never asks users to connect, import or create another wallet or to sign anything outside Cherry.

> Before a user signs, the app says what the transaction does and how much it moves, and its label matches the transaction.

> The user approves or declines every request. Neither your app nor Cherry can sign for them.

> Name the action and the thing … in at most 80 characters of plain text. Never state an amount different from what the transaction moves.

> Cherry is not a party to your app's transactions and does not hold, settle or guarantee them.

> Some users pay from a different wallet than the one they signed in with. The SDK exposes it as `paymentWallet` … Build transactions for it when it is set.

Partner-tier rows for token approvals, recurring subscriptions, authority changes, and durable-nonce transactions are **"By agreement"** — do not use them unless the agreement says so. v1 bets are **one-time** payments, no recurring subs, no durable nonce.

## Money implementation

1. **Money model:** **Commission** on the SOL house book. Cherry bills **10% of the house share we keep** — i.e. 10% of **net house revenue** (stakes received minus payouts and refunds) in the month, not 10% of gross stakes. Optional **Sales** cosmetics ($0.99 asset tick skin, $2.99 jeweled frame, $4.99 pack) with no odds or payout advantage and nothing cashed out as a credit. The listing wizard offers a single model; a mix is **Other** ("Commission on house net from SOL stakes, plus Sales of cosmetics"). Use **Other** in the wizard if it will not accept both, and describe both streams. If the bill assumes a fixed share of volume, **correct it to actual net house revenue** (official: "If your revenue does not follow volume, or the bill is off for another reason, enter on the Billing page the amount you believe is right"). Volume is stakes that leave users' wallets. Official: "Money flowing back to your users is not volume." **Treasury payouts and refunds are excluded from Cherry volume.**
2. **Stake flow (one-time tx per bet):**
   - Verify launch token server-side first (`verifyLaunchToken` + that listing's `appId`, key by `cherry_id ?? sub`). Build the tx for `paymentWallet` when set.
   - User stakes **SOL** to the **house treasury wallet Sneaks confirms** (never hardcoded). One tx per bet. Every stake tx carries `withAppReference(APP_ID)` of the listing it was made in and a label ≤80 chars (example: `Up or Down: bet 0.01 SOL on BTC 15m Up`).
   - The house book quotes with a **3% overround**, `yes_ask + no_ask = 103` (asks in 1–99), **multiplier = 100/ask**. A winning stake of `S` is paid `S × (100/ask)` SOL from the treasury (stake return included). Losing stakes stay in the treasury.
   - **Credit (accept) a bet only AFTER the stake tx is verified on-chain, and only if that confirmation is before the round lock.** Lock window: **30 seconds before close**. A confirmation that lands after lock is **not** a bet — **refund** the stake. Reject any new sign request after lock.
   - Settlement is the **60-second Pyth average**; **Up wins when close ≥ target**. Payouts are sent from the treasury **after the 5-minute confirm**. Void or missing prints **refund the stake**. Payouts and refunds are idempotent (one payout/refund tx per accepted bet).
   - Day-1 min **0.01 SOL**. Max in USD terms within Partner limits (**UNKNOWN** until the agreement is shared; **default $1,000/tx and $5,000/wallet/day**). Convert at the live USD price; reject above the cap. Never bake Cherry's 10% into the stake or payout tx.
3. **Caps check:** use the live Partner limits once they are confirmed on the portal / agreement; until then use the Verified defaults above. Re-check the live tier **daily**. Reject any stake above the live cap. Receiving / treasury wallet = TBD by Sneaks; never hardcode; never ask for a seed or private key. Treasury keys are not in the client or the repo; payouts use a signer Sneaks controls.
4. **Real-money prediction market**, not play-credits. No credit grant, no credit purchase, no credit cash-out. Cosmetics are optional extra Sales only. Pooled or brokered routing of user funds to Kalshi (or any third-party exchange) is still out (see Kalshi data feed).
5. **Ledger + kill line:** for every bet log `cherry_id`, bet tx signature, payout tx signature (or refund sig, or empty until settled), round id, side, stake, price (ask), multiplier, result, and timestamp. Also log listing `appId` and payment wallet. For every cosmetic sale log `cherry_id`, tx signature, USD amount, item, and timestamp. Target revenue, breakeven, and the 7-day park line are in Risk math. Check Billing pages for stake volume; payouts should not appear as volume.

### Billing math for 10 listings

Cherry's free slice and bill are **per app**. Official: "The first $100 of volume your app moves each calendar month is free." Volume is "the value that leaves your users' wallets in transactions they approve in Cherry" and "Money flowing back to your users is not volume." Ten listings mean ten `$100` free slices on **stake** volume, attributed by each listing's `withAppReference`. Do not route a stake through a different listing than the one the user is in. The bill is 10% of **house share (net)**, not 10% of stakes. Correct any volume×share estimate that ignores payouts.

## Math

### Rounds

v1 live intervals: **15 minutes** and **1 hour**, on every pair.

- 15M: open/close at `:00`, `:15`, `:30`, `:45` (America/New_York cadence observed on Kalshi).
- 1H: open/close on the hour.
- **Lock:** no new bets accepted from **30 seconds before close**. Confirmation must be on-chain **before** that lock.

5M, Daily, Weekly, Monthly stay **"soon."** Crypto Leader is a hub card in v1; the playable race is v2.

Strike **K** (Price to beat / TO BEAT) is the simple average of 60 one-second Pyth prints in the minute before the window opens. When both samples are complete, K equals the previous window's closing average.

### Quotes and payout

YES (Up) and NO (Down) asks are integers **1 to 99**. A winning stake `S` is paid `S × (100 / ask)` SOL from the treasury. The button multiplier is:

```
multiplier = 100 / ask
```

### Implied probability (N(d)) — default mid

Let `S` be the live Pyth mid, `K` the strike, `t` the minutes remaining (never less than a 1-second floor). Let `σ` be the realized volatility of the **last N = 60 minutes** of one-minute log returns `r_i = ln(P_i / P_{i-1})`. Then:

```
d     = ln(S / K) / (σ * sqrt(t))
P(up) = Φ(d)
P(down) = Φ(-d) = 1 - P(up)
```

If `σ` is undefined, fall back to a mid of 50/50 and apply the exposure/spread rules. Optional later refinement: Black–Scholes `d2`; not required in v1.

**Do not use a Kalshi price feed as the live line unless Sneaks has prior written authorization from Kalshi** (see Kalshi data feed). Default v1 mid is N(d).

### House book (3% overround)

Let `m = round(100 * P(up))`. Target **overround: yes_ask + no_ask = 103**, both clamped to 1..99:

```
yes_ask + no_ask = 103
multiplier_up   = 100 / yes_ask
multiplier_down = 100 / no_ask
```

This is the same 3-credit (3%) overround fitted to the 2026-11-19 Kalshi on-screen multipliers (e.g. 30%/70% showed 3.08x/1.40x; 32/71 → 3.13x/1.41x). Quotes then **skew toward the balancing side** when a new bet would raise exposure (see Risk math): raise the ask on the heavy side, lower it on the light side, keeping at least the 3% overround, and **reject** the bet if even the skewed quote would breach a cap.

LMSR remains a documented alternative, not the v1 default.

### Settlement

**Source: Pyth** official USD spot feed per asset, feed IDs in the in-app Rules at ship time. Confirm all nine feeds exist before publish; if an asset has no official Pyth USD spot feed, do not list it until Sneaks approves a disclosed substitute.

Justification: Pyth is free and public, one-second-capable, and Solana-native, so we can mirror Kalshi's **60-second averaging method** without a CF Benchmarks license and without redistributing Kalshi data.

- `K`: simple average of 60 one-second Pyth prices in the minute before open.
- `C`: simple average of 60 one-second Pyth prices in the final minute before close.
- **Up** iff `C >= K`. Otherwise **Down**.
- Payouts after a **5-minute confirm** following close.
- If either 60-second window has missing prints, or the feed-stale circuit breaker applies at settlement, **void and refund**.

Rules must say we settle on **Pyth**, not CF Benchmarks, not Kalshi, and not a single exchange chart.

### Ties

`C == K` is **Up** ("at least" the target), matching Kalshi's 15-minute rule. Refunds are for missing or incomplete samples (or a settlement-time circuit breaker), not for a numeric tie.

## Risk math (house book)

This section is a go-live gate. Do not take real SOL until Sneaks has confirmed the treasury wallet, the bankroll, and the caps.

### Exposure per round

For a round, after accepted (on-chain, pre-lock) bets:

```
Liab_up   = Σ (stake_i × multiplier_i)   for accepted Up bets
Liab_down = Σ (stake_j × multiplier_j)   for accepted Down bets
U = Σ stake_i on Up
D = Σ stake_j on Down
Treasury already holds U + D

Exposure_up   = Liab_up   - D     # pay Up winners; Down stakes offset
Exposure_down = Liab_down - U
Exposure      = max(Exposure_up, Exposure_down)
```

That is: **max(Up liability, Down liability) minus the opposite stakes**. A negative side-exposure is a locked-in profit on that outcome. `Exposure` is the most the treasury can be asked to pay **net of opposite stakes** if the worse side wins.

Example: 10 SOL on Up at 3.13x and 8 SOL on Down at 1.41x → Liab_up = 31.3, Liab_down = 11.28, Exposure_up = 31.3 − 8 = 23.3, Exposure_down = 11.28 − 10 = 1.28, Exposure = 23.3 SOL.

### Caps, reject, reprice

Until Sneaks sets numbers, use bankroll `B` (SOL, UNKNOWN) as follows:

- Up to **18 windows** can be open at once (9 assets × 15M and 1H).
- Per-round cap: `E_round = B / 60` (about 1/60 of bankroll; 18 concurrent rounds use at most 30% of `B` if every window is at cap).
- Per-asset cap: `E_asset = 2 × E_round` (the 15M and 1H books for that asset combined).
- **Hard reject** any bet whose acceptance would make post-bet `Exposure > E_round` or the asset's combined exposure `> E_asset`.
- Before rejecting, **reprice / skew**: move mid toward the heavy side (raise the heavy-side ask, lower the light-side ask) so the new bet, at the new ask, stays inside the cap and the overround is still at least 3%. If no legal ask in 1..99 exists, reject.

Do not go live with `B` unset. A 0.01 SOL minimum does not change the cap math.

### Bankroll sizing

Do not use raw Kelly to size a single house-book bet (the edge is on a *balanced* book; one-sided flow is a loss, not a Kelly edge). Use **coverage of max exposure**:

```
B >= 3 × (18 × E_round)     # recommended: 3× the worst-case simultaneous cap use
```

With `E_round = B / 60`, this is internally consistent (3 × 18/60 = 0.9, so 90% of bankroll is the theoretical max simultaneous cap; the remaining 10% is a buffer for fees, refund races, and SOL/USD moves). Sneaks may pick a larger `B` or a tighter `E_round`. **Kelly-style optional check:** after a week of ledgers, if the realized edge is μ and the variance of round P&L is known, a fractional-Kelly (e.g. half-Kelly) daily risk cap can tighten `E_round`; it does not replace the coverage rule.

**Do not fund the treasury and do not take mainnet stakes until Sneaks sets `B` and sends the funds himself.**

### Circuit breakers

Halt **new** bets (and do not send a stake sheet) when any of these is true:

- Pyth mid (or the 1-second series) is **stale by more than 5 seconds**.
- A **vol spike**: last 1-minute absolute log return `> 4σ` (σ from the 60-minute window), or the trailing 15-minute σ `> 3×` its 24-hour median.

In-flight (already accepted) bets still settle on the Pyth 60-second rule, unless the breaker is a **settlement-time** feed failure or staleness — then **void and refund**. Resume only when the feed is fresh and σ is back inside the band for a full minute.

### Expected house edge per 100 SOL wagered

At a 3% overround (`yes_ask + no_ask = 103`), a **balanced** book (equal liability on both sides) collects 103 of stake for every 100 of liability paid to the winner. House gross = 3 per 103 of stakes = **2.91 SOL per 100 SOL wagered**, when both sides are taken at the asks in liability-balanced proportion.

This is **not** a guaranteed return (and must not be marketed as one). A one-sided book can lose up to the exposure cap. After Cherry's **10% of net house revenue**, expected keep in a balanced book is **0.9 × 2.91 ≈ 2.62 SOL per 100 SOL wagered**.

### Target revenue, breakeven, 7-day park line

- **Target revenue per daily user:** `0.0262 ×` (SOL that user wagers that day), after Cherry's 10%, in a balanced book. Example only, not a user forecast: 0.1 SOL wagered → about **0.00262 SOL / DAU**. USD equivalent depends on the live SOL price (do not hardcode). Cosmetic sales are extra and sit on the Sales / Other stream.
- **Breakeven:** after payouts, **90% of net house revenue** (the 10% is Cherry's bill) must cover infra. The first $100 of **stake volume** per listing per month is free of Cherry's volume-based estimate; correct the bill to actual net. There is no user-count breakeven because DAU is unknown.
- **Park the family** if, after 14 days live, **7-day net house revenue after payouts and after Cherry's 10% is ≤ 0**, or if **treasury drawdown exceeds 20% of starting bankroll `B`**, or if circuit breakers are tripping as a matter of course. Check stake volume on each app's Billing page; confirm payouts were not counted as volume.

## Kalshi data feed

Reading Kalshi market data is an optional, **gated** quote aid. It is **not** a path to route user funds, orders, or KYC through Kalshi. We run our **own** SOL house book.

### What the public API allows technically

Official: [Quick Start: Market Data](https://docs.kalshi.com/getting_started/quick_start_market_data), [API Keys](https://docs.kalshi.com/getting_started/api_keys), [Rate Limits and Tiers](https://docs.kalshi.com/getting_started/rate_limits), [API Environments](https://docs.kalshi.com/getting_started/api_environments), [Quick Start: WebSockets](https://docs.kalshi.com/getting_started/quick_start_websockets).

- Production REST: `https://external-api.kalshi.com/trade-api/v2`.
- Events, markets, series, and order books can be read with **no authentication**. "No authentication headers are required for the endpoints in this guide." "Public endpoints such as market data need no scope."
- REST can lag "several seconds." Use WebSockets for current prices. **WebSockets require an authenticated handshake** (a Kalshi member API key). Data-only / read-only keys exist.
- Unauthenticated public requests have separate IP limits; the **numeric limit is UNKNOWN**. Back off on 429. Authenticated Basic Read is 200 tokens/s, most calls cost 10 tokens. Rate limits may change without notice (Developer Agreement §2.3).

Technical access ≠ permission to display that data in our app.

### Design option (gated): mirror Kalshi's live Up/Down % and target

**Off** until Sneaks has **prior written authorization from Kalshi**. If authorized: display Kalshi target and Up/Down % as the quote line for matching 15-minute series; **fall back to N(d)** when the feed is stale, 429s, or missing (including our open-to-close 1H windows). **Settlement of SOL is always Pyth**, never Kalshi or CF Benchmarks.

### Terms (do not redistribute without written authorization)

**Developer Agreement v1.1** ([PDF](https://assets.kalshi.com/Kalshi-Developer-Agreement.pdf)):

> Use of Kalshi APIs is expressly limited to facilitating a members own trading on the Exchange; all other usages are disallowed and may result in account suspension.

> 3.1. Collecting, caching, aggregating, or storing data or content accessed via the API except for purposes of facilitating your own trading on Kalshi. You may not share such data or content with third parties in any manner without prior written authorization from Kalshi.

> 3.2. Facilitating trading or account creation by other members, or inducing users to enter their Kalshi password into another site.

> 3.7. Sublicensing the API for use by a third party.

> 4.1.1. You must be a Member of Kalshi's Exchange and comply with Kalshi's Rulebook.

**Kalshi Data Terms of Use** ([PDF](https://kalshi-public-docs.s3.amazonaws.com/kalshi-data-terms-of-service.pdf)): personal, non-commercial use of Website data only; **publicly displaying**, distributing, creating derivative works, or using Kalshi Data to create, calculate, issue, settle, or support any financial instruments, indexes, products, or services is prohibited without prior written authorization.

### Out: no pooled or brokered real-money routing to Kalshi

**Do not place Kalshi orders for users, pool user funds, or broker Kalshi trades.** The API is limited to a member's own trading; facilitating trading or account creation by others is prohibited. Each Kalshi trader must be a Member with their own KYC'd account. Our book is a Cherry Partner prediction market settled in SOL from Sneaks's treasury, not a Kalshi front end.

## Research (2026-11-19, America/New_York)

Live Kalshi pages were viewed **logged out** at about **11:33 PM ET**. In-app Cherry recon: [recon-2026-11-19.md](cherry-gap-bot/recon-2026-11-19.md).

### Kalshi crypto up/down

Official: [Crypto Markets help](https://help.kalshi.com/en/articles/13823838-crypto-markets), [Market Settlement](https://docs.kalshi.com/getting_started/market_settlement), [15-minute Pro help](https://kalshi.com/pro/help/fifteen-minute-markets), [15 min Crypto](https://kalshi.com/category/crypto/frequency/fifteen_min), [Hourly](https://kalshi.com/category/crypto/frequency/hourly), [Daily](https://kalshi.com/category/crypto/frequency/daily), [Fee schedule](https://kalshi.com/fee-schedule).

- Frequencies on Kalshi: 15 min, Hourly, Daily, Weekly, Monthly. Our v1 live set is 15M and 1H (open-to-close). Kalshi's Hourly/Daily category pages, as of this recon, showed clock-time above/below and range markets more than open-to-close up/down.
- Nine 15-min pairs in v1: BTC, ETH, SOL, XRP, DOGE, BNB, HYPE, NEAR, ZEC. Tickers: `KXBTC15M`, `KXETH15M`, `KXSOL15M`, `KXXRP15M`, `KXDOGE15M`, `KXBNB15M`, `KXHYPE15M`, `KXNEAR15M`, `KXZEC15M`. Event example: `KXBTC15M-26NOV192345`. Windows `:00/:15/:30/:45`. Payout 5 minutes after close. Crypto Leader 15 min is v2 playable / v1 hub card.
- Kalshi settles 15-minute crypto on a **CF Benchmarks** real-time index, simple average of 60 one-second prints in the last minute vs the opening minute; **at least** the target is Up. We copy the averaging and tie rule, and settle on **Pyth**.
- Observed multipliers (logged out, ~11:33 PM ET, plus the 30/70 mobile ref): ETH 27/72% → 3.51x/1.35x; SOL 23/78% → 3.97x/1.28x; BTC 34/66% → 2.89x/1.46x; 30/70% → 3.08x/1.40x. Multiplier is 1/ask including spread, not 1/displayed mid.

### Other up/down games

Polymarket 15m ([crypto/15M](https://polymarket.com/crypto/15M)); Jupiter Forecast ([docs](https://developers.jup.ag/docs/prediction/forecast)); TakePair ([about](https://takepair.com/en/about)); Predikt ([t.me/predikt_app_bot](https://t.me/predikt_app_bot)); OKX Event Contracts ([learn](https://www.okx.com/en-us/learn/okx-event-contracts)); OKX Racer points hooks ([Decrypt](https://decrypt.co/240917/okx-bitcoin-price-guessing-game-telegram)); Byte Quest Fast Predict free points ([BEXC](https://bexc.io/help/gs-fast-predict)).

### Cherry.fun — no first-party up/down app

In-app recon: no BTC/ETH/SOL higher-or-lower app. Closest: **Crypto Trading Simulator (16 members)** and **MemeRace (1 member)**. Polymarket at [chat.cherry.fun/@predict](https://chat.cherry.fun/@predict) is a third-party event desk, not this product. X search did not find a Cherry up/down mini app.

### Verdict

**BUILD**, as a **Partner prediction market** with a SOL house book, subject to the open questions below. Cherry still has no first-party Up/Down app.

## Art bar

CONSOLE-GRADE (Sneaks 2026-11-19): near-PS4/PS5 — cinematic 3D, volumetric light, depth, asset-colored metal and glass, a console market terminal, not flat CSS. Hub follows hub-ref-1/2/3; pair screen follows kalshi-ref-btc15.jpg as the **primary** layout. Consistent family branding across all 10 icons and covers. No "Cherry" lettering.

## Tasks

### BUILD — Fabok (lead)

Shared engine first, then the hub, then the nine single-pair apps from one template.

Acceptance:

- plays at 360px; first frame + `cherry:ready` < 5s (lazy-load heavy art after ready)
- launch token verified server-side (`verifyLaunchToken` + **that listing's** `appId`, key by `cherry_id ?? sub`)
- ten origins, each with `/.well-known/cherry-app.json` and its own `appId`
- **18+ age gate**, geo block (CU, IR, KP, SD, sanctioned regions, plus every additional country/state Sneaks lists), published odds and 3% overround, per-user limits, self-exclusion, support channel with 72h report SLA, no guaranteed-or-expected-return copy
- a bet is **rejected after lock** (30s before close); a sign request is not offered after lock
- a bet is **only accepted after on-chain confirmation**, and only if that confirmation is before lock; otherwise refund
- every stake tx has `withAppReference(APP_ID)` of the listing + ≤80-char label; stake to the Sneaks-confirmed treasury (not hardcoded)
- settlement tests **per asset**: 60 one-second Pyth prints → simple average; Up iff `C >= K`; missing prints → refund; 5-minute confirm; tests for BTC, ETH, SOL, ZEC, XRP, NEAR, HYPE, DOGE, BNB
- **payout idempotency** (no double pay / no double refund)
- **exposure cap** enforced (reject or reprice; never accept a bet that breaches `E_round` or `E_asset`)
- **feed-stale circuit breaker** (>5s stale, or vol spike as specified) blocks new bets; settlement-time failure voids and refunds
- **treasury keys never in client code or repo**; payouts need a signer Sneaks controls
- money path stays inside the **live** Partner limits (default Verified caps until the agreement is confirmed); min 0.01 SOL; family-wide daily cap as specified
- optional cosmetics: one-time Sales, unlock only after on-chain confirmation, no odds advantage
- pricing tests: N(d) mid, 3% overround, multiplier `100/ask`, 1–99 clamps
- hub and pair UI as specified; 15 MIN and HOURLY live; 5M / Daily / Weekly / Monthly greyed "soon"
- room leaderboard from `cherry.room`; `cherry.share` without a guaranteed-return claim
- bet ledger row written per bet; cosmetic sale ledger row per sale
- test URL ready for a private test room (engine + hub + at least one pair) on **devnet or a Sneaks-approved test treasury only**. Console-grade look on a 360px phone at 60fps (WebGL / PixiJS or Three.js)

Acceptance tests must also reject a tx without a valid launch token.

**No deploy, publish, or treasury funding without Sneaks's yes.**

Deploy/live checks: muse (after Sneaks's yes).

### ART — grok-bot

10 icons (512×512) and 10 covers (1200×630) in console-grade style, **consistent family branding**, plus a 9:16 splash for the hub and a pair-screen chrome kit. Reference: hub-ref-1/2/3 and kalshi-ref-btc15.jpg. No "Cherry" lettering. No flat CSS as the finished look.

### SHIP GATE — Sneaks

Sneaks confirms the **treasury wallet**, **Partner limits**, **US/geo stance**, and **bankroll `B`**, funds the treasury himself if he wants to go live, then walks the portal wizard **10 times** (category and model per Money implementation; 18+; country blocks he approved), agreements signed with his wallet, live URL per listing, checks + iframe test, publish. Save wizard prompts to `docs/CHERRY_INTEGRATION.md` in the app repo. **No deploy, publish, or treasury funding without his yes.**

## Open questions only Sneaks can answer

1. **Treasury wallet** — which Solana address receives stakes and pays winners? (Never hardcoded until he names it; keys stay with him.)
2. **Partner limits** — the written agreement's per-transaction and per-wallet-per-day caps, and any other Partner terms. Until he shares them, the spec defaults to Verified $1,000/tx and $5,000/wallet/day. Live tier still needs a portal confirmation on the owning wallet.
3. **US / geo stance** — whether to serve the United States (and which states), and the full country block list beyond CU, IR, KP, SD and sanctioned regions. This is a legal/licence question; Cherry's automatic US block is written for iGaming, not explicitly for Partner prediction markets.
4. **Bankroll `B`** — how much SOL he will fund, which sets `E_round = B/60` and the 3× coverage rule. No mainnet stakes until `B` is set and funded by him.
5. Also confirm: iOS distribution (policy's "not on iOS" is written for iGaming); whether the listing wizard should be Other (mix of Commission + cosmetic Sales) or Commission only; the family-wide daily cap vs per-app Cherry caps.
