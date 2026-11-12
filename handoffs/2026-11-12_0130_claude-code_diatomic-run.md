# Handoff — muse-tune-up (kit) — claude-code — 2026-11-12 01:30 ET

**Session goal:** Sneaks: "FINISH THE DIATOMIC RUN": read the 17 market-data skills, do a review pass, fix the step-1 gate code (D29, D7, D9, D10). Build steps 1–3 only.
**Status:** DONE (local). **Not pushed.** The kit commits wait for Sneaks's "push".
**Repo / branch:** 0xSneaks/muse-tune-up-kit @ claude/muse-arch-upgrade-s3gcmo · **Last commit:** `97be8e9` (4 local commits ahead of origin)

## Did
- `b334f9f`: all 17 market-data skills read in full; S-063..S-079 and PL-7 updated (`ATOM-REGISTRY.md`, `PAIR-MAP.md`, `UPGRADE-VERDICT.md`). Flag S-069 CLEARED. VERIFIED
- `193d310`: review pass over 50 lane verdicts, matched by sha column (50/50). **CONFIRMED 41 · WRONG 4 (corrected in place) · UNCLEAR 5.** New file `upgrade/diatomic/REVIEW-PASS.md`. VERIFIED
- `f7c893f`: step-1 code fixes in `upgrade/build/muse_gates/`. VERIFIED by tests
  - D29: card match needs issuer prefix + Luhn + a card word nearby. A seed match needs exactly 12/24 short non-prose words. Long numeric ids and sentences about seed phrases no longer match.
  - D7: labels are VERIFIED/INTENT/INFERENCE/UNKNOWN. ASSUMPTION→INFERENCE; UNVERIFIED/UNCONFIRMED→UNKNOWN.
  - D9: MASKED-VALUE has three outcomes (value-verified / presence-verified-value-unverified / blocked). A masked value can never be an argument. Only paths and keyed fingerprints are logged.
  - D10: seven gate types, and an unknown type fails closed. Standing grant: scoped, never consumed. Delegated approval: named reviewer + exact-call hash, single use.
- `97be8e9`: `MUSE-MODEL.md` §6 now records all 37 custom skills as read.

## State (evidence)
- Tests: `cd upgrade/build && python3 -W error -m unittest discover -s tests` → **34 OK** (baseline was 15, not 16; 19 new in `tests/test_deltas.py`).
- Deployed: no. Not wired into Muse's runtime.
- Specs 01–06 untouched. SPEC-DELTA untouched.

## Decided
- **Standing grants are never honoured for spend, trade or credential.** This is a safety default I chose. Muse/Sneaks accept or reject it. (Sneaks approved? no)
- The delegated-approval packet hash is the hash of the exact call (tool + args), so the fixture tools needed no extra argument.

## Next (start here)
1. Sneaks: say "push" to publish the 4 kit commits.
2. Owner decisions (BLOCKERS, fail-closed holds until answered): **R-019/R-020** (money: fail-closed vs exact-key lock under an unverified price; A-216 waits on it), **R-050** (whether operation end may close a public mutable leg), **K-11** (persona merge grant vs playbook bar).
3. Muse: accept/reject SPEC-DELTA. Note that D21 ("share one preamble") conflicts with the 2.5% measurement. It was flagged, not edited.
4. Still unread: 57 system skill bodies, the scheduled-job list, the 131 goal workspaces. Not reviewed: 45 MERGE rows, 39 stricter contradiction rows, all CHECK/MODULE verdicts, DUP/GAP/DEP rows.

## Don't
- Don't start build step 4. It is not authorized.
- Don't apply any unreviewed resolution that adds an "or" option on a gate. All 4 wrong rows in the sample had that shape (8% error rate).
- No corpus text in the kit or here. Verdicts, counts and hashes only.

## ⚠️ High-risk (wallets, signing, auth, prod, money)
- R-019/R-020 is a money-path rule decision. Only the owner can make it.
