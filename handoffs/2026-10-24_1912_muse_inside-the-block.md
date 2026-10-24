# Review request — inside-the-block — muse → claude, grok, chatgpt, codex — 2026-10-24 19:12 ET

## What this is
The Solana validator-ordering study ("Inside the Block", Superteam Earn bounty, deadline 2026-11-05) is COMPLETE. Before it is submitted, Sneaks wants every agent's eyes on it — your independent review is the edge. Review the methodology and the entry, attack what is weak, and post your critique as your own handoff in this repo. Verdict line required: SOUND / SOUND-WITH-FIXES / NOT-READY, one line each on proof, contradictions, risks.

## Where to look
- **This note** — the full results and method summary are below; it is self-contained for chat agents.
- **On Muse's VM** (agents with VM access): `~/workspace/inside-the-block/` — `REPORT.md` (final report), `DESIGN.md` (pre-registered design), `SUBMISSION.md` (the entry text), `data/live-dataset.jsonl` (the raw dataset: 400 records, every signature + slot), `harness/` (the code), tests 32/32 passing.
- **Public repo:** does not exist yet — creating it is gated on Sneaks's approval of the entry. Do not create it.

## The study in brief
Question: when one sender's transactions arrive in a leader's window in a known send order with known priority fees, in what order do they land in the block? Pre-registered hypotheses: arrival order (H1), priority-fee order (H2), client-specific rule (H3), no stable rule (H0 — an explicitly acceptable conclusion).

Method: bursts of 16 self-transfers from one dedicated wallet; fee tiers (zero/low/mid/high, exact fees 5,000 / 17,500 / 55,000 / 105,000 lamports) decorrelated from send order by a rotating pattern reversed on alternate bursts; bursts timed to land in targeted leader windows; a transaction's validator = the leader of the slot it actually landed in (getSlotLeaders; getLeaderSchedule returns empty under Alpenglow); family/version from getClusterNodes joined with Jito's published validator set. Analysis: Spearman rho of landed order vs send order and vs fee tier per (burst, leader); a validator is ordered only if ALL its qualifying bursts agree at |rho| >= 0.7; (burst, leader) fragments under 8 landed transactions are excluded (disclosed amendment).

Execution facts: primary dataset via the public mainnet RPC (24/24 bursts, zero send errors, 16/16 landed every burst). An earlier Helius run hit preflight BlockhashNotFound rejections and is archived as pilot data only. Landing lag measured ~110 slots; bursts were aimed with that offset.

## Results (VERIFIED)
- 400 transactions, 400 landed, slots 460,988,576–461,028,101.
- 22 validators with qualifying groups: jito-solana 14, firedancer 7, agave 1.
- Verdicts: 19 no-pattern, 1 mixed, 1 fee-ordered (single burst), 1 arrival-ordered (single burst).
- **Headline: H0 — no stable ordering rule.** The 3-burst agave validator was no-pattern in all three bursts.
- Money: actual spend 0.029635 SOL vs a hard-coded 0.05 SOL cap; funding 0.058612973 SOL into a dedicated wallet.

## Attack these first (known soft spots)
1. Most validators have only ONE qualifying burst — are single-burst verdicts (including the 2 "ordered" ones) just multiple-comparison noise? The report says yes for the ordered ones; check the reasoning.
2. The fragment floor (n >= 8) was a methodology amendment made after landing smear was observed — disclosed in REPORT.md, but was it the right call?
3. Client-family classification leans on version strings + Jito's published set — where can that mislabel a validator?
4. Does discarding the Helius pilot (send-path rejections) fully remove selection bias, or does the public path have its own?
5. The entry (SUBMISSION.md) leads with the null result — is that the strongest honest framing for the judging weights (Design 35 / Verifiability 25 / Analysis 25 / Engineering 15)?

## Rules for reviewers
Read-only. Do not edit the study repo, the dataset, or the entry. Post critiques as handoffs named `handoffs/<date>_<time>_<you>_inside-the-block.md` and mark the board Requests line DONE for yourself when posted. Nothing here authorizes submission — that stays Sneaks's call.
