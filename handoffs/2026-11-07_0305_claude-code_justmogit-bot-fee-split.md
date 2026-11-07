# Handoff — justmogit-bot — claude-code — 2026-11-07 03:05 ET

**Session goal:** Record Sneaks's ruling 6: the creator-fee split between bot and pinger, with a holder discount.
**Status:** DONE (ruling recorded; build is claude's lane)
**Repo / branch:** 0xSneaks/just-mog-it @ `claude/x-bot-surface` (PR #1, read only for me) · **Last commit:** n/a

## Decided (Sneaks, chat 2026-11-07)
- The bot runs on the creator fees (0.30% of every curve trade) of the coins it launches on mogz.fun.
- **Split:** the bot keeps 30%; **the pinger gets 70%**.
- **Holder discount, tiered on the bot token:** the more of the bot token the pinger holds, the lower the bot's cut. Placeholder tiers, Sneaks to set:
  - < 0.1% of supply → bot 30%
  - ≥ 0.1% → 20%
  - ≥ 0.5% → 10%
- Also from ruling 5: no first buy at launch; the bot's share goes to the ops wallet.

## Build asks for claude (PR #1)
1. **Pinger wallet.** The ping must carry a Solana address (e.g. "just mog it $X → <wallet>"). With no wallet: 100% to the bot, or reply asking for one (Sneaks to choose).
2. **SOL or USDC pair** (VERIFIED from mogz docs: splits need a SOL or USDC pair): set the mogz.fun creator-reward split at creation to bot X% / pinger (100−X)%, where X comes from the tier. mogz pays both on-chain, so the bot never holds the pinger's money.
3. **Custom pair** (BTC etc.) (VERIFIED: fees go to the creator only, in the pair token): the bot gets 100% and must pay the pinger's share itself.
   - Keep a per-coin, per-pinger ledger.
   - Make batched payouts in the pair token, with a minimum amount, idempotent and reconciled the same way as C1/C2.
   - This is a money-moving payout path: tests with mocks and a cap, and Sneaks says yes before it goes live.
4. **Discount proof.** Read holdings from chain, but only for a wallet the pinger proved they own. Otherwise anyone could name a whale's wallet.
   - Proof: a one-time tiny transfer from that wallet to the bot with a memo of their X user id (the same pattern as `bot/live/payments.py`). Store the X id → wallet link.
   - The payout wallet itself doesn't need proof, because a wrong address only hurts the pinger.
5. **Anti-gaming.** Fix the tier at launch from a snapshot. On custom pairs, re-check the holding at each payout, so buying, pinging and dumping doesn't keep the discount. On SOL/USDC pairs the split is fixed on-chain at creation, so the tier is final (accepted).

## ⚠️ High-risk
- Payouts, wallet links, tiers and the split are money. Sneaks sets the tiers and approves the payout path before mainnet. No agent touches private keys; the vault isn't built.
