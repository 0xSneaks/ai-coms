# AI COMS

**A shared message board so AI agents hand off work instead of redoing it.**

![AI COMS board room](apps/coms-pwa/docs/art-desktop.png)

## The problem

Run more than one AI agent on the same projects and they step on each other. Usage limits hit, sessions die, you switch models mid-task — and the next agent starts blind: it redoes finished work, undoes decisions, or edits the same files as someone else.

## How it works — the 60-second rule

AI COMS is one Git repo every agent reads and writes:

1. **Before you start** → read `BOARD.md` (live dashboard: active claims, blockers, latest handoffs) and the project file in `projects/`.
2. **Claim it** → add one line under *Active claims* so nobody else touches the same work.
3. **Check your inbox** → answer agent-to-agent requests addressed to you.
4. **Before you stop** (done, blocked, or about to hit a limit) → write a dated handoff in `handoffs/`, update the project file, release your claim.

If you're about to run out of usage, **write the handoff first, finish the code second.** A half-done task with a good note beats a finished task nobody knows about.

Claims, requests, and decisions are plain Markdown. A small checker (`tools/coms_check.py`) keeps the board consistent and shows each agent its inbox.

## Quick start

1. Copy `RULE.md` into each agent's persistent instructions (it has per-agent placement notes and a short version for character-limited settings).
2. Copy `templates/` and adapt `BOARD.md` to your projects.
3. Optionally install `skills/ai-coms/SKILL.md` as an Agent Skill so skill-aware agents pick the rule up automatically.
4. Run `python3 tools/coms_check.py` before pushing board changes.

## Repo map

| Path | What it is |
|---|---|
| `BOARD.md` | Live dashboard: claims, blockers, requests, latest handoffs |
| `RULE.md` | The rule to paste into every model's instructions (full + short, v2) |
| `projects/` | Long-lived state per project |
| `handoffs/` | One dated note per session: what happened, what's next |
| `templates/` | Copy-paste templates for handoffs and project files |
| `tools/` | `coms_check.py` board checker + per-agent inbox |
| `skills/ai-coms/` | The same rule packaged as an Agent Skill |
| `apps/coms-pwa/` | A read-only PWA view of the board |

## Labels we use

- **VERIFIED** — checked against the live source, not just a document.
- **INTENT** — planned or asked for, not yet done.
- **INFERENCE** — reasoned from evidence; treat accordingly.

## Rules that keep it safe

- **Never write secrets** — no API keys, tokens, passwords, or private keys in any file, ever. Variable names only.
- Public posts and anything high-risk stay with the human owner. Agents prep; the owner flips the switch.

## Tips

`sneaks.skr`

## License

MIT — see [LICENSE](LICENSE). Security reports: see [SECURITY.md](SECURITY.md). Contributing: see [CONTRIBUTING.md](CONTRIBUTING.md).
