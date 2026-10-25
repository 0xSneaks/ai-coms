# Handoff — muse-tune-up (muse-speed builds) — claude-code — 2026-10-25 01:20 ET

**Session goal:** build the 3 muse-speed items Claude approved from Muse's speed audit ([0047](2026-10-25_0047_muse_muse-speed.md)): a stage-timing logger, the PR #13 review fixes, and a checkpointed job runner. Draft PRs only; no merges.
**Status:** DONE (3 draft PRs open). VM verification → Muse.
**Repo / branches:** 0xSneaks/muse-tune-up
- `claude/muse-speed-builds-8ug2tz` @ 28eab6d → [PR #14](https://github.com/0xSneaks/muse-tune-up/pull/14) (ops/timing)
- `claude/muse-persistent-browser-service-87tea6` @ 3528f79 → [PR #13](https://github.com/0xSneaks/muse-tune-up/pull/13) (ops/browser follow-up)
- `claude/muse-speed-jobs-8ug2tz` @ e182a98 → [PR #15](https://github.com/0xSneaks/muse-tune-up/pull/15) (ops/jobs)

## Did
- **PR #14 `ops/timing/`** (VERIFIED, sandbox)
  - Seconds per stage (spawn / browser / tool / verify), written to append-only JSONL at `~/.local/state/muse-timing/` (600).
  - `run` / `start` / `stop` / `mark` / `ingest` / `summary`. The summary gives p50/p95 per stage, each stage's share, task wall vs staged time, and `--budget-s 180` (exits 1 when over).
  - Records hold names and numbers only. Names that look like URLs or tokens are refused, and the error never echoes them.
  - 19 tests OK. A synthetic 5-task run is in `SAMPLE-REPORT.md` (labeled SYNTHETIC).
- **PR #13 follow-up** (VERIFIED, sandbox)
  - Another claude-code session had already pushed the fixes for every CHANGES REQUESTED item in `609d908` (00:49 ET). I checked them adversarially rather than redoing them.
  - I added a test for each finding: an unauthenticated sweep, a VM-TEST safety lint, the pm2-dump chmod via a fake pm2, and pinned state limits. Smoke step 8 now also covers a redirect.
  - Tests 50 → 57. Smoke **8/8 PASS** with real CloakBrowser 146 + pm2.
  - Live sweep: 1,323 unauthenticated requests got only 401/403/501, with 0 leaks.
  - The finding → fix → test table is in [PR #13 comment 6393723293](https://github.com/0xSneaks/muse-tune-up/pull/13#issuecomment-6393723293).
- **PR #15 `ops/jobs/`** (VERIFIED, sandbox)
  - Item-based jobs. Output is appended and fsynced per item, the checkpoint is replaced atomically per item, and the next run resumes from the checkpoint, so each item lands in the output exactly once.
  - `start.sh` detaches the job (systemd-run user unit, else setsid). A cron calling it is the backstop.
  - Flock, item on stdin, and items die with their runner.
  - 13 tests OK, including SIGKILL of the whole process group mid-run → partial output on disk → resume.

## State (evidence)
- Tests:
  - `ops/timing`: 19 OK
  - `ops/browser`: 57 OK, and `smoke.py` 8/8 PASS
  - `ops/jobs`: 13 OK (×3 runs)
  - `ops/health` and `ops/proxy-relay` still OK
  - All in a Claude Code cloud sandbox. **Nothing ran on Muse's VM.**
- Each new safety test was checked by breaking the code it covers: token check removed, `pm2 kill` added, chmod dropped, parent-death signal removed. Each one FAILED as it should.
- Deployed: no. Merged: no. VM changes: none.

## Decided
- PR #13: no code changes beyond tests and the smoke redirect case. 609d908 already covered every finding.
- Finding 4 (state limits) stays a documented limit plus a pinned test. A per-site login gate *in code* was not built: what it should check is unclear, so it's left for Sneaks or the deciders to decide.
- Jobs: the checkpoint is the truth (output past it is redone). Items may run twice, so the item command must be safe to repeat.

## Next (start here) — Muse, on the VM, one batched command per block
1. **PR #14 timing: `ops/timing/VM-TEST.md`**
   - A: unit tests + synthetic run.
   - B: time **≥ 5 real job-posting checks** as `jobcheck-N`. Markers ride on shell commands you already run; no extra approval cards.
   - C: `summary --task-prefix jobcheck- --budget-s 180`.
   - **The target is p95 task_wall under 180 s (3 min).** Expect OVER for the baseline. The biggest `share` is the first fix.
2. **PR #13 browser: `ops/browser/VM-TEST.md` round 2** (already OPEN on the board): A, then C; B only if needed. Expect 57 tests and 8 smoke steps. Never `pm2 kill`.
3. **PR #15 jobs: `ops/jobs/VM-TEST.md`** A–B: kill at ~4/15 → `waiting` → `start.sh` → `done, 15/15`, `each_once True`. C is optional and needs Sneaks's OK: does a runtime restart kill by cgroup?
4. Paste each WORKS/FAILS table on its PR and in your handoff.
5. After that, the speed loop: one change at a time (browser service on the relay, or moving the careers scan into ops/jobs), then re-run timing B and C, and compare p95.

## Don't
- Don't merge or deploy any of #13, #14 or #15. That's Sneaks's call.
- Don't use `pkill -f` with broad patterns. Use `[j]obrunner.py run <job>` exactly as VM-TEST writes it; anything broader can match your own shell.
- Don't name timing tasks by URL, company or account.
- Don't paste `pm2 describe|env|jlist` output (it prints proxy credentials).

## ⚠️ High-risk
- PR #13 is a **local auth surface** (API token, `/handoffs` bearer links). It still needs Sneaks's review before real logged-in profiles use it. Same-UID processes can read the token file (documented).
