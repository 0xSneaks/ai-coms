# AI COMS handoff — Coinbase MCP setup — ChatGPT — 2026-10-26 17:14 ET

## Did
- Checked BOARD.md (requests and ownership), RULE.md v2 (DECIDE-1024), projects/ai-coms.md, and latest ChatGPT ai-coms handoff before coordination.
- Verified Coinbase official setup documentation: https://docs.cdp.coinbase.com/ai-agents/coinbase-for-agents/coinbase-mcp and https://docs.cdp.coinbase.com/coinbase-for-agents/skill.
- Verified ChatGPT remote MCP endpoint https://agents.coinbase.com/mcp; login is OAuth via ChatGPT web custom MCP/Plugins UI; connected app becomes available on mobile.
- Searched available ChatGPT plugin catalog; no Coinbase plugin was returned. Coinbase MCP tools are not exposed in this session. Gave Sneaks supported custom MCP setup instructions.
- No project/application code, token, wallet, funds, account settings, or production configuration was touched.

## State + proof
- VERIFIED (Coinbase official documentation): ChatGPT and Muse are allowlisted remote-MCP harnesses; OAuth connection does not require a CDP API key.
- VERIFIED (this session tool discovery): No Coinbase tools available; a read-only coinbase_portfolios_list verification call is not possible yet.
- UNKNOWN: Sneaks's Coinbase login/portfolio consent, connection completion, product permissions, jurisdiction eligibility, account balances.
- ⚠️ HIGH-RISK: OAuth can grant account permissions for trading and USDC x402 paid data. Connection request is not authorization to transact.

## Decided
- Use ChatGPT's documented custom MCP OAuth route for this chat; do not substitute the Coinbase Wallet MCP or local CLI.
- Treat authentication as user-controlled browser action. Only a successful read-only portfolio-list tool call establishes verified connection.
- Do not authorize trades, transfers, order edits/cancellations, or x402 expenditures based solely on the setup request.
- Muse is also a supported harness; connecting in ChatGPT does not imply a Muse connection.

## Next
1. Sneaks opens ChatGPT web > Plugins > Add > Add Custom MCP Server, names Coinbase, uses https://agents.coinbase.com/mcp, keeps OAuth, creates plugin, signs in and approves portfolio selection.
2. In ChatGPT, discover Coinbase tools; call coinbase_portfolios_list with {} to verify the connection read-only; report status and errors without guessing.
3. If Sneaks's actual target is Muse rather than ChatGPT, direct Muse to follow https://docs.cdp.coinbase.com/coinbase-for-agents/skill with the native remote MCP connection flow and owner-operated Coinbase sign-in. Require separate explicit approval for any trading or x402 pay step.

## Don't
- Don't access or request passwords, recovery phrases, tokens, CDP API keys, cookies, or 2FA codes.
- Don't connect a live account by improvising OAuth, configuring a global key, or using an unauthorized client.
- Don't infer that the ChatGPT plugin is installed, a portfolio was authorized, Muse was connected, or any Coinbase tool succeeded.
- Don't execute orders, transfers, paid research, or change Coinbase account access without separate explicit owner authorization.
