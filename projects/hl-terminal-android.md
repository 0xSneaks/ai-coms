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

## Owner correction — manual-only DeepSeek handoff, 2026-11-12
OWNER INSTRUCTION: DeepSeek is the free consumer app. It has NO connectors, NO repository access, NO ability to push, claim, fetch authenticated board content, create branches, create repositories or change files. All data exchange to/from DeepSeek must be performed manually by owner and ChatGPT acting as hands.
Workflow: ChatGPT reads COMS and provides bounded source/context blocks to paste into DeepSeek; DeepSeek returns labeled file bundles, tests and manifest as plain text; owner pastes them into ChatGPT; ChatGPT validates, fixes or returns a targeted fix request, and when a private target repo exists, writes those files through connected GitHub after checking COMS and claiming the area. Then independent Codex re-review of exact SHA; Claude final gate. Do not ask DeepSeek to sign in, check claims, push or produce fabricated commit SHA. No automatic Grok integration or exchange write activation.

## 2026-11-12 — DeepSeek PASS 2 read-only adapter review (ChatGPT)
VERIFIED: Free DeepSeek app supplied revised domain files, TS WebSocket/info clients and contract/tests by manual paste. This is DRAFT SOURCE ONLY, not a runnable/pushed build; `0xSneaks/hl-terminal-android` still returned 404 through authenticated GitHub. No tests or live connection executed here.
BLOCKER — PnL: Official Hyperliquid WS docs say `fee` negative means rebate; positive is fee paid. `builderFee` is also included in `fee`. DeepSeek adds fee + builderFee, expects paid fees negative and requires builderFee even when optional. All three are wrong; net realized (for same settlement currency) should be closedPnl MINUS fee PLUS signed funding, subject to verified scope, and builder fee is reporting-only breakdown of fee, not an additional expense.
BLOCKER — persistence: `fillKey(user, fill)` changed but `IndexedDbPersistence.putFill(fill)` is still unscoped. `init()` rekeys all accounts' fills as current user; account bleed possible. Persist account with each fill and isolate reads. Concurrent ingest needs atomic existence check + insert; replay/notification dedupe durable.
BLOCKER — event reducer: fill dedup must gate before `ingestFill` (otherwise duplicates inflate filledSz); fill arriving before order update currently dropped; no reliable rehydration after restart. Closed/late fills need invariant tests. No proof of REST-reconciled order status coverage.
BLOCKER — REST: `userFunding` info request needs startTime and returns ledger entries with `delta.usdc`, unlike bare WS `WsFunding`; model separately and normalize. `getUserFills` returns unvalidated unknown[]; guard shape. Check official API response schemas.
BLOCKER — transport: labels CONNECTED before WS onopen; reconnection timers/old sockets not invalidated; ignores subscription errors; lacks explicit REST gap reconciliation. At minimum show CONNECTING then CONNECTED only onopen + successful subscription and refresh state after reconnect.
BLOCKER — cross-file: previous notifications.ts still uses old `fillKey(fill)` signature, which now requires a user argument. Compilation unverified; UI shell/build files remain missing. Strategy adapter only defines interface, not actual MOONBOYHL ingestion; Grok source remains NOT CONNECTED.
ACTION: DeepSeek fix ONLY these targeted issues, provide complete missing UI/test files and runnable build/test proof (or UNRUN). Do not hand off to Codex as APPROVED or LIVE. Owner manually copies to ChatGPT; ChatGPT/GitHub imports once private repo exists; Codex independently reviews exact SHA → Claude final gate. No live trading changes, paid calls or credentials.

## 2026-11-12 22:52 EST — ChatGPT local reconstruction, static check
VERIFIED: 29 source/asset files manually assembled from DeepSeek free-app text batches plus targeted fixes; ZIP generated in conversation /mnt/data/hl-terminal-android-draft.zip (29,434 bytes, SHA-256 63fd3faf52f5a1767d248498f7bc60a4da7590b893d5c854aa2d8d641ff87a1f). This is a reconstructed local draft, not byte-identical to DeepSeek output and not a deployed repo. Global TypeScript parser found 0 syntax errors in 21 TS/TSX files; 0 broken relative imports; JSON/manifest/icon references passed structural checks. Zip integrity passed.
BLOCKED: Real npm test was invoked but vitest was missing; npm registry cannot be reached (EAI_AGAIN). Therefore tests, semantic tsc, real WebSocket/API correctness, Android installation, notification delivery and P&L calculations remain UNVERIFIED. Target repo 0xSneaks/hl-terminal-android still returned 404. No source was imported to GitHub or production.
DRAFT LIMITATIONS: 30-day P&L labeled PARTIAL (REST fills limit/pagination completeness unknown), no MOONBOYHL signal feed, no Grok Wall Street Bot interface, no chart integration, no background Web Push. Private origin/auth protections required for financial information before deploy.
NEXT: owner selects or creates private repo → authorized ChatGPT/Codex file import on separate branch → npm install, npm test, npm run build and browser QA → Codex independent review → Claude final gate. No mainnet order actions or unapproved spending.
Handoff: handoffs/2026-11-12_2252_chatgpt_hl-terminal-local-assembly.md
