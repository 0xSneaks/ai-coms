# JustMogIt pilot evidence and pinger payout decision

Codex · 2026-11-07 04:00 ET · ⚠️ HIGH-RISK applies to live launches, funding and payouts.

## Did

- VERIFIED: Read the six requested files in order at [main a1cf619](https://github.com/0xSneaks/just-mog-it/commit/a1cf619bc7948de8db43a55d9a9f1e18c1a34b25) and reconciled the current AI COMS launch and fee rulings with the older Pump-first defaults. Re-ran the mock suite at that HEAD: 67 passed. Read-only mainnet queries for two existing manual Mogz launches. No new launch, spend, signature, X post, deployment or ledger code.
- VERIFIED: Both packs were already marked launched in the repo and independently confirmed with finalized Solana transaction receipts. Each debited the payer 0.02059164 SOL, including 0.00001 SOL in transaction fees. The SOL quote vault opened at zero in both receipts. Finalized `getSignaturesForAddress` on each Meteora pool and its SOL quote vault returned the create transaction alone, including the entire first 24 hours. PublicNode returned empty history even for the known creates, so it was excluded. Mogz separately shows zero holders, zero liquidity and 0% curve progress. The original campaigns' audience and outreach are UNKNOWN.

## State and proof

| Pack | Finalized create | Pool | First 24h window (ET) | Curve volume |
| --- | --- | --- | --- | --- |
| SA | [slot 464302157](https://explorer.solana.com/tx/5wuKsZyFhH7gvGAU1o15zUiFR32uxu7qkZxJHE8sGyrWNEYkDNaGA5E4DbeA5dE3EoMzUsAg3Kt5LDfHwsqQkRXq) | [BCy9…wP18](https://explorer.solana.com/address/BCy946smromhvFfxBfyeusbnwTwfcGJGQPZWH1fcwP18) | Nov 1 19:58:40 to Nov 2 19:58:40 | 0 SOL / $0 |
| TREMP | [slot 464302383](https://explorer.solana.com/tx/3SDpPWofQUkbDhhQyRRRZgNDUZYFAQeKg2CSsa2UCfzkrHXHvh7BsQNWTAGkpV7QkYakuzFvyqXgdA797teaVfQg) | [Aooe…kPxU](https://explorer.solana.com/address/AooePAAWXvEBbF9Rzrge6imDSRGgDd9RZGAoEvpWkPxU) | Nov 1 19:59:28 to Nov 2 19:59:28 | 0 SOL / $0 |

- VERIFIED: [SA Mogz page](https://mogz.fun/coin/5kDrkzSEGH8jJK2ibjFDX2QEHVuUzPNuRc7eVUpVrzSM) and [TREMP Mogz page](https://mogz.fun/coin/EarneMetyCsEqac2EEiLUh3VdR6bMre6cqM9rftNc6jB) report creator mode. Actual first-day creator fees were zero. Under either hypothetical split, pinger and bot each earn zero.
- VERIFIED math: At a standard 0.30% curve creator fee, pinger/bot effective rates are 0.21%/0.09% at 70/30 and 0.15%/0.15% at 50/50. Using ~$1.94 create cost from the packs, before ops costs and with no upfront payment, the bot covers create at ~$2,156 vs ~$1,293. At $650 volume, bot receives $0.585 at 70/30, so ~$650 is only gross-fee parity before the pinger share. A modeled $1 pinger minimum requires ~$476.19 vs ~$666.67. If 0.02 SOL were collected, it would leave 0.00059164 SOL of the observed create debit plus ops costs to cover. The live fee policy is not inferred from the analysis.
- VERIFIED docs: [Mogz custom pairs](https://mogz.fun/docs/custom-pairs) explicitly documents splits among wallet recipients in the quote token even on custom pairs. SOL/USDC is required for charity, not wallet splits. [Mogz rewards](https://mogz.fun/docs/how-it-works) says Mogz pays split claims from a platform wallet. This corrects the custom-pair-ledger premise in the [03:05 ET handoff](2026-11-07_0305_claude-code_justmogit-bot-fee-split.md). Automated split configuration and a real claim have not been tested.

## Decided

- INFERENCE: NO-GO for ledger, Privy, or a launch-fee-funded payout business based on this sample. The historical runs clear neither gate. One-step pings can coexist with a wallet already linked to the stable X user ID if a future test needs a fixed native split at creation. Keep holder rewards separate from pinger attribution. No owner policy was changed.

## Next

- INTENT: A future owner-approved test starts with a named audience and a share page with the exact mint. Measure first-day unique independent buyers, quote-denominated swap volume, net curve reserves and actual creator fees. Only revisit a payout after real demand, then validate the native 70/30 wallet split and one claim before adding custody. Use the actual all-in launch cost and upfront fee, if any, in the next economics check.

## Don't

- No duplicate TREMP/SA launch, self-trading, ledger, Privy onboarding, sweep, funding or other mainnet writes. No inference that past launches validate the X bot or its claim path. Unrelated inbox work was deferred for this direct owner review.
