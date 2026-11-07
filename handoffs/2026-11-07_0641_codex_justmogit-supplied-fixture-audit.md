# JustMogIt supplied 20-case fixture audit

Codex · 2026-11-07 06:41 ET

## Did

- VERIFIED: Audited the supplied `tests/test_mog_it_fixtures.py` against [launch PR #1](https://github.com/0xSneaks/just-mog-it/pull/1) at `94f4ea1d107509359df9604913e92ac9342ab677`. Ran the existing suite in a detached worktree using the branch's required PyYAML dependency. `python -m pytest -q` → `131 passed in 1.36s`. That count covers existing tests only. The first import from the supplied suite failed with `ModuleNotFoundError: No module named 'mogit.constants'`; all seven proposed `mogit.*` imports were absent. No implementation commit or live run.

## State and proof

- VERIFIED: The actual `bot.parse.parse` returned `kind=none` with zero recognized CAs for both supplied example IDs. Both decode to 30 bytes, while Solana public keys require 32. Deterministically encoding 32 fixture bytes (the SHA-256 of a labeled test seed) passed the unchanged parser. Keep the test label in the variable name. Use those keys only with offline fixtures.
- VERIFIED: The relaunch and finality tests feed the SOL sentinel as the original quote and wrapped SOL as the proposed quote, so they test SOL → SOL after normalization. Their reason claims USDC → SOL. Fix the source quote and keep sentinel normalization in a separate fixture. Add an explicit same-quote case with no independent qualifying issue and assert no launch.
- VERIFIED: The relaunch RPC mock returns a signature, status and mint, but supplies no decoded launch instruction or new curve/quote account that can independently substantiate `verified_quote`. Verify both positive and mismatched quote receipts, and assert no reply/mapping on mismatch. Decide and test behavior for both confirmed and finalized commitment.
- VERIFIED: The SDK parity test compares one hand-authored list with another. Pump's official IDL defines QuoteControl rows as mint plus reserves, without issuer metadata, and BondingCurve lacks a base-mint field. Use pinned real account bytes and expected values produced by the actual SDK on those same bytes. Derive the curve PDA from the original mint. For a canonical PumpSwap pool, validate program, creator/PDA and both exact mints. Validate original pool identity independently of whether its old quote is eligible for new launches. [Pump IDL](https://github.com/pump-fun/pump-public-docs/blob/639b87f/idl/pump.json)
- VERIFIED: The proposed standalone caller takes no mention ID and the reply mock accepts only text. PR #1's `Engine.ingest(m)` already has the mention ID and `a.x.reply(tweet_id, ...)` threads replies. Exercise that entry point for the regression against the old non-SOL rule. A fake that bypasses it cannot establish integration.
- INFERENCE: A reserve count alone cannot prove USD executable liquidity. Use quote units/decimals and time-aligned price input for reserves. Executable PumpSwap liquidity requires a defined trade-size/slippage measure. Distinguish zero from missing. Keep listing provider separate from issuer, and venue eligibility separate from classification. For the ask fixture use Backpack Securities as issuer and Sunrise as provider.

## Decided

- INTENT recommended: Preserve the prior one Python registry reader, SQLite operator queue and venue-specific policy. Extend the launch-bot path under `bot/` instead of duplicating it under `mogit/`. Use the existing mention, store, and reply interfaces. Keep proposed pair-decider outputs limited to the four fields and keep side effects in the caller.
- INTENT recommended: Run new tests offline with mocked outbound adapters. Start with real parser coverage, deterministic policy tests and dry-run engine integration. Calibrate floors from observed data before any live approval.

## Next

- Revise the supplied suite using the findings above before adopting it as acceptance. Then run the corrected tests on the implementation commit and attach actual output. Require independent launch receipt proof before any X success reply. Mainnet and production remain subject to owner approval.

## Don't

- Do not weaken the parser, claim fake SDK equality is parity, infer a verified quote from a status string, or treat the 131-test baseline as a pass for the supplied suite.
