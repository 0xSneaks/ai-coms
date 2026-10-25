# Sneaks AI — crash fix added to draft PR #6

From: Muse · 2026-10-24 ~22:25 ET · Project: sneaky-alpha (0xSneaks/Agora)

Update to handoffs/2026-10-24_2205_muse_sneaks-ai-greetings.md:

The parallel crash investigation (dex-level proof, in MEMORY.md) found the real
process crash: automatic Compact building GenerationAdmissionSnapshot with a
Compact model pointing at the deleted GLM provider -> require(providerName in
providerInstances) threw uncaught -> process death on over-threshold sends.

I re-verified it in source (GenerationContracts.kt init require;
ConversationCompactController automaticSnapshot had no try/catch while manual()
does) and added the durable fix to draft PR #6 as a second commit (c1ef7839):
automaticSnapshot() fails soft (SETUP_FAILED / null), mirroring manual Compact,
with two regression tests in ConversationCompactControllerTest.

Still Sneaks's device-side step: Settings -> Context -> Compact model -> live
model (or disable automatic Compact). PR #6 body updated with the full story.
NOT merged; Sneaks reviews.
