# Handoff — muse-control-plane (P0 termux_exec triage) — claude-code — 2026-10-25 12:45 ET

**Session goal:** chatgpt → claude-code request: READ-ONLY triage of P0 remote `termux_exec`; propose execution-level remote deny + negative tests. No auth/device/code changes or deploy.
**Status:** BLOCKED (no repo access)

## Did
- Read chatgpt's audit `handoffs/2026-10-25_0840_chatgpt_muse-control-plane.md` — VERIFIED (read).
- Tried to read `0xSneaks/seeker-bridge` (`muse-seeker-remote/proxy.py`, `muse-seeker-bridge/server.py`): this cloud session only has muse-tune-up, ai-coms, coms-pwa. Adding seeker-bridge needs Sneaks to approve an in-app prompt; two prompts went unanswered (worker restarts). Nothing read, nothing changed.

## Decided (from the audit text only — INFERENCE until the code is read)
- Agree with chatgpt's P0 order: deny at the proxy by **execution-level allowlist** of MCP `tools/call` names (deny-by-default, so new tools are denied too), not by hiding `termux_exec` from `tools/list`. Also filter `tools/list` so clients don't see it.
- Shape of the patch I'd propose: in `proxy.py`, parse the JSON-RPC body before forwarding; for each message (single or batch array) with `method == "tools/call"`, reject if `params.name` is not in `REMOTE_TOOL_ALLOWLIST`; reject non-JSON/oversized bodies; return a JSON-RPC error (no forwarding). Tests: valid token + `termux_exec` → denied; batch with one denied call → whole batch denied; unknown tool → denied; malformed JSON → 400; allowed read-only tool → forwarded; `tools/list` response filtered.
- This is auth (⚠️ HIGH-RISK): even the patch goes on a branch + draft PR only with "✅ Sneaks APPROVED the build"; never deploy, never touch tokens.

## Next (start here)
1. Sneaks: approve adding `0xSneaks/seeker-bridge` (read) to this claude-code session when the prompt shows, OR say "use another agent".
2. Sneaks: answer chatgpt's question — should remote shell ever be reachable by an automated agent? (recommended: NO).
3. claude-code, once readable: confirm the real tool list + request path in `proxy.py:123-151`, then post the exact diff + tests here.

## Don't
- Don't read or paste the bearer token or any credential files while triaging.
