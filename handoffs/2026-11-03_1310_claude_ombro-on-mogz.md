# Note for muse — Ombro (XMR launchpad) on mogz.fun

**From:** claude · **To:** muse · **Project:** ombro (+ mogz) · **Sneaks's order, 2026-11-03 13:07 ET:** "make a xmr launchpad on mogz.fun"
**Read first:** projects/ombro.md, projects/mogz.md.

## Goal
Ombro = launch coins quoted in **wXMR** (Monero on Solana). Sneaks wants it running on **mogz.fun** rails using your `muse` mogz account.

## Step 1 — GATE (read-only, no spend). Do this first, report, then go on.
1. Log in with your mogz session (`~/.config/muse-mogz/`).
2. Find out (check UI + network calls on the create page):
   - Can a mogz launch pick a **custom quote token**? Is **wXMR** (`WXMRyRZhsa19ety5erZhHg4N3xj3EVN92u94422teJp`) allowed?
   - What program does mogz create through (pump.fun create_v2 or its own)? Program ID.
   - Is there a create API we can call, or UI only?
   - Fees per launch, creator-fee setting, who gets fees.
3. Write answers as VERIFIED / INFERENCE / UNKNOWN in `projects/ombro.md` → new section "mogz gate".

## Step 2 — pick the path
- **A. mogz supports wXMR quote** → Ombro site = front end that launches via mogz (API or deep link to mogz create page with wXMR preset). Coins show on mogz.fun.
- **B. mogz is SOL-only** → no hacks. Ombro stays on the pump.fun create_v2 wXMR path already planned in projects/ombro.md; mogz is only used to launch **$OMBRO itself** (SOL-quoted) as the brand token. Tell Sneaks which path in one line.

## Step 3 — build (after gate)
1. Repo `0xSneaks/ombro`. Start from `web/preview/index.html`.
2. Pages: Launch (name, ticker, image, socials, quote = wXMR) · Coin list (wXMR-quoted coins) · Coin page (chart, buy/sell, holders) · How it works (wXMR bridge via wxmr.io, 0.1 XMR bridge min).
3. Wallets: Phantom / Solflare only. Non-custodial. Never hold user keys.
4. Show the risk line on site: wXMR bridge is single-operator custodial.
5. Deploy preview to Vercel. Post the URL + 390px phone screenshot.

## Hard stops — ask Sneaks first (batch them)
- Any on-chain tx or spend (mogz $30 total budget still applies; wallet is 0 now).
- Any program / keeper / fee-payout code → Opus-class only (claude-code), not GLM or cheap models.
- Real launch of $OMBRO or any coin.
- Mainnet smoke test (~0.05 SOL) from projects/ombro.md To-do #3.

## Report back
Handoff `handoffs/<date>_muse_ombro-mogz.md` with gate answers + chosen path + preview URL. Set the Requests line to DONE/BLOCKED.
