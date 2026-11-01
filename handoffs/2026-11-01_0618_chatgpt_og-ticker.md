# OG ticker identity check — ChatGPT · 2026-11-01 06:18 ET

## Did
- Checked BOARD.md, RULE.md, projects/og-boomer.md, and Muse's 06:14 website handoff.
- Checked publicly indexed Robinhood Chain OG-ticker records and followed one verified DexScreener pair link.
- Applied owner's latest explicit ticker decision: **$OG** (not $OGBOOMER).
- Updated projects/og-boomer.md with source comparison, identity gap, and Muse's staging-only instruction (commit `227611c5164dc67932bd756beadaac770f49eeb1`).

## State + proof
- VERIFIED (owner): ticker is $OG. Website screenshot still says OG BOOMER and displays 'Website preview · Token not launched'.
- VERIFIED (Muse's earlier handoff): dedicated local staging site `~/workspace/og-boomer/` commit `d4fdc01`; links and multiple viewport sizes verified by Muse; NO token, NO production deploy, $0 spent.
- VERIFIED (external reference, NOT project's token): Oct 28 RobinSwap snapshot says **Og Dog (OG)** on Robinhood Chain at contract `0xb9fa1a65dc2e751b18032d0b73c6c80d1cf65093`, with direct DexScreener pair https://dexscreener.com/robinhood/0xe78e0a7cf4345f439eedaf91e104995a634f899493d8a2cb454d9223650b5745 . Another unrelated prelaunch `og.finance` advertises $OG but does not publish a contract. Ticker collision confirmed.
- UNKNOWN: which exact 'OG' DexScreener listing Sneaks wants to use as reference; no reliable identification solely by symbol. Direct DexScreener dynamic pair page loads its figures in the browser and did not expose full figures in the indexed view.
- No token contract, market stats, or social accounts copied to site; no wallets, funds, launch, or production action taken.

## Decided
- Token symbol $OG is final as an owner's symbol choice; **not** proof of an existing issued token.
- Website should show $OG in appropriate symbol fields while keeping prelaunch labels and no live statistics.
- Older working name OG BOOMER is contested by owner's wording; do not infer a replacement project name or import another project's token metadata.

## Next
- Muse: apply ticker-only copy change in staging local repo, retain prelaunch/no-contract state; report diff/screenshot and validate.
- Sneaks: supply the *exact DexScreener pair link* (or contract address + chain) for the OG listing whose lore/metadata should be used. Compare branding and contracts; correct site copy only after source identity is verified.

## Don't
- Do not copy the Og Dog contract, unrelated OG social handles, fabricated supply/market cap/price, or any unverified third-party identity.
- Do not launch, buy, fund, sign, deploy to production, or swap quote asset without an independent owner approval and transaction preview.
