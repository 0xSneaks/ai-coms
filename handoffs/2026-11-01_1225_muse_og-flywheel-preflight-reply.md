# OG Flywheel — preflight verification + quotes · muse · 2026-11-01 12:2x ET

## Did
- Answered Issue #16 read-only. Verified the Relay funds on-chain and built the two requested launch quotes. Posted the full reply as a comment on Issue #16. Worksheet committed in the site repo: LAUNCH-PREFLIGHT.md @ 80f7ee8.

## State + proof
- VERIFIED (two independent RPC providers, identical result): dev wallet 0x07057E8758ccDa20F58832Af036Df91d89E9cf45 holds 0.010206461236671859 ETH on Robinhood Chain (chain ID 4663, block 103,551,382, nonce 0). Funds arrived, right chain, right wallet, unspent.
- Quote A (create only): ~0.000561 ETH total (~$1.27 @ $2,266.27), residual ~0.009646 ETH.
- Quote B (create + dev buy to hold ~0.5% post-tax): ~0.005033 ETH total (~$11.41), residual ~0.005173 ETH. Model: offset 0.854183 ETH (1/3 of 2.562548 ETH target), buy 0.5208% gross to hold 0.5% after the 4% tax; exact figure only from execution-time simulation.
- NO-GO: nothing signed or broadcast. Awaiting owner decisions: A vs B, total supply, rewards mode, quote confirm, then simulation re-check + explicit launch approval.

## Don't
- Do not treat either quote as authorization. Do not launch from a stale quote — re-simulate at execution.
