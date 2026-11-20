# Codex review request — Antigravity money path (adversarial)

**To:** codex (adversarial reviewer)
**From:** muse
**Date:** 2026-11-20 ~07:35 ET
**Gate:** Sneaks publishes Antigravity to Cherry only after your verdict is APPROVED. No real transaction before that.

## What to review

PR https://github.com/0xSneaks/antigravity/pull/1, branch `grok/antigravity-v1`, head
`6ae19fcb` ("Match the sign-only pass test and cap notes to the $5 and $15 launch prices",
2026-11-20 06:33 ET). History on the branch: `45ec8782` (build: Cherry mini app),
`72b60458` (launch pricing $5/7d + $15/30d), `6ae19fcb` (test/cap notes). Nothing is on
main. Review the money path only, adversarially — attack it.

## Scope

- `POST /api/session`: `verifyLaunchToken` server-side before anything, session handling,
  user key `cherry_id ?? sub`, `tier` / `wallet` / `payment_wallet` claims.
- `POST /api/pass/order {plan}`: server-created order_id, fixed amount, 10-min expiry,
  one open order per user.
- Client tx construction: one USDC `transferChecked` to the receiving address's USDC ATA
  (create-ATA-idempotent only if missing), SPL Memo with order_id,
  `withAppReference(transferIx, APP_ID)`, plan + amount shown before signing,
  `signAndSendTransaction`, one-time only (no approvals / delegation / durable nonce /
  recurring). No Cherry fee in the tx.
- `POST /api/pass/confirm {order_id, signature}`: reused `verify_usdc_payment` fail-closed
  (success, finalized, recent, USDC mint, pre/post token balances) PLUS amount == plan
  price exactly, signer / fee payer == session `payment_wallet ?? wallet`,
  memo == order_id, app reference key present, block time after order creation,
  signature not in the replay ledger; only then extend `paid_until`; idempotent.
- Ledger table `cherry_sales` (order_id, cherry_id, plan, usd_amount, tx_signature UNIQUE,
  paid_until_before/after, tier, created_at, confirmed_at).
- Errors: `POLICY_DENIED` / `DAILY_LIMIT` handling ("Daily limit reached, try again
  tomorrow"), no retry loops (Cherry may pause apps that keep sending refused txs).
- Prices consistent at launch $5/7d + $15/30d (settings defaults, labels, tests).
- The sign-only pass test (builds a real tx, signs, never broadcasts).

## Open points from the build handoff — answer each

1. Memo shape — is the order_id memo exactly what the confirm step expects, end to end?
2. Rent when the buyer's USDC ATA is missing — who pays it, and is the amount handled?
3. Whole-region geo match vs the occupied polygon — does the in-app block match the portal
   list (CU/IR/KP/SD + Crimea, Sevastopol, occupied Donetsk/Luhansk/Kherson/Zaporizhzhia)
   and fail closed on unknown for paid actions?
4. Public whale positions — does any display cross into "signals for a fee" (entry/stop/
   target, direction, composite setup score)? Flag it if so. (Asking team@cherry.fun is
   Sneaks's step, not yours.)
5. Anything else that could lose money, double-charge, replay, or pay the wrong address.

## Live state (context only — review the code, not the hosts)

- API live on Railway, `GET /api/health` 200:
  `{"ok":true,"service":"antigravity","cherry_identity_configured":true,"receiving_wallet_configured":true,"usdc_mint_configured":true}`.
  Receiving wallet is sneaks.skr, confirmed by Sneaks 2026-11-20 and set as the
  `PAYMENT_RECEIVING_ADDRESS` env var only — never in the repo, never hardcoded.
- Web preview live at
  https://antigravity-git-grok-antigravity-v1-phantomcapais-projects.vercel.app
  (page 200, `/.well-known/cherry-app.json` 200 with the App ID, CSP frame-ancestors
  incl. chat.cherry.fun, no X-Frame-Options, `VITE_API_BASE` baked into the bundle).
- Portal automated test passed 2026-11-20 07:26:21 ET; listing starts Unverified
  ($50/tx, $50/wallet/day). App ID `243a432e-a793-4aa9-9984-106387faad30`.
- Passes: one-time USDC, 7d $5 / 30d $15 launch prices; standard $10/$20 after month 1.

## Verdict

Reply with one of **APPROVED** (safe to publish / take real tx), **CHANGES** (list exactly
what must change, file + line), or **BLOCKED** (fundamental issue, say what). Post the
verdict on the board and file a handoff. Do NOT merge, deploy, publish, touch main,
move money, sign anything, or change the receiving wallet.
