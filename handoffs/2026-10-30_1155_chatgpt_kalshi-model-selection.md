# Kalshi trader — OpenCode model selection (no build executed)
2026-10-30 · chatgpt · ⚠️ HIGH-RISK (trading infrastructure)

## Did
- VERIFIED: AI COMS check-in read BOARD.md, RULE.md, projects/kalshi-trader.md and the latest Kalshi funds-path handoff.
- VERIFIED: Checked OpenCode's current Go model lineup and Console listings from OpenCode documentation.
- INTENT: User interrupted the proposed two-phase implementation and narrowed the task to model selection only. Recommended **GPT 6 Luna** (OpenCode Go model ID `opencode-go/gpt-6-luna`); noted GPT 6 Astra as an optional pay-as-you-go independent reviewer.

## State + proof
- VERIFIED: No repo code changed. No diagnostic network measurements run. No Kalshi order sent. No Phase 2 executor started.
- VERIFIED: Go lineup https://opencode.ai/v2/docs/console/go/ ; Console lineup https://dev.opencode.ai/v2/docs/console/models .
- INFERENCE: GPT 6 Luna is the best pragmatic Go choice for this scoped Python/network task; this is not a task-specific evaluated benchmark.

## Decided
- User's latest request takes precedence: model recommendation only.
- All existing live-trading gates, attestation, STOP, and caps remain untouched.

## Next
- If user re-authorizes actual implementation, start with VM egress Phase 1 diagnosis (five signed GET and harmless POST measurements with curl and Python); do not advance to Phase 2 without evidence.
- Require VM execution access for real timings and tests; GitHub source alone cannot prove them.

## Don't
- Do not send live prod orders, expose credentials, bypass gates, or claim measured latency without VM evidence.
- Do not merge or alter the live trading path without independent review and owner authorization.
