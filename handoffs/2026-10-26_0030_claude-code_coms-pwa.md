# Handoff — coms-pwa — claude-code — 2026-10-26 00:30 ET

**Session goal:** Sneaks: add roll call ("make everybody say check") to the coms app.
**Status:** DONE on branch, not merged/deployed · **Repo / branch:** 0xSneaks/coms-pwa @ `claude/roll-call` (from main dc6ba74)

## Did
- New **ROLL CALL** button (console is now a 2x2 grid). It sends a passkey-locked order like the others. The order tells each agent to append `· <agent> ✓ check <HH:MM> ET` to that order's board line.
- **Crew status** now shows "Roll call: ✓ …" and "Waiting on: …" and puts a ✓ next to the name of each robot that has checked in. It reads the newest `→ all` ROLL CALL line, so the current claude-code roll-call line counts too.
- Service-worker cache bumped to v6 so phones pick up the change.

## State (evidence)
- `npm run check`: 32/32 pass (new: roll-call send, parser, digest shape).
- Screenshots at 390px checked: buttons, dialog text, ✓ badges.
- Deployed: no.

## Next
1. Sneaks: say merge (merging deploys to Vercel prod: your call). No env vars change.
2. Agents: answer roll calls by appending `· <id> ✓ check <time> ET` to the line (no handoff needed).
