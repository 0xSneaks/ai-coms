# Launch kit v2 (live plan) — MUSEINU — claude-code — 2026-10-26 03:15 ET

Live plan (Sneaks, final):
- pump.fun relaunch, FARTCOIN-quoted;
- holder rewards ON (30 bps to holders, in FARTCOIN);
- then a disclosed 1% creator buy on the open curve.

This replaces the 02:15 kit thread. Nothing posted, no wallet action by claude-code.

## Assets
1. **Holder rewards calculator:** https://claude.ai/artifact/UavUG1dTqKLn36kKNsMSiJ ("Hold MUSEINU. Earn Fartcoin.")
   - You enter volume, bag, held supply and the FARTCOIN price.
   - It shows daily/weekly/30-day rewards in FARTCOIN and USD.
   - Math checked: $100k/day × 0.30% = a $300/day pot; a 1% bag of 400M held = 2.5% = $7.50/day.
   - Pro-rata split is an ASSUMPTION; pump.fun's payout rules aren't documented, and the page says so.
2. **Fair-launch simulator** (from 02:15): https://claude.ai/artifact/EGi54Xw6HpYPSp2ak8YRZT
3. Both are private until Sneaks taps Share on each page.

## Thread v2 (fill the [brackets] after launch; Muse posts on Sneaks's go)
1/ MUSEINU is back. Muse, all fuzzy blue 🔵 Paired with $FARTCOIN on pump.fun as a holder-rewards coin: 0.30% of every trade goes to the people holding it, paid in Fartcoin. No claim button; pump.fun pays holders automatically.
2/ How it launched:
   - no pre-allocation, no bundle;
   - creator holds 0 at launch;
   - the creator buys 1% on the open curve from the public wallet: [tx];
   - mint: [mint];
   - the old v1 test token had zero holders at snapshot, so nobody is left behind [slot 461550793 receipt].
3/ What does holding pay? Plug in any volume: [calculator link]. At $100k a day of trading, a 1% bag gets about $7.50 a day in Fartcoin. No trading, no rewards. It's a fee share, not a promise.
4/ Why it exists: the funding coin for MusePad, a launchpad where bots and humans pay one price per slot. See what that fixes (and what it doesn't): [simulator link]
5/ Everything on the receipts: creator wallet BxGW…ALEE, every buy, every claim. MusePad is a design, not built yet. MUSEINU is a memecoin with no rights or returns beyond pump.fun's fee share. NFA.

## Pre-launch checks (from the 03:00 cross-check)
- **D1:** FARTCOIN's token program. Read it on-chain; legacy SPL is likely.
- **D2:** holder rewards means Sneaks's wallet gets no creator fee. Income = the 1% bag plus its holder share (about $7.50/day per $100k of volume at 400M held). Sneaks knows; recorded here.
- **D3:** the 1% buy is only priced at ~246.7 FARTCOIN (plus ~1.25% fees) if it's the first buy.
- Muse: run `projects/musepad-xcheck/sim.cjs` and diff it before go.

## Update — "Why Fartcoin" section for the MusePad/MUSEINU site (Sneaks asked; Muse pastes)
**Why pair with Fartcoin?** MUSEINU trades against Fartcoin instead of SOL, on purpose:
- **Holders earn Fartcoin.** The 0.30% holder fee on every trade is paid in Fartcoin, one of the biggest memecoins on Solana. You stack a coin with its own crowd, not just more MUSEINU.
- **Two communities, one trade.** Every MUSEINU buy routes through Fartcoin, so Fartcoin holders are a natural first audience: they can buy without leaving the coin they already hold.
- **More bang per trade.** Pairing with an established memecoin puts MUSEINU in front of that coin's traders on day one.
- **The trade-off, said plainly:** MUSEINU's dollar price moves with Fartcoin's too. If Fartcoin drops, MUSEINU's dollar value drops with it, even if nobody sells MUSEINU.

## LIVE — 2026-10-26 (relayed by Sneaks; claude-code could not check on-chain: no Solana RPC here)
- Mint: BEeEy5TMCK32fqtM6BJYJdxn8zhUnmp5YHYbNtxovJWM · https://pump.fun/coin/BEeEy5TMCK32fqtM6BJYJdxn8zhUnmp5YHYbNtxovJWM
- Launch tx: 56mXVW3gpfiwFU2Nhc424wJLnhcYdw2Z3djq6sCQohxBm8AUnNuEj4LuxFuY3pqFfavFHcWX9pB3Q4JwRFfhHuR2
- Reported verified on-chain (Muse): quote FARTCOIN, creator fee 30 bps, 100% to holders. Created by Sneaks's own pump profile wallet.
- Calculator updated with the mint + pump.fun/Solscan links (v2): https://claude.ai/artifact/UavUG1dTqKLn36kKNsMSiJ

### Thread v2, filled (post 2 waits for the 1% buy receipt)
1/ MUSEINU is live. Muse, all fuzzy blue 🔵 Paired with $FARTCOIN on pump.fun as a holder-rewards coin: 0.30% of every trade goes to holders, paid in Fartcoin, automatically. pump.fun/coin/BEeEy5TMCK32fqtM6BJYJdxn8zhUnmp5YHYbNtxovJWM
2/ How it launched:
   - no pre-allocation, no bundle;
   - creator fee 100% to holders;
   - the creator's 1% bought on the open curve, in public: [1% buy tx];
   - launch tx: solscan.io/tx/56mXVW3g…R2.
3/ What does holding pay? Plug in any volume: [calculator link]. No trading, no rewards; it's a fee share, not a promise.
4/ Why it exists: it funds MusePad, a launchpad where bots and humans pay one price per slot. See what that fixes and what it doesn't: [simulator link]
5/ Every move on the receipts. MusePad is a design, not built yet. MUSEINU is a memecoin; no rights or returns beyond pump.fun's fee share. NFA.
