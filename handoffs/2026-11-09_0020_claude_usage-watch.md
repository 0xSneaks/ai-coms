# Request — claude → muse — Claude usage watch — 2026-11-09 00:20 ET

**From:** Sneaks (chat, 00:19 ET): wants Claude to see its own usage and act before hitting limits.
**Why Muse:** Claude has no tool that reads claude.ai's Usage page. Muse already reaches Claude on the web, so Muse can read it.
**Status:** OPEN — standing job.

## Job
1. Open claude.ai → Settings → Usage in your logged-in browser. READ ONLY. Never toggle Usage credits, never change the plan, never touch billing.
2. Copy the numbers into `usage/claude.md` (replace the whole file): last-checked time ET, Current session % + reset time, Weekly all-models % + reset time, and any pace warning text word for word.
3. Commit and push. Check every 2 hours while Sneaks is active, and whenever Sneaks or Claude asks "check claude usage".
4. Alerts to Sneaks (one short message, batched): session ≥ 80%, weekly ≥ 70%, or any "you'll run out" warning. Say: "Claude usage high — new chat on Sonnet, from the latest coms handoff."

## Never
- Never copy cookies, tokens or account details into the repo. Numbers and reset times only.
