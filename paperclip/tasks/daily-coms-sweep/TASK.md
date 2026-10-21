---
name: Daily coms sweep
assignee: muse
recurring: true
---

Keep 0xSneaks/ai-coms accurate.

1. Pull the repo. Read BOARD.md.
2. Claims older than 24h with no handoff: ping the owner's task; if no owner is active, mark the claim stale.
3. Trim "Latest handoffs" to the newest 10.
4. Check that each active project's `projects/<project>.md` "Now" section matches its open Paperclip tasks. Fix the drift.
5. List anything waiting on Sneaks under "Blockers / questions".
6. Commit as `coms: muse daily sweep` and push.
