# JustMogIt pair decision scope and prerequisites

Codex · 2026-11-07 05:46 ET

## Did

- VERIFIED: [PR #2](https://github.com/0xSneaks/just-mog-it/pull/2) merged the PFP bot. The 69 passes comprised 67 existing tests and two PFP tests. No `mogit/pair.py`, `tests/test_pair_decision.py`, `evaluate_pair_decision` or `PairDecision` on main at `21ce5df`; the symbol search also found no implementation on the [launch-bot PR #1 branch](https://github.com/0xSneaks/just-mog-it/pull/1). Its `bot/run.py` uses a SOL-only probe and its X adapter currently requests author usernames without the new gate fields. The DeepSeek draft contract was supplied as an excerpt; its full handoff and exact decision matrix were not independently located.

## State and proof

- VERIFIED docs: X mentions supports `expansions=author_id` and `user.fields=verified_type,public_metrics`. Read `public_metrics.followers_count`. X's government check is gray. Blue can be paid, so an eligible blue badge does not imply legacy or identity verification. No live provider payload or deployed credentials checked. [Mentions](https://docs.x.com/x-api/users/get-mentions) · [Badge meanings](https://help.x.com/en/using-x/x-premium-faq)
- VERIFIED math: 10,000 billable mention posts/day × 30 days × $0.001 = $300/month at eligible Owned Reads pricing. $10 covers 10,000 resources total at that rate. Standard post reads at $0.005 would be $1,500/month for the same volume. Budget billable author expansions and referenced posts separately and confirm actual billing with the production app's auth path. [X API pricing](https://docs.x.com/x-api/getting-started/pricing)
- UNKNOWN: Pair-specific exception contract and acceptance tests are absent. No live X, Gemini or DeepSeek smoke verification was done in this review.

## Decided

- INFERENCE: Put the evaluator in a standalone pair module and call it from the launch-bot path in PR #1, with no separate service required by this design. Gate in the launch mention handler before pair/dossier I/O; use a separate typed error boundary around evaluator calls. The PFP handler is an independent surface.
- INTENT proposed: Eligible verified types are `blue`, `business`, `government`, with `followers_count >= 60`. Including government includes gray. Including blue includes eligible paid Blue. Missing, malformed or unknown gate fields skip closed with `AUTHOR-GATE-SKIP` and a reason counter. Provider and owner confirmation pending; do not fall back to `verified: bool`. Pair failures use `PAIR-DECISION-FAIL`.
- INTENT proposed: Allowed output is a per-request enum of validated candidate quote mints plus SOL when eligible. Revalidate server-side before accepting a candidate. This follows the [owner's no-preset-map ruling](2026-11-07_0315_claude-code_justmogit-bot-narrative-pair.md). Pin mandatory metadata and thresholds first. Missing required data invalidates that candidate and does not imply a rug or a wrong pair. The recorded handoff names Gemini for ranking; the supplied draft names DeepSeek. Provider choice remains to be reconciled.

## Next

- Capture a redacted read-only author payload through the actual X adapter and confirm type values, eligibility and missing-field policy. Pin the minimum metadata, allowed candidate shape, decision and failure matrix, and evaluator provider before code.
- Add the handoff's seven-or-more tests covering the three decisions and the four failure modes, with explicit cases for 429, 5xx, timeout and malformed JSON. Verify one live call against the selected provider and exercise failures through controlled injection. Keep failure paths from triggering a launch.

## Don't

- Do not infer pair completion from PR #2 or its pytest count. Do not route this through `mogit/pfp.py` or its listener. Do not ship a free-text pair selector, silently swap providers, or change live auth or execution in this audit.
