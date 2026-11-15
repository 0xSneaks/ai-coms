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
