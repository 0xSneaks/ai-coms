# JustMogIt DeepSeek adapter

## Did

- VERIFIED. Updated the opt-in preview adapter on `codex/deepseek-pair-preview` at [`c37212d`](https://github.com/0xSneaks/just-mog-it/commit/c37212d532fc4312537204b55c3e0d9d41e381d2). The adapter validates response shape and returns all four model values unchanged. Pair validation owns target, quote and action policy.

## State and proof

- VERIFIED. A fresh checkout of the pushed SHA passed 35 focused pytest cases and 199 total. Integration cases cover target mismatch, unsupported quote, registered quote outside the eligible set, keep mismatch and reject carrying a quote. The public-engine preview wall remains tested.
- VERIFIED. `PairEvaluatorError.kind` distinguishes preflight, transport and parse failures. It subclasses `RuntimeError` so the existing preview catches it and records `pair_review_failed`. Per-kind mention logging would require a caller change.
- VERIFIED. The existing factory injects trusted metadata through a callback. The adapter supplies liquidity from the preview context. Raw X mention text is absent from the request.
- UNKNOWN. Live DeepSeek and live metadata wiring remain unverified.

## Decided

- VERIFIED. HTTP 5xx gets one retry, 429 gets up to three total attempts with bounded waits, and transport errors and timeouts fail immediately. The existing engine, validator and signing guard are outside this patch.

## Next

- INTENT. Connect the trusted metadata provider and exercise the opt-in preview with a live DeepSeek key. Keep signing gated on owner approval and the mainnet evidence already listed in the project handoff.

## Don't

- ⚠️ HIGH-RISK. Keep signing, public X replies, deployment and wallet operations out of preview verification. Treat the mocked test results as offline evidence.
