# Narrative Ops

**Repo:** 0xSneaks/ai-coms (ledger lives here) · **Live URL:** none · **Last updated:** 2026-10-28 by muse

## Now (keep this current)
Pulse-driven launch desk set up by Sneaks 2026-10-27 23:56 ET. FIRST RUN done DRY 2026-10-28 00:01 ET: 4 narratives scored, 0 launches, $0 spent — nothing cleared the bar (every candidate's ticker lane is already occupied). Desk is NOT live: waiting on Sneaks's "go" + the budget blanks below.

## Established (decisions — don't re-litigate)
- Launch only if score ≥ 20/25 AND Safety = 5; zero launches is a valid week — Sneaks spec, 2026-10-27.
- Caps: max 1 launch/day, 3/week. Kill switch: treasury < 50% → stop, report, wait — Sneaks spec, 2026-10-27.
- HARD NOs: real people/faces, brands/endorsement, deaths/disasters/tragedies/violence/kids/politics/hate, fake claims (partnership/official/utility/price), wash trading, alt-wallet self-buys, coordinated pumps, fake engagement, dumping the dev bag — Sneaks spec, 2026-10-27.
- Revenue = creator fees + attention to 0xSneaks, never dumping on buyers — Sneaks spec, 2026-10-27.
- mogz.fun carries its own $30 TOTAL sub-budget (see projects/mogz.md); mogz wallet is the throwaway `2LYQ…svHt`, balance 0, unfunded — Sneaks, 2026-10-27.
- X posting: per-item approval + automated-account label required; replies only to verified accounts (standing X rules).

## ⚠️ OPEN — needs Sneaks (blocks going live)
- Treasury amount [$___] + the ONE dedicated wallet to assign (touch no other wallet).
- Max per launch (deploy + dev buy) [$___].
- Dev policy: [hold ___ days / never sell / sell max ___% per day] — must be stated at launch.

## Built
- Dry pulse loop #1 — X API recent search (3 queries) + web meme/news scan + GMGN ticker-collision checks — VERIFIED 2026-10-28 (results in Ledger).

## Ledger (every pulse + launch)
| Date | Narrative | Score V/F/M/O/S = Total | Platform | CA | Spend | Fees | P/L | Verdict |
|---|---|---|---|---|---|---|---|---|
| 2026-10-28 00:01 ET (dry) | Code Rot | 3/3/4/1/5 = 16 | — | incumbent Coderot `nC3to2NNeCNRa8bAGbjAoxqreJegfP8Wuf4yHzypump` (~$16K mcap, dead) | $0 | $0 | $0 | SKIP — lane occupied |
| 2026-10-28 00:01 ET (dry) | Robotaxi (generic) | 3/3/4/1/5 = 16 | — | incumbent $ROBOTAXI already running (~$68K mcap in X calls) | $0 | $0 | $0 | SKIP — lane occupied |
| 2026-10-28 00:01 ET (dry) | Jimothy the Raccoon | 2/2/5/1/5 = 15 | — | incumbent Jimothy `Ge87EtsjwRQbHaqQmKRno69RFTwh9bfSsm99XNxTpump` (~$1.94M mcap) | $0 | $0 | $0 | SKIP — lane occupied, past peak |
| 2026-10-28 00:01 ET (dry) | Rumpelstiltskin Tiptoe | 2/2/4/1/4 = 13 | — | incumbents TIPTOE `gL9Q3xjXM1BdopmHn1R7Kb3Eim5NAQ1eWGNaTj3pump` (~$71K, live) + RUMPEL | $0 | $0 | $0 | SKIP — lane occupied, at peak |
| 2026-10-28 00:01 ET (dry) | Screened out on HARD NOs (not scored) | — | — | Baby With Mustache (kids) · 67 Kid (kid/person) · French Goku Hero (person+IP) · Mbappé/Courtois/Yamal (people) · OpenAI×Google chips (brands) · Firefox meme reunion (brand) · Jiren Dancing (IP) · Telegram AI Agents (brand) | $0 | $0 | $0 | NO |

## To do (priority order)
1. Sneaks fills the 3 budget blanks + says "go" — Sneaks.
2. On "go": start ~2h pulse loop (cron, X API, rate-limit aware) — muse.
3. First qualifying narrative → launch per spec (mogz.fun or Pump.fun), X post once, 24h tracking — muse.

## Known issues / gotchas
- X API is pay-per-use (credits were $8.64 at setup 2026-10-27); pulse queries must stay few and narrow.
- GMGN key is DATA/READ-ONLY — collision checks only, never trades.
- Overlap with blue-mogz lane (projects/mogz.md): mogz launches share the $30 mogz sub-budget; coordinate before any mogz launch.

## Stack & where things live
- Scan: X API v2 via `~/workspace/custom-connectors/custom.legacy-x-api/bin/x.py` (GET only) · GMGN via `gmgn-cli market search` (read-only) · web meme trackers for freshness cross-check.
- Ledger: this file. Daily digest: to Sneaks in chat.
