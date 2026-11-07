# Handoff — justmogit-bot — claude-code — 2026-11-07 14:45 ET

**Session goal:** Fill the "Pump-specific payout wiring UNKNOWN" gap in [codex's venue update](2026-11-07_0601_codex_justmogit-pump-venue.md), so ruling 6 (bot 30% / pinger 70%) works on Pump.fun.
**Status:** DONE (design note; build is claude's lane; X payout needs one live test that only Sneaks can approve)
**Repo / branch:** 0xSneaks/just-mog-it @ `claude/x-bot-surface` (PR #1, read only for me) · **Last commit:** n/a

## Sneaks said (chat 2026-11-07)
- A weekly payout "would die". Pingers don't need to be sent fees; they need **a way to claim** them.
- He asked whether pump.fun can pay an X handle, so the bot launches and the pinger's name is attached right away.
- "You can pair any pair on pump."

## Facts from pump-public-docs (VERIFIED unless labelled)
- **Pairs.** `create_v2` takes a quote mint that is SOL, USDC, another mint on Pump's supported list, or any pump coin. Pump-coin chains go at most 2 deep and must end at SOL, USDC or a listed mint. An unlisted SPL token fails (error 6063 UnsupportedQuoteMint). So Sneaks is mostly right: any listed or pump-native quote works, but not every token.
- **Fee sharing.** `create_fee_sharing_config` + `update_fee_shares_v2`: at most 10 shareholders, shares add up to 10,000 bps, and admin is revoked after one update. That locks the split for good. `distribute_creator_fees_v2` is permissionless and works for non-SOL quotes too.
- **X handles.** The fee program (`pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ`) has a social fee PDA with seeds `["social-fee-pda", user_id, platform]`. The IDL says platform 0 = pump, 1 = twitter. Claims (`claimSocialFeePda`) are co-signed by Pump's social-claim authority, so the pinger claims on pump.fun after logging in with X.
- UNVERIFIED: whether Pump accepts X today. Older Pump docs supported GitHub only and warned other platforms could lock fees. A third-party tool (uPay) says X works now.

## Proposed wiring (INTENT; Sneaks to confirm)
1. Ping → bot builds `create_v2` (narrative pair per ruling 4) + `create_fee_sharing_config` + `update_fee_shares_v2` in the launch flow. Bot wallet share = 30% minus the holder-tier cut (ruling 6). Pinger's X social PDA share = the rest. Admin is revoked at once, so the split can't be changed later.
2. The pinger claims on pump.fun with their X login whenever they want. The bot never holds pinger money, and there's no ledger and no weekly send.
3. The bot (or anyone) calls `distribute_creator_fees_v2` to push accrued fees into the shares.
4. Fallback if X doesn't work: same split with the pinger's wallet as shareholder. The pinger registers a wallet with `@justmogit_bot claim <wallet>` from the same X account before launch, or the bot holds the 70% in a ledger until they do. That costs more to run and carries custody risk.
5. Code changes for claude: `bot/pumpguard.py` must allow `create_v2` and the two fee-sharing instructions, with an allowlist and no generic pass. Ruling 6's mogz on-chain split clause is replaced by this note. Tier snapshot at launch stays.

## Cost (from third-party sources, not Pump's own docs)
- Rent: about 0.006 SOL for the sharing config and about 0.0016 SOL per X fee account, per launch, on top of the create cost.

## ⚠️ High-risk (Sneaks only)
- **One live test** to prove X claims: a tiny launch with fee sharing to a test X account, then a claim from that account. It spends real SOL, so it needs Sneaks's explicit yes. No agent ran it.
- Mainnet go-live, wallets, ops-wallet top-up and caps stay with Sneaks. No agent touches private keys.

## Open questions for Sneaks
- Holder tier sizes (placeholders ≥0.1% → 20%, ≥0.5% → 10% bot cut).
- What happens to unclaimed fees, and when.
- Whether to run the X-claim test.
