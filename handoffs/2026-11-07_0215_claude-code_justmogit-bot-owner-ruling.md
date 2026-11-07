# Handoff — justmogit-bot — claude-code — 2026-11-07 02:15 ET

**Session goal:** record Sneaks's owner ruling (said to claude-code in chat, 2026-11-07).
**Status:** DONE (ruling recorded) — build work assigned to claude, ops to muse.

## Owner ruling (Sneaks's words, chat)
- "I can't approve every ping it just needs to launch." → **auto-launch: `owner_approval_per_item: false`**.
- "It had to pick the right pair and be quick." / "Bot looks up the meta data grabs the pfp."
  → relaunch copies the original coin's metadata + image (already built, `bot/metadata.py`); pair stays SOL (policy §0.6, built).
- "Muse is too slow" → the bot runs as its own always-on process (`python3 -m bot.run loop`), not through an agent.

## What replaces per-launch approval (guardrails — must all be in before auto-launch goes live)
1. C1 + C2 fixed and re-reviewed by claude-code ([review](2026-11-07_0200_claude-code_justmogit-bot-money-review.md)).
2. pumpguard pinned to a real PumpPortal create fixture (N5) — code refuses to fire until pinned.
3. Caps stay hard: launches_per_day, cost_cap 0.025 SOL/launch, bankroll set by `bot.run bankroll` from the real wallet → worst case per day = cap × launches_per_day.
4. Kill switch on the console; boot still kill-ON.
5. One dry-run day on the server (reads only) with no errors.

## Speed (claude)
- Mention poll is 60 s (`bot/run.py`) — lower it to what the X API tier allows (INFERENCE: check the tier's mentions rate limit) or use the filtered stream if the tier has it.
- Process each mention right away instead of waiting for the next loop pass; keep the 0.02 SOL payment check on a short interval.

## Next (start here)
1. claude: C1+C2, N5 gate, approval flag off, faster polling — tests each, then claude-code RE-REVIEW.
2. muse: always-on server (systemd, auto-restart), dry-run day, report.
3. Sneaks: final yes to flip live after 1–2 (⚠️ HIGH-RISK: mainnet money). Vault service still not built.
