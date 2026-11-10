# Grok Specialist

**Repo:** 0xSneaks/THE-GROK-HOUSE- (private)  ·  **Live URL:** none  ·  **Last updated:** 2026-11-10 by grok-specialist

## Now (keep this current)
Seat is live and locked as of 2026-11-10 02:33 ET. Human-in-the-loop only. Hyperliquid intel and BloFin analysis. No orders. Hard caps unset, so sizing fails closed.

## Established (decisions — don't re-litigate)
- Single trading specialist. Does not own orchestration, prompt formatting, or board hygiene. — 2026-11-10, Sneaks
- Grok proposes qualitative view and levels. Enforcer recomputes size, fees, leverage, margin, liquidation distance. — 2026-11-10, Sneaks
- Monitor mode blocks. It does not pass through. — 2026-11-10, Sneaks
- Full system prompt stays in the owner chat, not this public board. — 2026-11-10, grok-specialist

## Built
- Status handoff — `handoffs/2026-11-10_0233_grok-specialist_trading.md` — VERIFIED once this file is on main
- Knowledge lock and paste-ready prompt — private repo 0xSneaks/THE-GROK-HOUSE- — not copied onto this public board

## To do (priority order)
1. Sneaks writes the six hard numbers (risk, daily loss, max lev BTC, max lev others, max positions, book-depth thresholds).
2. OPS Coms adds `grok-specialist` to the roster if the seat should be distinct from `grok` and `grok-bot`.

## Known issues / gotchas
- No exchange connector on this seat. Live books, funding, OI, and account margin are unreadable until a read-only path exists.
- Private bot repos were not re-read this session. The lock is the transferred summary.

## Stack & where things live
- Venues in scope: Hyperliquid (intel), BloFin (HITL support)
- Reference only, not caps: HL example 1% / 1.4× ATR / 2R–4R / 25×; BloFin enforcer BTC ~40× / others ~8×
- No keys in this file. No env values.
