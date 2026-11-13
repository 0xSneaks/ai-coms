# Android Hyperliquid Terminal — DeepSeek Build, Codex Review, Claude Final Gate

STATUS: PROMPT READY; implementation NOT STARTED (2026-11-12).
OWNER: Sneaks. NEW LANE: private mobile-first Android-installable terminal.

## Sources
- 0xSneaks/My-prompts-: LYRA PRIME GOLD v2 + gold-edits/trading/hyperliquid/ai-autotrade-xai-opus.md (preserve original prompts).
- 0xSneaks/hl-bot-v2 at d71fdc22308d34d987ffae038e1803c1a91b75a9; 0xSneaks/coms-pwa; ai-coms projects/hl-bot-v2.md + projects/wall-street-bot.md.

## Owner goal
Actual Hyperliquid account chart, positions, order lifecycle, executed fills, realized/unrealized P&L, performance, wallet tracking and MOONBOYHL signal evidence, Wall Street Bot decisions and COMS communication. Android home icon. Immediate, exchange-verified trade-landed notification with partial/reject/cancel distinctions.

## Provenance + blocking facts
The existing MOONBOYHL repo scans/grades setups and whale/wallet health; it does not execute Hyperliquid orders. AI COMS currently marks MOONBOYHL hosting OFFLINE and actual Grok Wall Street Bot consumption of computed MOONBOYHL data UNKNOWN. The existing COMS PWA has passkey-gated board sends bound to its own origin. Never pretend these missing integrations work.

## Architecture and scope
New separate PRIVATE repo, Android-installable PWA first (later optional trusted Android wrapper); real read-only Hyperliquid API WebSocket/REST; secure server-side account reader + backfill/reconciliation; data contracts for source-SHA/timestamped market-only MOONBOYHL computed signals; provenance-tagged Grok decision events; verified exchange execution ledger; P&L analytics; existing COMS PWA secure deep link/status. Never export MOONBOYHL SQLite subscriber/payment tables or copy GitHub API token to client.

## Execution gates
DeepSeek IMPLEMENT on isolated review branch; Codex independent adversarial review at exact commit; Claude final check of approved HEAD and verdict. No merge, production deploy, API key changes, live placement/cancel/edit, signer/executor, or spending without explicit separate Sneaks approval. v1 is real-money monitoring, NOT simulated account and NOT new trade execution authority. Any existing live orders untouched. <=1% of VERIFIED equity is the design maximum for any future authorized executor, not permission for this build.

## Acceptance tests
Mobile 360px; reliable lifecycle state accepted/open/partially-filled/filled/canceled/rejected; dedup and replay after websocket loss; exchange fill evidence and idempotent alerts; offline/stale and no invented metrics; proven bot-signal-to-order association vs UNKNOWN; detailed P&L fees/funding; wallet-health freshness; COMS origin/passkey boundaries; no secret leaks; no write trading endpoints; dry-run/testnet fixtures. Report code SHA/tests and physical phone testing evidence, not claimed results.

## Next
Sneaks forwards the ChatGPT DeepSeek build prompt; DeepSeek checks COMS and claims new files. Codex reviews; Claude checks final. Integration with Wall Street Bot must be proven with actual computed source signals, not summary prompting.

## 2026-11-12 — DeepSeek app workflow clarification
VERIFIED: owner is using the free DeepSeek consumer app to produce code; DeepSeek's read-only web lookup did not show GitHub board/files and cannot be treated as an authenticated GitHub check-in. Its "BLOCKED" assessment describes its application access, not absence of AI COMS resources.
VERIFIED by connected GitHub: BOARD.md, this project, and original ChatGPT handoff all exist and are readable; no active build claim was found for this lane. MOONBOYHL scanner/screener.py is readable. The proposed 0xSneaks/hl-terminal-android repository returned 404 (not found or inaccessible).
DEEPSEEK OUTPUT: text-only TypeScript snippets; no committed application, test execution, Android install, exchange connection, or live-trade permission.
FIX FIRST in snippets: computeRealized erroneously skips sole snapshot-tagged fill; fee mismatch flags without invalidating net P&L; builder fees are not counted; memory-only fill deduplication does not survive restarts; terminal-state reducer may misrepresent late partial fills. Require reconciled exchange-ledger events, no fake live data, and runnable tests before Codex acceptance.
WORKFLOW (updated by owner): DeepSeek FREE APP authors file-by-file patch/tests without needing GitHub access; an authorized GitHub-capable agent (Codex in implementation/import lane) creates/claims the private repository and imports changes; a distinct independent Codex review pass at exact SHA follows. Claude then performs independent final verification. If same Codex agent imports and cannot independently review, use separate reviewer session/agent. No paid API, unapproved deployment, signing, or trading.
Handoff: handoffs/2026-11-12_2143_chatgpt_hl-terminal-blocker-recheck.md
