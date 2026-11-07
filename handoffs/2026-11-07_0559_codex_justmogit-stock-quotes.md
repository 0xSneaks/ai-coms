# JustMogIt stock quote registry audit

Codex · 2026-11-07 05:59 ET

## Did

- VERIFIED: Read-only Solana mainnet. Decoded the Pump-owned [QuoteControl PDA](https://explorer.solana.com/address/6z6GDdfb2AjR9ZhJmAUQ5cipJCVxQvLJhB2H8mCwTFBP) with the official IDL at finalized slot 466486458 and found 228 distinct rows. Ran `OnlinePumpSdk.fetchSupportedQuoteMints()` from published `@pump-fun/pump-sdk@4.3.1` against finalized mainnet slot 466487151. It returned 230 distinct listed mints via one `getMultipleAccounts` read of Global and QuoteControl: 1 native SOL, 1 Global (USDC), 228 QuoteControl. The SDK's `resolveQuoteMint` separately handles eligible Pump-coin quotes outside the listed registry. These counts are snapshots. [Pump public docs](https://github.com/pump-fun/pump-public-docs) · [SDK package](https://registry.npmjs.org/@pump-fun/pump-sdk/-/pump-sdk-4.3.1.tgz)
- VERIFIED: Pump lists Backed Assets (JE) Limited as the xStocks issuer and distinguishes Backpack Securities as issuer from Sunrise (Wormhole Labs) as listing provider. The docs and live registry differ: PAXG appeared in the public list but was absent in the SDK result, while the issuer-confirmed Backpack NVDA and SPY mints appeared in the SDK result and were absent from the list retrieved. Treat registry membership, public listing, issuer provenance and executable pool status as separate facts. [Pump list](https://pump.fun/docs/custom-pairs) · [Backpack securities directory](https://ui.backpack.exchange/tokenized-stocks/assets)

## State and proof

| Underlying | Mint | Pump listed by SDK | Decimals |
| --- | --- | --- | --- |
| NVIDIA, xStocks | `Xsc9qvGR1efVDFGLrVsmkzv3qi45LTBjeUKSPmx9qEh` | yes | 8 |
| NVIDIA, Backpack | `NVDAVuiB7hwd3m5Wa1JuHNovPaPG6BH1QNztbKFxNjv` | yes | 6 |
| SPY, xStocks | `XsoCS1TfEyfFhfvj8EtZ528L3CaKBDBRqRapnBbDF2W` | yes | 8 |
| SPY, Backpack | `SPYBo66VJPFjh1pXMb9Le53kDYWTK1zzYVDeVRWtsbi` | yes | 6 |
| Tesla, xStocks | `XsDoVfqeBukxuZHWhdvWHBhgEHjGNst4MLodqsJHzoB` | yes | 8 |
| Tesla, Backpack | `TSLAqBbv4CNCnzWFeB7LmydAyEiNMJtve7DYKLpdK4S` | absent | not inspected |

- VERIFIED: A finalized mint read at slot 466486930 showed non-null freeze authority plus Token-2022 extensions including permanent delegate, transfer hook and scaled UI on the five listed stock mints above. Both independently conflict with [Mogz custom-pair requirements](https://mogz.fun/docs/custom-pairs), which require no freeze authority and allow only metadata pointer and token metadata. None of those five qualify for a Mogz custom relaunch under the documented rules. WBTC was listed on Pump and was classic SPL with no freeze authority, but a Mogz quote build, route/liquidity checks and simulation were outside this audit.
- VERIFIED docs: xStocks documents secondary on-chain trading around the clock; Backpack documents the same for its NVDA token. An underlying session being closed is a reference-price and liquidity signal, separate from mint pause, trading halt or redemption status. [xStocks FAQ](https://docs.xstocks.fi/docs/frequently-asked-questions) · [Backpack NVDA](https://learn.backpack.exchange/blog/tokenized-nvidia-nvda)

## Decided

- INFERENCE: Add optional `quote_class`, `issuer` and `listing_provider` to the pair design now. Keep SDK source values `sol|global|quoteControl|pumpCoin` unchanged. Classify unknown assets as unknown. Verify the exact mint, token program and decimals at runtime. For scaled UI tokens, explicitly match price units to amount units and use raw amounts for instruction construction. [xStocks multiplier guide](https://docs.xstocks.fi/developers/multipliers)
- INFERENCE: Share pair selection across venues with venue-specific eligibility and execution checks. Pump discovery describes originals. The [owner's relaunch venue is Mogz](2026-11-07_0315_claude-code_justmogit-bot-narrative-pair.md). Only pass Mogz-eligible mints to the relaunch selector. Use a separate advisory `underlying_market_closed` signal with a verified calendar; record actual transfer, redemption and liquidity conditions separately. Block an ineligible or paused quote before operator confirmation.
- INFERENCE: For multiple eligible same-underlying candidates, show the issuer, provider, exact mint and venue. Scope any operator preference to narrative and venue, with fresh eligibility checks on reuse. Underlying exposure is a property of the quote asset. Pairing does not give the meme token collateral, share rights or issuer endorsement.

## Next

- INTENT: Carry these facts into the pre-build pair contract. Add fixtures for NVIDIA and SPY issuer ambiguity, unequal mint decimals and scaled UI, underlying closed with token trading available, and Pump registration with Mogz rejection. Then validate the selected venue's unsigned build/simulation path before launch work.

## Don't

- Do not hardcode a count or label every Sunrise-listed asset a Backpack security. Do not claim that any particular meme pool is live without its exact base mint, pool or trade evidence. No program code, transactions, deployment or provider/auth changes in this audit.
