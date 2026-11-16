# Muse Follow-Up — Cherry Cash-In / Cash-Out Foundation + Seeker Miner

**Date:** 2026-11-16 ET  
**From:** ChatGPT (Sneaks owner voice instruction) → Muse  
**Project:** cherry-revenue-audit / current Cherry builds  
**Status:** OWNER REQUIREMENT RECORDED — Muse ACK / implementation NOT YET VERIFIED  
**Risk:** ⚠️ HIGH-RISK (wallet money movement, gaming, payments, regulated activity)

## Did
Captured Sneaks's **additive** requirement immediately before he tells Muse to **check COMS now**:

> "Also for our current builds, how to upgrade like our cherry slots — how do people cash in, cash out? And that goes for the rest of the builds as well ... There needs to be a solid foundation on cashing in, cashing out. Because I do want to build a seeker miner."

He later confirmed a desire to use his authorized developer access to build useful products that earn revenue and serve users. Do **not** restart or overwrite the existing [12-hour logged-in Cherry recon](2026-11-16_chatgpt_cherry-revenue-audit-owner-followup.md) / [mission issue #20](https://github.com/0xSneaks/ai-coms/issues/20). Add this cash-in/out workstream to that active investigation.

## Intent, facts and unresolved gates
- **OWNER INTENT:** Build a reliable customer deposit/purchase, internal balance, redeem/withdraw/payout, refund and settlement foundation across current Cherry builds, especially slots-like games, with reusable components for future apps. Investigate a **Seeker Miner** concept and whether it could use that same foundation.
- **NOT VERIFIED:** Which existing apps currently accept real deposits or redemption, which wallet/payment SDK capabilities Cherry actually enables, whether cash-out is permitted in each jurisdiction, any operating license, the owner's exact Cherry badge/partner privileges, or the identity and tokenomics of Seeker Miner.
- **OWNER CLAIM:** User says he has the “full go” for developing on Cherry. **Do not infer Partner approval, iGaming licensing, banking/financial permissions, or authorization to launch real-money gaming** without portal/official written proof.
- **IMPORTANT:** Deposits and payouts for real-money slots/chance games are materially different from payments for ordinary software or nonredeemable game credits. Do not claim that a working wallet integration means regulated cash-out is allowed.

## Next — Muse: inspect, map, recommend, do NOT transfer
1. **Check in:** read BOARD.md, existing project/claims and this handoff. ACK on [issue #20](https://github.com/0xSneaks/ai-coms/issues/20), using the existing work queue; verify the real background-worker ID if one is active. Do not invent long-running execution or duplicate others' claims.
2. **Authorized recon:** review the actual signed-in Cherry customer and developer UI, official payment/monetization/wallet docs, listing/review rules and any restricted-category language. Record exact source URLs, UI locations, SDK methods and dates. Never request or expose seeds, private keys, 2FA codes, customer data, or payout credentials.
3. **Per-build capability inventory:** identify Cherry slots / Royale, Hold’em, PetalDeck, Pachinko and other live/in-progress builds by **verified repo and commit**, and annotate whether each has: deposit/checkout, payment verification, on-chain confirmation, customer balance ledger, fee accounting, play/consume state, refund, withdrawal request, payout executor, payout receipt, audit logs, idempotency tests, rollback/failure recovery, and operational monitoring. Use **WORKING / SCAFFOLDED / ABSENT / UNVERIFIED**, not simulated UI = working.
4. **Cash-in/customer flow:** document wallet connection and user consent; prices/units and how owner sets them; invoice/quote creation; transaction signing by the actual user; on-chain confirmation thresholds; credit only on verified settlement; duplicate/replay handling; immutable double-entry/event ledger; fees, taxes, refunds and reconciliation. Distinguish real funds from nonredeemable credits and avoid custodial handling by default.
5. **Cash-out flow (where legal/permitted):** document user withdrawal/redemption eligibility, balances and liability reserves, receipt verification, risk limits, fraud/self-dealing checks, withdrawal request and approval states, payout signer/treasury separation, confirmations, delayed/failed payout recovery and customer-visible status. No automatic payout or withdrawal code goes live without explicit owner sign-off and legal/venue checks.
6. **Game-specific gating:** for slots, random payouts, prize redemption, cash-equivalent rewards, paid miners or wagering, explicitly classify real-money chance/game-of-skill risks, operating locations and Cherry Verified vs Partner / iGaming conditions. If prohibited or lacking licensing, specify **free-play/nonredeemable demo** alternative; do not bypass geo or age restrictions. Do not mislabel a prize game as “software credits.”
7. **Seeker Miner:** define the concept before choosing mechanics—actual on-chain resource/mining protocol, rewards estimator/simulator, idle/clicker game, or staking-like yield app are different. Assess whether it can ship as noncustodial utility/free-to-play without regulated redemption. Request owner approval before any money, mint, mining fees or reward program is created.
8. **Prioritized design:** propose one shared **payment/reconciliation core** with app-specific policy adapters and an auditable test harness. Include clear requirements, threat model, tests (double-credit, duplicate payout, failed settlement, price changes, wallet switching, platform outages), compliance blockers and a phased rollout: mock/dry-run → devnet → independent review → explicit owner production approval.
9. **Commercial review:** show price-setting locations, optional legal purchase paths, gross-to-net unit economics (Cherry fees + chain/PSP costs + chargeback/refund/support reserves) from confirmed evidence. Avoid invented prices, provider features or income claims.

## Deliverables and acceptance
- **Cash-in/out comparison matrix** for each existing Cherry build plus proposed Seeker Miner with repo SHA, real vs demo, custody model, deposit/withdraw status, user flow and owner approval/legal gates.
- **Validated user journey** for each supported purchase/redeem path; screen-by-screen steps, precise provider/SDK methods, price/fee configuration, fail/refund/retry states and receipts, with source links.
- **Foundational technical specification**: settlement state machine, ledger, idempotency/replay protection, segregated keys, authorization, observability, P&L/fee ledger and audit tests.
- **Prioritized upgrade plan** for quickest legitimately shippable high-quality products. Label VERIFIED / INTENT / INFERENCE / UNKNOWN and DIRECT / REVIEW / PARTNER / BLOCKED upload eligibility.
- **Evidence-bearing handoff** in AI COMS and acknowledgement of actual Muse execution. Keep prior A1/A4 evidence and #20 scope; continue 12-hour genuine-worker checkpoints if deployed.

## Decided
- This message authorizes **research, recon and planning only**. Any implementation touching money/wallets, payout automation, production launch, real-money gaming, wagers, transfers, deployment or spend requires separate scope, safety review, permitted operating status and explicit owner approval.
- User should be able to see clear pricing, settlements, receipts and fair refunds. A “full go” developer badge is not a shortcut through legal/venue requirements.

## Don't
- Don't trigger or simulate real payments, create/fund wallets, trade, wager, publish, or deploy.
- Don't assume legitimate cash-out exists merely because funds can be paid in.
- Don't disguise gambling as mining or credits to avoid platform requirements.
- Don't mix customer monies with developer treasury; don't promise guaranteed earnings.

**Last handoff → next:** Owner's 12-hour marketplace/pricing recon was posted, [issue #20](https://github.com/0xSneaks/ai-coms/issues/20) remains the dispatch target → Muse reads COMS now, ACKs, adds this payments/reconciliation workstream, and reports evidence + blockers.  
