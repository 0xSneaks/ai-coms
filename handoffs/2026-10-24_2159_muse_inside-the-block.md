# Handoff — inside-the-block · repo published; Superteam submission blocked (regional gate)

- **Agent:** muse · **Filed:** 2026-10-24 21:59 ET · **Project:** inside-the-block

## Did

- Published the public repo (see State for the commit map). The `.github/workflows/verify.yml` file went in through the GitHub web UI as its own commit because the muse teo fine-grained token lacks the Workflows permission — the token-403 creation blocker from the 21:45 handoff no longer applies.
- Attempted the Superteam submission from the signed-in Halfmoon Studio profile (@gethalfmoon; sign-in fine, 3 submission credits intact). The listing is regional: "only open for people in Ukraine." The Submit button is disabled for the US-based profile. Stopped there — no submission was made and no circumvention was attempted (no VPN, no residency misrepresentation, no borrowed profile).

## State + proof

- **Repo LIVE:** https://github.com/0xSneaks/inside-the-block — 14 replayed history commits + final publish commit `e1a55eaa` (datasets `data/live-dataset.jsonl`, `data/pilot-helius-dataset.jsonl`, `data/dryrun-fee.jsonl`; SUBMISSION.md carrying the repo URL and the two approval boxes checked) + workflow commit `5be15aa`.
- **Actions GREEN:** "verify" run #1 on `5be15aa` completed with SUCCESS — test suite + headline dataset analysis + docker compose reproduction all pass in CI.
- **Listing at check time (~21:55–21:58 ET):** Submissions Open, 5 submissions, ~11d 20h remaining, winner announcement Nov 19, 2026, deadline 2026-11-05 21:59 UTC. Regional restriction in force; 0 of 3 credits consumed.
- **Study artifacts unchanged and complete:** REPORT.md final, 400/400 txs landed, H0 result, actual spend 0.029635 SOL vs the 0.05 cap.

## Decided

- The residency requirement is a hard gate, not an obstacle to route around. The submission stays blocked.
- The miss is a screening failure, recorded plainly: the 2026-10-24 eligibility screening checked the listing's `agentAccess` flag (HUMAN_ONLY) but did **not** surface the regional restriction — and that check happened before the study was funded and run. Regional eligibility is now a required field in any future bounty screen, checked before any funding decision.

## Next

- **Sneaks decides:** ask the Superteam Ukraine sponsor for an exception for a US-based studio entry, or close the bounty out. If an exception is granted, the entry is paste-ready (SUBMISSION.md + public repo), credits are intact, and the deadline is 2026-11-05 21:59 UTC.
- Either way, the study + repo stand as a public portfolio artifact; nothing about the result depends on the bounty outcome.
- Still open, separate threads: [claude → muse] independent recompute request; [muse → codex] engineering/repro review — the repro review can now run against the public repo and its green Actions run.
- Sweep-back of the measurement wallet's remaining SOL is still Sneaks's call (unchanged).

## Don't

- Don't circumvent the regional gate — no VPN, no fake residency, no third-party Ukraine profile.
- Don't move or spend the measurement wallet's remaining SOL without Sneaks.
- Don't screen any future bounty on `agentAccess` alone; regional eligibility gets checked before funding, every time.
