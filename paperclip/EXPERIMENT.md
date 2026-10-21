# Experiment: one command → Muse → Claude Code

Tests the hub with just two agents: **Muse** (CEO, on OpenCode) and **Claude Code** (CTO). You give one order to Muse and the work gets done, even when Claude Code "hits its limit".

Run it on the computer that will host Paperclip. A cloud session can't keep the server running.

## Step 1 — Kickoff (paste into a NEW Claude Code session, Sonnet, on your computer)

```text
Set up a Paperclip test for me. Follow the AI COMS rule (check coms first, sign off at the end).

1. Check: Node.js >= 24.11, git, the `opencode` CLI, and the `claude` CLI are installed and logged in. If something's missing, tell me the exact install command and stop.
2. Clone or pull https://github.com/0xSneaks/ai-coms into my home folder.
3. Start Paperclip: `npx paperclipai onboard --yes` (local_trusted mode). Leave it running in its own terminal. Confirm http://localhost:3100/api/health responds.
   If npm fails with "Cannot read properties of null (reading 'edgesOut')", install it into a folder with `npm i paperclipai --legacy-peer-deps` and run `npx paperclipai onboard --yes` from there.
4. Dry run, then import only Muse and Claude Code:
   npx paperclipai company import ./ai-coms/paperclip --target new --agents muse,claude-code --dry-run
   npx paperclipai company import ./ai-coms/paperclip --target new --agents muse,claude-code --yes
5. Run `opencode models`, show me the list, and set Muse's model (agent settings → model) to the one I pick. The package ships a placeholder.
6. Set both agents' working folder to the ai-coms clone. Turn on both agents' heartbeats. Set Muse's interval to 300 seconds (5 min) for this test.
7. Don't create tasks. Report: dashboard URL, both agents' status, Muse's model, and anything that failed.
Then sign off in ai-coms.
```

## Step 2 — The one command (you, in the dashboard)

Create a task, assign it to **Muse**, and paste:

```text
EXPERIMENT-1. Delegate, don't do it yourself.
Have Claude Code create experiments/exp-1.md in 0xSneaks/ai-coms containing:
"EXP-1 · done by <agent> · <timestamp ET> · code BLUE-0321", then commit and push to main.
When it's on GitHub, verify it, comment the commit link here, and close this task.
```

**Pass:** Muse creates a sub-task for Claude Code by himself, the file lands on GitHub, and Muse closes the task with the link. You typed one thing.

## Step 3 — Relay test (simulated usage limit)

Create a second task, assigned to **Muse**:

```text
EXPERIMENT-2. Have Claude Code create experiments/exp-2.md in 0xSneaks/ai-coms with
"EXP-2 · <agent> · <timestamp ET>", push it, and report the commit link.
```

As soon as Claude Code picks up its sub-task:
1. Pause the Claude Code agent in the dashboard.
2. Comment on its sub-task: `RELAY: simulated usage limit · next step: create and push experiments/exp-2.md`

**Pass:** within about 5 minutes, Muse notices the relay and finishes it himself (Codex isn't hired, so the chain falls back to him). The file says `muse`, and the task closes with a commit link. You didn't touch anything else.

## Grade

| Check | Pass? |
|---|---|
| Setup finished, both agents idle/ready | |
| EXP-1: Muse delegated on his own | |
| EXP-1: file on GitHub, task closed with link | |
| EXP-2: Muse caught the RELAY and finished | |
| Handoffs written to ai-coms by both agents | |

Afterward, unpause Claude Code, set Muse's interval back to 3600, and delete `experiments/` if you don't want it.

## What was already verified

On 2026-10-21, this package imported cleanly into a real Paperclip server (v2026.1012.0). It produced 4 agents with the correct org chart and adapters, the stand-up task, and the 8:37 AM ET daily routine.

Not yet verified: live agent runs. The test server had no logged-in CLIs. This experiment is the live test.
