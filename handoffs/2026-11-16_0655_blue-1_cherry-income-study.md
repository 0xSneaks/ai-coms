# Cherry income study — sign-off (Blue-1, for muse)

**Date:** 2026-11-16 ~06:55 ET · **Order:** Sneaks — "set an agent to study the entire app. Maximize gains. Figure it out."
**Mode:** READ-ONLY. Nothing spent, signed, posted, reviewed, or changed. No handle set. sneaks.skr untouched.
**Deliverable:** `~/workspace/cherry-study/CHERRY-INCOME-STUDY.md` (full report with sources).

## What Cherry's economy actually is (VERIFIED, SDK v0.1.24 §13, reference/cherry-miniapp-sdk/README.md)

- Cherry takes **10% of an app's declared revenue** (sales / commission / mixed models declared in the portal). Host measures volume itself; bill = `volume × declared share × 10%`, settled in-transaction (`buildCherryFeeSplit` = 90% dev / 10% Cherry) or by **weekly USDC invoice**; no bill under $100/mo volume.
- **Tier caps bind everything:** unverified apps move max **$50/tx, $50/day per wallet**; verified $1,000 / $5,000; partner unlimited (SDK §8).
- Second rail: **paid rooms** (one-off/daily/weekly/monthly access) — Cherry's fee % is UNVERIFIED ("low platform fees" is all that's published).
- Platform scale (Cherry's own pages): 70K users, #1 on Solana Mobile, Trenches room 7,539 members. Real but small, crypto-native audience.

## Our assets — revenue state

- **Cherry Royale / "Royal Slots": PAYMENTS LIVE, Production PARKED.** Packs $2–$485 designed (1,000 credits = $1; net ≈ 87% of gross after 3% rail fee + Cherry 10%); v1 shipped $2/$9.70 packs, larger packs UNVERIFIED; first outside purchase still untested; sales to date $0 on record. Un-park = Sneaks promotes to Production (his Vercel identity tap) + players.
- **PetalDeck: first launch VERIFIED (PetalCat, Holders mode → 0%).** Creator 95/5 mode still UNPROVEN (Cherry Wallet blocked the split tx). Un-park chain unchanged: K-11 PASS (Claude/Opus, owed since 2026-11-13) → SOLANA_RPC_URL for Production → Creator-mode proof launch (~0.02 SOL) → PROD YES; public-listing policy clearance still UNKNOWN.
- **Hold'em: credits-only, UI freeze in force.** Five-tier pack book priced ($1.69–$42.49) but activation needs name pick (P1) + Sneaks's portal prompt + freeze lift + legal review + PROD YES.
- **Muse's Cherry account:** session file present (mogz wallet), handle still UNSET; liveness UNVERIFIED — read-only probe timed out via egress (no 401, inconclusive). Nothing signed or posted.

## Full catalog + gaps + copy candidates (scope expansion, Sneaks 2026-11-16)

Report §6 catalogs every publicly named Cherry mini-app (Cherry's own Sep 2026 catalog article): SOL Miner (@solminer, 4,012 members — Cherry's own grid-staking game, biggest room on the platform), SOL Reclaim (@solreclaim, 4,366 members by Oct 2026, fee from reclaimed rent), BananaZone (1,990), Gib Meme (1,887), Tramplin.io (1,234), Jupiter Swap (936), Polymarket (733), Trading Terminal, plus registered-but-invisible Pachinko / Loyal / Domin8 / Chainshorts / "Don't push the horses". Enumeration stops there and the report says why: Cherry publishes no full directory and the in-app marketplace isn't web-browsable. §7 ranks the gaps (public launchpad #1 — that's PetalDeck; branded chance games #2; multiplayer/PvP #3). §8 gives five original-implementation copy candidates (mechanic only — our code/art/name): **C1 room-native multiplayer crash** ⭐, C2 pari-mutuel SOL/USD prediction pools (the Rush re-scope), C3 dust-cleanup utility, C4 prize-draw staking, C5 tap-trading tournaments. Explicitly NOT recommended: a grid-staking clone head-on against Cherry's own SOL Miner.

## Ranked plan (full math in the report)

1. **Un-park Royale** — only live money rail we own; $0 cost; days to first dollar. Decision: PROD YES.
2. **Paid Cherry room** — zero build; members × price; fee % unknown. Decision: topic + price + posting cadence.
3. **PetalDeck to Production** — highest ceiling (5% of creator fees per Creator-mode launch, convex on other people's coins); weeks out, gated on K-11 + Creator proof.
4. **Build the room-native crash game** (new, §8-C1) — best income-per-effort new build; reuses Royale's payment rails; waits on nobody but us.
5. **Hold'em paid packs** — months out, five gates.
6. **Blackjack build** — not recommended now.

**Do first:** Royale Production promotion + one real outside purchase; paid room same week; crash game is the build-next.
