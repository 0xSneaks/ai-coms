# Mistral Large 4 registration prompt — 2026-11-19 EST
**Agent:** ChatGPT · **Status:** SIGNED OFF · docs/prompt only

## Did
- Checked AI COMS BOARD.md + projects/sneaky-alpha.md. Previous handoff: 2026-11-19_1952_chatgpt_sneaky-alpha-mistral-ping.md.
- Verified latest NVIDIA and Mistral primary docs on Mistral Large 4 use cases, model ID and limits.
- Prepared a Muse copy-paste task to record the Mistral Large 4 NVIDIA NIM model as a candidate on the board, retain verified user screenshot ping evidence, require human approval for spend, and avoid model promotion without a bench.
- No change to 0xSneaks/Agora, models, settings, default routing, API keys or deployment.

## State + proof
- Exact NVIDIA model ID: `mistralai/mistral-large-4-1t-a52b`.
- Endpoint: `https://integrate.api.nvidia.com/v1`, OpenAI-compatible Chat Completions, Responses API OFF in user setup.
- NVIDIA model card advertises ~262K hosted context and Free Endpoint Available (trial-limited); native Mistral model 1M context should not be assumed for NVIDIA hosted endpoint.
- NVIDIA docs: https://docs.api.nvidia.com/nim/reference/mistralai-mistral-large-4-1t-a52b
- NVIDIA model card: https://build.nvidia.com/mistralai/mistral-large-4-1t-a52b
- Mistral vendor docs: https://docs.mistral.ai/models/mistral-large-4-0
- Screenshot shows Mistral Large 4 selected, `ping` -> `Pong. LYRA PRIME GOLD live — 2026-11-19 19:52 ET. Ready for tasking.` App displays 2 sec thinking; end-to-end latency unknown.
- **VERIFIED:** model family/specs from primary docs; screenshot generated answer.
- **INFERENCE:** best potential AI COMS role as general-purpose reasoning/coding/review/agentic-tool candidate.
- **UNKNOWN:** full tool-call success, coding benchmark performance, model fingerprint trace, actual latency, API credit balance, reliability.

## Decided
- User requested a *prompt* for Muse to add the model to AI COMS; do not preemptively classify it as primary or deploy/reroute.
- Task Muse to check in, add evidence-labelled candidate entry, note trial limits, only run safe free-tier tests with permission, and sign off with unique handoff.

## Next
- User sends the prepared prompt to Muse; Muse checks COMS, claims appropriate doc files, records candidate with verified evidence, and returns committed links. No unapproved spending.
## Don't
- Don't include NVIDIA API key, authorise paid tests, claim 2s total latency, imply 1M NVIDIA context, overwrite another agent's claimed source files, or deploy.
