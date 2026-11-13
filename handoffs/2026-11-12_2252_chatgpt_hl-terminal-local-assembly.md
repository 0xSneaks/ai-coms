# ChatGPT → Muse / Codex / Claude — HL terminal manual local assembly
Date: 2026-11-12 22:52 EST
Project: hl-terminal-android
Status: SIGNED OFF — LOCAL DRAFT PACKAGE; STATIC CHECKS ONLY; NOT VERIFIED OR DEPLOYED

## Did
- Read live BOARD.md and projects/hl-terminal-android.md; claimed review/assembly lane with no other active terminal claim.
- Checked target 0xSneaks/hl-terminal-android repo: connected GitHub returned 404, so no GitHub commit/import was possible.
- Manually assembled 29 local project files into /mnt/data/hl-terminal-android using the user-transferred free DeepSeek app code batches as the baseline; applied targeted local modifications to fee treatment, atomic IndexedDB insert-once, WebSocket reconnect management, notification behavior for confirmed fills with missing order update, UI presentation and account-history warning.
- Included UI shell, read-only Hyperliquid public info/WebSocket adapters, account-scoped IndexedDB fill ledger, P&L module, tests, manifest/icons, README and package config.
- Packaged /mnt/data/hl-terminal-android-draft.zip (29,434 bytes; SHA-256 63fd3faf52f5a1767d248498f7bc60a4da7590b893d5c854aa2d8d641ff87a1f); zip integrity checked.
- Verified static TS parser and relative import paths via globally installed TypeScript: 21 TS/TSX source files, 0 syntax errors, 0 broken relative imports. Verified 3 JSON/manifest configs and linked icon assets; 0 structural issues.
- Actually invoked npm test, which failed before execution because vitest executable is absent. npm registry probe failed EAI_AGAIN (no network). No full npm install, type-check or Vitest suite was possible.

## State + proof
VERIFIED: Local ZIP exists and decompresses; source files as written have no TS parser errors or missing relative imports. No deployment or Hyperliquid trading operations, keys, wallet authorization, external services or paid inference calls were performed.
UNVERIFIED: npm test, npm run build, TypeScript semantic checking with real deps, IndexedDB runtime in browser, actual REST/WS event schemas, real account balances/fills, exchange fill reconcilability, Android installation, notification delivery.
Known blockers: target GitHub repository absent/unavailable; node_modules absent/npm inaccessible; complete 30d P&L cannot be guaranteed by one capped fills query, so UI deliberately labels it partial. MOONBOYHL market-only source feed and Grok Wall Street Bot decisions are NOT CONNECTED. Candlestick chart remains NOT CONNECTED, not fabricated. No Web Push background notifications. On-device IndexedDB stores account history; must secure origin and access before deploy.
This package is a manual reconstruction and local targeted patch, NOT an exact byte-for-byte transcription of DeepSeek files, and must be independently diffed/tested before adopting.

## Decided
Deliver draft zip to owner for review/import, not a production build. Use existing DeepSeek free-app manual workflow; ChatGPT performs imports when private repository exists. Codex reviews imported commit and verifiable runnable tests, Claude final gate, owner approves any deploy or live money permissions. Do not claim project complete or live trading console.

## Next
1. Sneaks creates or selects a private GitHub repository accessible to ChatGPT/Codex; current GitHub integration has no create-repo action.
2. Authorized agent imports the local ZIP into isolated review branch, performs npm ci/install, npm test, npm run build with real dependencies and browser QA, fixes reported failures. Keep account data disabled by default in untrusted previews.
3. Codex independent review at pinned source SHA and tested exchange semantics; Claude final review after Codex acceptance.
4. Separate integration: obtain actual MOONBOYHL market-only computed signal adapter + verifiable Wall Street Bot output feed; no invented data.

## Don't
No live order placement/edit/cancel, wallet signing, auth secrets in GitHub/COMS, production deployment, pay-as-you-go inference, new subscriptions or incomplete-history metrics presented as reconciled.
