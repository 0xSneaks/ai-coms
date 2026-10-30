# HL Intel × Fluke — ChatGPT sign-off
2026-10-29 23:02 ET · Agent: chatgpt · Project: hl-intel-fluke

## Did
- Inspected Fluke homepage via Exa: site advertises long/short synthetic Hyperliquid whale-performance charts funded in SOL; deposits/withdrawals do not alter whale-value chart.
- Located historical HL Intel repo: https://github.com/corbidub/HLIntel- HEAD baseline 40eb792 (last commit 2026-05-26).
- Reviewed README, scanner/main.py, scanner/hyperliquid/client.py, scanner/data/database.py, scanner/README.md and recovery state.
- Created isolated branch chatgpt/fluke-readonly-bridge-2026-10-29; opened draft PR #1 https://github.com/corbidub/HLIntel-/pull/1.
- Added scanner/integrations/fluke_bridge.py, scanner/integrations/README.md, scanner/tests/test_fluke_bridge.py, .github/workflows/fluke-bridge-ci.yml. All additive; no modifications to scanner main, Telegram bot, Fly deployment or secrets.

## State + proof
- VERIFIED PR #1 HEAD 62161862f469544cd4ef5468b98c64b6a6d46f45 (4 files, 292 added, zero deleted); open DRAFT, not merged.
- VERIFIED GitHub Actions Fluke bridge unit tests run 40995006863 SUCCESS: unittest discover and py_compile passed. Scanner CI run 40995006961 SUCCESS. No live DB test.
- VERIFIED existing HL Intel local SQLite schema provides wallet_performance_snapshots with state, account value, leverage, open uPnL, timestamp.
- UNKNOWN current Fly scanner runtime status: May 2026 reports historical success, not proof of October uptime.
- UNKNOWN any official Fluke API, oracle/settlement model, onchain program ID, wallet-to-market registry, audit or fee schedule. Exa /docs and /about showed app shell but no published integration contract.
- INFERENCE Fluke could benefit from HL Intel's behavioral risk annotations; no demonstrated profitable signal.
- Bridge opens DB in SQLite read-only mode, joins full exact wallet IDs manually, flags stale/missing/high-risk snapshots. It does not compute Fluke whale-index performance and does not trade. Documentation and tests included.

## Decided
- TEST read-only cross-reference. Do not merge pending Fluke source verification or pretend this is an API integration. Preserve HL Intel's existing Telegram product.
- ⚠️ HIGH-RISK: Solana wallet signing, real trading, auth, fees and production changes require explicit Sneaks approval.

## Next
1. Verify real Fluke whale market → full Hyperliquid address mapping (prefer official docs), contract and pricing/settlement source.
2. Read recent scanner DB in read-only mode and compare data freshness and exact wallet matches.
3. Review draft PR #1; only then consider read-only Fluke API adapter and paper research.
4. Need owner confirmation before any live execution work.

## Don't
- Don't enter wallet keys or Telegram credentials, simulate a Fluke API, infer whale returns from raw account value, send trading orders, merge the draft PR, or redeploy Fly.
- Don't mistake CI pass for integrated product or live runtime verification.

## Coordination
- AI COMS BOARD.md and RULE.md checked first; new project file created, no conflicting agent claims. No project-specific inbound request. GitHub tool allows writes, but a shell checkout to run python3 tools/coms_check.py was not available; project compliance script UNKNOWN.
