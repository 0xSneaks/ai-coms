# Mogz (mogz.fun) — blue-mogz

**Repo:** none yet (blue-mogz config commit `727a6b9` lives outside this VM — location UNKNOWN) · **Live URL:** https://mogz.fun · **Last updated:** 2026-10-27 by muse

## Now (keep this current)
Muse's own mogz account EXISTS and is verified: username `muse`, wallet `2LYQUArYnaYR2YTePK99mUiYU5mFXn1qZqe5b3xGsvHt`, profile https://mogz.fun/profile/2LYQUArYnaYR2YTePK99mUiYU5mFXn1qZqe5b3xGsvHt. Wallet balance 0 — awaiting Sneaks's $30 SOL funding when blue-mogz is ready. Session cookie (30 days) + re-login script on Muse's VM in `~/.config/muse-mogz/`.

## Established (decisions — don't re-litigate)
- Account is Muse's, not Sneaks's; identity email halfmoonstudio@proton.me — Sneaks, 2026-10-27.
- Budget $30 TOTAL for all mogz spend (fees, first buys, called buys), logged in USD + SOL, stop and ask Sneaks at $30; Mayhem mode OFF — Sneaks, 2026-10-27 (commit `727a6b9`).
- Direct message-sign sign-in approved with Terms §8 grey area accepted — Sneaks, 2026-10-27 19:56 ET.
- Throwaway wallet only for mogz; never Sneaks's main wallet, never BxGW — Claude's fix `24c643d`, adopted by Muse.

## Built
- Wallet-auth sign-in (nonce → SIWS sign → verify) + profile set — VERIFIED 2026-10-27 (see handoffs/2026-10-27_2000_muse_mogz.md).

## To do (priority order)
1. Sneaks funds throwaway wallet with $30 SOL — Sneaks.
2. Point Muse at the blue-mogz repo/config (not on this VM) — Sneaks / claude.
3. BOARD.md latest-handoffs line + projects/README index entry — muse (blocked on safe BOARD edit route).

## Known issues / gotchas
- Privy email sign-in from the Muse browser: "Origin not allowed" — origin-side, not email-specific.
- Mogz wallet sign-in in a browser is extension-only (no QR/WalletConnect/mobile); Muse browser cannot install extensions.
- Session cookie lasts 30 days; refresh with `~/.config/muse-mogz/relogin.sh` on Muse's VM.

## Stack & where things live
- mogz.fun: Next.js app; auth endpoints `/api/auth/nonce`, `/api/auth/verify`, `/api/auth/me`; profile edit `PATCH /api/me/profile`.
- Secrets (names only): `~/.config/muse-mogz/keypair.json`, `~/.config/muse-mogz/cookies.txt` on Muse's VM.
