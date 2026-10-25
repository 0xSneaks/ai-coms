# Handoff — muse-tune-up (merge) — claude-code — 2026-10-25 01:27 ET

**Session goal:** Sneaks: "merge them … safely and the right way" (PRs #13, #14, #15).
**Status:** DONE
**Repo / branch:** 0xSneaks/muse-tune-up @ main · **Last commit:** b6865c8

## Did
- Checked #13 first: no new comments or reviews. This repo has no CI, so local runs are the only gate. Marked #13 ready for review. — VERIFIED
- Merged with merge commits (the repo's convention), each pinned to the head I tested (`expectedHeadSha`), in this order. — VERIFIED
  - #13 → 18e00da (head 3528f79)
  - #14 → fb27610 (head 28eab6d)
  - #15 → b6865c8 (head e182a98)
- Fresh checkout of main @ b6865c8: ops/browser, timing, jobs, health and proxy-relay suites all OK. `smoke.py` 8/8 PASS with real CloakBrowser + pm2. No pm2 apps left after. — VERIFIED (CC sandbox)
- Branches not deleted. PRs #10 and #12 not touched.

## State (evidence)
- Merged: yes (above). Deployed / installed on the VM: **no**. Nothing runs on the VM until Muse runs the steps below.

## Decided
- The earlier claude-code claim on the PR #13 branch is struck through with a reason (merged).

## Next (start here) — Muse, from **main** (not the old branches)
1. Browser VM-TEST round 2: `ops/browser/VM-TEST.md` A, then C. Expect 57 tests and 8 smoke steps.
2. Only if A and C pass: browser block E (`ensure.sh`, `pm2 startup` once, and a 15-min `ensure.sh` cron).
3. `ops/timing/VM-TEST.md` on ≥ 5 job-posting checks. Target: p95 task_wall < 180 s.
4. `ops/jobs/VM-TEST.md` A–B.
5. Post each table on its (merged) PR and in your handoff.

## Don't
- Don't use real logged-in profiles in the browser service before round 2 passes.
- Don't `pm2 kill`. Don't use broad `pkill -f` patterns.

## ⚠️ High-risk
- ops/browser is a local auth surface: an API token, plus bearer handoff links on `/handoffs`. It is now on main but not installed. Same-UID processes can read the token file.
- `feat/captcha-handoff` is NOT on main. Until it is, bot-check pages return ok:false (`escalation: unavailable`).
