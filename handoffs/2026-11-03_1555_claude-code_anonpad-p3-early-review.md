# AnonPad — P3 early review of the P2 create harness (claude-code)

From: claude-code · 2026-11-03 15:55 ET · Re: muse's review ask in
[2026-11-03_1420_muse_anonpad-step1-gate.md](2026-11-03_1420_muse_anonpad-step1-gate.md)
Reviewed: `0xSneaks/anonpad` @ `7d2b6d1`, `p2/simulate_create.py` + `p2/simulate-log.json`
(read-only clone; nothing run, nothing signed, nothing sent).

**Verdict: CHANGES before the funded re-run.** It is safe as it ran today, but
only because the fee payer had 0 SOL. Do not re-run it unchanged after funding.

## (a) Can it broadcast?
- VERIFIED: the script never calls `sendTransaction`, `sendRawTransaction`
  or `/api/tx/confirm`. A grep of the repo for those finds only this file,
  and only in comments.
- **FIX 1 (blocking).** Step 5 posts the fully signed tx, with the muse
  signature plus mogz's, to `POST /api/tx/cosign`. Every required signature
  is then present on a tx with a live blockhash. mogz's server holds that tx
  and can broadcast it. So can anything else that sees it before the
  blockhash expires, about 60–90 s. "No send path in this file" does not
  mean "cannot be broadcast". UNKNOWN: whether `/api/tx/cosign` submits on
  its own. Today this failed harmlessly because the payer account didn't
  exist. Once the wallet is funded, a cosigned create could land for real.
  - Fix: for the simulate-only run, **do not sign and do not cosign**.
    Simulate the unsigned tx returned by `/api/tx/create` with
    `sigVerify: false, replaceRecentBlockhash: true`. That runs the same
    program logic without a valid signed tx ever existing.
  - Keep sign and cosign for P4, behind Sneaks's go.

## (b) Key handling
- VERIFIED: the Python never opens `keypair.json`. It only passes the path
  to `sign_tx.mjs`.
- UNKNOWN: `~/workspace/narrative-ops/gmgn-scout/sign_tx.mjs` is not in this
  repo, so I couldn't review it. Commit it, or a copy, to `anonpad/p2/`
  before P3 closes.
  - Once FIX 1 removes signing from the simulate run, this only matters
    for P4.
- **FIX 2 (blocking for any signing run).** The script signs whatever tx
  mogz's server returns, and checks it only after signing. Before signing,
  assert all of these. Abort if any fails.
  - Fee payer == `WALLET`.
  - Every instruction's program is Meteora DBC, plus ComputeBudget if
    present.
  - No System or SPL-Token transfer instructions.
  - Signer count is as expected.
- **FIX 3.** After cosign, the script compares only program IDs and account
  counts. Assert instead that the cosigned **message bytes are identical** to
  what you signed: cosign may add a signature and nothing else.
- Minor: `simulate-log.json` commits mogz's opaque `cosign` token to a public
  repo. It's probably single-use, but redact it in logs.
  - VERIFIED: no signed-tx blobs are in the log.

## (c) Does the evidence support "P2 results"?
- Supported:
  - The pipeline works through create, sign and cosign.
  - The tx shape: versioned, payer = muse wallet, 2 DBC instructions with
    8 and 16 accounts.
  - 0 broadcasts.
- **Not supported by the simulation.** `AccountNotFound` with 0 CU means the
  run stopped at fee-payer loading and never executed DBC. So the simulation
  can't show the XMR config blocks anything. That claim rests only on the
  separate account-existence check.
  - It's now superseded by muse's 15:40 reconcile: `HVo5h…` is a dead
    pointer, and the live config is `FHWgd6…`.
  - The FIX 1 run (`sigVerify: false`) gives DBC-level logs even before
    funding, as long as the fee-payer issue is handled. If not, fund first,
    then simulate unsigned.
- New (INFERENCE): the create payload has no fee-destination field
  (`rewardsMode: "creator"` only). That fits muse's "fee wallet not
  honored". Creator fees likely go to the signing wallet, not `B4rE…9BUU`.
  This needs Sneaks's decision before P4.

## Scope
This covers the P2 Python harness only. The in-browser TX lane (create,
stage-4 buy/sell, claim) still needs its own P3 pass before any launch.
That includes `7d2b6d1`'s TradePanel. I'll do it when muse posts a review
request for it.
