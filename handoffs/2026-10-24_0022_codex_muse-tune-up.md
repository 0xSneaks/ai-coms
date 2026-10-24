# Handoff — muse-tune-up — codex — 2026-10-24 00:22 ET

**Status:** VERIFIED research/design complete; runtime implementation and A/B BLOCKED.
**Tracking:** [issue #11](https://github.com/0xSneaks/muse-tune-up/issues/11).
**Draft PR:** [#12](https://github.com/0xSneaks/muse-tune-up/pull/12).
**Branch / remote commit:** `codex/external-reference-audit-2026-10-24` / `2f2f4c37d84170db16d7e6c922d4c6aef1869658`.

## Did
- VERIFIED: read BOARD, both project files and latest Muse/Real-or-BS handoffs; signed off stale Real-or-BS claim first in `2026-10-24_0012_codex_real-or-bs.md` and corrected stale project state.
- VERIFIED: claimed only `research/external-reference-2026-10-24/`; left Claude Code CAPTCHA/headroom claim and PR #10 untouched.
- VERIFIED: read issue #11 and full directive. Inventoried main e2c9de41f96a7c02e6ac12175e6d52a6cd4939ac (68 paths); inspected historical audit/routing/health/eval sources. Current trading judge, GMGN adapter, registry, position store and execution gate are absent; no live VM access supplied.
- VERIFIED: inspected pinned Vibe-Trading 41f333b6c4de9190fb57e5bb02cb570890018570, Fincept 3d8617cae3f13c93874d4bee4fb0f2846e9c83bc and LibreChat 94ae8a419839f8c99f5cfc15a650804ced8163c2. Stored hashes/links for 48 examined files; no upstream setup/test/module executed.
- VERIFIED: added 10 research-only files: README.md, AUDIT.md, DESIGN.md, EVALUATION.md, VERIFICATION.md, baseline_inventory.json, sources.json, replay_cases.json, verify_research.py, test_research.py (all under claimed directory).

## State + proof
- VERIFIED: 19 research-package integrity tests PASS (source/URL/path/hash/coverage/status mutations and independent decimal example); Python 3.12.14. `python -I -m unittest discover -s . -p test_research.py -v`.
- VERIFIED: `python -I verify_research.py --source-root /workspace/scratch/8d0a3c85f681` PASS: 3 pinned sources, 48 file hashes, 68 baseline-tree paths, 46 synthetic acceptance cases structurally checked.
- VERIFIED: git diff --cached --check clean. Remote PR tree checked against all local blob hashes; all 68 pre-existing tree entries unchanged; PR is draft with exactly 10 added files; main remains e2c9de41f96a7c02e6ac12175e6d52a6cd4939ac.
- NOT_RUN: all 46 runtime/adversarial cases, runtime regression/integration tests, current flag checks, baseline/candidate benchmark, model quality, latency/cost/P&L. Fixture checks are NOT trading safety verification. No runtime feature implemented.
- VERIFIED: zero dependencies, services, paid APIs, subscriptions, spending, deployment, signing, wallet access or runtime/config changes.
- UNKNOWN: exhaustive transitive license/CVE clearance, current runtime controls/provider/data entitlements and runtime compatibility.

## Decided
- TEST Vibe-style typed independent research/challenger/risk dependencies plus deterministic gate and replay; KILL full trading engine adoption.
- PARK Fincept code reuse: LICENSE and docs/COMMERCIAL_LICENSE.md contradict at pinned commit. TEST independently specified provenance/freshness/normalized observation design; no code/data/UI copied.
- TEST LibreChat-style provider/tool identity, execution-time permission generation checks and bounded audits; KILL second frontend. Root MIT does not cover every manifest/bundled component without further review.
- Honor owner-required design fallback instead of guessing an incompatible trading runtime. No BUILD verdict until actual runtime and held-out saved inputs are mapped.
- Proposed flags are design-only, default false. Required SHADOW/KILL_SWITCH, one-position and <=1% risk controls are not changed or independently confirmed live.

## Next exact first step
- Runtime owner/Muse: provide current runtime source commit and file map for judge, GMGN adapters, chain registry, risk/actor vetoes and position store, plus sanitized saved snapshots and the existing test command. No keys/.env/credentials needed.
- Review draft #12 and license conflict; then claim implementation paths in COMS, map existing interfaces, add smallest optional sidecar and run identical-input baseline/candidate + adversarial/concurrency tests before any enablement. Keep #11 open.

## Don't
- Do not call this a completed runtime upgrade, profitable strategy, tested trading gate or passed 46-case adversarial run.
- Do not merge/deploy, install full products, add paid fallback/feeds, modify Claude's claim, copy conflicted licensed code or expose raw tool/conversation secrets.
- Do not clear KILL_SWITCH, disable SHADOW, weaken independent vetoes or position/risk limits. No live trades.

⚠️ HIGH-RISK: trading, wallet/auth and production boundaries. This handoff authorizes no new live action.
