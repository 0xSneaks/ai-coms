# Handoff — chatgpt — coms-pwa / muse-tune-up — 2026-10-25 01:38 ET

**Mode:** independent security review. **AI COMS:** v2 DECIDE-1024, RULE.md and inbox read. **Claim:** released at sign-off.

## Did
- VERIFIED: reviewed 0xSneaks/coms-pwa draft PR #1 (`claude/locked-send` @ `0a457a9`): handlers, HMAC, WebAuthn, GitHub write, client, CSP, tests, package and Vercel config.
- VERIFIED: published **one** adversarial PR comment with file:line proof: https://github.com/0xSneaks/coms-pwa/pull/1#issuecomment-6393989642
- VERIFIED: Vercel's Git integration automatically produced READY preview dpl_6Dzu2qeLe2cK2Ft5JKfb1bhP6fBU, `framework:null`, target preview, same PR head. No reviewer deploy; runtime invocation not tested.
- VERIFIED: checked muse-tune-up PR #13 and five discussion comments. Round-1 WORKS/FAILS posted; round-2 VM results absent as of this check. PR #13 already merged by Sneaks's instruction; no ops/browser edits.
- VERIFIED: configured hourly conditional automation to check PR #13 for Muse round-two table, report it and post exact fixes under BOARD Requests without duplicates.

## State + proof
- **CHANGES REQUESTED / NOT READY for production Send.** Findings in PR comment:
  1. BLOCKER VERIFIED: nonce-replay file path incorporates current minute (`challenge-token.mjs:16`, `handlers.mjs:176`, `order.mjs:55-57`), allowing same assertion another order at minute change before 2-minute expiry. Current unit test replays only at fixed timestamp.
  2. HIGH VERIFIED: malformed nonempty `OWNER_PASSKEY` parses to null so setup may remain open while `SETUP_CODE` remains (`handlers.mjs:40-49,100`).
  3. MEDIUM VERIFIED: order file created but board retry fails => orphan order / no replay-based repair (`order.mjs:107-134`), and poller is OPEN.
  4. LOW VERIFIED: body size checked only after `request.text()` (`handlers.mjs:80-81`).
- VERIFIED source controls: WebAuthn UV + RP/origin + owner credential, purpose/HMAC/order binding, same-origin/JSON/CSRF guard, SHA retry, constrained CSP, server-only GitHub bearer token.
- VERIFIED doc compatibility: Vercel documents root `api/*.js` named POST handlers with ESM package; **UNKNOWN:** actual runtime invocation on preview, iPhone, GitHub token scope and ai-coms production write.
- **No merge, prod deploy, env var changes, passkey registration or token handling performed.**

## Decided
- Reviewer decision: ask Claude Code to correct critical replay and setup fail-open, with regression tests, before Sneaks authorizes production. Owner decides auth/prod.
- Continue user walkthrough **one owner action at a time** starting with fine-grained GitHub token; never solicit its value in chat.
- Muse VM-TEST round 2 remains OPEN and externally monitored hourly; no speculative pass/fail summary.

## Next
1. Claude Code (or Astra if coordination needed): fix PR #1 replay and malformed-owner cases, then partial-delivery UX; request a fresh review.
2. Sneaks: perform Owner Step 1 in GitHub (scoped PAT, ai-coms Contents read/write only). Keep it private; confirm completion without sharing value. Merge/deploy only after fixes and explicit yes.
3. On Muse PR #13 round-2 WORKS/FAILS arrival, summarize verified VM evidence and write a precise OPEN fixes request for Claude Code under BOARD.md.

## Don't
- Don't push to Claude Code's branch; don't edit `ops/browser`, or infer VM tests passed.
- No secrets, no credential registration, no env changes, no merge/deploy without Sneaks's separate approval.

**⚠️ HIGH-RISK** — passkey/auth, token, GitHub repo write, production Send are owner-only.
