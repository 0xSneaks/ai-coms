# Fix request — Antigravity CHANGES verdict (codex to fix)

**To:** codex
**From:** muse, on Sneaks's order — "tell codex to just fix it"
**Date:** 2026-11-20 ~07:48 ET
**Verdict being fixed:** CHANGES, your handoff
`handoffs/2026-11-20_0744_codex_cherry-antigravity.md` (PR #1, head `6ae19fcb`).
**Gate (unchanged):** no publish, no merge, no live payments until the fix is re-reviewed
and approved.

## The job

Fix all five findings below, on branch `grok/antigravity-v1` (same PR #1), with tests.
Commit and push to that branch. Then report the new head SHA, what changed per finding,
and the non-live evidence (test output) for independent re-review.

### 1. Durable payment recovery (High)

A submitted payment can go uncredited and the UI can ask for another signature. Fix:
persist the order and the submitted signature; disable resubmission while signing or
pending; reconcile the same signature across retries and restarts; resume confirmation
after a reload; enforce the 10-minute quote window against the transaction's block time
(not the confirmation request time); credit each payment exactly once.
Refs: `web/src/App.tsx#L237` (client confirmation), `web/src/App.tsx#L645` (pay action),
`api/passes.py#L132` (server expiry).

### 2. Atomic order settlement (High)

Bind the payer at order creation and use that binding for both the client transaction and
reconciliation (a wallet change must not strand a valid payment). One active or pending
purchase. Settle valid in-flight payments and compute the entitlement extension in the
same database transaction as the sale. Order replacement must not leave a cancelled state
that confirmation ignores. Duplicate confirms return the original receipt. A second
payment for one order is reconciled or refunded — prove it.
Refs: `api/passes.py#L91` (order creation), `api/passes.py#L146` (entitlement),
`api/store.py#L243` (sales transaction).

### 3. Token accounts and rent (High)

Check the exact source and destination ATAs and spendable USDC (the presence check
currently counts any merchant USDC account while the tx targets the canonical ATA).
Pre-create the merchant ATA before launch. Disclose any SOL cost the buyer can incur
(ATA creation rent) on the review screen, which currently lists only USDC. A missing
buyer ATA cannot fund the transfer — handle it. Require the canonical merchant ATA
during verification.
Refs: `api/rpc.py#L48`, `web/src/pay/buildPassTransaction.ts#L47`,
`api/verify_pass.py#L154`.

### 4. Geo — trusted source, fail closed (High)

Use a trusted deployment geo provider; validate country and subdivision where required;
fail closed on incomplete or malformed location (nonempty partial/malformed geo must not
be treated as known); expire sessions with a clear re-authentication path. Confirm the
actual listing and in-app restrictions against Cherry policy (whole-subdivision matching
overblocks the occupied-area list).
Refs: `api/geo.py#L73`, `api/sessions.py#L24`, Cherry policy
`https://portal.cherry.fun/llms-full.txt`.

### 5. Durable ledger + whale view (release verification)

The sales database defaults to a local SQLite file (`api/settings.py#L76`). Prove that
pending orders, receipts and entitlements survive a Railway redeploy — confirm the
Railway mount/backup, or move the ledger to durable storage. For the per-wallet whale
view (`api/views.py#L200`): no written Cherry clearance exists, so ship aggregate
metrics only — no wallet-level list, even under codenames.

## Tests

Add coverage for delayed finality, connection loss / reload, duplicate confirmation,
wallet changes, concurrent renewals, and unavailable token accounts. Keep the existing
suite green (65 Python tests, 4 web tests, copy lint, TypeScript, Vite build).

## Don't

Publish, merge, sign, broadcast, or accept live payments on this fix. No secrets in
chat or the board. Report back with the new head SHA + evidence; re-review happens
before any publish.
