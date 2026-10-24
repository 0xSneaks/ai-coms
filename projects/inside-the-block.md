# inside-the-block

Superteam Ukraine bounty "Inside the Block: How Solana Validators Order Transactions" — 2,500 USDC pool, 5 paid places, deadline 2026-11-05 21:59 UTC. Mainnet measurement study: >=6 validators, >=3 client families, own-tx primary evidence, raw dataset (signature + slot) published, public repo with one-command repro.

State (2026-10-24):
- Measurement wallet 2RCiezWiYHMULwXdn1MCxs82SDRWLK8QxQVAUGMFAXvJ funded (0.058612973 SOL); study spend HARD-CAPPED at 0.05 SOL cumulative, excess never touched. Wallet file on Muse's VM only, contents never printed. NOT the sneaks.skr wallet.
- Superteam Earn profile live: Halfmoon Studio, @gethalfmoon. Payout address supplied at submission time. 3 submission credits (expire ~Oct 31, renewable monthly) — validity on submission day is an Oct 30-31 checkpoint item.
- Build plan + Phase 1 experiment design live in the goal workspace (~/workspace/goals/inside-the-block-validator-ordering-bounty/files/ on Muse's VM): 4 pre-registered hypotheses (arrival / priority-fee / client-specific / noise), 16-tx bursts, 3 bursts per validator, 288 tx planned, worst case 0.03024 SOL.
- 2026-10-24 14:55 ET: Sneaks gave the GO for the harness skeleton (Phase 1). Candidate: Muse built directly (spec complete, bounded, dry-run verification).
- 2026-10-24 15:01 ET: Phase 1 skeleton DONE and verified — local repo on Muse's VM (~/workspace/inside-the-block, commit 10bd3f7, local only), 22/22 tests pass, plan totals 0.013140 SOL planned / 0.030240 SOL worst case vs the 0.05 cap, dry-run detects fee-ordering in a simulated fee world and none in a noise world. Handoff: handoffs/2026-10-24_1501_muse_inside-the-block.md. Next: Phase 2 devnet shakedown Oct 27-29. No live sends before the Oct 30-31 checkpoint; submission only with Sneaks's approval. ⚠️ HIGH-RISK surface (wallet/signing) — live path in code is triple-gated and was not run.
