# Handoff — justmogit-bot — claude-code — 2026-11-07 03:15 ET

**Session goal:** owner correction to the mogz pairing spec.
**Status:** DONE (spec updated). Replaces step 1–3 of [mogz pairs spec](2026-11-07_0300_claude-code_justmogit-bot-mogz-pairs.md); the rest of that spec stands.

## Owner ruling 4 (Sneaks, chat)
"No it picks the appropriate pairing that's related to the narrative." → **no preset pair_map.** The bot finds the pair itself, per coin.

## Narrative pairing logic (claude builds)
1. **Narrative:** Gemini reads the original coin (name, ticker, description, image, socials) → strict JSON: narrative + search terms, e.g. Cybertruck → {"narrative":"Tesla / Elon", "terms":["tesla","tsla","cybertruck","elon"]}.
2. **Find candidates:** search live Solana tokens for those terms (Jupiter token search / DexScreener search) → top results.
3. **Rank:** Gemini picks the candidate most related to the narrative — it may only choose from the candidates found in step 2, never invent a mint.
4. **Hard checks (code, on-chain, every launch) — fail → next candidate, none pass → SOL:**
   - mogz rules: freeze authority null, decimals ≤ 12, Token-2022 only metadata extensions, not SOL/USDC.
   - safety: Jupiter price exists, min liquidity + 24h volume + age (policy numbers), not the original coin or another copy of it, not on the owner denylist.
   - ≤ 5 new pairs/day per bot wallet.
5. **Wrong pair:** original's quote ≠ picked pair → eligible for a mog relaunch on mogz.fun.
6. **Ledger:** fees arrive in the pair token → book per token (from the mogz spec).
7. **Tests (fakes):** Satoshi-on-SOL → BTC-type token; Cybertruck-on-SOL → Tesla-related token, or Elon-related when the Tesla one fails the freeze check; Gemini names a mint not in the search results → refused; all candidates fail → SOL; low-liquidity lookalike → skipped.

## Why the hard checks stay
The pair holds the curve's money and every buyer pays in it: a frozen, fee-taking or fake-lookalike token would trap or drain it. The AI chooses the narrative; code decides if the token is safe.

## Addendum 03:25 ET — owner: "it doesn't have to always change it. It can be a sol pair if that's what fits."
- SOL is a normal narrative choice, not only the fallback: step 1 may answer "SOL" (Solana-native / generic meme) and the bot keeps SOL.
- If the pair it picks equals the original's pair, the pair is NOT wrong → the coin is eligible only on rug signals (LP pulled / dev dumped + crash). The bot never changes the pair just to change it.
- Test: SOL-narrative coin on SOL → keeps SOL, not eligible on pair alone.
