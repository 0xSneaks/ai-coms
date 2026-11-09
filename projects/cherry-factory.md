# Cherry Factory — ship many Cherry mini apps from one template

**Owner:** Sneaks (verified Cherry dev as of 2026-11-08) · **Last updated:** 2026-11-08 by claude

## Now
Plan filed 2026-11-08 23:52 ET. Starter template + Cherry terms check start tonight/tomorrow.

## Established
- INTENT (Sneaks 2026-11-08): now a verified Cherry dev; wants to ship casino games (blackjack, slots, etc.), the miner (SOL RIGS) and more, and get paid.
- VERIFIED (Sneaks 2026-11-08): on Cherry, games are not free-to-play — Cherry's platform carries real value.
- GATE: no real-money wager, payout or token wiring in ANY app until the Cherry terms check below is posted AND Sneaks rules on it. Until then build play-chip mode with the wager layer as a disabled stub. Cherry Hold'em's PLAY-CHIPS-ONLY decision stands until that ruling.
- Money paths (RNG, payouts, wagers, auth) = claude-code or codex review only. DeepSeek, Cherry Builder and other cheap/overflow bots never touch them.
- Every casino game: provably fair RNG (commit seed hash → deal → reveal), server-authoritative, house edge shown on screen.

## Pipeline (one app at a time per builder)
1. Idea + spec → claude (cherry-messenger-creator skill) → projects/<app>.md
2. Build → codex (primary); Cherry Builder in Grok Bot as second builder on non-money apps
3. Art → grok-bot (shared casino kit: cards, chips, felt reused across games)
4. Test → MOG Tester + MOG Auditor pattern
5. Money/auth review → claude-code
6. Deploy → muse (Vercel Pro, team phantomcapais-projects)
7. Submit → Sneaks (portal login needs his verified account); claude writes every portal field

## To do (priority order)
1. **cherry-starter template** — codex. Repo 0xSneaks/cherry-starter (create it if you can; else ask Sneaks once). Next.js on Vercel, Cherry sign-in + SDK wiring, 360px shell, shared provably-fair RNG module with tests, server-authoritative game-loop skeleton, wager layer as interface with flag OFF, portal-fields template from skills/cherry-messenger-creator. Done = template builds, tests pass, a hello-world app deploys from a fresh copy.
2. **Cherry terms check** — muse, tomorrow, READ-ONLY (don't accept, sign or change anything). From the Cherry dev portal/docs, quote and link: (a) who holds the gaming license / who is the operator for wagering; (b) whether US and New York players are geoblocked; (c) whether compliance with local law is put on the developer; (d) how devs get paid (rev share %, payout method, schedule); (e) any rules on casino-style games. Label each VERIFIED (quoted) or UNKNOWN. Post here. Sneaks rules after.
3. **Cherry Hold'em** — continues per projects/cherry-holdem.md (codex engine, grok-bot art).
4. **Blackjack** — next spec (claude) once the template exists; reuses Hold'em card art.
5. **SOL RIGS** (miner) — projects/sol-rigs.md; lowest legal risk.
6. **Slots, roulette** — after the terms ruling.

## Built
- nothing yet
