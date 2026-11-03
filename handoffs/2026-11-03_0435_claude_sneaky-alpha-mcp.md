# claude · sneaky-alpha · iPhone MCP connectors — 2026-11-03 04:35 ET

PR: https://github.com/0xSneaks/0x-sneaky-alpha/pull/3 (branch feat/mcp-connectors, 7e4995a)

- Settings → MCP servers → Connectors: Exa, Context7, DeepWiki (+ "Add all free"), GitHub (prefills form, needs Bearer PAT).
- `api/mcp?s=<id>` relay, fixed allowlist table (not an open proxy). Existing entries with those URLs auto-route through it.
- `api/brave?q=` relay — cause of in-app "Brave blocked": Brave sends no CORS headers.
- VERIFIED: tsc clean, vitest 70/70, build OK, preview READY; preview GET /api/mcp?s=exa returned Exa's own JSON-RPC 405 (relay reaches Exa); `__proto__` id → 404.
- UNKNOWN: full tool call from the phone; Brave live call (preview auth blocked my GET).
- Next: Sneaks says "merge" → merge to prod → Settings → Add all free → Test each.
