# Experiment (no computer): Muse hosts Paperclip on his VM

Sneaks has no computer. Muse runs everything on his own VM and reports to Sneaks in chat. Sneaks only answers questions and approves.

**Roles:**
- **Muse (you, the Meta app)** operate it. You're Sneaks's hands: you create the tasks and read the results.
- **"Muse" inside Paperclip** is the CEO agent. It runs on OpenCode on the same VM.
- **"Claude Code" inside Paperclip** is the CTO agent. It runs on the `claude` CLI on the same VM.

Follow AI COMS: claim `paperclip/ live test` on BOARD.md, then write a handoff at the end. Report to Sneaks at every **CHECKPOINT**. Stop at every **STOP**.

---

## Phase 0 — Can the VM host it?

Check each item and report a PASS/FAIL table to Sneaks.

1. Node.js ≥ 24.11. If it's older: `mkdir ~/n24 && cd ~/n24 && npm init -y && npm i node@24`, then put `~/n24/node_modules/node/bin` first on PATH.
2. A process can keep running after your session ends (tmux, nohup, or a service). Test it: start `sleep 600`, end the session, come back, and check it's still alive.
3. At least 2 GB of free disk.
4. OpenCode works: `opencode models` lists something you can use.
5. Claude CLI: `npm i -g @anthropic-ai/claude-code`, then `claude --version`.
6. Git push from a script works. Plain `git` has no auth on this VM, so find the method Paperclip agents can use (a GitHub token in an env var, or your gh-rest path).

**CHECKPOINT:** send Sneaks the table.
**STOP** if #2 fails. A VM that can't keep Paperclip running can't host it. Tell Sneaks the option: Railway at about $5–15 a month. That costs money, so his call.

## Phase 1 — Logins (needs Sneaks)

1. Claude CLI login: run `claude --help` and find the login or long-lived-token command (likely `claude setup-token`). Send Sneaks the login link. He opens it on his phone and gives you the code through your **secure input**.
2. Store the Claude token and the GitHub token as environment variables or secrets on the VM only.
3. **Never** put these in ai-coms, a task, a comment, a commit, or chat.

## Phase 2 — Install Paperclip

1. `mkdir ~/pc && cd ~/pc && npm init -y && npm i paperclipai --legacy-peer-deps`
   (Plain `npx paperclipai` failed on npm 10 with an `edgesOut` error.)
2. Run as a **non-root** user. The embedded Postgres refuses to run as root. If you see `initdb EACCES`, run `chmod -R +x node_modules/@embedded-postgres/*/native/bin`.
3. Start it so it keeps running: `npx paperclipai onboard --yes` inside tmux or nohup.
4. Confirm: `curl -s http://127.0.0.1:3100/api/health`
5. Pull 0xSneaks/ai-coms to `~/ai-coms`.
6. Import only the two agents:
   `npx paperclipai company import ~/ai-coms/paperclip --target new --agents muse,claude-code --dry-run`, then run it again with `--yes` instead of `--dry-run`.
7. Configure:
   - Set the CEO's model to a real `opencode models` entry. `opencode/gpt-5-nano` is a placeholder.
   - Set both agents' working folder to `~/ai-coms`.
   - Give both agents the Claude and GitHub env vars, as secrets.
   - Turn on both heartbeats. Set the CEO's interval to 300 seconds for the test.
   - Use `npx paperclipai agent --help` or the API at http://127.0.0.1:3100/api.

**CHECKPOINT:** tell Sneaks: server up, both agents ready, which model, any errors.

## Phase 3 — EXPERIMENT-1: one command

Create one task in Paperclip, assigned to the **CEO agent** (`npx paperclipai issue create --help`):

> EXPERIMENT-1. Delegate, don't do it yourself. Have Claude Code create experiments/exp-1.md in 0xSneaks/ai-coms containing "EXP-1 · done by <agent> · <timestamp ET> · code BLUE-0321", then push to main. When it's on GitHub, verify it, comment the commit link, and close this task.

Then don't touch anything. Watch it for up to 30 minutes.

**Pass:** the CEO creates a sub-task for Claude Code on its own, the file lands on GitHub, and the task closes with the link.

## Phase 4 — EXPERIMENT-2: relay (simulated usage limit)

Create a task for the CEO agent:

> EXPERIMENT-2. Have Claude Code create experiments/exp-2.md in 0xSneaks/ai-coms with "EXP-2 · <agent> · <timestamp ET>", push it, and report the commit link.

When Claude Code picks up its sub-task:
1. Pause the Claude Code agent.
2. Comment on the sub-task: `RELAY: simulated usage limit · next step: create and push experiments/exp-2.md`

**Pass:** within about 10 minutes, the CEO notices the relay and finishes it himself. The file says the CEO did it, and the task closes with a commit link.

## Phase 5 — Report

Send Sneaks:

| Check | Pass/Fail | Evidence |
|---|---|---|
| VM can host (Phase 0) | | |
| Setup done, both agents ready | | |
| EXP-1 delegated on its own | | task id |
| EXP-1 file on GitHub | | commit link |
| EXP-2 relay caught + finished | | commit link |

Then unpause Claude Code, set the CEO interval back to 3600, write your handoff, and release your claim.

## Rules for this test

- Only ai-coms gets touched. Don't push the 7 local repo AGENTS.md changes as part of this.
- No money spent without Sneaks saying yes.
- If any step fails twice, change approach or **STOP** and report the exact error.
