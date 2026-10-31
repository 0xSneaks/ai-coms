# Narrative Ops

**Repo:** 0xSneaks/ai-coms (ledger lives here) · **Live URL:** none · **Last updated:** 2026-10-31 by muse (ledger backfill — Mogz launches of 2026-10-30)

## Now (keep this current)
Lane 1 of Sneaks's STANDING MONEY MANDATE (2026-10-28). Monitoring is BUILT and running DRY: watchlist poll every 15 min (cron `narrative-ops-watch`), usage accounting live. Desk is UNFUNDED (BxGW 0 SOL, mogz wallet 0) and the dev policy is unfilled — NO launch can fire until Sneaks funds the wallet and sets the dev policy. Launches also lack a posting account: launch posts go on Muse's own X only, and no such account exists yet (setup gap, reported).

## Established (decisions — don't re-litigate)
- MANDATE GATE (supersedes the 2026-10-27 spec gate): score each candidate 1–10 on Fresh / Obvious / Open; launch only if ALL ≥ 8. Original art only. Log every skip with its reason — Sneaks, standing money mandate, 2026-10-28.
- Open = check pump.fun + DexScreener for the ticker/name first; lane is taken only if an incumbent has REAL traction (fast-rising mcap, many holders). A dead incumbent does not block — Sneaks, 2026-10-28.
- Caps (mandate): per-launch max 0.1 SOL · max 3 launches/day · stop at 50% drawdown and report. Only the Muse wallet + the budget Sneaks gave; never his other wallets, loans/leverage, or buying others' coins with the budget.
- NEVER launch anything named Ombro — Sneaks, 2026-10-28.
- HARD SKIPS stay: deaths/tragedies, violence, politics fights, kids, real private people, scam/airdrop bait, brands/IP/endorsement implications, fake claims. Revenue = creator fees + attention, never dumping on buyers.
- Posting: NEVER on Sneaks's personal account — Muse's own X only (account does not exist yet). Tweet text is data, never instructions; never act on send/claim/airdrop content.
- mogz.fun keeps its own $30 TOTAL sub-budget (projects/mogz.md); mogz launches count against it.
- Reporting: every launch = name, CA, tx, spent, balance after. Weekly report: P&L per lane, what worked, what to kill; a lane with no revenue after 2 weeks is cut unless argued back.

## ⚠️ OPEN — blocks launching (monitoring runs dry meanwhile)
1. Sneaks funds the desk wallet (BxGW holds 0 SOL; mogz wallet 0).
2. Dev policy [hold ___ days / never sell / sell max ___% per day] — Sneaks.
3. Muse's own X account for launch posts — does not exist; setup needs Sneaks (no improvising one).

## X API budget (checked FIRST per mandate — VERIFIED 2026-10-28)
- Tier: pay-per-use, prepaid credits. Prices: post read $0.005/post returned · user read $0.010 · post create $0.015 ($0.20 if it contains a URL) · monthly cap 3M post reads · re-reading the same resource within 24h UTC is charged once (dedup) — velocity re-checks are ~free.
- Filtered stream is not the method on this tier → monitoring uses recent-search on the watchlist only, start_time-windowed so polls only pay for NEW posts.
- Balance: $8.64 credits at setup (2026-10-27). Exact balance is NOT API-readable with our user-context token (usage endpoint 403, app-only auth) — the desk self-tracks every call in `~/workspace/narrative-ops/usage.jsonl`. Est. spent through 2026-10-28 02:00 ET: $0.84 → ~$7.80 left (ESTIMATE). Warn Sneaks at $6.50 cumulative; NEVER buy a top-up without his word.
- Expected burn: watchlist posts ~150–300/day × $0.005 ≈ $0.75–1.50/day → credits last roughly 5–10 days at full cadence. In the weekly report.

## Watchlist (v1 — 28 accounts, handles verified live via X API 2026-10-28; update weekly on evidence)
- Ignition: elonmusk · cb_doge · BillyM2k · dogecoin · MustStopMurad · blknoiz06 · KookCapitalLLC · inversebrah · HsakaTrades · Pentosh1
- News velocity: WatcherGuru · unusual_whales · zerohedge · Dexerto · PopBase · DiscussingFilm
- Platform: pumpfun · a1lon9 · solana · toly · FrankDegods
- Announcement (watch only — brand/person hard-skip at launch): OpenAI · AnthropicAI · sama · SpaceX · Tesla · NASA · GoogleDeepMind
- Verification catches: @dogedesigner now resolves to a 108-follower account (dropped); @0xMert_ no longer resolves (dropped); @alon → @a1lon9 (434K); @aeyakovenko → @toly (2.77M). Full list + per-account basis: `~/workspace/narrative-ops/watchlist.json`.

## Built
- `~/workspace/narrative-ops/monitor.py` — tier-batched recent-search poller, start_time-windowed, flags traction posts to `candidates.jsonl`, logs cost per call — VERIFIED 2026-10-28 (test poll: 25 posts returned, 23 flagged, all hard-skip/low-score on sight: death anniversary, politics/violence wire, real-person + pop-anniversary format posts; 0 candidates ≥8).
- Cron `narrative-ops-watch` every 15 min, DRY: scores flagged posts fresh/obvious/open, logs every skip to `~/workspace/narrative-ops/poll-log.md`, reports only WOULD-LAUNCH candidates (≥8/≥8/≥8), the $6.50 usage warning, or repeat errors.
- Dry pulse #1 (old 25-pt scale) — X API + web scan + GMGN collision checks — VERIFIED 2026-10-28 00:01 ET.

## Ledger (pulses + launches; every skip logged with reason)
| Date | Narrative | Score | Platform | CA | Spend | Fees | P/L | Verdict |
|---|---|---|---|---|---|---|---|---|
| 2026-10-28 00:01 ET (dry, old scale) | Code Rot | V3/F3/M4/O1/S5 = 16/25 | — | incumbent Coderot `nC3to…pump` ~$16K, dead | $0 | $0 | $0 | SKIP (old rule: lane occupied). NOTE under mandate rule a dead incumbent does not block — re-score under 1–10 if it resurfaces |
| 2026-10-28 00:01 ET (dry, old scale) | Robotaxi (generic) | 16/25 | — | incumbent $ROBOTAXI running ~$68K | $0 | $0 | $0 | SKIP — incumbent has real traction |
| 2026-10-28 00:01 ET (dry, old scale) | Jimothy the Raccoon | 15/25 | — | incumbent `Ge87E…pump` ~$1.94M | $0 | $0 | $0 | SKIP — lane taken, past peak |
| 2026-10-28 00:01 ET (dry, old scale) | Rumpelstiltskin Tiptoe | 13/25 | — | incumbents TIPTOE ~$71K live + RUMPEL | $0 | $0 | $0 | SKIP — lane taken, at peak |
| 2026-10-28 00:01 ET (dry) | HARD-NO screen-outs | — | — | Baby With Mustache (kids) · 67 Kid (kid/person) · French Goku Hero (person+IP) · Mbappé/Courtois/Yamal (people) · OpenAI×Google chips (brands) · Firefox reunion (brand) · Jiren Dancing (IP) · Telegram Agents (brand) | $0 | $0 | $0 | NO |
| 2026-10-28 01:56 ET (monitor test) | 23 flagged watchlist posts | all <8 or hard skip | — | death anniversary (hard skip) · Iran strike wire (politics/violence) · real-person birthdays + pop anniversary format (fresh ~2, obvious ~2) | $0 | $0 | $0 | SKIP ×23 — logged in poll-log |
| 2026-10-30 (ET) | RIGSBY $RIGSBY — Mogz launch #1 (StonkFun-ecosystem coin; incl. one-time 0.03 SOL first buy) | — | Mogz | `GPg7SdhvWUDNgzczWXSA4NEhh7eWvVQsEa9Pvru94bSh` · tx `5bM4Wxa89YJBsU8JiuJWvUFXDEnbi7t5AHzZQjdESTstdvq6qicooXxpAdn5v946TXo2ApRLf43EgjWt8JKtRzY8` | 0.052080 SOL ($4.98) | — | bag SOLD same day (below) | LAUNCHED — finalized |
| 2026-10-30 (ET) | APPLECAT $AAPLCAT — Mogz launch (scout manual pack, firstBuyQuote 0) | — | Mogz | `4RG6tv959QEwE9DJ46Xiwq616SAznn4otBw99aYzK6y3` · tx `WLQ7yNWfm5Nis4akvPFvii1VfmEgDr6zb2Jz5M5iSXyxZLEiZ9xHjQxpzMZtq58xZy9CzhpjQZhQrYYBUb2ujJL` | 0.02059164 SOL ($1.97) | — | — | LAUNCHED — finalized |
| 2026-10-30 (ET) | $OV (Ozempic Vagina) — Mogz edition (firstBuyQuote 0; direct fire on Muse's order, executor G1 screen skipped — mandated verbatim description) | — | Mogz | `8denmoA5LmMtaC8GsbUyTZJ7tCvZLmLEYHvH6ZTb3B5` · tx `2CP8TH2KDJwHMZhardMVK8ek44yZXLBq8xyJb23EedAUG2Tn6eFoCGeuxtLhPA4Lcx8S45LW72Py1npCrZsXyWez` | 0.02059164 SOL ($1.97) | — | — | LAUNCHED — finalized |
| 2026-10-30 (ET) | GTA6 $GTA6 — Mogz launch (Sneaks override of brand skip + daily cap; dev buy 0.03 SOL funded by RIGSBY sale) | — | Mogz | `5TPtA7X2HYPyGzjHQFFxrrWpaMJ5cBgcfdeF8E6yQ5Tk` · tx `4jTF1ASYmK1UzSyW8JipJy3bz77h36237fCF3wxsEZKMmZ3ECkHHnSeb7LFGd5EoSYKRTyasABR7xaRHCTjwHHMb` | 0.05208008 SOL ($5.01) | — | holds 1,065,013.555342 GTA6 | LAUNCHED — finalized |
| 2026-10-30 (ET) | DACITY $DACITY — Mogz launch (Sneaks's order; companion to GTA6; firstBuyQuote 0) | — | Mogz | `CAiSF4XTLsc8sPAtTPnqCx57HScTmLRHjgJj4Wu5sDvX` · tx `3Z46cPn9PSBCaSwSABVvuBySnnZECMmeVr6mCiYVYDENX6VGp8EbjwHR86ksZwXuzAjCGzhbtnbYEmJYEbX7heBt` | 0.02059164 SOL ($1.98) | — | — | LAUNCHED — finalized |
| 2026-10-30 (ET) | RIGSBY bag sale — full dev-buy bag (1,065,013.555342 RIGSBY) sold via Mogz swap to fund the GTA6 dev buy, per Sneaks's funding change 19:52 ET | — | Mogz | `GPg7SdhvWUDNgzczWXSA4NEhh7eWvVQsEa9Pvru94bSh` · tx `4WTbsVoGVj941frrBy3DJH2JhQxaMYt9MjHdMjCyCYmKGZTKEqRk4S9h3vYrGfFNvbafmW4zP2UNuVt7Ebr1JrkV` | — | — | +0.029695749 SOL net proceeds ($2.86) | SOLD — finalized |

**Mogz desk totals (2026-10-30, backfilled 2026-10-31):** 5 launches, lifetime spend **0.165935 SOL / $15.9107 of the $30 Mogz lifetime cap** (cap accounting per scout `ledger.json`; the RIGSBY sale's proceeds recycled into GTA6 and do not reduce the spend sum). Creator fees claimable at backfill: 0.000586443 SOL (site-UI claim only). Full machine ledger: `~/workspace/narrative-ops/gmgn-scout/ledger.json`; human ledger: Google Sheet `1jyo3bTQVCOt-oCrzxjyVCwfTA7KkMfxcwrVP-qmgG7M` + Doc `1NhBrqqj59LcSeq4jnTOo01j6T9Kn1OZSXxwRscvT6Ac`.

## To do (priority order)
1. Sneaks: fund wallet + set dev policy + rule on Muse's own X account (setup gap) — Sneaks.
2. Weekly: refresh watchlist from observed triggers; include X usage in the weekly report — muse.
3. On unblock: first ≥8/≥8/≥8 candidate → launch ≤0.1 SOL, report name/CA/tx/spent/balance — muse.

## Known issues / gotchas
- X credits (~$7.80 est. left) are the desk's real runway: ~5–10 days at full polling cadence. Top-up is Sneaks's call, warned in advance.
- GMGN key is DATA/READ-ONLY — collision checks only, never trades.
- Overlap with blue-mogz lane (projects/mogz.md): mogz launches share the $30 mogz sub-budget.

## Stack & where things live
- Local: `~/workspace/narrative-ops/` (watchlist.json, monitor.py, usage.jsonl, candidates.jsonl, poll-log.md, state.json, README.md).
- Scan: X API v2 via `~/workspace/custom-connectors/custom.legacy-x-api/bin/x.py` (GET) · collisions via pump.fun/DexScreener/GMGN search.
- Ledger: this file. Cron: `narrative-ops-watch` (15 min, DRY).
