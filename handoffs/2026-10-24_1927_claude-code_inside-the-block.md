# Review — inside-the-block — claude-code — 2026-10-24 19:27 ET

**Session goal:** Sneaks asked me to review Muse's study (ask §2 "claude": judge the entry against the judging weights; is leading with the null the strongest honest framing; what a Design-35 reviewer attacks first).
**Status:** DONE (review only — read-only on the study; nothing submitted, no repo created, no spend)
**Repo / branch:** 0xSneaks/ai-coms @ claude/muse-solana-validator-review-fb48a4
**Source reviewed:** `handoffs/2026-10-24_1924_muse_inside-the-block.md` only. I have no access to Muse's VM, so REPORT.md / DESIGN.md / the dataset / the harness were NOT read. Every number below is computed from the §7 rho table.

## VERDICT: SOUND-WITH-FIXES

- **Proof:** Data collection looks solid (400/400 landed, fee arithmetic checks out, pre-registration and deviations disclosed). The headline's wording goes further than the data: pooled across bursts, fee tier is not noise.
- **Contradictions:** "consistent with noise" doesn't fit DRpbCBMx's burst (rho_fee −0.96, n=10, p ≈ 1e-5). "Validators with the most evidence agree with the headline" is also contradicted by that same 2-burst validator.
- **Risks:** A Design reviewer will hit two things first. (1) Send order to the RPC is not arrival order at the leader (~24 s of lag in between). (2) Ordering across slots gets mixed with ordering inside one block. Verifiability: the public repo doesn't exist yet and the Docker path is untested.

None of the fixes need new mainnet sends. They are re-analysis on the existing dataset plus edits to the text.

---

## 1. Numbers check (VERIFIED: my own arithmetic from the §7 table)

- Fee tiers: 200,000 CU × price + 5,000 base gives 5,000 / 17,500 / 55,000 / 105,000. Planned 288 tx = 18 bursts × 730,000 = **0.013140 SOL ✓**. Worst case 288 × 105,000 = **0.030240 SOL ✓**.
- Spend is plausible. Primary run: 25 bursts × 730,000 = 18.25M lamports. Shakedown 2: 0.43M. Helius pilot: 239 landed × ~45.6k average ≈ 10.9M. Total ≈ 29.6M, which matches the reported 29,635,000. INFERENCE: it fits only if "study spend" includes the pilot. Say so in SUBMISSION.md, because 400 tx × 730k/16 = 18.25M is the number a judge will compute.
- Design decorrelation: rho(send index, tier) for [zero, high, low, mid]×4 is **+0.097** forward and **−0.097** reversed. Good, near zero.
- Coverage: 26 qualifying groups, Σn = **376 of 400** (24 tx in sub-floor fragments). 26 groups from 25 bursts means at least one burst produced two qualifying groups. **Check whether HEL1USMZ (n=8) and 9iFPQbP1 (n=8) are the two halves of one 8/8 split.** If so, both "ordered" verdicts come from a single burst. Say that in the report.

## 2. The finding the write-up misses (INFERENCE: needs `harness analyze` to confirm the sign convention)

Under a random-ordering null (my permutation sim, 100k trials, using the actual tier pattern):

| case | P(\|rho\| ≥ threshold) |
|---|---|
| n=8, \|rho\| ≥ 0.70 | ≈ 0.06 |
| n=8, \|rho\| ≥ 0.78 | ≈ 0.027 |
| n=16, \|rho\| ≥ 0.70 | ≈ 0.0035 |
| **n=10, \|rho_fee\| ≥ 0.96 (DRpbCBMx)** | **≈ 1e-5** |

- The two n=8 hits are fully consistent with noise (~52 tests at p≈0.06 each). Muse's reasoning holds there.
- **DRpbCBMx's −0.96 does not.** Even after correcting for 52 tests (Bonferroni) it stays at about 5e-4. Calling the validator "mixed" is correct under the rule, but the text must not call this burst noise.
- **Pooled fee effect:** rho_fee is negative in **19 of 25** non-zero groups (sign test p ≈ 0.015). The mean is −0.16 and Stouffer's combined z is **−3.15** (p ≈ 0.002). Firedancer is 6 of 7 negative. If negative means "higher fee lands earlier", there is a **weak but consistent fee-priority tendency** across the dataset. The rule "every burst must reach |rho| ≥ 0.7" is built to miss exactly this kind of effect.
- Pooled send effect: mean +0.10, z +1.83 (p ≈ 0.07). Borderline, so don't claim it.
- ACvL73V4 has rho_fee **+0.64** at n=15 (p ≈ 0.01, the opposite direction). That is a hint of differences between validators, not uniform noise.

Caveat on the method: Stouffer treats groups as independent and uses a normal approximation with ties. A permutation test over the whole dataset in the harness is the right check. It costs one function and no sends.

## 3. Ask §2: judging-weight pass

**Design (35): what a reviewer attacks first.**
1. **Send order is not arrival order.** Accepted transactions landed about 110 slots later (≈ 24 s at 0.216 s/slot). That means they sat in the RPC retry and forwarding path before reaching the leader. H1 ("arrival order") was never measured directly: the study measured RPC submission order, and the forwarding path can reorder transactions before the leader sees them. A null on H1 may describe the delivery path, not the validator. This is the strongest attack, and the report must name it. The fix is text. A cheap optional extra: if any burst went out over one RPC connection, show the first-attempt submit timestamps, and state outright that TPU arrival was not observed.
2. **Cross-slot mixing.** One probe burst landed across 2 slots. If a (burst, leader) group spans slots, its "landed order" mostly measures which slot each transaction made, which is a timing effect. Re-run rho **within each slot only**, or rank by (slot, index) and report how many groups span slots. The bounty asks about order *inside the block*.
3. **All 16 transactions write-lock the same account (the fee payer).** The scheduler therefore has to run them one after another, so this is a single conflict chain. That's a good design choice for testing priority, but it must be stated. The finding is "ordering of conflicting same-payer transactions", not "ordering in general".
4. **The fragment floor was set after the data were seen.** It's disclosed. To defuse it, publish a sensitivity row with the verdict counts at floors 6, 8 and 10. Excluding small fragments doesn't obviously bias toward no-pattern, since small n produces *more* |rho| ≥ 0.7 hits. Showing that table makes the point for you.
5. One session (~40 min) and self-transfers only: the caveat already in the entry is enough. Keep it.

**Verifiability (25):** the dataset and pre-registration are strong. The two risks: (a) the public repo doesn't exist yet, and (b) the Compose path has never run (see codex's ask). A judge whose `docker compose run` fails loses this section. Also add the permutation test and the slot-split analysis to `harness analyze`, so every new number in the report can be regenerated.

**Analysis (25):** this is where the current framing loses points. A judge who pools the table (it takes a minute) finds z ≈ −3 on fee and a 1e-5 burst, then reads "it's noise". That costs credibility, not just points.

**Engineering (15):** the custom offline ed25519 signer will draw a "you wrote your own crypto" look. Keep it, but lead with the RFC 8032 vector tests and the byte-equivalence check against web3.js, and mention the two bugs that were caught (that shows rigor).

**Is leading with the null the strongest honest framing? No, not as worded.** Suggested headline (pending the sign check):

> **No validator follows a deterministic ordering rule (0 of 22 at |rho| ≥ 0.7 across all bursts). Pooled across 26 bursts, fee tier has a weak, consistent pull toward earlier placement (z ≈ −3); send order does not.** Plus Alpenglow-era methodology findings: getLeaderSchedule is empty, getBlock needs v1 transactions, landing lag is ~110 slots, and getSlotLeaders is used for attribution.

This framing is still honest and still a null at the per-validator level. It survives the pooled check and gives Analysis a positive result. Move the Alpenglow findings up as a contribution: they are new, verifiable, and useful to every other entrant. Change "25 bursts … timed to land in targeted leader windows" to "24 targeted bursts + 1 probe".

## Next (start here) — for muse
1. Confirm the rho_fee sign convention in the harness (is a negative value "higher fee earlier"?).
2. Add to `harness analyze`: a pooled permutation test (fee and send), within-slot rho, a count of groups that span slots, and the floor sensitivity (6/8/10). Regenerate §7.
3. Check whether HEL1/9iFP come from the same burst. Fix the "noise" sentence about DRpbCBMx.
4. Rewrite the SUBMISSION.md headline per §3, then send to Sneaks for approval.

## Don't
- Don't re-run on mainnet for this. Every fix above runs on the existing 400 records.
- Don't drop the per-validator rule. Report the pooled test *alongside* it as a labeled follow-up, not as a replacement (it wasn't pre-registered).

## ⚠️ High-risk
- Submission, public repo creation and any spend stay with Sneaks. This review authorizes none of them.
