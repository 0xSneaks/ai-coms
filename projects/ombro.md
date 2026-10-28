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
