# JustMogIt PR #5 independent re-review

**VERIFIED — CHANGES @ `1c6942a02fbc81df9a8de8e807a0331f0e888063`.** [PR #5](https://github.com/0xSneaks/just-mog-it/pull/5) remains open for an amount-validation patch.

## Did and proof

- VERIFIED — A fresh detached checkout at the full SHA above installed `requirements.txt` in a new virtual environment. Credential-free `python3 -m pytest -q` with Python socket connections blocked returned **430 passed in 7.79s**. The implementation diff contains six files and no site or prompt changes.
- VERIFIED — The dispatch path requires an approved record with stored approver Sneaks or Muse, even with the legacy autopost flag set. It checks the kill switch at each item, before media upload, and before reply. The suite covers a stop during upload, a stop between items, and preserving `POSTING` after an ambiguous reply. The pre-sign check now uses the pinned card cost under the ledger lock and refuses an otherwise valid card whose full cost exceeds the remaining budget. Luna's negative SOL and fractional simulation reproductions now refuse.
- VERIFIED — The independent edge probes below still fail. Probes used fixture quotes, an in-memory signer sentinel, and no live signing, submit, X, or Gemini calls. The implementation lane's text-only shades wording stays in [Luna's handoff](2026-11-07_1836_codex_justmogit-pr5-implementation.md).

## Changes requested

1. **VERIFIED — The SOL quote cap can round down before the comparison.** [mogit/gates.py:48](https://github.com/0xSneaks/just-mog-it/blob/1c6942a02fbc81df9a8de8e807a0331f0e888063/mogit/gates.py#L48). An exact decimal quote just above 0.025 SOL passed the cap and whole-lamport checks and reached the stub signer with an at-cap integer simulation. Multiplication by the lamport scale rounded it to the cap using the active decimal context. A signaling NaN and a finite quote with an extreme exponent also caused uncaught decimal exceptions before refusal. The simulation path has the same controlled-refusal gap for an extreme negative exponent-form amount during unary negation. Validate finiteness, sign, and upper bound before arithmetic. Compare the original SOL value exactly and reject fractional lamports without rounding an invalid quote into the allowed range. For simulation, reject magnitudes outside the cap before any context-sensitive conversion or sign change. Add regressions for the observed edge cases and retain the exact-cap pass. [Simulation conversion](https://github.com/0xSneaks/just-mog-it/blob/1c6942a02fbc81df9a8de8e807a0331f0e888063/mogit/gates.py#L73)
2. **VERIFIED — The USD quote can bypass the lifetime budget gate.** [mogit/flow.py:46](https://github.com/0xSneaks/just-mog-it/blob/1c6942a02fbc81df9a8de8e807a0331f0e888063/mogit/flow.py#L46). A valid SOL quote with negative USD produced a negative pinned card cost and reached the stub signer. Missing USD raised `KeyError`, and non-finite USD raised `InvalidOperation`. `Ledger.check` compares only the upper bound, and settlement adds the reserved cost to recorded spend. Validate USD as present, numeric, finite, and non-negative before the flow uses it. Enforce the same input invariant at the ledger boundary before checking, reserving, or booking a cost. Add tests for negative, non-finite, malformed, and missing USD and assert the flow refuses before build or sign. [Ledger check](https://github.com/0xSneaks/just-mog-it/blob/1c6942a02fbc81df9a8de8e807a0331f0e888063/mogit/ledger.py#L104)

## State, decision and next step

- VERIFIED — PR #5 is held on CHANGES. No bot or site source was edited in this review.
- INFERENCE — GPT 6 Luna's implementation lane can fix both amount-validation issues in the same PR, run the full offline suite, and request independent Codex re-review at the new head SHA.
- UNVERIFIED — Live Gemini fit and the operator access boundary remain outside this offline review.
- Don't merge without a fresh approval and green suite. Keep the site, runtime switches, and live adapters out of this fix.
