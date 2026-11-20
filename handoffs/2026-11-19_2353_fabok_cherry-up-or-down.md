# Handoff — cherry-up-or-down — fabok — 2026-11-19 23:53 ET

**Session goal:** Local scaffold of the shared engine, Coins hub, and BTC pair template per `projects/cherry-up-or-down.md`, with a board check-in first.
**Status:** PARTIAL
**Repo / branch:** app has no remote (local `/workspace/cherry/up-or-down` only)  ·  **Last commit:** uncommitted local scaffold · board check-in `15578e8`

## Did
- Checked in on BOARD.md before continuing (`15578e8`, claim 23:45 ET). — VERIFIED
- Read the filed spec on main (hub + 9 pair listings). Pricing/settlement follow that spec, not earlier placeholders. — VERIFIED
- Built a local Vite + TypeScript scaffold: N(d) + 3-credit overround house book (`multiplier = 100/ask`), Pyth 60s average for both strike and close (Up iff `C >= K`; incomplete sample → void; 5-minute confirm), play-credits ledger (daily grant 200, soft cap 2,000, tickets 10/25/50/100), Coins hub (15 MIN + HOURLY live; Daily/Weekly/Monthly soon), and a config-driven pair template screenshotted as BTC. — VERIFIED
- Stake currency is one `StakeCurrency` interface; the only implementation is play-credits. No SOL deposit/escrow/payout/stake flow, not even a fund-moving stub. Money path remains on hold (real-money up/down is Partner-only). Cosmetics catalog stubbed at $0.99/$2.99/$4.99 with no payment code and no receiving wallet. — VERIFIED
- Did not call any Kalshi API or display Kalshi market data. Layout copied from the spec's reference screenshots only. — VERIFIED
- Engine selftest, `tsc`, and `vite build` passed. 360×800 screenshots: [hub](assets/2026-11-19-cherry-up-or-down/screenshot-hub-360.png), [BTC](assets/2026-11-19-cherry-up-or-down/screenshot-btc-360.png). — VERIFIED
- `cherry.init()` on load (SDK `^0.1.24`); launch-token verification left as a marked server stub. App IDs are placeholders (`TODO_APP_ID_*`). — VERIFIED
- No deploy, publish, app-repo push, spend, or signing. — VERIFIED

## State (evidence)
- Build: pass — `npm run build` in `/workspace/cherry/up-or-down`
- Tests: pass — `npm test` (house book table, N(d) ATM, Up/tie/Down/void/pending settlement)
- Deployed: no — local `npm run dev` / `npm run preview` only (http://127.0.0.1:5173/ and :4173)
- Feed: MOCK — Hermes requires `VITE_PYTH_API_KEY` since 2026-08-26; no key was set. Mock 1s series used so opening marks and vol can render. A live window with a feed gap still voids.

## Decided
- Play-credits as the only `StakeCurrency` implementation, per Sneaks/parent constraint that the money path stay on hold. — (Sneaks approved? pending — this is the standing safety rule)
- v1 intervals only: 15m and 1h. — yes, per spec
- After this scaffold was built, Cherry Gap Bot rewrote the project file as a Partner SOL house book (`baf027f`). The running local app was not switched to SOL; money path remains on hold. — (Sneaks approved? pending)
- Official listing names from the spec: **Up or Down**, **BTC Up or Down**, etc. No "Cherry" in names. — yes, per spec

## Next (start here)
1. Keep the scaffold local until Sneaks names an app repo. Remaining 8 pair listings are the same template + theme on their own origins/`appId`s.
2. ART — grok-bot: 10 icons (512×512) and 10 covers (1200×630), plus hub splash and pair chrome kit.
3. After a Pyth key is available (env only, never commit), switch the feed off mock and re-run settlement tests against live 1s prints.
4. Ship gate stays with Sneaks (10 portal listings). Do not publish if Policy class is in doubt.
5. Money path (anything other than play-credits) stays parked until Sneaks decides; cosmetics Sales still need his receiving wallet before any payment code.

## Don't
- Do not implement the Partner SOL treasury/stake flow written into the spec at `baf027f` until Sneaks clears the money path. This scaffold stayed on play-credits only.
- Do not call a Kalshi API or show Kalshi quotes/targets/percentages.
- Do not add a SOL or other fund-moving currency implementation, including "just a stub."
- Do not hardcode a receiving wallet or implement cosmetic checkout.
- Do not deploy, publish, or sign.
- Do not treat this local scaffold as a listed Cherry mini-app.

## ⚠️ High-risk (wallets, signing, auth, prod, money)
- Launch-token verification is a server stub only.
- Cosmetics Sales path and any real-money stake path are unimplemented / on hold.
- Receiving wallet is TBD by Sneaks.
