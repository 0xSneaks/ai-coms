# ORE Paper-Mining Rig — built, verified, running (Blue-7, 2026-11-16)

**Owner decision:** "Paper-only first — $0 at risk" (2026-11-16), restarted on "Go ahead."
**Hard limits honored:** read-only RPC + public price API only. No wallet, no keypairs, no signing, no transactions, no spend.

## What was built — `~/workspace/ore-paper-rig/`

- `tracker.py` — polls the ORE v3 Board + Round accounts on mainnet (Helius RPC, URL read from muse-maestro/.env, never printed), decodes them from the program's published layouts, and appends one record per settled round to `rounds.jsonl` (pool, per-tile SOL, miners/tile, winning tile, split/solo, prices, both strategies' simulated P&L). Restartable via `state.json`; append-only log.
- `summary.py` — aggregates the log into paper P&L totals.
- `README.md` — mechanics, strategy definitions, run instructions, first results, honest verdict.
- Status at sign-off: **tracker running** (resumed after the VM runtime restart; price fetch hardened with retries after transient proxy IncompleteReads).

## Verification (all VERIFIED against source + chain)

- Program id `oreV3EG1i9BEgiAJ8b177Z2S2rMarzak4NMv1kULvWv`, Board/Round layouts, fee formula (1% admin on all tiles + 10% protocol fee on losing tiles), split/solo mask, and the 10% refining fee on unrefined ORE — all read from `regolith-labs/ore` (master): `api/src/state/{board,round,miner}.rs`, `program/src/{reset,checkpoint,claim_ore}.rs`.
- My pure-Python PDA derivation reproduces the published Board address exactly (self-test).
- The simulator's fee model reproduces on-chain `protocol_fee` and `total_returned` **to the lamport on 34/34 settled rounds**.
- ORE price verified live from DexScreener throughout ($84.52–$87.17 during the window; ≈1.21 SOL).

## First results — 34 consecutive rounds, 477100–477133 (2026-11-16 12:10–12:52 UTC)

Field: ~17.78 SOL deployed/round, ~222 unique miners/round, deployments nearly uniform across tiles (0.716–0.724 SOL/tile).

| Paper (0.25 SOL/round, 8.50 SOL total) | A: even split, all 25 tiles | B: even split, 5 least-deployed tiles |
|---|---|---|
| SOL returned | 7.5982 (89.4%) | 2.1419 (25.2%) |
| ORE earned (post-refining-fee) | 0.4239 ORE (= 0.5120 SOL) | 0.1194 ORE (= 0.1434 SOL) |
| **Net paper P&L** | **−0.3898 SOL (−$27.51)** | **−6.2147 SOL (−$438.56)** |
| Profitable rounds | 0/34 | 2/34 (hits paid +0.89 SOL each) |

## Verdict

Both shapes lose. The ~10.5%/round fee rake exceeds the ORE leg's value at ORE ≈ $85; even-split break-even needs ORE ≈ $150 (SOL/pools unchanged). B is the same negative EV with lottery variance (ran cold: 2 hits vs ~7 expected). **Real mining is not recommended** unless ORE re-rates materially or pools thin out — the tracker keeps logging, so any shift is visible in `summary.py` within an hour.

Caveats: ORE accounted at expected value (solo rounds are all-or-nothing in reality; EV identical). Two backfilled records (477134–477135, logged during the runtime-restart gap) carry `ore_price_usd: null` and value ORE at 0 — they sit outside the reported window and are self-flagging in the log.
