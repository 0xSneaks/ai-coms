# Handoff — claude — cherry-launch-room — 2026-11-09 03:30 ET

**Order (Sneaks, chat 2026-11-09 03:01 ET):** "/cherry-messenger-creator make an app where people can deploy any memecoin on pump.fun — let's see how that does before adding more pads."

## Did
- Verdict **TEST**, spec filed → [projects/cherry-launch-room.md](../projects/cherry-launch-room.md).
- Read pump-deck HANDOFF.md @ `1d8cb58` (engine to reuse) and `@cherrydotfun/miniapp-sdk@0.1.24` README (npm, published 2026-11-08) — facts in the project file, labeled.
- Name check (web): no "Launch Room" Solana launchpad found. Cherry in-app search NOT done (no Cherry access) — muse, check the Cherry mini-app directory for the name before Sneaks submits.
- Made icon 512×512 + cover 1200×630 → `assets/cherry-launch-room/`.

## Decided (claude)
- Name **Launch Room** (working), slug `cherry-launch-room`. Not Pump-branded so more pads can live under it later.
- New repo; copy pump-deck core with provenance note. pump-deck stays parked (PRIORITIES.md call).
- V1 free (no app fee) → portal monetization = free.

## Next — exact first steps

### Step 1 · claude-code · SIGN-ONLY SPIKE ⚠️ HIGH-RISK (go/no-go)
Goal: learn if Cherry's wallet will sign a Pump.fun create_v2. **Nothing is ever broadcast.**
1. Minimal Vite page at `/spike` in the new repo (or a scratch branch until it exists). Cherry provider, launch-token session.
2. Build with pump-deck `adapter.ts` + `transaction.ts`: create-only `create_v2`, fresh mint keypair (memory only), fresh blockhash, creator = fee payer = `cherry.wallet.publicKey`. Mint `partialSign` before or after per what Cherry accepts — try wallet first (current send.ts order).
3. Variant B: same + reference key on a 0-lamport System transfer user→user (`withAppReference`). Variant C: create + 0.01 SOL buy (+ B's reference), measure bytes.
4. Call `cherry.wallet.signTransaction(tx, { label: 'TEST — sign only, will not be sent' })`. On success: drop the bytes, never send, never log them. Log only: variant, result code / policyCode / reason, tx byte size.
5. Post the table on the board. Any of FORBIDDEN_INSTRUCTION / DANGEROUS_INSTRUCTION / UNSTATED_ROLE on variant A = **KILL** (tell Sneaks). Fail only on B/C = design around it.
Variant D (added 03:50, owner ruling = fee share in V1): create_v2 + Pump fee-sharing setup (`updateFeeShares`, shareholders user 9000 / app 900 / Cherry treasury 100 bps — use test-only placeholder recipients the tester controls; real addresses come later) — same tx if bytes fit, else signAllTransactions. Record result code + bytes.
Don't: send, sendRawTransaction, store signed bytes, touch any wallet but the tester's own Cherry wallet.

### Step 2 · codex (scaffold/UI only — DeepSeek/OpenCode OK for pure UI, never `src/launch/`, `server/`, auth)
Vite + React shell from pump-deck. `<CherryMiniAppProvider>` on first render (handshake ≤ 5 s), 360 px dark, skeleton first frame, `vercel.json` headers: `Content-Security-Policy: frame-ancestors 'self' https://chat.cherry.fun https://cherry.fun https://*.cherry.fun`, no X-Frame-Options. `public/.well-known/cherry-app.json` = `{"appId":"<App ID>"}`. Inside Cherry: no WalletMultiButton, no signMessage. Standalone browser path = pump-deck wallet adapter, second-class. Screens per project file.

### Step 3 · claude-code or codex (money + auth)
`/api/session`: `verifyLaunchToken(token, { appId })` once → own short session (Authorization header, no cookies). Wire `CherryWalletAdapter` into `send.ts` signing; label with real amounts; reference ix per spike result; buy cap = tier limit − simulated launch cost; SDK error table → plain messages, no retry loops. Tests: wallet signs before mint, rejection quiet, expired → retry same mint, policy codes mapped.

### Step 4 · codex
Neon (muse provisions). Tables `sessions`, `launches(room_id, mint, signature, creator_wallet, cherry_id, name, symbol, image_url, confirmed_at)`. `POST /api/launches` verifies on-chain (getTransaction: success, Pump program create_v2, mint + creator match session wallet) before insert; idempotent on signature. `GET /api/rooms/:id/launches`. Share card route `/coin?mint=` renders from params.

### Step 5 · the other of claude-code/codex — adversarial review of steps 3–4.
### Step 6 · muse — Vercel preview (team phantomcapais-projects), all env on the target (PINATA_JWT, SOLANA_RPC_URL, CHERRY_APP_ID, DATABASE_URL), geoblock CU/IR/KP via `x-vercel-ip-country`, then paste evidence: `/api/health`, `.well-known` 200 JSON, frame-ancestors header, 360 px screenshot inside Cherry, typecheck/tests/build. Then tell Sneaks to press Run checks.
### Step 7 · sneaks — first real launch: create-only, then tiny buy.

## Don't
- V1 fee = creator-fee split only (90/9/1), per owner ruling 03:50; no other fees. No custody, no other pads in V1.
- No mainnet broadcast by any agent. No production deploy without Sneaks's yes.
- Don't edit 0xSneaks/pump-deck.
