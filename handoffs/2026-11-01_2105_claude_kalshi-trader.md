# Handoff — kalshi-trader — claude — 2026-11-01 21:05 ET

**Session goal:** close the two 2026-10-29 asks to claude ([shard-fix + autonomy](2026-10-29_1852_muse_kalshi-shard-fix-and-autonomy.md), [scope confirmed](2026-10-29_1857_muse_kalshi-autonomy-confirmed.md)) — rundown §4 Q1 asked "close or confirm". They were NOT done: no claude verdict existed. Verdicts below.
**Status:** DONE (review only)
**Repo / branch:** 0xSneaks/kalshi-trader — read-only. main `46dc238` · `muse/shard-aware-fix` `b1a7215` · `muse/autonomy-mode` `e91ff67`. Pushed nothing to it.

## Ask 1 — shard-aware fix (`b1a7215`): ✅ PASS (merge-safe), 2 non-blocking fixes
- VERIFIED: suite runs. Result is **flaky, not 139/139**: 3 of 5 runs → 1 failed / 138 passed (`test_cli_transfers_inactive_blocks_before_any_transfer`).
  - Cause (VERIFIED by capture): demo approval token = `secrets.token_urlsafe(24)` (gates.py:426). ~1 in 64 tokens starts with `-`; `--approval-token <tok>` then fails in argparse (`expected one argument`). Fail-closed, demo only (prod passes the hex preview hash). Pre-exists on main.
  - Fix: `secrets.token_hex(24)`, or CLI hint `--approval-token=<tok>`.
- VERIFIED by reading: plan is inside the preview hash + second check `_check_record_plan`; execution re-derives from fresh reads; plan-less preview can never run a transfer; STOP checked before and after the transfer; caps before; transfer only shard→shard, subaccount 0→0; unconfirmed transfer ⇒ no order. Sound.
- Non-blocking: the hash covers raw `available_usd`. Any balance move (a fill, a settlement) inside the 15-min TTL refuses execution even when funding is still fine. Safe, but expect "plan changed" refusals. Later: hash only `needs_transfer/source/dest/amount` + re-check sufficiency at send.
- Accepted as designed: a failed transfer burns the approval (fresh preview + tap to retry).
- **Merge = Sneaks's word** (per Muse's own gate). Rebase autonomy work onto it, not the other way.

## Ask 2 — autonomy mode: ❌ FIX-FIRST (concept + `e91ff67`)
Note: built at 19:03, 6 min after scope confirm, before this verdict (handoff said implementation waits). NOT on main — fine.
- **F1 · self-approval.** The attestation is a JSON file the operator writes and passes itself. "Only when confident" is not a gate — it is a field the operator sets. In effect: full autonomy inside the caps. The only real bound is the caps ($25/order, 3 open, $25/day) + STOP. That is the G3 class claude-code FIX-FIRSTed twice.
- **F2 · edge check has no direction** (gates.py `_validate_attestation`: `abs(prob − price)`). VERIFIED by probe: buy YES @ 0.40 with own_probability 0.10 (says it's overpriced) → **ACCEPTED**.
- **F3 · single-use is cosmetic.** Burn key = sha256 of file bytes; preview itself is never burned. VERIFIED by probe: same preview approved 5 more times by adding whitespace to the same attestation.
- **F4 · ships ON.** `config.json` sets `autonomy_enabled: true` while config.py says "Ships False; Sneaks flips it himself". Its own test fails: `test_shipped_repo_config_has_autonomy_disabled` (128 pass / 1 fail, VERIFIED).
- **F5 · branched off main**, not off the shard fix → autonomous orders skip shard planning (same `insufficient_shard_balance` the first live order hit).

### Fix list (to PASS)
1. Edge check directional: buy side needs `prob − price > fee + 0.03`; sell the mirror.
2. Burn the **preview** on use (one order per preview, any path); burn key = preview hash, not file sha.
3. `config.json` → `autonomy_enabled: false`; Sneaks flips it in his own commit; test green.
4. Rebase onto `muse/shard-aware-fix`; autonomy path must carry the shard plan.
5. Rename/document honestly: attestation = **audit record**, not authorization. If Sneaks wants a real gate, the right one is his Ed25519-signed **time-boxed budget grant** ("$X, profile Y, N hours", verified with the pinned pubkey, spend burned down in the store) — same open decision as in Muse's rundown. Operator can't mint it.
6. Report-every-trade (scope item) is not in this branch — add it or name where it lives.

## Also closed
- [muse → claude] grants + kalshi **brief #2** (G3 Face ID design, 2026-10-29 12:25): superseded — the Ed25519 chain (`f999a60` → G3c `46dc238`) replaced the token design and claude-code re-checked it.
- [muse → claude] gta6 optimization review: done by claude-code 19:00 (PASS on `d0c1f692`).

## Next (start here)
1. muse: fixes 1–6 on `muse/autonomy-mode` (rebased on shard fix), push, re-ping claude-code for re-check.
2. muse: token_hex fix on the shard branch (one line + test), then ask Sneaks for the merge word.
3. Separate, still BLOCKED: `~/workspace/kalshi-bot` (bench findings: STOP not checked in live path, autonomous skips demo token, caps not enforced) — not on GitHub; push it before anyone can review.

## Don't
- Don't flip `autonomy_enabled` true via an agent commit. Don't merge `muse/autonomy-mode` as is.

## ⚠️ High-risk
- Funds path. Both branches need claude-code re-check after fixes + Sneaks's explicit word before merge. Main currently: `live_enabled: true`, no autonomy, signature-only prod — unchanged by this review.

Labels: VERIFIED = ran or read it here (probes in a tmp dir, fake state, no network, no orders). No secrets in this file.
