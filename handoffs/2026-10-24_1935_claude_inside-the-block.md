# Handoff — inside-the-block — claude — 2026-10-24 19:35 ET

**Session goal:** Review Muse's full write-up (`handoffs/2026-10-24_1924_muse_inside-the-block.md`), §2 claude ask: judge the entry vs the judging weights; is leading with the null the strongest honest framing; what a Design-35 reviewer attacks first.
**Status:** DONE (read-only review; study repo and entry untouched)
**Repo / branch:** 0xSneaks/ai-coms @ main · **Last commit:** this handoff

## VERDICT: SOUND-WITH-FIXES

Data and design are sound. **The entry is not submittable as drafted:** the headline overstates the null and the "consistent with noise" sentence is contradicted by the study's own rho table. All fixes are text + one exploratory analysis on the existing dataset. No new spend.

- **Proof:** INFERENCE-grade only. I did not see the dataset, repo, or harness output — everything below is computed from the §7 rho table as posted (26 qualifying groups, 376 tx). Script: re-runnable from the table; numbers are Monte Carlo (40k draws), assuming fragments are random subsets of the 16 send slots.
- **Contradictions:** 2 (headline vs pooled data; "noise" sentence vs expected false-positive rate). Details in §B.
- **Risks:** headline gets torn up under Analysis-25; H1 not actually tested and Jito bundle lane unmeasured (Design-35); custom ed25519 + untested Compose (Engineering-15); payout to an agent-VM hot wallet.

## A. Scorecard vs weights (INFERENCE — my read as a judge)

| Weight | As drafted | Main drag |
|---|---|---|
| Design 35 | Strong | Pre-registration, fee/send decorrelation, exact fees, landed-leader attribution are all good. Drag: the manipulated variable (send order) never reaches the leader intact — see §C1. |
| Verifiability 25 | Strong (pending public repo) | Raw dataset + signatures + one-command path. Drag: Compose never run anywhere; surprising env claims (empty `getLeaderSchedule`, Alpenglow) have no captured RPC evidence in the repo. |
| Analysis 25 | **Weakest** | Only a per-validator threshold vote. Misses the cluster-level signal the data does show. "Noise" claim is quantitatively wrong. |
| Engineering 15 | Good | Pure stdlib, 32 tests, cap enforced in code. Drag: home-rolled ed25519 signer; Compose untested. |

## B. Is "lead with H0" the strongest honest framing? — No, not as written.

Computed from the §7 table:

1. **Pooled fee effect is real.** Mean rho_fee = **−0.16**; 19 of 25 non-zero groups negative (negative = higher fee lands earlier — the report's own labeling of −0.78 as "fee-ordered" sets that sign). Monte Carlo p ≈ **0.003** (Fisher-z, n-weighted: Z ≈ −2.7). Drop the two big hits (9iF −0.78, DRp −0.96) and it is still −0.10, 17 of 23 negative.
2. **Pooled send effect is marginal.** Mean rho_send = +0.10, p ≈ 0.07. Honest: "no detectable arrival effect."
3. **"Isolated hits are what noise produces" is false.** Under pure noise, expected groups crossing |rho| ≥ 0.7 across these 26 groups × 2 tests ≈ **0.55**. Observed 3 (Poisson P(≥3) ≈ 0.02). DRp's −0.96 at n=10 has a null probability ≈ **1e-5** — that is not noise; it is the single strongest fee-ordering burst in the dataset. The pre-registered rule correctly calls DRp "mixed", but the prose must not call it noise.

**Stronger, still-honest headline (my recommendation):**
> No validator-level ordering rule at the pre-registered bar (|rho| ≥ 0.7, all bursts agree) — 19/22 no-pattern. But pooled across 26 bursts, priority fee carries a weak, consistent pull toward earlier placement (mean rho −0.16, 19/25 negative; exploratory, not pre-registered). Send order, as submitted through a public RPC, carries no detectable signal.

This keeps the pre-registered H0 verdict intact and labeled, adds a finding judges can't get from a pure null, and pre-empts the first thing a careful Analysis reviewer computes. Label the pooled test **EXPLORATORY** everywhere.

## C. What a Design-35 reviewer attacks first (ranked)

1. **The independent variable doesn't reach the leader.** "Send order" is order of submission to a public RPC. The ~110-slot (~24 s) landing lag shows txs sat in RPC forwarding/retry before any leader saw them, so arrival order at the leader is unobserved. H1 ("arrival order") is not tested; "client-submitted order via public RPC" is. Fix (text): rename the variable, state H1 untested at the leader, report inter-send gap and per-burst landed-slot spread. Direct-to-TPU sends would fix it but need new spend — Sneaks's call, not required.
2. **Power / minimum detectable effect.** |rho| ≥ 0.7 per burst only catches near-strict ordering; a real rho 0.3–0.5 rule reads as "no-pattern". State the MDE. My sim: null false-positive rate at |rho| ≥ 0.7 is ~6% at n=8, ~3% at n=10, ~0.3% at n=16 — put that table in the report.
3. **"Inside the block" vs across slots.** If a fragment spans several slots of one leader's window, cross-slot order is arrival timing, not intra-block ordering. Report the share of groups confined to one slot and a within-slot-only rho as sensitivity.
4. **Single-burst coverage (soft spot 1).** 19/22 validators have one burst, so "all bursts agree" is trivially met for them. Answer: weaker for validator-level claims, stronger for the cluster-level claim — which is another reason to lead with the pooled framing.
5. **Fragment floor (soft spot 2).** Post-hoc, but conservative: per the rates above, small fragments cross the threshold by chance far more often, so the floor reduces false "ordered" verdicts rather than biasing toward no-pattern. Show it: verdict table at floor 5 / 8 / 12 / 16.
6. **Client families (soft spot 3).** Mislabels barely move the headline (every family is mostly no-pattern) but they kill any H3 claim. Agave = 1 validator; say H3 is effectively untested. Name Jito BAM / FireBAM nodes explicitly — a different block-assembly path a reviewer will ask about (INFERENCE that it matters).
7. **Fee ties.** rho_fee has 4-way ties (4 tiers × 4). State tie handling; the 0.7 bar is not the same test for rho_fee and rho_send.
8. **Jito bundle lane not measured** (added 19:31 at Sneaks's direction). 14 of 22 validators are jito-solana, but every probe was a plain priority-fee transaction — no bundles, no tips. Jito's auction gives bundles guaranteed internal order and a shot at the top of the block, so on those validators the study measured only the regular path, not Jito's ordering mechanism. A judge will ask "why not bundles vs plain fees?" Fix (text, required): state plainly that the study covers the non-bundle path only and that bundle ordering is out of scope. Optional stronger fix: a small bundle-vs-plain comparison on a few jito-solana leaders (e.g. tipped bundle + same-fee plain txs in one window) — needs tip spend on top of fees ⚠️ Sneaks's call; the 0.05 SOL cap has ~0.02 SOL headroom (INFERENCE from posted spend), size the tip budget before any send.

## D. Must-fix text in SUBMISSION.md / REPORT.md

- Delete/replace "the 2 single-burst 'ordered' results are consistent with noise at this sample size" (see §B3).
- "timed to land in targeted leader windows across 22 validators" → 8 validators were targeted (24 bursts ÷ 3); landing spread them across 22. Say so.
- "fired 25 bursts" → 24 aimed + 1 unaimed probe.
- "Total on-chain spend 0.029635 SOL" → add "incl. shakedown + Helius pilot". My check: primary 25 bursts × 730,000 = 18,250,000; shakedown 2 = 430,000; remaining ~10.96M ≈ the 239-tx pilot. Consistent (INFERENCE).
- Ship captured raw RPC responses (empty `getLeaderSchedule`, `getSlotLeaders`, a version-1 `getBlock`) as fixtures. A judge will assume a harness bug before believing an empty leader schedule. I cannot verify the Alpenglow claims (after my knowledge cutoff) — UNKNOWN to me.

## E. Arithmetic I checked (VERIFIED from the write-up's own numbers)

- 24 × 16 + 16 = 400 ✓ · plan 18 bursts × 730,000 = 13,140,000 = 0.013140 SOL ✓ · tier fees = 5,000 base + 0 / 12,500 / 50,000 / 100,000 priority on 200k CU ✓ · committed 31.39M ≥ actual 29.635M, < 50M cap ✓ · per-validator verdict counts 19/1/1/1 and family rollup 11+7+1 / 14·7·1 match the table ✓ · fee-vs-send pattern correlation ±0.097 (alternating) — decorrelation holds ✓

## Decided
- Verdict SOUND-WITH-FIXES; recommended reframe in §B — not approved by Sneaks.

## Next (start here)
0. muse: add the §C8 non-bundle-path scope line to REPORT.md + SUBMISSION.md (text only).
1. muse: add the pooled exploratory analysis (§B) + floor sensitivity (§C5) + within-slot sensitivity (§C3) to `harness analyze`; regenerate.
2. muse: apply §C1/§C2 text and §D fixes to REPORT.md + SUBMISSION.md.
3. Wait for grok/chatgpt/codex passes, then Sneaks approves.

## Don't
- Don't submit the current SUBMISSION.md headline.
- Don't present the pooled test as pre-registered.
- Don't send new transactions to "fix" C1, and don't run the §C8 bundle test, without Sneaks's OK (spend + tips).

## ⚠️ High-risk
- Payout address = the measurement wallet, whose key lives on Muse's VM. Payout lands in an agent-held hot wallet. Sneaks: confirm that, or swap in a wallet you hold.
- Signing uses a home-rolled ed25519. RFC 8032 vectors + web3.js byte match are good; add a dev-only cross-check against libsodium/PyNaCl in tests before Engineering reviewers see it. Needs independent review (codex lane).
