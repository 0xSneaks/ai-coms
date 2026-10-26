# Handoff — kalshi-trader — muse → claude-code — 2026-10-26 19:05 ET

**Session goal:** Sneaks: "a way you [Muse] can hook up to it [Kalshi] and also have Claude code build a way where we could connect to this and trade."
**Status:** HANDING OFF — build request, nothing built yet.
**Repo / branch:** NEW local project `kalshi-trader` (no repo yet — see Next #1) · **Last commit:** none

## Did
- Verified Kalshi API mechanics from official docs (docs.kalshi.com) — VERIFIED:
  - Auth: every authed request carries `KALSHI-ACCESS-KEY` (Key ID), `KALSHI-ACCESS-TIMESTAMP` (ms), `KALSHI-ACCESS-SIGNATURE` = base64 signature of `timestamp + METHOD + full_path` (no query string). RSA = RSA-PSS/SHA-256; Ed25519 signs directly. Key type must be detected from the parsed key, not the PEM header (docs, Authenticated Requests quick start + API Keys page).
  - Environments: prod REST `https://external-api.kalshi.com/trade-api/v2`, demo REST `https://external-api.demo.kalshi.co/trade-api/v2`. **Credentials are NOT shared between demo and prod.**
  - Create order (quick start): `POST /portfolio/events/orders` with `ticker`, `side`, `count`, `price` (decimal string, e.g. "0.0100"), `time_in_force`, `self_trade_prevention_type: taker_at_cross`, `client_order_id` (uuid, dedupe). ⚠️ Changelog shows order-direction fields are migrating (`outcome_side`/`book_side` canonical, legacy fields deprecated) — **read the current Create Order API reference before coding order fields; do not copy the quick start blindly.**
  - Public market data needs no auth. Balance/positions/orders endpoints are under `/portfolio/*`.
  - Keys are created in the Kalshi app: Account & security → API Keys → Create Key; private key downloads once as a PEM .txt, Key ID shows on screen.
- Designed the gated architecture below — INFERENCE (Muse's design; Sneaks has not reviewed the internals, he approved the goal only).
- Checked the board: no `projects/kalshi-trader.md`, no active claim on this area — VERIFIED via gh-rest 2026-10-26 19:05 ET.

## Build spec (for Claude Code)

Local Python CLI, `kalshi-trader`, in a fresh git repo. Muse (this agent) is the operator: it calls the CLI as a subprocess and reads JSON output — same pattern as muse-maestro's card command. Muse never sees the private key; the client reads a file path only.

1. **Client** (`client.py`): local request signing (RSA-PSS + Ed25519 auto-detect), the 3 headers above, prod/demo base-URL switch, no redirects on authed requests, rate-limit respect (429 = stop, report), JSON in/out.
2. **Credentials**: read ONLY from `~/.config/kalshi/` (outside the repo): `KALSHI_KEY_ID`, private-key PEM file path, per-environment (`prod` / `demo` sub-config). Directory 0700, files 0600. `.gitignore` + gitleaks pre-commit; a test must prove the client refuses to start if the key path points inside the repo.
3. **Read-only commands** (default tier, no unlock needed): `markets`, `orderbook <ticker>`, `balance`, `positions`, `orders`, `fills`, `api-limits`.
4. **Trade commands** (`buy`, `sell`, `cancel`) behind ALL of these gates, in code, with unit tests proving each gate blocks:
   - Default environment for any write = **demo**. Prod writes require BOTH `KALSHI_LIVE=1` env AND `live_enabled: true` in a config file that ships `false`.
   - **Preview → approval**: every order first emits a preview card (ticker, side, count, price, est. cost, est. fee, max loss, env) and a preview hash. Execution requires an approval token tied to that exact hash, single-use. No token, no order. (This is how Muse gets Sneaks's per-order "yes".)
   - Hard limits in code: max $25 total cost per order, max 3 open orders, $25/day prod write cap (account is funded with exactly $25 — Sneaks, 2026-10-26).
   - Kill switch: if `~/.config/kalshi/STOP` exists, all writes refuse.
   - `client_order_id` uuid on every order (dedupe); audit log JSONL (timestamp, env, preview hash, approval, request, response, order_id) — never any secret material.
5. **Tests**: signing known-vector test for both key types; gate tests (live locked, over-limit blocked, STOP blocked, token mismatch blocked); demo integration test = 1 contract @ $0.01 per the docs quick start, demo env only.
6. **Phases**: P0 read-only vs prod (needs prod keys — BLOCKED, see below) · P1 demo trading end-to-end · P2 prod trading stays locked until Sneaks flips `live_enabled` himself AND approves the bot (his standing rule, 2026-10-26).

## State (evidence)
- Build: not started. Tests: not run. Deployed: no.
- Sneaks's Kalshi account: funded $25 via Google Pay 2026-10-26 19:01 ET (his screenshot, "Deposit complete") — VERIFIED.
- Promo VIP60 (trade $25 → $60 credit, 7-day window) was the plan; whether the code is attached to his account is UNCONFIRMED. Bot work must not assume it.
- The generic Secure Vault connector route for Kalshi was already tried and DECLINED (signed_request scheme — egress cannot inject per-request signatures). That is why signing lives in this local client. Do not rebuild a connector version.

## Decided
- Candidate = Claude Code builds, Muse verifies, Sneaks approves any live enable (Sneaks's instruction this session + his build process).
- Read-only by default; no prod trade without preview + his per-order yes — mirrors his Coinbase-for-Agents safeguards (approved by Sneaks for Coinbase 2026-10-26; applying the same pattern here is Muse's INFERENCE, flagged for his review).

## Next (start here)
1. Claude Code: claim `kalshi-trader` on BOARD.md, scaffold the local repo, build P0 client + signing/gate tests. Commit locally; do NOT create a public repo or push anywhere without Sneaks's word.
2. Claude Code: handoff back with proof inline — test counts, signing-vector result, gate-test results, repo path + HEAD sha.
3. Sneaks (only he can): create the prod API key in the Kalshi app and upload the PEM file to Muse so it lands in `~/.config/kalshi/` — until then P0 can be built but not verified against his account.
4. Sneaks (later, optional): demo account at demo.kalshi.co + demo keys for P1.

## Don't
- Don't put any key, `.env`, or PEM in the repo, a commit, a log, or this board. Env var / file names only.
- Don't place, test, or "smoke-test" any prod order. Demo env is the only write-test surface.
- Don't widen the limits or ship `live_enabled: true`.

## ⚠️ High-risk (wallets, signing, auth, prod, money)
- This is a private-key signing client for a funded, KYC'd financial account in Sneaks's own name. Needs independent review of the signing code and the gate code before P2 is even discussed.
- Sneaks's standing rule stands until he changes it in words: **read-only access until he approves the bot.** Building the path is approved; using it live is not.
