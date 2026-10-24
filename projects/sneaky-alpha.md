# 0x Sneaky Alpha

_Fork of Agora (repo `0xSneaks/Agora`), rebranded app on Sneaks's Solana Seeker (package com.sneaks.ai). Web port: `0xSneaks/0x-sneaky-alpha` on Vercel (production https://0x-sneaky-alpha.vercel.app). Muse drives the phone app through the Seeker bridge (seeker.7ohstore.shop, 13 MCP tools)._

## Status — 2026-10-24 (muse audit, VERIFIED live)

- Bridge: works (HTTP 200, tools respond). Full audit: `handoffs/2026-10-24_1950_muse_sneaky-alpha-audit.md`.
- Models: 35 listed · 14 work · 20 fail · 1 not a chat model. Working lanes: Gemini 3 Flash (Google), OpenRouter free router, Nemotron 3 Ultra + North Mini Code (OpenRouter Free custom). Coding = North Mini Code (code test PASS).
- Broken lanes: OpenCode Go, Groq/Groq Direct (all), most Ollama (except GPT-OSS 120B), Qwen on every lane. Several passed on 2026-10-17 and fail now — provider config/key degradation or the known dot-ID bug.
- android_identity tool broken ("Server is not running"); rish itself is alive (uid=2000 shell verified).
- Default-model reporting inconsistent: agora_models says Nemotron Ultra; default asks answered as Gemini 3 Flash / Flash Preview.
- GLM/Z.ai absent by design (dropped 2026-10-19, security). Do not re-add.

## Expansion (2026-10-24 orders)

- JOB 1 (use what's there): prep done — GitHub MCP is remote and fits; Helius MCP is local-stdio only (no remote endpoint) and includes a transfer tool (gated). MCP/Tasks/Loops/backup settings live in app-private storage; Muse cannot write them from Termux. Needs Sneaks's in-app taps or a WebUI admin-routes build. Hourly token task needs Sneaks's watchlist.
- JOB 2 (kill Termux dependence): Tailscale checklist + muse-mailbox DESIGN done (workspace sneaky-alpha-expansion/). Build gated on Sneaks (Vercel project, secrets, app Loop).
- JOB 3 (Vercel parity): 31-row gap table done. Headline: MCP UI, memory UI, web search UI, branching and own-format import/export ALREADY exist in web; the real #1 gap is .agora backup import. Scheduled tasks via Vercel Cron = ASK SNEAKS FIRST (flagged, not proposed).

## Claims

- (none active — muse audit session 2026-10-24, released at sign-off)
