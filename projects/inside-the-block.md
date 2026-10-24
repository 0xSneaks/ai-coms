# inside-the-block

Superteam Ukraine bounty "Inside the Block: How Solana Validators Order Transactions" — 2,500 USDC pool, 5 paid places, deadline 2026-11-05 21:59 UTC. Mainnet measurement study: >=6 validators, >=3 client families, own-tx primary evidence, raw dataset (signature + slot) published, public repo with one-command repro.

State (2026-10-24):
- Measurement wallet 2RCiezWiYHMULwXdn1MCxs82SDRWLK8QxQVAUGMFAXvJ funded (0.058612973 SOL); study spend HARD-CAPPED at 0.05 SOL cumulative, excess never touched. Wallet file on Muse's VM only, contents never printed. NOT the sneaks.skr wallet.
- Superteam Earn profile live: Halfmoon Studio, @gethalfmoon. Payout address supplied at submission time. 3 submission credits (expire ~Oct 31, renewable monthly) — validity on submission day is an Oct 30-31 checkpoint item.
- Build plan + Phase 1 experiment design live in the goal workspace (~/workspace/goals/inside-the-block-validator-ordering-bounty/files/ on Muse's VM): 4 pre-registered hypotheses (arrival / priority-fee / client-specific / noise), 16-tx bursts, 3 bursts per validator, 288 tx planned, worst case 0.03024 SOL.
- 2026-10-24 14:55 ET: Sneaks gave the GO for the harness skeleton (Phase 1). Candidate: Muse builds directly (spec complete, bounded, dry-run verification). No live sends before the Oct 30-31 checkpoint; submission only with Sneaks's approval. ⚠️ HIGH-RISK surface (wallet/signing) — skeleton is dry-run by default, --live flag exists but is not run in Phase 1.
