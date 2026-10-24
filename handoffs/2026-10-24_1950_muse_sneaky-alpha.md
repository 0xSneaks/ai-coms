# Handoff — muse · 0x Sneaky Alpha audit + expansion prep · 2026-10-24 19:50 ET

From: muse (side chat df2f5e5a) · To: all · Project: sneaky-alpha (new project page created this sign-off)

## Done (all VERIFIED live unless labeled)

- STEP 0: BOARD read; no conflicting claim (active claim was muse-socials). projects/sneaky-alpha.md did not exist (404) — created at this sign-off.
- STEP 1 AUDIT: full table in `handoffs/2026-10-24_1950_muse_sneaky-alpha-audit.md` (committed to ai-coms, NOT to 0xSneaks/Agora — that repo is PUBLIC and the audit contains provider UUIDs + app inventory; sanitized public version on Sneaks's word only).
  - Bridge HTTP 200, 13 tools; Seeker / Android 16 / battery 46%.
  - 35 models tested by live agora_ask pong: 14 work, 20 fail, 1 not a chat model (Prompt Guard).
  - Coding lane found: North Mini Code (OpenRouter Free) — real code test PASS.
  - android_identity broken ("Server is not running"); rish verified alive separately.
  - seeker-doctor NOT VERIFIED all-pass (run returned no result in the tool window); health proven by direct tool tests.
- JOB 1 prep: GitHub MCP remote endpoint verified (api.githubcopilot.com/mcp). Helius MCP verified local-stdio only (helius.dev/docs/agents/mcp) + has a transfer tool = wallet gate. App config (MCP/Tasks/Loops/llama fallback/backup) is in app-private storage — not writable via bridge/Termux (permission denied, tested). Token Task blocked on Sneaks naming the watchlist.
- JOB 2 prep (Blue-2): Tailscale checklist + muse-mailbox design (allowlist fail-closed, blocked: wallet/signing/deletes/wipes; auth = per-side shared secret in env + app secure storage, never in code; security review routed to strongest model + second model in the design). No repo created, no deploy, no secrets.
- JOB 3 (Blue-1): 31-feature parity table. Brief's missing-list is stale: web already has MCP UI, memory UI, web search UI, message branching, own-format import/export. Real gaps: .agora import (#1), sync (none), tasks/loops (absent; Vercel Cron flagged ASK-FIRST, not proposed), chat search, compaction, image gen, skills.

## Gates waiting on Sneaks

1. Job 1 in-app taps (MCP add = GitHub token into app; llama fallback = settings + model download; weekly backup = settings) — or approve a WebUI admin-routes build for Claude Code.
2. Token watchlist for the hourly Task (analysis only).
3. Job 2 build: new Vercel repo/project + secret generation + app Loop creation.
4. Job 3 ports in user's order, starting with .agora import (boilerplate to Codex/OpenCode per routing).
5. Sanitized AUDIT.md for the public Agora repo — yes/no.

## Claim released

- muse · sneaky-alpha audit · released 2026-10-24 19:50 ET.
