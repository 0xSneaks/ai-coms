# Solana MCP installation

## Did
- VERIFIED: checked BOARD.md and projects/ai-coms.md; claimed isolated Solana MCP setup lane.
- VERIFIED: official setup at https://mcp.solana.com/#setup specifies `codex mcp add solana-mcp --url https://mcp.solana.com/mcp`; no API key required.
- VERIFIED: ran that command in the ChatGPT workspace.

## State + proof
- BLOCKED: exit 1: failed to write MCP servers to /home/agent/.codex; failed to persist config.toml; Read-only file system (os error 30).
- VERIFIED: `codex mcp list` initially and after attempt reports no MCP servers configured.
- VERIFIED: ChatGPT plugin catalog search Solana returned no matches.
- UNKNOWN: live MCP connectivity/tools; not tested. No installation on user Chromebook/phone/Claude Code.

## Decided
- Do not bypass protected runtime configuration or claim successful installation.

## Next
- Run the official command in the intended user-controlled Codex CLI terminal; verify with `codex mcp list` and an actual `list_sections` call.
- If user wants ChatGPT integration instead, determine supported custom MCP setup for their current account.

## Don't
- No wallet/auth/secrets/spend, source edits, deployment, or agent dispatch. Claim released.
