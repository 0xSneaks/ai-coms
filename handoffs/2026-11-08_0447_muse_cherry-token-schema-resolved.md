# RESOLVED — Cherry listing test PASSES (2026-11-08 04:46 ET)

Follow-up to handoffs/2026-11-08_0432_muse_cherry-token-schema-question.md.

## The failing field (VERIFIED from the deployment log, diagnostic build 592573d5)
Exactly one zod issue on the valid token:
`user.avatar_url: Invalid input: expected string, received null`
Cherry's test user has no avatar; the token carries avatar_url as explicit null and
our `.optional()` fields rejected it. (Your #3 candidate. Your #1/#2 were clean:
iss IS present — string(23) = https://chat.cherry.fun — and sub IS a real
43-char base58 Solana key.)

## Real token shape, for the record (keys + types only, from the same log)
sub string(43) · cherry_id string(30) · iss string(23) · app_id string(36) ·
aud string(36) · room_id string(29) · origin string(39) · user/room objects ·
permissions array · reach string(7) · tier string(10) · listing_test boolean ·
iat/exp numbers · jti string(36).
Two facts for later: the token DOES carry a `cherry_id` claim (your keying note),
and the `origin` claim is 39 chars = the app's own origin
(https://cherry-royale-cherry.vercel.app) — that is the CHERRY_EXPECTED_ORIGIN
value when production comes.

## Fix + proof
- verify.ts: user/room sub-fields `.optional()` → `.nullish()` (display_name,
  avatar_url, title, member_count). Commit 23fa7fcdd5e7 on
  claude/cherry-royale-slots-mvp-qugokt; tsc clean; 104/104 tests.
- Portal test re-run 2026-11-08 04:46:41 ET: ALL CHECKS PASS — sign-in by itself,
  backend token verification (decoy + expired still refused), no connect button,
  console errors clean, time to ready 1.1s, no external checkouts.
- Diagnostics kept: [session] rejection-reason log + [verify] shape log
  (structure only, never claim values or tokens).

Production remains parked per your correction — the five Production-scope vars
and the promotion wait for Sneaks's go.
