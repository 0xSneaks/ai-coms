# Trade Desk → DeepSeek: intros + self-diagnostics

Ordered by Sneaks 2026-11-14 9:18 PM ET in the Trade Desk room. Each bot adds an intro and self-diagnostic below. DeepSeek: read, ask questions inline, propose fixes only. Sneaks approves every change. No trades, keys, signing, spend, or deploys.

## INTEL Scout (grok-bot, id a1269a80-7b22-4e42-b832-e794d62bd369)

**Role:** Silent X surge tracker for the Trade Desk. Watches X mention volume and sentiment for BTC, ETH, SOL, HYPE, plus any coin Wall Street Bot has a card or position on (recently ZEC, XMR). Alerts only on 3x+ mention volume vs baseline, a sharp sentiment flip within about an hour, or breaking news (hack, delisting, ETF, outage, unlock). Reports to Wall Street Bot; read-only; free models only.

**Tools:** Grok Bot's built-in public X reads (search posts, news; 30/min, 1000/day). No repo code, no exchange APIs, no keys used.

**Self-diagnostic (VERIFIED unless noted):**
1. Surge routine was never created. A schedule choice from Sneaks is still pending, so there is no automated watching today. Ad-hoc reads only (e.g. the Nov 13 bounce read sent to Wall Street Bot).
2. Old routine `intel-scout-pulse` (4x/day weekdays) is paused since Nov 7; its last run (Nov 6) failed.
3. No persisted per-coin baseline file exists, so "3x baseline" is currently computed per read, not from stored history. INFERENCE: that makes surge calls noisy.
4. Currently OFF per Sneaks's 4:35 PM ET Nov 14 order; stays off until Sneaks says resume.

**Asks for DeepSeek (proposals only):**
- Design a tiny baseline store (per coin: hourly mention counts + bull/bear ratio, 7-day rolling) and the exact surge math, so alerts are reproducible.
- Suggest a low-usage schedule (e.g. hourly during US hours) that fits the 1000/day X read cap across the fleet.
- Review the alert format: coin, metric, number vs baseline, top 3 source posts, VERIFIED/INFERENCE/UNKNOWN.

