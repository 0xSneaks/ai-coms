# JustMogIt pair fixtures and adapter defaults

Codex · 2026-11-07 06:34 ET

## Did

- VERIFIED: Reviewed the supplied simulated fixtures and checked Pump documentation and PR #1 at `94f4ea1`. Recorded proposed defaults only. No bot code, tests, X posts, or transaction writes.

## State and proof

- VERIFIED: Pump's curve state can store the SOL default. A PumpSwap Pool has its own exact base/quote mints and canonical migration authority. Use wrapped SOL in its SOL-quoted pool field. A completed curve is not sufficient proof that a canonical PumpSwap pool exists. Pending migrations and unsupported legacy venues need explicit outcomes. Current `create_v2` creates a Token-2022 base mint. The original mint may be classic SPL. `getAccountInfo(mint)` alone cannot prove the pool, canonical pair or ticker. [Coin creation](https://github.com/pump-fun/pump-public-docs/blob/main/docs/instructions/COIN_CREATION.md) · [Pump migration](https://github.com/pump-fun/pump-public-docs/blob/main/docs/PUMP_PROGRAM_README.md) · [Canonical PumpSwap pools](https://github.com/pump-fun/pump-public-docs/blob/main/docs/PUMP_SWAP_CREATOR_FEE_README.md)
- VERIFIED: The branch already has a Python JSON-RPC adapter and a SQLite store. `bot/rug.py` has a legacy rule marking every non-SOL quote as wrong. The config's 0.5 SOL min pair liquidity value is marked an assumption and is a low-liquidity signal for the original, not an adopted USD gate.
- VERIFIED: The pasted guard test is pseudocode. `raw` is unbound, the patched provider is never called, and the asserted `risk_flags` is outside the four-field evaluator result. The two executable fixture tests were not provided or run. The previous [mint audit](2026-11-07_0626_codex_justmogit-reply-example-audit.md) identified the real SAMO address still reused as MOGE.

## Decided

- INTENT recommended: Keep one Python registry method. Fetch Pump Global plus QuoteControl in one finalized RPC batch and decode against a pinned official IDL. Verify account owner, layout and freshness. Normalize SOL at the curve adapter boundary, then build the listed set from SOL, Global and QuoteControl. Use the official SDK as a parity oracle for captured fixtures. This list does not enumerate eligible unlisted Pump-coin quotes.
- INTENT recommended: Keep `ask` in the existing SQLite store for now. Store mention, target, venue, narrative and exact eligible candidate mints with issuer. Persist the operator decision by narrative, venue and underlying with its approval provenance. Revalidate the mint and current eligibility before resuming, and never update a global ticker alias or a finalized launch mapping from the model response.
- INTENT recommended: Keep independent venue-specific measures for curve reserves and PumpSwap executable liquidity. Leave numeric auto-launch floors unset pending calibration and owner approval. In dry run measure original-side rug evidence separately from selected-quote liquidity or route viability. Unknown or uncalibrated checks cannot authorize an automated relaunch. Low liquidity alone does not prove a rug.
- INTENT recommended: Keep exactly four evaluator fields and use `null` for selected quote on ask/reject. Put validation reasons in caller logs or a separate validation result. Require target equality with the resolved mint and compare normalized mint keys. Replace the blanket non-SOL rule in the new launch path before enabling dynamic quote decisions.

## Next

- Ask DeepSeek for the complete runnable test file using clearly synthetic fixture IDs, a wrapped-SOL PumpSwap fixture, and a separate curve-sentinel fixture. Either pass an explicit raw decision to the validator or execute the mocked evaluator. Include no-pool and base/quote mismatch guards, both reply fixtures and zero chain writes for keep. Test output and commit remain unverified.
- When implementation is authorized, wire this into the launch path behind dry run. Require signed-off thresholds and existing owner live approval before any money moves.

## Don't

- Don't interpret the fixture result as live execution, assume the old 0.5 SOL value is approved, or infer wrong pair from non-SOL alone.
