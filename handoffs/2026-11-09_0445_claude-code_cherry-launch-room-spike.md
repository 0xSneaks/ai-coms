# Handoff — cherry-launch-room — claude-code — 2026-11-09 04:45 ET

**Session goal:** Sneaks order (chat 04:07): re-verify pump-sdk, build the sign-only spike A–D, post results, then Step 3 if it passes.
**Status:** PARTIAL — spike BUILT + on Preview; WAITING on Sneaks's tap. Step 3 not started (gated on spike PASS).
**Repo / branch:** 0xSneaks/cherry-launch-room @ `spike/sign-only` · **Last commit:** `a2a9975`

## Did
- Step 1 re-verify vs `@pump-fun/pump-sdk@4.3.1` (npm latest, read src) — VERIFIED:
  - `createV2Instruction({mint,name,symbol,uri,creator,user,mayhemMode,…})` — args now `create_v2(name,symbol,uri,creator,mayhem,[cashback],[creator_fee_bps],[is_holder_reward])`; SDK fills the trailing options. Cashback deprecated (6082). Token-2022 mint.
  - `createV2AndBuyInstructions({global,mint,…,amount,solAmount,mayhemMode})` = create_v2 + ATA idempotent + legacy buy (slippage 1%). `amount` from `getBuyTokenAmountFromSolAmount({global,feeConfig,mintSupply:null,bondingCurve:null,amount,quoteMint:NATIVE_MINT})` (object form now; pump-deck 4.0.0 used positional).
  - Fee share = TWO ixs: `createFeeSharingConfig({creator,mint,pool:null})` then `updateFeeShares({authority:creator,mint,currentShareholders:[creator],newShareholders,bondingCurveComplete:false})`. SOL-quoted only (v1). Set once (6024 FeeSharesAlreadyUpdated). Shares must sum 10 000, no duplicates, ≤10. README's `createSharingConfigWithSocialRecipients` does NOT exist in 4.3.1 dist (stale README).
  - INFERENCE: a new config's sole current shareholder = creator. Spike variant D's simulation tests it.
- Step 2 spike built — `/spike/` page, `src/spike/*`, `api/rpc.ts`. pump-sdk pinned exact 4.3.1.
  - `cherry.wallet.signTransaction` / `signAllTransactions` only, label `TEST — sign only, will not be sent`. Signed bytes dropped; mint keypair memory-only; logs variant / result / code / policyCode / byte sizes / our sim / mint co-sign check.
  - No-broadcast is enforced twice: test greps spike + api source for any send call; `/api/rpc` is an allowlist proxy (blockhash, account reads, simulateTransaction sigVerify-off) that 403s `sendTransaction` (tests).
  - Wallet signs first, then the page checks that the mint can co-sign the returned tx and all signatures verify (= the send.ts order works). Bytes then dropped.
- Preview (Vercel git preview, not production) — VERIFIED via Vercel fetch 04:44: `/spike/` 200, `/.well-known/cherry-app.json` 200 JSON right appId, `frame-ancestors` header on every path, `/api/rpc` GET → 405 JSON (function live). Added `vercel.json` framework vite / dist (project had framework null).

## State (evidence)
- Tests: `npx vitest run` → 34 passed. Typecheck clean. `vite build` OK (spike bundle 878 kB).
- Byte budget (VERIFIED, offline build.test.ts; realistic meta = 12-char name, 5-char ticker, 80-char ipfs URI; max = 32/10/93):

| Variant | Contents | Bytes (spike meta) | Bytes (max meta) | Signable |
|---|---|---|---|---|
| A | create_v2 | 858 | 896 | yes |
| B | A + reference ix | 908 | 946 | yes |
| C | create_v2 + 0.01 SOL buy (no ref) | 1203 | 1241 | yes (spike meta) |
| D | signAll: [B] + [fee share 95/5 + ref] | 908 + 854 | 946 + 854 | yes |
| E | create + buy + fee share + ref, one tx | 1667 | 1705 | NO (measure only) |
| (C + ref) | create + buy + ref | 1253 | 1291 | NO |
| (D one tx) | create + fee share + ref | 1354 | 1392 | NO |

- Spike results (Cherry): **PENDING — Sneaks's tap.** Table goes here when he pastes it.
- Simulation from this sandbox: not run (Solana RPC host blocked here; saved env `cherry-launch-room` with api.mainnet-beta.solana.com for future sessions). The page simulates every tx itself via /api/rpc before asking Cherry.

## Decided
- C drops the reference ix and D splits into two txs (one approval) because both are over 1232 B with it. — claude-code
- Variant D 5% recipient defaults to `APP_FEE_WALLET` (Sneaks's own, = tester-controlled); field to override if it equals the tester's Cherry wallet. Never broadcast, so no money risk. — claude-code
- Step 3 NOT started: order says "spike passes → Step 3".

## Next (start here)
1. **Sneaks:** portal step 6/7 → App URL = `https://cherry-launch-room-git-spike-sign-only-phantomcapais-projects.vercel.app/spike/` (temporary; switch back to the scaffold preview after) → open Launch Room inside Cherry → tap A, then B, C, D → Approve each → tap "Copy results table" → paste to claude-code.
2. claude-code: post the table on BOARD; A refused with FORBIDDEN_INSTRUCTION / DANGEROUS_INSTRUCTION / UNSTATED_ROLE → KILL. A signed → Step 3.
3. **Byte budget decision (Sneaks):** the real launch (create + buy + 95/5 fee share + reference) is 1667–1705 B. Fix options: (a) v0 tx + app-owned Address Lookup Table of Pump's fixed accounts — one-time ~0.01 SOL rent, one broadcast from a wallet Sneaks picks; reference key stays static (Cherry rule); (b) two txs per launch (create+buy, then fee share) = two approvals, and the 95/5 split is not atomic with the launch. Recommend (a). Spike D tells us whether Cherry even passes the fee-share ixs.

## Don't
- Don't add a send call to `src/spike` or loosen `/api/rpc`'s allowlist.
- Don't trust README's `createSharingConfigWithSocialRecipients` — not in 4.3.1.
- Didn't touch pump-deck, codex/scaffold, production.

## ⚠️ High-risk (wallets, signing, auth, prod, money)
- The spike asks a real mainnet wallet to sign Pump create txs. Review: `src/spike/main.ts` (no send path, bytes dropped), `api/rpc.ts` (allowlist). codex adversarial review of Step 3 comes after Step 3 exists.
