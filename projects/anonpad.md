# AnonPad — XMR launchpad on mogz.fun

**Repo:** 0xSneaks/anonpad (rename of 0xSneaks/stealthpad if Muse already made it) · **Live URL:** none yet · **Last updated:** 2026-11-03 14:15 ET by claude
**Full map (follow this):** [handoffs/2026-11-03_1425_claude_anonpad-map.md](../handoffs/2026-11-03_1425_claude_anonpad-map.md) · **Game plan:** [handoffs/2026-11-03_1415_claude_anonpad-plan.md](../handoffs/2026-11-03_1415_claude_anonpad-plan.md)
**Gate research:** [projects/ombro.md → "mogz gate"](ombro.md) (tech notes only; Ombro name is dead)

## Now (keep this current)
Name = **AnonPad** (Sneaks, 2026-11-03 14:07). Path A: front end that launches wXMR-quoted coins through mogz's existing Meteora DBC flow. No custom on-chain program. Scaffold built by muse under the Stealthpad name → rename. Crew while claude is out: **muse** (lead, tx lane) + **deepseek** (UI lane).

## Established (decisions — don't re-litigate)
- Name AnonPad. Not Ombro (rug name), not Stealthpad (existing STEALTH token) — Sneaks, 2026-11-03.
- Ticker for any AnonPad token: NOT $ANON (crowded). No AnonPad token unless Sneaks says so — Sneaks/claude, 2026-11-03.
- Rides mogz: upload → client-built create tx → mogz cosign → confirm. Meteora DBC `dbcij3LWUppWqq96dh6gJWwBifmcGfLSB5D4DuSMaqN`. wXMR mint `WXMRyRZhsa19ety5erZhHg4N3xj3EVN92u94422teJp` — muse VERIFIED 2026-11-03.
- Non-custodial. Phantom + Solflare. No server-side keys. Static/edge front end.
- Not affiliated with mogz: say "built on mogz.fun", never use mogz logo/branding as ours.

## Built
- Site scaffold (Launch / Coins / Coin / How it works, wallets, bridge warning) — muse, as "Stealthpad" — UNVERIFIED by claude

## To do — see plan phases P0–P5

## Owner decisions — P4 (Sneaks, 2026-11-03 14:14 ET)
- **14:15 ET: BUILD FIRST.** Focus = P1 site + P2 create flow (simulate only). First coin name/launch is parked — don't ask Sneaks for it until the build is done and P2 simulate passes.
- **Launcher = muse** (muse's mogz account/wallet).
- **Creator-fee destination for the first launch = `B4rEgdbjNCQiQAV93Xrw3qicZ5pXMjBqXJRA7wyL9BUU`** (valid base58 → 32-byte Solana address, checked by claude). Set it in the create tx as the creator-fee wallet; read it back from the simulate/launch result and post proof. Copy-paste only, never retype.
- Still needed from Sneaks before broadcast (batch in ONE message): funding amount + which wallet sends it · first coin name / ticker / image · domain or stay on vercel.app.
- Gate kept: P2 simulate must PASS (with the fee address shown in the result) before any broadcast. P3 review recommended; Sneaks may waive it explicitly.

## Known issues / gotchas
- XMR DBC config `HVo5h99…` not on-chain yet → first real launch is the only end-to-end test.
- Setup ≈ 0.006 SOL paid in SOL even on XMR pairs → users need SOL + wXMR.
- wXMR bridge = single operator, custodial. Bridge min 0.1 XMR each way.
- Revenue for AnonPad itself = UNKNOWN (creator fee goes to coin creator, 0.10% to mogz). Check mogz referral/partner program.
- A Solana token page for "AnonPad" showed in search (solanacompass DoAhRQs5iEi65fkwDQDZwi5DeZ6kzSV455eFbh8ZuWhn) — UNVERIFIED; check before going public.
## P0 results (muse, 2026-11-03)
- **"AnonPad" token check:** a Solana mint named AnonPad exists — `DoAhRQs5iEi65fkwDQDZwi5DeZ6kzSV455eFbh8ZuWhn`, 1B supply, 6dp, classic SPL. But: **no trading pairs on any DEX (DexScreener: 0), no pump.fun record, no liquidity, no project footprint found.** A second search hit ("AnonPad $ANONPAD", 5PNEHthv…pump) likewise has no live pairs. Verdict: dormant name-squat, **not an active project** (checked 2026-11-03 via DexScreener + pump.fun API + on-chain mint read). Does not block the AnonPad site name; consistent with the standing rule — no AnonPad token and never the $ANON ticker unless Sneaks says so.
- **STEALTH collision (Sneaks's rename reason) VERIFIED:** "Just Stealth It" $STEALTH is live on Solana with a ~$120K-liquidity pair — the Stealthpad name was genuinely taken.
- **mogz referral / partner / front-end fee program: none found.** /docs/referral, /docs/referrals, /docs/partners, /partners all 404; the fees doc's only "referral" mention describes pump.fun's code, not a mogz program; /revenue is aggregate platform stats. Recorded as: no public program (VERIFIED absence across mogz docs + site, 2026-11-03); a private partner arrangement is UNKNOWN — would require asking mogz directly. AnonPad revenue therefore = UNKNOWN for now (creator fee belongs to each coin's creator; nothing routes to the front end by default).


## P2 results — create flow, simulate only (muse, 2026-11-03)

Ran the full proven mogz sequence server-side for one fake coin ("AnonPad Sim
Test" / SIMT) with `quote: "XMR"`: upload image ok, upload metadata ok,
`POST /api/tx/create` ok — mogz's SERVER builds the create tx (this refines
the Step 1 gate note, which said the client builds it) — local sign ok,
`POST /api/tx/cosign` ok (mogz co-signature added). Tx shape: versioned, fee
payer = muse mogz wallet, 2 instructions, both to Meteora DBC
`dbcij3LWUppWqq96dh6gJWwBifmcGfLSB5D4DuSMaqN` (8 + 16 accounts).

**Simulate result: `AccountNotFound`, 0 CU consumed, zero broadcasts.**
Account-existence check on the tx's 15 static accounts: 7 do not exist
on-chain. Two causes:
1. The fee payer itself — the muse mogz wallet is at 0 SOL (emptied
   2026-11-03), so its account does not currently exist on-chain. Fixed by
   funding (Sneaks's planned SOL send).
2. The XMR DBC config `HVo5h99VcQrzfjq7FRjVrbXEZkAjcoU1aHFoBoPFZcRz` does
   not exist on-chain (already flagged in Step 1). This one is mogz-side:
   until mogz initializes that config, even a funded launch tx cannot
   execute. The remaining missing accounts are the ones the create itself
   would create (mint, pool, vaults) — expected.

Next: after the wallet is funded, re-run the same simulate to isolate
whether the config alone still blocks; if it does, the config-init question
goes to mogz before any broadcast is attempted. Full log:
`~/workspace/anonpad/p2/simulate-log.json` (local), harness
`~/workspace/anonpad/p2/simulate_create.py` (no send path exists in it).
