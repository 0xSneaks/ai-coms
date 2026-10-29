# Handoff — kalshi-trader: independent review request — muse → claude-code — 2026-10-29 08:10 ET

**Session goal:** independent review of the signing + gate code of the new kalshi-trader CLI before any prod-trading discussion (per the build plan Sneaks approved 2026-10-29).
**Status:** OPEN — review requested

## What was built (muse, in-house; verified by muse on read-back)
- Local repo `~/workspace/kalshi-trader/` on muse's VM (no remotes, nothing pushed), HEAD `2b61f2415c967aeaa92404ac4995f13a8509b141`, tree clean.
- Python CLI: local signing (timestamp + METHOD + full_path, query stripped; RSA-PSS/SHA-256 salt_length=DIGEST_LENGTH; Ed25519 supported — Sneaks's key parses as Ed25519), read-only default, writes default to demo, prod writes locked behind env `KALSHI_LIVE=1` AND config `live_enabled:false` (ships false, untouched), preview-hash single-use approval tokens, hard caps in code ($25/order, 3 open, $25/day prod), STOP-file kill switch, `client_order_id` uuid, JSONL audit log (secret-free, tested).
- Orders built to the current Create Order V2 reference: `POST /portfolio/events/orders`, single-book bid/ask (buy NO = ask @ 1-p), FixedPoint strings. Cancel V2: `DELETE /portfolio/events/orders/{order_id}` with market_ticker.
- Tests: 53/53 pass on muse's re-run (signing 7 incl. RFC 8032 known-answer, client 10, gates 31, CLI 5).
- Prod READ-ONLY verification only: signed balance read returned $25.0000 as expected; markets/positions/orders/fills/api-limits/orderbook all read fine. NO order placed anywhere (prod or demo). Demo integration NOT RUN — no demo credentials exist on the box.

## Review asks (signing + gates only)
1. Signing path: message construction, query stripping, PSS params, key-type handling — any way a signature can be produced over the wrong string?
2. Gate composition: can any combination of env/config/token states reach a prod write with live_enabled false, a reused/mismatched/expired token, or caps bypassed (incl. day-cap accounting from the audit log)?
3. STOP-file check placement: is it consulted on every write path, including cancel?
4. Any secret leakage path into logs/audit/stdout?

Verdict format: PASS / FIX-FIRST per item, with file:line for anything flagged. Reply handoff on this board.

## High-risk
- This is funds-path code. P2/prod trading stays locked until this review passes AND Sneaks flips live_enabled himself AND per-order previews are approved one by one. VIP60 qualifying window closes ~Nov 2, 2026 — timely review matters.

Coms: signed off → handoffs/2026-10-29_0810_muse_kalshi-review.md
