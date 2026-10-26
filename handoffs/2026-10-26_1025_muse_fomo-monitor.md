# fomo-monitor — BUILD COMPLETE (muse), first run done

**Project:** fomo-monitor · **From:** muse · 2026-10-26 ~10:25 ET
**Direction:** Sneaks (main chat, 2026-10-26 10:19 ET) — stop waiting on Sol's zip; build Muse-side from the prep. If the zip ever lands it still gets the adversarial review before any use.

## What shipped (~/workspace/fomo-monitor/)
- `fomo_monitor/probe.py` — three-state auth probe (LIVE only on full positive proof: portfolio button + positions panel + avatar + no login CTA; 429/403/challenge-shape -> challenge path). Built by DeepSeek V4 Pro on the bench 2026-10-25, verified case-by-case by muse.
- `fomo_monitor/store.py` — SQLite WAL: monitor_state, run_lock lease (30-min stale reclaim), profile_cursors, trade_keys (tuple columns stored), mint_registry, quarantine, event_log. Bootstrap from the dated JSONL dataset.
- `fomo_monitor/ingest.py` — validation (missing/invalid fields -> quarantine, never blocking), dedupe by occurrence counting: occurrences counted OLDEST-first per exact tuple; a scraped row whose occurrence index is below the stored count is a duplicate, above it is a genuinely new identical trade. (Deviates from the page-position sketch deliberately: page positions are unstable across rescans, tuple-occurrence counting is stable.) One transaction per profile: JSONL append (fsync, size-recorded, truncate-on-failure) + keys + cursor commit together.
- `fomo_monitor/run.py` — fail-closed run loop behind a GuardedSource (only get_probe_markers / fetch_profile_page pass; anything else raises + logs). BLOCKED latches on challenge/429 until the later of Retry-After and +24h. Transitions-only event logging. FileSource reads agent-produced page dumps (source/probe.json, source/pages/<handle>.json); the daily agent drives the shared browser, the package itself never touches the network.
- `selftest.py` — fixture suite.

## Verification (all muse-run)
- SELFTEST: PASS (20/20): LIVE ingest 3, rerun inserts 0 / dupes 3, cursor resume inserts only the newer row, LOGGED_OUT pauses with zero writes, 429 -> BLOCKED + next run SKIPPED_BLOCKED, bad row quarantined while good rows commit, identical same-second twins both insert and both dedupe on rerun, guard raises on a non-fetch op.
- Bootstrap on a COPY of the real dataset: 977 rows read, 976 keys, 122 mints, 1 skipped (legacy phone_notification row with notified_at instead of trade_time — quarantined, not guessed). Re-bootstrap adds 0 (idempotent). Source checksums unchanged.
- Production state initialized at ~/workspace/fomo-monitor/monitor.db + dataset/ (the monitor owns its dataset copy; the b081a9d snapshot stays pristine).
- Daily cron registered: fomo-monitor-daily-check (owner goal:fomo-user-database, ~09:23 ET daily, transition-only reporting).
- FIRST LIVE RUN (2026-10-26 10:25 ET): probe verdict LOGGED_OUT — Login button present, no logged-in markers, no challenge. State PAUSED_LOGGED_OUT. Collection resumes automatically the first morning the session is live.

## Known limits / open items
- The IP problem stands (rotating shared Cloudflare egress): bench consensus plan (local Chromium + wireguard-go + noVNC login) is designed and board-posted; build awaits Sneaks's go. The monitor tolerates the flaky session by design (probe -> pause -> resume).
- Whether FOMO serves complete profile history is still UNPROVEN — first live collection will show it.
- Owner's own FOMO handle is unreconciled (@DegenToDisciple vs @knobknoo); nothing is keyed on it.
