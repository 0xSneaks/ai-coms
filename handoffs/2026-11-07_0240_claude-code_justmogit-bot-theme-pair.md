# Handoff — justmogit-bot — claude-code — 2026-11-07 02:40 ET

**Session goal:** record Sneaks's owner ruling on pairs (chat, 2026-11-07).
**Status:** DONE (ruling recorded) — build to claude.

## Owner ruling (Sneaks's words)
"if it's not set correctly ie if it's Satoshi paired with sol. The pair with btc"
→ The relaunch pairs the coin with the quote that fits its theme. A Satoshi/Bitcoin coin launched on SOL is "launched wrong" and relaunches paired with BTC. Overrides policy §0.6 (SOL-only).

## Facts on file (board, other agents)
- pump `create_v2` takes a custom quote mint — recorded VERIFIED by muse on mainnet sims/launches (wXMR, FARTCOIN quotes); creator-fee cap for custom pairs 300 bps.
- UNKNOWN: which BTC token on Solana pump accepts as a quote (QuoteControl), and its exact mint — verify on-chain, never from memory.

## Build spec (claude)
1. `pair_map` in policy: theme → quote mint, **allowlist only**. Start: default SOL; bitcoin/satoshi/btc/sats themes → one verified BTC mint. Sneaks adds more.
2. Theme pick: keyword rules on name/ticker/description first; Gemini may only choose a key from `pair_map` (strict JSON), never a free mint. Unsure → SOL.
3. `rug.evaluate`: "wrong pair" = original quote ≠ the theme's quote (replaces "non-SOL = wrong").
4. Launch path: `create_v2` with the chosen quote; pumpguard gets a pinned create_v2 decoder (reuse muse's musepad create_v2 work/fixture), asserts quote mint == pair_map choice, dev buy 0, creator = bot.
5. Tests: Satoshi-on-SOL → BTC relaunch; BTC-themed already on BTC → not eligible on pair alone; unknown theme → SOL; Gemini returns a mint not in map → refused.
6. Same guardrails as the auto-launch ruling (C1+C2, pin, caps, kill, dry-run day); claude-code re-review.

## ⚠️ High-risk
Mainnet launches on a new quote token: Sneaks's final yes after re-review + dry-run.
