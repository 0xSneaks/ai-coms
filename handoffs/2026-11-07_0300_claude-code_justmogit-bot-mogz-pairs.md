# Handoff — justmogit-bot — claude-code — 2026-11-07 03:00 ET

**Session goal:** Sneaks: "read mogz.fun docs and get to know the pairs" + hand the pairing logic to claude.
**Status:** DONE (docs read, spec below). Supersedes the pump create_v2 part of [ruling 2](2026-11-07_0240_claude-code_justmogit-bot-theme-pair.md).

## Owner ruling 3 (Sneaks, chat)
- @justmogit_bot's own token lives on **pump.fun**.
- **Mogged relaunches go on mogz.fun** ("cheapest route and has multi pairs").
- Pair = the token that fits the coin's theme (Satoshi → BTC, Cybertruck → Tesla …). "The logic just needs to be there."

## mogz.fun facts — VERIFIED from docs (mogz.fun/docs/custom-pairs, /docs/fees, /docs/how-it-works; all "Last updated 14 October 2026")
- Pair options: **SOL, USDC, or any custom mint**. Pair can't be changed later.
- Custom pair checks (mogz rejects otherwise): **no freeze authority**; supply > 0; **≤ 12 decimals**; Token-2022 allowed **only** with metadata-pointer + token-metadata extensions (transfer fee, transfer hook, permanent delegate, default-frozen, anything else → rejected); not SOL/USDC; **max 5 new pairs/day per wallet**.
- Custom curve = USDC curve sized in the pair token: $4,200 start / $61,500 graduation, at Jupiter price (else adder's price, else 1 token = $1). Caps fixed in the pair token after that.
- First coin on a new pair pays the pair's config rent ≈ **0.0082 SOL** once; without a first buy it's one tx.
- Coins on a custom pair: buys/sells in the pair token; network fees in SOL; **trading fees + creator rewards paid in the pair token**; **creator rewards go to the creator only — holder rewards, splits and charity need a SOL or USDC pair**; Mayhem mode needs SOL.
- Fees: create free (network + rent); curve 0.50% (creator 0.30 / mogz 0.10 / Meteora 0.10); **99% fee in the launch block** (anti-sniper); graduation ≈ 84.95 SOL in curve (≈410 SOL mcap) or ≈12,742 USDC; supply 1B, 6 decimals; graduates to Meteora DAMM v2, LP locked forever.
- No public API docs (`/docs/api` → not found). Launch path = the existing mogz adapter work (muse/JustMogIt).

## Pairing logic spec (claude builds; claude-code reviews)
1. **Theme** from name, ticker, description, image: keyword rules first; Gemini may only return a key from `pair_map` (strict JSON). Unsure → default.
2. **`pair_map`** in policy (owner-edited allowlist): theme key → ordered list of candidate mints, e.g.
   - bitcoin/satoshi/btc/sats → [a BTC token] → SOL
   - tesla/cybertruck/elon → [a Tesla token] → [an Elon token] → SOL
   - default → SOL
   Never a mint that isn't in the map.
3. **Pick** the first candidate that passes, checked on-chain at launch time: mogz rules above (freeze authority null, decimals ≤ 12, allowed Token-2022 extensions only) + ours (Jupiter price exists, min liquidity, not on a denylist). Else next candidate, finally SOL.
4. **Wrong pair** (rug.py): original's quote ≠ the picked pair → eligible (replaces "non-SOL = wrong").
5. **Limits:** ≤ 5 new pairs/day per bot wallet (count them); first-on-pair rent 0.0082 SOL inside the 0.025 SOL cost cap.
6. **Money:** fees on a custom pair arrive in the pair token and only to the creator (the bot) → the 25/25/50 split must be booked per token (ledger is lamports-only today) and paid by the bot. SOL/USDC pairs could use mogz's native splits instead.
7. **Tests:** Satoshi-on-SOL → BTC; Cybertruck-on-SOL → Tesla token, and → Elon token when the Tesla token fails the freeze check; candidate with freeze authority / permanent delegate refused; Gemini returns an unlisted mint → refused; 6th new pair in a day → falls back to an existing pair.

## Open (muse — on-chain, read-only)
- Fill `pair_map` with verified mints and run the mogz checks on each. INFERENCE: tokenized stocks (e.g. xStocks TSLAx) are Token-2022 with extra extensions/freeze → likely **rejected by mogz**; if so Cybertruck falls back to an Elon token. Verify, don't assume.

## ⚠️ High-risk
Mainnet launches + new quote tokens: same guardrails (C1+C2, guard pin, caps, kill, dry-run day) and Sneaks's final yes.
