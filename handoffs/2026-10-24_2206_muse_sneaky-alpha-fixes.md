# 0x Sneaky Alpha — Fix-All Pass (2026-10-24 evening, Sneaks's "fix all of it, in audit order")

Method: every failing lane re-run through a phone-side diagnostic that captures the app's
real provider error text (message payload `presentation.inlineTerminalText`), not just ERROR status.
Diag harness: `~/probe/diag_ask.py` on the phone (imports the bridge's own agora_client; login via the
bridge's password file — the password value never leaves the phone and was never printed).

## FIX 2 — the 20 failing models, by VERIFIED root cause

| Bucket | Lanes | Real error (verbatim, trimmed) | Fixable by Muse? |
|---|---|---|---|
| OpenCode Go subscription missing | Kimi K2.7 Code (Go) | `403: An active OpenCode Go subscription is required to use Go models.` | NO — needs a paid Go subscription (spend gate). Sneaks has only a $10 Zen balance. |
| Ollama Cloud free-plan paywall | DeepSeek V4.1 Flash, Kimi K2.6, Kimi K2.7 Code (Ollama lanes); Mistral Large 3 + MiniMax M2.7 presumed same (same 402 shape, ~0.7s) | `402: This model is not included in your free usage, add usage credits… Try gemma4:31b-cloud, which is in the Free plan.` | NO without spend. Free-plan alternative exists: gemma4:31b-cloud (GPT-OSS 120B Ollama already works — it is in the free plan). |
| Dead API keys on custom providers | Groq Direct (GPT-OSS 120B/20B, Qwen 3.8), TestQ "TQ" (Qwen 3.8), ProbeQ (Qwen 3.8) | `invalid_api_key: Invalid API Key` (all three providers, verbatim) | Only with a valid replacement key. No Groq key exists anywhere on the VM (searched env/config — none). The WORKING built-in Groq key lives only inside the app. |
| Groq free-tier token ceiling vs app request size | Qwen 3.8 (built-in Groq) | `rate_limit_exceeded [tokens]: Limit 7000 ITPM, Requested 19114` | Key is VALID — the app sends a ~19.1k-token system/tools payload with every chat; Groq's free tier caps this model at 7k input tokens/min. Not a config error; a structural ceiling unless Groq tier is upgraded (spend) or the app payload shrinks (app change). |
| OpenRouter model retired | MiniMax M3.1 Flash (OR) | `404: The free launch period for MiniMax M3.1 Flash ended on Oct 22, 2026. The :free variant has been retired; use minimax/minimax-m3.1-flash ($0.15/M in, $0.60/M out).` | Only by switching the entry to the paid variant (spend against OpenRouter balance). |
| OpenRouter harness restriction | Inkling, Inkling Small | `403: …is only available on agentic harnesses. Try plugging it into a coding agent or productivity app listed on openrouter.ai/apps` | NO — upstream restriction; the app is not on OpenRouter's approved-app list. |
| OpenRouter outage (2026-10-24 ~21:55 ET, upstream) | Nemotron 3 Ultra (default), North Mini Code, Nemotron 3.5 Lightning, free router — all WORKING earlier the same day | hangs ~76–78s → ERROR, empty text | NO — OpenRouter-side; recover on their end. Use Gemini 3 Flash (Google) or GPT-OSS 120B (Ollama) meanwhile. |
| Built-in Google 3.8 lane hangs | Gemini 3.8 Flash (built-in Google) | No payload at all after 110s (final diag) — while the SAME model via Google Direct completed in 46s in the audit | Lane-level problem in the built-in Google provider; workaround is live: use Google Direct for 3.8. Root-cause inside the built-in provider needs app-code work (Claude Code), not config. |
| OpenRouter slow free lanes, undiagnosable tonight | Gemma 31B (77.7s ERROR in audit), Gemma 26B (45s cap), Xing4.0 29B (45s cap), Nemotron 3 Super (final diag: ERROR, no payload, 107s) | — | OR's outage tonight makes a clean retest meaningless; these were already the slowest free lanes. Re-diag after OR recovers. |
| Ollama Mistral/MiniMax (INFERENCE) | Mistral Large 3, MiniMax M2.7 (Ollama) | Not individually diag'd; same provider + same ~0.7s fail shape as the two VERIFIED Ollama 402s | Same free-plan paywall, presumed. |

Working set confirmed tonight (14 from audit + spot re-checks): Gemini 3 Flash (Google, 2.4s),
Gemini 3 Flash Preview + Gemini 3.8 (Google Direct — 3.8 is SLOW, ~46s, not broken),
Free router / Nemotron Ultra / North Mini Code (OR — when OpenRouter is up),
Dots 3, Laguna S/XS, LFM 2.5, Nemotron Nano Omni / 3.5 Lightning / 3.5 Super VL,
GPT-OSS 120B via Ollama (1.3s).

## FIX 1 — GitHub MCP: blocked on exactly one human step (VERIFIED, code-level)

Blue-3 code investigation (fix-blue3-mcp-code.md) + live WebUI probing agree:
- The app has NO MCP OAuth (zero oauth/pkce code), NO MCP API route, NO WebUI MCP page,
  NO deep-link/intent write path. Sync "setting" command = per-conversation settings only.
- MCP configs live in encrypted DataStore; the ONLY write paths are the Settings UI,
  or a .agora/settings import that a human picks and approves in-app.
- GitHub's hosted MCP therefore needs a Bearer PAT typed into the app's header field.
  Creating that PAT in Sneaks's GitHub and routing the value through another model
  would break his own key-handling rule (Step 2 of the expansion orders).
- STAGED for a single paste: Name `GitHub`, URL `https://api.githubcopilot.com/mcp/`,
  transport Streamable HTTP, header `Authorization` = `Bearer <new fine-grained read-only PAT>`.
  Token spec: fine-grained, read-only (Contents/Issues/Pull requests/Actions), repos he chooses.

## FIX 3 — android_identity: NOT broken (VERIFIED)

Re-tested 3/3 in one session: `uid=2000(shell)`, exit_code=0. The audit failure was the
known first-rish-call-after-idle flake (same shape as 2026-10-17: plain first call fails
with "Server is not running", everything after works). server.py already sets
RISH_APPLICATION_ID explicitly per invocation. No patch needed; if it recurs, retry once.

## Default-model "mismatch" — explained, no bug (Blue-3, code VERIFIED)

Two different defaults: the app's `selected_model` (DataStore) vs the bridge server's own
DEFAULT_MODEL (patched by main chat 2026-10-24 to Google:gemini-3-flash-preview — which is
why no-model asks answered as Gemini Flash variants while agora_models reports the app's
selected model, Nemotron Ultra). New conversations resolve via resolveValidModel():
selected_model if still in the valid set, else fallback. During the OpenRouter outage,
the app's selected default (Nemotron Ultra) hangs — pick Gemini in-app until OR recovers.

## Discovered tonight (main chat session, VERIFIED, dex-level): the "Nemo" crash

App crashed 4× tonight (21:35–21:45 ET). Root cause: the global **Compact model setting still
points at `custom-provider-16658d57…:glm-5.3` — a provider deleted when GLM/Z.ai was dropped** —
and the automatic-Compact path (`ConversationCompactController.automaticSnapshot()`) has no
try/catch around the `require(config.providerName in providerInstances)` check, so any
conversation crossing 75% of its context window crashes the app on send/continue.
Fixes: (1) quick — in-app Settings → Context → Compact model → pick a live model (or disable
auto-compact); another in-app-only setting, so it's Sneaks's tap; (2) durable — code fix to make
auto-Compact fail soft like manual Compact (Claude Code handoff route). Data is NOT corrupt;
all 186 conversations load. This crash is separate from the OpenRouter outage.

## seeker-doctor

Main chat verified ALL PASS (14 checks) on 2026-10-24 after the DEFAULT_MODEL patch.
My audit's "not verified" is superseded by that.
