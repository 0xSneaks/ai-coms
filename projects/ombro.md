# Ombro

**Repo:** 0xSneaks/ombro (private)  ·  **Live URL:** none (design preview = claude artifact "Ombro Launchpad")  ·  **Last updated:** 2026-10-28 by claude

## Now (keep this current)
Monero (wXMR) version of sapling.cash: pump.fun coins quoted in wXMR, PDA creator splits fees on chain. Phase 0 gate check CLEARED (GLM, reviewed by claude). Repo seeded: README, docs/PHASE0.md, CLAUDE.md, web/preview/index.html. Phase 1 not started.

## Established (decisions — don't re-litigate)
- Name "Ombro" (Esperanto "shadow"), token $OMBRO; own brand/copy, nothing copied from Sapling — 2026-10-28, claude (Sneaks may rename)
- Quote asset wXMR (WXMRyRZhsa19ety5erZhHg4N3xj3EVN92u94422teJp); in/out via wxmr.io bridge — 2026-10-28, claude
- Fee split INTENT 2% → 0.50 LP (burned) / 0.50 burn $OMBRO / 0.20 treasury / 0.80 creator's choice; halve if pump caps custom-pair fee at 1% — 2026-10-28, claude
- Launch scope: Phantom/Solflare first; Monero-wallet passkey accounts week 3+ — 2026-10-28, claude
- Opus-class only on program/keeper/payout code; GLM/cheap models on web/ and docs — Sneaks's standing rule

## Built
- Phase 0 gate report — Seeker ~/wxmr-gate/REPORT.md (GLM) — VERIFIED (exists per GLM; claude reviewed text)
- Seed docs + static preview — 0xSneaks/ombro@c78a460 — VERIFIED (pushed)

## To do (priority order)
1. Copy ~/wxmr-gate/REPORT.md into ombro/docs/REPORT-glm.md — muse
2. Day-1 (Opus/Claude Code): read pump custom-pair creator-fee cap + is_holder_reward behaviour for non-SOL quotes; BridgeConfig fee; forked-mainnet harness; PDA-creator create_v2 → buy/sell → collect_creator_fee_v2 in fork. STOP and report. (prompt in handoff)
3. ⚠️ Tiny mainnet smoke test (~0.05 SOL) — needs Sneaks yes
4. Vault program (split, payee modes, LP pot, rewards) + keeper/indexer — Opus
5. Port web/preview to Next.js + live data — GLM

## Known issues / gotchas
- ⚠️ wXMR bridge = single operator key Ds4prSZNwyxTz4PZmHXoHDXFzLZ1c8MkfhUwGtqvAvpK (upgrade authority + relayer); custodial
- Bridge min 0.1 XMR each way → exits < ~0.6 SOL can't cash out to native XMR
- wXMR does not exist on devnet → test on a mainnet fork (surfpool/litesvm)
- Competitor xmrpad.app already ships wXMR-quoted pump coins

## Stack & where things live
- Solana (Anchor), pump.fun create_v2 / buy_v2 / sell_v2, PumpSwap, Jupiter lite API, wxmr.io bridge (client ref: github.com/neroswap/nero lib/bridge.ts)
- Env var names TBD (RPC_URL, HELIUS_API_KEY)

## mogz gate — Stealthpad (2026-11-03, muse)

Sneaks named the project **Stealthpad** (2026-11-03 13:48 ET). New repo: 0xSneaks/stealthpad. No Ombro branding anywhere.

- **Custom quote token on mogz? VERIFIED yes.** Create page "Pool liquidity pair" → Custom, paste any mint (mogz docs /docs/custom-pairs, updated 2026-10-14). Pair checks: no freeze authority, supply > 0, ≤12 decimals; max 5 new pairs/day per wallet.
- **wXMR allowed? VERIFIED yes — already listed.** Live `GET /api/tx/create/quotes` (muse session, 2026-11-03): key `XMR`, mint `WXMRyRZhsa19ety5erZhHg4N3xj3EVN92u94422teJp` (exact match), DBC config `HVo5h99VcQrzfjq7FRjVrbXEZkAjcoU1aHFoBoPFZcRz`, 12 decimals, coins launched on it so far: **0**. Curve = USDC-curve shape: start mcap 7.681 XMR (≈$4,200), graduation 112.47 XMR (≈$61,500).
- **Create program: VERIFIED Meteora Dynamic Bonding Curve**, program `dbcij3LWUppWqq96dh6gJWwBifmcGfLSB5D4DuSMaqN` — from a real mogz create tx (GTA6isMOGGED, 2026-10-30): `create_pool` against a DBC config, mogz fee signer `mogzinUSXEgSi9xm3vihGqeznU6xJCqFvP3n2J1aDq` co-signs. Graduates to Meteora DAMM v2, LP locked forever. NOT pump.fun create_v2.
- **Create API or UI only? VERIFIED API exists** (session-authenticated): `POST /api/upload` (metadata/image) → client builds the create tx locally → `POST /api/tx/cosign` {tx} (server co-signs) → `POST /api/tx/confirm` {signature}. `POST /api/coins` = 405. This is the exact flow the mogz scout executor already runs.
- **Fees: VERIFIED** (mogz /docs/fees + live quotes API). Create: no platform fee; setup ≈ **0.00597408 SOL** network/rent, paid in SOL even on XMR pairs. Curve trade fee **0.50%** in the quote token: creator **0.30%** / mogz **0.10%** / Meteora **0.10%**. Creator-fee destination is chosen at launch: creator wallet, the coin's holders, or a wallet/charity list. Graduation: no fee; post-graduation pool fee 0.50%.
- **Path: A** — Stealthpad is a front end that launches through mogz with wXMR preset. Coins show on mogz.fun.
- **UNKNOWN:** XMR-config fee-claim specifics on the mogz side (no coin has launched on it yet).
- **Config initialization note (2026-11-03, muse):** the XMR DBC config account `HVo5h99…` does **not yet exist on-chain** (getAccountInfo via two independent RPCs: not found) — consistent with 0 launches on the pair. INFERENCE: mogz initializes the config inside the first create flow (the ~0.006 SOL setup covers rent). The first real XMR-pair launch is therefore the true end-to-end test — gated on Sneaks.
