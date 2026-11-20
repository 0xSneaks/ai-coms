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

- [muse] sneaky-alpha · CLAIMED 2026-11-19 21:25 ET: upstream-sync U1 + NVIDIA Phase 1 web — Agora `.github/**`, `docs/UPSTREAM-SYNC.md`, branch `upgrade/agora-<tag>`; web repo branch `muse/nvidia-p1-web` (base main @ 5993111). PRs only, no merge/deploy. Request to claude-code (decider) on U1 base posted: `handoffs/2026-11-19_2125_muse_sneaky-alpha-u1-base-request.md`.


## UI fixes executed — 2026-10-24 ~22:45 ET (muse, bridge UI automation, dump-verified)

- **Compact model FIXED in-app:** was "GLM 5.3 (Custom)" (deleted provider, the crash cause) → now **Gemini 3 Flash (Google)**. Full note: `handoffs/2026-10-24_2245_muse_sneaky-alpha-ui-fixes.md`.
- **GitHub MCP STAGED in-app:** server saved (api.githubcopilot.com/mcp, Streamable HTTP); status "Connection error / 0 tools" as expected pre-auth. Only remaining act: Sneaks adds the `Authorization: Bearer <PAT>` header in that entry.

## iPhone relay scope — 2026-10-25 07:21 ET (muse)

- Sneaks asked to connect Muse to the iPhone install ("Sneaky OS"). Scope written: `SCOPE-muse-relay.md` in the local 0x-sneaky-alpha tree — relay API on the existing Vercel deployment + app-side foreground poller + Muse client mirroring agora_ask; coms-pwa pattern; keys stay on the phone.
- Status: SCOPE ONLY — nothing built or deployed. Next: Sneaks's 3 decisions in the scope doc, then a separate go for P0.

## Clean-slate update — 2026-10-26 (muse)

- Bridge: the tunnel has been returning Cloudflare 530 since ~14:05 ET today — classified FLAPPING-INFRA (jobs fail on the tunnel, succeed between flaps). Restart steps: ~/workspace/seeker-bridge/RESTART.md on muse's VM. The 2026-10-24 audit state below is otherwise the latest full audit.
- Sneaks AI (repo 0xSneaks/Agora): draft PR #6 (welcome greetings + title tags + Compact crash fix) is CI-green and awaits Sneaks's review/merge. Nothing else is pending on the app.
- iPhone relay (Sneaky OS): scoped, nothing built; three decisions are Sneaks's (GitHub-as-bus vs database, PWA-only vs native later, in-app "Muse" label). Detail: ai-coms/CLEAN-SLATE.md.
- 2026-11-03 (claude): OpenCode Go now needs per-conversation `x-opencode-session` header; fix in PR #1 (0x-sneaky-alpha), merged 6b8587f, prod READY 2026-11-03 04:03; live chat test pending.
- 2026-11-03 04:10 (chatgpt): iPhone PWA shows generic OpenCode Go connectivity/CORS error on DeepSeek V4.1 Flash. VERIFIED code routes only the **default/blank** OpenCode Go URL through same-origin `/api/proxy`; nondefault custom URL bypasses proxy. User advised to clear custom Base URL, save, reload PWA, Ping. Live test UNKNOWN, no source edits. → [handoff](../handoffs/2026-11-03_0410_chatgpt_sneaky-alpha.md).
- 2026-11-03 04:35 (claude): PR #3 merged 988287e, prod live.
- 2026-11-03 04:52 (claude): PR #4 merged 5993111 — MCP add form scrolls into view (+ GitHub was opening off-screen).

- 2026-11-19 19:27 ET (chatgpt): Documentation-only CLAIM for Kimi NVIDIA provider setup. No runtime/app source touched; existing Claude branch claim left untouched.

- 2026-11-19 19:27 ET (chatgpt): **SIGNED OFF / claim released** Kimi NVIDIA read-only setup guidance: custom OpenAI protocol, base URL `https://integrate.api.nvidia.com/v1`, exact model `moonshotai/kimi-k2.6`. Actual phone save, key validity, inference **UNKNOWN**; no code or credentials modified. → [handoff](../handoffs/2026-11-19_1927_chatgpt_sneaky-alpha-kimi-nvidia-setup.md).

- 2026-11-19 19:31 ET (chatgpt): CLAIM user screenshot follow-up for NVIDIA key entry, documentation-only.

- 2026-11-19 19:31 ET: **SIGNED OFF / claim released** screenshot confirms provider connection fields; user to add private NVIDIA key and exact Kimi model, test unverified. → [handoff](../handoffs/2026-11-19_1931_chatgpt_sneaky-alpha-kimi-screen.md).

- 2026-11-19 19:35 ET (chatgpt): CLAIM read-only NVIDIA auto-discovered model catalog explanation; no source/credential changes.

- 2026-11-19 19:35 ET: **SIGNED OFF / claim released** auto-fetched NVIDIA model catalog explains 33 discovered, 0 enabled; no testing or settings changed. → [handoff](../handoffs/2026-11-19_1935_chatgpt_sneaky-alpha-nvidia-catalog.md).

- 2026-11-19 19:36 ET (chatgpt): CLAIM read-only NVIDIA API free-tier/model compatibility research and handoff; no app edits.

- 2026-11-19 19:36 ET: **SIGNED OFF / claim released** NVIDIA free development endpoints are metered/credit-limited, not unlimited; checked 5 candidate free-endpoint listings and Starcoder2 deprecated, reported Kimi 404 on some keys; user API key runtime UNKNOWN. → [handoff](../handoffs/2026-11-19_1936_chatgpt_sneaky-alpha-nvidia-free-tier.md).

- 2026-11-19 19:52 ET (chatgpt): CLAIM screenshot-only Mistral ping analysis; no code/config touched.

- 2026-11-19 19:52 ET: **SIGNED OFF / claim released** screenshot shows Mistral Large 4 produced LYRA-styled Pong, not an actual network ping; time-to-response unverified. → [handoff](../handoffs/2026-11-19_1952_chatgpt_sneaky-alpha-mistral-ping.md).

- 2026-11-19 ET (chatgpt): CLAIM Mistral Large 4 NVIDIA model capabilities and Muse board-registration prompt; docs only, no app changes.

- 2026-11-19 ET: **SIGNED OFF / claim released** User-facing Muse prompt prepared to register NVIDIA Mistral Large 4 as candidate, not promote or reroute. Official model docs checked, basic screenshot Pong only, benchmarking UNKNOWN. → [handoff](../handoffs/2026-11-19_1955_chatgpt_sneaky-alpha-mistral-board-prompt.md).

- 2026-11-19 ET (chatgpt): CLAIM NVIDIA free-endpoint shortlist verification based on visible user screenshots; no app/credentials changes.

- 2026-11-19 ET: **SIGNED OFF / claim released** five official NVIDIA free-endpoint candidates from screenshots; user key compatibility only confirmed for Mistral. → [handoff](../handoffs/2026-11-19_1959_chatgpt_sneaky-alpha-free-endpoint-list.md).

- 2026-11-19 ET (chatgpt): CLAIM five NVIDIA-hosted models role comparison with primary documentation; no runtime/source changes.

- 2026-11-19 ET: **SIGNED OFF / claim released** compared Kimi K3.1, Mistral Large 4, MiniMax M3.1 Flash, Muse Glimmer 30B and Gemma 4 31B; proposed roles only, selected vendor bench metrics, no live tests or rerouting. → [handoff](../handoffs/2026-11-19_2000_chatgpt_sneaky-alpha-five-model-comparison.md).

- 2026-11-19 20:07 ET (chatgpt): **SIGNED OFF / claim released** NVIDIA Skills catalogue suitability review. Recommended sandbox agent-side `nvidia-skill-finder`, `ethos-write`; separate technical evaluation of `nemo-relay-instrument-calls`, `nemo-relay-plugin-observability`, `nemo-retriever-mcp`. No native mobile/PWA skill loader verified; no app source/config, key, server, spend or deployment changed. → [handoff](../handoffs/2026-11-19_2007_chatgpt_sneaky-alpha-nvidia-skills.md).

- 2026-11-19 20:36 EST (chatgpt): **SIGNED OFF / claim released** Claude Sonnet research-to-Muse prompt delivered. Includes provider/API/catalog 33-model discrepancy analysis, free-usage verification, skills review, app tuning, measurable acceptance tests and controlled PR gate. No app source/config/test/credentials/deploy/spend touched. → [handoff](../handoffs/2026-11-19_2036_chatgpt_sneaky-alpha-sonnet-muse-upgrade.md).

- 2026-11-19 ET (chatgpt): **SIGNED OFF / claim released** Agora v2.3.0 upstream review and safe auto-upgrade recommendation. Current Android fork v2.1.0; PR #7 v2.2.0 open, build cancelled. Recommend upgrade-to-v2.3.0 PR, CI+Seeker tests, scheduled upstream PR sync with owner merge/install gates. No app source/config/keys/deploy modified. → [handoff](../handoffs/2026-11-19_chatgpt_agora-upstream-auto-sync.md).
