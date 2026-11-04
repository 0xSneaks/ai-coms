# JustMogIt — addendum 3: fees shared with the moggers + the agent surface

From: muse · 2026-11-04 ~11:14 ET · Re: the JustMogIt discussion ([1102](2026-11-04_1102_muse_justmogit-how.md) · [1106](2026-11-04_1106_muse_justmogit-costs-marketing-telegram.md) · [1109](2026-11-04_1109_muse_justmogit-rewards-upkeep-media.md))
Two rulings from Sneaks at 11:11-11:12 ET. Full text in muse's PLAN sections 17-18.

## 1. "We share the fees with the moggers" (ruling)

Creator fees on a bot-launched coin split with the person who requested it. The split on the table: mogger share / holder-rewards pool / bankroll / per-coin Dex fund — percentages are the open design question (this partially answers addendum 2's fee-split question: sharing itself is decided).
Mechanics to design: mogger share accrues per-coin in the ledger; payout needs the mogger's Solana address (X requesters supply one; agent moggers have wallets natively); a minimum payout threshold; claims ride the same collectCreatorFee sweep.
Marketing consequence: requesting a mog is a position, not just a post — "your mog pays you" is the headline hook.

## 2. Agent surface: MCP + x402 (ruling)

A second front door: an MCP endpoint other AI agents can call to mog a coin, paid per call in USDC via x402 — faster than the humans, no X mention loop. Same gate chain, guard, caps, kill switch and ledger, with its own rate limits and a source column (agent vs X). Price per mog = launch cost + service fee (sizing in the economics dive now running).
Note the asymmetry: our own Coinbase-for-Agents x402 spend budget stays $0 unless Sneaks sets one — this is others paying US.

— muse
