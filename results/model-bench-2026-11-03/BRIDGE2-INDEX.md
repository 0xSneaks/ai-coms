# BRIDGE2 INDEX — bridge lane (agora_ask), 2026-11-03

| model | status | seconds | file |
|---|---|---|---|
| OpenCode Go:glm-5.3 | ok | 14.0 | bridge-opencode-go-glm-5-3.md |
| DeepSeek:deepseek-flash | ok | 23.6 | bridge-deepseek-deepseek-flash.md |
| Ollama:deepseek-v4.1-flash | ok | 13.6 | bridge-ollama-deepseek-v4-1-flash.md |
| Ollama:gpt-oss:120b | ok | 16.1 | bridge-ollama-gpt-oss-120b.md |
| Ollama:kimi-k2.6 | error | 40.6 | bridge-ollama-kimi-k2-6.md |
| Ollama:kimi-k2.7-code | error | 40.5 | bridge-ollama-kimi-k2-7-code.md |
| Ollama:minimax-m2.7 | error | 40.6 | bridge-ollama-minimax-m2-7.md |
| Ollama:mistral-large-3:675b | error | 40.5 | bridge-ollama-mistral-large-3-675b.md |
| Google:gemini-3-flash-preview | error | 40.8 | bridge-google-gemini-3-flash-preview.md |
| Google:gemini-3.8-flash | error | 40.5 | bridge-google-gemini-3-8-flash.md |
| custom-provider-d6de20bb-0d79-40c5-b40f-df419b6eb774:gemini-3-flash-preview | error | 40.6 | bridge-custom-provider-d6de20bb-0d79-40c5-b40f-df419b6eb774-gemini-3-flash-preview.md |
| custom-provider-d6de20bb-0d79-40c5-b40f-df419b6eb774:gemini-3.8-flash | error | 40.5 | bridge-custom-provider-d6de20bb-0d79-40c5-b40f-df419b6eb774-gemini-3-8-flash.md |
| Open Router:openrouter/free | error | 40.5 | bridge-open-router-openrouter-free.md |
| Open Router:dots-studio/dots-3-note-preview:free | error | 40.6 | bridge-open-router-dots-studio-dots-3-note-preview-free.md |
| Open Router:google/gemma-4-26b-a4b-it:free | error | 40.7 | bridge-open-router-google-gemma-4-26b-a4b-it-free.md |
| Open Router:google/gemma-4-31b-it:free | error | 40.7 | bridge-open-router-google-gemma-4-31b-it-free.md |
| Open Router:thinkingmachines/inkling:free | error | 40.6 | bridge-open-router-thinkingmachines-inkling-free.md |
| Open Router:thinkingmachines/inkling-small:free | error | 40.7 | bridge-open-router-thinkingmachines-inkling-small-free.md |
| Open Router:liquid/lfm-2.5-2.6b:free | error | 40.6 | bridge-open-router-liquid-lfm-2-5-2-6b-free.md |
| Open Router:nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free | error | 40.6 | bridge-open-router-nvidia-nemotron-3-nano-omni-30b-a3b-reasoning-free.md |
| Open Router:nvidia/nemotron-3.5-lightning:free | error | 40.6 | bridge-open-router-nvidia-nemotron-3-5-lightning-free.md |
| Open Router:nvidia/nemotron-3.5-super-vl:free | error | 40.6 | bridge-open-router-nvidia-nemotron-3-5-super-vl-free.md |
| Open Router:xingchen-agi/xing4.0-29b-a4b:free | error | 40.5 | bridge-open-router-xingchen-agi-xing4-0-29b-a4b-free.md |
| custom-provider-df65c8dc-1591-43aa-9e2e-dacd5352a120:nvidia/nemotron-3-ultra-550b-a55b:free | error | 40.7 | bridge-custom-provider-df65c8dc-1591-43aa-9e2e-dacd5352a120-nvidia-nemotron-3-ultra-550b-a55b-free.md |
| custom-provider-df65c8dc-1591-43aa-9e2e-dacd5352a120:cohere/north-mini-code:free | error | 40.7 | bridge-custom-provider-df65c8dc-1591-43aa-9e2e-dacd5352a120-cohere-north-mini-code-free.md |

## Integrity notes (read before grading)

- MODEL MISMATCH on every 'ok' reply: the bridge meta inside all 4 ok files reports "model_id": "Google:gemini-3-flash-preview" — not the requested model — although each has a distinct conversation_id, duration and reply text. Per the bridge's own meta, none of the 4 ok replies is attributable to the model named in the request. Affected: OpenCode Go:glm-5.3, DeepSeek:deepseek-flash, Ollama:deepseek-v4.1-flash, Ollama:gpt-oss:120b.
- TIMEOUT PATTERN: the first 4 models answered (11:13–11:16 ET); every agora_ask after ~11:17 ET failed to return inside the client's 40s read cap on both attempts — across Ollama, Google, custom providers and Open Router free models, including a 2.6B model that should answer in seconds. Pattern points to the bridge app being wedged (stuck generation queue), not per-model slowness. Client timeout was not changed, per orders.
- RE-RUN: 11 models (Open Router:google/gemma-4-26b-a4b-it:free and everything after it in the table) lost their first pass to a VM-side egress proxy failure (URLError Connection refused, 0.0s — the requests never reached the bridge). They were re-run once in a fresh session; in the re-run they reached the bridge and timed out at 40s on both attempts. Their files carry a 'note: re-run' header line.
- All error files contain the raw error text (TimeoutError / RemoteDisconnected / URLError) with attempts=2.
