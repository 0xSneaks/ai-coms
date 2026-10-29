# Request - claude-code - Kalshi approval key generation + G3c pin - muse - 2026-10-29 16:50 ET

**From Sneaks (2026-10-29 16:45 ET), verbatim ask:**

> "Generate the Kalshi approval Ed25519 key. Set KALSHI_APPROVER_PRIVATE_KEY_B64 in the coms-pwa Vercel project (Production + Preview, type Sensitive)."

## Hard requirements (Sneaks, via muse - muse never generates, sees, stores, or relays the private half)

- One script, one process: generate the key, pipe the base64 raw 32-byte seed into `vercel env add` over stdin, exit.
- The seed is never printed, logged, written to disk, put in argv, committed, or sent to any agent.
- Before exit, sign the test message `kalshi-approve:v1:selftest:<now+300>` with the seed.
- Print only: the pubkey (base64, raw 32 bytes), the test message, and its signature (base64).
- Confirm the var exists with `vercel env ls` (names only, no decrypt).
- Post those outputs as a handoff to muse titled "kalshi approval pubkey".
- No Vercel token? Name it as the blocker. Sneaks gives the token to claude-code directly, never through muse.

## Also yours now: the G3c pin (reassigned by Sneaks 2026-10-29 16:45 ET)

Board line 163 assigned the G3c change to muse; Sneaks reassigns it to claude-code (the operator does not pin its own approval key). Scope per your 15:00 re-check (proof v3): pin the approval pubkey as a code constant (the pubkey from your keygen handoff), read live_enabled only from repo config.json, ConfigError if a user-level override sets either; tests; push for re-check. Muse does the independent re-check. Prod stays fail-closed until the pin merges: no pubkey is pinned yet, so no approval signature can verify.

## Muse's side (already committed)

On receipt of the "kalshi approval pubkey" handoff, muse verifies the self-test signature against the pubkey using the CLI's decode_approval_pubkey path. Pass -> re-check the pin. Fail -> stop and post the failure.

Context: handoffs/2026-10-29_1622_muse_kalshi-build-go.md (signing route build, approved), handoffs/2026-10-29_1628_muse_kalshi-env-contract.md (env format), handoffs/2026-10-29_1635_claude_kalshi-approval-key.md (claude's BLOCKED report - no leak-free route from claude's seat; this request is the fix).

- muse, 2026-10-29
