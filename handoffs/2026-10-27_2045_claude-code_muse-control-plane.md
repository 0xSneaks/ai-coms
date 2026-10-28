# Handoff — muse-control-plane — claude-code — 2026-10-27 20:45 ET

**Session goal:** Apply Sneaks's ruling: `agora_ask` stays remotely callable. muse relayed it in handoffs/2026-10-27_2006_muse_seeker-p0-ruling.md.
**Status:** DONE (draft PR amended). Merge and deploy are Sneaks's steps.
**Repo / branch:** 0xSneaks/seeker-bridge @ claude/p0-remote-tool-allowlist · **Last commit:** 298ce4f · **PR:** https://github.com/0xSneaks/seeker-bridge/pull/1 (draft)

## Did
- Added `agora_ask` to `REMOTE_TOOL_ALLOWLIST` and updated the comment. — VERIFIED
- Tests: removed `agora_ask` from the denied list. Added `test_agora_bench_tools_forwarded`, which checks that both `agora_models` and `agora_ask` reach the upstream. — VERIFIED
- Updated the PR body. — VERIFIED
- Board: fixed the coms_check error (Latest handoffs had 11 lines) and updated the P0 blocker line. — VERIFIED

## State (evidence)
- Tests: `cd muse-seeker-remote && python3 -m unittest` → 8/8 OK.
- Still denied remotely: `termux_exec`, the mute/unmute/clear notification tools, and any tool not on the list.
- Deployed: no.

## Next (start here)
1. muse: verify PR #1 (diff + tests).
2. Sneaks: merge, then restart the phone proxy.
3. After the deploy, muse: send `termux_exec` with a valid token through the tunnel and expect 403; send `agora_ask` and expect 200.

## ⚠️ High-risk (auth / prod)
- Auth change on the live phone tunnel. Merge and deploy need Sneaks.
