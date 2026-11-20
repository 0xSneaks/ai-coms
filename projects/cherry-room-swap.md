# BUILD BLOCK FOR KIMI: Room Swap + Dust Sweep (one engine, two Cherry listings)
Owner: Sneaks · Spec: Cherry Gap Bot · Builder: Kimi · Touch-up/art: Cherry Gap Bot (grok-bot)
Board: 0xSneaks/ai-coms → projects/cherry-room-swap.md. Claim it on BOARD.md before starting and sign off with a handoff when done.

## HARD RULES (read first)
- NO deploy, NO publish, NO spending, NO wallet signatures by you. Local build + preview only. Sneaks deploys and publishes.
- Never put "Cherry" in an app name, and never say "official", "endorsed" or "approved by Cherry".
- Never show APY, "earn", "best rate", projected returns, or "guaranteed" anywhere. No copy-trading, no auto-execution, and no paid signals. Every user signs their own swap.
- Cherry SDK only (@cherrydotfun/miniapp-sdk@^0.1.24). No connect-wallet button, no login signature, no Phantom/Jupiter wallet adapters.
- No token approvals or delegation, no durable nonces, no recurring/delayed txs (all refused below Partner).
- Receiving/fee wallet: read from env (FEE_WALLET). Never hardcode it, and never commit keys or .env files.
- Block CU, IR, KP, SD and sanctioned regions in-app.

## SHARED ENGINE (packages/swap-engine)
1. Auth: verify the launch token server-side (verifyLaunchToken + CHERRY_APP_ID, 5-min JWT). Key users by cherry_id ?? sub. Reject if JWKS is unavailable.
2. Quotes + tx: Jupiter Swap V2 `/build` (https://developers.jup.ag/docs/swap/build), with platformFeeBps=50 and feeAccount = the FEE_WALLET ATA for the fee mint (create it if missing; the user pays rent only if Sneaks approves, otherwise skip the fee on that mint). Fallback flag: `/order` + referral account (Jupiter keeps 20% of the fee). DFlow is optional backup (platformFeeBps + feeAccount).
3. Every tx: withAppReference(APP_ID) and a label of 80 chars or fewer (e.g. "Swap 1.2 SOL → BONK · Room Swap"). Fresh blockhash. Fee payer = user. Do NOT add Cherry's 10% to the tx.
4. Show before sign: input, min out, our fee as a line item in $ and %, route, and price impact. Block if price impact > 5% or the quote is stale (> 20s).
5. Caps: read the tier from the launch-token claim. Enforce the per-tx and per-wallet/day caps for that tier (Verified: $1,000/tx, $5,000/wallet/day; Unverified: $50/$50). Reset at 00:00 UTC. Never hardcode the tier.
6. Sale ledger (server DB): cherry_id, app, tx signature, input USD, fee USD, mints, timestamp, status. Credit/report only after on-chain confirmation (`confirmed`, then `finalized` reconcile).
7. RPC: Helius or Triton via the RPC_URL env var. Rate-limit and cache token metadata.

## APP 1: ROOM SWAP (working name; Sneaks picks the final name)
Pitch: drop a swap card in any room; everyone taps it and swaps from their own wallet in 2 taps.
- Loop in 10s: open the app in a room → pick a token (search or paste mint) → set a default amount → "Share to room" → members tap the card → quote → sign → done, and the card updates with "N swaps from this room" (counted from our own ledger).
- Screens: token picker, swap screen, share composer, inline blink card (cherry.share route/params ≤4KB, needs inline:render), and receipt.
- Inline blink: follow BLINKS.md (no wallet.connect; viewer wallet; fee payer = viewer).
- Room hook: cherry.room {id,title,memberCount} → per-room leaderboard of swap COUNT (not PnL) built in-app; navigate.openRoom.
- Repeat: daily streak badge for swapping from cards; "room's most-swapped token today" banner.
- Token safety: show the mint, and warn on unverified tokens via Jupiter's token list tags. Never call anything "safe".

## APP 2: DUST SWEEP (working name)
Pitch: SOL Reclaim skips accounts with dust. We sell the dust, close the accounts, and hand you the SOL.
- Loop: open → scan (getTokenAccountsByOwner for SPL Token + Token-2022) → list accounts with dust (value < $1 or user-selected) plus empty ones → "Sweep" → review → sign batch(es) → receipt card → share to room.
- Per account: Jupiter `/build` swap dust → SOL (50 bps platform fee), then closeAccount to the user. Skip: no route, frozen accounts, Token-2022 with withheld fees or close authority ≠ user, and NFTs (exclude decimals=0 with supply 1).
- Batch to fit the tx size limit (use address lookup tables from /build). Each batch is a separate signature, and progress is shown.
- Utility fee: 10% of recovered rent SOL (DAY-1 PRICE, SNEAKS TO CONFIRM), as a SystemProgram transfer to FEE_WALLET in the same tx, shown before sign as "Rent recovered X · Fee Y · You receive Z". No fee if rent recovered < 0.002 SOL.
- Copy: "estimated", never "guaranteed". Show the actual amount after confirmation.
- Room hook: "I swept N accounts, got back X SOL" share card via cherry.share. In-app room board of SOL swept.
- Repeat: "re-scan" reminder card when new dust appears (in-app only, no push spam).

## MONEY IMPLEMENTATION
- Model: Commission (both apps), declared in the portal. Room Swap: 0.50% of swap input. Dust Sweep: 0.50% on dust swaps + 10% of recovered rent (pending Sneaks's yes).
- Payment flow: launch token verified server-side first → one-time user-signed tx → withAppReference + ≤80-char label → fee is a visible line item → record in the ledger only after on-chain confirmation.
- Cherry bills 10% of our kept fee monthly (first $100 of volume free), so net is about 0.45% of swap volume.
- Caps: live tier from the token claim, enforced server-side.
- Targets: set from the Billing page after 7 days. Park line: combined fee revenue < $25 by day 14 → park.

## ACCEPTANCE TESTS (all must pass before handoff)
1. 360px phone iframe: first frame + cherry:ready in < 5s; no dead screens.
2. Launch-token verify: valid/expired/wrong-app/tampered tests, as in cherry-up-or-down server/auth.ts (reuse it).
3. Every built tx contains the app reference + a label of 80 chars or fewer; Cherry's fee is not in the tx.
4. The fee line on the review screen matches the fee in the tx exactly (unit test against the /build response).
5. Caps enforced for both tiers (unit test with mocked claims).
6. Dust Sweep: devnet or mainnet-fork test closes a dusty account and the user receives net SOL. NFTs and non-closable accounts are skipped.
7. Blink renders inline and swaps with the viewer wallet (test room).
8. No "Cherry" in names; no APY/earn/guaranteed strings (grep test in CI).
9. /.well-known/cherry-app.json on every origin; CSP frame-ancestors 'self' https://chat.cherry.fun https://cherry.fun https://*.cherry.fun; no X-Frame-Options.
10. Geo-block list enforced.

## STACK + DELIVERY
- Reuse projects/cherry-up-or-down/app patterns (Vite, server/auth.ts, domain-proof plugin, vercel.json CSP). Two listings from one repo via VITE_LISTING=swap|sweep.
- Placeholder art: leave clean slots (icon 512×512, cover 1200×630, card chrome) for grok-bot's touch-up pass. Don't ship flat CSS as final.
- Hand off: branch + handoff note listing what Sneaks must do (App IDs ×2, FEE_WALLET, RPC key, Jupiter referral account if using /order, deploy OK).

## ONLY SNEAKS CAN DO
1. Run the portal wizard twice (Commission model) → 2 App IDs.
2. Confirm FEE_WALLET and the 10% rent fee.
3. Approve deploy to test rooms, then publish.
