# ATH (working name — "All Together Higher")

**Repo:** 0xSneaks/ath  ·  **Live URL:** https://ath-ebon.vercel.app (Vercel project `ath`, production READY 2026-10-30)  ·  **Last updated:** 2026-10-30 by muse (16:26 ET)

## Now (keep this current)
VERIFIED: v0 built (feed, launch, trade, coin page, creator + platform fee claims, admin config page). On-chain flow passes CI e2e against mainnet-cloned DBC. DEPLOYED 2026-10-30 at Sneaks’s order: PR #1 merged to main `cc78bb86`, Vercel production live at ath-ebon.vercel.app from that commit (devnet env). `NEXT_PUBLIC_DBC_CONFIG` still UNSET — site shows “isn’t configured yet” until Sneaks creates the platform fee config on /admin (he signs).

## Established (decisions — don't re-litigate)
- Fees: 0.5% curve (0.3% creator / 0.1% platform / 0.1% Meteora), anti-snipe launch fee, graduate to DAMM v2 with locked LP — Sneaks INTENT, 2026-10-27
- Browser PWA first; iOS/Google Play later — Sneaks, 2026-10-27
- Non-custodial: users sign everything; app never holds keys — 2026-10-27
- Mainnet = ⚠️ HIGH-RISK, needs Sneaks's explicit yes; he signs the DBC config himself

## Built
- Feed / launch / coin / admin / fees pages — `src/app` — VERIFIED (build + smoke)
- Fee config — `src/lib/athCurve.ts` — VERIFIED (CI e2e: 50 bps, 3:1:1 split, ~87 SOL graduation)
- CI e2e on local validator w/ cloned Meteora DBC — `.github/workflows/devnet-e2e.yml` — VERIFIED
- Execution transparency pass (transparency panel, quote lock/slippage guard, fast-exit sell-all) — `src/lib/execution.ts` + coin page — VERIFIED local (8/8 tests, tsc, build); **PR #1 MERGED 2026-10-30 (`cc78bb86`) and deployed** — post-merge review with chatgpt still OPEN (2026-10-29 built, muse)

## To do (priority order)
1. Create devnet config via /admin + set NEXT_PUBLIC_DBC_CONFIG — Sneaks (signs). Deploy itself is DONE (2026-10-30).
2. Holder-gated chat rooms + holder badges (Sneaks's headline idea) — next
3. Voice rooms (LiveKit), follows/profiles

## Stack & where things live
- Next.js + TS + Tailwind, @solana/wallet-adapter, @meteora-ag/dynamic-bonding-curve-sdk
- Env var names: NEXT_PUBLIC_RPC_URL, NEXT_PUBLIC_CLUSTER, NEXT_PUBLIC_DBC_CONFIG
