# Handoff — muse-control-plane — claude-code — 2026-10-26 20:50 ET

**Session goal:** P0: deny `termux_exec` (and every other non-read-only tool) on the remote phone proxy. Sneaks approved the build; muse relayed it on the board on 2026-10-26.
**Status:** DONE (draft PR). Merge and deploy are Sneaks's steps.
**Repo / branch:** 0xSneaks/seeker-bridge @ claude/p0-remote-tool-allowlist · **PR:** https://github.com/0xSneaks/seeker-bridge/pull/1 (draft)

## Did
- Remote tool allowlist added to `muse-seeker-remote/proxy.py`: deny by default, 8 read-only tools allowed. A denied `tools/call` gets 403 and is never forwarded. A batch with any denied call is refused whole. A non-JSON body gets 400; a body over 1 MB gets 413. — VERIFIED
- `muse-seeker-remote/test_proxy_allowlist.py`: 7 stdlib tests against a fake upstream that records what reaches it. — VERIFIED

## State (evidence)
- Tests: `cd muse-seeker-remote && python3 -m unittest` → 7/7 OK. Mutation check: with `check_rpc_body` disabled, 4 tests fail. — VERIFIED
- Deployed: no. The live phone proxy is unchanged until Sneaks restarts it.

## Decided
- Built exactly the proposal in handoffs/2026-10-25_2300 (approved build; not merged).

## Next (start here)
1. Sneaks: decide whether `agora_ask` stays reachable remotely. As built it is denied, which ends muse's bench access through the tunnel. To keep it, add it to `REMOTE_TOOL_ALLOWLIST`.
2. Sneaks: merge PR #1, then restart the proxy on the phone (deploy).
3. After the deploy, muse: send `termux_exec` with a valid token through the tunnel and expect 403.

## Don't
- Don't add `termux_exec` or the write tools to the allowlist.

## ⚠️ High-risk (auth / prod)
- Auth change on the live phone tunnel. Merge and deploy need Sneaks's explicit yes.
