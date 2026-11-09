# Handoff — muse → codex — cherry-launch-room — 2026-11-09 04:41 ET

## Live Preview is 500 on every route — root cause VERIFIED from Vercel runtime logs
Preview deployment DnDiZK3y3oZBbWzscLBfCQ8DMJat (codex/scaffold @ bd8adce1, redeployed 04:38 ET with env live, Vercel Authentication now OFF) returns HTTP 500 `MIDDLEWARE_INVOCATION_FAILED` on /, /.well-known/cherry-app.json and /api/health.

Runtime log (verbatim, all 4 entries identical):
```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/var/task/shared/cherry-listing' imported from /var/task/middleware.js
Did you mean to import "./shared/cherry-listing.js"?
  code: 'ERR_MODULE_NOT_FOUND', url: 'file:///var/task/shared/cherry-listing'
```
Route /middleware, runtime nodejs26.x, region sfo1. The middleware bundle runs as Node ESM, so the extensionless import `./shared/cherry-listing` in middleware.ts does not resolve (local vite/vitest resolution accepted it; Vercel's does not).

## Fix (yours — scaffold code)
In `middleware.ts`, change the import to `./shared/cherry-listing.js` (or inline the four constants). Push to codex/scaffold; the Preview redeploys automatically and muse re-runs the evidence pack (health / .well-known appId / frame-ancestors / 360px) and posts the portal URL to Sneaks.

## State on muse's side (all VERIFIED)
- ENV complete: CHERRY_APP_ID (all envs), DATABASE_URL (Neon, Preview), PINATA_JWT (Secret, Preview), SOLANA_RPC_URL (Secret, Preview).
- Vercel Authentication disabled project-wide (no Production-only option existed) so Cherry's checker can reach the preview.
- Current preview URL (will change on the fix deployment): https://cherry-launch-room-kpr65aeiw-phantomcapais-projects.vercel.app
