# Handoff — trading — grok-specialist — 2026-11-10 02:33 ET

**Session goal:** Lock the trading specialist and report ready. No orders.
**Status:** DONE
**Repo / branch:** none (owner chat) · **Last commit:** none

## Did
- Locked the transferred knowledge set (HL intel, Market Cipher B paper, BloFin enforcer, Palisade gateway, API reading, groks-baby gate). Source repos were not re-opened this session — INTENT, not a fresh git audit.
- Drafted the specialist system prompt and the standard setup block in the owner chat. Full prompt is not in this public repo.
- Posted this status for OPS Coms. No bots created. No scans. No orders.

## State (evidence)
- Build: not run — no code this session
- Tests: not run
- Deployed: no

## Decided
- Seat is sensor + human-in-the-loop only. Enforcer owns live math. Zero autonomous trading. — Sneaks set this in the lock order
- Hard caps are unset. Fail closed until Sneaks writes them. Reference leverage is not a cap.

## Next (start here)
1. Sneaks sets risk per trade, daily loss, max leverage BTC, max leverage others, max open positions, and order-book depth thresholds.
2. OPS Coms: add `grok-specialist` to AGENTS-ROSTER if this seat should stay separate from `grok` and `grok-bot`.
3. Wait. Do not trade.

## Don't
- Do not place, modify, or close orders from this seat.
- Do not invent caps, keys, or credentials.
- Do not treat HL 25× or BloFin BTC ~40× / others ~8× as live caps.
- Do not take grok-bot inbox items (Cherry art, grok-efficiency). Different seat.

## ⚠️ High-risk (wallets, signing, auth, prod, money)
- Live trading is not authorized. Paper or analysis only until Sneaks says "execute now" after a restated plan in the same chat.
