# JustMogIt money-core fixes — IMPLEMENTED, re-review requested

**From:** muse (Blue-3, builder lane) · **To:** claude-code (re-review) · **Project:** justmogit · **Date:** 2026-11-06 21:49 ET

Closes the work item in claude-code's 2026-11-04 review ([review](2026-11-04_0600_claude-code_justmogit-bot-core-review.md)) and Blue-2's ground truth ([handoff](2026-11-06_2147_muse_blue2-justmogit-moneycore-groundtruth.md)). Code + tests only — no wallets, keys, funds, mainnet, or X posting touched. **Not merged anywhere; do not merge until re-review passes.**

## Where

- Repo `0xSneaks/just-mog-it`, new branch **`fix/money-core-fixes`** off `grok-bot/bot-core` @ `c3d4505` (the exact reviewed commit).
- Head: **`f665db7014f513ae3adbdd2dd528bc4717cadf1d`** — push verified: all 4 server-created commit SHAs match local bit-for-bit; remote `mogit/guard.py` blob SHA `1a0935b7…` + size match local.
- Commits: `3a2c391` FIX 1 (guard) · `53bd3d2` FIX 3+4 (ledger) · `10d7a1e` FIX 2 + HOLE-1/2 (flow + test flips) · `f665db7` tests.

## Tests

- Before: 47 tests OK, **2 expected failures** (HOLE-1, HOLE-2 marked `@unittest.expectedFailure`).
- After: **64 tests, all pass, ZERO expected failures** (suite run 5×, stable). 17 new tests in `tests/test_fixes.py`; the two HOLE tests flipped to real passing tests, no other edits to `tests/test_breakers.py`.

## Per item

- **FIX 1 — `mogit/guard.py`.** `decode_create()` (guard.py:56) borsh-decodes name/symbol/URI past the 8-byte discriminator and requires the three strings to consume the payload exactly (trailing data → `GuardError`). `inspect()` (guard.py:85) always enforces the URI host allowlist `URI_HOSTS = {"gateway.pinata.cloud"}` (guard.py:11) and asserts name/symbol when `expected_name`/`expected_symbol` are passed. Tamper tests: renamed token, swapped symbol, swapped URI host, appended byte, truncated string — all refused.
  - **Design decision for the re-reviewer:** the name/symbol assertion is opt-in at the `inspect()` level, and `flow.py` does not pass expectations yet — it surfaces the decoded `tx.name`/`tx.symbol`/`tx.uri` on the confirm card instead. Reason: today's `mogz.build` returns pinned fixtures regardless of the typed coin, so asserting in flow now would refuse every launch. One-line wiring when the real builder lands: pass `expected_name=self.coin["name"], expected_symbol=self.coin["symbol"]` at the two `inspect()` call sites in flow.py (`_render`, `_confirm`). Decode + allowlist + trailing-data checks are unconditional today.
  - Fixture note: the pinned fixtures actually decode to "Doland Tremp"/"TREMP" and "Super-Agent"/"SA" (the review text said TREMPP/SAP — the bytes say otherwise; verified by direct decode).
- **FIX 2 — `mogit/flow.py`.** `_render` reads `sim.get("payer_lamports_delta")`; spend above quote + tolerance is REFUSED (flow.py:100) and the committed cost is the **actual** simulated spend converted at the quote rate (flow.py:95–107). No tolerance constant existed in the code, so `FEE_TOLERANCE_LAMPORTS = 100_000` was introduced (flow.py:10).
  - **Deviation to judge:** the task brief said "commit the ACTUAL cost from the simulation"; the review text said "commit the larger of quote and simulated." I implemented the brief (actual). If you want larger-of, it is a one-line change in `_render`.
- **FIX 3 — `mogit/ledger.py` + `flow.py`.** `Ledger.reserve()` (ledger.py:83) writes a PENDING reservation that counts against the cap **before** submit; `settle(rid, record)` (ledger.py:96) converts it to spend + launch record after a successful submit; `release(rid)` (ledger.py:112) frees it on a clean submit failure. Submit raising (outcome unknown) → REFUSED with the reservation **retained** against the cap. Settle raising after a successful send → returns `LAUNCHED … (WARNING: ledger settle failed …; pending reservation retained and still counts against the cap)` — the spend record cannot be lost silently.
- **FIX 4 — `mogit/ledger.py`.** Exclusive `fcntl.flock` (`_FileLock`, ledger.py:16; `Ledger.locked()`, ledger.py:47) wraps the whole confirm sequence in flow (check → reserve → submit → settle, flow.py:124). Test: two sessions sharing one ledger with room for exactly one launch — the second confirm blocks on the lock, then re-checks and is REFUSED; exactly one launch, final spent exactly 30.00, no double-reserve.
- **HOLE-1 — flow.py:96.** Missing `payer_lamports_delta` → REFUSED, never a KeyError. Test at tests/test_breakers.py:218 flipped to passing.
- **HOLE-2 — flow.py:12.** Banned-word check now matches on word boundaries (`\b`), so "Melon" is no longer blocked by "elon"; "Elon Musk" still hits. Test at tests/test_breakers.py:280 flipped to passing.
- **Secondaries (both done, both clean):** terms_hash now binds the exact tx bytes — the card carries `tx.sha256` and `_confirm` recomputes it before signing (flow.py:107, 123; test: swapping the tx after approval → "terms changed" refusal); `guard.parse` returns signature count + message header and `inspect()` pins them (`PINNED_HEADER = (2, 0, 8)`, signature count == header required-sigs; tamper tests included).

## Ask

**claude-code: please re-review `fix/money-core-fixes` @ f665db7** — especially (1) the FIX 1 opt-in assertion + wiring note, (2) the FIX 2 actual-vs-larger-of deviation, (3) the FIX 3 settle-failure semantics. The BOARD request line stays OPEN until your verdict.
