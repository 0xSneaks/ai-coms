# Handoff — musepad (Zero-Edge Launch) — claude — 2026-10-28 01:15 ET

**Session goal:** Sneaks asked for "the ultimate solution" to bundling and scam launches using programmable tokens. He wants multi-wallet bundling to have no effect at all. Order: **Muse builds it.**
**Status:** HANDING OFF (spec done → Muse builds)
**Repo / branch:** 0xSneaks/ai-coms @ main · builds on `projects/musepad-protocol` (MusePad v0 crate)

## The idea in one line
You can't stop one person from making 100 wallets on a permissionless chain. So make 100 wallets **worth nothing**: the same price, the same tokens, the same unlock schedule, and **more cost** than one wallet. When bundling stops paying, bundlers stop doing it.

## Why this beats what exists (research 2026-10-28, sources in chat)
- VERIFIED (web): Hooked (Meteora) sells transfer-hook rules: a sniper-fee cap and a trades-per-block limit. Meteora has decaying fees and rate limiters. Heaven has a 6 s sniper tax. Metaplex Genesis uses end-of-auction bids.
- INFERENCE: all of these **detect or tax** bundles. Detection loses against wallet splitting. Per-wallet caps *reward* splitting (more wallets = more cap). Zero-Edge removes the payoff instead.
- VERIFIED (repo): MusePad v0 already proves part of it: one price per window; 10 wallets × 2 SOL = 1 wallet × 20 SOL within 8 base units (`cargo test`). Its known gaps: the per-wallet cap is splittable, there is a slot edge between windows (1.667×), and there is no exit control.

## Spec — 6 mechanisms (build in this order)
| # | Mechanism | Kills | Status |
|---|---|---|---|
| M1 | **One price per window**: escrow, settle once, pro-rata | ordering / priority-fee / Jito-tip edge | DONE in v0 |
| M2 | **Opening auction**: one long first window (default 15 min, set at launch, immutable). Everything in it clears at one price. | block-0 sniping, the 1.667× window-0 edge for the launch crowd | build |
| M3 | **Sealed commit-reveal (Rule 03)**: commit `hash(amount‖salt)` with escrowed SOL; reveal after close; unrevealed → refund minus fee | reacting to other people's orders | build |
| M4 | **Drop the per-wallet cap → pure pro-rata** when the auction is oversubscribed vs its token cap | the only thing splitting beat in v0 | build (remove cap) |
| M5 | **Fixed per-order fee** (set at launch, immutable, on top of rent) | splitting is now strictly *more expensive* | build |
| M6 | **Launch-cohort unlock via Token-2022 Transfer Hook**: auction-claimed tokens unlock linearly over T (default 24 h). The hook rejects any transfer that would leave the claim account below its still-locked amount. | instant dump from 1 or 100 wallets; wash-moving to fresh wallets (transfers are hooked too) | build |

M6 rules (non-negotiable):
- The hook can only **reject**. It cannot move, mint or freeze tokens. Mint has no freeze authority and no permanent delegate.
- No admin key, no allowlist or blocklist, and no exemption for the creator. The only exemptions are curve and pool vault accounts.
- **Auto-sunset**: after T the hook is a no-op forever.
- Upgrade authority is revoked (`None`) after the audit. Until then it is devnet only.
- Tokens bought on the market later are never locked. Lock state is per claim token account (PDA via extra-account-metas).

Not doing (on purpose): per-wallet caps, KYC / proof-of-personhood gates, blocklists, priority-fee filters, off-chain blocking. Off-chain wallet-cluster analysis (REAL OR BS) **labels only** in a public fairness receipt. It never blocks trades.

## Acceptance tests (extend `tests/fairness.rs`; all must pass)
1. **Split test**: the same total from 1, 10 and 100 wallets → equal tokens (within rounding). Net cost for N>1 is higher by exactly (N−1) × order fee + rent.
2. **Opening auction**: the first-slot sniper and the last-slot human pay 1.000000× the same price.
3. **Sealed**: reveal order doesn't change the clearing price. An unrevealed commit is refunded minus fee and gets no tokens.
4. **Hook lock**: transfer of locked tokens is rejected. At T/2 exactly half can move. After T everything can move. Locked tokens sent to a second wallet are rejected. Market-bought tokens above the floor can move.
5. **Hook safety**: there is no instruction that moves or freezes. The hook is a no-op after sunset. Curve/pool vault transfers are never blocked.
6. **Mutation**: secretly giving split orders a bonus makes test 1 fail.
7. **Venue**: a swap on the chosen graduation venue works with the hook on a local validator clone. INFERENCE from Raydium docs: CPMM forwards hook accounts. Meteora DAMM v2 hook support is UNKNOWN, so verify it before choosing.

## Decided
- Build on the MusePad v0 crate. It moves from classic SPL to a Token-2022 mint (needed for M6). Muse may move the crate to its own repo.
- Defaults (15 min auction, 24 h unlock, order fee) are launch params. Muse picks starting values from simulation and reports them.

## Next (start here)
1. muse: claim `musepad-protocol` on BOARD, read `projects/musepad-protocol/README.md` and this spec.
2. Build M2→M5 in the crate, then M6 (hook program). Run `cargo test -- --nocapture`, then post the measured numbers (split test, auction price, lock checks).
3. Request **codex** adversarial review (focus: hook bypasses, rounding/dust, commit griefing, sunset, CPI accounts).
4. Request **claude-code** independent re-run and verification.
5. Devnet deploy only after both PASS. Post program IDs plus upgrade-authority status.

## Don't
- Don't put any of this on mainnet or use real funds. Don't launch tokens with it.
- Don't add admin or upgrade keys "for now" on anything shown publicly.
- Don't claim "bundle-proof" publicly. The honest claim is "**bundling gains nothing here**". Only make it after tests 1–6 pass and are VERIFIED.

## ⚠️ High-risk (wallets, signing, prod, money)
- On-chain program that holds escrowed SOL and gates every token transfer. It needs the full chain: implementation → codex adversarial review → claude-code independent verification → external audit → **Sneaks's explicit yes** before mainnet. Cheap or overflow models must not edit the escrow or hook code.
