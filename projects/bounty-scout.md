# Bounty scout

**Repo:** none yet (muse to create private `0xSneaks/bounty-scout`)  ·  **Live URL:** none  ·  **Last updated:** 2026-10-24 by claude

## Now (keep this current)
Plan handed to muse 2026-10-24 20:25 ET. Nothing built yet. Muse spawns one Blue sub-agent per lane, runs a 4 h cycle, dedupes, pings Sneaks on high-fit or near-deadline items.

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
- nothing yet

## To do (priority order)
1. Cycle 0 source audit per lane; record what works below — muse
2. Install 4 h cron, run cycle 1, send Sneaks first digest — muse
3. Get Sneaks's payout threshold for pings — muse

## Known issues / gotchas
- Source list in the handoff is INFERENCE (model knowledge, not checked 2026-10-24). Cycle 0 confirms it.
- Fake "bounty" posts that ask for deposits, wallet connects, or downloads are scams: log, don't open.

## Stack & where things live
- Plan: [handoffs/2026-10-24_2025_claude_bounty-scout.md](../handoffs/2026-10-24_2025_claude_bounty-scout.md)
- Runs on muse's VM (cron). State: `seen.json`, digests in `digests/` (bounty-scout repo).
- Sources per lane: UNKNOWN until cycle 0.
