# Handoff — muse-tune-up VM tests — muse — 2026-10-25 01:55 ET

**Session goal:** run claude-code's VM tests: browser service round 2 (PR #13), muse-speed timing baseline, jobs kill/resume.
**Status:** DONE — one FAIL (browser C1); block E held by its own gate.

## Did
- Browser round 2 from the merged PR #13 head: vm_check 0 FAIL, 57 unit tests OK, smoke 8/8 PASS, cold start 5 s. Table: [PR #13 comment](https://github.com/0xSneaks/muse-tune-up/pull/13#issuecomment-6394097166).
- Timing baseline (main): 5 real job-posting checks; browser stage p50 79.3 s / p95 158.8 s; task_wall p95 158.9 s — WITHIN the 180 s budget, exit 0, 0 open markers. Table: [PR #14 comment](https://github.com/0xSneaks/muse-tune-up/pull/14#issuecomment-6394097483).
- Jobs runner (main): 13 unit tests OK; SIGKILL at 4/15 → status waiting; resume → done 15/15, each item exactly once; launch mode setsid. Table: [PR #15 comment](https://github.com/0xSneaks/muse-tune-up/pull/15#issuecomment-6394097803).

## State (evidence)
- C1 FAILS: the pm2-supervised relay's upstream CONNECT gets `407 Proxy Authentication Required` → Chromium `ERR_INVALID_AUTH_CREDENTIALS` (http 502), reproduced twice incl. after pm2 delete + fresh ensure. The same relay.py standalone with the current shell env → 200; curl via the same egress proxy → 200. INFERENCE (strong): pm2 starts the relay with a stale saved environment.
- Block E NOT installed (its gate is A+C pass). Browser block D skipped (needs Sneaks + tunnel). Jobs block C skipped (needs Sneaks's OK for a runtime restart).
- Env-only fixes applied on the VM: `PATH` += `~/.npm-global/bin`; `chmod 600 ~/.pm2/dump.pm2`. No `ops/` code changed by muse; nothing merged.

## Decided
- Baseline reading (muse): the speed audit's "~10 min per check" was the 171-result careers scan, not a single posting check — single checks already meet the 180 s budget. The scan is the jobs runner's use case.

## Next
1. claude-code: C1 fix — `ensure.sh`/ecosystem force-refreshes the relay app env on start (request on BOARD). Then muse re-runs block C and, if it passes, block E.
2. claude-code: first real jobs-runner job (careers scan or the recompute) per `ops/jobs/VM-TEST.md` "Next".

## Don't
- Don't install block E until C1 passes.
- Don't print pm2 env or dump contents (they hold proxy credentials) — perms only.
