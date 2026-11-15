# Hundred Markets research — read-only competitor analysis

**Date:** 2026-11-15
**Status:** SIGNED OFF — research only
**Owner:** ChatGPT (research)

## Scope
Hundred Markets (https://www.hundred.markets/) Solana launchpad; economic model, security concerns, relation to PetalDeck/Cherry. No changes to Cherry launch room; do not touch claude-code's lane.

## VERIFIED (from official documents, not independent on-chain verification)
- 100 Metaplex Core NFT shares per coin, each receives 1% of the creator-fee allocation; unminted portions accrue to launcher.
- Documented 2% trade fee: 0.8% of volume creator/share allocation, 0.8% Hundred platform, 0.4% Meteora.
- 2.5% secondary share sale fee, admin can change up to 10%; mint price goes fully to launcher.
- Meteora DBC to DAMM v2 at documented 92 SOL; approx 0.035 SOL account deposits per launch.
- Mainnet program identifier published: GdsnBZC5AYC71eBd4ELED86vo552NPRQqbGtQ6LWbUtN.
- Project expressly discloses no outside audit and single-key upgrade authority not revoked or multisig.
- 57 proof checks and a real-SOL mainnet loop reported by project; independently unverified.
- Docs say public-mainnet graduation remains untested.

## UNKNOWN
Independent security audit, reproducible source/IDL and program verification, team reputation, independent live transactions, volume and traction, regulator characterization.

## Comparison
PetalDeck uses Pump.fun creator fee split 95/5 (user/app), with independent owner-only deployment gates; Hundred uses a Meteora NFT-revenue market and substantial admin/upgrade risk. No suggestion to change PetalDeck architecture yet.

## Decision / Next
TEST concept only, no live trades or integration. If requested next: on-chain verify upgrade authority, inspect program binary/source, fee vault, live txs, and custody; evaluate legal review of revenue-share NFTs.

## 2026-11-15 follow-up — does it work?
- VERIFIED: website loads, project publishes mainnet program identifier, claims real-SOL successful launch/mint/harvest/claim/list/buy cycle, and says 57 test-chain checks passed.
- UNKNOWN: on-chain independent transaction confirmation. Attempted web explorers and public Solana RPC; access unavailable in this environment (browser fetch failed; container DNS blocked). Dynamic coin listings cannot establish activity from static page.
- NO evidence of real public-mainnet graduation, and project expressly says it remains untested.
- Answer: core operation is project-reported, not independently verified. No endorsement of real-money usage.

## 2026-11-15 — Shareable FOMO thesis (copy-only)
- INTENT: present the upside concept without claiming verified traction or guaranteed yield. Key framing: memecoin trading attention creates a fee stream; each Hundred NFT buys 1/100 of creator-fee allocation, subject to actual trading activity.
- DECIDED: Copy must distinguish fees from coin ownership, disclose no audit / single-key upgrade authority and lack of independent on-chain confirmation.
- NEXT: No promotion implying investment certainty; independent verification of program before real money.
