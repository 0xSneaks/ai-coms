# Sneaky Alpha — Five NVIDIA model comparison — 2026-11-19 EST
**Agent:** chatgpt · **Status:** SIGNED OFF · research-only

## Did
- Checked BOARD.md and projects/sneaky-alpha.md. Previous handoff: 2026-11-19_1959_chatgpt_sneaky-alpha-free-endpoint-list.md.
- Compared NVIDIA primary model pages and model cards for: Moonshot Kimi K3.1 Pro, Mistral Large 4, MiniMax M3.1 Flash, Meta Muse Glimmer 30B, Google Gemma 4 31B IT.
- Delivered use-case comparison and proposed COMS role assignments as **INFERENCE**, not measured performance hierarchy.
- Noted user screenshot previously confirmed Mistral Large 4 response (basic chat only).
- Contrasted model-card benchmark metrics where available. Meta reports Muse Glimmer vs Gemma 4 (SWE-Bench Verified 76.0 vs 66.6; MCP Atlas 75.5 vs 54.2; AIME2026 94.7 vs 89.2). Kimi card reports Terminal-Bench 4.0 65.7 vs MiniMax 38.1 on its own card; **not apples-to-apples** because different harnesses.
- Identified difference between MiniMax hosted NVIDIA 262K context listing and model card 1M serving capability; do not assume 1M on hosted trial.

## State + proof
- NVIDIA Kimi: https://build.nvidia.com/moonshotai/kimi-k3_1-pro/modelcard
- NVIDIA Mistral: https://build.nvidia.com/mistralai/mistral-large-4-1t-a52b
- NVIDIA MiniMax: https://build.nvidia.com/minimaxai/minimax-m3.1-flash/modelcard
- NVIDIA MiniMax hosted: https://build.nvidia.com/minimaxai/minimax-m3.1-flash/build
- NVIDIA Muse: https://build.nvidia.com/meta/muse-glimmer-30b/modelcard
- NVIDIA Gemma: https://build.nvidia.com/google/gemma-4-31b-it/modelcard
- **VERIFIED:** documented descriptions/context/selected vendor benchmark results. **INFERENCE:** suitability for COMS roles. **UNKNOWN:** precise latency, cost per request/trial balance, tool success, code patch correctness and relative win rates on user workloads.
- No NVIDIA credential accessed, live API calls, app config, production merge, money, or routing changes.

## Decided
- Proposed testing assignments: Kimi long-horizon coding; Mistral engineer reviewer; MiniMax automation; Muse Glimmer MCP/research; Gemma general/vision; benchmark each against nearest rival before promotion.
- Only Mistral has been demonstrated by user screenshot to produce a chat response.

## Next
- User/Muse can run controlled same-prompt tests with reproducible scoring (coding tasks with unit tests, schema-constrained tool calls, latency and failures). Use existing permission gates and no paid usage without owner approval.

## Don't
- Do not claim vendor benchmarks are independent, repeat inflated context claims from native weights as hosted API limits, overwrite another agent's claimed code, disclose keys, or promote to trading execution based on these comparisons.
