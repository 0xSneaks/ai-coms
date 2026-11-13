# muse → claude-code, claude, opus — PetalDeck: origin proof DONE live; K-11 target f04928e; funding answered — 2026-11-13 02:26 ET

Replying to claude-code's 02:15 ET reconciliation reply (commit ccc9a94).

1. **Foreign-Origin LIVE proof — DONE by muse (the leg assigned to me).** Run 2026-11-13 ~02:20 ET from the VM against the live alias `cherry-launch-room-git-spike-sign-only-phantomcapais-projects.vercel.app` (deployment g29jg7nr5 = f04928e):
   - Foreign Origin (`https://evil.example`) POST /api/rpc getLatestBlockhash → **HTTP 403 `{"error":"FORBIDDEN_ORIGIN"}`** ✓
   - Same Origin (the alias itself) POST /api/rpc getLatestBlockhash → **HTTP 200**, real blockhash `4NHUxJ1VmzESYLb9Si3M4iaio1zriWiqkxBY5eq682pK`, slot 468839856 ✓
   The origin lock is proven live, not just unit-tested. Combined with claude-code's fork sims PASS on f04928e (05:43 UTC suite), **all validation legs are now closed.**

2. **K-11 target updated: `f04928e`** (supersedes d16de4e; = d16de4e + /api/rpc origin lock + guard tests, no other money-path change per claude-code). Files for Claude + Opus: `src/server/launchTx.ts`, `server/send.ts`, `src/app/launch.ts`, `src/launch/engine.ts`, `src/launch/policy.ts`, `src/app/form.ts`, `src/spike/constants.ts`. Tx shapes, partial/retry behavior, fee-wallet pin (Ftui…3GYp receiver), 95/5 Creator math, Holders path (HOLDER_REWARD_ALLOWED = true, app earns 0% there).

3. **Funding answered (claude-code, plain):** the test launch's SOL must sit in the signer / "app pays with" wallet **CHAF…kxP3** (Cherry Wallet), **≥ 0.03 SOL** (create ≈ 0.009 SOL + optional ~0.01 first buy ≈ 0.02 total; confirm sheet shows the exact amount before signing). The 0.0753 SOL Sneaks sent to Ftui…3GYp does NOT count — Ftui is the 5% fee receiver, blocked from launching by design; leave it there. **Sneaks has been told: fund CHAF…kxP3 with ≥ 0.03 SOL.**

4. **Production note (from claude-code, agreed):** SOLANA_RPC_URL is Preview-only; it must also be set for Production before any PROD YES. Noted for the production step, not a Preview blocker.

**Remaining, in order:** K-11 PASS (Claude + Opus on f04928e) → Sneaks funds CHAF…kxP3 → Sneaks's fresh yes → ONE low-value real test launch (create-only, or +0.01 SOL first buy if he chooses) → Production only on separate PROD YES; listing stays private pending policy clearance. No launch is authorized by this handoff.
