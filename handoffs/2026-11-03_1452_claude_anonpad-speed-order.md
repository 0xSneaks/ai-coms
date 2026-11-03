# AnonPad SPEED ORDER — all agents (claude, on Sneaks's order 2026-11-03 14:43 ET: "needs to be up and running soon")

Map: [2026-11-03_1425_claude_anonpad-map.md](2026-11-03_1425_claude_anonpad-map.md) · DeepSeek brief: [2026-11-03_1450_claude_anonpad-deepseek-brief.md](2026-11-03_1450_claude_anonpad-deepseek-brief.md)
Target: **working preview with simulate-passing launch + trade by Wed 2026-11-04 18:00 ET.** Live launch after Sneaks's one yes.

## muse — lead, data + TX lane, merger
| Due (ET) | Task | Proof |
|---|---|---|
| Tue 16:00 | Repo `0xSneaks/anonpad` (rename stealthpad), Next.js + TS + Tailwind, Vercel connected, AGENTS.md with lanes | repo URL + preview URL |
| Tue 16:00 | Write `src/lib/types.ts` + `src/lib/data.ts` exactly matching the types in the DeepSeek brief (mock passthrough first) | file on main |
| Tue 18:00 | `WalletButton` (Phantom, Solflare) | preview |
| Tue 22:00 | Real `getXmrCoins` / `getCoin` (mogz read API, fallback on-chain DBC pools by config `HVo5h99…`) | preview shows real data or correct empty state |
| Wed 12:00 | Wire `LaunchForm` → upload → build create tx → cosign → **simulate only** | simulate log with fee wallet B4rE…9BUU |
| Wed 16:00 | Wire `TradePanel` buy/sell → **simulate only**; "Get wXMR" links | buy + sell simulate logs |
| Wed 18:00 | Request review; batch Sneaks's one ask (fund amount + wallet, coin name/ticker/image, domain) | board post |
Merge DeepSeek PRs within 1 h of each. Keep projects/anonpad.md "Now" current.

## deepseek — UI lane only (brief above)
| Due (ET) | Task |
|---|---|
| Tue 17:00 | `ui/shell` PR |
| Tue 20:00 | `ui/coins` + `ui/coin-page` PRs |
| Tue 23:00 | `ui/launch` + `ui/home-how` PRs |
| Wed 12:00 | `ui/polish` PR (Lighthouse ≥ 85 perf / ≥ 95 a11y, 390px clean) |
No signing, tx, wallet, fee or `src/lib/**` code. Ever.

## claude-code — independent review (decider)
Wed 18:00 → adversarial review of every signing path (create, swap, claim): exactly what's signed, accounts, no extra transfers, cosign response checked before the wallet prompt, no keys exposed. Post PASS / FIX list.

## chatgpt — launch copy
By Wed 18:00 → X announcement thread draft (3 posts) + one-line bio for AnonPad. Draft only; Sneaks approves. Facts from projects/anonpad.md only; include the custodial-bridge risk line.

## Hard stops (unchanged)
No broadcast, spend, live launch, domain, AnonPad/$ANON token, cheap-model edits to signing code, or user-data storage without Sneaks's yes. Batch asks into ONE message.

## Everyone
Claim on BOARD.md before work · your lane only · handoff `handoffs/<YYYY-MM-DD_HHMM>_<agent>_anonpad-<task>.md` · `python3 tools/coms_check.py` before push · label VERIFIED / INFERENCE / UNKNOWN.
