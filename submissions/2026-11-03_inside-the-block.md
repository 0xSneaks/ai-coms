# Inside the Block: How Solana Validators Order Transactions — submission packet
Program: Inside the Block: How Solana Validators Order Transactions (Superteam Ukraine bounty, Superteam Earn) · URL: https://earn.superteam.fun/listing/inside-the-block-how-solana-validators-order-transactions · Deadline: 2026-11-05 21:59 UTC
Payout if won: 2,500 USDC fixed pool across 5 places (1st 800 · 2nd 600 · 3rd 500 · 4th 300 · 5th 300), paid via Superteam Earn to the payout address supplied at submission time · Cost to enter: $0 (submission consumes one Superteam submission credit from the account — see Escalations)
Eligibility: Solana Mainnet measurement → met (all measurements on mainnet, slots 460,988,576–461,028,101, 2026-10-24). At least 6 validators spanning at least 3 client families → met (22 validators; jito-solana, firedancer, agave). Fee spend capped at ~0.05 SOL, enforced in code → met (actual spend 0.029635 SOL, cap enforced in code). Primary evidence from own transactions → met (400 self-transactions, 25 bursts of 16, all landed). Alpenglow rule (measure before OR after the Oct 21 upgrade, do not mix) → met (all measurements 2026-10-24, after the upgrade). Region → NOT MET (see Escalations #1). Agent access → NOT MET (see Escalations #2).
AI rules: The listing page text does not mention AI-assisted entries. The listing's Earn API metadata sets agentAccess = HUMAN_ONLY (verified 2026-10-24, 2026-10-31, and again 2026-11-03). That flag is the operative rule and this entry does not satisfy it — see Escalations.
Terms that matter: Judging — Design Validity 35% · Verifiability and Reproducibility 25% · Analysis Quality 25% (a null result, "no rule / it's noise", is an explicitly valid conclusion if supported) · Engineering 15%. Submission requirements — public repo link (any language); one-command reproducibility (Docker Compose expected); keys only via env/volume, never in the repo; dry-run by default, live sending only behind an explicit flag with a spend cap; raw data with transaction signatures and slot numbers; README covering the design considerations; report with the date of every measurement and a "what went wrong" section. No entry fee. No IP transfer or exclusivity terms stated on the listing.
Identity used: Halfmoon Studio (@gethalfmoon) — Superteam Earn profile https://superteam.fun/earn/t/gethalfmoon · Account holder on record: John Tedesco · thatdudesneaks@gmail.com
Promises we make: None outstanding — the study is complete and the report, code, and full raw dataset are already public in the repo. This packet submits finished work only; no future deliverables, timelines, or amounts are promised.

## Escalations
1. **REGIONAL ELIGIBILITY BLOCKER — ESCALATE TO SNEAKS.** Project record, 2026-10-24: when submission was attempted in October, the listing proved REGIONAL (Ukraine residents only) and the US-based Halfmoon profile's Submit button was disabled; no submission could be completed and no submission credit was consumed. Current read, 2026-11-03 (official Earn API + listing page): status OPEN, deadline 2026-11-05T21:59:59.999Z and 2,500 USDC prize unchanged, 55 submissions recorded — and the public page text states no region rule; the regional gate only appeared inside the logged-in submission flow in October. Neither fact softens the other: as far as any public source shows, this entry still cannot be submitted from the US-based Halfmoon account. Whether the gate still applies inside the flow, or whether Superteam Ukraine would grant an exception, can only be checked with Sneaks's Halfmoon login. Sneaks's call: ask Superteam Ukraine for an exception, or close out (the public repo stands as proof of the work either way). DO NOT SUBMIT unless this is resolved and the resolution is on record.
2. **AGENT ACCESS — ESCALATE TO SNEAKS (same decision as #1).** The listing's agentAccess flag is HUMAN_ONLY (Earn API, verified 2026-10-24, 2026-10-31 rescan, and 2026-11-03). This study was designed and executed by Halfmoon Studio, an agent-run studio. Submitting it as a human entry would misrepresent the entry and break the submissions skill's "no entries where the rules ban AI-assisted work" rule. Any submission requires Sneaks's explicit decision on record (e.g., a granted exception from Superteam Ukraine that covers both the region gate and the agent-access flag).
3. **PAYOUT ADDRESS — SNEAKS FILLS at submission.** The Earn submission form takes the payout address at submission time (no wallet is embedded in the profile). The approved entry draft (SUBMISSION.md) designates the dedicated measurement wallet 2RCiezWiYHMULwXdn1MCxs82SDRWLK8QxQVAUGMFAXvJ; Sneaks supplies/confirms the address in the form himself — payout setup stays with Sneaks, and Muse takes no wallet action.
4. **SUBMISSION CREDIT + SUBMIT ACTION — SNEAKS.** The Halfmoon account held 3 submission credits issued ~2026-10-24; a note in the draft checklist flags a possible ~2026-10-31 expiry, UNVERIFIED. Whether a valid credit exists on submission day needs Sneaks's Halfmoon login to check. The submit itself is made from Sneaks's logged-in Halfmoon account — his action, or his explicit go-ahead on record.

## Fields (exact text)
Submitted by: Halfmoon Studio (@gethalfmoon) — https://superteam.fun/earn/t/gethalfmoon
Title: Inside the Block: 400 self-transactions across 22 validators — no stable ordering rule found
Entry text:
**Summary.**
We measured how Solana validators order transactions inside a block
using only our own transactions as evidence. From a dedicated wallet
we fired 25 bursts of 16 self-transfers (400 transactions, all
landed, slots 460,988,576–461,028,101), with priority-fee tiers
deliberately decorrelated from send order and the pattern reversed on
alternate bursts, timed to land in targeted leader windows across 22
validators and 3 client families (jito-solana, firedancer, agave).
Each transaction's position inside its block was then compared
against its send order and its fee tier (Spearman correlation per
burst, pre-registered threshold |rho| ≥ 0.7, verdict requires all of
a validator's qualifying bursts to agree).

**Result: no stable ordering rule (H0).** 19 of 22 validators showed
no pattern; 1 was mixed; the 2 single-burst "ordered" results are
the two halves of one burst that split across two leaders, and meet
no all-bursts rule. The validators with the most bursts agree: the
3-burst agave validator was no-pattern in all three. One honest
qualification: pooled across all 26 groups, higher fees landed
slightly earlier on average (size-weighted rho_fee ≈ −0.14,
permutation p ≈ 0.007) — a weak aggregate tendency, far too
inconsistent to predict any individual validator's ordering. In
plain terms: for ordinary self-transfers at these fee levels,
neither arrival order nor priority fee reliably predicted in-block
position on any client family we measured.

**Verifiability.** The full raw dataset — every signature, slot,
block position, fee tier and send index — ships in the repo
(`data/live-dataset.jsonl`), with a one-command reproduction path
(Docker Compose: tests + simulated pipeline + the exact analysis
that produced the numbers above). The design was pre-registered in
DESIGN.md before the first live transaction; every deviation
encountered (Alpenglow timing, empty leader schedules, RPC send-path
failures, the fragment floor) is documented in REPORT.md with its
evidence. Total on-chain spend: 0.029635 SOL against a hard-capped
0.05 SOL budget, enforced in code.
Repository link: https://github.com/0xSneaks/inside-the-block
Payout address (Solana): [SNEAKS FILLS at submission — designated address on record in the approved entry draft: 2RCiezWiYHMULwXdn1MCxs82SDRWLK8QxQVAUGMFAXvJ]

## Attachments
- Final study report → https://github.com/0xSneaks/inside-the-block (REPORT.md in repo; local copy ~/workspace/inside-the-block/REPORT.md) — full results, per-validator verdicts, deviations and "what went wrong" evidence.
- Public code repository → https://github.com/0xSneaks/inside-the-block — harness, tests, DESIGN.md (pre-registered design), README, Docker Compose one-command reproduction.
- Raw dataset → data/live-dataset.jsonl in the repo — every transaction signature, slot, block position, fee tier, and send index, verifiable via getBlock.
- Approved entry draft → ~/workspace/inside-the-block/SUBMISSION.md — the entry text above is verbatim from this draft (approved by Sneaks 2026-10-24); the only fill-in since the draft is the repository link, which now points to the published repo.

## Escalations
Stated in full at the top of this packet: (1) regional eligibility blocker — ESCALATE TO SNEAKS; (2) agentAccess HUMAN_ONLY — ESCALATE TO SNEAKS; (3) payout address — SNEAKS FILLS at submission; (4) submission credit check + the submit action itself — SNEAKS.

---
Packet assembled 2026-11-03 by Muse from finished work (study completed 2026-10-24). Listing state re-verified 2026-11-03 via the official Superteam Earn API and listing page. Status: NOT SUBMITTED — blocked on Escalations #1–#2; no submission may be attempted until Sneaks's decision is on record, and any eventual submission still requires Claude's APPROVED @ hash on this packet first.

## Sneaks's decision — 2026-11-03 08:27 ET (voice call)
ASK Superteam Ukraine for an exception. Do not close out.

## Exception request — DRAFT (goes through Claude's review with this packet before sending)
Route: Superteam Ukraine chapter / listing contact (confirm the exact contact at send time).

"We're Halfmoon Studio, a US-based agent-run studio. We completed the full Inside the Block study before attempting to submit in October: 400/400 transactions measured across 25 bursts, report and public repo here: https://github.com/0xSneaks/inside-the-block. At the submit step we found the listing is limited to Ukraine residents (our profile's Submit button is disabled) and flagged HUMAN_ONLY. We're writing to ask whether an exception is possible: the work is complete, public, and reproducible, and we'd disclose the studio's agent-run nature in the entry itself. If the regional and human-only limits are firm, we understand completely — the repo stands as a public good either way. Thank you for considering it."
