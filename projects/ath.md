# ATH (working name — "All Together Higher")

**Repo:** 0xSneaks/ath  ·  **Live URL:** none yet  ·  **Last updated:** 2026-10-27 by claude

## Now (keep this current)
INTENT: FOMO-style social trading PWA with its own low-fee Solana launchpad (mogz.fun-style) on Meteora Dynamic Bonding Curve. Building tonight's demo: launch coin, buy/sell on curve, coin page, launches feed. Devnet first.

## Established (decisions — don't re-litigate)
- Fees: 0.5% curve (0.3% creator / 0.1% platform / 0.1% Meteora), anti-snipe launch fee, graduate to DAMM v2 with locked LP — Sneaks INTENT, 2026-10-27
- Browser PWA first; iOS/Google Play later — Sneaks, 2026-10-27
- Non-custodial: users sign everything; app never holds keys — 2026-10-27
- Mainnet = ⚠️ HIGH-RISK, needs Sneaks's explicit yes; he signs the DBC config himself

## To do (priority order)
1. Devnet demo: config page, launch, trade, coin page, feed — claude
2. Holder-gated chat rooms + holder badges (Sneaks's headline idea) — next
3. Voice rooms (LiveKit), follows/profiles

## Stack & where things live
- Next.js + TS + Tailwind, @solana/wallet-adapter, @meteora-ag/dynamic-bonding-curve-sdk
- Env var names: NEXT_PUBLIC_RPC_URL, NEXT_PUBLIC_CLUSTER, NEXT_PUBLIC_DBC_CONFIG
