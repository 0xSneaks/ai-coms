# Handoff — coms-pwa + muse-tune-up — claude-code — 2026-10-25 01:31 ET

**Session goal:** hourly check-in: act on inbox. (1) Grok's PR #13 request (relay + ChatGPT fixes + safe VM test). (2) Approved HIGH-RISK build: locked "Send to crew" for coms-pwa. Also coms_check ET bug.
**Status:** DONE (both built, draft PRs); owner steps + VM re-test pending
**Repos:** 0xSneaks/muse-tune-up @ claude/muse-persistent-browser-service-87tea6 (609d908; another claude-code session added tests in 3528f79) · 0xSneaks/coms-pwa @ claude/locked-send (0a457a9, [draft PR #1](https://github.com/0xSneaks/coms-pwa/pull/1)) · ai-coms tools/coms_check.py

## Did
- PR #13 fixes for Muse VM round 1 + ChatGPT CHANGES REQUESTED: supervised relay app by default; API token on every endpoint; scrubbed errors; pm2 dump chmod 600 (VERIFIED pm2 writes 644); VM-TEST round 2 (no `pm2 kill`, no forced removal); smoke step 8 hostile page — VERIFIED sandbox: 50 tests, smoke 8/8 — PR comment 6393603695
- coms-pwa locked send: WebAuthn passkey (UV required, owner only), stateless HMAC challenges bound to the exact order text, create-only order file (replay guard), [sneaks → all] board line with sha-retry, setup page, UI button — VERIFIED sandbox: 15 unit tests (real P-256 software passkey; forged/replayed/expired/no-UV/swapped-text all refused; 5 mutation checks caught), Chromium e2e 5/5 with virtual authenticator
- coms_check.py: compares in ET and ages requests in hours from the note timestamp (was flagging same-evening requests as "1 day old") — 9 tests OK

## State (evidence)
- muse-tune-up `ops/browser`: 50 OK (57 after the other session's tests), smoke 8/8 — sandbox only.
- coms-pwa `npm run check` 15/15, `node test/e2e-send.mjs` 5/5 — sandbox only; GitHub faked.
- UNKNOWN: Vercel runs `api/*.js` web handlers on this project (INFERENCE until a preview build); real iPhone; real ai-coms write.
- Deployed: no. Merged: no. Env vars/tokens/passkey: untouched.

## Decided
- Bind the order text hash into the Face ID challenge (not in spec; closes "approved tap, swapped text") — claude-code (decider)
- Counter check not relied on (iCloud passkeys report 0); create-only order file is the replay guard — claude-code
- x402 Paying Agent not built: request has no "✅ Sneaks APPROVED the build" marker → Blockers

## Next (start here)
1. Sneaks: coms-pwa owner steps (README "Owner steps" / PR #1): token, 3 env vars, merge+deploy (your yes), passkey on iPhone, OWNER_PASSKEY.
2. codex or chatgpt: adversarial review of coms-pwa PR #1 (request on board).
3. Muse: VM-TEST round 2 on PR #13 (request on board); 10-min orders/ poll (claude's note 0045).
4. claude-code next: stack-picks #1 LLM Panel (still OPEN).

## Don't
- Don't merge/deploy coms-pwa #1 or set its env vars without Sneaks.
- Don't put tokens in the repo or a handoff; name variables only.

## ⚠️ High-risk
- coms-pwa #1 is auth + credential + production. Needs: independent review, then Sneaks's yes for merge/deploy/env/passkey. Note: orders are passkey-authenticated, but any agent with board write access can still type a "[sneaks → all]" line by hand — the order file's "verified by Face ID passkey" text plus the commit from the coms-pwa token is the evidence, not the board line alone.
