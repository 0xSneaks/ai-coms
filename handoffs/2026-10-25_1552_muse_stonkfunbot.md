# Handoff — Muse → all — STONKFUNBOT launch verification + plan — 2026-10-25 (corrected 15:55 ET)

Sneaks revived STONKFUNBOT today and ordered a full pass: every doc read, whole repo reviewed, plan worked out with the team. This is the result. Project file: `projects/stonkfunbot.md`.

> **Correction:** the first version misstated PR #75/#76 CI (a garbled tool output invented web-check failures, readiness scripts, and a signing-boundary failure). The full PR bodies arrived afterward and are the source of truth below.

## What I did (all read-only; no merges, deploys, env changes, or funds)

- Pulled the full repo (main @ `d01e17a`; 193 files downloaded, 0 failed) and read README, HANDOFF, DECISIONS (incl. §9 reconciliation + §17), DEPLOY, AGENTS, docs/handoff/NEXT, and PR #75's GO-LIVE runbook from its branch.
- Ran the suite on this VM: **844 Python passed / 23 skipped, 104 Node passed, ruff clean**. One flaky SQLite reconciliation concurrency test (failed once in a full run; 3/3 in isolation; second full run green).
- Checked the two named operator wallets on-chain: both hold **0 SOL**.
- Consulted the bench twice: DeepSeek V4 Pro (gates review) and Kimi K2.7 Code (build-order review). Both verdicts: **FIX-FIRST**. Kimi's ordering is adopted; its signing-boundary alarm is withdrawn (that check passes on PR #76).

## Findings that change the old plan

1. **The old Lane 1 identity blocker is already fixed on main.** Identity is account-keyed by immutable X `author_id`; no handle fallback in any money path.
2. **The real blocker is the venue:** StonkFun refuses new launches at `/launches/prepare` and redirects to LaunchLab.
3. **PR #76 is previews-only.** It adds a strictly-inspected unsigned LaunchLab preview path; the engine refuses live signing even with dry_run off. Merging it does not enable a launch — live signing/submission/settlement/fee integration is a separate build with its own security review. PR #76's one CI failure is a **Postgres concurrent-reconciliation deadlock on code unchanged from main** (reread: the same reconciliation exactly-once subsystem as the flaky SQLite test — a pre-existing main defect, money-adjacent, its own scope).
4. **Production truth is step 1, not an afterthought** (Kimi's reorder, adopted): read-only DB snapshot (SQL in GO-LIVE.md) + effective-config validation + operator wallet identification, in parallel with the PR work. "Has a live launch ever happened?" is currently UNKNOWN.
5. **Recovery drill before funding** — hard gate: prove the operator wallet restores outside production before a single lamport moves.
6. PR #75 is docs-only and mergeable (runbook). PR #71 stays unmerged (superseded). Issue #74 (Pump.fun + multi-wallet) waits until the Solana launch is proven.

## Sequenced plan

Production snapshot/config → reconciliation-deadlock fix + PR #76 security review + merge (previews) → live-enablement build + review → recovery drill → unsigned LaunchLab preflight with a funded account wallet (dry_run ON, quote ≤ 0.35 SOL) → Sneaks approval bundle (Helius if needed, fund 0.5 SOL, one-launch GO) → supervised launch with fee verification on-chain → re-arm dry_run. Public ungating, X polling, and marketing are separate later approvals. Mon Oct 26: X API setup/verification for @StonkFunBot under the same approval bundle (Sneaks's order today) — auth + marketing only; the direct X launch path cannot sign (no quote→confirm pinning) and stays unmarketed.

## Needs from the team / Sneaks

- An independent security reviewer for PR #76 (repo convention: Claude Opus).
- The Neon project identified so the snapshot can run.
- No action requested from Claude Code / Astra — noted unavailable by Sneaks 2026-10-25; disputes come to Sneaks.

— Muse, 2026-10-25
