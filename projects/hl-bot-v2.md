# MOONBOYHL × Grok Fleet — reuse the existing signal engine

**Status:** OPEN — read-only audit / integration design dispatched. Agent ACK and integration proof UNKNOWN.
**Owner order:** Sneaks, 2026-11-12. **Source:** [0xSneaks/hl-bot-v2](https://github.com/0xSneaks/hl-bot-v2) `main` at inspected commit `d71fdc22308d34d987ffae038e1803c1a91b75a9`. **Relay:** [issue #14 comment 6841572944](https://github.com/0xSneaks/ai-coms/issues/14#issuecomment-6841572944).
**Context:** [Wall Street Bot](wall-street-bot.md) synced 2026-11-12 20:53 ET and listed hl-bot-v2 integration as NEXT, not wired. [Grok Specialist](grok-specialist.md) is human-in-the-loop, with its own unresolved caps/connector. Do not conflate that seat with Wall Street Bot or with Grok Bot/Big Chief.

## Goal / decision
Use the **existing Python calculations and their actual outputs** as the source of truth for Grok's read-only/advisory market analysis. Grok may explain, rank and challenge the evidence; it must NOT invent trading scores or recompute the authoritative strategy from a prose prompt. Keep the original bot, its Telegram/payment flows, and its source code intact unless a separate authorized implementation task is claimed.

## VERIFIED source findings (static repo inspection, not runtime validation)
- `scanner/indicators.py` and `scanner/screener.py` compute indicator reads, confluence scoring and setup parameters; `scanner/setups.py` orchestrates the pipeline.
- `services/correlation.py` joins recent tracked-wallet position snapshots to same-direction scored setups; `services/wallet_profile.py` and `trackers/wallet_tracker.py` provide wallet health/behavior context.
- `integrations/grok.py` already calls xAI optionally for setup text/JSON, with a local deterministic fallback; this is a **code-level API integration**, not proof that Grok Bot's separate agents ingest MOONBOYHL outputs.
- Source defaults include account-equity assumption of $5,000, 1% risk, and a scanner leverage ceiling of 25×; **none is proof of actual user account equity or an authorized live risk limit**.
- Source's model guard verifies direction and entry deviation but does not validate every stop/target/leverage value. Preserve deterministic numeric source; fail closed on inconsistent/incomplete model output.
- The default confluence gate uses score 60+, two same-side tracked whales, $500k individual notional minimum, and a 15-minute snapshot window. Verify thresholds against code/tests at pinned SHA before reusing; never treat stale/unknown data as current.
- Repo metadata shows visibility **PUBLIC** while `SECURITY.md` states the proprietary source should be private. Flag this to Sneaks; **do not** change repository visibility without his decision.
- There is no verified Grok-fleet-to-MOONBOYHL live read-only export/feed. Do not invent an API URL, claim connection, or copy trading source into COMS.

## Assignment — keep the existing communication chain
1. **grok-bot:** send the directive once to its currently verified internal lead (Big Chief if confirmed). Do not broadcast to agents independently.
2. **Internal lead:** delegate only to reachable existing **Grok Specialist** (source/field contract, discrepancies) and **Wall Street Bot** (advisory/paper consumption plan); collect each ACK and artifact with a direct receipt. Do not spawn absent agents.
3. **muse:** coordinate source access and independent verification; collect receipts and update BOARD as status writer. Compare with the Grok drill's 19:57 ET PARTIAL PASS findings.
4. **Independent technical/risk reviewer:** Claude Code or Codex once an adapter proposal or fixture results exist. Do not let the implementing agent approve its own work.

## Read-only acceptance contract
- Pin SHA, inspect exact source, and list fields genuinely available from source-engine results; choose a minimal normalized data contract with timestamps, provenance, market, direction, score, underlying whale evidence, deterministic levels, funding/OI context, and explicit UNKNOWN for unavailable fields.
- If an export/adapter is needed, first propose the smallest isolated read-only implementation; do not silently alter `hl-bot-v2` scanner/Telegram/payment code or deploy.
- Run existing tests and a bounded fixture/paper comparison: strong same-side whale overlap, opposite-side overlap, stale snapshots, absent whales, LLM level conflict, missing markets and risk-cap breach. Report input, expected output, actual output, SHA, test command and independent review verdict.
- Wall Street Bot retains **separate** enforcer. Its 2026-11-12 sync recorded session-specific $4 loss/trade, $12/day and 10× limits; these are not standing permissions or reusable defaults. Live equity/fees/margin/stop/liquidation and current approvals must be independently verified, or **NO TRADE**.
- **DONE** only with an inspected read-only adapter/ingestion proof plus passing fixtures and independent reviewer acceptance. A prompt acknowledgment or code import is not sufficient.

## ⚠️ HIGH-RISK / prohibited without fresh exact Sneaks approval
No live placing/editing/canceling/closing orders, signing, funding, transfers, private-key or API-secret handling, paid credits, production deploy, Telegram/payment changes, or public posting. Do not share `.env`, SQLite subscriber/payment data, or full proprietary source snippets in the public board/relay.

## Next
Receive individually evidenced ACKs and a SHA-pinned source-to-field contract from Grok Specialist and Wall Street Bot via the current lead → Grok Bot → Muse. If no credible current Grok agent can access the repository or machine-readable signals, report BLOCKED with the missing access or smallest safe adapter step; do not claim integration.

## References
- [COMS dispatch](https://github.com/0xSneaks/ai-coms/issues/14#issuecomment-6841572944)
- [Grok drill verification](../handoffs/2026-11-12_1957_muse_grok-drill-verification.md)

## Sneaks clarification — 2026-11-12 21:04 ET (current priority; supersedes broader fleet scope)
**Named recipient: Wall Street Bot.** The Grok-fleet Wall Street Bot must use **actual computed MOONBOYHL signal data** when evaluating Hyperliquid trades, not a summary/prompt recreation. Route through Grok Bot/current lead, with Muse tracking direct per-agent ACK and an independent code/risk reviewer after a read-only fixture.
- [Owner clarification on relay](https://github.com/0xSneaks/ai-coms/issues/14#issuecomment-6841636154) supersedes the wider two-specialist task list in [initial instruction](https://github.com/0xSneaks/ai-coms/issues/14#issuecomment-6841572944).
- Scope: existing Python scanner, whale-position confluence, wallet behavior, funding/OI conditions, deterministic entry/stop/targets, freshness; source SHA `d71fdc22308d34d987ffae038e1803c1a91b75a9`.
- **Integration blocker VERIFIED from static inspection:** `services/cycles.py` retains `_last_setups` in-process; no trustworthy public read-only Grok adapter or endpoint established. `storage/database.py` stores subscriber/payment data alongside market data. Use a **restricted minimal market-only export** if needed; no raw database sharing, public endpoint, model-imagined score, live execution or code copying into public COMS.
- **First acceptance:** direct Wall Street Bot ACK; field-by-field output contract; actual source-derived PAPER card with commit/time/provenance; fixture tests for no/stale/opposing whales, model-conflicted levels, missing values and risk-cap breach; independent reviewer acceptance. Until those artifacts exist, actual ingestion = **UNKNOWN**, live readiness = **NOT APPROVED**.
- Risk: 1% of VERIFIED equity at most, sized from stop, and the stricter *separately authorized* session caps. The 2026-11-12 Wall Street Bot brief's $4/trade, $12/day, 10x figures are dated session-specific; no authorization to reuse as future permission. Never interact with existing HYPE orders or any wallet in this task.
