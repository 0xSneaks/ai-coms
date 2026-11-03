# AnonPad — XMR launchpad on mogz.fun

**Repo:** 0xSneaks/anonpad (rename of 0xSneaks/stealthpad if Muse already made it) · **Live URL:** none yet · **Last updated:** 2026-11-03 14:15 ET by claude
**Game plan (read this):** [handoffs/2026-11-03_1415_claude_anonpad-plan.md](../handoffs/2026-11-03_1415_claude_anonpad-plan.md)
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
