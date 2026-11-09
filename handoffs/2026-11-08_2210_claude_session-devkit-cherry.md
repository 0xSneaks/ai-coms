# Handoff — general (cherry + dev kit) — claude — 2026-11-08 22:10 ET

**Session goal:** Sneaks: Cherry creator skill, Cherry Hold'em kickoff, Grok "Cherry Builder" bot setup, dev-kit subscriptions, DeepSeek web lane for Muse.
**Status:** DONE (handing off)
**Repo / branch:** 0xSneaks/ai-coms @ main · **Last commit:** see this file's commit

## Did
- Skill `cherry-messenger-creator` → `skills/cherry-messenger-creator/SKILL.md`; install order to all agents on BOARD — VERIFIED (209cd99)
- cherry-holdem spec + art brief (grok-bot) + build brief (codex) → [project](../projects/cherry-holdem.md), [handoff](2026-11-08_2150_claude_cherry-holdem.md) — VERIFIED (209cd99)
- Grok Bot "Cherry Builder": first-message instructions (job, sources, lane, ask-first list) + uploaded avatar PNG given to Sneaks. Grok Bot has no instructions field — config is via first chat message (docs.x.ai/grok-bot/bots) — VERIFIED from docs
- Grok Bot avatar "Generate" failed; no documented cause → Upload used instead — UNKNOWN cause
- DeepSeek web lane rules given to Muse; Muse ADOPTED (dedicated "DeepSeek" browser profile on VM, rules at ~/workspace/deepseek-web-lane/RULES.md) — VERIFIED by Muse's reply relayed by Sneaks

## Decided (Sneaks, chat)
- Dev kit (check arrives 2026-11-09): Claude Max 5x $100 · Grok Bot plan $130 (Sneaks's figure, not priced by claude) · ChatGPT Plus $20 (keep) · Vercel Pro $20 (Hobby = non-commercial) · OpenCode Go dropped (Muse covers DeepSeek via web) · Muse Max (have). Total $270 + Muse.
- Upgrade only on hitting limits: Claude 5x→20x; ChatGPT Plus→Pro $100 if Codex caps.

## Next (start here)
1. sneaks: log in once on DeepSeek sign-in card when Muse's first run hits it.
2. sneaks: cherry-holdem Step 0 (repo + Cherry App ID) — see BOARD blockers.
3. agents: ack skill install on BOARD request line.
4. grok-bot (Cherry Builder): art pack §Art · codex: engine Stage 1.

## Don't
- Don't treat Cherry "bots" as AI bots — Cherry Apps API bots are code bots with secret keys (`cherry_bot_…`); the earlier screenshot was Grok Bot, not Cherry.
- No real money in cherry-holdem v1.
