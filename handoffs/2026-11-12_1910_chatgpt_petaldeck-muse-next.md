# OWNER REQUEST → Muse: PetalDeck finish steps — 2026-11-12 19:10 ET

**From:** ChatGPT on Sneaks's direct voice instruction.
**To:** Muse (lead), with Claude Code (sole build branch owner) and independent Claude/Opus reviewer.
**Priority:** PetalDeck Preview readiness. Sneaks will tell Muse to check COMS, and Sneaks will supply remaining configuration himself. This is **not** authorization to send transactions, sign, spend, merge, or publish.

## Did
- Read live `BOARD.md`, `projects/cherry-launch-room.md`, Claude Code 18:35 handoff and ChatGPT 19:06 status correction.
- Documented precise handoff/ownership and outstanding technical gates without touching app files, Vercel, wallets, or existing agent claims.

## Current state + proof
- **VERIFIED (Claude Code project record at 18:05 ET):** Cherry signed A/B/C/D/F/H while app tier was `verified`. November 9 `DANGEROUS_INSTRUCTION` technical signer blocker **superseded**; no technical need to demand a partner-tier toggle before continued build/testing.
- **VERIFIED (Claude Code handoff at 18:35 ET, not independently re-run here):** live-mode implementation on owner-only Preview branch `spike/sign-only` at `a4acf93`, with Pinata metadata and guarded send; 135 tests and fork execution passed; **no real on-chain transaction confirmed**.
- **UNKNOWN (separate):** Cherry's public listing policy for partner-only token launchpads. Signing success ≠ permission to publish. Keep listing PRIVATE pending policy clearance and Sneaks's authorization.

## Muse — do next, in this order
1. **ACK this request on BOARD.md** with the owner of each step, available evidence, and exact outstanding blockers. Do not resurrect superseded partner-tier *technical* block. Don't touch Claude Code's claimed source branch.
2. **Guide Sneaks in Vercel UI**, project `cherry-launch-room`, to supply **only inside Vercel** (NEVER chat/COMS): `PINATA_JWT` (Pinata API key with file + JSON pin) and `SOLANA_RPC_URL` (Helius RPC key or valid URL). Configure Preview; discuss Production configuration separately with Sneaks rather than treating env setup as release permission. If either variable is already valid, verify first; do not duplicate or replace needlessly.
3. **After Sneaks confirms values are saved**, coordinate redeploy of latest `spike/sign-only` Preview, then have Claude Code confirm `/api/metadata` works (not 503), guard checks, Preview build, and one-at-a-time fork simulations. Verify `ALLOWED_ORIGINS` and Cherry-session/rate-limit protection on metadata and RPC endpoints before exposing paid quotas. Reply with deployment URL, commit, test proof; do not post secrets.
4. **Route independent K-11 money-path review** to Claude/Opus with exact commit/branch and files `src/server/launchTx.ts`, `src/app/launch.ts`, `src/launch/engine.ts`; verify allowed tx shapes, partial/retry handling, fee wallet pin, and permanent user 95% / PetalDeck 5% creator-fee share. Changes remain in Claude Code's assigned branch with independent review; no unapproved rewrite/merge.
5. After **both** technical gates are PASS, **ask Sneaks explicitly** about exactly ONE low-value real Cherry/Pump launch test (e.g. create-only, or optional 0.01 SOL first-buy if he chooses). Do not sign or broadcast without his fresh yes. Record transaction signature, confirmed mint and Solscan proof or exact failure.
6. Before public release, get explicit **Sneaks PROD YES**, verify Cherry listing-policy authorization or document UNKNOWN, then let the assigned owner coordinate promotion and evidence. Keep `LIVE_FOR_OWNERS_ONLY` and private listing until approvals.

## What Sneaks needs to do
- Tell Muse: **"Check AI COMS — read the PetalDeck Muse next-steps request from ChatGPT and walk me through the Vercel credentials. Don't publish or send a launch transaction yet."**
- Enter `PINATA_JWT` and `SOLANA_RPC_URL` into the Vercel configuration flow privately with Muse, if needed.
- Decide later on the single real test and production release **in separate explicit approvals**.

## Don't
- No credentials/URLs containing keys on GitHub or in chats.
- No unauthorized production deployment, token launch, payment, signing, or change to the 95/5 terms.
- No overlapping edits to Claude Code's branch.
- Do not equate six successful wallet signatures with a fully verified public launch.
