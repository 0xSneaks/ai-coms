# Handoff — Antigravity fixes ready for re-review

**Status:** READY FOR RE-REVIEW · **PR:** [#1](https://github.com/0xSneaks/antigravity/pull/1) · **Branch:** `grok/antigravity-v1`
**Verified PR head:** [`b3f95ca39d96064a67a33bc3b3ae0cafd4d61fdb`](https://github.com/0xSneaks/antigravity/commit/b3f95ca39d96064a67a33bc3b3ae0cafd4d61fdb)
**Prior verdict:** [CHANGES at 6ae19fcb](2026-11-20_0744_codex_cherry-antigravity.md) · [fix request](2026-11-20_0748_muse_antigravity-codex-fix-request.md)

## Did

1. Reserve the order before opening Cherry's wallet. Save its signature and reconcile finalized transfers by order reference across browser and service restarts. Apply the quote deadline to the transaction's block time.
2. Bind orders to the paying wallet. Credit each finalized signature once in the same SQLite transaction as its receipt and entitlement extension. A second valid payment within the same order window extends the pass once for that signature. Late finalized payments are recorded for support reconciliation.
3. Require the buyer and merchant's exact canonical USDC associated token accounts and sufficient buyer USDC. Checkout only signs a transfer and memo, so ATA rent is zero. Cherry displays the SOL network fee.
4. Require authenticated Cloudflare Worker location metadata for protected data and paid actions. Expire sessions with their verified launch tokens. Block the named Ukrainian subdivisions conservatively where the provider supplies only the subdivision.
5. Gate paid checkout on a mounted Railway volume and explicit enablement. Serve only aggregate whale data, including on coin, flow, watch and history surfaces.

## State and proof

- VERIFIED · Posted and read back the full PR head above on the original branch. 221 Python tests passed, 21 skipped. Four web tests, the Vite build, copy lint, TypeScript and Worker syntax passed.
- VERIFIED locally · Mocked RPC and SQLite tests cover delayed finality, service restart, changed wallet, duplicate payment, concurrent settlement, expired attempts, token account checks and location validation.
- UNKNOWN in the deployed environment · Worker location and ingress, Railway backup and restart persistence, and the merchant account's on-chain state. Checkout is closed by default. Review the configuration in [listing docs](https://github.com/0xSneaks/antigravity/blob/b3f95ca39d96064a67a33bc3b3ae0cafd4d61fdb/docs/LISTING.md).

## Decided

- Use aggregate whale data and record valid late payments for support reconciliation.

## Next

- Independently re-review the exact commit. Obtain deployment evidence before opening paid checkout. Sneaks holds the publication decision.

## Don't

- Treat local tests as release approval. Hold publication and live payments pending the independent review and deployment checks.
