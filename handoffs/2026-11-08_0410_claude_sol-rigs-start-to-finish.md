# Handoff — claude · sol-rigs · start → finish

```text
From: Claude · 2026-11-08 04:10 ET · Post to 0xSneaks/ai-coms (handoffs/ + BOARD.md claim)

WHAT IT IS (INTENT, from Sneaks)
- Solana miner/idle game. Cherry mini-app on the Solana Seeker.
- Loop: buy seeds/rigs → they produce → SOL rewards accrue → claim or compound.
- Name not final ("SOL Miner" is taken in Cherry). Working name: SOL RIGS.
- Pattern to copy: CHERRY ROYALE (0xSneaks/cherry-royale, branch claude/cherry-royale-slots-mvp-qugokt):
  Next.js + server-side Cherry launch-token verify + Postgres ledger + CSP + .well-known file.

PLATFORM LOCK
- Chain: Solana ONLY. No EVM, no other chains, no bridges.
- Device: Solana Seeker first. Runs inside Cherry on the Seeker (Cherry = Solana wallet + mini-app host).
- Wallet inside Cherry: Cherry's own wallet via the SDK (CherryWalletAdapter / createCherrySigner).
  NO separate wallet connect inside Cherry.
- Outside Cherry (optional, later): Seeker's Mobile Wallet Adapter (Seed Vault), never browser extensions.
- Layout: Seeker screen, portrait, 360px+ wide, 44px touch targets, dark theme, safe areas.

⚠️ HIGH-RISK — REAL SOL MOVES
- Wallet, signing and payout code: Claude Code or Codex only, then an independent adversarial review,
  then Sneaks yes/no. Cheap/overflow models do NOT touch money paths.
- Build PLAY-CREDITS MODE FIRST (like Royale). Real SOL comes behind a flag, after review.

STEP 0 — SNEAKS (needs his identity, batch these)
1. Cherry portal → ☰ → Mini apps → new app "SOL RIGS". Upload icon + cover. Post the App ID +
   project ID on the board (not secrets).
2. Create repo 0xSneaks/sol-rigs (or approve an agent creating it).
3. DECIDE: where do SOL rewards come from? (fixed treasury budget / share of real revenue / play-credits only).
   ⚠️ Rewards paid out of new players' deposits = Ponzi-shaped → don't ship that.
4. DECIDE: final name.

STEP 1 — SCAFFOLD (any agent)
- Next.js app, mobile-first, Seeker portrait, dark theme, skeleton on first frame (no blank screen or spinner).
- SDK: @cherrydotfun/miniapp-sdk@^0.1.24 (+ /react, /solana).
- CSP on every HTML response: frame-ancestors 'self' https://chat.cherry.fun https://cherry.fun https://*.cherry.fun
  No X-Frame-Options.
- public/.well-known/cherry-app.json → {"appId":"<SOL RIGS App ID>"}, 200 JSON, no redirect.
- Session token in memory + Authorization header (no cookies inside the frame).

STEP 2 — SIGN-IN (Claude Code / Codex — auth path)
- isInsideCherry() → NO connect-wallet button, NO signMessage login inside Cherry (the portal test fails on either).
- Backend: verifyLaunchToken(token, { appId }) → reject wrong aud/iss, expired, wrong app_id.
- Key users by cherry_id ?? sub (NOT the wallet).
- Exchange the launch token ONCE for your own session (it lives 5 min).

STEP 3 — GAME (any agent, play credits)
- Server-authoritative: production rates, accrual and balances computed on the server, never trusted from the client.
- Ledger table, idempotent claim/compound endpoints, tests for accrual math + double-claim.

STEP 4 — REAL SOL (⚠️ Claude Code/Codex + adversarial review)
- Build for cherry.paymentWallet when set, otherwise the connected Cherry wallet.
  On WALLET_CHANGED / NOT_A_SIGNER → rebuild the tx.
- EVERY tx: show what it does + amount before signing; label ≤80 chars
  (e.g. "Buy Rig Tier 2", "Claim 0.05 SOL"); withAppReference(ix, APP_ID) on one instruction.
- Unverified tier: < $50 outflow per tx, ≤ $50 per wallet per day.
- NEVER: token approvals/delegation, authority changes, durable-nonce txs, subscriptions, hidden spread.
- Handle USER_REJECTED, POLICY_DENIED (TX_LIMIT, DAILY_LIMIT, FORBIDDEN_INSTRUCTION, APP_PAUSED,
  SIMULATION_FAILED, PRICE_UNAVAILABLE), PRECHECK_UNAVAILABLE → clear message, no retry loops.
- Fee wallet: FtuidxSaoNDeTuNTDuf9jLACVwqjgQeBwKTYC54f3GYp (sneaks.skr). Fees shown to the user before signing.
- Cherry's 10% is billed monthly to Sneaks in USDC. Do NOT put Cherry fees inside txs.

STEP 5 — COMPLIANCE
- Block CU, IR, KP in-app.
- Link the portal-hosted Terms + Privacy (URLs from SOL RIGS' own portal integration doc).

STEP 6 — DEPLOY + CHECK (Muse)
- Vercel PREVIEW first (lesson from Royale: production needs every env var set on the Production
  target, or boot = 500).
- Verify: /api/health identity configured · cherry-app.json 200 · frame-ancestors header · 360px dark.
- Seeker check: real Seeker inside Cherry → opens fast, signed in by itself, no connect button,
  tx sheet shows the label + amount.
- Then tell Sneaks: portal → paste URL → Add → Run checks → Run the test.
- Optional later: Solana dApp Store listing for Seeker. Separate submission, Sneaks's identity → batch it.

DON'T
- Don't promote to production without CHERRY_EXPECTED_ORIGIN confirmed by Cherry.
- Don't write secrets on the board. Env var names only.
- Don't start real-SOL code before Sneaks answers Step 0 #3.
```
