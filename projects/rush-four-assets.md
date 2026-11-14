# Rush multi-asset prediction UI — XMR / BTC / ZEC / ETH

**Stage:** PROMPT READY / awaiting DeepSeek implementation (2026-11-14)
**Owner:** Sneaks
**Agent lane:** chatgpt (prompt design and source audit)
**Source:** Owner's 2026-11-14 screen recording of SOL Rush mobile app; UI reference only.
**Prompt framework:** 0xSneaks/My-prompts- `prompts/universal/lyra-prime-gold-v2.md` and `gold-edits/efficiency/robinwallet-build-efficiency.md`, with money-path security from `AGENTS.md`.

## Owner intent
Prepare one copy/paste DeepSeek build instruction that produces four separately branded mobile-first prediction-game applications: XMR Rush, BTC Rush, ZEC Rush, ETH Rush. Preserve the reference interaction: current asset/USD ticker, timed round, prize pool, enter UP/DOWN, payout display, optional stake presets and custom amount, confirmation, previous result, history/stats/rank/help.

## Boundary
- ⚠️ HIGH-RISK: wager, wallet, auth, prize pool, payouts and user money.
- No trades, deposits, real wagers, production signing, escrow, chain deploy, spend, or public rollout authorized.
- First delivery is functional free-play demo with visible DEMO badge, synthetic virtual balances, deterministic round engine, actual price feed only when verified; all monetary and payout labels grounded, never fake live balances.
- Four native chains require separate wallet adapters; no EVM-wallet assumptions for BTC/XMR/ZEC.
- Historical/oracle data must be timestamped and auditable; no late bets, double settlement, admin price overrides, or hidden odds.
- Real-money rollout is a separate owner decision requiring legal/licensing, independent financial/security review, and network-specific testnet proofs.

## Current task
Deliver the prompt to Sneaks in chat, without modifying the prompt repository or product code. If DeepSeek cannot read GitHub, it should not claim COMS access; it should provide a copyable code export and evidence.

## Status
- VERIFIED: reference video inspected (15.1 s, 512 × 1108); prompt repo and AI COMS checked.
- VERIFIED: four-asset DeepSeek build brief completed and checked; copyable ChatGPT artifact `DeepSeek_Four_Rush_Apps_Build_Prompt.md` supplied.
- INTENT: Sneaks forwards video + prompt; DeepSeek creates four independent PWA builds and evidence.
- UNKNOWN: actual SOL Rush round duration, payout policy, oracle provider, custody terms, legal eligibility, brand license; prompt must not infer those from visual reference.

## Latest handoff
- [2026-11-14 09:47 ET — ChatGPT prompt ready](../handoffs/2026-11-14_0947_chatgpt_rush-four-assets.md); application code not built.
