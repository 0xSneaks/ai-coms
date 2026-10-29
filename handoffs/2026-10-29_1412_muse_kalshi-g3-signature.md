# Handoff — kalshi-trader G3 signature fix shipped — muse — 2026-10-29 14:12 ET

**Ask (claude-code):** re-check G3 against repo commit `f999a608` (0xSneaks/kalshi-trader, tree `1ad8a4da` == local `7cfe6ea`). Re-run your proofs v2 G3 section. Verdict PASS / FIX-FIRST. Your line 161 spec is implemented as written; the path-segment minor is fixed too.

## What shipped

- **Outbox secret deleted.** Prod preview writes no secret anywhere (`_write_outbox_token` and `APPROVALS_OUTBOX` gone; grep in package+tests: zero hits). Preview card carries only `preview_hash` + `approval: "out_of_band_face_id_signature"`.
- **Approval = Ed25519 signature** dropped at `~/.config/kalshi/approved/<preview_hash>.sig` as JSON `{"signature_b64", "expires_unix"}`. `consume_prod_approval` verifies, under the existing flock: (a) signature over the exact string `kalshi-approve:v1:<preview_hash>:<expires_unix>` (exposed as `GateKeeper.approval_message` — the cross-component contract for the coms-pwa signer); (b) signed hash == re-derived intent hash; (c) expiry in the future; (d) single-use — the signature's sha256 is burned in the preview store, so replay is refused even against a fresh preview of the identical intent.
- **Fail closed:** `approval_pubkey_b64` unset or not a raw 32-byte Ed25519 key → ConfigError at load / prod execution refuses.
- **Minor fixed:** `client.py` `_path_segment` now rejects `.` and `..` explicitly.
- Demo flow untouched (self-serve token stays, demo only).

## Proof

- pytest **93 passed** (77 baseline + 17 new in `tests/test_g3_signatures.py`, keypairs generated in-test only; `test_review_fixes.py` P3/P4b updated in place where they encoded the rejected outbox design).
- New tests cover: wrong key, bit-flipped signature, wrong-hash signature, intent changed after preview, expired, stale preview with fresh signature, replay, replay vs fresh identical preview, no-pubkey refusal, malformed drops (4 shapes), config key validation.
- Muse independently re-ran the suite (93/93), confirmed `live_enabled:false`, zero outbox references, and verified the remote tree equals the local tree after the push. No network calls, no orders.

## Integration notes

- coms-pwa signer must sign `GateKeeper.approval_message(preview_hash, expires_unix)` byte-for-byte.
- Sneaks sets `approval_pubkey_b64` in `~/.config/kalshi/trader-config.json` himself once he creates the keypair — until then prod fails closed by design.
- The coms-pwa signing-route build still awaits Sneaks's "✅ Sneaks APPROVED the build" (asked in main chat 2026-10-29 13:56 ET; board line 125 says the same). Prod stays LOCKED regardless: G3 re-check PASS + his live_enabled flip are both still required.

Coms: signed off → handoffs/2026-10-29_1412_muse_kalshi-g3-signature.md
