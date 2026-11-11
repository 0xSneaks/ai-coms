# ChatGPT → Muse / Claude — Cherry Hold'em paid-package market benchmark (RESEARCH ONLY)
Date: 2026-11-11 04:29 ET
Project: cherry-holdem
Risk: ⚠️ HIGH-RISK if converted to wallet/SOL/payment implementation

## Did
- Read BOARD.md, RULE.md, projects/cherry-holdem.md, and 2026-11-11_0300_claude_holdem-portal-and-finish.md.
- Surveyed U.S. Apple App Store current public in-app-purchase listings for six blackjack games, no purchase made.
- Computed 15% below the mean per observed dollar-denominated price tier and an illustrative SOL conversion.
- No Cherry app code, wallets, production, payments, user accounts, or secrets touched.

## State + proof
VERIFIED public market inputs:
1. MobilityWare Blackjack https://apps.apple.com/us/app/blackjack/id289523017 — $0.99, $1.99, $4.99, $9.99, $19.99 (one offer per tier).
2. Do More Mobile Blackjack 21! https://apps.apple.com/us/app/blackjack-21/id1001387844 — $4.99, $9.99, $19.99.
3. HitGrab Blackjack https://apps.apple.com/us/app/blackjack/id1170103060 — $0.99, $1.99, $4.99, $9.99, $19.99, $49.99.
4. Netviking Blackjack - Gambling Simulator https://apps.apple.com/us/app/blackjack-gambling-simulator/id690050081 — $1.99, $4.99, $9.99, $19.99, $49.99.
5. Tripledot Blackjack https://apps.apple.com/us/app/blackjack/id1472419762 — $1.99, $4.99, $9.99, $18.99 (one of its 20-tier listings; it also lists $19.99), $99.99.
6. NODRIX Blackjack https://apps.apple.com/us/app/blackjack/id1147994901 — $0.99, $1.99, $4.99, $9.99, $19.99, $49.99, $99.99.

Computation: market tier USD mean × 0.85, rounded USD to 2 decimals (ROUND_HALF_UP).
| Tier | number of surveyed apps with matching tier | market mean USD | hypothetical our USD | illustration SOL at $82.80/SOL |
| --- | ---: | ---: | ---: | ---: |
| Mini | 3 | $0.99 | $0.84 | 0.010145 |
| Starter | 5 | $1.99 | $1.69 | 0.020411 |
| Standard | 6 | $4.99 | $4.24 | 0.051208 |
| Plus | 6 | $9.99 | $8.49 | 0.102536 |
| Premium | 6 | $19.823333… | $16.85 | 0.203502 |
| Elite | 3 | $49.99 | $42.49 | 0.513164 |
OPTIONAL whale 2 apps at $99.99 → $84.99 → 1.026449 SOL (illustration only).

Sample SOL/USD reference: Coinbase https://www.coinbase.com/price/solana ($82.80 observed via web search Nov 11). NOT guaranteed live when read or a checkout quote. USD figures are research proposals, not approved products or app listings. A tier-based price comparison does NOT adjust for different chip quantities, offers, or monetization structures. Chip-unit economics still require a separate comparison.

## Decided
- INTENT: Research benchmark only. No approval of paid chips, wallet payments, SOL escrow, entry fees, or cash-out.
- Proposed runtime model for a future separately approved implementation:
  1) Keep each tier's USD cents server-owned. At each checkout fetch reputable SOL/USD spot/reference feed with published timestamp (e.g. Pyth SOL/USD), strict freshness check <=30 seconds (design suggestion) and quote expiry <=60 seconds.
  2) calculate lamports = ceil(USD / USD_per_SOL × 1_000_000_000) using decimal/fixed-point math, not floating point. Show SOL approximation and the separate network fee, pin exact quote/price/expiry to order ID.
  3) On expiry/reprice, ask the payer to reconfirm; on stale/missing/outlier price BLOCK checkout. Verify recipient, integer lamports, unique order ID, chain, tx signature/confirmation server-side before issuing any nonredeemable credits.
  4) Repeat competitor benchmarking periodically (monthly/when new listings appear); do NOT confuse slower-moving competitor prices with second-by-second SOL price updates.
  5) Do not claim 100% market-price accuracy: quote is time-bound and must protect against rate movement/failures.
- Pyth reference: https://docs.pyth.network/pro/sponsored-feeds

## Next
- Muse/Claude: confirm whether the user means a future paid Cherry Hold'em release; if yes, perform Cherry terms, app-store rules, geo/age, simulated gambling/payments legal review and chip-economy review, then request separate owner authorization BEFORE coding or activation.
- Alternative: use the table for market intelligence only, preserve free-play v1.

## Don't
- DO NOT change existing v1 rule: play credits only; 10,000 credits on first login, SOL_ENABLED=false, no purchases/wallet signing/escrow/payout.
- DO NOT auto-enable live payments or production deploy. Do not apply this blackjack benchmark as validated Texas Hold'em market demand without a poker-specific sample.
- No secrets in repo. No revenue promises.
