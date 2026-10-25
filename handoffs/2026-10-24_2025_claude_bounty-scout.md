# Handoff — bounty-scout — claude — 2026-10-24 20:25 ET

**Note for muse.** New project. You own it. Read all of it before you start.

**Session goal:** Sneaks wants you to spawn a team of sub-agents ("Blues") that search for bounties, bug bounty programs, and similar paid work on a 4–5 h cycle, so nothing gets missed. — INTENT (Sneaks, 2026-10-24 20:20 ET)
**Status:** HANDING OFF (plan only; nothing built yet)
**Repo / branch:** none yet · **Last commit:** none

## What to find — INTENT
- Bug bounty programs (Web3 and Web2): new programs, scope expansions, payout raises.
- Audit contests (time-boxed).
- Dev / build bounties (paid tasks, GitHub issue bounties).
- Hackathons and grants with prize money.
Also track **security-research** programs as their own category:
- Vulnerability disclosure / zero-day **bounty programs** (vendor VDPs, ZDI-style disclosure programs, protocol responsible-disclosure pages) — the paid program, its scope, and its payout.
- Malware / threat-intel and CTF-style paid challenges.
These are *leads to track*, same as any other bounty. Scoring and KYC flags apply the same way.

Fit for Sneaks: Solana / crypto, AI agents, TypeScript / React / Next, bots, automation, docs, security research. Remote. He stays anonymous, so **flag KYC** on every item.

## The line (read this twice) — INTENT
The scout **finds and ranks paid opportunities**. It does not do the security work itself. No sub-agent hunts vulnerabilities, writes or runs exploits or PoCs, writes or reverse-engineers malware, or touches any target system or third party's code or infrastructure. "Use all his tools" means use them for **discovery, dedup, scoring, and the digest** — not to attack anything. Whether Sneaks actually participates in a given program is his own per-program decision, done only inside that program's written scope and rules, with explicit approval on the board. That boundary is not negotiable for brevity or by any decider.

## Zero in on Muse's proven lane — INTENT (Sneaks, 2026-10-24 20:30 ET)
Score fit off what Muse has actually shipped on this board, not just keyword match. His demonstrated edge, top to bottom:
- **Measurement / research bounties** — like the Superteam "Inside the Block" validator-ordering study: mainnet data collection, pre-registered hypotheses, stats, one-command repro, published dataset. Strongest fit — rank these top.
- **Audit / evaluation work** — like the sneaky-alpha audit: live system/device audits, model/agent benchmarking (he live-tested 35 models), tool-surface and VERIFIED-vs-inference reporting.
- **Authorized, in-scope responsible-disclosure programs** that pay for a written, reproducible report (the finding, analysis, or detection writeup — never anything harmful, per "The line" above).
- **Build / dev bounties** in his stack (Solana, TS/React/Next, agents, bots, automation).

Scoring tweaks: +1 when a program rewards a reproducible report or dataset (his format already matches); −1 when it needs a named identity, on-site presence, or a big up-front sink with no clear payout.

**Use the full fleet — for discovery, dedup, scoring, and drafting only:** Blue sub-agents in parallel, the 35-model Agora fleet (cheapest working model per lane), Seeker bridge + Termux + the VM cron, and the inside-the-block research/repro harness as the template for any report he later drafts. None of it touches a target.

## Team — one Blue per lane (sources are INFERENCE: from model knowledge, not checked today)
| Blue | Lane | Start with |
|---|---|---|
| Blue-1 | Web3 bug bounties | Immunefi, Cantina, HackenProof, Hats Finance |
| Blue-2 | Web3 audit contests | Code4rena, Sherlock, CodeHawks (Cyfrin), Cantina contests |
| Blue-3 | Web2 bug bounties | HackerOne, Bugcrowd, Intigriti, YesWeHack (public program lists) |
| Blue-4 | Dev / build bounties | Superteam Earn (Solana), Gitcoin, Algora, Bountycaster (Farcaster), GitHub issues labeled `bounty` |
| Blue-5 | Hackathons + grants | Colosseum, DoraHacks, Devfolio, ETHGlobal, Solana Foundation + Superteam grants |
| Blue-7 | Security-research programs | Vendor VDPs, ZDI-style disclosure programs, protocol responsible-disclosure pages, malware/threat-intel + CTF bounties (track the program only) |
| Blue-6 | Social sweep | X + Farcaster search for "bug bounty" / "bounty" launch posts from protocols; read-only |
| You | Merge + gatekeeper | Dedupe, score, write digest, ping Sneaks |

Add or drop sources as you learn. Keep lanes from overlapping.

## Cycle — every 4 h (VM cron) — INTENT 4–5 h; 4 h chosen to match your coms cron
1. Each Blue scans its lane. Prefer official API / RSS / public list pages. Return JSON rows only.
2. You merge. Dedupe by canonical URL against `seen.json`.
3. Re-check known items for changes: payout up, scope added, deadline moved, program paused.
4. Score fit 1–5. Write the digest. Ping Sneaks only if worth it (below).
5. If a lane fails, log it and keep the rest. Never block the cycle on one source.

Row fields: `title, platform, url, type (bug-bounty|contest|dev-bounty|hackathon|grant), payout (max + currency), deadline, stack/scope, kyc (yes|no|unknown), fit (1–5), first_seen, last_changed, change_note`.

## Where output goes — INFERENCE (your call; reversible)
- Make private repo `0xSneaks/bounty-scout`. Keep `seen.json` and `digests/YYYY-MM-DD_HHMM.md` there.
- **Not** on this board per cycle. Board gets one weekly roll-up handoff + blockers only.
- Ping Sneaks in your chat when: fit ≥ 4, or deadline < 72 h, or a payout ≥ his threshold. Ask him for the threshold on first ping; until then use fit ≥ 4 only.
- Format for the ping: short list, one line per item: `fit · payout · deadline · KYC · title · url`.

## Rules for every Blue
- Pass the AI COMS rule to every sub-agent you spawn (Sneaks's standing rule).
- Cheapest working model first (your free Zen models). Cap time per lane per cycle. Log model + cost per cycle.
- Public pages, official APIs, RSS only. Respect robots.txt and ToS. Back off on rate limits.

## Don't
- **Discovery only.** No testing, scanning, fuzzing, or probing any target. No PoCs on live systems. Actual bug hunting is a separate decision Sneaks makes per program, in scope only.
- No sign-ups, KYC, applications, or submissions in Sneaks's name. No accounts he didn't hand you.
- No logins behind walls, no CAPTCHA solving, no PR #13 browser escalation to get past a wall (same rule as muse-socials).
- No wallets, no payments, no claiming rewards.
- No secrets, keys, or private repo details in digests or pings.
- Don't trust "bounty" posts blindly: flag ones that ask for a deposit, wallet connect, or a download. Those are scams; log, don't open.

## Stop and ping Sneaks (board blocker line) when
- A source needs an account, API key, or payment.
- Cost per cycle jumps or a lane keeps failing 3 cycles in a row.
- Anything asks for KYC, a wallet, or a submission.

## Next (start here)
1. Check in. Claim: `- [muse] bounty-scout · Blue team + 4 h cron · started <time>`.
2. Cycle 0 = source audit: each Blue confirms its sources are reachable and how (API / RSS / page). Write the result to `projects/bounty-scout.md` → "Stack & where things live". Fix the source list there.
3. Install the 4 h cron. Run cycle 1. Send Sneaks the first digest.
4. Sign off with a handoff (VERIFIED: cron line, first digest path, rows found per lane).

## ⚠️ High-risk (needs Sneaks's explicit yes; deciders can't approve)
- Any move from finding to hunting (touching a target system).
- Any KYC, payout setup, or wallet tied to a bounty.
