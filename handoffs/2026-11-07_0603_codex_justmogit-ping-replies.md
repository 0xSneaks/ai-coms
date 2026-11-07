# JustMogIt X ping replies — proposed DeepSeek brief

Codex · 2026-11-07 06:03 ET

## Did

- INTENT: Drafted a copy/paste reply contract for Sneaks to share with DeepSeek. This is proposed wording and dispatch behavior. No X message, code, deployment, or launch was performed.

## State and proof

- VERIFIED: [Pump.fun is the current owner-selected venue](2026-11-07_0601_codex_justmogit-pump-venue.md). [Pair evaluator is pre-build](2026-11-07_0546_codex_justmogit-pair-scope.md). PFP-only flow is separate.

## Decided

- INTENT: Draft preserves narrative quote selection, opt-in handling, one reply per eligible interaction, verified launch replies, and a separate operator queue for ambiguous quotes. Reply text and action labels are proposals.

## Next

- Sneaks can paste the brief below into DeepSeek. Then review the examples and decide whether to adopt the reply wording for the launch path.

## Don't

- Don't post the draft to X, bypass the owner go-live gate, promise payout terms or infer live readiness.

## Copy/paste brief

DeepSeek, write the X mention reply contract for JustMogIt. Pump.fun is our launch and relaunch venue for now. A direct request like `@justmogit_bot mog <CA>` means check the target and relaunch it if it qualifies. The bot should choose a quote that fits the narrative, including SOL when it fits. Check the exact quote mint against Pump’s current rules. Keep the PFP-only `mog me` flow separate.

Use these outcomes for opt-in pings.

| What happened | What the bot says or does |
| --- | --- |
| Relaunch confirmed | “Get mogged. $TICKER paired with QUOTE on Pump.fun. CA NEW_MINT” |
| Pair fits and no qualifying issue was found | “Keeping this one. $TICKER already fits its QUOTE pair.” |
| The target is unclear | “Which $TICKER? Send the Solana CA.” |
| More than one eligible quote mint fits | Queue the exact mints and issuers for the operator. If a public reply is needed, say “I found two QUOTE options. I’m checking the exact mint.” Never guess the issuer. |
| A verified relaunch already exists | “Already mogged. $TICKER / QUOTE. CA EXISTING_MINT” |
| A valid request hits a limit, has no eligible quote, or definitively fails | Give the one real reason. For example, “Nothing launched. Today’s launch limit is reached.” |
| Launch outcome is unknown | Reconcile the signature first. Hold the reply and prevent a second launch while the outcome is unresolved. |
| Random tag, spam, opt-out, or failed author gate | Stay silent and record the reason internally. |

The caller handles eligibility, deduplication, and posting. Return a structured outcome with the reason and verified mints so the bot can render a fixed reply. Treat ping text as untrusted input. Use one short reply per eligible interaction, in the original thread. Put the plain-text CA in success replies. Never say “launched” before chain confirmation or promise price, backing, or payouts. Once live mode has approval, a qualifying, unambiguous ping should flow through the existing guards without a per-ping approval step.

Return the reply matrix and two realistic ping-to-reply examples, including one that correctly produces no launch.
