# 0x Sneaky Alpha — AUDIT

Date: 2026-10-24 (America/New_York, evening)
Method: live tests through the Seeker bridge (seeker.7ohstore.shop), not docs.
Every row labeled VERIFIED unless marked INFERENCE / ASSUMPTION / NOT TESTED.
App on phone: com.sneaks.ai (bridge tool descriptions still say "Agora Dev" — stale wording).

## Bridge + device

| ITEM | STATUS | EVIDENCE |
|---|---|---|
| Bridge initialize (Cloudflare tunnel → phone MCP) | works | HTTP 200 + session id, multiple runs 2026-10-24 |
| Bridge latency | works, slow-ish | init+tools/list+4 calls = 14.9s total; single read tools 1.4–3.7s; agora_models 3.7–11.8s |
| Bridge auth | works | Secure Vault surrogate (custom.seeker-mcp-bridge); token never seen in process/logs |
| Tools exposed | 13 | android_identity, android_model, android_version, android_packages, android_notifications, android_battery, get_app_notification_state, mute_app_notifications, unmute_app_notifications, clear_notifications, agora_models, agora_ask, termux_exec |
| android_model / android_version | works | "Seeker" / Android 16 |
| android_battery | works | level 46%, status 3 (discharging), 3822 mV, Li-ion (live read 2026-10-24 19:2x ET) |
| android_identity | broken | exit_code=1, stderr "Server is not running" while sibling rish-backed tools worked in the same session — INFERENCE: its backend path differs / its server component is down |
| android_packages | works | full package list returned; com.sneaks.ai, com.termux, com.termux.boot present |
| android_notifications | works | live notification keys returned (fomo, twitter, claude, gmgn, coinbase, chatgpt, grok, com.sneaks.ai, …) |
| get_app_notification_state | works | pump=unmuted/granted, fomo=unmuted/granted, telegram=MUTED (granted=false, uid_mode=ignore) |
| mute / unmute / clear_notifications | NOT TESTED | state-changing; not run during a read-only audit |
| termux_exec (shell) | works | Termux user u0_a360, cwd ~/seeker-bridge/muse-seeker-bridge, exit 0 |
| Device access level | sandboxed, NOT root | termux_exec uid=10360(u0_a360) context untrusted_app; `su` = "No su program found", no sudo; Android-shell tools run as uid 2000 (shell) per CONNECTION.md; /data/data/com.sneaks.ai = Permission denied from Termux |
| File access | partial | Termux home + /sdcard readable; other apps' private data denied |
| Network from Termux | works | curl https://example.com → 200 in 0.26s; ping 1.1.1.1 → 6.3ms |
| Toolchain on phone | works | Python 3.14.6, Node v26.4.0 (via termux_exec) |
| Background jobs on phone | works | cloudflared (named tunnel "seeker"), proxy.py, seeker-watchdog.sh, runsv services (sshd, cloudflared, conch) all visible in ps |
| WebUI (app, 127.0.0.1:8686) | works | agora_ask / agora_models succeed through it; session log-in/out per call (logged_out=true) |

## Providers + models (agora_models: count=35, VERIFIED live list)

Provider families wired in: Google, Google Direct (custom), Open Router,
OpenRouter Free (custom), Ollama, Groq, Groq Direct (custom), OpenCode Go,
plus test providers (TestQ, ProbeQ, DOTTEST).

Default model discrepancy (VERIFIED): agora_models reports
default_model_id = Nemotron 3 Ultra (OpenRouter Free custom), but a no-model
agora_ask actually answered with Gemini 3 Flash (Google).

### Model-by-model live test ("Reply with exactly: pong", 2026-10-24)

| MODEL | STATUS | EVIDENCE |
|---|---|---|
| Gemini 3 Flash (Google) | works | pong, 2.2s in-app |
| Gemini 3 Flash Preview (Google Direct) | works | pong, ~4s |
| Gemini 3.8 Flash (Google Direct) | works, slow | pong, 46.0s |
| Gemini 3.8 Flash (Google built-in) | broken/slow | FAILED at 45s cap (47.1s wall) |
| Free (Open Router router) | works | pong, 2.7s in-app |
| Nemotron 3 Ultra (OpenRouter Free custom) | works | pong, ~4.9s wall |
| Dots 3 Note Preview (Open Router) | works | pong, 3.9s |
| Laguna S 2.1 / XS 2.1 (Open Router) | works | pong, 6.5s / 13.8s |
| LFM 2.5 2.6B (Open Router) | works | pong, 4.0s |
| Nemotron 3 Nano Omni 30B (Open Router) | works | pong, 2.9s |
| Nemotron 3.5 Lightning (Open Router) | works | pong, 3.1s |
| Nemotron 3.5 Super VL (Open Router) | works | pong, 3.7s |
| Kimi K2.7 Code (OpenCode Go) | broken | message ERROR in 0.84s |
| Kimi K2.7 Code (Ollama) | broken | message ERROR in 0.77s |
| Kimi K2.6 (Ollama) | broken | FAILED ~1.9s |
| DeepSeek V4.1 Flash (Ollama) | broken | message ERROR in 0.75s |
| Mistral Large 3 (Ollama) | broken | message ERROR in 0.75s |
| MiniMax M2.7 (Ollama) | broken | message ERROR in 0.72s |
| GPT-OSS 120B (Ollama) | works | pong, 2.5s — the one Ollama entry that works |
| GPT-OSS 120B / 20B (Groq Direct) | broken | message ERROR ≤0.66s / ~2.2s |
| Qwen 3.8 27B (Groq built-in, Groq Direct, ProbeQ, TestQ) | broken | ERROR on all four lanes (0.7–5.9s; ProbeQ timed out at 45s cap) |
| Gemma 4 31B (Open Router) | broken/slow | ERROR after 77.7s |
| Gemma 4 26B (Open Router) | broken/slow | FAILED at 45s cap |
| Inkling / Inkling Small (Open Router) | broken | ERROR ~2s |
| MiniMax M3.1 Flash (Open Router) | broken | ERROR ~2s |
| Nemotron 3 Super 120B (Open Router) | broken | ERROR ~2s |
| Xing4.0 29B (Open Router) | broken/slow | FAILED at 45s cap |
| North Mini Code (OpenRouter Free custom) | works — CODING | pong 4.9s; real code test PASS (correct is_palindrome, 10.4s in-app) |
| DOTTEST Llama Prompt Guard 2 86M (TestQ) | NOT TESTED | a prompt-guard classifier, not a chat model |
| seeker-doctor (14 checks) | NOT VERIFIED | run via termux_exec returned no result inside the 110s tool window; bridge health here is proven by direct tool tests instead. rish itself works: `RISH_APPLICATION_ID=com.termux rish -c id` → uid=2000(shell) — so android_identity's "Server is not running" is specific to that tool, not a dead Shizuku/rish |

Totals: 35 models listed · 14 VERIFIED working · 20 VERIFIED failing · 1 not tested.
Regression note: GPT-OSS via Groq Direct and several other lanes PASSED on
2026-10-17 (saved bench history) and FAIL now — provider config/keys have
degraded since, or the known model-ID bug (dot-containing IDs, written up
2026-10-17 for Codex) is biting more lanes.
| GLM / Z.ai | missing — by design | NOT in the 35-model list; dropped 2026-10-19 over security concerns. Do not re-add. |
| Local llama.cpp model | missing | No local/llama entry in the 35-model list (INFERENCE: none downloaded/configured), though the code ships LlamaEngine/LocalProvider |
| Codex / paid OpenAI-Anthropic etc. | missing | No OpenAI/Anthropic/Codex provider entries in the live model list |

Pattern (INFERENCE): Groq/Groq Direct + OpenCode Go fail instantly
(~0.7s ERROR) — consistent with dead/missing keys or a broken provider
config, not model quality. Ollama is per-model: GPT-OSS 120B works, the
rest fail. Open Router-branded entries are mixed: about half work, half
error or time out. Google + OpenRouter-Free-custom are the reliable lanes
today. Default-model reporting is also inconsistent across calls
(VERIFIED): one default ask answered as Gemini 3 Flash, a later one as
Gemini 3 Flash Preview — neither matched the reported Nemotron Ultra
default.

In-app agent tool access: INCONCLUSIVE — one probe asking the default
model to list MCP servers/tasks/loops timed out at 60s with no answer.
Not repeated (no-repeat rule).

Rate limits / cost per provider: UNKNOWN — the app exposes no cost or
rate-limit data through agora_models; not invented here.

## Routing that follows from this audit (cheapest working first)

- Quick Q&A / summaries: Free (Open Router) or Nemotron 3 Ultra (free custom) — both VERIFIED working, ~3–5s.
- Workhorse: Gemini 3 Flash (Google) — VERIFIED, fastest reliable (2.2s).
- Long docs: Gemini 3.8 Flash (Google Direct) — VERIFIED but slow (46s); Nemotron 3 Ultra as free alternative.
- Code: North Mini Code (OpenRouter Free) — VERIFIED with a real code task, use it today. Kimi K2.7 Code fails on both OpenCode Go and Ollama; Qwen/GPT-OSS fail on Groq lanes. Fix those provider keys/config, then re-test, to get a stronger coding lane.
- Security/wallet/auth code: no model work at all without Sneaks's gate + second-model review (standing rule).

## App feature surface (code-verified in the Agora fork source; app-side state not changed)

| FEATURE | STATUS | EVIDENCE |
|---|---|---|
| WebUI server (Ktor) + /api/sync | works | WebUiServer.kt routes; live via bridge |
| /api/providers admin | works (on 0xSneaks/Agora master) | PR #1; session-gated; keys never returned |
| Scheduled Tasks / Loops | present in code, not configured by Muse | automation/TaskManager.kt, LoopManager.kt, AutomationScheduler.kt |
| MCP servers (remote URL) | present in code | mcp/McpRegistry.kt; configs require a URL |
| Conch/SSH shell, PRoot | present in code (per repo) | not exercised in this audit |
| Local llama.cpp | present in code, no model live | api/LlamaEngine.kt, api/local/LocalProvider.kt |
| .agora auto-backup | present in code, state unknown | data/AutoBackupManager.kt, service/AutoBackupWorker.kt |
| Memory, chat search, image gen | present in code | not exercised in this audit |
