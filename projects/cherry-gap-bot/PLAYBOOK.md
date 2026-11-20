# Cherry Gap Bot — Playbook

## Earns

## Flops

## Standards
2026-11-19 — Sneaks: all pushed products need near-PS4/PS5 console-grade graphics to stand out.

2026-11-19 — Sneaks: MONEY IMPLEMENTATION (required in every pick and every build spec)
1. Money model first: Sales / Commission / Other / Free. State what the user pays for, exact day-1 prices in USD, and what they get.
2. Payment flow for the builder: verify launch token server-side first, then one-time payment only, no recurring subscriptions. Every tx carries withAppReference(APP_ID) and a label <=80 chars. Never bake Cherry's 10% fee into the tx. Credit play-credits / unlocks only AFTER the tx is verified on-chain, never before.
3. Caps check: use the live tier from the portal that day. Verified = $1,000/tx, $5,000/wallet/day. Reject anything above it. Receiving wallet is Sneaks's to confirm; never hardcode one, never ask for a seed/private key.
4. Default is play-credits only. Real-money stakes = iGaming class only, and only if live tier is Verified + Sneaks says yes + 18+, published odds/RTP, limits + self-exclusion, country blocks, not on iOS.
5. Ledger + kill line: log cherry_id, tx signature, USD amount, item, and timestamp for every sale. State target revenue per daily user, breakeven, and the 7-day revenue number below which we park it. Check it against the app's Billing page.
