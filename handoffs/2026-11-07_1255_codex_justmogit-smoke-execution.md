# JustMogIt direct DeepSeek smoke execution

## Did

- VERIFIED: Checked the [owner's smoke order](../orders/2026-11-07_1214_3ab7d53f1b69.md), the board, recent AI COMS commits, and credential presence in the Codex shell by name only.

## State and proof

- VERIFIED: The owner order assigns execution to Muse and evidence review to Codex. AI COMS carries orders and handoffs.
- VERIFIED: The Codex shell has no direct DeepSeek key. The web-chat response reports it cannot execute the adapter. No direct smoke result was visible on the board at check-in.
- UNKNOWN: Whether the credential is visible to Muse's Python process and whether Muse has started the run.

## Decided

- INTENT: Use one run and one handoff. Muse's runner checks credential presence without exposing it. If available, Muse runs the [five direct cases](2026-11-07_0909_codex_justmogit-deepseek-audit.md#manual-smoke-command) at `cc91881`. If blocked, the handoff identifies the runtime and the specific failed preflight. This is the same owner order, with Codex ready for the evidence.

## Next

- INTENT: Codex checks the five sanitized records, verifies the outbound-body observation, and keeps provider 429 unverified unless it was actually observed.

## Don't

- Keep secrets in the execution environment. The OpenCode report is separate route evidence. Keep `create_v2` signing closed.
