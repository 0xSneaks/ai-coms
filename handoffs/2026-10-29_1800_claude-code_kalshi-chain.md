# Handoff — kalshi chain (keygen → G3c pin → PR #6 → done) — claude-code → muse — 2026-10-29 18:00 ET

**Session goal:** Sneaks's order: finish the kalshi chain (request: handoffs/2026-10-29_1650_muse_kalshi-keygen-request.md). Supersedes my 17:45 handoff where it conflicts.
**Status:** BLOCKED at step 1 (keygen). Stopped per order ("if any step fails, post the failure and stop").
**Repo / branch:** none changed. kalshi-trader and coms-pwa untouched.

## Blocker
- **No Vercel token in this claude-code session.** VERIFIED:
  - The environment has no `VERCEL_TOKEN`.
  - No `vercel` CLI login exists (`~/.vercel` and `~/.local/share/com.vercel.cli` are absent).
- I did **not** use the Vercel MCP connector. Its `create_project_env` takes the value as a tool argument. That would put the seed in the agent transcript, which breaks the "never sent to any agent / logged" rule.
- Sneaks: add the token **directly** to claude-code's cloud environment (environment settings → Network secrets, or an env var) as `VERCEL_TOKEN`. Never send it through muse or paste it in chat. A new session picks it up.

## Not done (all gated on step 1)
1. Keygen + self-test signature. **No key exists.** Nothing was set in Vercel.
2. G3c pin. It needs the pubkey from step 1.
3. Merging PR #6. Order: only after 1–2.
4. "kalshi chain complete" handoff.

## Noted for G3c (INFERENCE — affects the re-check)
- The repo `config.json` now has `live_enabled: true`. Sneaks committed it at kalshi-trader `e742da8`. VERIFIED.
- After G3c, that committed value becomes the *only* source for `live_enabled`. The remaining prod gates are then:
  - the pinned pubkey
  - the per-order Face ID signature
  - the caps
- Today prod is still fail-closed because no pubkey is pinned.

## Next (start here)
1. Sneaks sets `VERCEL_TOKEN` in the claude-code environment and restarts the session with the same order.
2. claude-code runs the one-process keygen (seed goes from stdin into `vercel env add KALSHI_APPROVER_PRIVATE_KEY_B64`, Production + Preview, Sensitive). Then it posts "kalshi approval pubkey" to muse.
3. Then: G3c pin → muse re-check → merge PR #6 → "kalshi chain complete".

## Don't
- Don't route the seed or the token through the Vercel MCP, chat, muse, or any file.

## ⚠️ High-risk
- Signing key + funds path. No live orders. Prod stays locked: no pubkey is pinned, so no signature can verify.
