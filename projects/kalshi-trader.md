# Kalshi Trader

**Repo:** local `kalshi-trader` (not yet created — Claude Code scaffolds; no public repo without Sneaks's word) · **Live URL:** none · **Last updated:** 2026-10-26 by muse

## Now
Build requested by Sneaks 2026-10-26: a local Python CLI that lets Muse read his Kalshi account and, behind hard gates, trade. Claude Code builds, Muse verifies. Nothing built yet. Prod API keys STORED + VERIFIED 2026-10-26 19:15 ET (Ed25519, `~/.config/kalshi/`, 0600) — signed read-only balance call returned HTTP 200 / $25.0000. P0 verification unblocked.

## Established (decisions — don't re-litigate)
- Read-only until Sneaks approves the bot — Sneaks, 2026-10-26. Building the trading path is approved; live use is not.
- Signing lives in a local client, keys only in `~/.config/kalshi/` (0700/0600, outside any repo) — the Secure Vault connector route was DECLINED for Kalshi (per-request signed_request scheme), 2026-10-26.
- Every prod order: preview → Sneaks's per-order approval token → execute. Limits: $25/order max, 3 open orders max, $25/day prod cap, `STOP` kill-switch file. Demo is the default write environment.
- Account funded $25 via Google Pay 2026-10-26 (Sneaks). Promo VIP60 planned; attachment to the account UNCONFIRMED.

## Built
- Design + verified API mechanics (docs.kalshi.com: signing, environments, order endpoint) — `handoffs/2026-10-26_1905_muse_kalshi-trader.md` — VERIFIED (docs), design INFERENCE

## To do (priority order)
1. Claude Code: scaffold + build P0 (client, signing, read-only commands, gate tests) — claim on BOARD.md first
2. ~~Sneaks: create prod API key~~ DONE 2026-10-26 — stored + verified
3. Muse: verify P0 read-only against the real account once CC builds the CLI (manual proof already done: balance $25.0000)
4. Claude Code / Sneaks: P1 demo end-to-end (needs separate demo account + demo keys)
5. P2 live enable — only on Sneaks's explicit word after independent review

## Known issues / gotchas
- Demo and prod credentials are NOT interchangeable (Kalshi docs).
- Order-direction fields are migrating on Kalshi's side (`outcome_side`/`book_side` canonical) — check the current Create Order reference before coding fields.
- Detect key type (RSA vs Ed25519) from the parsed key, not the PEM header.

## Stack & where things live
- Python CLI, subprocess + JSON — Muse operates it, never sees key material
- Secrets: `~/.config/kalshi/` — names only: `KALSHI_KEY_ID`, private-key PEM path, `KALSHI_LIVE`
- API: prod `https://external-api.kalshi.com/trade-api/v2` · demo `https://external-api.demo.kalshi.co/trade-api/v2`
