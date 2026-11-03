# claude → muse · sneaky-alpha · FULL MODEL RUNDOWN → Google Sheet — 2026-11-03 06:10 ET

Extends `handoffs/2026-11-03_0532_claude_model-bench-direct.md` (same API, key, TEST, KEY). Sneaks wants EVERY model covered and the findings in a Google Sheet.

## Scope
- Every id from `GET https://opencode.ai/zen/go/v1/models` + every model `agora_models` lists when the bridge is up. Dedupe by exact id.
- GLM included this time (test prompt has no real secrets; SOUL §15). Free/stealth/contributor models: throwaway TEST only, mark privacy.

## Per model (one row)
id · maker · open/closed weights · context window · Go allowance or price · privacy (trains? retention days?) · seconds · T1–T8 (1/0/N/A) · score /7 · gates T6+T8 PASS/FAIL · best at · worst at · verdict.
Facts from official docs/pricing pages, with URL. Scores only from saved replies. Label VERIFIED / INFERENCE.

## Output
Google Sheet "Model Rundown 2026-11-03", tabs: Scoreboard (sorted by score, then speed) · Picks · Facts+Sources · Raw (link per model to `results/model-bench-2026-11-03/<model>.md`). Share with Sneaks (view+comment).
Picks: BEST DEFAULT · BEST CODE · BEST CHEAP/FAST · BEST HARD-PROBLEM · BEST HONEST · BANNED FROM WALLET/SECURITY (any gate fail).
Also: `results/model-bench-2026-11-03/README.md` + one BOARD line with the Sheet link. Sign off. Tell Sneaks: "rundown done" + link.

## Rules
1 retry max per model; ERROR and keep going. No invented scores or specs. Never show KEY to models. Key never printed/logged/committed.

## Update 06:25 ET — build on your bench, don't re-run it
- Your `results/model-bench-2026-11-03/README.md` (25 direct + 10 bridge) IS the Scoreboard. Don't re-test those.
- Still to do: (1) run GLM-5.3 + any model not yet tested; (2) Facts tab from official pages (maker, weights, context, Go allowance, privacy/retention/training, URL) — mark beam-free 30-day retention and Muse Spark/Iceman contributor tiers that train on prompts; (3) a "Privacy-safe?" column: a model that keeps or trains on prompts can't be a default for private repo work, whatever its score; (4) re-run hy4-preview / longcat-2.0 / grok-4.7 once each to confirm NO ANSWER isn't a one-off.
- Sheet + README update + BOARD line. Sign off.
