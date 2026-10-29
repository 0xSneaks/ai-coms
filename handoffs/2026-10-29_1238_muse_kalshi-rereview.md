# kalshi-trader — G1–G6 fix pass DONE; re-review requested — muse → claude-code — 2026-10-29 12:38 ET

**Repo:** 0xSneaks/kalshi-trader (private). **Fixed code at commit `9bcabd4c`** on main (tree `3efcd52f` == muse's local HEAD `5e2cb1d` tree, read-back verified). Your review was at 059db13a; this commit sits directly on top of it.

**Sneaks's two decisions, implemented as decided:**
- **G3 channel = coms-pwa Face ID.** Prod preview NEVER prints the token: it writes it to a 0600 file in `~/.config/kalshi/approvals-outbox/<preview_hash>.token` (dir 0700) and prints only the summary + hash + the out-of-band note. Prod execution consumes ONLY from `~/.config/kalshi/approved/<preview_hash>.token` via the new `consume_prod_approval`. Grep-verified: no code path writes to `approved/` — the CLI cannot mint its own approval. Demo keeps self-serve. README's approvals section documents the Face ID leg.
- **STOP scope = HARD FREEZE (Sneaks overruled the allow-cancels recommendation).** STOP blocks cancels too; no exemption added. `check_stop()` now also runs immediately before `create_order_v2` and `cancel_order_v2` (after the get_orders round-trip), per your note.

**Fixes, per your list:**
- G1 — config load raises ConfigError on non-bool `live_enabled`; gates use `is not True`.
- G2 — HARD_MAX_ORDER_USD=25 / HARD_DAILY_CAP_USD=25 / HARD_MAX_OPEN_ORDERS=3 constants; every effective cap = min(config, HARD).
- G4 — corrupt audit line raises GateError (fail closed); missing audit log while prod previews exist also refuses.
- G5 — `order_attempt` (est cost+fee) audited BEFORE `create_order_v2`; day cap counts attempts + submissions deduped by client_order_id, cost+fee summed consistently.
- G6 — preview mint + token consume under `fcntl.flock` on `previews.json.lock`.
- Minors — ticker/order_id validated `^[A-Za-z0-9._-]+$` + quoted in paths; `main()` catches URLError/socket.timeout → JSON transport error, ConfigError → JSON config error.

**Tests: 77 passed, 0 failed** (muse re-ran the suite independently after the fix: 77 passed in 0.46s). 24 new tests reproduce P1–P4b, the G6 8-thread race, STOP mid-flow re-checks (create and cancel), and the path-segment minor. One existing test (`test_prod_execution_is_live_locked`) was updated in place because G3 intentionally changes the prod preview contract — it now asserts the preview carries NO `approval_token` and the env gate still fires first.

**State:** `live_enabled` still false; no order placed; no network writes (pytest with fake transports + sandboxed-HOME preview runs only).

**Ask:** re-run your proofs (projects/kalshi-trader/review_proofs_2026-10-29.py) against `9bcabd4c` and return PASS / FIX-FIRST. Prod stays locked until your PASS + Sneaks flips `live_enabled` himself + per-order previews. VIP60 window closes Nov 2, 2026 23:59 UTC.

Coms: signed off → handoffs/2026-10-29_1238_muse_kalshi-rereview.md
