# Cherry Hold'em (working name) — Texas Hold'em Tournament Edition for Cherry

**Repo:** 0xSneaks/cherry-holdem (exists; single-player on main)  ·  **Live URL:** none  ·  **Last updated:** 2026-11-11 by claude

## Now (keep this current)
Build ORDERED by Sneaks 2026-11-09 13:19 ET — coding reassigned to DeepSeek (muse's DeepSeek web lane), muse orchestrates + lands code + verifies. Repo 0xSneaks/cherry-holdem being created private. Stack per Sneaks's 2026-11-09 pasted spec: Next.js on Vercel + Cloudflare Durable Objects (one per table, WebSockets, alarms) as dealer + Postgres (Neon). Credits-only: 10,000 free credits on first login (server ledger); SOL_ENABLED=false stub only — no SOL/escrow/payout/signing code. Cherry login via verifyLaunchToken; APP_ID is an env var until the portal app exists (batched bring-item for Sneaks).
CONFLICTS with the 2026-11-08 filed spec, resolved FOR the 2026-11-09 order: WebSockets/DO instead of short polling; 10,000-credit ledger instead of 1,500-chip stacks + room points; clock blind levels instead of hand-count levels. Everything else in Established below stands until Sneaks says otherwise.

**Art 2026-11-11 (Sneaks via muse):** the 36 flat template number cards (72168a0, 8cecebc) are being re-illustrated by grok-bot, one suit at a time, hearts first; claude verifies each suit before the next → [order](../handoffs/2026-11-11_0200_claude_grok-bot-number-cards.md). Indices stay code-rendered.

**Single-player 2026-11-11 (Sneaks 02:21–02:25):** claude builds single-player Sit & Go vs bots now (credits only). Must include a cherry-icon silhouette on the table and a tiny hidden maker stamp (Easter egg, magnifier-only). Goal: high quality, enjoyment, repeat users.

## Established (decisions — don't re-litigate)
- INTENT (Sneaks 2026-11-08): Texas Hold'em tournament edition as a Cherry mini app; Grok makes HQ cards, Codex finishes the build.
- PLAY CHIPS ONLY. No buy-in, no purchase, no withdrawal, no cash value, no SOL anywhere in v1. Real-money poker = gambling-license territory → KILL for v1 (claude, 2026-11-08). Changing this needs Sneaks + legal review.
- Format: single-table Sit & Go, No-Limit Hold'em, 2–6 seats (6-max fits 360px), freezeout (no rebuys).
- Start stack 1,500 chips. Blinds 10/20 → up every 6 hands: 10/20, 15/30, 25/50, 50/100, 75/150, 100/200, 150/300, 200/400, 300/600, 400/800 (then x1.5). Hand-count levels, not clock levels (no timers on serverless).
- Turn timer 20 s; on timeout: check if free, else fold. 2 × 30 s time banks per tournament. Disconnected = auto check/fold, seat kept, blinds still posted.
- Table is created from a Cherry room; seats open to that room's members. Host taps Start at 2+ players. Optional "fill with bots" (simple rule bot) so a table always runs.
- Finish order → room points: 1st 50, 2nd 30, 3rd 20 (6-max), scaled down for smaller tables. Room leaderboard + weekly leaderboard. Points have no value.
- Provably fair: per hand, server picks a 32-byte seed, posts sha256(seed‖tableId‖handNo) before dealing, Fisher-Yates with crypto RNG from the seed, reveals the seed after the hand. Client "verify hand" button.
- Server-authoritative: deck, hole cards, betting, pots all on the server. Hole cards NEVER in a shared payload — each player fetches only their own two cards, authenticated.
- Stack: Next.js on Vercel (team phantomcapais-projects) + Postgres (Neon via Vercel Marketplace, provisioned by muse) + short polling (≤1 s with ETag/version) for table state. No websocket service → no extra accounts. Turn-based game, 6 players: polling is enough.
- Art split: Grok makes illustrated art only. Every rank/suit index is rendered in code (SVG) — AI art garbles letters and numbers. ~~Number cards rendered in code~~ SUPERSEDED 2026-11-11 (Sneaks): number cards are illustrated by Grok, pips only, no text.

## Built
- Art pack v1 (grok) in private repo 0xSneaks/cherry-cards `artwork/` @ dc13ae7 — 11 sheets. QA by claude 2026-11-09 13:40 ET → [handoff](../handoffs/2026-11-09_1340_claude_cherry-cards-art-qa.md): 10/11 usable; 02-diamonds has baked-in A/J/Q/K corner letters → re-roll pending (grok-bot).

## To do (priority order)
1. Sneaks Step 0: create repo 0xSneaks/cherry-holdem (or reply "codex create it"); Cherry portal → new mini app → post App ID + project ID on this file. — sneaks
2. Art pack per [handoff §Art](../handoffs/2026-11-08_2150_claude_cherry-holdem.md) — grok-bot
3. Engine + tests (no UI) — codex
4. API + DB + Cherry sign-in — codex (auth path: claude-code reviews)
5. Table UI 360px + art integration — codex
6. Preview deploy + live checks — muse
7. Upload Sheet → Sneaks presses Run checks / Run the test — claude/muse

## Known issues / gotchas
- "Cherry Casino" is an existing playing-card brand — do not copy its decks or name the game "Cherry Casino". INFERENCE: "Cherry Hold'em" itself has no clash found (web search 2026-11-08); recheck in Cherry before final.
- Inside Cherry: NO connect-wallet button, NO signMessage login (portal test fails). Lesson from cherry-royale.
- Vercel Production boots 500 if any env var is missing on the Production target. Preview first.

## Stack & where things live
- Next.js (App Router, TS), Vercel, Postgres (Neon), `@cherrydotfun/miniapp-sdk` latest.
- Env NAMES: `CHERRY_APP_ID`, `DATABASE_URL`, `SESSION_SECRET`, `CHERRY_DEV_IDENTITY` (Preview only, never Production).
- Art: `public/art/` (final, optimized WebP) · `art/raw/grok/` (Grok originals, PNG).
