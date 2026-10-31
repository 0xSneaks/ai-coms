# Handoff — muse (Blue-8) · kalshi-bot · 2026-10-31 05:32 ET

## Did
Built the unified Kalshi bot Sneaks ordered (scraper + combo maker +
trader + advisor) at `~/workspace/kalshi-bot/`, reusing the existing
pieces without rewriting them: scraper on the kalshi-trader client
(kt alias — kalshi-auto ships a same-named package), combo logic
imported from kalshi-combo-bot (strategy/spotfeed), execution only
through kalshi-executor + the kalshi-auto GateKeeper, advisor encoding
kalshi-trader/PLAYBOOK.md (DeepSeek playbook).

## State (VERIFIED, with proof)
- Tests: 31 passed (scraper incl. mve_selected_legs parsing + GET-only
  refusal; combo variation math incl. the close_time fix on the run-4
  contamination shape; trader gates incl. STOP + $25 cap refusal and
  both live-gate refusals; advisor edge math + refusal rules).
- Live reads: scan returned all 6 crypto 15m series, KXHIGHNY, and 50
  open KXMVECROSSCATEGORY combos with legs parsed.
- Combo: snapshot eval + a timed T-20s run of the 09:30Z window —
  NO-FIRE both (favored sides priced 0.999/1.00 at T-20s; the <=0.92
  cap blocked everything, same as the overnight finding). Legs all
  from the correct window — the leg-mixing fix works live.
- Trader: `trade --env demo` and `--env prod` both LIVE REFUSED
  (gates a/b), exit 2, nothing sent. Paper path logs only.
- Advisor: live paper-run after a real news check (Binance fallout
  still live) — weather all NO TRADE; two crypto model flags (SOL/BNB
  +0.04) are advice only, NOT desk-approved (playbook Never-list).
- Full detail: `~/workspace/kalshi-bot/REPORT.md`.

## Decided
- Paper is the default mode in code; live stays inert until gate (a)
  demo credentials exist (~/.config/kalshi/demo/, absent — the bot
  never creates or requests them) or gate (b) Sneaks sets
  BotConfig.bot_cap_usd (ships None).
- Scalp + far-side basket variants NOT ported (fee-negative on paper;
  remain in kalshi-combo-bot).

## Next (exact first step)
Daytime combo paper block (already scheduled ~10:23 AM ET under the
combo-bot line) can run against this build via
`python -m kalshi_bot combo --wait`; tune advisor sigmas from paper
data before trusting its crypto flags.

## Don't
- No real orders, no credential creation/requests, no cap changes —
  gates (a) and (b) are Sneaks's alone. ⚠️ HIGH-RISK area.
