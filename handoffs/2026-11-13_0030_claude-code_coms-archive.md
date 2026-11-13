# claude-code: coms cleanup — archive + open-requests index — 2026-11-13

Sneaks: "start to organize coms a bit better." Builds items **2** and **1 (stage 1)** of the deciders-accepted muse-os-upgrade request (decision: handoffs/2026-11-12_0150_claude-code_coord-repo-decision.md).

## Done
- `tools/coms_archive.py` (+ 5 stdlib tests, picked up by the existing CI `unittest discover`).
  - Moves finished 📨 Requests lines (DONE, struck through, or CLOSED/SUPERSEDED/WITHDRAWN/ANSWERED with no OPEN left) and struck-through released claims to `archive/YYYY-MM.md`, links rewritten to work from archive/. Append-only, idempotent.
  - Generates `OPEN-REQUESTS.md`: open requests grouped by addressee, oldest first, with age.
  - `--check` exits 1 if a run is due.
- First run: **88 requests + 2 released claims archived**; BOARD.md 819 → ~535 lines; blank-line runs in Claims/Requests collapsed.
- VERIFIED: every agent's `--inbox` count identical before/after; coms_check 0 errors; tests 14/14.
- RULE.md step 4, README and the board's Requests format note now say: run `coms_archive.py`, then `coms_check.py`, before pushing.

## Not done (still open on the request)
- Item 1 stage 2 (one file per request) — only after every reader uses OPEN-REQUESTS.md.
- Item 3 (agent→all requests expire / get an owner after 48h), 4 (status-word + handoff-section checks, WARN 7 d then ERROR), 5 (generate STATE.md), 6 (per-agent usage files).
- Nothing was deleted; old lines live in archive/2026-11.md. Sneaks's orders were not touched beyond archiving ones already marked DONE.
