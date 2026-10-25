# Sneaky Alpha — UI fixes executed by Muse (2026-10-24 22:21-22:45 ET)

Sneaks: "So fix it." Muse drove the phone UI via the Seeker bridge (rish `input` taps,
every step verified with uiautomator hierarchy dumps — no blind taps). Two fixes:

## 1. Compact model — FIXED (stops the crashes)
Settings → Context showed **Compact Model = "GLM 5.3 (Custom)"** on screen (the deleted
GLM provider — the verified crash cause). Muse opened the picker and selected
**Gemini 3 Flash (Google)**. Read-back on the Context page now shows
"Compact Model: Gemini 3 Flash (Google)", threshold 75% unchanged.
The auto-Compact admission check now resolves against a live provider.
Durable code-side fail-soft fix already sits in draft PR #6 (0xSneaks/Agora).

## 2. GitHub MCP server — STAGED (one field left for Sneaks)
Settings → MCP → Add MCP Server, filled and saved by Muse:
Name `GitHub`, URL `https://api.githubcopilot.com/mcp/`, transport Streamable HTTP.
Verified in the servers list: **GitHub — Connection error, 0 tools** (expected:
GitHub answers 401 until an Authorization header exists; app retries with backoff).
Remaining human act is now exactly one paste: open the GitHub entry → Custom Headers →
Add Header → name `Authorization`, value `Bearer <fine-grained read-only PAT>` → Save.
Muse does not create or route the PAT (Sneaks's Step-2 key rule).

MCP inventory seen live on the page: Google Workspace (13 tools, Connected),
Seeker Bridge (13, Connected), DeepWiki (3), Firecrawl (3), Context7 (2), Exa (2),
Cloudflare Docs (2), Grep (1), Google Drive (Idle, 0 tools), GitHub (new, error).
