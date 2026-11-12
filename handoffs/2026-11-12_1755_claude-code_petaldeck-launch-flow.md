# SIGN-OFF: PetalDeck launch flow (3012 / IncorrectProgramId / guard / attribution) from claude-code to all, 2026-11-12 17:55 ET

Owner order: Sneaks, chat, 17:14 ET. Sign and sim only. Nothing was broadcast.

## Outcome
- **Deliverable branch:** `claude/quirky-sagan-wxf7a7` @ `6030a68`.
  - A parallel Claude session (session_018M1f…) built it on top of my first commit `9caba42`. That commit is the chained fork sim plus the guard.
  - It holds the real-app root, the harness at `/?harness=1`, the token-pair fee-share fix, `docs/launch-flow.md` and the `/api/config` ESM fix.
  - That session posted no board claim. I verified its work instead of redoing it.
- **Superseded:** my branch `claude/petaldeck-launch-flow` @ `9caba42`. It is already contained in the deliverable branch. Delete it only on Sneaks's word.
- **Preview:** https://cherry-launch-room-git-claude-qui-cf6e25-phantomcapais-projects.vercel.app (deployment `cherry-launch-room-fnjfet08l-…`).

## Independent verification (claude-code, 2026-11-12 22:51 UTC)
I ran a fresh chained fork sim on that preview (`GET /api/sim?suite=1`, synthetic funded wallet, mainnet state via reads only):

| Var | bytes | alone (RPC-style) | chained |
|---|---|---|---|
| A | 858 | ok | ok 109,071 CU |
| B | 908 | ok | ok 106,221 CU |
| C | 1203 | ok | ok 199,514 CU |
| D | 908 + 854 | ok ; **3012** | ok ; ok 143,806 CU |
| E | 1667 | over 1232 (measure only) | — |
| F | 1030 + 1071 + 930 | ok ; **IncorrectProgramId** ; **3012** | ok ; ok 204,105 ; ok 160,284 CU |
| G | 1203 + 854 | ok ; **3012** | ok 274,746 ; ok 170,806 CU |
| H (pair 3NZ9…qmJh) | 1030 + 930 | ok ; **3012** | ok 133,355 ; ok 194,663 CU |
| P (prod) | 1203 + 854 | ok ; **3012** | ok 200,821 ; ok 152,802 CU |

- **3012:** VERIFIED as a test artifact. pfee log: `AnchorError caused by account: mint … AccountNotInitialized`. It passes once tx 1 runs first.
- **F IncorrectProgramId:** VERIFIED as the same artifact. The Token-2022 ATA create for a mint that doesn't exist yet fails alone and passes chained.
- **Real bug:** on my branch, F's chained tx 3 failed with `InvalidAccountData`. The other session fixed it with `sharingVaultAtaInstruction`, an idempotent quote ATA for `creatorVault(sharingConfig)`. I reviewed that fix:
  - payer = user, ATA owner = Pump's vault PDA.
  - No funds can be redirected.
  - About 0.002 SOL rent, and the confirm sheet mentions it.
- **Local checks on `6030a68`:** tsc clean, eslint 0 errors (2 old warnings), vitest 120/120, vite build OK.
- **No send path:** the only `sendTransaction` in src/server is LiteSVM's in-process VM.

## Production pick
Variant P, as `docs/launch-flow.md` describes:
- tx 1 = create + optional first buy.
- tx 2 = fee share 95/5 + reference key.
- One `signAllTransactions` approval.
- Send order: tx 1 confirmed, then tx 2.

## Sneaks next (batched)
1. Portal → App URL → the preview root above (not `/spike/`), then Run checks.
2. Re-sign in Cherry from `/?harness=1`: **P, G, F, H, D**. A, B and C are unchanged. Sign with a wallet that is NOT Ftui…3GYp.
3. Live sends stay OFF until "LIVE YES" plus the D5 money-path review and an Opus cross-check.

## Open
- Design: Sneaks's `petaldeck-previews.zip` = `assets/previews/*.png` on main (PR #1). They show the current UI v2. The deliverable root serves that UI.
- D5 money-path review + independent Opus cross-check are still owed before any live launch.
