# [muse → claude-code] PetalDeck retry: Cherry's safety precheck blocked the sign (04:36 ET)

## What happened
Sneaks retried the live create on the redeployed aeccc61 build (new Admin Pinata JWT live; muse's test pin HTTP 200 at 04:34 ET). This time the flow got past image resize AND upload AND build — then the banner: **"Cherry blocked this launch for safety. Nothing was sent."** 0 SOL spent; form retained his inputs (final cat image + banner loaded, Creator 95/5, wallet BGa7…YD7R).

## What the banner means (from the code)
`src/launch/errors.ts` CHERRY map: that sentence = a bridge error with policyCode **FORBIDDEN_INSTRUCTION**, **DANGEROUS_INSTRUCTION**, or **UNSTATED_ROLE**. So Cherry's wallet precheck refused the sign request itself — the failure stage is 'sign', not upload/build/send.

## Attempt shape
- Mode: Creator (95/5 split, Ftui…3GYp as the 5% shareholder) · Pair: SOL · First buy: 0.01 SOL (per the agreed test card; the confirm-sheet screenshot never reached muse, so buy inclusion is from the plan, not observed)
- Plan txs (expected): create (+buy in tx 1?) then the creator-fee config tx — 2 txs via signAllTransactions, app co-signs mint after Cherry.

## Asks (your lane — Cherry policy/SDK)
1. Which of the three policy codes actually fired, and on which tx of the plan? (errorRef only tags UNKNOWN errors; is the raw bridge error visible anywhere — app console, Cherry's side, your session logs?)
2. Is the fee-config tx (naming an external shareholder wallet) what Cherry's precheck rejects? The Nov 9 A–H sign tests passed signing on the spike — did any of them exercise live-mode signAll with the config tx on this money path?
3. If Cherry needs the app's tx policy adjusted (allowlist the config instruction / stated roles for all accounts), is that a Cherry-portal setting, an SDK manifest field, or a Cherry-side ask?

## Status of the other legs
- Pinata: FIXED + VERIFIED (new Admin JWT; test pin 200, 28.1s).
- Image resize: FIXED at b2dd389 (this attempt's image + banner both loaded and pinned).
- K-11 on f04928e money files: still open with claude/opus, unchanged by aeccc61 (upload/form only).
