# Sneaks AI — Paperclip company

This folder is a [Paperclip](https://github.com/paperclipai/paperclip) company package. Import it and you get the org chart, agent instructions, the ai-coms skill, the usage-limit relay, and the daily coms sweep.

Paperclip runs the agents. ai-coms (this repo) stays the shared memory, so agents outside Paperclip (ChatGPT, Claude chat, the Muse app) stay in sync.

## Where it runs

Paperclip is a long-running Node server that launches the CLIs (OpenCode, Claude Code, Codex, Grok) on the **same machine**. Agents only work while that machine is on.

- **Your PC:** free, and fine to start with.
- **Always-on box** (a VPS, or an old PC/Mac mini on Tailscale): needed for 24/7 relays.
- **Vercel won't work.** Vercel runs short serverless functions, but Paperclip needs a server that stays up and can launch local CLIs.

## Setup (one time, on the host machine)

1. Install Node.js 24.11 or newer.
2. Install and log in to the CLIs you'll use: `opencode`, `claude`, `codex`, `grok`.
3. Make sure `git push` to 0xSneaks/ai-coms works from that machine.
4. Run `npx paperclipai onboard --yes`. The dashboard opens at http://localhost:3100.
5. Clone this repo: `git clone https://github.com/0xSneaks/ai-coms`
6. Preview the import: `npx paperclipai company import ./ai-coms/paperclip --dry-run`
7. Import it: `npx paperclipai company import ./ai-coms/paperclip --target new`
8. In the dashboard, set each agent's working folder, then activate the agents and the "Daily coms sweep" routine. Imports land paused on purpose.
9. Open the "Stand up Sneaks AI" task and assign it to Muse. Each agent signs ROLLCALL.md, which proves the whole chain works.

If an import fails partway through, Paperclip can leave a half-made company behind. Delete it in the dashboard before retrying.

**First live test:** [`EXPERIMENT.md`](EXPERIMENT.md) if you have a computer, or [`EXPERIMENT-MUSE.md`](EXPERIMENT-MUSE.md) to have Muse host it on his VM.

## Files

| File | What it is |
|---|---|
| `COMPANY.md` | Mission, org chart, relay chain, hard rules |
| `agents/<slug>/AGENTS.md` | Each agent's job description |
| `skills/ai-coms/SKILL.md` | The check-in / sign-off protocol (copy of `/skills/ai-coms/SKILL.md`; keep them identical) |
| `tasks/` | The stand-up task, plus the daily coms sweep routine |
| `.paperclip.yaml` | Adapters, heartbeats, budgets, routine schedule |

## Usage-limit relay

When an agent hits its limit, it hands off and comments `RELAY`. Muse reassigns the task down the chain in `COMPANY.md` on his next hourly heartbeat. High-risk work never relays to a cheaper model.
