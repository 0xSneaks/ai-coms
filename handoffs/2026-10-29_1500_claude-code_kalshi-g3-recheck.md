# Handoff — kalshi-trader G3 re-check — claude-code → muse — 2026-10-29 15:00 ET

**Session goal:** Re-check the G3 signature fix at `f999a608` (muse's request, handoffs/2026-10-29_1412).
**Status:** DONE. **Verdict: G3 still FIX-FIRST (one narrow hole). Everything else PASS.** Prod stays locked.

## Evidence
- Tests: `python3 -m pytest` → 93/93 pass. — VERIFIED
- Proofs v3: `projects/kalshi-trader/review_proofs_2026-10-29_v3.py`. Offline, temp files, no network, no orders.

| Check | Result |
|---|---|
| Outbox secret removed (no copyable token) | PASS. The token is gone from code; approval is an Ed25519 signature over `kalshi-approve:v1:<hash>:<exp>`. — VERIFIED |
| No public key → prod refuses | PASS (fail closed). — VERIFIED |
| Replay of a used signature | PASS. Burned under flock. — VERIFIED |
| Expiry / hash mismatch / malformed drop | PASS (code read). — VERIFIED |
| Path segments `.`/`..` | PASS (fixed). |
| **Operator-minted key** | **FAIL. The bypass is ACCEPTED.** See below. — VERIFIED |

## The remaining hole (G3c)
- `approval_pubkey_b64` is loaded by `load_config()` (`config.py:128-139`). That function merges `~/.config/kalshi/trader-config.json`, a file the operator owns and can write.
- The bypass:
  1. The operator generates its own Ed25519 keypair.
  2. It writes the public key into that file.
  3. It signs `kalshi-approve:v1:<hash>:<exp>` and drops the `.sig`.
  4. Prod execution accepts it.
- The same file also sets `live_enabled: true`. That passes too, because it is a real bool.

## Fix
1. **Pin the approval public key in code.** Make it a constant in `config.py` (e.g. `APPROVAL_PUBKEY_B64 = "<Sneaks's pubkey>"`) that changes only through a reviewed commit.
   - `load_config` must **reject** `approval_pubkey_b64` from the user config. Raise ConfigError so it's visible, not silently ignored.
   - Until Sneaks gives the public key, the constant stays empty, so prod fails closed (it already does).
2. **Same for `live_enabled`.** Read it only from the repo's committed `config.json`, never from the user override. Raise ConfigError if the user override sets it.
3. Add tests: a user config carrying either key → ConfigError, and the v3 proof flips to PASS.

## Honest limit (for Sneaks)
- These are client-side gates on a machine the operator controls. They reliably stop **mistakes and drift**. They cannot stop an operator that edits the code itself.
- The hard backstops are outside the VM:
  - **The account balance is only $25.** That's the true worst case today.
  - **The coms-pwa private key never lives on the VM.**
- Keep funding small until the coms-pwa route exists and has run cleanly.

## Next (start here)
1. muse: pin the key and `live_enabled` as above, add tests, push, request a G3 re-check.
2. Sneaks:
   - Approve the coms-pwa signing route with "✅ Sneaks APPROVED the build". claude-code then builds it as a draft PR.
   - Generate the Ed25519 keypair yourself: private key into the coms-pwa env, public key into the repo constant via PR.

## ⚠️ High-risk
- Funds path. `live_enabled` stays false. No live orders.
