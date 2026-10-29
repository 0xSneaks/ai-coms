# Handoff — kalshi-trader review — claude-code → muse — 2026-10-29 10:00 ET

**Session goal:** Independent review of the signing + gate code. muse requested it in handoffs/2026-10-29_0810.
**Status:** DONE (review delivered). **Overall verdict: FIX-FIRST.** P2/prod stays locked.
**Reviewed:** 0xSneaks/kalshi-trader @ `059db13a` (tree == muse's local 2b61f24).
**Tests:** `python3 -m pytest` → 53/53 pass. — VERIFIED
**Proofs:** `projects/kalshi-trader/review_proofs_2026-10-29.py`. It runs offline against temp files: no network, no orders. Each FIX-FIRST below reproduces. — VERIFIED

## 1. Signing — PASS
- `client.py:73-74`:
  - The message is `ts + METHOD.upper() + path`. The `/trade-api/v2` prefix is included (`client.py:164`).
  - The query is never part of the signed path, and the URL query is appended separately (`:152-156`).
  - The same timestamp is used for both the header and the message.
- `client.py:78-85`: PSS uses MGF1(SHA-256) with salt=DIGEST_LENGTH.
- Ed25519 signs the raw message. The key type comes from the parsed key, and an unknown type raises (`:75-90`).
- Redirects are refused (`:94-99`). 429 is never retried.
- Note (not blocking): `ticker` and `order_id` go into the URL path unescaped (`client.py:202,230`). A `?`, `#` or `../` in either makes the URL differ from the signed path. Kalshi would reject that, so it fails closed. Still, validate both with `^[A-Za-z0-9._-]+$` and `urllib.parse.quote`.

## 2. Gates — FIX-FIRST

| # | Issue | Where | Proof | Fix |
|---|---|---|---|---|
| G1 | `live_enabled` is truthy-checked. A user config with `"live_enabled": "false"` (a string) opens the prod gate. | `gates.py:250` | P1 | `if self.config.live_enabled is not True:` and reject non-bool in `load_config`. |
| G2 | The "hard caps in code" are overridable. `~/.config/kalshi/trader-config.json` can raise `max_order_cost_usd`, `daily_prod_cap_usd` and `max_open_orders` with no ceiling. | `config.py:423-434`, used at `gates.py:262,270,279` | P2: a $500 prod order passes | Code constants `HARD_MAX_ORDER=25`, `HARD_DAILY=25`, `HARD_OPEN=3`. Effective cap = `min(config, HARD_*)`. |
| G3 | **The approval token is self-serve.** The same caller that runs the preview gets the token on stdout and can execute with it. The token proves a preview happened, not that Sneaks approved. | `gates.py:305-373`, `cli.py:113-135` | P3 | For prod, execution must require something only Sneaks holds. One option: the preview token goes to Sneaks out-of-band (coms-pwa Face ID order, or a passkey/HMAC he signs) and is never printed to the operator. Another: a per-order HMAC with a key outside muse's reach. Demo can keep self-serve. |
| G4 | The day cap fails open on a corrupt audit line (`continue`). A deleted log reads as $0 spent. | `gates.py:221-225` | P4a | A corrupt line, or a missing log while prod orders exist, must refuse prod writes (fail closed). |
| G5 | An order whose send raises (timeout or 5xx after Kalshi may have accepted it) is never written to the audit log, so it never counts toward the day cap. `KalshiError` is not caught in `_write_flow`, so there is no attempt record at all. | `cli.py:152-171` | P4b | Append an `order_attempt` record with `est_cost_usd` (cost + fee) **before** `create_order_v2`, and count attempts toward the day cap. Reconcile with `get_orders` by `client_order_id` afterwards. |
| G6 | Token consume is load → mark → save with no lock. Two concurrent executions of the same token can both pass. | `gates.py:349-373` | — (race) | Wrap it in `fcntl.flock` on the preview store, or use an O_EXCL tombstone file per token. |

- Minor: the day cap sums cost only (`cli.py:166`), but the new-order check uses cost + fee (`gates.py:261`). Record cost + fee so they match.

## 3. STOP file — PASS (with notes)
- STOP is checked on every write path:
  - preview (`cli.py:114`, `gates.py:309`)
  - execution of buy, sell and **cancel** (`cli.py:129`)
- Not re-checked right before the send (`cli.py:154`). There is a `get_orders` round-trip in between. Add `gk.check_stop()` just before `create_order_v2` and `cancel_order_v2`.
- Decision for Sneaks: STOP currently blocks **cancels** too, so a stopped bot can't pull resting orders. My recommendation: allow cancels under STOP and block creates.

## 4. Secrets — PASS
- No key, PEM or signature reaches the audit log or stdout. The key id is not logged. Error output carries only server messages.
- `.gitignore` and the pre-commit hook block `*.pem`, `.env`, key-shaped content and audit/preview files.
- Note: `urllib.error.URLError` and `socket.timeout` are uncaught in `main()`. They print a traceback with no key material. Catch them and emit a JSON `transport` error.

## Next (start here)
1. muse: fix G1–G6 and the STOP re-check. Add tests that reproduce P1–P4b and now fail closed. Push to 0xSneaks/kalshi-trader and request a re-review. claude-code re-runs the proofs.
2. Sneaks: decide (a) how a prod approval reaches you (G3), and (b) whether cancels are allowed under STOP.
3. Demo end-to-end still needs demo keys (P1 in the project plan).

## ⚠️ High-risk
- Funds path. Not cleared for prod. `live_enabled` stays false until a re-review PASSes and Sneaks flips it himself.
