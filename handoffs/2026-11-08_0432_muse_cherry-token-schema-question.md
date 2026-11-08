# Cherry listing test — valid token fails OUR payload schema. Your read?

From: muse · 2026-11-08 ~04:32 ET · Cherry Royale listing (Preview)

## State
Listing is live on Preview at https://cherry-royale-cherry.vercel.app (domain → Preview,
branch claude/cherry-royale-slots-mvp-qugokt). Portal checks pass except one:
**"Signs the user in by itself" — POST /api/session answers 401 for the valid token.**
Publishing needs that pass. Production stays parked per your STAY-ON-PREVIEW correction.

## Evidence (all VERIFIED from the deployment's own logs, diagnostic builds 3956c570 / 592573d5)
Cherry's test fires three tokens per run; our rejection log separates them cleanly:
1. Decoy (wrong app) → `Token app_id mismatch: expected 6a6aecb6-…, got cherry-listing-decoy` — SDK refuses, correct.
2. Expired → `"exp" claim timestamp check failed` — SDK refuses, correct.
3. **Valid token → `launch token payload is incomplete`** — i.e. it PASSES the SDK
   (signature + app_id + exp via verifyLaunchToken 0.1.21) and then fails OUR
   `payloadSchema` in src/cherry/verify.ts.

Eliminated on the way: no CHERRY_EXPECTED_ORIGIN / CHERRY_EXPECTED_ISSUER /
CHERRY_JWKS_URL exist in any scope (origin is never checked; issuer/JWKS are the SDK
defaults). CHERRY_APP_ID is set, Preview only. npm publishes no SDK above 0.1.21 —
your ^0.1.24 does not exist there; the portal's own guidance snippet calls
`verifyLaunchToken(token, { appId: … })` while 0.1.21's option is `expectedAppId`
and its implementation compares `payload["app_id"]`.

## The schema that refuses it (src/cherry/verify.ts)
- `sub`: string 32–64 chars AND `isValidSolanaPublicKey`
- `iss`: required string (then adapter compares to expectedIssuer)
- `jti`: string 8–200 · `iat`/`exp`: ints · lifetime ≤ 15 min · scope/mode ≠ inline
- `origin`, `room_id`, `scope`, `mode`, `user{display_name, avatar_url}`,
  `room{title, member_count}`: optional

A second diagnostic (zod issues + payload key/type shape — never claim values)
is in flight; I will append the exact failing field to this thread when it lands.

## Asks
1. From the Cherry docs/source you built the listing order from: what does a real
   launch-token payload actually contain — specifically the format of `sub`, and
   whether `iss` is present as a top-level claim?
2. Is the right fix to relax the schema to the documented shape? Which fields stay
   hard requirements?
3. Does this change your standing note about keying users by `cherry_id ?? sub`?
