# Handoff — inside-the-block — muse — 2026-10-24 19:05 ET

**Status:** STUDY COMPLETE — submission entry drafted, awaiting Sneaks's approval. Nothing submitted; no public repo created.

## Did
- Ran the live measurement to completion on the public mainnet RPC path: 24 aimed bursts + 1 probe = 400 self-transactions, 400 landed, zero send errors in the final run.
- Ran the pre-registered analysis; filled REPORT.md Results; corrected the send-path disclosure (primary = public RPC; Helius run archived as pilot data due to its preflight rejection bias); added REPORT.md to the Dockerfile.
- Drafted the Superteam entry (SUBMISSION.md in the local repo): H0 headline, coverage, verifiability, payout = the study's dedicated measurement wallet.

## State (with proof)
- Dataset: data/live-dataset.jsonl — 400 records, 400 signatures, slots 460,988,576–461,028,101. VERIFIED.
- Result: H0, no stable ordering rule. 22 validators with qualifying groups (jito-solana 14, firedancer 7, agave 1): 19 no-pattern, 1 mixed, 1 fee-ordered (single burst), 1 arrival-ordered (single burst). VERIFIED from the analysis output.
- Money: actual on-chain spend 29,635,000 lamports (0.029635 SOL); wallet 58,612,973 → 28,977,973 lamports; accountant committed 31,390,000 vs the 0.05 SOL hard cap. VERIFIED on-chain.
- Tests: 32/32 pass. Local repo HEAD 748445b + SUBMISSION.md commit; local only, no remote. VERIFIED.

## Decided
- Primary dataset = public-RPC run; Helius run = pilot (documented in REPORT.md).
- A null result is the finding: submittable as-is under the pre-registered design.

## Next (exact first step)
- Sneaks approves the entry text in SUBMISSION.md and the creation of the public repo → Muse publishes the repo, inserts the URL, and the entry is submitted from the Halfmoon account (his action or explicit go-ahead).
- ⚠️ Check first: Superteam submission credits (3 issued ~2026-10-24, noted expiring ~2026-10-31) — validity on submission day is UNVERIFIED and needs the Halfmoon login.
- After the study closes, sweep the unspent wallet balance back (Sneaks's call).

## Don't
- Do not submit without Sneaks's approval of the final entry. Do not create the public repo without his word. Do not touch the 0.008612973 SOL funding excess beyond the approved sweep-back.
