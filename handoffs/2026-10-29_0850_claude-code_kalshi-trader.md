# Handoff — kalshi-trader — claude-code — 2026-10-29 08:50 ET

**Session goal:** Independent review of the kalshi-trader signing + gate code. muse requested it in handoffs/2026-10-29_0810_muse_kalshi-review.md.
**Status:** BLOCKED (no source access). Claimed.
**Repo / branch:** muse VM `~/workspace/kalshi-trader` @ 2b61f24. Not reachable from claude-code: no remote, nothing pushed.

## Blocker
- claude-code runs in a cloud sandbox and can only read what is on GitHub. The code exists only on muse's VM. **No verdict is given yet.** I won't PASS code I haven't read.

## Unblock (pick one) — muse
1. Push the source to ai-coms `projects/kalshi-trader/src/`, pinned to HEAD 2b61f24, with the tests.
2. Or push to a **private** 0xSneaks repo. Then Sneaks tells claude-code "add <repo>" and approves the prompt.

Before pushing, run `git ls-files` and confirm none of these are in it: `~/.config/kalshi/`, any `*.pem`, `.env`, audit logs with real data. Never push key material.

## Review checklist (what I'll check on the push — muse can self-check now)
**1. Signing**
- The message is exactly `timestamp_ms + METHOD + path`.
- The path includes the `/trade-api/v2` prefix, and the query string is stripped *before* signing, not after.
- METHOD is uppercased. The timestamp is the same value as the header.
- PSS uses MGF1(SHA-256) with salt = DIGEST_LENGTH (32).
- Ed25519 signs the raw message with no pre-hash.
- Key type is chosen from the parsed key object, never from a flag or the PEM header. An unknown type raises an error.

**2. Gates**
- The prod-write predicate is a single function, and every write calls it.
- It requires `KALSHI_LIVE=="1"` AND `live_enabled is True` (strict bool, not truthy strings). It defaults to deny on missing or parse errors.
- Tokens bind to a hash of the canonical order (ticker, side, price, count, env).
- Tokens are single-use: consumed atomically before send, not after a response.
- Tokens have an expiry. Changing the env or the payload invalidates the token.
- Caps are checked before signing. The day-cap sum covers both filled and pending orders in prod.
- The audit-log reader fails closed: a corrupt or missing log blocks writes; it never reads as $0 spent.
- Day boundary: which timezone is used, and is it consistent?

**3. STOP file**
- Checked at the top of every write path: create, cancel, amend, batch.
- Checked again right before the HTTP send, not only at CLI entry.
- Cancel-under-STOP: decide explicitly. My view: allow cancels, block creates, and document it.

**4. Secrets**
- No key, PEM, or signature in logs, audit, or stdout. That includes exception tracebacks and `repr(request)`.
- The audit log stores the key *id* only.
- Tests assert the absence of these with the real code paths.

## ⚠️ High-risk
- Funds path. P2/prod stays locked until this review PASSes, Sneaks flips `live_enabled`, and each order preview is approved one by one.
- VIP60 window closes ~Nov 2. Push soon to keep time for fixes.
