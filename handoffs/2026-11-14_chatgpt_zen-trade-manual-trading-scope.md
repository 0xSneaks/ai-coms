# ChatGPT → DeepSeek / Codex / Claude — manual trading capability scope extension
Date: 2026-11-14 ET
Project: 0xSneaks/Zen-trade / hl-terminal-android
Status: SIGNED OFF — requirements/prompt only; NO trade execution

## Did
- Checked live BOARD.md and projects/hl-terminal-android.md and current private Zen-trade draft PR #1, confirming no conflicting active Zen-trade claim.
- Consulted canonical Hyperliquid official exchange API and signing docs for order endpoint/signing flow.
- Updated project scope for owner's latest explicit request to **BUILD manual trade placement** inside chart-centered AI COMS/trading PWA.
- Provided paste-ready final builder handoff to DeepSeek (free consumer app) with security gates and Codex/Claude/owner review sequence. No source edits in application repository, actual orders, deploys or paid actions performed.

## State + proof
VERIFIED: Existing PR #1 is open and draft, code remains read-only. Previous 33/33 tests and 360px synthetic QA apply only to existing shell. Real chart, authenticated COMS agent messaging, Grok event feed, HL Bot v2 signal adapter, positions and safe signed trading are not yet end-to-end verified.
SOURCE: https://hyperliquid.gitbook.io/Hyperliquid-docs/for-developers/api/exchange-endpoint (signed trading actions through /exchange), https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/signing (recommends using SDK over hand-built signatures).
UNKNOWN: supported EVM signing wallet capability on Seeker, exact COMS send/read API, Grok provenance interface and live bot outputs. No credentials or auth material are to be put into project files.

## Decided
Owner's request overrides prior 'read-only architecture forever' restriction only for developing user-initiated manual order placement. It is NOT per-order authorization to transact real funds. Development defaults testnet/mock/dry-run, execution behind explicit future owner gate, then explicit preview/confirmation/signing per order.
Risk controls: planned size derived from mandatory stop + account equity, estimated stop loss <=1% equity before fees/slippage; never claim hard risk cap because gap/slippage can exceed; fail closed when unknown. No autonomous Grok/HL Bot orders, no auto-posting trade data, no custodial secrets.
Core screen: real selected chart and verified order/position overlay, concise HL Bot v2 logic and Grok provenance, in-app authenticated COMS crew communication, manual trade ticket. No fake data or busy dashboards.

## Next
Owner pastes final prompt into free DeepSeek. DeepSeek returns exact changed paths and complete source text or block list, NOT fabricated GitHub commits/ZIP. ChatGPT/authorized Codex applies only after COMS checkin/claim and actual repo review, implements with tests/testnet/phone QA and obtains separate Claude final review; owner alone approves merge, deploy and live-trading enablement.

## Don't
No wallet keys/seeds/signing authority stored in browser/server, exchange orders without same-session explicit user confirmation, unsupervised agent trading, stealth transfers/approvals, paid APIs or unattended production deploy.
