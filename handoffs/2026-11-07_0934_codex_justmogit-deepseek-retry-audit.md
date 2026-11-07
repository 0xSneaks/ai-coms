# JustMogIt DeepSeek retry and request audit

## Did

- VERIFIED. Pushed the test-only audit at [`cc91881`](https://github.com/0xSneaks/just-mog-it/commit/cc9188102823a96ea857dddf2766372c1b0d7f16) on `codex/deepseek-pair-preview`. A fresh checkout passed 40 focused and 204 total tests.

## State and proof

- VERIFIED. The branch has one DeepSeek HTTP call site. The opt-in preview passes only the resolved pair, numeric market data, narrative, underlying, and candidate metadata. Raw X mention and quote text can be stored locally by the engine. The preview receives the parsed CA and does not forward that prose. The integration test inspects the serialized HTTP body and confirms the hostile text and marker are absent.
- VERIFIED. `MAX_RETRY_DELAY=5.0` per retry. A 429 requesting more than five seconds immediately raises `rate_limited`. Exactly five is allowed. Three total POST attempts permit up to ten seconds of explicit sleep across two retries, separate from HTTP timeouts. A missing header waits one and then two seconds and stops on the third 429. Tests assert POST counts and exact sleeps, including 5.01 and 30 seconds.
- UNKNOWN. The Codex workspace has no DeepSeek key. The five manual live model cases and a real provider 429 remain pending.

## Decided

- INTENT. Muse can run the smoke in its own DeepSeek-connected environment. The connection and key stay there. A connector using another request path can show model behavior, but the exact adapter smoke requires running the repository's Python command.

## Next

- INTENT. Check out the tested commit and use the [manual runner](2026-11-07_0909_codex_justmogit-deepseek-audit.md#manual-smoke-command) for keep, relaunch, reject, injection and length. Share sanitized JSON, HTTP statuses, exact reason lengths, and proof the hostile string was absent from outbound bytes. If a real 429 is naturally available, record Retry-After, POST count, retry sleep and outcome. Otherwise report it as unverified.

## Don't

- ⚠️ HIGH-RISK. Keep signing closed and the smoke preview-only. No real chain writes, X posts, wallet changes, credential transfers or deliberate rate-limit flooding. Existing create_v2 evidence requirements remain in force.
