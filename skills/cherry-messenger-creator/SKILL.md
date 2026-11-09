---
name: cherry-messenger-creator
description: Come up with a Cherry messenger (cherry.fun) mini-app idea, route the build to Sneaks's agents, and finish with exact portal upload steps and copy for every field.
---

# Cherry Messenger Creator

Idea → build by agents → live in Cherry → Sneaks gets a field-by-field upload sheet.
Triggers: "cherry messenger creator", "new cherry app", "make a cherry mini app", "idea for cherry".

Label every platform claim: VERIFIED (read today in docs/code/live URL) · OBSERVED (seen in Sneaks's portal session, may change) · ASSUMPTION. Never invent field names, limits, fees or IDs.

## Phase 0 — Check coms
Check in on 0xSneaks/ai-coms (BOARD.md + projects/<slug>.md). Respect claims. Add a claim for `cherry-<slug>`.

## Phase 1 — Idea
1. If Sneaks gave an idea, sharpen it. If not, generate 3.
2. Each idea must use Cherry's edge: it runs inside a chat room. Use room context (room id, title, member count) as the growth loop — group play, room leaderboards, room-vs-room, share-to-room.
3. Score each: fun in 10 seconds · room/social hook · build size (S/M/L) · money risk · Cherry fit on a 360px phone.
4. Verdict per idea: KILL / PARK / TEST / BUILD, one line of evidence + cost.
5. Name check: search Cherry + web for the name. ("SOL Miner" was already taken by a Cherry group.)
6. Default to PLAY-CREDITS mode first. Real SOL only behind a flag, after adversarial review.
7. Hard no: rewards paid from new players' deposits (Ponzi-shaped), fake APR/rewards, "mining" claims that imply real SOL issuance, hidden fees.
8. Lock the pick with Sneaks in one yes/no (batch with the Phase 2 Sneaks items).

## Phase 2 — Spec + Sneaks-only items (batch in ONE message)
Write `projects/cherry-<slug>.md` on the board: name, one-line pitch, loop, screens, play-credit rules, what's out of scope.
Ask Sneaks only for things that need his identity:
- Create the mini app in the Cherry portal (see Phase 5 steps 1–4) to get the **App ID**. Post App ID + project ID on the board (not secrets).
- Create repo `0xSneaks/cherry-<slug>` or approve an agent creating it.
- Final name. For real-money apps: where rewards come from + fee wallet (default sneaks.skr — confirm per app).

## Phase 3 — Build (route to agents, Sneaks is not the relay)
Post tasks on the coms board with bounded files per agent. Conserve Claude: give UI/scaffold to OpenCode (DeepSeek — no "check coms" line in its prompt) or Codex; Claude Code/Codex own auth + money; Muse owns Vercel/deploy/live checks. Overflow/cheap models never touch auth, signing or payout code.

Build contract every agent gets (re-verify against the current `@cherrydotfun/miniapp-sdk` README before coding):
- Next.js (or plain web), mobile-first 360px, dark theme, skeleton on first frame.
- SDK `@cherrydotfun/miniapp-sdk` latest (+ /react, /solana if needed).
- CSP on every HTML response: `frame-ancestors 'self' https://chat.cherry.fun https://cherry.fun https://*.cherry.fun`. No X-Frame-Options. (OBSERVED portal requirement)
- `public/.well-known/cherry-app.json` → `{"appId":"<App ID>"}`, 200 JSON, no redirect. (OBSERVED)
- Inside Cherry: NO connect-wallet button, NO signMessage login — the portal test fails on either. (OBSERVED)
- Backend `verifyLaunchToken(token, { appId })`; reject wrong aud/iss/app_id or expired. Issuer `https://chat.cherry.fun`, keys `https://chat.cherry.fun/.well-known/jwks.json`. Exchange the launch token once for your own session; token in memory + Authorization header, no cookies in the frame.
- Key users by `cherry_id ?? sub`, not the wallet.
- Server-authoritative game state, ledger table, idempotent claim endpoints, tests for the math and double-claim.
- Standalone (plain browser) path works but is second-class.
- Real SOL only (flagged, reviewed): Cherry wallet adapter/signer; show action + amount before signing; tx label ≤80 chars; `withAppReference(ix, APP_ID)` on one instruction; respect unverified-tier limits; never approvals/delegation, authority changes, durable nonces, subscriptions; handle USER_REJECTED / POLICY_DENIED / PRECHECK_UNAVAILABLE with clear messages, no retry loops; do not put Cherry's platform fee inside txs (OBSERVED: billed to the developer separately).
- Compliance: block CU, IR, KP; link the portal-hosted Terms + Privacy from the app's portal integration doc.

## Phase 4 — Verify (evidence, not claims)
Muse deploys to Vercel PREVIEW first (every env var set on the target, or boot = 500). Then check and paste results on the board:
- `/api/health` shows Cherry identity configured
- `/.well-known/cherry-app.json` → 200 JSON with the right appId
- frame-ancestors header present on `/`
- 360px dark render, no connect-wallet inside Cherry
- typecheck, tests, build pass
Money paths: implementation → adversarial review by a different agent → independent verification.
Only then tell Sneaks to press the portal checks.

## Phase 5 — Final deliverable: Upload Sheet
End with this sheet, filled with real values. Short command verbs. One block per screen. Mark any field not yet seen as "(if shown)".

Make the images first (from the app's own art): **icon 512×512 PNG**, **cover 1200×630 PNG**.

```
CHERRY UPLOAD — <APP NAME>

1. Open portal.cherry.fun → ☰ → Mini apps (four squares).
   Not "Chat embeds", not "API keys", not "Developer profile".
2. Tap Create / New mini app.
3. Category: <Games | other best fit>
4. Icon: upload <slug>-icon.png
5. Cover: upload <slug>-cover.png
6. Name: <APP NAME>
7. Slug (if shown): <slug>
8. One-line pitch: <≤ 90 chars>
   Short version if the box is tight: <≤ 50 chars>
9. Description (if shown): <2–3 sentences: what it is, how you play, play credits / fees stated plainly>
10. Tap Continue.
11. Copy the App ID + project ID → post on coms board. (Not secrets.)
12. Where your app runs: <https://...vercel.app> → Add.
13. Permissions (if shown): <none | exact list the app uses>
14. WAIT until Muse posts "live" on the board.
15. Tap Run checks. Then Run the test.
16. Screenshot any red result → send it.

Skip: Website "Verify" (badge only, optional).
Never share: anything labeled secret, private key, API key.
```

If the portal shows a field not on this sheet, ask Sneaks for a screenshot and map it — never guess.

## Phase 6 — Sign off
Handoff file + project file + BOARD.md line + release claim. Report to Sneaks: what's live (with evidence), the Upload Sheet, and the ≤3 things only he can do.
