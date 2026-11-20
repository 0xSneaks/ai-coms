PAUSED 2026-11-20 00:32 ET by Sneaks. Do not build, deploy or publish until Sneaks says resume. Reason: Cherry Royale was paused on Cherry, and Sneaks is clarifying with Cherry first.

# Hold'em (working names below) — Texas Hold'em for Cherry

**Stage:** PAUSED · **Owner:** claude-code (original builder) + codex · **Gate:** Sneaks only for App ID, receiving wallet, and publish · **Aliases:** holdem, cherry-holdem

**Repo:** [0xSneaks/cherry-holdem](https://github.com/0xSneaks/cherry-holdem) (private) · **Live URL:** Preview exists on branch (see below); Production: none · **Last updated:** 2026-11-20 00:32 ET by cherry-gap-bot

## Now

PAUSED — do not build, deploy or publish until Sneaks says resume.

Sneaks 2026-11-20: keep single-player and add multiplayer, then he can push. Credits only for now (no SOL stakes). The Cherry App ID was never filled in, so the listing deploy stays blocked on Sneaks walking the portal wizard.

This file supersedes the prior PARKED close-out (held for PetalDeck / rename). Historical decisions that still stand are under Established. Items that the live repo or the 2026-11-20 order override are marked SUPERSEDED.

## Current state (evidence, 2026-11-20)

Single-player Sit & Go is built and playable. The latest code is **not on `main`**.

| Ref | SHA | What it is |
| --- | --- | --- |
| `main` | [`b36d3abc`](https://github.com/0xSneaks/cherry-holdem/commit/b36d3abc289a696da2a3d3589cf81277cb6ab0b9) | 2026-11-11: engine + 4-seat vs-3-bots UI + Cherry handshake + portal icon/cover. No README, no geo middleware, no UI kit. |
| `claude/cherry-holdem-portal-deploy-mye3cp` | [`a03dbdb5`](https://github.com/0xSneaks/cherry-holdem/commit/a03dbdb5f35ab43e07fbfd225b6d7310402fd4e6) | **10 commits ahead of `main`, 0 behind.** Latest playable build: UI kit, geo blocks, README, legal-link slots, table polish. Preview: `https://cherry-holdem-5p0jgd18y-phantomcapais-projects.vercel.app` (older SHA also noted; later Preview `https://cherry-holdem-f88helppb-phantomcapais-projects.vercel.app`). Start multiplayer from this branch, then merge to `main` only with Sneaks's yes. |

There is no `docs/` tree and no `docs/CHERRY_INTEGRATION.md` on either branch (README tells the builder to paste the portal prompt there once Sneaks has it). No open GitHub issues. No `TODO`/`FIXME` in the tree; the real open work is the empty App ID, the unmerged branch, the name, and multiplayer (none of it is started).

### What ships today (on the deploy branch)

- **Stack:** Vite + TypeScript SPA (`package.json`: `vite`, `vitest`, `@cherrydotfun/miniapp-sdk` `^0.1.24`, `@vercel/node`, `@vercel/functions`). **Not** Next.js. Client is `src/main.ts` + `src/styles.css` + `index.html`. Hosting is Vercel project `cherry-holdem` (team `phantomcapais-projects`, id `prj_uQdrwIornck2t0MlNk122ZiXWgmQ`) via `vercel.json` (`build` → `dist/`, CSP `frame-ancestors` for `*.cherry.fun`).
- **Game engine (pure, in-browser):** `src/poker/evaluate.ts` (5–7 card evaluator, wheel straights, suit-blind ties, `splitPot`); `src/poker/game.ts` (NLHE streets, heads-up blinds, side pots, short all-in does not reopen, Fisher-Yates via `cryptoRng()`); `src/poker/tournament.ts` (freezeout Sit & Go, start stack 1,500, blinds 10/20 then up every 6 hands through 400/800 then ×1.5, buy-in 500 credits, prizes 1,200 / 600 / 200 / 0 on a 4-seat table); tests in `src/poker/evaluate.test.ts`, `src/poker/game.test.ts`, `src/middleware.test.ts`.
- **Bots:** `src/poker/bot.ts` — Monte Carlo equity (150–250 sims) + pot odds, five styles (Sakura, Ronin, Momo, Kenji, Yuki). Single-player is always hero + 3 bots (`newTournament(userName, 3, rng)`). Bots are named but **not** labeled "Bot" on the seat.
- **Credits:** `src/meta.ts` — 10,000 starting credits, 1,000 daily bonus with a +10%/day streak cap at +100%, stats. Persistence is **`localStorage` key `cherry-holdem:v1:${user}`**, not a server ledger. Credits are never sold in code; lobby copy says "Play credits only. No purchase, no cash value, nothing to withdraw."
- **SDK / auth:** `src/main.ts` `connectCherry()` calls `isInsideCherry()`, `new CherryMiniApp()`, `cherry.init()`, then `POST /api/auth` with `Authorization: Bearer ${cherry.launchToken}`. `api/auth.ts` runs `verifyLaunchToken(token, { appId })` and keys the player by `cherry_id ?? sub`. There is **no** `cherry.room`, `cherry.share`, `navigate.userProfile`, or `cherry:ready` post. No payment / `withAppReference` code.
- **APP_ID:** env var **`CHERRY_APP_ID`** (required on Preview and Production). Read by `api/auth.ts`, `api/cherry-app.ts` (serves `/.well-known/cherry-app.json` as `{ appId }` via the `vercel.json` rewrite), and `api/health.ts` (`cherryIdentityConfigured`). Also empty constants `CHERRY_APP_ID` and `CHERRY_PROJECT_ID` in `shared/cherry-listing.ts` — Terms/Privacy lobby links stay hidden until both are filled from the portal prompt. Both are `''` today. Production boots 500 if the env var is missing.
- **Geo / legal:** `middleware.ts` + `shared/cherry-listing.ts` return 451 for CU/IR/KP/SD and occupied UA regions (ISO 3166-2 43, 40, 14, 09, 65, 23). `/.well-known/cherry-app.json` stays reachable.
- **Layout / art:** table is built for a 360px-wide phone (`src/styles.css` cites `mockup-table-360`; `#app` max-width 480px; result overlay max-width 360px). Art is 2D kit + CSS (felt, UI panels, portraits, dealer coin, turn ring from `public/ui/`), not WebGL / cinematic 3D / chip physics. First frame is an HTML skeleton; `cherry:ready` is not fired.
- **Listing name in the UI:** still "Cherry Hold'em" (`index.html` title, lobby `h1`, 451 page, cover alt text). Cherry policy forbids "Cherry" in a listing name.

### Who built it (git log + board)

- **claude / claude-code** (Claude Opus 5.5, `claude@ai-coms` / `noreply@anthropic.com`) built the playable app: engine integration, bots, 360px table, handshake, portal assets, middleware, table polish, and the UI-kit wire-up (`9ca25973`, `a77a7de3`…`a03dbdb5`). **This is the original builder — BUILD stays with claude-code**, with codex on the new multiplayer server/scaffold.
- **Sneaks** landed Stage 1 (hand evaluator + tests, "DeepSeek via web lane, verified by muse") as `430bd024` / `9ff2a36b` on 2026-11-09, and later committed "Wire the UI-kit table into the table screen" (`c45af66e`).
- **Muse** landed the 2026-11-11 HQ visual pass (`da134e60`).
- **grok-bot** delivered card/UI kit art in `0xSneaks/cherry-cards` (wired in at `a03dbdb5` from kit `@ 778d58f`). Number-card re-illustration (P3) was still an open art follow-up on the prior board.

## Gap list for multiplayer

Nothing below exists in the repo today. The engine is client-side only, so it cannot be "turned into" multiplayer without a server.

1. **No authoritative server.** Shuffle, deal, hole cards, betting, and pots all live in the browser (`src/poker/game.ts` + `src/main.ts`). A second client cannot join, and any naive "sync the HandState" would leak every hole card (bots already read `me.hole` in-process). No WebSocket, Colyseus, socket.io, or Durable Object dependency.
2. **No server credit ledger.** Daily grants, buy-ins, and prizes are writable in `localStorage` (spoofable, not shared across devices).
3. **Table size is fixed at 4** (hero + 3 bots). No 2–9 seat layout, no 6-max or 9-max sit-and-go, no cash-style credit tables, no seat reservation.
4. **No shot clock.** The only timer is a 2.5s fold-confirm arm. No auto-fold / auto-check, no 60s reconnect seat hold, no spectators.
5. **No matchmaking.** No quick-join, no `cherry.room` tables, no private invite tables.
6. **No room leaderboard, no `cherry.share`, no `navigate.userProfile` on seats.**
7. **Bots are single-player only** and unlabeled as bots.
8. **No anti-collusion** (nothing stops two tabs, one `cherry_id` on two seats, or multi-tabling a future tournament).
9. **No cosmetics or payment path** (`withAppReference`, on-chain confirm, sales ledger).
10. **Art / perf bar not met:** no cinematic 3D table, lighting, or chip physics; no `cherry:ready` under 5s hook.
11. **Ship blockers already on the single-player build:** empty `CHERRY_APP_ID`, listing name contains "Cherry", deploy branch unmerged, `docs/CHERRY_INTEGRATION.md` missing.

## Multiplayer spec

Reuse the existing pure engine (`evaluate.ts`, `game.ts`, `tournament.ts`, `bot.ts`) on the **server**. The Vite client stays a renderer + input + Cherry handshake. Do not keep a second rules copy in the browser.

### Authoritative server

- One authoritative table process with a WebSocket to each seat and spectator.
- **Fit for this stack:** Cloudflare Durable Objects, one DO per table, WebSockets + alarms for turn timers — this matches the 2026-11-09 established dealer plan and avoids long-lived sockets on Vercel Functions (the Vite client and `api/*` stay on Vercel). Acceptable alternatives if DO is blocked: Colyseus or socket.io on a small persistent Node host. Do not run the dealer inside a Vercel serverless function.
- Server shuffles and deals with `crypto.getRandomValues` (keep the current Fisher-Yates). Hole cards are sent **only** on that player's socket, after the launch token has been verified and the seat is bound to `cherry_id`. Public state may include board, bets, stacks, action log, and opponent card *backs*. Network inspection of another client's traffic must never show that client's hole cards (acceptance test).
- Optional, keep if cheap: the previously established provably-fair hook (commit `sha256(seed‖tableId‖handNo)` before the deal, reveal the seed after the hand, client "verify hand" button).
- Credits, buy-ins, prizes, cosmetics, and the sales ledger live in Postgres (Neon, as previously planned). Key every row by `cherry_id ?? sub`.

### Tables, tournaments, seats

- **2–9 seats** on one 360px layout (compact 9-max is required, not "6-max only").
- **Sit-and-go tournaments:** 6-max and 9-max freezeouts, same blind schedule as today (hand-count levels in `BLIND_LEVELS`, then ×1.5). Scale start stacks / buy-in / prize ladder so prizes sum to `seats × BUY_IN` credits. Host (or auto-start) when the table is full, or at 2+ with "fill remaining seats with bots."
- **Cash-style credit tables:** fixed blinds, sit/leave with the session stack, credits still have no cash value and cannot be withdrawn. Not real-money cash game.
- **Seat reservation:** a taken seat stays reserved through the join handshake. A disconnect holds the seat for **~60s**; if the player returns with the same `cherry_id` they resume; otherwise the seat is forfeited (tournament: sit-out / blinds posted / auto-act until eliminated or the hold expires, then the seat is empty or bot-filled per table rules).

### Timers, reconnect, spectators

- Turn timer 20s; on timeout: check if free, else fold. Keep the established 2 × 30s time banks per tournament.
- Reconnect: same seat, same hole cards, timer still running. State is replayed from the server, not from `localStorage`.
- Spectators can join a public or room table, see only public state (no hole cards), and may sit if a seat opens.

### Matchmaking

- **Quick-join:** server seats the player at the first fitting open table (SNG 6 or 9, or cash-style), or opens a new one.
- **Room tables:** `cherry.room` `{ id, title, memberCount }` — a table tagged with that room id, seats offered first to that room's members.
- **Private invite tables:** creator gets a shareable invite (via `cherry.share` or an in-app code). Only invited `cherry_id`s can sit.

### Room board, share, profiles

- In-app room leaderboard from room context (SNG finish points or cash-style session profit in credits — points/credits have no value). Weekly room board is fine.
- `cherry.share` a result blink after a tournament finish (place + unpaid flavor text, never a cash-out claim).
- Seat plates call `navigate.userProfile` for human players.

### Bots

- Single-player keeps today's you-vs-bots Sit & Go.
- Multiplayer may fill empty seats with the same five styles, **optional** and off by default on private invite tables.
- Every bot seat shows a clear **Bot** label (name + "Bot"), distinct from human plates.

### Anti-collusion (basics)

- One seat per `cherry_id` per table.
- A `cherry_id` may not sit two tables in the same sit-and-go tournament.
- Reject a second live tab that tries to occupy another seat as the same `cherry_id`.
- This is a baseline, not a full collusion system (no shared-IP witch-hunt in v1).

### Scaling, 360px, ready

- DO (or Node) tables scale by table, not by global room. Client stays a static Vite build on Vercel.
- All modes — 2 to 9 seats, lobby, result, shop — work at 360px.
- First paint from the existing skeleton; fire **`cherry:ready` in under 5s**. Lazy-load heavy 3D / FX after ready.

## Money implementation

Credits stay the play currency. Real-money / SOL poker is iGaming and is **not** in this build.

The 2026-11-11 five-tier "Cherry future pricing" menu (Starter $1.69 … Elite $42.49, sold as chip packs) is **SUPERSEDED**. Credits are never sold and never cashed out.

1. **Money model: Sales (cosmetics only).** The user does not pay to play. Day-1: 10,000 starting credits and a free daily grant (keep 1,000 + streak, or tune later) and tournament / cash-style buy-ins in **credits**. Credits cannot be bought or withdrawn. Revenue is one-time cosmetic unlocks with no table advantage: **$0.99** card back, **$2.99** table felt, **$4.99** avatar + chip-set pack (or the same $4.99 as a crest/chip bundle).
2. **Payment flow:** verify the launch token server-side first (`verifyLaunchToken` + `appId`, key by `cherry_id ?? sub`), then one-time payment only — no recurring subscriptions. Every tx carries `withAppReference(APP_ID)` and a label ≤80 chars. Never bake Cherry's 10% fee into the tx. Unlock the cosmetic only AFTER the tx is verified on-chain, never before. Do not credit play-credits from a payment.
3. **Caps check:** use the live tier from the portal that day. $4.99 is under Unverified $50/tx and Verified $1,000/tx / $5,000 per wallet per day. Reject anything above the live cap. Receiving wallet is Sneaks's to confirm — never hardcode one, never ask for a seed or private key.
4. **Play-credits only.** Real-money stakes are iGaming class only, and only if the live tier allows it **and** Sneaks says yes **and** 18+, published odds/RTP, limits + self-exclusion, country blocks, and not on iOS. Until that yes, no SOL, no escrow, no payout, no signing path.
5. **Ledger + kill line:** log `cherry_id`, tx signature, USD amount, item, and timestamp for every sale. Target revenue **$0.03 per daily user**. Breakeven: 8 cosmetic sales in a rolling 7 days (about $8 at $0.99, enough to cover a small DO + Neon bill). Park the listing if 7-day Billing volume is under **$25 after 14 days live**; read that number from the app's Billing page.

## Art bar

Near-PS4/PS5 console-grade (Sneaks 2026-11-19 standard). Cinematic 3D table, volumetric lighting, chip physics, wet-stone felt, gold rail, sakura-consistent with the existing kit. No flat CSS substitutes for the table, chips, or cards. Keep code-rendered rank/suit indices (or approved illustrated number cards) so letters/numbers stay sharp. The current 2D UI kit is the floor, not the bar.

## Listing name

The listing name must not contain "Cherry" (Cherry Mini App Policy, verified 2026-11-12). The repo may stay `cherry-holdem`. Sneaks picks one (P1, still open):

1. **Halfmoon Hold'em** — matches the existing maker stamp `0xSneaks · Halfmoon Studio` in `src/main.ts`.
2. **Gold Rail Hold'em**
3. **Court Felt**

Until he picks, keep using a working name in new copy and stop putting "Cherry Hold'em" on cover/UI that will ship.

## Tasks

### BUILD — claude-code (original builder; engine, auth, money, dealer) with codex (WS/DO scaffold, 2–9 layout, matchmaking UI)

Start from `claude/cherry-holdem-portal-deploy-mye3cp` @ `a03dbdb5`. Keep single-player working. Do not merge to `main` or Production without Sneaks's yes.

Acceptance tests:

- 2–9 player table works on a 360px phone (SNG 6 and 9, plus a cash-style credit table).
- Hole cards are never sent to other clients (verified by network inspection of a second seat / spectator).
- Reconnect within ~60s restores the seat; turn timers auto-check or auto-fold; the tournament blind schedule advances (every 6 hands, then ×1.5).
- Launch-token verify: `verifyLaunchToken` + `appId`, player keyed by `cherry_id ?? sub`; junk token → 401; missing `CHERRY_APP_ID` stays a hard fail on health / well-known / auth.
- Cosmetics purchase path: one-time $0.99 / $2.99 / $4.99, `withAppReference(APP_ID)` + ≤80-char label, unlock only after on-chain confirmation, inside the live tier cap, no credit top-up, sale ledger row written.
- `cherry:ready` under 5s; room leaderboard from `cherry.room`; `cherry.share` result; `navigate.userProfile` on human seats; bots clearly labeled; one seat per `cherry_id` per table.
- CU/IR/KP/SD + occupied UA regions still 451; test URL ready for a private test room. No public publish.

Deploy/live checks: muse.

### ART — grok-bot

Console-grade 3D table (lighting, felt, rail), chip physics / chip stacks by denomination, card backs, felt skins, avatars for the $0.99/$2.99/$4.99 packs, 512 icon + 1200×630 cover under the chosen listing name (no "Cherry" in the wordmark). Continue any open number-card illustration work in `0xSneaks/cherry-cards` as needed.

### SHIP GATE — Sneaks only

1. **Create the mini app** in the [Cherry portal](https://portal.cherry.fun/dashboard) wizard (category Games, money model Sales), using the chosen name that does not contain "Cherry". Copy the prompt / Facts table into `docs/CHERRY_INTEGRATION.md` in the app repo (verbatim). Fill `CHERRY_APP_ID` (Vercel Preview **and** Production env) and both IDs in `shared/cherry-listing.ts`.
2. **Confirm the receiving wallet** for cosmetic sales (say the address in chat; builders never ask for a seed or private key).
3. **Publish** only after private test-room play (single-player and a 2–9 multiplayer table) and after muse's live checks. Production deploy of `main` needs an explicit yes.

## Established (decisions — don't re-litigate)

- PLAY CHIPS / CREDITS ONLY in this version. No buy-in in SOL, no withdrawal, no cash value. Real-money poker = iGaming and needs Sneaks + the rules in Money §4.
- Format: No-Limit Hold'em. Sit-and-go freezeout (no rebuys) plus cash-style **credit** tables as specified above.
- Start stack 1,500 chips. Blinds 10/20, up every 6 hands: 10/20, 15/30, 25/50, 50/100, 75/150, 100/200, 150/300, 200/400, 300/600, 400/800 (then ×1.5). Hand-count levels stay (already tested).
- Turn timer 20 s; on timeout: check if free, else fold. 2 × 30 s time banks per tournament.
- Optional "fill with bots." Finish-order room points (1st 50, 2nd 30, 3rd 20 on 6-max, scaled for other sizes) have no value.
- Server-authoritative: deck, hole cards, betting, pots on the server. Hole cards NEVER in a shared payload.
- Dealer transport: Durable Objects (one per table, WebSockets, alarms), not short polling — 2026-11-09 order stands now that multiplayer needs a real socket. The 2026-11-08 "polling is enough / no websocket" note is SUPERSEDED.
- **SUPERSEDED 2026-11-20:** planned Next.js app-router stack. Evidence: the repo is Vite. Keep Vite on Vercel; add the DO (or Node) dealer beside it.
- **SUPERSEDED 2026-11-20:** 10,000-credit *server* ledger was specified in 2026-11-09 and is not what shipped (localStorage). Multiplayer must finally put the ledger on the server.
- **SUPERSEDED 2026-11-20:** five-tier credit packs for sale. Cosmetics only.
- Inside Cherry: no connect-wallet button, no `signMessage` login (portal test fails). Lesson from cherry-royale / PetalDeck.
- "Cherry Casino" is an existing playing-card brand — do not copy its decks or use that name.
- Art: Grok makes illustrated art; rank/suit indices stay code-rendered unless an illustrated number-card suit has passed QA. Cherry-icon silhouette + hidden Halfmoon Studio stamp stay on the table.

## Lobby/table gap list (P2, still open unless the new build closes it)

From the 2026-11-12 P2 pass (`a03dbdb5`): name still "Cherry Hold'em"; number cards may still be template pips (P3); bet chips use one generic chip; hero plate is cream rather than the kit seat frame; no all-in pressed/disabled art; timer/sound/settings kit pieces unused because those features did not exist; no hand history; hero hand label can linger after a loss. Multiplayer work should close the timer-ring gap when the shot clock lands, and must close the name gap before listing.
