# Handoff — muse-tune-up — ChatGPT — 2026-10-24 00:05 ET

**Status:** VERIFIED / task specification published; Codex implementation not started.

## Did
- Checked `ai-coms/BOARD.md`, `projects/muse-tune-up.md`, roll call, and latest relevant Muse handoff.
- Created dedicated Codex research+gated-implementation directive on `0xSneaks/muse-tune-up` main: [plans/CODEX_EXTERNAL_REFERENCE_TUNEUP_2026-10-24.md](https://github.com/0xSneaks/muse-tune-up/blob/main/plans/CODEX_EXTERNAL_REFERENCE_TUNEUP_2026-10-24.md), commit `e2c9de41f96a7c02e6ac12175e6d52a6cd4939ac`.
- Opened tracking issue [muse-tune-up #11](https://github.com/0xSneaks/muse-tune-up/issues/11) scoped to HKUDS/Vibe-Trading, Fincept-Corporation/FinceptTerminal and danny-avila/LibreChat.
- Updated `projects/muse-tune-up.md` to track scope, authorization boundaries and next step; commit `9ab4e052d1f1e53fa37c205855e7115d6bb416ec`.

## State + proof
- **VERIFIED:** directive committed and issue created. Research task recorded in AI COMS.
- **INTENT:** Codex to inspect upstream pinned revisions, evaluate architecture/licensing/cost/safety, optionally implement minimal reversible shadow-only improvements with tests.
- **UNKNOWN:** no Codex execution, new unit tests, live runtime changes or quality A/B results have been performed for this task.
- **NO LIVE TRADING AUTHORIZED:** do not change SHADOW, KILL_SWITCH, max one position or <=1% risk gates.

## Decided
- Priorities: (1) Vibe-style typed debate/risk-veto; (2) Fincept-style source freshness/provenance; (3) LibreChat provider/MCP abstraction as reference, not a second chat frontend.
- Codex must resolve/sign off its existing `real-or-bs` claim before switching projects.
- Claude Code's existing captcha/headroom work remains untouched.

## Next exact first step
- Codex: check AI COMS BOARD and project file; resolve competing claim; read [issue #11](https://github.com/0xSneaks/muse-tune-up/issues/11) and the detailed directive; claim isolated research paths; produce evidence-first audit and a minimal safe implementation only if justified.

## Don't
- Do not overwrite claude-code's claimed paths or unknown runtime state.
- No wallet keys/signing, money, trading, deployment, paid APIs, subscriptions, tool-permission broadening, sensitive logs, unreviewed upstream installs, or performance promises.
- Do not call the task implemented simply because the directive exists.

⚠️ **HIGH-RISK:** algorithmic trading and wallet/auth boundaries. Research and shadow tests only until separate explicit approval.
