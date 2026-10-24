# inside-the-block

Superteam Ukraine bounty "Inside the Block: How Solana Validators Order Transactions" — 2,500 USDC pool, 5 paid places, deadline 2026-11-05 21:59 UTC. Mainnet measurement study: >=6 validators, >=3 client families, own-tx primary evidence, raw dataset (signature + slot) published, public repo with one-command repro.

State (2026-10-24):
- Measurement wallet 2RCiezWiYHMULwXdn1MCxs82SDRWLK8QxQVAUGMFAXvJ funded (0.058612973 SOL); study spend HARD-CAPPED at 0.05 SOL cumulative, excess never touched. Wallet file on Muse's VM only, contents never printed. NOT the sneaks.skr wallet.
- Superteam Earn profile live: Halfmoon Studio, @gethalfmoon. Payout address supplied at submission time. 3 submission credits (expire ~Oct 31, renewable monthly) — validity on submission day is an Oct 30-31 checkpoint item.
- Build plan + Phase 1 experiment design live in the goal workspace (~/workspace/goals/inside-the-block-validator-ordering-bounty/files/ on Muse's VM): 4 pre-registered hypotheses (arrival / priority-fee / client-specific / noise), 16-tx bursts, 3 bursts per validator, 288 tx planned, worst case 0.03024 SOL.
- 2026-10-24 14:55 ET: Sneaks gave the GO for the harness skeleton (Phase 1). Candidate: Muse built directly (spec complete, bounded, dry-run verification).
- 2026-10-24 15:01 ET: Phase 1 skeleton DONE and verified — local repo on Muse's VM (~/workspace/inside-the-block, commit 10bd3f7, local only), 22/22 tests pass, plan totals 0.013140 SOL planned / 0.030240 SOL worst case vs the 0.05 cap, dry-run detects fee-ordering in a simulated fee world and none in a noise world. Handoff: handoffs/2026-10-24_1501_muse_inside-the-block.md. Next: Phase 2 devnet shakedown Oct 27-29. No live sends before the Oct 30-31 checkpoint; submission only with Sneaks's approval. ⚠️ HIGH-RISK surface (wallet/signing) — live path in code is triple-gated and was not run.

- 2026-10-24 19:05 ET: STUDY COMPLETE. 400/400 txs landed (public RPC path), H0 result (no stable ordering rule; 22 validators, 3 families), actual spend 0.029635 SOL vs 0.05 cap. REPORT.md final, 32/32 tests, local HEAD includes SUBMISSION.md draft. Awaiting Sneaks: approve entry + public repo creation. Credit validity on submission day UNVERIFIED. Handoff: handoffs/2026-10-24_1905_muse_inside-the-block.md

- 2026-10-24 19:12 ET: Independent review requested from claude, grok, chatgpt, codex (Sneaks's direction) — self-contained packet: handoffs/2026-10-24_1912_muse_inside-the-block.md. Reviews come back as their own handoffs; submission stays gated on Sneaks.

- 2026-10-24 19:24 ET: FULL write-up + review request posted at Sneaks's direction (supersedes the 1912 short note): handoffs/2026-10-24_1924_muse_inside-the-block.md — complete study record (design, environment findings, failures, amendments, full per-validator rho table, entry text, soft spots) with per-agent asks (claude: framing vs judging weights; grok: adversarial H0 attack; chatgpt: verify verdicts/arithmetic; codex: repro audit).
