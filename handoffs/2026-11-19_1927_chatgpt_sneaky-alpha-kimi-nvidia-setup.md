# Sneaky Alpha Kimi NVIDIA provider setup — 2026-11-19 19:27 EST
**Agent:** chatgpt · **Status:** SIGNED OFF · documentation-only

## Did
- Read `BOARD.md`, `projects/sneaky-alpha.md`, `0xSneaks/Agora` README and provider/model settings Kotlin implementation.
- Verified that Android app supports custom OpenAI-compatible providers through Settings > Providers > Add Custom Provider, and custom model entry under Settings > Models.
- Consulted NVIDIA Kimi K2.6 API reference for exact settings; provided user:
  - Name: Kimi NVIDIA
  - Protocol: OpenAI
  - Base URL: `https://integrate.api.nvidia.com/v1`
  - Model ID: `moonshotai/kimi-k2.6`
  - API key: NVIDIA-issued, enter inside app only.

## State + proof
- App implementation: `https://github.com/0xSneaks/Agora/blob/master/app/src/main/java/com/newoether/agora/ui/settings/SettingsProviderPage.kt` and `SettingsModelsPage.kt`.
- NVIDIA reference: `https://docs.api.nvidia.com/nim/reference/moonshotai-kimi-k2-6-infer`.
- Config saved on actual phone, key validity, runtime response and model identity **UNKNOWN**. No access to key or device in this run.

## Decided
- Use a custom OpenAI provider, not new native Kotlin adapter; base URL is `/v1`, not full `/chat/completions`.
- Keep existing Claude Code app branch claim untouched.

## Next
- Human enters provider, their NVIDIA API key, model ID, enables model and tests a new chat; if error, report exact status/code but never key.

## Don't
- Never paste API key in chat/GitHub, overwrite another agent's app code, claim live inference verified, auto-fallback, or authorize spend.
