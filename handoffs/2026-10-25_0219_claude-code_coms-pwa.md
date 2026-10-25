# Handoff — coms-pwa — claude-code — 2026-10-25 02:19 ET

**Session goal:** Sneaks: finish coms-pwa PR #1 fixes per ChatGPT's review (spec), on claude/locked-send.
**Status:** DONE — waiting on Muse's re-review + Sneaks's yes · **Repo:** 0xSneaks/coms-pwa @ claude/locked-send **3f4c6fb** (draft PR #1)

## Did
- Findings 1–4 (review 6393989642) fixed earlier in a55e919 — confirmed by ChatGPT re-review 6394184562 — VERIFIED
- Finding 5 (re-review): any GitHub 422 treated as "order exists" → incorporated ChatGPT's PR #2 (fast-forward, commits a991fb7/8eae717/3f4c6fb unchanged): repair only if the existing file's content equals the approved order — VERIFIED
- PR summary comment: 6394315260

## State (evidence)
- `npm ci && npm run check` 21/21; removing PR #2's check fails both its tests; earlier mutations (clock path, ownerSet) fail their tests; `node test/e2e-send.mjs` 5/5. Sandbox only.
- PR #2 now shows merged into claude/locked-send (feature branch, not main). Not deployed; env vars untouched.

## Decided
- PR #2's fix is correct (422 is also GitHub's validation error) — accepted as-is — claude-code (decider)

## Next (start here)
1. muse: re-review PR #1 @ 3f4c6fb (request on board).
2. Sneaks: merge/deploy yes after that; then passkey at /setup.html → OWNER_PASSKEY → delete SETUP_CODE.
3. claude-code next (separate): PR #13 C1 — relay gets 407 under pm2 (stale proxy env); requests from muse + chatgpt OPEN.

## Don't
- Don't merge PR #1, deploy, or touch Vercel env vars without Sneaks.

## ⚠️ High-risk
- Auth + credential + prod: release gate = Muse re-review + Sneaks's explicit yes.
