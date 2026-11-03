# Handoff — sneaky-alpha — chatgpt — 2026-11-03 04:10 ET

## Did
- Responded to Sneaks's 04:08 iPhone PWA screenshot: selected `deepseek-v4.1-flash`, request fails with app's generic OpenCode Go connectivity/CORS error.
- Read BOARD.md, projects/sneaky-alpha.md, STATE.md, and Claude's 03:50/04:03 handoff before working. Last handoff: Claude's session-header fix squash-merged as `6b8587f`, Vercel production READY, live user test UNKNOWN.
- VERIFIED in 0xSneaks/0x-sneaky-alpha source: `web/src/core/providers/catalog.ts` defines OpenCode Go's default `https://opencode.ai/zen/go/v1` and proxy `/api/proxy`; `web/src/core/settings.ts` routes default/blank to proxy but honors any differing user URL as a direct browser request. `web/api/_opencode-proxy.ts` forwards chat/models plus `x-opencode-session`; `web/src/core/chat.ts` sets that header per conversation.
- VERIFIED from official OpenCode docs: `deepseek-v4.1-flash` is listed under Go; DeepSeek models require Global region allowed in Console Settings > Privacy.
- Suggested user clear the custom Base URL, save, start a fresh chat, and send Ping. This invokes the same-origin proxy. If still failing, hard-refresh the installed PWA, test another Go model, then inspect the exact error.
- A generic current OpenCode API URL was initially supplied; explicitly corrected this for **this app** because a nondefault URL bypasses its proxy.

## State + proof
- VERIFIED: source routing and latest COMS deployment handoff; 65/65 tests in Claude's handoff, not rerun by ChatGPT.
- INFERENCE: user may have typed a nondefault OpenCode base URL (similar question in previous chat), causing a CORS-blocked direct request.
- UNKNOWN: user's saved URL, live OpenCode Go response, subscription/region state, production proxy availability, whether refreshed PWA loaded `6b8587f`, and whether Ping now passes.
- Live anonymous HTTP check from this runtime blocked by DNS; no API key was received or requested.
- No app code, wallet, auth, or deployment mutations performed. Only AI COMS tracking was edited.

## Decided
- Do NOT recommend overriding the OpenCode Go base URL with `https://opencode.ai/inference/go/openai/v1` inside this PWA; the current code only proxies the built-in URL.
- Do NOT put the API key in chat or source.
- Do NOT claim successful connectivity until user tests it.

## Next
1. Sneaks: Open Settings > Providers > OpenCode Go, blank custom Base URL, save; open a new chat with `deepseek-v4.1-flash`, send Ping.
2. If failure persists, capture Settings > Providers > Test connection result (key hidden), and note whether the PWA was reloaded after 04:03 deployment.
3. If the error persists after route/caching fixes, inspect actual proxy upstream status and evaluate adapting the proxy to the current documented `/inference/go/openai/v1` path on a scoped PR (do not blindly switch it).
4. **Don't:** change another agent's claimed files, expose secrets, or report end-to-end success without proof.
