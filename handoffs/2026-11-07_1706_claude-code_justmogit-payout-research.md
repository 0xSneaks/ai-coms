# Handoff — justmogit-bot — claude-code — 2026-11-07 17:06 ET

**Session goal:** Sneaks asked how we pay the pinger their cut, comparing pump.fun / Float / stock fun / Bags / Bags Pay, plus token incentives that lower the bot's fee.
**Status:** DONE (research + recommendation; nothing built, nothing spent). Sources were read via web fetch on 2026-11-07. Third-party claims are labelled.

## Facts (source in brackets)
- **pump.fun** [pump.fun posts, Jan–Mar 2026; solbotrank guide, Oct 2026]
  - Fee sharing to up to 10 wallets; recipients can be changed once after launch, then locked.
  - Creator fee 0.30% on the curve, 0.95%→0.05% after graduation by market cap.
  - Native social recipients: GitHub (Feb 2026, "more socials coming soon"). **No native X recipient found.** Paygram's docs say "pump.fun itself only pays Solana wallets". Our IDL note (platform 1 = twitter) remains UNVERIFIED in practice.
  - Supports custom/stock pairs (xStocks, PreStocks; 230 quote mints per the earlier Codex audit).
- **X-handle routers already running on pump.fun** (third-party):
  - **greenpill**: resolves @handle → X user id → a Privy embedded Solana wallet for that id, writes it as pump.fun's fee shareholder in the create tx, then revokes authority. Non-custodial; 0.02 SOL per launch.
  - **Paygram**: 80% to the handle, 20%  burn; custodial until claim.
  - **XPaid**: 65% to the handle; treasury-held; pays out via X Money.
  - **Slice**: 80/20; treasury-held.
- **Bags** [docs.bags.fm, bags.fm/fees.md]
  - Fee claimers can be identified by X handle natively (also kick, github, wallet), up to 100 per launch. Launch v2 requires fee sharing.
  - Default trade fee 2%: 1% platform / 1% creator pool. On new SOL configs the deployer takes 25% of the pool, so recipients get 0.75%.
  - A partner key lets a platform (us) earn 25% of the platform half.
  - Full API/SDK. "Bags Payout" endpoints track payouts and the payout handle.
  - **Bags Pay** = @BagsPay paying creators via X Payments / X Money (INFERENCE from public posts). Risk evidence: one $BAGSPAY token showed ~238 SOL held in reserve with "invalid_payee_wallet" [larpcheck].
- **Float** [floatlaunch.xyz/docs]
  - Raydium LaunchLab, fee 1–2.5%. Split: 15% holders (paid in the pair token), **5% creator (one wallet chosen at launch)**, 35% $FLOAT burn, 35% top traders, 10% treasury.
  - No X-handle payee. Unaudited; upgrade key held by the deployer, moving to a multisig.
- **StonkFun** (stonkfun.xyz): stock-paired LaunchLab launchpad. ~389 launches since Sep 2026; 0.2% still trading after a week [memestock.market]. Creator fee terms not found.

## Recommendation (INFERENCE)
- **BUILD on pump.fun (the volume is there), using the greenpill pattern ourselves.** At launch, resolve the pinger's X id, get a Privy embedded wallet for that id, and write a pump.fun fee split, then revoke authority:
  - pinger's X wallet: 70%
  - bot wallet: 30%, minus the holder tier

  The pinger signs in with X to claim. The bot never holds pinger money, and there is no ledger and no weekly send. Stock pairs also exist on pump.fun, so Float-style pairing doesn't need Float.
- **TEST Bags as plan B.** X payees are native, with no Privy setup on our side, and the partner key gives us a cut. Lower volume (UNVERIFIED) and a higher trader fee.
- **PARK** Float and StonkFun (5% creator share, wallet only, unaudited). **PARK** Bags Pay / X Money as a later cash-out option.
- **KILL** third-party routers for us. They take 20–35% and some hold the money.
- **Token incentive (ruling 6) still fits.** The bot's cut drops by tier if the pinger holds the bot token. Check the pinger's X-linked wallet at launch, and lock the split then.

## ⚠️ Owner decisions / risks
1. **Cost cap:** the fee-share accounts add ~0.0076 SOL rent per launch (third-party figure). pump create costs ~0.020–0.025 SOL, so the total is ~0.028–0.033 SOL, **above the 0.025 SOL cap**. Measure it in one test; the owner decides the cap.
2. **Privy:** needs an owner Privy app (keys never in the repo). Pre-generating wallets for X ids: VERIFIED in greenpill's docs only, not tested by us.
3. **Rule conflict:** stock pairs conflict with the "SOL pairs only" money rule. The owner rules on it.
4. **One live test** (owner-approved): launch → split → pinger X claim.

## Owner clarifications (Sneaks, 2026-11-08)
- **Bags Pay is part of bags.fm.** So "plan B Bags" means a Bags launch with X-handle fee claimers plus Bags Pay payouts (X Money cash-out) in one product, not two options.
- **"Stock fun" = StonkFun**, which is the API for the separate STONKFUNBOT project, not a JustMogIt payout rail. Note from projects/stonkfunbot.md: StonkFun closed its own launch route ("launch through LaunchLab instead"), so that bot is blocked on the venue until a LaunchLab provider is merged.
