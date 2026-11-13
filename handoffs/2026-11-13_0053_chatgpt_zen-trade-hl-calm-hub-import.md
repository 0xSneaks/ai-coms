# ChatGPT → Codex → Claude | HL Calm Hub imported into Zen Trade
Date: 2026-11-13 00:53 EST
Owner-selected project: HL Terminal Android / Calm Hub
Target private GitHub repo: 0xSneaks/Zen-trade (capital Z; NOT empty 0xSneaks/zen-trade-)
Status: SIGNED OFF — UPLOADED TO ISOLATED BRANCH, NOT BUILD-VERIFIED, NOT MERGED

## Did
- Checked AI COMS BOARD and projects/hl-terminal-android.md; claimed free lane for import and Codex routing.
- Resolved duplicate "Zen Trade" repository names from current authenticated GitHub: 0xSneaks/Zen-trade has a README and a main HEAD; 0xSneaks/zen-trade- has no branch or files. Chose initialized 0xSneaks/Zen-trade for a review branch, untouched default branch.
- Verified local /mnt/data/hl-terminal-android-deepseek-12file-codex.zip archive integrity and 39 files (27 text foundation/config files, 12 UI overlay files total, including 2 PNG icon assets as part of the base).
- Used connected GitHub to upload individual files (not just the ZIP) to branch chatgpt/hl-calm-hub-import-20261113.
- Created new Git tree 52d06ebc2b2361e8391f635c0de56f9d2c2d4fa2 and commit b59c3d82b9eab5954ea255684965cafccac64d15 (parent main e624569a79d7a30fc81c0518911532c1843cadb3).
- Verified GitHub commit contains 39 changed file paths. Re-fetched src/App.tsx, src/components/__tests__/hubLogic.test.ts, package.json, README.md from branch successfully.
- Opened DRAFT PR #1: https://github.com/0xSneaks/Zen-trade/pull/1 . Branch remains unmerged, main unchanged.
- Posted ready-for-review branch and exact SHA to AI COMS issue #19 comment ID 6845378762: https://github.com/0xSneaks/ai-coms/issues/19.

## State + proof
VERIFIED: GitHub source files present in private 0xSneaks/Zen-trade branch and draft PR, 39 committed files, 12-file overlay paths; parent/main unchanged.
VERIFIED (prior local checks): ZIP integrity; TypeScript parser 28 files 0 errors; no broken relative imports. These are static checks, not proof that TypeScript type-check, Vitest, build or UI work.
BLOCKED/UNVERIFIED: npm install previously timed out in the model environment; npm test failed to start with "vitest not found"; tsc and build blocked by missing dependencies; browser/mobile 360px QA not performed. Do not report these as passed.
KNOWN BUGS: hubLogic.ts multiplies Hyperliquid millisecond fill time ×1000 when building activity (wrong); App.tsx sets historyIncomplete=false after one capped 30d REST fill query (false reconciled P&L); notification permission requested in useEffect instead of user gesture; websocket reconnect, stale open orders and account reports require review. Market chart feed, COMS summary reader, MoonboyHL, Grok Wall Street Bot are not wired; UI labels unavailable.
SECURITY: No orders, signing, wallet keys, auth bypass, API secrets, paid services or deploy. Live account data never tested. Public zero wallet address must be used only for offline build tests.

## Decided
The private initialized Zen-trade repo is the new source destination; 0xSneaks/hl-terminal-android no longer needs to be created. Source review and corrections occur in draft PR #1; owner merges/deploys after verified Codex + Claude gates.
Codex can make smallest proven fixes to the 12 UI files on the review branch if tests reproduce bugs, but must not touch domain/, hyperliquid/, storage/, adapters/, configuration, dependencies or main without separate owner approval. Report blocking defects outside UI scope rather than silently changing unrelated files.

## Next
1. Codex checks AI COMS, claims PR #1, checks out exact commit b59c3d82b9eab5954ea255684965cafccac64d15; verifies file manifest.
2. In connected isolated environment: npm install, npx tsc --noEmit, npm test, VITE_HL_USER=0x0000000000000000000000000000000000000000 npm run build, then 360px mobile browser QA. Capture raw logs and test proof.
3. Fix/retest only bounded UI defects; if domain/transport/fee issues found, stop for authorization. Update PR with new SHA and report exact status and changes in COMS. Do not merge.
4. Claude performs independent final review at pinned final SHA; owner chooses if/when to merge, deploy, and provide real public account address.

## Don't
No trading writes/positions, transfers, signing, credentials, real-money test orders, payment, main merge, deploy, fabricated live market data, fabricated success or auto-opening of a trading authority.
