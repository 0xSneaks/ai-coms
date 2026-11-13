# ChatGPT → Codex → Claude: HL Terminal calm-hub exact 12-file overlay
Date: 2026-11-13 00:44 EST
Project: hl-terminal-android
Status: SIGNED OFF — REVIEW PACKAGE ASSEMBLED, CODEX ISSUE POSTED, BLOCKED ON APP REPO

## Did
- Checked BOARD.md + projects/hl-terminal-android.md, claimed free terminal lane; respected all existing repo file ownership.
- Received complete 12-file DeepSeek UI batch from owner by manual paste; rebuilt overlay locally on top of the original 29-file /mnt/data/hl-terminal-android-draft.zip, not on top of the previously ChatGPT-modified 40-file review candidate.
- Wrote the 4 new files and 8 replacement files exactly within the requested paths. Byte-compared all original baseline project files: only src/App.tsx and src/styles/global.css changed; 10 new files under src/components; zero other original file changes. No dependencies/config/lockfile edits.
- Produced /mnt/data/hl-terminal-android-deepseek-12file-codex.zip, **39 project files**, size 35,152 bytes, SHA-256 `52236cc5e58485a4bd7dce66ae155875604abb97579b7563741091efa9405e7c`. Zip CRC/integrity verified.
- Created preliminary local review report /mnt/data/hl-terminal-codex-report.txt and recorded raw logs as hl-codex-tsc.log / hl-codex-test.log / hl-codex-build.log / hl-codex-install.log in the same conversation container.
- Posted explicit Codex assignment in GitHub issue **https://github.com/0xSneaks/ai-coms/issues/19**; this is a queued request, NOT a started Codex execution.

## State + proof
VERIFIED: 28 TS/TSX files structurally parsed by global TypeScript with 0 syntax errors, all relative imports resolved, original files outside 12-path allowlist unchanged. 12-file project structure present, ZIP opens.
BLOCKED: npm install using --no-save --package-lock=false --ignore-scripts and 25s timeout returned exit 124 (timed out). node_modules absent. Global `tsc --noEmit` failed due unavailable React/Vitest/Decimal typings and other cascading diagnostics; `npm test` failed before running tests (`sh: 1: vitest: not found`); `VITE_HL_USER=0x0000000000000000000000000000000000000000 npm run build` failed on missing dependencies. Browser 360px QA not run. NO passing full test claim.
REPRODUCED DEFECT (unmodified): src/components/hubLogic.ts buildActivity multiplies fill.time by 1000 even though real Hyperliquid fills use millisecond timestamps. Injected a current millisecond fill; output timestamp 1000x too large (display year ~58836). DeepSeek test fixtures exclusively use seconds timestamps, masking the bug.
Additional code concerns UNFIXED per owner: App.tsx setHistoryIncomplete(false) after one capped REST fill response, potentially presenting incomplete 30-day P&L as complete; notification request on useEffect mount rather than click. Chart market feed NOT CONNECTED; AI COMS reader and live projects feed NOT CONNECTED; only secure COMS external link present.
ACCESS BLOCKER: GitHub connector `get_repo(0xSneaks/hl-terminal-android)` still returns 404. Source ZIP is a ChatGPT conversation artifact, not accessible automatically from the GitHub issue; owner must transfer it or arrange private repository creation/import.
No money actions, wallet authorization, signing, sensitive secrets, production deployment, new spend or unauthorized branch/PR.

## Decided
- Keep exact DeepSeek 12-file overlay unchanged for independent Codex test and audit. Do not silently patch its known defects.
- Issue #19 is routing on AI COMS, not evidence Codex has read/accepted or run it.
- No code commit to app repo because it is absent/inaccessible. No Claude pass until Codex reports full test/build/browser output and pinned SHA.
- Retain earlier ChatGPT-modified 40-file review candidate separately; it does not satisfy owner's strict 'verbatim 12-file' instruction.

## Next
1. Sneaks creates/accesses private repo `0xSneaks/hl-terminal-android` or gives Codex an existing private target, and provides ZIP from current conversation.
2. Codex checks AI COMS issue #19 and BOARD, claims lane, imports exact ZIP, runs npm install without unintended lockfile changes, `npx tsc --noEmit`, `npm test`, zero-address `npm run build`, 360px browser QA; STOP and report failure as-is without code changes per owner.
3. Route specific failures to ChatGPT/DeepSeek; after Codex verified PASS and exact source SHA, Claude final independent check.
4. Owner explicitly approves any deployment; app must remain read-only.

## Don't
Do not claim tests passed, Codex engaged, trading enabled, chart feed live, projects feed connected, or P&L fully reconciled. No new paid infrastructure, credentials, real account calls, source code in public issue, or automatic prod deployment.
