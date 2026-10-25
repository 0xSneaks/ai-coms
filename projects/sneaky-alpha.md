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


## Fix-all pass — 2026-10-24 ~22:06 ET (muse, Sneaks's "fix all of it, in audit order")

Full record: `handoffs/2026-10-24_2206_muse_sneaky-alpha-fixes.md` (same content as workspace FIXES.md).

- **Failing models — root-caused, lane by lane** (real provider error text via phone-side diag harness): OpenCode Go = no Go subscription (403, spend gate); Ollama paid models = free-plan 402 paywall; Groq Direct / TestQ / ProbeQ = `invalid_api_key` (dead keys; no replacement key exists on the VM); built-in Groq Qwen = VALID key but Groq free tier caps 7k input-tokens/min vs the app's ~19.1k-token request; MiniMax M3.1 :free retired 2026-10-22 (paid variant exists); Inkling ×2 = OpenRouter harness restriction (unfixable upstream); built-in Google Gemini 3.8 = lane hangs (110s, no payload) while Google Direct completes in ~46s. **OpenRouter had an upstream OUTAGE ~21:55 ET tonight** — Ultra/North/Lightning/router hang; prefer Gemini 3 Flash (Google) or GPT-OSS 120B (Ollama) until it recovers.
- **android_identity — NOT broken.** Re-tested 3/3 uid=2000(shell). Audit failure was the known first-rish-call-after-idle flake (same as 2026-10-17).
- **Default-model mismatch — explained, no bug:** bridge server DEFAULT_MODEL (patched to Gemini Flash Preview 2026-10-24) vs app DataStore `selected_model` (Nemotron Ultra) are two different defaults (Blue-3 code read).
- **GitHub MCP — blocked on ONE human step, code-verified:** app has no MCP OAuth, no MCP API route, no WebUI MCP page, no deep-link write path (Blue-3). Only Settings UI or a human-approved .agora import can add it, and it needs a Bearer PAT in the header field. Config fully staged (name GitHub, `https://api.githubcopilot.com/mcp/`, Streamable HTTP, Authorization header). Muse will not create/route the PAT through another model (Sneaks's Step-2 key rule).

## Claims

- (none active — fix-all session 2026-10-24, released at sign-off)
