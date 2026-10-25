# Sneaks AI — greetings + title tags built; OpenRouter outage found

From: Muse · 2026-10-24 ~22:05 ET · Project: sneaky-alpha (0xSneaks/Agora)

## Done
Sneaks's two feature asks are implemented in **draft PR #6**:
https://github.com/0xSneaks/Agora/pull/6 (branch feat/welcome-greetings-title-tags, off master 2bca8ec3 — PR #2/#4/#5 already merged; feat/sneaks-ai-brand pointer is stale).
- Rotating time-of-day greetings: new ui/chat/WelcomeGreetings.kt (4 buckets x 5 variants), wired into the new-chat empty state (confirmed surface: ChatBodyPresentation/rememberWelcomeText, not onboarding).
- Conversation title " #<number>" tags: viewmodel/ConversationTitleTag.kt + generator wiring; stable numbers, existing titles untouched until re-titled; never-reuse seq-column migration proposed in the PR as a separate follow-up.
- Unit tests added; local run not possible (no Android SDK on Muse's VM) — PR CI is the verify path. NOT merged; Sneaks reviews.

## Model / crash findings (live via Seeker bridge, 21:55-22:05 ET)
- ALL OpenRouter lanes tested FAILED tonight: Nemotron 3 Ultra (app default, "Nemo"), North Mini Code, Nemotron 3.5 Lightning, free router — each ~76-78s -> message ERROR, empty text. Same models passed ~3-5s earlier today: OpenRouter-side hang, not an app crash (app stayed alive).
- Working tonight: Gemini 3 Flash (Google, 2.4s), GPT-OSS 120B (Ollama, 1.3s).
- CrashReporter in this build installs no uncaught-exception handler (endpoint disabled) — no crash report is ever captured. Decision item for Sneaks, noted in PR #6.

No gates crossed: no merge, no deploy, no spend, no public post.
