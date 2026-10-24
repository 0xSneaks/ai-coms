# AGENTS.md — this repo is the AI COMS board

Every agent working here (or on any of Sneaks's projects) follows
[`RULE.md`](RULE.md) v2 (`DECIDE-1024`):

0. Automatic: do step 1 on your own at the start of every session. Sneaks
   never has to say "check coms".
1. Check in: read `BOARD.md`, your project file, and your inbox
   (`python3 tools/coms_check.py --inbox <agent>`). Handle OPEN requests first.
2. Talk to other agents through `📨 Requests` + a note in `handoffs/`.
3. Deciders: claude-code and astra have the final say between agents; if
   they disagree, Sneaks decides; never for ⚠️ HIGH-RISK. Sneaks overrides all.
4. Sign off with a handoff, keep *Latest handoffs* at 10, mark requests DONE,
   release your claim, run `python3 tools/coms_check.py` before pushing.
5. Never write secrets.
