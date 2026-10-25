# Bounty scout

**Repo:** private `0xSneaks/bounty-scout` (created 2026-10-24, API-verified private)  ·  **Live URL:** none  ·  **Last updated:** 2026-10-25 by muse

## Now (keep this current)
LIVE since 2026-10-24 23:56 ET (Sneaks approved 23:39 ET). Cron `bounty-scout-cycle` runs every 4 h (next ~2026-10-25 03:47 ET): 7 Blue lanes → merge/dedupe → score → digest in the bounty-scout repo → ping Sneaks only on fit ≥ 4 / deadline < 72 h / material change. Cycle 1 done: 57 raw rows → 47 unique items, 14 at fit ≥ 4 (digest digests/2026-10-24_2352.md). Cycle 2 done 2026-10-25 03:47 ET (weekly roll-up handoffs/2026-10-25_0347_muse_bounty-scout.md): 59 tracked (12 new, 5 changed); new fit-4 Meta Global AI Hackathon with application deadline 2026-10-25 23:59 ET; Open Innovation Track closed/removed; Firedancer fit 4→3 (1 SOL burn). Digest digests/2026-10-25_0347.md.

## Established (decisions — don't re-litigate)
- Discovery only: find and track bounties; never test, scan, or submit against a target without Sneaks's per-program yes — 2026-10-24, claude (INTENT from Sneaks: search, not hunt)
- Scope now includes security-research programs (vuln/zero-day disclosure bounties, malware/threat-intel, CTF) as leads to TRACK; scout never does the security work itself — 2026-10-24, claude
- 4 h cycle (Sneaks asked 4–5 h; 4 h matches muse's coms cron) — 2026-10-24, claude
- Per-cycle output lives in the bounty-scout repo, not this board; board gets a weekly roll-up — 2026-10-24, claude
- Flag KYC on every item; Sneaks stays anonymous — 2026-10-24
- Rank by Muse's proven lane: measurement/research bounties (inside-the-block style) and audit/eval (sneaky-alpha style) score highest; +1 for reproducible-report/dataset payouts — 2026-10-24, claude (INTENT from Sneaks)
- Use the full fleet (Blue sub-agents, 35-model Agora, Seeker/Termux/cron, repro harness) for discovery/scoring/drafting only — never to touch a target — 2026-10-24
- No sign-ups, logins, CAPTCHA solving, wallets, or submissions in Sneaks's name — 2026-10-24

## Built
- Private repo 0xSneaks/bounty-scout (README + seen.json seeded; cycle 1 wrote 47 items + first digest) — muse, 2026-10-24
- VM cron `bounty-scout-cycle` (4 h) — muse, 2026-10-24

## To do (priority order)
1. ~~Cycle 0 source audit per lane~~ DONE 2026-10-24 (see Stack below) — muse
2. ~~Install 4 h cron, run cycle 1, send Sneaks first digest~~ DONE 2026-10-24 — muse
3. Get Sneaks's payout threshold for pings (asked in the cycle-1 report; fit ≥ 4 rule applies until then) — muse

## Known issues / gotchas
- Source list in the handoff is INFERENCE (model knowledge, not checked 2026-10-24). Cycle 0 confirms it.
- Fake "bounty" posts that ask for deposits, wallet connects, or downloads are scams: log, don't open.

## Stack & where things live
- Plan: [handoffs/2026-10-24_2025_claude_bounty-scout.md](../handoffs/2026-10-24_2025_claude_bounty-scout.md)
- Runs on muse's VM (cron). State: `seen.json`, digests in `digests/` (bounty-scout repo).
- Sources per lane (cycle 0, VERIFIED 2026-10-24): Immunefi/Cantina/HackenProof/Hats/Sherlock bounties public; Cantina competitions public (Code4rena dormant, Sherlock contests JS-only, CodeHawks First Flight XP-only); HackerOne/Bugcrowd/YesWeHack public, Intigriti LOGIN-WALLED (gap); Superteam Earn API works, GitHub bounty-label search works (scam-bait flagged), Opire/Bountycaster JS shells (gap), Gitcoin = grants rounds, Algora discovery-only; Colosseum/DoraHacks/Devfolio/ETHGlobal + Solana Foundation/Superteam grants public; social = web search works, X login-walled, Farcaster public (no bounty posts found); ZDI + vendor disclosure pages public; paid CTF/threat-intel listings unverified (gap).
