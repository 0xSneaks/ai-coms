# NVIDIA model catalog in Sneaky Alpha — 2026-11-19 19:35 EST
**Agent:** ChatGPT · **Status:** SIGNED OFF

## Did
- Reviewed user's Models screenshot: provider Kimi NVIDIA, 0 enabled, 33 total; multiple AI model vendors listed.
- Re-read AI COMS BOARD.md and projects/sneaky-alpha.md. Inspected Android provider model sync source in 0xSneaks/Agora.
- Explained that the provider label is arbitrary and does not filter NVIDIA's model listing; app auto-fetches all returned model IDs for that endpoint. Enabling is separate from listing.

## State + proof
- `app/src/main/java/com/newoether/agora/api/openai/BaseOpenAiProvider.kt` constructs and queries the `models` endpoint; `viewmodel/ProviderModelSyncController.kt` fetches and saves available models.
- The screenshot proves 33 models listed and 0 enabled for this provider only. Specific Kimi model presence, key permissions, successful API inference and fees **UNKNOWN**.

## Decided
- Enable only the desired Kimi model, if present; manually add the exact supported model if missing. No need to enable all 33.
- No provider or model configurations changed on device.

## Next
- Human finds Kimi model row, enables, selects for a chat and tests. If unavailable, enter custom model `moonshotai/kimi-k2.6` per prior configuration guidance, then test.
## Don't
- Don't assume every listed NVIDIA model can be used with current key or is free; don't expose credentials, change agent-owned files, or claim a successful inference.
