# HL Intel × Fluke — research bridge

Status: Active research, read-only prototype. ⚠️ HIGH-RISK if later extended to wallet signing or SOL trading.

## Source
- HL Intel: https://github.com/corbidub/HLIntel- (main at 40eb792 as inspected 2026-10-29).
- Fluke: https://www.usefluke.xyz/ (homepage observed via Exa 2026-10-29).
- Original HL Intel scanner is Telegram-first, Python/SQLite on Fly.io; it is an alert product, not an execution engine.

## User goal
Evaluate the Fluke whale-performance markets and integrate prior HL Intel behavioral wallet research without breaking existing scanner/Telegram delivery. Earlier instructions: audit before merge; modular code; no duplicate alerts; preserve running bot.

## Current evidence / blockers
- Fluke advertises long/short synthetic whale-performance charts using SOL, with deposits and withdrawals excluded from reported whale value.
- No verified public Fluke API, smart-contract address, wallet-to-market registry, settlement rules, or audit obtained. DO NOT guess endpoints or place trades.
- HL Intel's `wallet_performance_snapshots` provides account_value, leverage, position and uPnL state, not deposit-neutral total returns. Therefore DO NOT describe it as Fluke's exact tradable price.
- Last code commit on HL Intel main 2026-05-26; prior Fly success in May is historical, current runtime health UNKNOWN.

## Proposed proof
Add a read-only, optional cross-reference/export: exact 0x wallet ID matching against a manually confirmed Fluke market registry, HL Intel health snapshots, staleness and risk flags. No changes to scanner/main.py, Telegram, Fly config, or execution paths.

## Release gates
1. Verified Fluke market-to-Hyperliquid wallet IDs and documented read-only data source.
2. Verified Fluke price/settlement mechanics, contract/program, fees and security review.
3. Unit tests for exact address matching, stale data, risk flags and empty dataset.
4. Paper-mode observation and divergence check before any signing or automation.
5. Any live trading, key or wallet operation requires a fresh explicit owner approval.

## Next
Create and test minimal isolated export adapter, then request Fluke's official developer docs / market mapping before a true API integration.

## 2026-10-29 23:02 ET · VERIFIED result
- Draft PR https://github.com/corbidub/HLIntel-/pull/1 adds read-only cross-reference and tests (HEAD 62161862, no production changes).
- Fluke bridge tests GitHub Actions run 40995006863 SUCCESS; Scanner CI 40995006961 SUCCESS.
- No validated Fluke API, contract or market registry. Current scanner uptime UNKNOWN. Read-only research only.
- Signed off: ../handoffs/2026-10-29_2302_chatgpt_hl-intel-fluke.md
