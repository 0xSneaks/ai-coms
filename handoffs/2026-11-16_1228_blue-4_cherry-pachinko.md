# cherry-pachinko — build sign-off (Blue-4, for muse)

**Date:** 2026-11-16 ~12:28 ET · **Order:** Sneaks picked "Pachinko-style chance game" from the cherry-study clone options (2026-11-16) — an ORIGINAL build, ours, that looks nicer than the registered-but-invisible one on Cherry. Working name only (`cherry-pachinko`); final name is Sneaks's call.
**Mode:** LOCAL BUILD ONLY. No deploy, no Vercel, no portal submission, no publish, no spend, no GitHub repo created, sneaks.skr untouched, no payment receiver copied anywhere.
**Deliverable:** `~/workspace/cherry-pachinko/` (project + README + screenshots). Claim released with this handoff.

## What was built (all VERIFIED locally)

- **Game:** 12-row pachinko/plinko board → 13 slots; the ball's path is 12 left/right draws, slot = number of rights, probabilities exactly C(12,k)/4096.
- **Payout math (exact):** multipliers [30, 8.25, 3, 1.6, 1.2, 0.7, 0.3, …symmetric] → EV = 3932/4096 = 0.9599609375, **RTP ≈ 0.960**. Bets are fixed denominations (100/200/500/1,000) and multipliers are integer milli-multipliers, so every payout is an exact integer — no rounding shaves the published RTP.
- **Server-authoritative + provably fair:** settlement runs in one DB transaction (lock account → lock seed pair → decide from the committed HMAC-SHA256 FairStream → debit/credit via the ledger → record drop → consume nonce). Per-account commit-reveal: sha256(serverSeed) published before play, seed AES-256-GCM encrypted at rest, rotate reveals it, `verifyDrop()` recomputes any settled drop. The client only animates the decided path.
- **Money doctrine (hard):** play credits only; **10,000 free credits on first login** (ledger-backed grant, exactly once); `SOL_ENABLED = false` hard-coded; credits never redeemable. Paid packs DISABLED — `src/payments/packs.ts` holds the catalog + hook points (driver interface, §13 90/10 note) and `createPackIntent` always throws `packs_disabled` in this build. A doctrine test scans all of `src/` for Solana/wallet/signing imports — zero found.
- **Cherry wiring (SDK 0.1.24, the filed reference version):** strict host detection (`window.__cherry` / `cherry_embed=1`), seamless launch-token exchange at POST /api/session, backend `verifyLaunchToken` (RS256 vs Cherry JWKS + issuer/audience/origin), accounts keyed by `cherry_id ?? sub`, launch-token jti consumed exactly once (replay → 401), poster screen outside Cherry, dev test-player sign-in only when the server flag enables it (refused in production), `frame-ancestors 'self' https://chat.cherry.fun https://cherry.fun https://*.cherry.fun` CSP, `/.well-known/cherry-app.json` served. Architecture mirrors Royale's proven pattern (same DB/fairness/session shapes), written fresh for this game.
- **Visuals (HQ rule):** layered CSS/SVG "midnight velvet parlor" — plum gradients, gold filigree corner ornaments, glossy gradient pegs with hit-flash, jeweled slot tiles showing multiplier AND probability, glowing ball, gold DROP button; 360px mobile-first, no external fonts/images.

## Verification (exact numbers)

- `npm ci` clean → `tsc --noEmit` clean → `next build` clean (10 routes) → **vitest: 29/29 tests passed, 5 files** (payout math incl. exact 3932/4096 rational; FairStream determinism/bounds; 120,000-drop distribution χ² = 10.09 on 12 df with empirical RTP 0.95977 vs exact 0.95996; PGlite end-to-end flows: grant-once, settlement + ledger chaining, grant-bucket-first spend, atomic insufficient-funds rejection, nonce consumption, rotate-and-verify recomputation; packs-disabled; doctrine scan).
- `npm run sim` reproduces the distribution table on demand.
- **Screenshots (360px, production build, test player, visually inspected by Blue-4):** `screenshots/game-idle.png` (board + 10,000 grant), `screenshots/game-result.png` (settled drop: bet 100 → ×0.7 → 70 back, balance 9,970 ✓, winning slot lit), `screenshots/game-fairness.png` (commitment hash, client seed, next nonce = 1 after one drop ✓). Regenerate: `npm run screenshots`.

## Owner gates left open (nothing done past them)

1. Final name/branding (placeholder wordmark "PACHINKO" today).
2. GitHub repo creation (PAT can't; muse/Sneaks via web UI) — project is local-only.
3. Painted-art pass if Sneaks wants Grok-level art beyond the CSS/SVG layer.
4. Credit-refresh policy for players who spend the full grant (no mechanic exists; packs stay disabled until the separate owner gate + policy check).
5. CHERRY_APP_ID assignment, deploy, portal submission — all future, separately gated. Note the 2026-11-16 owner rule: all Cherry apps need an update pass to current payment/SDK wiring before revenue moves — this build already sits on SDK 0.1.24.
