# Moby AI Trading — Fit / Risk Evaluation

**Date:** 2026-11-16 ET
**Owner:** Sneaks
**Lane:** ChatGPT, evaluation only
**Stage:** TEST (read-only/paper evidence), not authorized live
**Sources:** https://moby.win/agents/ · https://moby.win/agents.md · https://moby.win/learn/ai-agent-guardrails/ · https://moby.win/marketplace/ · https://moby.win/

## Question
Is the invited Moby AI Trading offering a useful and safe addition to Muse / Grok WallStreet / AI COMS / Zen-trade?

## Verified observations (2026-11-16)
- Read-only review of a first-party invite email received 2026-11-16; sender-domain DMARC, DKIM and SPF passed in Gmail headers, sending service consistent with AssetDash. **Sender authentication alone does not establish software security**. Do not copy personally identifying message content, invite codes, link tokens, or account identifiers to COMS.
- Moby's official product identifies AssetDash as builder. The Moby AI trading layer supports **Solana-only** execution from a separate, USDC-funded agent wallet; Moby app supports more networks, but agent trading on Base/BNB/Robinhood not launched; no Hyperliquid futures integration evidenced.
- Official docs advertise a revocable Bearer-key MCP, market data (whale/KOL/smart money), orders (buy/sell, TP/SL/DCA), server-side buy guardrails, optional 'Ask before every trade', inability to withdraw/send/transfer via the MCP. One agent wallet per user; potential conflict with token-hive multi-wallet objective.
- Moby quotes **0.75% per swap, $0.90 minimum**, plus onchain costs. $25 buy and sell therefore incurs **minimum $1.80** Moby swap fees (=7.2% of $25 initial notional), before slippage, other fees, price movement. Fee may discourage many small trades.
- Privy describes external audits of its own infrastructure, but that is not independently verified Moby trading/MCP security. No independently verified profitable Moby agent trading performance or specific Moby MCP audit established in this review.
- Moby's marketplace explicitly states third-party skills are curated, not audited, and may be dangerous if granted trading privileges.
- Read-only market intel may overlap but also augment existing Muse / Yolo-crawl / HL Bot v2 signals. Whether incremental accuracy/latency beats current free data sources is **UNKNOWN**, unbenchmarked.
- Docs show optional automatic trading after guardrail setup; *Ask before every trade* is NOT mandatory unless user enables it. A connected agent key has trade tool authority; an instruction to act read-only is not equivalent to hard server-side read-only scoping.

## Recommendation
**TEST intelligence only; NO LIVE FUNDS / NO TRADING KEYS.** Gather 7 days of matched Solana-market snapshots with timestamps, raw signal provenance, token mint, liquidity, concentration, observed outcome, and incremental value versus existing MUSE feeds. Review ToS/rate limits and whether zero-funds/read-only data path is practical. If not, PARK integration.
Do not feed untrusted skill markdown or token metadata directly to agent instructions. Do not share agent API keys, wallet private keys or invite credentials in GitHub/COMS.
No wallet creation, funding, broker connection, agent-key creation, trades, deployment, or spend authorized by this evaluation.

## Next
Muse may review this writeup and propose independent read-only benchmarking; **no authorization to connect the live Moby MCP**. Owner approval plus separate security review needed for any subsequent live trading pilot.

## 2026-11-16 15:36 ET — Evaluation handoff
**SIGNED OFF (ChatGPT / claim released):** Vendor docs and authenticated Gmail invite reviewed; recommendation TEST intelligence in paper mode only, not funds or execution. No actual trading API connected. Sources and guardrails in [handoff](../handoffs/2026-11-16_1536_chatgpt_moby-agent-evaluation.md).
