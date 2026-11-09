# Handoff — cherry-holdem — claude — 2026-11-08 21:50 ET

**Session goal:** Sneaks: "Texas Hold'em tournament edition for Cherry. Grok makes HQ cards, Codex finishes it."
**Status:** HANDING OFF (spec done → grok-bot art, codex build, muse deploy)
**Repo / branch:** 0xSneaks/cherry-holdem (not created)  ·  **Last commit:** none

## Did
- Spec + decisions → [projects/cherry-holdem.md](../projects/cherry-holdem.md) — VERIFIED (this commit)
- Art brief (below) and build brief (below) — VERIFIED (this commit)

## Decided
- Play chips only, single-table 6-max NLHE Sit & Go, provably fair shuffle, Vercel + Neon + polling. Full list in the project file. (Sneaks approved? scope yes; details are claude's routine calls — Sneaks may override.)

---

## §Art — for grok-bot (Grok)

Original art only. No real people, no logos, no copying any existing deck (Bicycle, Bee, "Cherry Casino" cards, Kem, etc.), no casino brands.

**Theme:** "Cherry blossom high-roller." Deep plum/black night base, cherry red + gold foil accents, soft blossom petals. Premium, clean, readable on a phone.

**Make these (PNG, sRGB):**
| # | Asset | Size | Notes |
|---|---|---|---|
| 1 | Court cards J, Q, K × ♠ ♥ ♦ ♣ (12) | 1000×1400 | Classic double-ended (mirrored) portrait layout, original characters. Suit colour in clothing. |
| 2 | Ace centerpieces × 4 suits | 1000×1400 | One large ornate suit symbol, blossom detail. |
| 3 | Card back | 1000×1400 | Symmetric (looks the same upside down). Cherry blossom pattern + border. |
| 4 | Table felt, portrait | 1080×1920 | Oval table seen from above, deep plum felt, gold rail. Empty center for cards; 6 seat spots around the rail. No text. |
| 5 | Chips × 5 | 512×512, transparent | Values 25 / 100 / 500 / 1K / 5K by colour (white, red, green, black, gold). Top-down. No numbers. |
| 6 | Dealer button | 256×256, transparent | Gold "D"-free disc with blossom; code adds the letter. |
| 7 | App icon | 512×512 | Two hole cards + blossom. No text. |
| 8 | Cover | 1200×630 | Table scene, left 55% art, right 45% plain dark space (code adds the title). |

**Hard rules:**
- **No letters or numbers in any card image.** Leave the top-left and bottom-right corners clean: a box 20% of width × 28% of height. Code draws "K♠" etc. there.
- Card corners rounded ~6% of width; art fills to the edge (code applies the mask).
- Same style, line weight and palette across all files.
- Must still read when shrunk to 48 px wide (phone hand size): big shapes, strong contrast.

**File names:** `Jh.png Qh.png Kh.png Js.png … Ah.png As.png Ad.png Ac.png back.png felt.png chip-25.png chip-100.png chip-500.png chip-1k.png chip-5k.png dealer.png icon.png cover.png` (s=spades h=hearts d=diamonds c=clubs).

**Deliver:** commit to `0xSneaks/cherry-holdem` → `art/raw/grok/` on branch `art/grok-v1` and post a line on BOARD. If you can't push images, give Sneaks/muse the files and muse commits them.

---

## §Build — for codex

Order matters. Tests before UI. Post a handoff after each stage.

**Stage 1 — Engine (pure TS, no UI, no DB): `src/engine/`**
- Deck, seeded Fisher-Yates (seed → HMAC-DRBG or ChaCha), commit = sha256(seed‖tableId‖handNo).
- Hand evaluator (own or `pokersolver`, pinned) — 7-card best-5.
- Betting state machine: blinds, heads-up blind rule (button = SB, acts first preflop), min-raise, all-in for less than a full raise does NOT reopen action, street transitions, showdown order, muck.
- Pots: main + side pots, split pots, odd chip to first seat left of button.
- Tournament: blind levels by hand count (schedule in project file), eliminations, finish order, points.
- Tests (vitest): every rule above + at least: 3-way all-in with 3 side pots; split pot with odd chip; heads-up blind/position; short all-in not reopening; level change mid-tournament; evaluator vs ≥1000 known hands (include wheel A-2-3-4-5, steel wheel, kicker ties).

**Stage 2 — Server: Next.js API + Postgres**
- Tables: `tables, seats, hands, actions (append-only, idempotency key), tournament_results, room_points`.
- One action endpoint; row lock on table; reject out-of-turn / stale `version`; idempotent by client action id.
- `GET /api/table/:id/state?v=` → public state only (ETag/version, 304 when unchanged).
- `GET /api/table/:id/me` → this player's hole cards only.
- Turn timeout enforced lazily on any request (check deadline → auto check/fold) + Vercel Cron every minute as backstop.
- `/api/health` → `{ cherryIdentity: configured|not-configured, db: ok }`.

**Stage 3 — Cherry contract** (re-read current `@cherrydotfun/miniapp-sdk` README first)
- CSP on every HTML response: `frame-ancestors 'self' https://chat.cherry.fun https://cherry.fun https://*.cherry.fun`. No X-Frame-Options.
- `public/.well-known/cherry-app.json` → `{"appId":"<App ID from project file>"}`, 200 JSON, no redirect.
- Backend `verifyLaunchToken(token, { appId })`; issuer `https://chat.cherry.fun`; JWKS `https://chat.cherry.fun/.well-known/jwks.json`. Exchange launch token once for own session; token in memory + Authorization header; no cookies in frame.
- Users keyed by `cherry_id ?? sub`. Room id from launch context → table's room.
- Inside Cherry: no connect-wallet, no signMessage. Standalone browser = spectate/demo vs bots only.

**Stage 4 — UI (360px first, dark)**
- Portrait table, 6 seats around felt, community cards center, own hand large at bottom, action bar: Fold / Check-Call / Raise (slider + ½ pot, ¾ pot, pot, all-in).
- Number cards + all indices rendered as SVG from Grok's suit art; court/aces use Grok images with SVG index overlay. Optional 4-colour deck toggle.
- Skeleton on first frame. Hand history + "verify hand" (shows commit, revealed seed, recomputed deck).
- Lobby: room's open tables, Start (host), Fill with bots, leaderboard.
- Footer: "Play chips only. No purchase, no cash value." + portal Terms/Privacy links.

**Done = muse can deploy Preview and these pass:** tsc, vitest, `next build`, `/api/health` configured, `cherry-app.json` 200, frame-ancestors header, 2 phones play a full Sit & Go to a winner.

## Next (start here)
1. sneaks: Step 0 (repo + App ID). 
2. grok-bot: art pack (§Art).
3. codex: Stage 1 engine now (scratch branch is fine until repo exists).
4. muse: provision Neon on Vercel when codex reaches Stage 2; Preview deploy; live checks.
5. claude-code: review Stage 3 auth path before Production.

## Don't
- No SOL, tokens, wallets, buy-ins, rake, or "cash out" wording anywhere.
- Don't put hole cards in any shared/broadcast payload or in client logs.
- Don't set `CHERRY_DEV_IDENTITY` on Production.

## ⚠️ High-risk
- Auth (launch-token verify + session) → claude-code independent review before Production.
- Any future real-money mode → KILLED for v1; needs Sneaks + legal before any code.
