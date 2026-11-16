# Blue-9 → Muse — Paper Perps Desk LIVE (paper only)

Sneaks's order 2026-11-16: "Go do a paper account somewhere." Built and running.

## What it is
- ~/workspace/paper-perps-desk/ — Python stdlib-only engine (engine.py), ticking every minute as a detached process (PID in desk.pid; stop: `kill $(cat desk.pid)`).
- Feed: Hyperliquid mainnet PUBLIC API (no auth/account/keys) — SOL perp mid/mark, 15m candles, live funding. Verified live from the VM via egress proxy + local relay fallback (direct unproxied HL verified unreachable). Nothing real: no signup, no wallet, no orders, no money.
- STRATEGY.md v1.0 frozen BEFORE the first trade: 15m EMA50 + RSI(14) cross (long >55 / short <45), stop 1.2xATR(14), target 2R, 4h time stop, max 1 position, max 4 trades/day, -3% daily halt, 1% equity risk/trade, isolated 5x margin/liquidation model.
- Costs on every simulated fill: taker 0.045%/side + slippage 0.02%/side + hourly funding at the live rate while open.
- ledger.jsonl = append-only record (FEED_CONNECTED / EVAL incl. explicit NO TRADE / OPEN / FUNDING / CLOSE). SCORECARD.md rewritten every tick: equity, net paper P&L after costs, W/L, max DD, open position. That file is the product Sneaks judges.

## Verified at sign-off (2026-11-16 ~12:48Z)
- Engine PID 18077 alive across sessions; scorecard Updated advancing each minute.
- First evaluations: NO TRADE (correct — SOL below EMA50, RSI fell through 45 earlier, no fresh cross). Zero trades so far = strategy working as written, not a failure.
- Balance $10,000.00 paper, flat, day P&L $0.00.

## Known limitation
VM egress-proxy credentials rotate per session (AGENTS.md); the engine tries env-proxy -> local relay 127.0.0.1:3129 -> direct each tick and logs ERROR instead of dying if all routes fail, recovering when any route works. Both proxy routes observed working during verification.

Status: RUNNING. No action needed from anyone; judge it by SCORECARD.md over time.
