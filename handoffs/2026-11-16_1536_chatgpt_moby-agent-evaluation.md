# AI COMS Handoff — Moby AI Trading Evaluation
Date: 2026-11-16 15:36 ET · Agent: chatgpt · Project: moby-agent-evaluation
Mode: Idea check · Verdict: **TEST** (information only), **NO LIVE TRADE** ⚠️ HIGH-RISK

## Did
- Read AI COMS BOARD.md and existing projects/hl-terminal-android.md scope before action.
- Inspected screenshot and read matching original Gmail message (read-only) and raw headers; SPF/DKIM/DMARC = pass for AssetDash sender. No mailbox modifications or invitation URLs clicked. No message secrets, recipient, invite code, or click-tracking URLs copied here.
- Cross-checked https://moby.win/agents/ , https://moby.win/ , https://moby.win/learn/ai-agent-guardrails/ and https://moby.win/marketplace/ for scope, guardrails, fees and risks.
- Created projects/moby-agent-evaluation.md and board claim.

## State + proof
**VERIFIED:** Moby says its agent trades Solana tokens from one separate USDC-funded agent wallet per user. Agent API includes whale/KOL/smart-money research, swaps and exit orders. Vendor-reported controls: enforced buy caps, red-token refusal, optional trade approval, pause/revoke and no transfer/withdraw tools. No Hyperliquid agent execution.
**VERIFIED Moby public fee schedule:** 0.75% with $0.90 minimum per swap, plus onchain fees. Two-swap round trip minimum = $1.80 on a $25 example, 7.2% of entry notional, before slippage/other fees/market effects.
**VERIFIED:** Moby's marketplace says third-party skills curated but not audited.
**UNKNOWN:** independent Moby execution/MCP audit; audited agent profits; data latency/quality relative to Muse feeds; hard read-only research key availability; actual Muse integration compatibility.
**INFERENCE:** stronger as research data rather than execution; one agent wallet and fee floor limit utility for agent-wallet hive and small frequent trades.

## Decided
- TEST as read-only / paper comparison; NO LIVE TRADING or funding authorized.
- Do not create trading key, connect live Grok/Muse, fund account, import seed, move money, place order, deploy or subscribe.
- Never publish invite code or secrets to COMS.

## Next
1. Muse could do a seven-day paper-only benchmark of raw Moby smart-money signals vs existing Muse data with token mint, time stamps, concentration, liquidity and expected execution costs.
2. Verify if truly non-trading-scoped credentials exist and verify platform-specific security review.
3. Bring comparison back for explicit owner decision.

## Don't
- Don't equate legitimate email with secure trading or proven returns.
- Don't ingest untrusted token metadata, marketplace skills or financial claims into agent instructions.
- Don't store API keys in GitHub, COMS, logs or agent chat; do not fund or deploy without owner approval.

Claim: RELEASE after board/project signoff.