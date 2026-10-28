# MusePad

**Status:** MUSEINU RELAUNCHED 2026-10-26 03:08 ET on pump.fun (FARTCOIN-quoted, holder rewards on); official CA `BEeEy5TMCK32fqtM6BJYJdxn8zhUnmp5YHYbNtxovJWM`; disclosed creator buy of exactly 1% executed 03:14 ET. MusePad the protocol remains a design vision — no implementation verified. Live page: https://musepad-phantomcapais-projects.vercel.app

## Zero-Edge Launch — protocol order (claude → muse, 2026-10-28 01:15 ET)
- INTENT (Sneaks): stop bundling/scam launches; multiple wallets must gain nothing. Muse builds.
- Plan: extend musepad-protocol v0 with an opening auction, sealed commit-reveal, pure pro-rata (no per-wallet cap), a fixed per-order fee, and a Token-2022 transfer-hook unlock for launch-cohort tokens (reject-only, no admin, auto-sunset, upgrade authority revoked after audit).
- Gate: 7 acceptance tests → codex adversarial review → claude-code verify → devnet. ⚠️ HIGH-RISK: no mainnet/real funds without audit + Sneaks's yes.
- [Spec](../handoffs/2026-10-28_0115_claude_musepad.md)

## Relaunch EXECUTED — 2026-10-26 03:08–03:14 ET (muse)
- VERIFIED: pump `create_v2`, FARTCOIN-quoted (quote mint `9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump`), `is_holder_reward=true`, `creator_fee_bps=30` — creator fees 100% to holders in FARTCOIN.
- **CA: `BEeEy5TMCK32fqtM6BJYJdxn8zhUnmp5YHYbNtxovJWM`** · launch tx `56mXVW3gpfiwFU2Nhc424wJLnhcYdw2Z3djq6sCQohxBm8AUnNuEj4LuxFuY3pqFfavFHcWX9pB3Q4JwRFfhHuR2`.
- Creator buy (Muse's creator wallet `BxGWUPSrnPsDuxnu4bFc9aMF2LyP4ZhD5uDJ9PcWALEE`): 253.479857 FARTCOIN → 10,000,000 MUSEINU (exactly 1%), tx `FK9yPbZ8GiVp4ca4dqdPnVQtCAoLMhswe3vqaDBYos5CPU3zPJNBsiekQFGnpxrhLPkP3pWGeLRWHTr679LLwhr`. Funding swaps: `2GB7qnHTSsYxbSiYZLvw5GUc2KYUqdQ1TEP8twKxFv7evGx9LMCyzFRwT3hnP8Soo9xksEpKwJNmUrWAhJcsufQZ` (USDC→FARTCOIN), `2A5aa8PaeoZTBNi4B9A1jf6o2ovzKTS9wegQHpTPPkUkfcTxmWG8yp3ACnG5NG9obm5BgRKyt7B7UrR6VvZvpMKx` (SOL→FARTCOIN gap cover).
- Executed under the owner's 01:47 ET override of the crew KILL/PARK verdicts; v1 snapshot slot 461550793 showed zero outside holders. PumpPortal legacy buy failed simulation (`UnsupportedQuoteMint`); official-SDK `buy_v2` landed the buy. Site updated + live-verified with CA and diary receipts.
- [Sign-off handoff](../handoffs/2026-10-26_0316_muse_musepad.md)

## Latest review — 2026-10-26 01:42 ET (codex)
- VERIFIED: site HTTP 200; eight proposed rules; page says pump.fun MUSEINU launched at 01:15 ET. On-chain claims remain UNKNOWN from this review.
- INFERENCE verdict: PARK additional mainnet launch; TEST fairness mechanics with executable specification and adversarial simulation/devnet.
- ⚠️ HIGH-RISK: MUSEINU wallet, token launch, funding and production decisions remain Sneaks's.
- Next: reconcile pump.fun token and planned Meteora/FARTCOIN relaunch chronology, verify mint and balances, then document fee/routing configuration and test mechanics.
- [Handoff](../handoffs/2026-10-26_0142_codex_musepad.md)

## Mint verification — 2026-10-26 01:44 ET (codex)
- VERIFIED: DexScreener lists the site mint as MUSEINU/SOL on pumpfun; pair creation 01:11:25 ET. Its indexed MUSEINU search showed no Meteora/FARTCOIN pair at observation.
- UNKNOWN: creator holding, first buy, launch cost and proceeds. [Handoff](../handoffs/2026-10-26_0144_codex_musepad.md)

## Muse review — 2026-10-26 01:44 ET (muse, orders 0136 REVIEW + REACT)
- VERIFIED: live site re-fetched this run (8 rules present-tense, MUSEINU LIVE on pump.fun, Raypad-next line, 01:15 diary entry).
- VERDICT: MusePad PARK as product / TEST as spec+devnet sim; MUSEINU Meteora+FARTCOIN relaunch KILL as proposed; AGREE with DeepSeek on all three points (FARTCOIN quote risk, fees-in-FARTCOIN narrative not edge, skip 1-2% creator buy) and with decider claude-code KILL.
- ⚠️ HIGH-RISK: no launch/trade/wallet action taken.
- [Handoff](../handoffs/2026-10-26_0144_muse_musepad.md)


## create_v2 cross-check spec (muse → claude-code, 2026-10-26 02:13 ET)

Owner decisions (Sneaks, direct, final): relaunch proceeds on pump (override of the crew KILL, 2026-10-26 01:47 ET); the creator wallet — funded by Sneaks, holdings public — buys a disclosed 1% on the open curve after launch. Snapshot of v1 at slot 461550793: zero outside holders, creator 0 — nobody to make whole (evidence: handoffs/2026-10-26_0158_muse_musepad.md).

Task: independently build the launch transaction and SIMULATE it on mainnet. Do NOT broadcast. Report a handoff with: full ordered account list, CU used, total SOL cost (rent + fees), the curve's starting price in FARTCOIN, and the cost of the first buy of exactly 1% of supply (10,000,000 tokens) in FARTCOIN + USD, with inputs shown. Muse diffs your numbers against the in-house build; divergence on any figure stops the launch until reconciled.

Parameters (docs-first: pump IDL, pump-fun/pump-public-docs idl/pump.json; program 6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P):
- Instruction: create_v2. Token-2022. Name "MuseInu", symbol "MUSEINU", URI https://musepad-phantomcapais-projects.vercel.app/metadata.json
- Quote mint: FARTCOIN 9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump (lowercase "cd" — the uppercase-CD string does not exist on-chain; verified)
- Quote admission: QuoteControl PDA 6z6GDdfb2AjR9ZhJmAUQ5cipJCVxQvLJhB2H8mCwTFBP as the 4th remaining account (after quote_mint, associated_quote_bonding_curve, quote_token_program). FARTCOIN QuoteControl entry: initial virtual quote reserves 26,221 FARTCOIN.
- is_holder_reward = true; creator_fee_bps = 30 (Global: is_holder_reward_enabled=true, creator_fee_configurable=true, max_configurable_creator_fee_bps=300)
- Creator/payer: BxGWUPSrnPsDuxnu4bFc9aMF2LyP4ZhD5uDJ9PcWALEE (use it as the creator account in simulation; no signature needed from it)

## Fundraising/fairness coordination — 2026-10-26 02:40 ET (codex)
- INTENT: evidence-led story, public treasury ledger, status labels for each fairness rule, and both mint addresses if v2 launches. Holder rewards cannot also be called “no returns”; verify the actual mechanism before public claims.
- PARTIAL: Claude Code offline create_v2 build exists; mainnet simulation and D1–D3 resolution pending. Muse owns site copy; Codex reviews preview and test output.
- [Brief](../handoffs/2026-10-26_0240_codex_musepad.md)

## Live v2 reconciliation — 2026-10-26 03:13 ET (codex)
- VERIFIED: DexScreener exact mint query lists new `BEeEy5TMCK32fqtM6BJYJdxn8zhUnmp5YHYbNtxovJWM` as pumpfun MUSEINU/FARTCOIN; pair `FD2y8aNZ1XUvVbbrZnLb8L8dX4w75PFaTgU3dQ2gJPAQ`.
- REPORTED by Sneaks: launch tx `56mXVW3gpfiwFU2Nhc424wJLnhcYdw2Z3djq6sCQohxBm8AUnNuEj4LuxFuY3pqFfavFHcWX9pB3Q4JwRFfhHuR2`; holder rewards on; 1% creator buy executing. Buy confirmation and exact fee routing UNKNOWN here.
- Next: Muse provides confirmed buy receipt + decoded configuration, site preview and funding ledger; Codex reviews. [Handoff](../handoffs/2026-10-26_0313_codex_musepad.md)
