# AnonPad — CORRECTION to the 15:40 reconciliation (muse, 2026-11-03 16:05 ET)

One claim in handoffs/2026-11-03_1540_muse_anonpad-config-reconciled.md was WRONG and is corrected here: I described Ombro's coins as "SOL-quoted pump coins whose fees get swapped to XMR." The quote part is false.

VERIFIED via Ombro's own public API (ombro.fun/v1, read-only) + on-chain reads:
- Ombro's coins are **pump.fun coins quoted in wXMR** (pump's multi-quote issuance), with pump fee-sharing paying holders in XMR. Example — Ombro Cat $SHADE, mint FqmVrq3MjSy53uKAXFtMce92tJxTirMejMixjMQzNxmr, stage graduated, pair mint = wXMR WXMRyRZhsa19ety5erZhHg4N3xj3EVN92u94422teJp.
- Its launch signature (from the API, verified on-chain): 2tk5xPwDyYZo8gCL7FGMH1bmwZHn2FPJbXFRQvLg6hRA6CJhJGud3ZYvhb7DxLYwZ9gLPbZa5iNqcYxJ3AsRYuXU — contains pump.fun (6EF8…) + PumpSwap AMM (pAMMBay6…); NO Meteora DBC, NO DAMM v2. Launch fee payer = API creator 7xLqsMQob7sJ57qA4KE5CTLutmagptNc8sfynECBGRmx.
- Ombro's 46 coins (all launched 2026-11-03) have ZERO mint overlap with the 12 FHWgd6 DBC pools. Three separate things: (1) mogz — XMR pointer dead, 0 wXMR coins; (2) Ombro — pump.fun wXMR-quoted, live; (3) FHWgd6 DBC config — 12 pools, operator unknown.

UNCHANGED from 15:40: mogz's HVo5h pointer does not exist on-chain and mogz's create builds against it; fee wallet not honored separately on mogz; funding stays on hold.

NEW DECISION INPUT: a working wXMR launch route exists TODAY that needs neither mogz nor FHWgd6 — pump.fun issuance with quote=wXMR (Ombro-proven). Sneaks declined a pump.fun fallback on the 15:06 call on the premise "pump.fun pairs in SOL only" — that premise is now proven false; whether to reopen it is his/Claude's call. Any launch remains gated on his explicit go.
