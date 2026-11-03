# AnonPad launch copy — ChatGPT — 2026-11-03 14:54 ET

## Did
- VERIFIED: read `BOARD.md`, `RULE.md`, `STATE.md`, `projects/anonpad.md`, and the owner speed order of 2026-11-03 14:50 ET. Claimed copy-only lane. This handoff answers the ChatGPT assignment in `handoffs/2026-11-03_1452_claude_anonpad-speed-order.md`.
- INTENT: prepared three X posts and one bio for owner approval. **Draft only.** No X post, transaction, site edit, domain change, signing, wallet funding, or launch performed.

## X thread — three posts, DRAFT, do not publish before proof

**1/3**
> Meme coins, paired with Monero.
>
> AnonPad is a mobile-first front end for launching and trading coins against wXMR on Solana, built on mogz.fun's existing Meteora bonding-curve rails.
>
> No AnonPad token. No new chain.
>
> [VERIFIED PUBLIC LINK — only after live QA]

**2/3**
> Connect Phantom or Solflare. Browse wXMR pairs, or bring your own name, ticker and artwork.
>
> You'll need wXMR and some SOL for network costs. Launch and swap buttons stay disabled until the create and buy/sell simulation gates pass independent review.
>
> Watch the contract details and fee destination in your wallet before approving anything.

**3/3**
> The important risk: wXMR is bridged by a single custodial operator. That bridge is a trust dependency. Meme coins can go to zero.
>
> AnonPad is built on mogz.fun, but is not affiliated with mogz. No claim of anonymity or guaranteed privacy.
>
> Check the risks. Verify every signature.

## One-line bio — DRAFT
> Launch and trade wXMR-paired coins on Solana. Built on mogz.fun; independent front end. wXMR uses a custodial bridge.

## State + proof
- VERIFIED: project source of truth: [AnonPad project](../projects/anonpad.md); [speed order](2026-11-03_1452_claude_anonpad-speed-order.md).
- VERIFIED (from Muse's recorded simulation, **not re-run by ChatGPT**): create/upload/cosign path reached simulation, which failed `AccountNotFound`; fee payer had 0 SOL and the XMR DBC config was not initialized on-chain. Zero broadcasts recorded. This is **not** a live launch or passing simulation.
- UNKNOWN: working launch/trade, release URL, X posting permissions, final fee mode and first-coin identity. Placeholder above must never go out unchanged.
- VALIDATION: reviewed copy against the owner hard stops and the project risk disclosures. CLI `python3 tools/coms_check.py` not run by this GitHub-connector session; full repository checkout not available.

## Decided
- INTENT: no current-tense claims of live functionality, no invented release URL, no affiliation, no claim of private/untraceable trading.
- CONDITIONAL: owner/Muse may publish only after launch + trade simulations pass, claude-code reviews signing paths, a real public preview is verified, and Sneaks approves the exact public copy.

## Next
1. Muse: verify the working preview and source URL after UI/data/TX integration; include actual preview, simulation logs and independent signing review.
2. ChatGPT: replace the link placeholder and update verbs only once verification is posted; send the final three posts to Sneaks for approval (no auto-post).
3. Muse: record release readiness separately; the draft does not authorize broadcast or spending.

## Don't
- No live broadcast, on-chain launch, wallet funding, purchases, domain, token named AnonPad/$ANON, user tracking, or signing-code edits.
- Do not publish the thread while `AccountNotFound` remains unresolved or label any unsigned/failed simulation as PASS.
