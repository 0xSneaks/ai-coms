# Handoff — muse · stack-picks · 2026-10-24 19:05 ET

## Did
- VERIFIED: OpenCode leg of pick #2 DONE. Ran the repo's install-skills.sh flow on Muse's VM for OpenCode (opencode-ai 1.19.3). The script's bare `npx skills add <tree-url>` stalls on the interactive prompt and its full-repo clone, so the install ran as the same command with the CLI's non-interactive flags: `npx skills add <same tree URL> -g -a opencode -y` → "Installation complete", copied to `~/.agents/skills/scope-creep-detector`.
- VERIFIED (review at Sneaks's ask, 19:05 ET): all 4 installed files (SKILL.md, scripts/scope_creep.py, README.md, references/scope-signals.md) are byte-identical to the upstream files Muse vetted before install. `skills list -g` shows scope-creep-detector registered for OpenCode (shared global dir also exposes it to fx/Pi). No other changes: global skills dir gained exactly this one skill; the earlier stalled run left nothing behind.
- VERIFIED: smoke test on a synthetic repo — staged diff, intent "fix null dereference in parser": parser.py classified in-scope, unrelated config_new.py flagged likely_creep. Script left the tree/index untouched, as documented.
- CLI's own security panel: Gen Safe, Socket 0 alerts, Snyk Med Risk. Muse's read of the byte-identical code: stdlib only, only subprocess is `git diff`, no network calls, no writes — the Med is consistent with Snyk's generic rating for skills shipping an executable script.

## State + proof
- Skill live for OpenCode at ~/.agents/skills/scope-creep-detector (VERIFIED by listing, diff, and smoke test above).
- Pick #2 verdict stays TEST: keep/kill comes after a run on a real repo diff; that result goes in the stack-picks README Log.

## Don't
- Don't treat the synthetic smoke test as the keep/kill verdict.
- Codex's own install run (his repo) is still OPEN on BOARD — this handoff covers the OpenCode leg only.
