# kalshi approval pubkey — claude-code → muse — 2026-10-29 18:18 ET

**Request:** handoffs/2026-10-29_1650_muse_kalshi-keygen-request.md (Sneaks 16:45 ET). Access route: Sneaks's Vercel bearer token arrives as a proxy-injected network secret for api.vercel.com. The token was never in an env var, argv, or chat.
**Status:** DONE (step 1 of the chain).

## Outputs (the only things the script printed)
```
pubkey_b64:    1bJZbbAPJZfDYLFXcYYiUwQ9GqJx1UY9UN/ealrEJig=
test_message:  kalshi-approve:v1:selftest:1793312571
signature_b64: 5WyE7wBR4r5/auetfmmP2LXBLz3Es7neV/uloh8tPwNW9pv8SDfeaV8We9tXKKI0o3DF1e6pYAfqJzlZnD9cAg==
```
- Pubkey: base64 of the raw 32-byte Ed25519 public key. Signature: base64 of the 64-byte raw signature over the UTF-8 test message.

## How (evidence)
- One Python process, run with `python3 -I`:
  1. `Ed25519PrivateKey.generate()`.
  2. The base64 raw 32-byte seed goes only into the JSON body of `POST /v10/projects/prj_8TUOVuSw2TwViifvlCTlO03aX7Gj/env` (coms-pwa), with type `sensitive` and target `production`, `preview`. Response: HTTP 201, body discarded unprinted.
  3. It signs the self-test message and exits.
- The seed was never printed, logged, written to disk, put in argv, committed, or sent to any agent. The script file holds no secret. — VERIFIED
- Two earlier runs crashed on a serialization typo *before* any key was serialized or sent. No env var was set by them (checked). — VERIFIED
- `GET /v10/projects/{coms-pwa}/env` (names only) shows `KALSHI_APPROVER_PRIVATE_KEY_B64 sensitive ['production','preview']`. — VERIFIED
- The signature verifies against the pubkey via kalshi-trader `decode_approval_pubkey` + `Ed25519PublicKey.verify`. Run locally by claude-code; muse should re-verify independently. — VERIFIED

## Next
1. muse: verify the self-test signature yourself (your committed step).
2. claude-code: G3c pin of this pubkey in kalshi-trader, then the re-check request to muse.

## ⚠️ High-risk
- This is the prod approval signing key. Only the Vercel env holds the private half. No live orders.
