# Kalshi — shard-fix re-check + proposed autonomy change (muse → claude)

Filed 2026-10-29 ~18:52 ET by muse. Two asks, both funds-path. Sneaks noted you are available now, so this comes to you directly instead of waiting for Claude Code's Saturday reset.

## Ask 1 — re-check the shard-aware fix (built, pushed, NOT merged)

- Repo **0xSneaks/kalshi-trader**, branch **`muse/shard-aware-fix`**, commit **`b1a721557131af0038271941a748d51038d2e0fc`**, parent = main `46dc2388`.
- Why: the first live order (BTC, shard 2) was rejected `insufficient_shard_balance` — all $25 sat on shard 0 and API orders do not auto-transfer between shards (the app does). A one-off $10 transfer shard 0 → 2 was executed with Sneaks's approval and verified complete (balances now 15.00 / 10.00).
- What the fix does: preview performs read-only funding lookups (market `exchange_index` + balance breakdown) and discloses any needed intra-account transfer on the preview card (`shard`, `shard_transfer`, `shard_disclosure`); the canonical shard plan is bound into the preview hash, so the Ed25519 approval signature authorizes exactly that transfer (source shard, amount in centicents, existence); execution re-derives the plan from fresh reads and refuses if it changed, then runs transfer → poll-to-complete → STOP re-check → order. Transfer failure/timeout ⇒ the order never fires. New: `kalshi_trader/shards.py`, client transfer/history/exchange-status methods, CLI `exchange-status` + `transfers` read-only commands.
- Proof: full suite **139 passed** (108 pre-existing + 31 new in `tests/test_shards.py`), re-run independently by muse after the build (2.64s, all green). Tests cover endpoint wire shapes, fail-closed breakdown parsing, plan math (rounds up to the centicent), hash binding (a signature over a plan-less hash cannot authorize a planned execution; a changed plan invalidates it), and CLI flows: transfer-then-order call order is exactly `[transfer, order]`; transfer failure and never-completing transfer both block the order.
- Flags for your review: (1) the single-use approval is consumed before the transfer runs — a failed transfer burns the approval; retry needs a fresh preview + fresh tap. (2) coms-pwa's approve page should surface the card's `shard_disclosure` text at tap time (outside this repo). (3) A preview built while funding reads are down is issued plan-less (`shard_check: unavailable`) and can never execute — fail-closed by design.
- Ask: adversarial re-check, verdict **PASS / FIX-FIRST** on the branch. Nothing merges to main and no live order uses the new path until your verdict + Sneaks's word.

## Ask 2 — Sneaks proposes dropping per-trade Face ID for confident trades

- Sneaks, 2026-10-29 ~18:49 ET: "I don't think my Face ID is needed to be honest if you can just make the trade with confidence."
- Context: the G3 Face ID gate was his own 12:22 ET decision today, after your FIX-FIRST finding that an operator-visible token let the operator self-approve. This proposal knowingly relaxes that, scoped by the existing hard caps — it is his account and his rule to change; muse has NOT implemented anything and the current flow is unchanged until he confirms the scope and you review.
- Proposed scoped design (for your adversarial review, not yet built): an owner-enabled autonomous mode in which muse may execute a prod order without the Face ID signature ONLY IF all of these hold: (a) existing caps unchanged — $25/order, 3 open max, $25/day, STOP hard-freeze unchanged; (b) the trade follows the news-first rule (current news checked and cited in the preview/audit record); (c) muse records a stated edge + confidence in the audit log before the send; (d) every autonomous trade is reported to Sneaks immediately with fill/cost/balance; (e) the mode is a repo-config flag only Sneaks flips, never operator-writable config (same G3c treatment as `live_enabled`); (f) any trade muse is not confident in still goes through the Face ID flow.
- Ask: review the concept — what breaks, what guardrail is missing, is the audit trail sufficient, PASS / FIX-FIRST / KILL with reasons. Muse puts the same scope to Sneaks for his explicit confirmation in chat; implementation waits for both.

## State notes

- Balances: $25.00 total (shard 0 $15.00, shard 2 $10.00). No open orders, no positions. First end-to-end approval flow worked; the only rejection was the shard balance above.
- VIP60 window closes Nov 2 23:59 UTC ($25 in qualifying trades; promo attachment itself still unconfirmed).

Coms: signed off → handoffs/2026-10-29_1852_muse_kalshi-shard-fix-and-autonomy.md
