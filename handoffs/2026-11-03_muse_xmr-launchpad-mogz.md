# AnonPad (XMR launchpad on mogz) — Step 1 gate handoff

From: muse · 2026-11-03 · Re: `handoffs/2026-11-03_1310_claude_ombro-on-mogz.md`
(originally "Stealthpad"; renamed **AnonPad** by Sneaks 2026-11-03 — an
existing live $STEALTH token owns the old name. Never "Ombro".)
Project file: `projects/anonpad.md` · Plan: `handoffs/2026-11-03_1415_claude_anonpad-plan.md`

## Gate answers (all verified live, read-only)

1. **Custom quote tokens: YES.** Create page pairs: SOL / USDC / Custom
   (paste any mint; checks: no freeze authority, supply > 0, <=12 decimals;
   max 5 new pairs/day/wallet). Source: mogz.fun/docs/custom-pairs.
2. **wXMR: already listed — no submission needed.** `GET /api/tx/create/quotes`
   under the muse session: key `XMR`, mint
   `WXMRyRZhsa19ety5erZhHg4N3xj3EVN92u94422teJp` (exact, 12 dp), DBC config
   `HVo5h99VcQrzfjq7FRjVrbXEZkAjcoU1aHFoBoPFZcRz`, **0 coins launched**,
   USDC-shaped curve: start 7.681 XMR, graduation 112.47 XMR,
   setup 0.00597408 SOL.
   Caveats: the wXMR mint HAS a live mint authority and a freeze authority
   (the wxmr.io bridge operator — custodial, disclosed on the site); and the
   XMR DBC config account is **not yet initialized on-chain** (checked via
   two RPCs; P2 simulation confirms it blocks execution — see project file).
3. **Create program: Meteora Dynamic Bonding Curve**
   `dbcij3LWUppWqq96dh6gJWwBifmcGfLSB5D4DuSMaqN` — from a real mogz create tx
   (GTA6isMOGGED, 2026-10-30): create instructions + mogz fee signer
   co-signs; graduates to Meteora DAMM v2, LP locked. Not pump.fun.
4. **Create API: exists (session auth).** Refinement from the P2 run:
   `POST /api/upload` -> `POST /api/upload/metadata` ->
   **`POST /api/tx/create` — mogz's server builds the unsigned tx** ->
   client signs -> `POST /api/tx/cosign` -> (send) -> `POST /api/tx/confirm`.
   (`POST /api/coins` = 405.)
5. **Fees:** create free + ~0.00597 SOL network/rent (paid in SOL even on
   XMR pairs). Curve fee 0.50% in quote token: creator 0.30 / mogz 0.10 /
   Meteora 0.10. Creator picks the fee destination at launch. Graduation
   free; post-graduation pool fee 0.50%. Sources: mogz.fun/docs/fees +
   quotes API.

**Path: A** — front end on mogz with wXMR preset. The original Step 1
request is DONE.

## State since

- Repo `0xSneaks/anonpad` (site scaffold + AGENTS.md with lanes/hard stops),
  live at https://anonpad-8j20i1dge-phantomcapais-projects.vercel.app/
  (public, protection off, verified by direct fetch).
- P0 complete (token-name check; no public mogz referral program — both in
  the project file).
- P2 simulate-only run complete: full pipeline builds/signs/cosigns;
  simulation stops at `AccountNotFound` — empty fee payer (mogz wallet at 0)
  + uninitialized XMR config (mogz-side). Zero broadcasts. Log + harness in
  the repo under `p2/`.
- P1 (DeepSeek UI restructure) in flight via the bench.

## Review ask — claude-code (P3, early)

The TX-lane harness is up for adversarial review now rather than later:
`0xSneaks/anonpad` `p2/simulate_create.py` + `p2/simulate-log.json`.
Scope of the ask: the harness is simulate-only by construction (no send
path) — please attack (a) any path by which it could broadcast, (b) key
handling, (c) whether the simulate evidence supports the conclusions in
`projects/anonpad.md` "P2 results". The in-browser TX lane gets its own P3
pass before any launch, per the plan.

## Open / gated

- P4 (first real launch) waits on Sneaks: wallet funding + amounts, first
  coin name/ticker/image, creator-fee destination, domain yes/no. After
  funding, muse re-runs the simulate; if the XMR config still blocks, the
  config-init question goes to mogz before any broadcast.
- Hard stops in force: no tx/spend/launch without Sneaks's explicit go;
  mogz $30 lifetime cap; non-custodial (Phantom/Solflare) only.
