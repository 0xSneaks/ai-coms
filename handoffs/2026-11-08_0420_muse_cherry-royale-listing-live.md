# Cherry Royale listing — LIVE on Preview (Muse sign-off)

Date: 2026-11-08 ~04:20 ET. Order source: handoffs/2026-11-08_0352_claude_cherry-royale-listing.md.
Owner decisions during execution: (1) no "for fun only" anywhere — pay-to-play game;
(2) standalone free-play seat DELETED — Cherry players only; (3) STAY ON PREVIEW, do NOT
promote to production (Claude correction, relayed by Sneaks 04:05 ET).

## Legs
- MERGE: claude/cherry-listing (csp.ts frame-ancestors + public/.well-known/cherry-app.json)
  merged into deploy branch claude/cherry-royale-slots-mvp-qugokt. Final branch HEAD
  0f004bba2410602857410fcdcb44e533dd55bb81 (seat removed; Settings "entertainment only"
  line also removed). tsc clean, vitest 104/104.
- ENV: CHERRY_APP_ID=6a6aecb6-8927-40bd-adaf-c00e14e6b661 set on cherry-royale-cherry,
  Preview scope only. CHERRY_DEV_IDENTITY not set. No fee-receiver variable set; the
  built-in receiver FtuidxSaoNDeTuNTDuf9jLACVwqjgQeBwKTYC54f3GYp @300bps untouched.
- DEPLOY: domain cherry-royale-cherry.vercel.app connected to the Preview environment,
  branch claude/cherry-royale-slots-mvp-qugokt, serving Preview deployment of 0f004bba
  (cherry-royale-cherry-qbg0wis4f-phantomcapais-projects.vercel.app). Vercel Authentication
  (Deployment Protection) disabled for the project so the app is publicly reachable —
  Cherry's checks are anonymous.
- PROMOTE-TO-PRODUCTION: NOT DONE, on purpose. A promote rebuild boots strict production
  and 500s: Production scope lacks CHERRY_ROYALE_SERVER_SECRET, DATABASE_URL, APP_URL,
  CHERRY_EXPECTED_ORIGIN. It briefly went live (f096ea90) and was replaced by the Preview
  route above. Production stays parked until Cherry confirms the launch-token `origin`
  value for CHERRY_EXPECTED_ORIGIN. HIGH-RISK, needs review (per Claude's correction).

## Checks (run by Muse anonymously, 2026-11-08 ~04:19 ET)
- GET /api/health -> 200 {"ok":true,"env":"preview","database":"postgres","cherryIdentity":"configured","devIdentity":false}
- GET /.well-known/cherry-app.json -> 200 {"appId": "6a6aecb6-8927-40bd-adaf-c00e14e6b661"}
- GET / -> 200, Content-Security-Policy frame-ancestors 'self' https://chat.cherry.fun https://cherry.fun https://*.cherry.fun
- GET / anonymous -> the Cherry-only gate page ("Open CHERRY ROYALE inside Cherry ... Launch
  CHERRY ROYALE from a Cherry room to play."). No standalone seat, by owner order.

## Remaining
- Sneaks, in the Cherry portal (his phone, Jupiter wallet session): paste
  https://cherry-royale-cherry.vercel.app -> Add -> Run checks -> Run the test.
- Portal sign-in is wallet-only (Jupiter); Muse cannot and does not sign with his wallet.
- Later (Claude's list): key users by cherry_id ?? sub; SDK 0.1.21 -> ^0.1.24; portal-hosted
  Terms + Privacy links in footer. Production env completion after Cherry confirms origin.

Closes the free-play builder lane's BOARD claim (b332c206) — superseded by owner order.
