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
2. Quotes + tx: Jupiter Swap V2 `/build` (https://developers.jup.ag/docs/swap/build), with platformFeeBps=35 and feeAccount = the FEE_WALLET ATA for the fee mint (create it if missing; the user pays rent only if Sneaks approves, otherwise skip the fee on that mint). Fallback flag: `/order` + referral account (Jupiter keeps 20% of the fee). DFlow is optional backup (platformFeeBps + feeAccount).
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
Pitch: sell your dust instead of burning it, close the accounts, and get the SOL back. 1.5% fee, no minimums.
- Loop: open → scan (getTokenAccountsByOwner for SPL Token + Token-2022) → list accounts with dust (value < $1 or user-selected) plus empty ones → "Sweep" → review → sign batch(es) → receipt card → share to room.
- Per account: Jupiter `/build` swap dust → SOL (35 bps platform fee). Only offer SELL when quote out > swap fees + network fee; otherwise offer burn-and-close (user's choice, labeled "destroys the tokens"), then closeAccount to the user. Skip: no route, frozen accounts, Token-2022 with withheld fees or close authority ≠ user, and NFTs (exclude decimals=0 with supply 1).
- Batch to fit the tx size limit (use address lookup tables from /build). Each batch is a separate signature, and progress is shown.
- Utility fee: 1.5% of recovered rent, NO per-account minimum, same rate for SPL and Token-2022, as a SystemProgram transfer to FEE_WALLET in the same tx. Show a separate fee row before sign: "Rent recovered X · Our fee (1.5%) Y · Swap fee Z · You receive W". Floor math: fee = floor(rent × 150 / 10000).
- Competitive basis (checked 2026-11-20): Sol Incinerator charges 2% of rent with a ~40,785-lamport minimum per classic account, a flat ~74,080 lamports per Token-2022 account, and 0.5% on its swap tool; it BURNS dust (tokens destroyed). SOL Reclaim (Cherry-run) does not publish its fee and does not close dusty accounts as empty. Sources: https://docs.sol-incinerator.com/tool-guide/fees · https://cherry.fun/learn/guides/reclaim-sol-rent/
- Allowed copy: "Sell your dust instead of burning it." "1.5% fee, no minimums, fee shown before you sign." NOT allowed: naming SOL Reclaim or Cherry, or "beats"/"cheapest" claims about apps whose fees we can't verify. Re-check Incinerator's fee page before any "lower fee than Sol Incinerator" copy goes live.
- Copy: "estimated", never "guaranteed". Show the actual amount after confirmation.
- Room hook: "I swept N accounts, got back X SOL" share card via cherry.share. In-app room board of SOL swept.
- Repeat: "re-scan" reminder card when new dust appears (in-app only, no push spam).

## MONEY IMPLEMENTATION
- Model: Commission (both apps), declared in the portal. Room Swap: 0.35% of swap input. Dust Sweep: 0.35% on dust swaps + 1.5% of recovered rent, no minimums.
- Payment flow: launch token verified server-side first → one-time user-signed tx → withAppReference + ≤80-char label → fee is a visible line item → record in the ledger only after on-chain confirmation.
- Cherry bills 10% of our kept fee monthly (first $100 of volume free), so net is about 0.315% of swap volume and 1.35% of recovered rent.
- Caps: live tier from the token claim, enforced server-side.
- Targets: set from the Billing page after 7 days. Park line: combined fee revenue < $25 by day 14 → park.

## ACCEPTANCE TESTS (all must pass before handoff)
1. 360px phone iframe: first frame + cherry:ready in < 5s; no dead screens.
2. Launch-token verify: valid/expired/wrong-app/tampered tests, as in cherry-up-or-down server/auth.ts (reuse it).
3. Every built tx contains the app reference + a label of 80 chars or fewer; Cherry's fee is not in the tx.
4. The fee line on the review screen matches the fee in the tx exactly (unit test against the /build response), and the rent fee is exactly floor(rent × 150 / 10000) with no minimum, for both SPL and Token-2022.
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
2. Confirm FEE_WALLET (rates are set: 0.35% swaps, 1.5% rent, no minimums).
3. Approve deploy to test rooms, then publish.
