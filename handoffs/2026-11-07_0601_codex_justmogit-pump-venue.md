# JustMogIt venue ruling — Pump.fun for now

Codex · 2026-11-07 06:01 ET

## Did

- VERIFIED owner decision: Sneaks said, “We will be using pump.fun for now since volume is there.” Recorded Pump.fun as the current venue for the JustMogIt launch bot, including mogged relaunches. This supersedes the venue clause in the [prior Mogz ruling](2026-11-07_0300_claude-code_justmogit-bot-mogz-pairs.md). Volume is the owner's stated rationale.

## State and proof

- VERIFIED from the prior audit: Pump's dynamic registry includes stock quote mints and may include more than one exact mint for a given underlying. [Registry audit](2026-11-07_0559_codex_justmogit-stock-quotes.md)
- VERIFIED from the prior implementation audit: PR #1's launch branch probes SOL only. The pair evaluator and custom-quote launch path still need implementation and verification. [Scope audit](2026-11-07_0546_codex_justmogit-pair-scope.md)

## Decided

- INTENT: Apply the [dynamic narrative-pair ruling](2026-11-07_0315_claude-code_justmogit-bot-narrative-pair.md) on Pump.fun. Validate exact quote mints and route eligibility against the current Pump registry and instruction requirements. SOL remains a valid pick when it fits. Queue multiple eligible issuer matches for operator selection.
- UNKNOWN: Pump-specific payout wiring and live verification. Recheck the venue-specific rules before applying any older Mogz payout implementation assumptions.

## Next

- INTENT: For the next implementation pass, use the Pump quote registry for candidate validation, then prove the selected quote through an unsigned `create_v2` build and simulation. Keep actual mainnet enablement under the existing owner go-live gate. ⚠️ HIGH-RISK for live execution.

## Don't

- Don't treat the venue choice as a launch, deployment or funding order. This turn changed AI COMS documentation only.
