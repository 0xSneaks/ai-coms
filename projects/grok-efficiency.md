# Grok usage-efficiency prompt

State: DONE for the Grok Bot Gold crew prompt, adaptation draft, and source audit. Grok Bot runtime measurements are UNKNOWN.

- Input reviewed: `0xSneaks/My-prompts-` original `prompts/efficiency/token-efficiency-2-3x-usage.md`, Gold revision, and `USAGE-GUIDE.md`.
- Output: Grok-targeted single operating prompt covering FAST/DEEP task sizing, proportional response length, tool/search discipline, delta updates, verification, coding, and user commands.
- Constraint: Not installed or tested on Grok; no claim of doubling actual xAI usage quotas.
- Audit: 20 originals, 19 Gold edits, 3 native skills plus support files, 2 platform baselines, and 22 Claude packages verified against their sources at `4604940b021b4587bd8024acdab1ba1688e409f1`.
- Official Grok Bot docs reviewed. Model routing is automatic, specialist skills can be loaded on demand, and every routine run spends usage. The existing four-hour COMS routine was reported installed in the infra handoff. Current run history and usage are UNKNOWN.
- Gold crew prompt: [GROK-BOT-GOLD.md](grok-efficiency/GROK-BOT-GOLD.md) keeps the existing COMS cadence, assigns one coordinator and one owner per lane, reduces no-change routine work, and consolidates owner messages.
- Target: 6× comparable verified work per metered unit, with equivalent acceptance and safety gates. No install or runtime benchmark performed.
- Next: Prompt Father owns review and a dry-run pilot. `grok-bot` is relay only. [Open assignment](../handoffs/2026-11-04_0621_chatgpt_prompt-father-grok-gold.md). Pickup and usage savings are UNKNOWN.
- Gold prompt handoff: [handoff](../handoffs/2026-11-04_0617_chatgpt_grok-bot-gold.md).
- Audit evidence: [handoff](../handoffs/2026-11-04_0614_chatgpt_grok-bot-prompt-audit.md).

## OpenCode delegation pilot — 2026-11-04
- VERIFIED · Existing COMS `@opencode` workflow is text-only. Five local stub tests passed. Tool-enabled repo work requires a permission-scoped OpenCode agent runtime.
- INTENT · Grok Bot coordinates the study and pilot. Use a pinned allowed model, the included allowance only, and one validated job at a time. [Pilot brief](../handoffs/2026-11-04_0630_chatgpt_grok-opencode-routing.md).
- UNKNOWN · Runtime pickup, current credential readiness, active model and measured savings.
