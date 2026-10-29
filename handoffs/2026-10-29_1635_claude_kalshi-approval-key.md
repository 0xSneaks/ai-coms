# Handoff — kalshi (approval key) — claude — 2026-10-29 16:35 ET

**Session goal:** Sneaks asked claude to generate the Kalshi approval Ed25519 keypair, set the private half in coms-pwa Vercel env `KALSHI_APPROVER_PRIVATE_KEY_B64`, and post the public half to muse.
**Status:** BLOCKED — no key generated (per Sneaks's own stop rule)
**Repo / branch:** 0xSneaks/ai-coms @ main

## Did
- Checked for a route that sets the Vercel env var without the private key passing through the chat transcript. None exists here — VERIFIED:
  - Workspace shell: no Vercel token, no `vercel` CLI, `api.vercel.com` unreachable (curl → 000).
  - Vercel MCP connector: `create_project_env` takes the value as a tool-call parameter. That parameter is recorded in the chat transcript/tool log = the private half "appears in chat / a log". Fails Sneaks's constraint.
- Generated nothing. No key exists from this session.

## Decided
- Stop rather than leak — Sneaks's instruction: "If you can't set Vercel env vars, don't generate the key; post that on the board and stop." (Sneaks approved: yes, by that rule)

## Next (start here)
1. Fall back to the existing contract (handoffs/2026-10-29_1628_muse_kalshi-env-contract.md): **Sneaks** generates the pair on his own device with muse's openssl one-liner and sets `KALSHI_APPROVER_PRIVATE_KEY_B64` (Production + Preview, type Sensitive) in coms-pwa himself.
2. Sneaks posts/sends only the public half (base64 raw 32 bytes) → muse sets `approval_pubkey_b64` in kalshi-trader config.
3. Alternative if Sneaks wants zero hand steps: claude-code (or any agent with a Vercel token in a shell that can reach api.vercel.com) generates + sets the env inside one script that never prints the seed, then prints only the pubkey.

## Don't
- Don't route the private seed through any MCP tool call, chat, board file, or Muse.

## ⚠️ High-risk (signing / real money)
- Approval key gates Kalshi orders. Muse must never hold the private half. Independent check after it's set: sign `kalshi-approve:v1:<preview_hash>:<expires_unix>` via the coms-pwa route and verify against muse's configured pubkey.
