# Antigravity — see where Hyperliquid money is flowing (Cherry mini app, raw data only)

**Stage:** REVIEW · **Owner:** grok-bot · **Next:** Independent re-review of PR #1 at `b3f95ca` · **Gate:** Re-review, deployment evidence and Sneaks’s publish decision

## Now — 2026-11-20 08:07 ET

- VERIFIED · PR #1 on `grok/antigravity-v1` points to `b3f95ca39d96064a67a33bc3b3ae0cafd4d61fdb` with fixes for payment recovery, atomic settlement, exact token accounts, geo and session checks, and durable ledger and aggregate whale data. Local Python and web suites and build passed. Live deployment evidence pending. [Handoff](../handoffs/2026-11-20_0807_codex_cherry-antigravity-fixes.md).

## Now — 2026-11-20 07:44 ET

- VERIFIED · Codex verdict **CHANGES** for PR #1 at `6ae19fcb`. Hold publish and real payments. Recover submitted payments without requiring another signature, bind the payer to the order, settle atomically, and correct exact ATA/rent handling. Verify trusted geo, durable Railway ledger and Cherry policy for wallet-level data. 65 focused Python tests, 4 web tests and the local build pass. [Review](../handoffs/2026-11-20_0744_codex_cherry-antigravity.md).

**Status:** OPEN 2026-11-20 (spec filed by Cherry Gap Bot). Portal listing exists (7/8 Integrate, 2026-11-20 05:18 ET); App ID `243a432e-a793-4aa9-9984-106387faad30`, Project ID `app_8bc59a6aef11`. Handoff: `handoffs/2026-11-20_0518_claude_cherry-antigravity.md` (claude → grok-bot + muse; builder was claude-code, unavailable 2026-11-20). **Logo (Sneaks, 2026-11-20 05:24 ET):** green gravity-orb icon (1024×1024) + cover (1200×630, name left, orb + ring right) — replaces the red-ball icon; the handoff's red-ball / red-bars art flags are closed by this change.
**Owner order:** Sneaks, 2026-11-20: "Ok so make it applicable to cherry where I can't get banned." and "Copy the repo and then update it to fit a cherry subscription plan."
**Code:** private copy [0xSneaks/antigravity](https://github.com/0xSneaks/antigravity) (copy of [0xSneaks/hl-bot-v2](https://github.com/0xSneaks/hl-bot-v2) `main` @ `d71fdc2`, history kept; Sneaks's private email in old merge commits masked to his GitHub noreply address, so `main` SHAs differ from hl-bot-v2). A superseded duplicate `0xSneaks/tidegauge-cherry` (created before the rename; the bot's GitHub token cannot rename or delete repos) should be deleted or archived by Sneaks. The original hl-bot-v2 / MOONBOYHL Telegram bot is **not touched** and keeps running separately as-is.
**Build checklist:** `CHERRY_TODO.md` in the app repo. **Integration prompt:** `docs/CHERRY_INTEGRATION.md` in the app repo (placeholder until the portal's 6/7 prompt replaces it).

> "Subscription plan" on Cherry = **one-time passes** that the user buys again. Cherry refuses recurring subscriptions below Partner (wallet.md). hl-bot-v2's passes are already one-time USDC payments that extend access (README "Paying again refills your time"); nothing in it auto-renews. We keep that model and drop the word "subscription" from the UI.

## Why it changes (live docs, read 2026-11-20 ~04:40 ET)

VERIFIED from https://portal.cherry.fun/docs/mini-apps/policy.md (Version 2026-11-10):
- Restricted, Partner apps only: "**Regulated financial services.** Custody of user funds, fiat on- and off-ramps, money transmission, lending and borrowing, yield or staking products that promise a return, leverage, perpetuals, options and other derivatives, copy-trading, managed accounts, and **investment advice or signals for a fee**."
- "No app, of any tier, states or implies a guaranteed or expected return."
- "Neither are swaps, trading of existing tokens, NFTs and marketplaces [restricted], as long as they stay clear of the activities above and of the rules below."
- Data: "No scraping of rooms, members or social graphs; no profiles or lists of wallets or users; no fingerprinting across apps."
- Names: "It does not use \"Cherry\" in its name, or look like a Cherry product." / never "official", "endorsed", "approved" or "audited by Cherry".
- "No promotion that misstates odds, prices or returns, and no unsolicited messages to users through bots tied to your app."
- Countries: Cherry blocks every app in Cuba, Iran, North Korea and Sudan; apps also may not serve Crimea, Sevastopol, occupied Donetsk/Luhansk/Kherson/Zaporizhzhia, or other comprehensively sanctioned places, and must block them in-app as well.
- "Give users a working support channel in your app and act on reports within 72 hours."
- Minors: rate 18+ "when it can ask users to sign a transaction that moves value, shows real-money prices".
- Enforcement: Cherry may "lower its limits, refuse transactions, pause, delist or remove the app, and close the developer's account and the other projects linked to it."

VERIFIED from https://portal.cherry.fun/docs/mini-apps/wallet.md: Unverified $50/tx and $50/wallet/app/day; Verified $1,000/tx and $5,000/wallet/app/day; "Recurring subscriptions: Refused | Refused | By agreement"; approvals/delegation, authority changes, durable nonces refused below Partner; label every tx, ≤80 chars, never state an amount different from what moves; daily limit resets 00:00 UTC.

VERIFIED from https://portal.cherry.fun/docs/mini-apps/monetization.md: Sales = "Everything users pay you: items, entry fees, subscriptions, tips", 10% of what users pay; first $100/month of volume free; bill on the 1st, pay in USDC within 7 days or the app pauses; "You build nothing for fees: no fee code in your transactions"; every tx carries the app reference key (`withAppReference(ix, APP_ID)`, `sha256("cherry:app:" + appId)`).

**Policy class: Tools / data (Sales). Not a restricted category IF the rules below hold.** The Telegram bot's `/scan` (entry/stop/TP1-3, leverage, "Risk % of account", LLM rationale) and its `/paid` pass for those setups are "signals for a fee" = Partner-only. Antigravity sells the instrument, not the reading.

## Key changes vs the Telegram bot (MOONBOYHL)

1. **No calls, ever.** `/scan` setups, `format_setup` (Entry/Stop/TP/Leverage/Risk %), `suggest_leverage`, `position_sizing`, `integrations/grok.py` setup text, confluence "top setups" and the setup half of `services/correlation.py` are **not in the Cherry build**. Coin pages show neutral metrics only (RSI, ADX, EMA slope, ATR %, funding, OI Δ, volume, distance to the 24h high/low) with no direction, no composite "setup score", no levels labelled entry/stop/target.
2. **Wallet data without ranking or "follow".** No smart-score / ROI leaderboards, no "skilled/proven wallet" discovery, no `/track` promotion, no copy or "follow trade" button. Tracked wallets show by codename (existing `core/identity.py`) with current positions, size, average open price, liq distance and unrealized PnL as observed facts. Wallets the user adds themselves are their own watchlist, stored per `cherry_id`, never published as a list.
3. **One-time passes, no subscription.** Pass 7d $10 / Pass 30d $30 USDC, one tx each, buying again extends from the later of now and current expiry. No auto-renew, no approvals or delegation, no stored payment authority. The Telegram unique-sub-cent amount scheme is replaced by order + signer binding.
4. **Cherry identity + payment plumbing.** `verifyLaunchToken(token, { appId })` server-side before anything; entitlement keyed by `cherry_id ?? sub`, not Telegram `chat_id`; every tx carries `withAppReference(APP_ID)` + ≤80-char label; unlock only after the reused on-chain verifier passes; replay ledger reused. No Cherry 10% in the tx.
5. **Copy and promo lock.** "Data only. Not financial advice." on every data screen and every share card; banned-words lint in CI; no link to, mention of, or upsell for the paid Telegram bot or any signals product inside the app or its listing; no "Cherry" in name/art; no push messages outside the app (alerts land in an in-app inbox).
6. **Compliance shell.** CU/IR/KP/SD + occupied Ukrainian regions + comprehensively sanctioned places blocked in-app; 18+ rating; in-app support channel with a 72h report SLA; Cherry-hosted Terms/Privacy linked.

## Pick card

- **Name:** Antigravity (named by Sneaks 2026-11-20; no "Cherry"). Pitch direction from Sneaks: "See the direction traders are being pulled towards", kept neutral/data-only. Name check 2026-11-20: "Google Antigravity" is Google's AI coding IDE (launched Nov 2025) and appears all over Hyperliquid MCP/bot tutorials, so expect search confusion and some trademark risk; no Cherry or crypto-data app named Antigravity found. Sneaks's call; re-check Cherry's marketplace search at the portal step. Earlier working name "Tidegauge" is retired.
- **One-line pitch (≤50):** `See where Hyperliquid money is flowing` (46). Fallback: `Live Hyperliquid whale and flow data` (36).
- **Category:** Tools (not Trading, not Predictions). **Age rating:** 18+. **Money model:** Sales.
- **Size:** **M.** Data engine, trackers, payment verifier and replay ledger already exist in Python; new work = a thin read-only HTTP API, Cherry auth, pass purchase flow, a 360px web front end, compliance shell and the copy lint.
- **10-second loop:** open in a room → Flow Report loads (biggest whale move in the last hour, top 3 OI movers, funding extremes) → tap a whale move card → see the wallet's codename, position size, open price, liq distance → tap **Share to room** (`cherry.share`) → room sees the card, taps it, lands in Antigravity.
- **Repeat play:** daily Flow Report (resets 00:00 UTC), in-app alerts inbox for the user's own watchlist (coins and wallets), "days checked" streak badge (cosmetic only), weekly room recap card. Optional v1.1: Paper League on play credits (see Room hook).
- **Room hook (documented SDK only):** `cherry.share` posts a whale-move / OI-move card (coin, codename, size, time UTC, "Data only. Not financial advice.") into the room. `cherry.room` `{id, title, memberCount}` only to label the room recap and group the optional league board; no member lists, no scraping. Optional v1.1 **Paper League:** Up/Down on HL mark price with free daily play credits, room board in-app, nothing purchasable that affects play, nothing cashes out (free-to-play skill game per policy). Its copy uses Up/Down, never long/short, and it needs its own review before it ships.

## Feature map: Telegram source → Cherry build

| hl-bot-v2 source | Outputs today | Cherry build |
| --- | --- | --- |
| `/scan`, `scanner/setups.py` `coin_scan`, `scanner/screener.py` `deep_dive` (entry/stop/targets/leverage), `integrations/grok.py`, `bot/formatting.py` `format_setup` | LONG/SHORT setup, Entry, Stop, TP1-3, leverage, "Risk % of account", LLM rationale, invalidation | **REMOVED.** Not callable from the API. |
| `/coin SYMBOL` (`deep_dive_symbol`) | Same setup card for one coin | **Rewritten as Coin page:** raw indicator values per timeframe, funding, OI Δ, volume, 24h range. No direction, no levels, no score labelled bullish/bearish. |
| `/flow SYMBOL`, `scanner/flow.py` | ΔOI short/long windows + crowding label | **KEPT as data.** Show ΔOI %, price Δ %, funding; crowding state as a neutral regime name (e.g. "OI rising · price rising"), not "new longs entering". |
| `/wallets`, `services/correlation.current_wallet_confluence` | Tracked wallets' positions by coin and side | **KEPT** as Whale Board (codenames, size, side, avg open price, liq distance, uPnL). |
| `/confluence`, `services/correlation` setup join, `confluence_alert`, `confluence_digest` | "WHALE CONFLUENCE — top setups" | **Rewritten as Whale Clusters:** count and total notional of tracked wallets on the same side per coin. No setup join, no "top setups". |
| `/dexs` | HIP-3 builder dexs and markets | **KEPT.** |
| `/scores`, `services/wallet_profile.py` smart score, `/candidates`, `/track`, `discovery_*`, `proven_promotion_alert` | ROI-ranked "skilled" wallets, approve-to-track | **REMOVED** (copy-trading-shaped + wallet-list ranking). Wallet health may stay internal for filtering noise. |
| `trackers/wallet_tracker.py` alerts (open/add/trim/close/flip/stress/liq-risk/reactivation) | Push alerts with emoji direction, "🎯 Entry" | **KEPT as in-app feed** with neutral copy: "opened", "added", "trimmed", "closed", "reversed side"; "avg open price" instead of "Entry". |
| `funding_spike_alert`, `oi_surge_alert`, `oi_flow_digest` | Funding/OI moves, "NEW LONGS ENTERING" | **KEPT as data,** relabelled (see lint). |
| `services/digest.py` | Free vs Pro weekly digest "creates FOMO for Pro", week PnL | **Rewritten:** weekly recap of measured activity, no FOMO upsell copy. |
| `core/solana_pay.py` `verify_usdc_payment` + `storage/database.py` replay (`mark_payment_used` / `is_payment_used`) | Fail-closed USDC verify + one-time redeem | **REUSED** + extra checks (reference key, signer, order). |
| `core/entitlements.py` trial + passes | `paid_until` per Telegram chat, 12h one-time trial | **REUSED logic,** re-keyed to `cherry_id ?? sub`. |
| `bot/*` Telegram handlers, `app.py` polling | Telegram UI | **Not run** in the Cherry deploy. |

## Screens (360px, dark, 44px targets)

1. **Flow Report** (home, free): biggest tracked-whale move last hour, top 3 OI Δ, top 3 funding extremes, HIP-3 market count; Share button per card. Free tier data is 15 minutes delayed and labelled "15-min delayed".
2. **Whale Board** (pass; free = top 5 delayed): tracked wallets by codename, positions, size, avg open price, liq distance, uPnL; Whale Clusters tab.
3. **Coin page** (pass; free = BTC/ETH/SOL delayed): metrics grid per timeframe, funding history sparkline, OI Δ, 24h range, tracked-whale exposure.
4. **Flow** (pass): funding and OI movers table across the universe incl. HIP-3 (`/dexs`).
5. **Watchlist + Alerts inbox** (pass; free = 1 coin): up to 25 coins and 10 user-entered wallets; alert rules (size ≥ X, OI Δ ≥ Y%, funding ≥ Z); in-app inbox only.
6. **History / Export** (pass): last 30 days of the user's alert inbox and whale moves for watchlist items; CSV download.
7. **Pass** (free): what the free tier and each pass include, prices, current expiry, "Get 7-day pass" / "Get 30-day pass", trial button, receipt list.
8. **Info**: disclaimer, data sources (Hyperliquid public API), support channel, Terms/Privacy (Cherry-hosted links), report form.
9. **Blocked**: region not served.

## MONEY IMPLEMENTATION

1. **Model:** Sales. The user pays for time-boxed access to data tools. Day-1 prices (USDC, one-time each):
   - **Pass 7d — $10.00**: 7 days of live (undelayed) Whale Board, Whale Clusters, Coin pages for every market incl. HIP-3, Flow table, watchlist (25 coins / 10 wallets), alert rules + inbox, 30-day history and CSV export.
   - **Pass 30d — $30.00**: same, 30 days.
   - **Pricing (Sneaks, 2026-11-20 — post-build step, do not change the build mid-flight):** launch month $5 / 7d + $15 / 30d (limited-time trial price); standard after month 1 is $10 / 7d + **$20 / 30d** (not $30 — volume beats a higher sticker in a small niche with free alternatives); launch buyers grandfathered at $15 for their first 30d renewal. The 7d is the trial; the 30d is the product.
   - **Free:** Flow Report (15-min delayed), top 5 whales delayed, BTC/ETH/SOL coin pages delayed, 1 watchlist coin, share cards; one **12-hour full trial** per `cherry_id` (reuses `TRIAL_HOURS`).
   - Buying again extends: `new_until = max(now, paid_until) + days`. Nothing renews by itself.
   - Caps: both prices sit inside the **Unverified** $50/tx cap that every new app starts on (wallet.md + skill note: a new listing starts Unverified even for a verified developer). Under Unverified the $50/wallet/day cap allows one 30d + one 7d the same UTC day ($40) but not two 30d passes ($60); handle `POLICY_DENIED` `DAILY_LIMIT` with "Daily limit reached, try again tomorrow". Read the live `tier` claim; never hardcode limits.
2. **Payment flow (builder):**
   1. `POST /api/session` — `verifyLaunchToken(token, { appId: APP_ID })` (issuer `https://chat.cherry.fun`, JWKS `https://chat.cherry.fun/.well-known/jwks.json`) **before anything else**; reject wrong aud/iss/app_id and expired tokens. Session in memory + `Authorization` header, no cookies. User key = `cherry_id ?? sub`. Read `tier`, `wallet`, `payment_wallet` claims.
   2. `POST /api/pass/order {plan}` — server creates `order_id`, fixed USD amount, plan, receiving address (from env, Sneaks to confirm), expiry 10 min. One open order per user.
   3. Client builds one USDC `transferChecked` to the receiving address's USDC ATA (create-ATA-idempotent only if missing) for `paymentWallet` when set, plus an SPL Memo with `order_id`; `withAppReference(transferIx, APP_ID)` on the transfer instruction we control; shows plan + amount before signing; `signAndSendTransaction(tx, { label })`. Labels: `Antigravity 7-day data pass ($10 USDC)` (36 chars) and `Antigravity 30-day data pass ($30 USDC)` (37). **No Cherry fee in the tx.** One-time only: no approvals, delegation, durable nonce or recurring anything.
   4. `POST /api/pass/confirm {order_id, signature}` — server runs the reused `verify_usdc_payment` (fail-closed: success, finalized, recent, USDC mint, receiving owner's USDC balance +amount via pre/post token balances) **plus**: amount == plan price exactly, signer/fee payer == session `payment_wallet ?? wallet`, memo == `order_id`, app reference key `sha256("cherry:app:"+APP_ID)` present, block time after order creation, signature not already in the replay ledger. Only then extend `paid_until`. Idempotent: the same signature confirms once, a second call returns the existing receipt.
   5. Errors: `USER_REJECTED` → quiet "Cancelled"; `TX_LIMIT` / `DAILY_LIMIT` / `FORBIDDEN_INSTRUCTION` / `APP_PAUSED` / `SIMULATION_FAILED` / `PRICE_UNAVAILABLE` / `PRECHECK_UNAVAILABLE` → wallet.md messages; `WALLET_CHANGED` / `NOT_A_SIGNER` → rebuild for the new wallet. No retry loops (Cherry may pause apps that keep sending refused txs).
   6. A **sign-only spike** first (build the real tx, `signTransaction`, never broadcast, record the host result) before UI work, per skill Phase 2.
3. **Ledger:** table `cherry_sales(order_id, cherry_id, plan, usd_amount, tx_signature UNIQUE, paid_until_before, paid_until_after, tier, created_at, confirmed_at)`. Separate DB file from the Telegram bot's subscribers; never mixed. Reconcile monthly against the app's Billing page CSV.
4. **Targets / kill line:** target **$0.07 revenue per daily user per day** (≈5% of DAU buying one 7d pass a week). Breakeven: hosting estimate ~$20/month (ASSUMPTION: one small VM or container + free/cheap RPC; Grok API off) → **2 passes of $10 a month** cover it; Cherry's 10% applies only above $100/month volume. **Park line:** under **$20** of Billing volume in any 7-day window after 14 days live → park it and report.
5. **Receiving wallet:** Sneaks to confirm (default sneaks.skr per skill, confirm for this app). Env var only, never in the repo, never hardcoded.

## Compliance checklist (every screen, string, share card, listing field, icon and cover)

Banned words (case-insensitive, whole word, UI copy + API text + share cards + listing): `entry`, `stop`, `target`, `signal`, `setup`, `buy`, `sell`, `long`, `short`, `call`, `guaranteed`, `profit`, `APR`, `returns`, plus `TP`, `take profit`, `leverage` as a suggestion, `alpha`, `moon`, `pump`, `win rate`, `edge`, `follow trade`, `copy trade`.
- [ ] CI lint `tools/copy_lint.py` fails the build on any banned word outside the allowlist.
- [ ] Allowlist (needs Sneaks + reviewer sign-off): the single `PositionSide` component may print "Long" / "Short" as the **observed side of a third-party position** (Hyperliquid's own term). If team@cherry.fun or the reviewer objects, switch to "▲ up-side" / "▼ down-side". "PnL" (unrealized/realized) is allowed as a measured number, never "profit".
- [ ] Buttons say "Get 7-day pass", not "Buy".
- [ ] "Data only. Not financial advice." on every data screen footer and every `cherry.share` card.
- [ ] No entry/stop/target/levels, no direction words, no composite bullish/bearish score, no "setup", no rationale text from an LLM.
- [ ] No ROI leaderboards, "smart/skilled/proven" wallet labels, follow/copy buttons, or wallet lists published to others.
- [ ] No expected or guaranteed returns, no win-rate or accuracy claims, no backtest numbers.
- [ ] No link to, mention of, or upsell for MOONBOYHL / t.me/MOONBOYHL_bot / any paid signals; no "Pro on Telegram".
- [ ] No "Cherry" in name, icon, cover, pitch; never "official/endorsed/approved/audited by Cherry"; Verified never shown as a safety mark.
- [ ] Geo-block in-app: CU, IR, KP, SD + Crimea, Sevastopol, occupied Donetsk/Luhansk/Kherson/Zaporizhzhia + other comprehensively sanctioned places; declare extras in the listing. Source of country: launch-token claim if Cherry provides one, else server-side IP geo; fail closed on unknown for paid actions.
- [ ] 18+ rating; Cherry-hosted Terms + Privacy linked (URLs from the portal prompt), not copied.
- [ ] Support channel inside the app (Info → Report a problem → stored ticket + support email) and a 72h response SLA logged; 24h incident notice to Cherry.
- [ ] No unsolicited messages: alerts only in the in-app inbox, no bot DMs.
- [ ] Data: use Cherry user data only to run the app; no member lists; delete on request and within 30 days of no longer needed; encrypt in transit and at rest.

## Architecture

- **Python core as API:** add `api/` (FastAPI) in the private repo that imports `integrations/hyperliquid.py`, `scanner/flow.py`, `scanner/indicators.py` (metrics only), `trackers/wallet_tracker.py`, `services/correlation.current_wallet_confluence`, `core/solana_pay.py`, entitlements logic. Background poller reuses `services/cycles.py` minus setup jobs. Read-only market endpoints + session/pass endpoints. No Telegram process (`RUN_TELEGRAM=false` / separate entrypoint).
- **Web mini app:** `web/` (Vite or Next.js), `@cherrydotfun/miniapp-sdk` latest (+ `/solana`), 360px dark, skeleton first frame, `cherry:ready` < 5 s, `isInsideCherry()` for first render, `useCherryUser()` for name/avatar. No connect-wallet button and no signMessage login inside Cherry.
- **Headers:** CSP `frame-ancestors 'self' https://chat.cherry.fun https://cherry.fun https://*.cherry.fun` on every HTML response, no X-Frame-Options. `/.well-known/cherry-app.json` → `{"appId":"<App ID>"}`, 200 JSON, no redirect or SPA fallback. `/api/health` reports Cherry identity configured.
- **Telegram bot:** stays in hl-bot-v2, untouched, separate DB and process. Nothing from it is linked from Antigravity.

## Art (console-grade bar, Sneaks 2026-11-19)

Near-PS4/PS5 cinematic look on the antigravity theme, read as "forces", not "price goes up": a dark zero-g observatory where capital is visualised as orbiting particles drawn into gravity wells (one well per market, size = open interest, glow = funding), whale positions as massive slow-moving bodies bending the field, volumetric light, depth of field, lens flares, glassy holographic HUD. Palette: deep space near-black, ion-blue/violet with warm amber for the biggest wells. No rockets, moons, upward arrows, candles, money stacks or "gains" imagery (the name must not read as "number goes up"). No Cherry marks, no Google Antigravity look-alike marks. Deliver: 512×512 icon (5% black padding), 1200×630 cover (logo left, name + pitch right), 9:16 splash, share-card frame (1200×630, with the disclaimer slot), whale-move card backgrounds ×3, particle-orbit / gravity-ripple FX sprite sheet. In-app: WebGL/pre-rendered backgrounds lazy-loaded after `cherry:ready`; data tables stay crisp text.

## Acceptance tests

- Plays at 360px; first frame + `cherry:ready` < 5 s; frame-ancestors present; cherry-app.json 200 with the right appId; no connect-wallet inside Cherry.
- Launch token: rejected without a token, with wrong aud/iss/app_id, and expired; user keyed by `cherry_id ?? sub`.
- Pass: unlock only after on-chain confirmation; wrong amount, wrong mint, wrong recipient, wrong signer, missing reference key, missing/wrong memo, stale tx, failed tx and a replayed signature all fail closed; double confirm is idempotent; buy-again extends from the later of now and expiry; trial once per `cherry_id`.
- Every tx has `withAppReference(APP_ID)` and a label ≤ 80 chars whose amount matches; no Cherry fee instruction; no approval/delegate/nonce instruction.
- Sale ledger row written per sale.
- API exposes no setup/entry/stop/target/leverage fields (contract test on every response schema); copy lint passes on `web/` and API text; share card contains the disclaimer.
- Geo-block test for each blocked country code; support form stores a ticket.
- Free tier delay is enforced server-side (not just hidden in UI).
- Existing Python tests for kept modules still pass; setup-only tests are removed or skipped with reason.

## Ship gate

Muse deploys to a Vercel/host PREVIEW (no production) → all Phase 4 checks pasted on the board → adversarial money-path review by a different agent (codex) → private test room → Sneaks walks the portal (Tools, Sales, 18+, extra blocked regions), adds the URL, runs checks + test, and **publishes himself**.

## Sneaks-only items (3)

1. **App ID** — create the project in the portal (wizard steps 1–6), and save the 6/7 prompt to `docs/CHERRY_INTEGRATION.md`.
2. **Receiving wallet** for pass payments (confirm sneaks.skr or another address).
3. **Deploy + secrets yes** — OK to deploy a preview with env vars he sets himself (RPC URL, receiving address, App ID); nothing pasted in chat.

## Open questions / uncertain

- Whether Cherry treats observed whale positions + liquidation distance as "signals" — ask team@cherry.fun before publish (draft for Sneaks to send): "We plan a Tools app that shows public Hyperliquid wallet positions, open interest, funding and liquidation distances as raw data with no recommendations, sold as one-time 7/30-day access passes. Is this outside 'investment advice or signals for a fee'?"
- The Data rule "no profiles or lists of wallets or users" — we read it as Cherry users' data, but a whale board is a list of wallets. Mitigation: codenames, public HL data only, no rankings. Include in the same question.
- `LICENSE` is proprietary (PhantomCapAI, all rights reserved); the private copy assumes Sneaks owns/controls PhantomCapAI. hl-bot-v2 itself is **PUBLIC** while its SECURITY.md/LICENSE say confidential — Sneaks's call, not changed.
- Hosting: MOONBOYHL hosting was NOT LIVE on 2026-11-12 (GCP billing blocker per projects/hl-bot-v2.md); the API needs a long-running process (pollers), so Vercel functions alone won't do — host the Python API on a container/VM, web on Vercel.
