# PR #5 amount-validation fixes — independent re-review requested

2026-11-07 22:29 ET · codex · ⚠️ HIGH-RISK money paths (offline implementation only)

## Did

- VERIFIED — Both 18:48 re-review blockers patched on `claude/admiring-mayer-3n4uj8`, pushed at `78fb7973b282a2b9a165552709050e5cbd6c29b3` ([commit](https://github.com/0xSneaks/just-mog-it/commit/78fb7973b282a2b9a165552709050e5cbd6c29b3)). Remote `git ls-remote` returned the identical full SHA.
- VERIFIED — `mogit/gates.py` checks the original finite, non-negative SOL value against 0.025 before arithmetic. Exact exponent shifting avoids decimal-context rounding; fractional lamports refuse. Zero and exact cap pass. Simulation rejects non-finite/fractional values and excessive magnitude before sign conversion; `copy_negate` avoids context-sensitive negation.
- VERIFIED — `mogit/flow.py` validates USD presence, numeric parsing, finiteness and non-negative sign before use. `mogit/ledger.py` enforces the same invariant for checks, reservations, direct bookings and persisted amounts used by settlement. Invalid USD refuses without building/signing or ledger mutation.
- VERIFIED — Added 98 regression cases: above-cap decimals beyond context precision, fractional lamports, signaling/quiet NaN, infinities, extreme exponents, low precision, missing/malformed/negative USD at start/render/confirm and ledger boundaries, corrupt reservations, zero/exact limits. Updated the old breaker test that expected negative recorded spend to inflate remaining budget; it now requires refusal.

## State and proof

- VERIFIED — In `/workspace/just-mog-it`, activated the existing isolated Python venv; `pip install -r requirements.txt` succeeded. Final `python -m pytest -q`: **528 passed in 8.08s**. `git diff --check` passed, working tree clean after commit. Suite uses offline fixture adapters; no live signing, submit, X or Gemini calls were performed.
- VERIFIED — Exactly five changed files: `mogit/gates.py`, `mogit/flow.py`, `mogit/ledger.py`, `tests/test_amount_validation.py`, `tests/test_breakers.py`.
- INTENT — Independent review is requested; this implementation session does not self-approve. No merge or go-live performed.

## Decided

Use exact decimal comparisons/conversion for lamports and one shared USD validator at both flow and ledger boundaries. Reject corrupt stored costs rather than allowing them to enlarge available budget.

## Next — note for independent Codex reviewer

Fresh checkout of `78fb7973b282a2b9a165552709050e5cbd6c29b3`. Install `requirements.txt`, run `python3 -m pytest -q`, inspect every `docs/REVIEW-NOTES.md` money-path line and both blocker fixes, then post **APPROVED @ 78fb7973b282a2b9a165552709050e5cbd6c29b3** or **CHANGES** on BOARD.md. Report under the new independent re-review request. Prior CHANGES @ 1c6942a is historical and is not approval of this head.

## Don't

Do not merge before fresh independent approval and green suite. No site, runtime switches, venue adapter or live money actions in this fix. Mainnet go-live still needs Sneaks's final yes. Unrelated inbox requests remain deferred to this owner-prioritized lane.
