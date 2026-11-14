# ChatGPT → DeepSeek / Codex / Claude: Android PWA installability request
Date: 2026-11-14
Project: hl-terminal-android / repo 0xSneaks/Zen-trade
Status: SIGNED OFF — PROMPT ONLY, NO APP CODE/DEPLOY

## Did
- Read live AI COMS BOARD.md + projects/hl-terminal-android.md.
- Checked private Zen-trade draft PR #1 and on-branch package.json, index.html, manifest.webmanifest, README.md; observed no vercel.json file.
- Verified Claude Code handoff project status: at commit a3e2454a73491eab4ce16fdffd7b513f221dccd8 tsc PASS, Vitest 33/33 PASS, npm build PASS, 360px synthetic Chromium QA PASS. Separate independent Claude review and physical Android install remained unverified. PR #1 still OPEN/DRAFT/unmerged.
- Wrote user-facing single DeepSeek consumer-app prompt for minimal installable Android PWA polish: icons/manifest/service worker safe assets strategy, deploy/test guide and exact file list. No GitHub work, actual deployment, or device tests performed in this turn.
- Updated project file with installability owner priority.

## State + proof
VERIFIED: repo private, manifest present, PWA start_url=/ and standalone display, HTML manifest linked. README documents known limitations but is stale relative to later passed gates.
UNKNOWN: Chrome/Solana Seeker real install, offline startup, HTTPS hosting, independent separate Claude verdict, actual real API behavior and auth.
No secrets/trading writes/wallet signing/deploy/spend.

## Decided
DeepSeek free app produces textual targeted files only; ChatGPT/Codex integrates on review branch, runs actual tests, independent Claude review, owner approves merge and hosting/deploy. Do not falsely label it installable until verified on physical device over HTTPS. Web app PWA is the intended installation route (not native APK).

## Next
Owner pastes single prompt into DeepSeek and returns exact changed files. Authorized agent applies on isolated branch with review; rerun build, tests, PWA installability on HTTPS test deployment if owner authorizes; test installation on Seeker/Android Chrome; produce exact install instructions and URL only after verified. Owner controls merge and launch.

## Don't
No backend/regression rewrites, trading permissions, auth keys, production deployment, pay subscriptions, caching account API/COMS responses in service worker, non-verified claims.
