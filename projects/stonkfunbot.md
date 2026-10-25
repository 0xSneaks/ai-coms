# STONKFUNBOT — project state (opened by Muse, 2026-10-25)

**Status: REVIVED by Sneaks 2026-10-25** (was parked 2026-10-23). Owner chat: "Stonk fun bot" side chat. Muse is sole builder/checker while Claude Code + Astra are unavailable (Sneaks, 2026-10-25).

## Where it stands (all verified 2026-10-25 against the live repo)

- Repo `0xSneaks/STONKFUNBOT`, main @ `d01e17a`, CI green. Local verification on this VM: **844 Python tests passed** (23 skipped), **104 Node tests passed**, ruff clean. One flaky reconciliation concurrency test observed once; passes in isolation and on re-run — watch it.
- **Identity migration is DONE on main** (mentions resolve by immutable `author_id` → account; handles display-only; fail-closed). The old Lane 1 blocker no longer exists.
- **No dividend engine on main** (parked PR #39 only).
- Production is behind the holding-page gate; Vercel crons are empty (no X polling). Production env var names are all present; effective values unverified. Production DB history is **UNKNOWN** — the read-only snapshot in PR #75's GO-LIVE.md has never been run.

## THE blocker

**StonkFun closed its launch venue.** `/launches/prepare` refuses new launches: "launch through LaunchLab instead." Main cannot launch at any funding level. The fix is **PR #76** (LaunchLab provider, 67 files, touches vault/txguard/launch/swap) — currently failing CI: python, Postgres, **signing-boundary**, and both web checks.

## Critical path (bench-reviewed: DeepSeek V4 Pro + Kimi K2.7 Code, both FIX-FIRST)

1. Read-only production truth FIRST (parallel with 2): DB snapshot + effective-config validation in a trusted operator process; identify the operator account/wallet.
2. PR #76: signing-boundary fix first, CI green, **independent security review before merge**.
3. PR #75 (runbook): fix two web checks, merge — non-blocking track. PR #72 safeguard: review + merge. PR #71: leave open, do not merge.
4. Operator-wallet **recovery drill** — hard gate before any funding.
5. Unsigned LaunchLab preflight with dry_run ON; accepted quote ≤ 0.35 SOL cap.
6. Sneaks approval bundle: Helius $49/mo if production is on public RPC; fund verified wallet to 0.5 SOL; one-launch GO.
7. One supervised launch (observe_only ON, two-person rule), verify the 0.1 SOL fee on-chain, re-arm dry_run=true regardless of outcome.
8. Separate GOs later: public ungating, X activation, marketing.

## Asks

- **Security reviewer for PR #76** — repo convention names Claude Opus as reserve reviewer. Sneaks to assign (CC/Astra unavailable).
- **Neon project identification** so the read-only production snapshot can run.
- Full plan: `handoffs/2026-10-25_1552_muse_stonkfunbot.md` (this repo) and the working copy in Muse's workspace.
