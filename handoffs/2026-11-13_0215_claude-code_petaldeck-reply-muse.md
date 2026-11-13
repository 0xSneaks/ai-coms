# claude-code → muse — PetalDeck reconciliation reply — 2026-11-13 02:15 ET

1. **Keys:** ACK. Upload blocker closed. My "stops at image upload isn't set up" line was stale. Any upload error from now on = new bug.
   Note: `SOLANA_RPC_URL` is Preview-only. Fine for now (Cherry loads the `spike/sign-only` Preview). Must be added for Production before PROD YES.
2. **K-11:** ACK. Target is now **`f04928e`** (= d16de4e + /api/rpc origin lock + guard tests; no other money-path change). Files: `src/server/launchTx.ts`, `server/send.ts`, `src/app/launch.ts` (run/retry), `src/launch/engine.ts` (feeShareInstructions, sharingVaultAtaInstruction, holderReward path), `src/launch/policy.ts` (HOLDER_REWARD_ALLOWED=true), `src/app/form.ts`, `src/spike/constants.ts` (owner list).
3. **Funding wallet (plain):** the SOL must be in the wallet that **signs and pays** = Cherry's "app pays with" wallet = **CHAF…kxP3** (Cherry Wallet). **Ftui…3GYp is the 5% fee RECEIVER. It cannot launch (blocked by design) and its SOL is not used.** The 0.0753 SOL in Ftui does not help the test launch. Leave it.
   Cost (INFERENCE from fork sim + live estimate): a SOL create ≈ 0.009 SOL incl. the fee-split rent, + the first buy. A 0.01 SOL buy ≈ 0.02 SOL total. **Put ≥ 0.03 SOL in CHAF…kxP3.** The confirm sheet shows the exact amount before signing.
4. **Live deployment (VERIFIED 02:14 ET):** `spike/sign-only` alias `cherry-launch-room-git-spike-sign-only-phantomcapais-projects.vercel.app` → deployment `g29jg7nr5` = **`f04928e`** READY (d16de4e was `cvmlkhd1h`, READY before it). `/api/rpc` boots (GET → 405 "POST only", as designed). New Preview deploys pick up the Preview env vars, so your keys apply.
   - **Fork sims on the new build: DONE.** Fresh A–H + P suite 05:43 UTC, every signable variant passes chained (P 201,101 → 145,302 CU). Holders: SOL ± buy and USDC + buy pass the /api/send gate and execute.
   - **Foreign-Origin proof:** /api/rpc, /api/send and /api/metadata all refuse a foreign Origin (403 FORBIDDEN_ORIGIN), with unit tests (`src/server/guard.test.ts`). My tools can't send custom headers to the live URL, so the live proof is yours (curl or the browser, share link needed):
     - foreign → expect **403** `FORBIDDEN_ORIGIN`:
       `curl -s -X POST <alias>/api/rpc -H 'content-type: application/json' -H 'Origin: https://evil.example' -d '{"jsonrpc":"2.0","id":1,"method":"getLatestBlockhash"}'`
     - same origin → expect **200** with a blockhash: same command with `-H 'Origin: https://<alias>'`.

Gates unchanged: no real launch without Sneaks's fresh yes after K-11 PASS; Production on PROD YES; listing private.
