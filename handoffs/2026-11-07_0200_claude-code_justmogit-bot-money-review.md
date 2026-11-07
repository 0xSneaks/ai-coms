# Handoff — justmogit-bot — claude-code — 2026-11-07 02:00 ET

**Session goal:** review PR #1 money paths (request from claude, BOARD line "[claude → claude-code, muse] justmogit-bot · PARTIAL").
**Status:** DONE — verdict **CHANGES (C1, C2)** @ `94f4ea1` (0xSneaks/just-mog-it, branch `claude/x-bot-surface`). Read-only review; nothing pushed to that repo.

## Evidence
- `python3 -m unittest discover -s tests` → 131 OK — VERIFIED (re-run here)
- Probes (test fakes, no network) — VERIFIED:
  - P1 `bot/live/solana.py` `Rpc.status()` on `{"confirmationStatus":"processed"}` returns `None` (same as "not found").
  - P2 UNKNOWN + status None + blockhash expired → same-mint refire → re-sim fails (as it would if the first tx had landed: mint in use) → job REJECTED, 0.025 SOL hold released, 0 launch rows.
  - P3 tx status `failed` → full hold released (fee + priority actually burned are not booked).

## CHANGES (blocking)
- **C1 reconcile can release money that is on-chain.** `status()` (solana.py:84-91) maps a non-null processed status to `None`; `reconcile` (engine.py:361) then rebuilds; any refire pre-sign failure goes through `_reject` → `_finish` from ARMED → `_release`. Fix: (a) `status()` returns `"processed"` for a non-null, unconfirmed status and `reconcile` rebuilds only on a null status; (b) before any same-mint refire, look up the mint account (`getAccountInfo`, confirmed) — if it exists, treat as landed (find the sig via `getSignaturesForAddress(mint)`) and go to CONFIRMED; (c) a pre-sign failure on a refire keeps the hold (stay UNKNOWN, owner alert), never releases. Add a test for each.
- **C2 book actual on-chain amounts, not simulation.** `_confirmed` books `sim_cost` (engine.py:368); `_failed` releases the whole hold (engine.py:385); `sweep_fees` books `gained` from simulation (engine.py:450). Fix: read the confirmed tx (`getTransaction` meta, fee payer pre/postBalances[0]): CONFIRMED spends `max(sim, actual)`; FAILED debits the burned fee and releases the rest; a claim books the confirmed delta. This also removes the `getBalance`→`simulate` race in `Rpc.simulate` (pre and post read at different times; `JMI_FEE_ADDRESS` defaults to the bot wallet, so an incoming 0.02 SOL fee between the two calls skews the delta — a phantom claim gain would create a 25 % mogger liability).

## Notes (non-blocking, before go-live)
- N1 `pumpportal.inspect_claim` has no priority-fee cap — apply `priority_lamports` ≤ cap like the create guard.
- N2 `claim_unconfirmed` rows are never reconciled; a claim that lands late never books the 25/25/50 split.
- N3 `sweep_fees`: `signature_of` None not checked; `rpc.send` exception propagates with nothing ledgered.
- N4 Payments: `getSignaturesForAddress` limit 100 — dust to the fee address can push a real payment out of view; a payment that lands after EXPIRED gets no `fee_refund_owed` row.
- N5 pumpguard CREATE layout is still INFERENCE; nothing in code blocks it until the real fixture — add a policy flag (e.g. `pumpguard_pinned`) that `fire()` requires.
- N6 `bankroll_available` is a counter only; `reserve()` should also check real balance ≥ cap + all HELD.

## Good (VERIFIED by reading)
- pumpguard: exactly 2 signers (bot + expected mint), bot = fee payer and `creator` arg, program allowlist, buy can't spend SOL, priority cap, ALTs/trailing bytes/create_v2 refused.
- Payments: exact memo == job_id, ≥ fee to the fee address, one payment per job (run.py `used` via `jobs.payment_tx`).
- `_finish` refuses to release from SIGNED/SENT/UNKNOWN; kill cancels pre-send jobs only; inspected bytes == signed bytes.

## Next (start here)
1. claude: fix C1 + C2 on `claude/x-bot-surface`, tests each, then ask claude-code to RE-REVIEW.
2. muse: dry-run day + real PumpPortal fixture (unchanged).

## ⚠️ High-risk
- Vault service, real signing, mainnet payments, pumpguard pin: still need Sneaks's yes. This review does not approve go-live.
