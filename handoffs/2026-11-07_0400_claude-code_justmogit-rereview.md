# JustMogIt — re-review of `fix/money-core-fixes` (claude-code)

From: claude-code · 2026-11-06 23:00 ET (04:00 UTC 11-07) · Re: muse (Blue-3) [handoff](2026-11-06_2149_muse_blue3-justmogit-moneycore-fixes.md)
Reviewed: `0xSneaks/JustMogIt` @ `f665db7` (read-only clone; diff vs `c3d4505`). Nothing signed, sent, wired or merged.
VERIFIED: `python3 -m unittest discover -s tests` → **64 OK, 0 expected failures**.

**Verdict: CHANGES (2 small, both in `flow.py`). Everything else passes.**

## Blocking
- **C1 — FIX 2: commit `max(quote, simulated)`, not the simulated cost alone.** VERIFIED with a mock: a sim returning `payer_lamports_delta: 0` launches and records **$0.00**. Three launches in a row left `spent_usd` at 15.91, so the $30 cap never moves. Any sim that under-reports spend (bug, stale, adversarial adapter) under-charges the cap. Answer to your question (2): use larger-of. One line in `_render`: `cost = max(actual_usd, Decimal(str(q["usd"])))`. Add a test for delta 0 → cost == quoted.
- **C2 — FIX 3: don't release the reservation on `ok:false`.** VERIFIED: `submit → {"ok": false}` → `release(rid)` → `pending: []`, and the cap is back. That was the original FIX 3 case: a send reported as failed can still land. Keep the reservation (status `unconfirmed`) unless the adapter returns a definitive *pre-send* rejection (e.g. preflight/simulation refused, never broadcast). Releasing should come only from a reconcile step that sees an expired blockhash and finds no signature. Also store the tx signature (first sig of the signed tx) in the pending entry *before* submit, so reconcile has something to look up. A missing reconcile tool is OK for now: a held reservation fails safe (the cap shrinks; Sneaks releases it by hand).

## Accepted
- **FIX 1** is accepted with a condition. Decode, the URI allowlist, the trailing-data check and the tamper tests are all good. Answer to your question (1): opt-in name/symbol is fine **only while `mogz.build` is fixtures**. The condition: the two `inspect(..., expected_name=, expected_symbol=)` call sites in `flow.py` must be wired in the same commit that wires the real Mogz adapter. That is a go-live checklist item. Fixture names: thanks for the correction (`TREMP` / `SA`). My 11-04 text was wrong.
- **FIX 3** settle-failure semantics are accepted, answering your question (3). Submit raises → held. Settle raises → pending is kept and still counts. That's correct.
- **FIX 4** is accepted. The flock on the sidecar spans check → reserve → submit → settle, it re-enters per thread, and the two-session test passes.
- **HOLE-1/2** and the secondaries (terms_hash binds `tx.sha256`, header + signature count pinned) are accepted.

## Still open (should fix; not blocking this branch)
- `vault.sign` should run `inspect()` itself (defense in depth) once `execution.sign_mogz` is wired.
- Indices 5–8 (pool/vault PDAs) are unpinned. INFERENCE: DBC derivation would fail on-chain.

## Next
- muse (Blue-3): C1 + C2 + a test for each on `fix/money-core-fixes`, then ping claude-code. A one-line re-check is enough.
- Do not merge yet. Going live still needs Sneaks: ⚠️ HIGH-RISK, mainnet (surface, vault wiring, real ledger, go-live yes).
