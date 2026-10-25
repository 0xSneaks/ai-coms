# Handoff — coms-pwa — chatgpt — 2026-10-25 02:02 ET

**Task:** Owner asked to fix PR #1 and then asked whether to redeploy. **Status:** independent hardening patch built as [draft PR #2](https://github.com/0xSneaks/coms-pwa/pull/2), GitHub CI PASS; PR #1 still draft, not production-ready pending PR #2 integration and owner yes.

## Did
- VERIFIED: read AI COMS v2 BOARD, RULE, inbox, project and Claude Code 01:46 handoff; claimed unowned work; did not touch claude/locked-send.
- VERIFIED: original four ChatGPT findings were corrected in Claude Code's PR #1 `a55e919` (replay, fail-closed owner, board repair, bounded request). GitHub Actions run 40166746095 = success; Vercel preview at exact SHA READY (build only).
- VERIFIED: discovered additional integrity edge case at `lib/order.mjs:120-145`: HTTP 422/409 on order creation was treated as proof of an already-present order without verifying its existence/content. A validation 422 could cause a BOARD request pointing to a nonexistent order.
- VERIFIED: created branch `chatgpt/order-collision-guard-2026-10-25` from a55e919 and [draft PR #2](https://github.com/0xSneaks/coms-pwa/pull/2) **targeting claude/locked-send**; `lib/order.mjs` GETs purported existing order and compares exact content before replay/repair, refusing nonexistent or tampered files; added two regression tests in `test/send.test.mjs`.
- VERIFIED: GitHub Actions `check` for head `3f4c6fbc7d77f10f5cd0e205306625b7f9be1f03`, run [40167607279](https://github.com/0xSneaks/coms-pwa/actions/runs/40167607279), completed success, including npm ci and npm run check. PR #2 reports mergeable true. No direct physical iPhone or real GitHub order test.
- VERIFIED: posted PR #1 [re-review comment](https://github.com/0xSneaks/coms-pwa/pull/1#issuecomment-6394184562).
- VERIFIED: owner said a `GITHUB_TOKEN` had been saved in Vercel. ChatGPT did not inspect, fetch, or change its value.

## State + proof
- PR #1 remains OPEN/DRAFT @ `a55e919`, and PR #2 remains OPEN/DRAFT @ `3f4c6fb` targeting PR #1 branch. Original four regressions addressed; fifth integrity edge case is patched in PR #2 but **not yet part of PR #1**.
- Automated remote CI = SUCCESS for both commits; **UNKNOWN**: physical iPhone passkey, live GitHub order/write, actual Vercel function invocation, real production Send.
- **No merge, production redeploy, env-var modification, token access, or credential registration.** Owner's explicit authorization still required.

## Decided
- Follow AI COMS non-overlap: do not push Claude Code's branch; offer isolated PR #2 to integrate into it.
- HOLD merge/redeploy until PR #2 reviewed/incorporated, PR #1 retested at new head, and Sneaks explicitly says yes.
- Saving a narrow GitHub token as a Sensitive Production Vercel var is standard configuration; it is not equivalent to deploying PR #1.

## Next (exact first step)
1. Claude Code (or Astra if Claude Code offline): review and merge **PR #2 into `claude/locked-send`** (not production main), then run CI; record PR #1's new SHA.
2. ChatGPT: verify latest PR #1 head and Vercel function routing (safe unauthenticated negative tests); advise Sneaks if review gates clear.
3. Sneaks: explicit yes separately for production merge/deploy; passkey setup later. No need to recreate GitHub token.

## Don't
- Don't push into Claude Code's branch or merge into main without owner authorization.
- Don't request/publish secrets or trust a board line alone as proof of owner WebAuthn approval.
- Don't declare production Send or iPhone Face ID verified until those tests actually run.

**⚠️ HIGH-RISK:** Auth, credentials, and production. No actual credentials touched.
