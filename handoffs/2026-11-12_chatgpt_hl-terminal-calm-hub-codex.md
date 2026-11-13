# ChatGPT → Codex → Claude | HL Calm Hub Review Candidate
Date: 2026-11-12 (late ET)
Project: hl-terminal-android
STATUS: SIGNED OFF — LOCAL REVIEW ZIP COMPLETE; REPO / RUNTIME VERIFICATION PENDING

## Did
- Checked AI COMS BOARD.md and project, claimed unowned terminal assembly lane.
- User identified that the 12-file DeepSeek export was truncated partway through file 5, ui.tsx. DeepSeek free app correctly reported it cannot create ZIP files or access the filesystem.
- Existing 29-file read-only trading-terminal draft was preserved. Final calm-hub App and CSS from user-pasted DeepSeek content were integrated. Remaining components (Home, Chart, COMS, Projects, Activity, Trading, shared UI, hub logic/types/tests) were independently completed by ChatGPT where DeepSeek files were missing; no false provenance claims.
- Created /mnt/data/hl-calm-hub-codex-review.zip; SHA-256 2075eead7b7cd4b17de3b267600dc97abcc7400f8c94f78678eae8caddddfbf4.
- Verified ZIP integrity, TypeScript parsing 29 TS/TSX files with 0 parser errors, 0 broken relative imports, and 5 hub-logic smoke checks passing via transpilation.
- Attempted npm test; full Vitest suite did not start because dependencies are not installed and npm registry was unavailable. No genuine full npm test/build PASS.

## State + proof
VERIFIED: ZIP exists and passed unzip integrity. Source is static-check-only and contains a calm-home layout with Home / Chart / COMS / Projects / Activity plus nested Trading.
VERIFIED: Existing domain/storage/transport components were not replaced merely to accommodate the UI.
UNKNOWN: TypeScript semantic compile, full Vitest, browser/PWA install, mobile 360px QA, real Hyperliquid event correctness, order fills, full 30d accounting, notification delivery, chart market feeds, live MOONBOYHL and Grok Wall Street Bot adapters.
BLOCKED: 0xSneaks/hl-terminal-android returned 404 to connected GitHub. ChatGPT has file-write access but no create-repo tool. No app source committed, no review SHA, no deployment.
No trading actions, wallet signing, API secrets, paid inference calls, credit purchases or production changes.

## Decided
- Stop DeepSeek copy-paste cycles and use verified local ZIP as the sole review candidate.
- Owner's priority is calm organization: one glance at chart, COMS, projects and meaningful activity; do not replace with noisy exchange-first UI.
- Keep source truth status visible: COMS links to original secure PWA; project feed and charts show NOT CONNECTED until verified; P&L marked PARTIAL unless fully reconciled.
- Codex is the next independent reviewer only after source is imported to a private repository and can run tests. Claude checks exact reviewed HEAD and gives final verdict. Owner explicitly approves any deploy.

## Next
1. Sneaks creates/selects private 0xSneaks/hl-terminal-android repository through GitHub; no repo was available at review time.
2. ChatGPT/authorized Codex agent imports ZIP on isolated branch, commits source, reports exact SHA, runs npm install/ci, npm test, npm run build; independent Codex performs mobile/security/data-integrity review.
3. Correct only evidenced blockers. Claude final verification on pinned SHA. Release only after explicit owner approval.

## Don't
No fake SHA, fake tests, fake sources, unverified LIVE labels, authorization changes, real orders, secrets, added infrastructure or Zen charges.