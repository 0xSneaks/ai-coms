# Grok Bot prompt library audit — 2026-11-04 06:14 ET

## Did
- VERIFIED: inventoried [My-prompts- main](https://github.com/0xSneaks/My-prompts-/tree/4604940b021b4587bd8024acdab1ba1688e409f1): 20 originals, 19 Gold variants, 6 files in native skill folders (3 skills, 2 references, 1 attribution file), and 2 platform baselines. Checked each Claude ZIP against its manifest-wrapped Gold source or native skill files. All 22 archives matched.
- VERIFIED: read the official Grok Bot setup, memory, settings, skills/routines, computer/apps, approvals, FAQ and subscription usage docs, plus the separate X @bot help page.

## State + proof
- VERIFIED: the original 2–3× usage prompt explicitly targets Claude. Its Gold edit preserves deltas, continuity, concise output and critical checks. The four efficiency variants overlap substantially. The repo has a comparison harness and no published benchmark result in its results directory.
- VERIFIED: Hollywoodslop and Low-Energy originals are byte-identical. Their Gold variants differ, and CUTLINE adds an artifact-only output rule. Meme Accuracy adds reference fidelity and exact-text QA.
- VERIFIED: Docs Builder separates code evidence from intent; GitBook Publisher adds sync and publishing checks. Idea Forge is a separate evidence/cost/falsification workflow. Cherry Mainnet Release Guard is project-scoped and gates mainnet actions on current evidence and explicit owner approval.
- VERIFIED: trading prompts span Hyperliquid architecture, Hyperliquid setups, KCEX scan and KCEX single-pair. The Hyperliquid Gold architecture starts in paper mode and carries explicit live gates. KCEX Gold sizes from stop distance under the account risk cap. The active user rule for this assistant is analysis only, maximum 1% risk. Hotel and relocation prompts are separate specialists with different inputs and freshness needs.
- VERIFIED: the [Grok Bot FAQ](https://docs.x.ai/grok-bot/faq) describes automatic model selection with no picker or per-model usage breakdown. [Bots](https://docs.x.ai/grok-bot/bots) documents per-Bot memory. [Skills and routines](https://docs.x.ai/grok-bot/skills-routines-and-automations) documents private reusable skills and usage charged on each routine run, including Test. [Computer and apps](https://docs.x.ai/grok-bot/computer-and-apps) documents the shared computer and account-wide app access. [Approvals](https://docs.x.ai/grok-bot/approvals-security-and-privacy) documents Ask first controls. [Subscription usage](https://docs.x.ai/x-subscription/grok-bot) documents the weekly shared pool for The X Subscription and separate legacy handling.
- VERIFIED from [the infra handoff](2026-11-04_0342_grok-bot_infra.md): existing routine was installed at a 4-hour cadence and explicitly loads GROK.md, runs bin/coms, and acts on relevant open items. Scheduled baseline is six launches daily / 42 weekly if all fire. Current execution history, measured usage, and installed prompt version are UNKNOWN.

## Decided
- INFERENCE: use the compact Lyra skill as the behavioral source, keep one efficiency layer, and load one named specialist when needed. Separate the Bot's remembered role, repo-backed facts, private skills and routine trigger. Use documented Ask first controls and explicit gates for consequential operations.
- INFERENCE: trim work before trimming prose. For the routine, keep the required 4-hour COMS cadence and use a bounded no-change path before broader project reads or delegation. Preserve relevant owner orders and new handoffs when there is a change. A quiet reply still follows a metered run.
- VERIFIED: audit only. No prompt repo or Grok Bot configuration edits and no account measurement.

## Next
- Open the routine's run history and the correct plan usage meter. Compare a matched set of ordinary tasks and COMS runs against a scoped baseline, tracking completed work, usage delta, and missed requests.

## Don't
- Do not treat 2–3× as measured savings, try to force a specific backend model, or assume Grok Bot auto-loads GROK.md. Do not weaken security, test, or approval gates for token savings. Keep private repo material out of public X replies.
