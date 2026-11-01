# Handoff — claude-code → Sneaks (cc all) — 2026-11-01 09:45 ET — status check: who's on what, ETA, needs, problems

**Re:** [order 08:23](../orders/2026-11-01_0823_e489956647ee.md).
**Source:** BOARD.md (claims, requests, blockers, latest handoffs) at `8c02625`.
**Labels:** VERIFIED = on the board with evidence or checked by me. INTENT = an agent said it will. UNKNOWN = nobody has posted it. ETAs are only what agents posted; most are UNKNOWN.

## Short answer
Work is moving and nothing is on fire.
- The main slowdown is decisions only you can make: merges, deploys, money and account steps (list below).
- No agent is blocked on another agent except where noted.

## Who's on what
| Agent | Working on | Status | ETA | Needs |
|---|---|---|---|---|
| **claude** | gta6ismogged: DA CITY game (lane 8 visual lab) + review of codex's Phase 0 PR | VERIFIED: game built (`3ba5128`); Phase 0 PR #1 PASS; lab prototype done on a branch | UNKNOWN (posts follow codex's merge) | muse to merge PR #1 |
| **codex** | gta6ismogged Phase 0 (game.js → modules, zero behavior change) | VERIFIED: finished as PR #1 (`3832a14`), signed off by claude | done; merge pending | merge (muse) |
| **muse** | Backlog run in claude's order: (1) moonboy bot VPS on GCP free tier; (2) kalshi-brain integrate + calibration; (3) stonkfunbot verdict; (4) quick closes. Plus GTA6 site deploy, OG BOOMER site, narrative-ops monitoring | INTENT/in flight. VERIFIED: GTA6 site built (private repo); OG BOOMER preview delivered | UNKNOWN | your go for the GTA6 deploy; your card/OK where GCP needs it |
| **chatgpt** | nori-chan release audits (~hourly); apply-all docs; OG research | VERIFIED: audits keep reporting "GitHub/Vercel unchanged; Muse GO + four Seeker tests unverified" | ongoing | muse's GO + the Seeker tests to close nori-chan |
| **claude-code** (me) | Hourly board duty; kalshi-brain fair-value model; GTA6 review | VERIFIED: model delivered (18/18 tests); GTA6 review posted | idle until new work | nothing |
| **astra** | — | UNKNOWN: no recent activity on the board | — | — |

## Problems / risks
1. **Nori-chan release has been "unverified" for days.** chatgpt re-audits about hourly with the same result. That repeats work without closing the item. It needs muse's GO and the four Seeker phone tests, or your call to stop the hourly audits. INFERENCE: hourly is wasted effort until one of those lands.
2. **Kalshi prod stays locked.** Correctly so: it waits on muse re-checking G3c and merging it to kalshi-trader main. Live trading after that still needs your Face ID approvals. VERIFIED.
3. **The GTA6 game loads its 3D engine from an outside CDN.** One outage there means no game. Fix proposed in my 09:20 review (self-host it). Low effort.
4. **Requests board noise.** The board shows 46 warnings: mostly old requests that are answered or superseded but were never closed. That makes real asks harder to spot. Suggestion: each agent closes its own stale lines today. I'll close mine.

## Your decisions (oldest first; only you can do these)
1. **coms-pwa PR #5:** merge yes/no (RUN THE CREW button + toast fix, 38/38 tests).
2. **seeker-bridge PR #1:** merge + restart the phone proxy after muse verifies.
3. **muse-tune-up `feat/captcha-handoff`:** not on main, so the browser service reports `escalation: unavailable`.
4. **halfmoon-proof-kit:** say "add halfmoon-proof-kit" so I can push the 2-line fix, or let muse push it.
5. **Deploys:** GTA6isMOGGED (static Vercel, $0) and ath (devnet). Each is a yes/no.
6. **Money/accounts:**
   - narrative-ops desk is unfunded.
   - Muse's Farcaster burner needs ~$1–2.
   - x402 agent needs "✅ Sneaks APPROVED the build".
   - FOMO GTA6 tag needs 5M GTA6 in your FOMO account.
   - X credit top-up is needed for the OpenCode tweet swap.

## Next
- Agents: close your own stale request lines; keep claims current with ETAs.
- I'll mark my answered lines DONE on my next check-ins.
