# JustMogIt DeepSeek preview evaluator

Codex · 2026-11-07 08:48 ET

## Did

- VERIFIED: Adapted the proposed evaluator to the repository's actual layout in [commit c2efb4e](https://github.com/0xSneaks/just-mog-it/commit/c2efb4e6267194ab04bfd7e2069db2ca8e4973d5), pushed on `codex/deepseek-pair-preview` over the verified pair-preview commit `0e5b9bb65ce06e63c14518a7a41af1529677aa1b`. The patch adds only `bot/live/deepseek.py`, `requirements-deepseek-preview.txt`, and `tests/test_deepseek_evaluator.py`. `Engine`, `PairPreview`, `validate_decision`, and the signing guard are untouched.
- VERIFIED: `build_deepseek_preview(resolver, registry, context, metadata=...)` is explicit programmatic opt-in. It loads `DEEPSEEK_API_KEY` and optional `DEEPSEEK_MODEL` from the environment and injects a callable into the existing preview. Default model is the provider-documented `deepseek-flash`, with bounded JSON output and thinking disabled. [DeepSeek model docs](https://api-docs.deepseek.com/quick_start/pricing) · [Thinking control](https://api-docs.deepseek.com/guides/thinking_mode/)
- VERIFIED: The preview context already carries measured liquidity and candidate mints. An explicit metadata callback supplies holders, 24h volume and age. Preflight rejects missing fields and empty candidates before making a model request. No raw X mention is added to the payload. Responses are validated with the existing four-field `EvaluatorResult`; target and quote overrides reject. The transport returns typed errors compatible with the existing preview catch and bounds 429, 5xx and transport retries.

## State and proof

- VERIFIED: Fresh checkout of pushed commit `c2efb4e6267194ab04bfd7e2069db2ca8e4973d5` matched tree `a74f01fc81a2ecc90ba701c2930e819a013029dd`. `python -m pytest -v tests/test_deepseek_evaluator.py` reported `28 passed in 0.16s`. Full suite reported `192 passed in 1.32s`.
- VERIFIED: Mocked HTTP tests cover keep, relaunch proposal, reject, malformed output, missing metadata, no candidates, auth, 429, 5xx, transport, timeout, and model target/quote overrides. Engine integration proves successful preview and fail-closed provider errors with zero X, wallet, payment or RPC writes and refusal of public preview construction.
- UNKNOWN: Actual DeepSeek API access and production metadata source. The preview is opt-in through the factory; the CLI/production runner does not select it. The existing operator queue remains available to other preview evaluators; this adapter follows the proposed keep/relaunch/reject action set.

## Next

- INTENT: Supply verified preview metadata and smoke-test the opt-in callable with an authorized key. Live `create_v2` signing remains separately gated on the finalized transaction and reconciliation evidence.

## Don't

- Do not interpret mocked API responses or a preview relaunch decision as a real launch or X reply. No provider calls, transactions, deployment or production activation took place.
