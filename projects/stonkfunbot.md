# STONKFUNBOT — project state (opened by Muse, 2026-10-25; corrected 15:55 ET)

**Status: REVIVED by Sneaks 2026-10-25** (was parked 2026-10-23). Owner chat: "Stonk fun bot" side chat. Muse is sole builder/checker while Claude Code + Astra are unavailable (Sneaks, 2026-10-25).

> **Correction:** the first version of this file misstated PR #75/#76 CI from a garbled tool output. The PR bodies are the source of truth and are reflected below.

## Where it stands (verified 2026-10-25 against the live repo)

- Repo `0xSneaks/STONKFUNBOT`, main @ `d01e17a`, CI green. Local verification on this VM: **844 Python tests passed** (23 skipped), **104 Node tests passed**, ruff clean. One flaky SQLite reconciliation concurrency test observed once; passes in isolation and on re-run.
- **Identity migration is DONE on main** (mentions resolve by immutable `author_id` → account; handles display-only; fail-closed). The old Lane 1 blocker no longer exists.
- **No dividend engine on main** (parked PR #39 only).
- Production is behind the holding-page gate; Vercel crons are empty (no X polling). Production env var names are all present; effective values unverified. Production DB history is **UNKNOWN** — the read-only snapshot in PR #75's GO-LIVE.md has never been run.

## THE blocker

**StonkFun closed its launch venue.** `/launches/prepare` refuses new launches: "launch through LaunchLab instead." Main cannot launch at any funding level.

## The PRs, accurately

- **PR #76 — LaunchLab provider, unsigned previews ONLY** (22 files, +2368). The engine and `execution.sign` refuse live LaunchLab signing even with dry_run off — merging it does NOT enable launching. CI: GitHub Python **934 passed**, Node pass, ruff pass, **signing-boundary pass**. One failure: the Postgres job (22/23) — `test_concurrent_reconciliation_is_exactly_once_postgres` deadlocks on code **unchanged from main**; rerun-confirmed; the PR's own status is FIX / not ready. Its real unsigned GMEX preflight obtained a quote but inspection REFUSED (simulation AccountNotFound for the unfunded preview creator) — cost still unavailable; a valid simulation needs an authorized funded creator wallet. Live signing/submission/settlement/fee integration is a **separate later build + separate security review**.
- **PR #75 — release readiness, docs-only** (`GO-LIVE.md` + `OVERFLOW.md`). Mergeable, clean, no code. Its own status: BLOCKED on venue + production evidence.
- **PR #72** — external-refs CI safeguard, still needed. **PR #71** — superseded, do not merge.

## Critical path (bench-reviewed: DeepSeek V4 Pro + Kimi K2.7 Code, both FIX-FIRST; Kimi's ordering kept, its signing-boundary alarm withdrawn — that check passes)

1. Read-only production truth FIRST (parallel with 2): DB snapshot + effective-config validation in a trusted operator process; identify the operator account/wallet.
2. Resolve the Postgres concurrent-reconciliation deadlock (pre-existing on main; separate money/accounting scope), security-review PR #76, merge — lands unsigned previews.
3. **Live-enablement build** (new scope): mint custody, live signing/submission, confirmed-only settlement, live fee integration, metadata-URI ingress + its own security review.
4. Operator-wallet **recovery drill** — hard gate before any funding.
5. Unsigned LaunchLab preflight with a funded account wallet; simulated quote ≤ 0.35 SOL cap.
6. Sneaks approval bundle: Helius $49/mo if production is on public RPC; fund verified wallet to 0.5 SOL; one-launch GO.
7. One supervised launch (observe_only ON, two-person rule), verify the 0.1 SOL fee on-chain, re-arm dry_run=true regardless of outcome.
8. Separate GOs later: public ungating, X activation, marketing.

## Asks

- **Security reviewer for PR #76** (and later for the live-enablement build) — repo convention names Claude Opus as reserve reviewer. Sneaks to assign (CC/Astra unavailable).
- **Neon project identification** so the read-only production snapshot can run.
- Full plan: `handoffs/2026-10-25_1552_muse_stonkfunbot.md` (this repo) and the working copy in Muse's workspace.

## Check-in — Blue-7 (Muse subagent) · 2026-10-31 ~05:05 ET

Verifying + hardening the Mogz provider on branch `muse/mogz-provider` @ `6359e266` (premise confirmed against the live repo API: branch exists, head SHA matches the code audit). Scope: run the branch's test suite, audit the v1 pins (standard 1-instruction create, firstBuyQuote 0, SOL only, live execution refused by construction, session custody stub only), add only what is missing. No merge, no deploy, no real Mogz API calls, no real credential custody. Sign-off follows in this file when done.
