# Handoff — cherry-launch-room (PetalDeck) — claude-code — 2026-11-12 17:45 ET

**Session goal:** fix 3012 / IncorrectProgramId on A–H, guard the 5% recipient, pick attribution + production flow, write docs/launch-flow.md, make the test page re-signable; then (Sneaks, mid-session) make sure nobody sees the test page in Cherry, only the real "Create new coin" app.
**Status:** DONE (code + sim). Waiting on Sneaks: portal URL change + re-sign taps.
**Repo / branch:** 0xSneaks/cherry-launch-room @ `claude/quirky-sagan-wxf7a7` (built on `claude/petaldeck-launch-flow` @ 9caba42, which took over that claim) · **Last commit:** `7a9e550`
**Preview:** https://cherry-launch-room-git-claude-qui-cf6e25-phantomcapais-projects.vercel.app/

## Did
- 3012 = Anchor AccountNotInitialized on `mint`: the fee-share tx was simulated before tx 1's coin exists. Every fee-share tx fails alone and passes chained on a LiteSVM mainnet fork. VERIFIED (`npm run sim`, 22:39 UTC).
- F IncorrectProgramId = same artifact (Token-2022 ATA create for a mint that doesn't exist yet). Programs pinned by test: pump mint ATA = Token-2022, USDC = SPL Token (`src/launch/engine.test.ts`). VERIFIED.
- REAL BUG under it: `update_fee_shares_v2` pays from the quote ATA of `creatorVault(sharingConfig)`, which nothing created → `InvalidAccountData` on every token-quoted coin (F, H), with or without a buy. Fix: `sharingVaultAtaInstruction` in `src/launch/engine.ts` (+10 B). VERIFIED by fork re-sim.
- Intruder buy between tx 1 and tx 2 does not break tx 2 (SOL + USDC). VERIFIED (fork).
- Guard: recipient == signer is BLOCKED on the test page (no silent swap); the second wallet is prefilled visibly when signed in as the fee wallet; the real app tells the user to switch Cherry's pay-with wallet. Engine already refuses. VERIFIED (tests).
- New harness variant P = exact production shape.
- docs/launch-flow.md: production pick, full results table, attribution decision, rejected list.
- Test page hidden: `/debug/` and `/spike` → `/` (real app) unless `?harness=1`. Only owner wallets see buttons even then. VERIFIED on Preview (`/spike` served the app HTML).
- Fixed `/api/config` 500 (FUNCTION_INVOCATION_FAILED on every Preview, pre-existing: unbundled @solana/web3.js on Vercel). Fixed by bundling it like /api/sim (`server/config.ts` → `api/config.js`). Without it the app stopped at Create coin.

## State (evidence)
- Fork sim (fresh, chained): A 119,571 · B 110,721 · C 196,514 · D 101,721 → 146,778 · F 122,535 → 174,089 → 200,784 · G 258,321 → 140,778 · H 136,355 → 232,135 · H(3NZ9…qmJh) 125,855 → 181,135 · P 208,480 → 152,774 CU. E = 1667 B, measure only. All ok.
- typecheck ✓ · lint 0 errors (2 old warnings) · vitest 120/120 ✓ · `npm run build` ✓.
- Deployed: branch Preview only. Production (main @ 30581e5) has NO app code. Nothing broadcast, ever.

## Decided
- Production flow = P: [create_v2 + optional SOL buy] → [fee share 95/5 + ref], one `signAllTransactions` approval. No buy = D shape. (Sneaks approval of live send: NO, not asked.)
- Attribution: ref key on the fee-share tx only. Cherry README §13: ref is attribution only, never billed from it. Tx 1 has no room (1203 B + 50 > 1232).

## Next (start here)
1. ~~Sneaks changes portal URL~~ NOT NEEDED (17:55 ET): portal loads `spike/sign-only` /spike/. With Sneaks's OK, `spike/sign-only` was FAST-FORWARDED cab60a7 → 7a9e550 (no history lost), so the existing portal URL now serves the real app (/spike → /).
   Sneaks chose: listing back to PRIVATE until Cherry confirms Partner tier (he flips it in the portal).
2. Sneaks: in Cherry, switch "app pays with" from Ftui…3GYp (the fee wallet) to BGa7…YD7R. Ftui can never launch (it would pay itself the 5%).
3. Sneaks re-signs at `/?harness=1`: P, G, F, H, D (A/B/C unchanged). Paste the copied table on the board.
4. Merge to main only on Sneaks's yes (PR not opened).

## Also verified (17:55 ET)
- Full app flow at 360 px with live mainnet reads (Playwright): form → buy sheet → confirm sheet; 0 px horizontal overflow; cost ≈ 0.1087 SOL for a 0.1 SOL buy (matches the zip); no page errors.

## Don't
- Don't trust plain per-tx RPC sim for tx 2+: it always shows 3012. Use `/api/sim` or `npm run sim`.
- Don't add a sweep ix to the fee-share tx: not needed (intruder test) and costs bytes.

## ⚠️ High-risk (wallets, signing, auth, prod, money)
- Money path changed: `src/launch/engine.ts` feeShareInstructions (token pairs now add an ATA create). Needs D5 review + independent Opus cross-check before any live mode.
- Live send/broadcast: not built, not authorized.
