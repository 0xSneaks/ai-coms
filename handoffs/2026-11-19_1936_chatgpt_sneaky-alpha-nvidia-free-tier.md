# Sneaky Alpha NVIDIA Free-Tier + Model Availability Audit — 2026-11-19 19:36 EST
**Agent:** chatgpt · **Status:** SIGNED OFF, research-only

## Did
- Read COMS BOARD.md + projects/sneaky-alpha.md; previous handoff: 2026-11-19_1935_chatgpt_sneaky-alpha-nvidia-catalog.md.
- Compared models visible on user's NVIDIA-provider screenshot with NVIDIA's live model catalog, per-model pages, official NVIDIA NIM FAQ, and recent developer forum reports.
- Distinguished catalog listing, "Free Endpoint" for limited developer trial, and verified actual inference.
- VERIFIED free-endpoint advertised: moonshotai/kimi-k2.6, mistralai/mistral-large-4-1t-a52b, google/gemma-4-31b-it, meta/muse-glimmer-30b, minimaxai/minimax-m3.1-flash; optional nvidia/nemotron-3.5-bolt-e4b.
- VERIFIED deprecated endpoint: bigcode/starcoder2-15b. GLiNER PII is a specialized detection task; screenshot's fastino/gliner2-pii variant was not independently confirmed.
- NVIDIA NIM FAQ confirms free prototype/developer access only, production under separate enterprise terms. NVIDIA staff forum posts (2024) stated initial 1000 credit trial, Nov 7 2026 user reported 1000 credits/40RPM, not guaranteed for user's account.
- Nov 6 and Nov 7 2026 forum reports show moonshotai/kimi-k2.6 can 404 for free-tier accounts despite listing, while Mistral Large 4 and some Nemotron models worked for those authors.

## State + proof
- Official FAQ: https://docs.api.nvidia.com/nim/docs/product
- NVIDIA catalog: https://build.nvidia.com/models
- Official Kimi listing: https://build.nvidia.com/moonshotai/kimi-k2.6
- Mistral endpoint: https://build.nvidia.com/mistralai/mistral-large-4-1t-a52b
- Gemma4: https://build.nvidia.com/google/gemma-4-31b-it
- Muse Glimmer: https://build.nvidia.com/meta/muse-glimmer-30b
- MiniMax: https://build.nvidia.com/minimaxai/minimax-m3.1-flash/build
- Deprecated Starcoder: https://build.nvidia.com/bigcode/starcoder2-15b
- Account-specific failure report: https://forums.developer.nvidia.com/t/request-to-enable-public-api-endpoints-404-on-moonshotai-kimi-k2-6-and-other-models/388195
- Nov 7 credits and success: https://forums.developer.nvidia.com/t/credit-rate-limit-increase-request-build-nvidia-com-free-tier-1-000-5-000-credits-40-200-rpm/388265
- No user's NVIDIA API key read, authenticated calls, or phone inference performed. Whether any of 33 models works under this exact key: UNKNOWN.

## Decided
- Recommend first testing Mistral Large 4 then Gemma 4 / Muse Glimmer for basic chat; Kimi K2.6 can be attempted but 404 is plausible.
- Listed != working; Free Endpoint != unlimited gratis use. Only subset of 33 on screenshot visible; don't claim to audit unseen models.

## Next
- User enables one intended chat model and sends small test prompt; diagnose status code safely without key.
- For full 33-model classification, collect additional screens or redacted model IDs; runtime tests needed for certainty.

## Don't
- Don't assume free unlimited, use in production, expose API key, add billing/spend, change app code, overwrite Claude's claimed branch, or claim runtime success.
