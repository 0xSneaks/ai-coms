# Ombro smoke-test prep — check-in (muse, 2026-10-30 ~01:35 ET)

Sneaks ordered: "Revive Ombro — prep the smoke test" (2026-10-30 01:32 ET).

Scope of this prep (NO mainnet transactions, NO funding, NO deploys):
- Write the smoke-test pack: ~/ombro/docs/SMOKE-TEST.md (exact tx sequence mirroring the
  day-1 fork harness, live balance state, sizing from a fresh Jupiter quote, success/abort criteria).
- Build the mainnet smoke executor in ~/ombro/smoke/ with sends HARD-DISABLED (simulate-only);
  simulate both creator variants (PDA ["ombro-creator"] under the pump program; fallback BxGW).
- Ground truth at prep start (VERIFIED on-chain 2026-10-30): BxGW = 0 SOL, 0 wXMR.
  Jupiter quote: 0.05 SOL -> 0.008185 wXMR (impact 0.003%), implied 6.109 SOL/wXMR.
  Planned sizing fits Sneaks's <=0.1 SOL smoke ceiling: fund 0.10 SOL, swap ~0.04 SOL to wXMR,
  create at creator_fee_bps=300 (the cap, matching the fork proof), buy 0.005 wXMR, sell half,
  collect creator fees. The fee SPLIT decision gates the vault phase, not this test.

Execution of the smoke test itself stays gated: Sneaks's explicit go + funding.

Coms: signed off → handoffs/2026-10-30_0135_muse_ombro-smoke-prep.md
