# Wall Street Bot — Grok fleet market analyst

Status: TUNING DISPATCHED 2026-11-12 by muse at Sneaks's order. Pickup / ACK UNKNOWN until Wall Street Bot replies on issue #14.
⚠️ HIGH-RISK domain (trading advice): advisory / paper only. No execution, no keys, no orders without Sneaks's explicit yes to the exact order.

## Who
- Wall Street Bot is Sneaks's own bot inside Grok Bot (Grok fleet), self-reported in the 2026-11-12 drill: ID `c6febb96-…`, role "Market analyst, advisory/paper only", status Active / standby, evidence = box file `blofin_toolset.md` (uninspected by muse).
- Fleet path (per drill): Sneaks → Grok Bot → Big Chief (current lead, `d406d8e6-…`) → Wall Street Bot. Internal hops are self-reported, not independently verified.
- Distinct from: ai-coms seat `grok-specialist` (separate trading specialist, caps unset, fails closed), `grok` on X, and the ai-coms seat `grok-bot` (prompt-father for ai-coms per Sneaks 2026-11-11).

## Decision source — LOCKED by Sneaks 2026-11-12
- Repo: https://github.com/0xSneaks/hl-bot-v2 (MOONBOYHL / HLBOTV2)
- HEAD verified by muse 2026-11-12 20:59 ET: `d71fdc22308d34d987ffae038e1803c1a91b75a9` — unchanged since muse's 2026-11-10 Wall Street Mode verification. No drift.
- Wall Street Bot makes trade decisions ONLY in this repo's grammar (see handoff for the full tuning packet). Same grammar muse uses in Wall Street Mode, so both sides produce ONE batched decision per coin — never two separate orders for Sneaks.

## Verified grammar (muse, re-read from code 2026-11-12)
- Setup card: score 0–100, entry, stop, TP1–3. Minimum alert score 52 (`MIN_SCORE_FOR_ALERT=52`).
- Badges (`bot/formatting.py`): ≥90 🔥🔥🔥 · ≥70 🔥🔥 · ≥52 🔥 · below 👀.
- STRONG CONFLUENCE (best signal): setup score ≥60 AND ≥2 tracked whales same coin + side (`CORRELATION_MIN_SCORE=60`, `CORRELATION_MIN_WHALES=2`, `services/correlation.py`; clusters ranked by combined smart_score, not notional).
- Whale tiers on smart_score (`.env.example`): Sharp ≥25 · Solid ≥10 · Average ≥0 · Sloppy <0.
- Sizing (`utils/sizing.py`, `RISK_PCT=0.01`): risk ≤1% of real equity; size_units = risk_usd ÷ |entry − stop|. Ignore the card's displayed conviction Risk % and suggested leverage.
- Ranking: 1) STRONG CONFLUENCE (best with Sharp/Solid whales) 2) 90+ 3) 70–89 4) below 70, no confluence = NO TRADE.
- Downgrade: local-fallback card (no Grok setup), Sloppy backing whales, crowded funding on that side, alert older than ~15 min. Skip if price already past entry.

## Gates (unchanged, Sneaks's Wall Street Mode spec 2026-11-10)
- Advisory / paper only. The repo only sends signals; it never trades.
- Nothing placed without Sneaks's explicit "yes" to the exact order.
- Isolated margin, real stop on the order, liquidation well beyond the stop, no averaging down, never widen a stop.
- Trade-only Hyperliquid API wallet only if execution is ever separately authorized; never a main key or seed phrase. No keys in coms.
- MOONBOYHL hosting is NOT live (GCP billing failed, no VM — see moonboy-vps backlog); this tuning is about decision grammar, not deployment.

## Next
1. Grok Bot / Big Chief: deliver the tuning packet to Wall Street Bot (handoff below).
2. Wall Street Bot: ACK on issue #14 with `[WALL-ST-TUNED]` + the repo HEAD it read + one paper worked example in the output format (no invented live prices — use a past card or mark prices UNKNOWN).
3. Muse: verify the ACK, mark this file TUNED, report to Sneaks.

## Handoffs
- Tuning packet: [2026-11-12_2059_muse_wall-street-bot-hlbot-tuning.md](../handoffs/2026-11-12_2059_muse_wall-street-bot-hlbot-tuning.md)
