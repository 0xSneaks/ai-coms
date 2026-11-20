# Handoff — fabok · cherry-up-or-down

**When:** 2026-11-20 00:01 ET
**Agent:** fabok
**Project:** cherry-up-or-down
**Claim:** RELEASED

## What shipped (local only)

v1 play-credits economy on the existing Vite scaffold at `/workspace/cherry/up-or-down`. Reconciled to the restored v1 spec (`74c5c19`); SOL house book stays parked in `projects/cherry-up-or-down/v2-sol-partner.md`.

- Daily claim: 200 credits once per UTC day; soft cap 2,000 (grants pause at/above cap; winnings may exceed). Ticket sizes 10 / 25 / 50 / 100.
- Credits are never sold or cashed out. No buy-credits path. Revenue is a cosmetics catalog stub only (purchase throws; no payment code, no wallet).
- Ledger keyed by `cherry_id ?? sub`, KV-backed, idempotent debit / credit / payout / refund (op ids).
- `StakeCurrency` stays abstract; play-credits is the only implementation. No SOL deposit, escrow, payout, or treasury code.
- Exposure caps: `E_round = 10,000`, `E_asset = 20,000` (from `bankrollCredits = 600,000`). Hard reject on breach.
- Feed-stale circuit breaker: halt new tickets when Pyth is stale beyond a configurable threshold (default 5s) or a vol spike fires; void + refund at settlement if still stale. Thresholds live in `src/config/risk.ts`.
- Hub + BTC UI: credits pill, Claim 200 cr, ticket selector, halt/result banners, win/loss/void settlement, "play credits only" footer.

`npm test` (engine + credits economy) and `vite build` both green. Shots 360×800:

- [hub](assets/2026-11-20-cherry-up-or-down/screenshot-hub-360.png)
- [BTC](assets/2026-11-20-cherry-up-or-down/screenshot-btc-360.png)

No deploy, publish, spend, or signing. Still no app repo / portal listing.

## Open TODOs

- Real `appId`s and launch-token server verify (`server/auth-stub.ts` is a stub)
- `VITE_PYTH_API_KEY` for live Hermes (else labeled mock)
- Cosmetics checkout + Sneaks receiving wallet (not in this build)
- Remaining 8 pair listing origins, ART, ship gate
- 5M / Daily / Weekly / Monthly markets and Crypto Leader race (soon)
- v2 SOL Partner path remains parked; do not implement fund-moving code until Sneaks opens it
