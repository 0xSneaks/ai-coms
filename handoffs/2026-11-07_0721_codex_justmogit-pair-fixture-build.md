# JustMogIt Pump pair preview and fixtures

Codex · 2026-11-07 07:21 ET

## Did

- VERIFIED: Pushed the [preview implementation and fixtures](https://github.com/0xSneaks/just-mog-it/commit/0e5b9bb65ce06e63c14518a7a41af1529677aa1b) to `codex/pump-pair-fixtures`, based on launch PR #1 at `94f4ea1d107509359df9604913e92ac9342ab677`. A fresh checkout matched commit `0e5b9bb65ce06e63c14518a7a41af1529677aa1b` and tree `7edf2d9751a053fac3cf9e06385a6162dd892171`. No merge or production activation.
- VERIFIED: Implemented the read-only Python Global/QuoteControl batch, a Pump curve and canonical PumpSwap resolver, exact quote/mint checks, injected four-field decision validation, engine preview through `Engine.ingest`, and SQLite operator choices. Actual quote metadata stays keyed to exact mints. The independent receipt verifier requires finalized status, the expected Pump create instruction and mint, Token-2022 ownership, and the expected quote in both instruction and resolved state.
- VERIFIED: Reworked the supplied suite to use valid deterministic offline keys, separate SOL normalization, a true USDC-to-SOL preview, positive and negative finalized receipt evidence, and a file-backed queue test. The registry fixture uses the actual official Pump SDK 4.3.1 result on captured Global and QuoteControl bytes at finalized slot 466508955. It contains 230 entries.

## State and proof

- VERIFIED: Fresh remote checkout ran the 33 focused fixtures and 164 total tests, all passing. Also resolved Pump's documented mint `7LSsEoJGhLeZzGvDofTdNg7M3JttxQqGWNLo6vWMpump` via read-only mainnet RPC to the expected canonical PumpSwap pool `GseMAnNDvntR5uFePZ51yZBXzNSn7GdFPkfHwfr6d77J`, quote wrapped SOL.
- VERIFIED scope: The reviewed engine mode refuses public use, creates preview records and queues questions without invoking payment, signing, sending or X. The evaluator and trusted candidate/liquidity input are injected. Executable PumpSwap depth is a required input to this decision, not fabricated from reserves.
- UNKNOWN: No live DeepSeek provider, production operator resume or verified live launch fixture. Existing `create_v2` signing guard remains closed. The independent receipt verifier was tested offline and is not a live posting path. The existing live launch path still uses its legacy policy.

## Decided

- INTENT: Use the existing launch engine and SQLite store rather than introduce a second `mogit.caller` pipeline. Keep the new branch in review until the actual provider, destination liquidity policy, live `create_v2` pre-sign layout and authorized go-live are settled.

## Next

- Verify the live adapter and provider contracts, measure and approve venue-specific floors, and pin a real Pump `create_v2` instruction fixture before integrating signing or public posting. ⚠️ HIGH-RISK for live execution.

## Don't

- Do not interpret the preview, test receipts or read-only RPC check as a launch or deployment.

## Actual focused pytest output

Command: `python -m pytest -v tests/test_mog_it_fixtures.py`

```text
============================= test session starts ==============================
platform linux -- Python 3.12.14, pytest-8.4.2, pluggy-1.7.0 -- /tmp/jmi-pair-build/venv/bin/python
cachedir: .pytest_cache
rootdir: /tmp/jmi-pair-build/remote
plugins: anyio-4.14.2
collecting ... collected 33 items

tests/test_mog_it_fixtures.py::test_registry_decoder_matches_real_sdk_capture PASSED [  3%]
tests/test_mog_it_fixtures.py::test_bad_registry_program_is_rejected PASSED [  6%]
tests/test_mog_it_fixtures.py::test_normalize_sol[11111111111111111111111111111111-So11111111111111111111111111111111111111112] PASSED [  9%]
tests/test_mog_it_fixtures.py::test_normalize_sol[So11111111111111111111111111111111111111112-So11111111111111111111111111111111111111112] PASSED [ 12%]
tests/test_mog_it_fixtures.py::test_normalize_sol[EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v-EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v] PASSED [ 15%]
tests/test_mog_it_fixtures.py::test_curve_uses_derived_address_and_normalizes_sol PASSED [ 18%]
tests/test_mog_it_fixtures.py::test_completed_curve_uses_canonical_pumpswap_pool PASSED [ 21%]
tests/test_mog_it_fixtures.py::test_bad_pool_never_reaches_evaluator[None] PASSED [ 24%]
tests/test_mog_it_fixtures.py::test_bad_pool_never_reaches_evaluator[base] PASSED [ 27%]
tests/test_mog_it_fixtures.py::test_bad_pool_never_reaches_evaluator[quote] PASSED [ 30%]
tests/test_mog_it_fixtures.py::test_bad_pool_never_reaches_evaluator[owner] PASSED [ 33%]
tests/test_mog_it_fixtures.py::test_relaunch_usdc_to_sol_is_only_a_preview PASSED [ 36%]
tests/test_mog_it_fixtures.py::test_matching_pair_keeps_with_threaded_reply_preview[EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v] PASSED [ 39%]
tests/test_mog_it_fixtures.py::test_matching_pair_keeps_with_threaded_reply_preview[11111111111111111111111111111111] PASSED [ 42%]
tests/test_mog_it_fixtures.py::test_relaunch_fails_closed[GLcxtDLgJ4uyr1ngAkuoqNUx3AeUuUdzhNFjYJpRP61j-50000-80000-quote_not_supported] PASSED [ 45%]
tests/test_mog_it_fixtures.py::test_relaunch_fails_closed[EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v-50000-80000-same_quote] PASSED [ 48%]
tests/test_mog_it_fixtures.py::test_relaunch_fails_closed[So11111111111111111111111111111111111111112-None-80000-unset_floor] PASSED [ 51%]
tests/test_mog_it_fixtures.py::test_relaunch_fails_closed[So11111111111111111111111111111111111111112-50000-None-missing_liquidity] PASSED [ 54%]
tests/test_mog_it_fixtures.py::test_relaunch_fails_closed[So11111111111111111111111111111111111111112-50000-0-low_liquidity] PASSED [ 57%]
tests/test_mog_it_fixtures.py::test_wrong_target_and_unapproved_narrative_quote_are_rejected PASSED [ 60%]
tests/test_mog_it_fixtures.py::test_ambiguous_quote_queues_exact_mints_and_revalidates_operator_choice PASSED [ 63%]
tests/test_mog_it_fixtures.py::test_curve_liquidity_uses_raw_units_and_keeps_missing_distinct_from_zero PASSED [ 66%]
tests/test_mog_it_fixtures.py::test_executable_liquidity_is_required_for_pumpswap PASSED [ 69%]
tests/test_mog_it_fixtures.py::test_author_gate_runs_before_model[changes0] PASSED [ 72%]
tests/test_mog_it_fixtures.py::test_author_gate_runs_before_model[changes1] PASSED [ 75%]
tests/test_mog_it_fixtures.py::test_author_gate_runs_before_model[changes2] PASSED [ 78%]
tests/test_mog_it_fixtures.py::test_public_engine_refuses_pair_preview PASSED [ 81%]
tests/test_mog_it_fixtures.py::test_receipt_independently_verifies_finalized_mint_and_quote[finalized-None-11111111111111111111111111111111-TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb-True] PASSED [ 84%]
tests/test_mog_it_fixtures.py::test_receipt_independently_verifies_finalized_mint_and_quote[finalized-So11111111111111111111111111111111111111112-11111111111111111111111111111111-TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb-True] PASSED [ 87%]
tests/test_mog_it_fixtures.py::test_receipt_independently_verifies_finalized_mint_and_quote[confirmed-None-11111111111111111111111111111111-TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb-False] PASSED [ 90%]
tests/test_mog_it_fixtures.py::test_receipt_independently_verifies_finalized_mint_and_quote[finalized-EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v-11111111111111111111111111111111-TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb-False] PASSED [ 93%]
tests/test_mog_it_fixtures.py::test_receipt_independently_verifies_finalized_mint_and_quote[finalized-None-EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v-TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb-False] PASSED [ 96%]
tests/test_mog_it_fixtures.py::test_receipt_independently_verifies_finalized_mint_and_quote[finalized-None-11111111111111111111111111111111-TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA-False] PASSED [100%]

============================== 33 passed in 0.19s ==============================
```
