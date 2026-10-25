# Handoff — Muse → all — STONKFUNBOT launch verification + plan — 2026-10-25

Sneaks revived STONKFUNBOT today and ordered a full pass: every doc read, whole repo reviewed, plan worked out with the team. This is the result. Project file: `projects/stonkfunbot.md`.

## What I did (all read-only; no merges, deploys, env changes, or funds)

- Pulled the full repo (main @ `d01e17a`) and read README, HANDOFF, DECISIONS (incl. §9 reconciliation + §17), DEPLOY, AGENTS, docs/handoff/NEXT, and PR #75's GO-LIVE runbook from its branch.
- Ran the suite on this VM: **844 Python passed / 23 skipped, 104 Node passed, ruff clean**. One flaky reconciliation concurrency test (failed once in a full run; 3/3 in isolation; second full run green).
- Checked the two named operator wallets on-chain: both hold **0 SOL**.
- Consulted the bench twice: DeepSeek V4 Pro (gates review) and Kimi K2.7 Code (full-facts build-order review). Both verdicts: **FIX-FIRST**.

## Findings that change the old plan

1. **The old Lane 1 identity blocker is already fixed on main.** Identity is account-keyed by immutable X `author_id`; no handle fallback in any money path.
2. **The real blocker is the venue:** StonkFun refuses new launches at `/launches/prepare` and redirects to LaunchLab. PR #76 is the LaunchLab provider and is the critical path — and its **signing-boundary check is failing**, which Kimi flagged as a potential architectural defect, not a CI checkbox. It merges only after that is fixed AND an independent security review passes.
3. **Production truth is step 1, not an afterthought** (Kimi's reorder, adopted): read-only DB snapshot (SQL in GO-LIVE.md) + effective-config validation + operator wallet identification, in parallel with the PR #76 work. "Has a live launch ever happened?" is currently UNKNOWN.
4. **Recovery drill before funding** — new hard gate: prove the operator wallet restores outside production before a single lamport moves.
5. PR #75's two failing web checks are hygiene, off the critical path. PR #71 stays unmerged (superseded). Issue #74 (Pump.fun + multi-wallet) waits until the Solana launch is proven.

## Sequenced plan

Production snapshot/config → PR #76 fix + security review + merge → PR #75/#72 merges → recovery drill → unsigned LaunchLab preflight (dry_run ON, quote ≤ 0.35 SOL) → Sneaks approval bundle (Helius if needed, fund 0.5 SOL, one-launch GO) → supervised launch with fee verification on-chain → re-arm dry_run. Public ungating, X polling, and marketing are separate later approvals. Mon Oct 26: X API setup/verification for @StonkFunBot under the same approval bundle (Sneaks's order today).

## Needs from the team / Sneaks

- An independent security reviewer for PR #76 (repo convention: Claude Opus).
- The Neon project identified so the snapshot can run.
- No action requested from Claude Code / Astra — noted unavailable by Sneaks 2026-10-25; disputes come to Sneaks.

— Muse, 2026-10-25
