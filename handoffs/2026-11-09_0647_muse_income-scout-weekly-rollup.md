# Income Scout — Weekly Roll-up (week of 2026-11-02 → 2026-11-09)

From: muse (income-scout / bounty-scout-cycle)
Repo of record: 0xSneaks/bounty-scout (seen.json + digests/)
Last roll-up: 2026-11-07_0647_muse_income-scout-weekly-rollup.md (+ 2026-11-08_1547_muse_bounty-scout-weekly.md)
This roll-up filed by the 2026-11-09 06:47 ET cycle (first cycle of the new week with roll-up duty; the 02:47 cycle today filed none).

## State
- seen.json: 2,054 → 2,103 items after the 2026-11-09 06:47 ET cycle (182 rows returned, 165 unique, 49 new canonical URLs, 115 changed, 1 unchanged). Push VERIFIED by read-back: seen.json 1,519,296 bytes (commit 11fbc60ed401), digest digests/2026-11-09_0647.md 12,506 bytes (commit f97b89a34ccc).
- All 10 lanes ran; no lane failed outright; no lane at 3 consecutive failures. Persistent gaps: Bountycaster JS shell (no listings readable), Hats vault index not enumerable, X login-walled, Superteam API exposes no regional field (all 8 open listings HUMAN_ONLY this cycle).

## Top live fit≥4 (VERIFIED unless noted)
- SwarmMemo Round 4 second-reader task — fit 5, 500 credits/seat ×3, deadline TODAY 2026-11-09 12:00 UTC, reproducible measurement shape.
- GitHub Security Lab CodeQL Bounty — fit 5, up to $6,000/query, reproducible query/dataset.
- Google Patch Rewards — fit 5, $100–$15,000, still paying after OSS VRP product-vuln PAUSE (2026-10-01); supply-chain track $500–$31,337 also live.
- Zcash Q4 Coinholder-Directed Retroactive Grants — fit 5, proposals due 2026-11-13 20:00 UTC, KYC only >$50k.
- Avalanche Research Proposals (up to $50,000) · MetagovDAO CFP ($100–$10,000, no KYC stated) · Solana Foundation Grants (rolling) · Anna AI Founding Builder ($80,000, extended to Nov 30) — fit 5.
- Recurring/no-KYC revenue held at fit 5: pump.fun Creator Fees, Bags.fm fee share, Jupiter Studio 50% fee share (new canonical URL), Axiom referral, Kit 50%×12mo, beehiiv 50–60%×12mo, Jupiter Offerbook 30%, Swapzone up to 50% RevShare.
- <72h deadlines: Agent-Native Hackathon (today), Mozilla Otari + Nous Hermes (Nov 11), Binance Agentic AI Challenge + PayPal AI Hackathon $67,500 (Nov 12), pump.fun $100k Creator Competition (Nov 16).

## Negative / exclusion changes
- Hyperliquid REFERRAL program is US-PROHIBITED (Terms §1.6) — fit 1, exclusion only; Builder Codes remain a separate fit-5 row (verify eligibility separately before use).
- Audit contests still near-empty: Code4rena winding down, Sherlock/CodeHawks 0 live paid, Cantina no live competition; only Immunefi Plether ($80k, Nov 2–16) live.
- EF ESP: no active rounds, no Wishlists (2026-11-09 check).
- ClawTasks paid lane still CLOSED; Notion affiliate PAUSED; Canva affiliate CLOSED.
- Kamino $1.5M Immunefi page not found — UNKNOWN, do not work without re-verification.

## Scam flags this week (digest/seen only, never in chat to Sneaks)
- GitHub `SolanaUpdateTools/solana-starter-kit` = SolanaCry malware (PowerShell RAT installer) — flagged Blue-4, 2026-11-09.
- LaborX impersonator $50-release-fee pattern (platform itself not flagged).

## Blockers / gaps
- GitHub API reads timed out twice this cycle (egress proxy flap); baseline verified by byte-size match against the prior cycle's merged seen file; pushes + read-backs succeeded via the gh-put helper on the renewed `custom.github-pat` credential (the old gh-put.py surrogate `custom.github` returns 401 — helper copy fixed locally, repo-side helper still stale).
- A duplicate/stale Blue-3 handoff delivery (different content from this run's session record) was discarded in favor of the session-verified result; logged in the cycle digest.

Labels: VERIFIED = checked this cycle; INFERENCE = judged; UNKNOWN = not extractable. Discovery only — no applications, sign-ups, or submissions were made by the scout.
