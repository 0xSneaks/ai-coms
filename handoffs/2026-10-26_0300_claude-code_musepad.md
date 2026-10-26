# MUSEINU create_v2 independent cross-check — claude-code — 2026-10-26 03:00 ET

Assignment: projects/musepad.md "create_v2 cross-check spec" (muse → claude-code, 02:13). Owner plan (Sneaks, final): pump.fun relaunch, FARTCOIN quote, holder rewards on, creator_fee_bps 30, then a disclosed 1% buy. **Nothing was broadcast or signed.**
**Status: PARTIAL.**
- The offline build and the curve math are done.
- **The live mainnet simulation is NOT done.** This cloud session's network policy blocks every Solana RPC and price API (api.mainnet-beta.solana.com, publicnode, ankr, drpc, Helius, Jupiter, DexScreener: all connect-rejected). A Vercel Sandbox was refused with 403 forbidden.
- So CU, rent/total SOL cost and USD are **UNKNOWN from me**.
- I committed a runnable simulation script so it can be run where RPC works.

## 1. Ordered account list (VERIFIED offline: built with @pump-fun/pump-sdk 4.1.0 `createV2Instruction`; mint is a throwaway per run)
| # | Account | Flags |
|---|---|---|
| 0 | mint (new keypair, per run) | signer, writable |
| 1 | mint_authority TSLvdd1pWpHVjahSpsvCXUbgwsL3JAcvokwaKt1eokM | |
| 2 | bonding_curve PDA [bonding-curve, mint] | writable |
| 3 | associated_bonding_curve (MUSEINU ATA of curve, Token-2022) | writable |
| 4 | global 4wTV1YmiEkRvAtNtsSGPtUrqRYQMe5SKy2uB4Jjaxnjf | |
| 5 | user = creator wallet BxGWUPSrnPsDuxnu4bFc9aMF2LyP4ZhD5uDJ9PcWALEE | signer, writable |
| 6 | system 11111111111111111111111111111111 | |
| 7 | token_program Token-2022 TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb | |
| 8 | associated_token_program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL | |
| 9 | mayhem_program MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e | writable |
| 10 | global_params 13ec7XdrjF3h3YcqBTFDSReRcUFwbCnJaAQspM4j6DDJ | |
| 11 | sol_vault BwWK17cbHxwWBKZkUYvzxLcNQ1YVyaFezduWbtm2de6s | writable |
| 12 | mayhem_state PDA [mayhem-state, mint] | writable |
| 13 | mayhem_token_vault (mint ATA of sol_vault) | writable |
| 14 | event_authority Ce6TQqeHC9p8KetsN6JsjHK7UTZk7nasjjnr7XxXp9F1 | |
| 15 | program 6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P | |
| 16 | quote_mint FARTCOIN 9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump | |
| 17 | associated_quote_bonding_curve (FARTCOIN ATA of curve, **under FARTCOIN's token program**) | writable |
| 18 | quote_token_program (**see divergence D1**) | |
| 19 | quote_control 6z6GDdfb2AjR9ZhJmAUQ5cipJCVxQvLJhB2H8mCwTFBP | |

- Data: disc [214,144,76,236,95,139,49,180]. Args: name "MuseInu", symbol "MUSEINU", the URI, creator = BxGW…, is_mayhem_mode false, is_cashback [false], creator_fee_bps 30, is_holder_reward [true].
- 140 data bytes. The legacy tx with a CU-limit instruction is 1,010 / 1,232 bytes.
- Remaining-account layout matches Muse's spec: quote_control at index 3 of the remaining accounts. VERIFIED: SDK doc for QuoteControl-listed mints, "the PDA is always sent".

## 2. Divergences / checks for Muse's diff
- **D1: quote_token_program.**
  - FARTCOIN is an older pump coin. Pump docs: "Token-2022 for coins created with create_v2, SPL Token for older coins". So it is likely the legacy SPL Token program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA (INFERENCE; the script reads it on-chain).
  - This changes accounts #17 and #18. With legacy SPL, #17 is derived under Tokenkeg (6tTav… for my throwaway mint). Using Token-2022 here fails with 6063 UnsupportedQuoteMint.
  - Make sure the in-house build uses the on-chain owner of the FARTCOIN mint.
- **D2: holder rewards means the creator gets NO creator fees.** `is_holder_reward=true` makes the program set the creator to `holderRewardsPda(mint)`. Every creator fee (the 30 bps) goes to holders, permanently. So the creator wallet earns only from its own 1% bag (plus its holder share). VERIFIED from the SDK doc for `holderReward`. **Sneaks should confirm that's intended, given "pay bills".**
- **D3: the 1% is a separate buy after create**, so it's only priced as below if it is the **first** buy. Bots that land earlier push it up. Doing create + buy in one transaction would guarantee it, but that's a dev buy in the launch tx: Sneaks's call against "in the open, after launch".

## 3. Numbers (offline; INFERENCE until the live run)
Inputs:
- vq0 = 26,221 FARTCOIN (QuoteControl entry, per Muse's spec);
- vt0 = 1,073,000,000 MUSEINU (pump Global default `initial_virtual_token_reserves`; **verify on-chain**);
- 1% = 10,000,000 MUSEINU.

Results:
- **Starting price** = vq0 / vt0 = **2.4437e-5 FARTCOIN per MUSEINU**.
- **First buy of exactly 1%, before fees** = vq0·a/(vt0−a) = **246.67 FARTCOIN**. The average price is 1.0094× the start price.
- **With fees**: about **249.75 FARTCOIN** if protocol is 0.95% plus creator 0.30%, or 250.49 at 1.25% plus 0.30%. The live FeeConfig tier decides; the script reads it.
- **USD**: UNKNOWN here (FARTCOIN price unreachable). The value is 246.67–250.49 × the FARTCOIN USD price at buy time.
- **CU / rent / total SOL**: UNKNOWN here.
  - SDK guidance is ~200–240k CU for a token-quoted create; I set the limit to 400k.
  - Rough cost: v1's SOL launch was 0.0066742 SOL (Muse, VERIFIED), plus one extra quote ATA (~0.002 SOL rent). INFERENCE: ≈0.009 SOL plus priority fee. The simulation replaces this.

## 4. How to finish (Muse, on the VM; ~2 min)
`cd ai-coms/projects/musepad-xcheck && npm i && RPC_URL=<your Helius URL> node sim.cjs`
- The script reads Global, FeeConfig, QuoteControl and FARTCOIN's token program on-chain.
- It builds the same create_v2, then runs `simulateTransaction` (sigVerify off, replaceRecentBlockhash). **It never sends.**
- It prints:
  - the ordered accounts;
  - the error (if any) and CU used;
  - rent per new account and the total SOL;
  - the start price;
  - the 1% buy cost with live fees;
  - USD via the Jupiter price API.
- Paste the output in a handoff. If any number differs from the in-house build, the launch stops until reconciled, per the spec.
