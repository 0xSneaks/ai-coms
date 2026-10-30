# Independent review and queue reorganization — ChatGPT
**Date:** 2026-10-30 12:20 ET · **Project:** apply-all · **Scope:** read-only review + documentation update · ⚠️ HIGH-RISK entries (Kalshi, signing, wallets)

## Did
- VERIFIED: Read COMS BOARD.md, RULE.md, project/bounty-scout.md, project/kalshi-trader.md and Muse's 2026-10-30 12:15 open-items report.
- VERIFIED: Compared prior handoffs for Cardano proposals, Clawlancer, MLH, CheckFlow, n8n and Kalshi chain completion, plus Kalshi autonomy scope.
- VERIFIED-PRIMARY: Checked official Cardano RFP, Flip the Switch rules and schedule, MLH Solana Hackathon listing, Coinbase Wallet referral terms, Anna program's official forum clarification and HackerOne's invitation rules; verified gmgn-cli 1.7.1 existence, **not** safe behavior changes.
- VERIFIED: Created [projects/apply-all.md](../projects/apply-all.md) at commit `8102ab17cdb0e5952904c106fee80f8867788149`, splitting work into deadline-critical, owner-only, safety/technical, and parked backlog with labels and explicit next actions.
- VERIFIED: No applications, registration, credentials, money movement, live orders, software upgrades or deployment touched.

## State + proof
1. **Cardano — CONFLICT:** Muse Oct 29 [submission record](2026-10-29_0744_muse_submissions-review.md) says twice **submitted** at **₳30,000**; latest Oct 30 note says **draft** at **₳12,500**. Official RFP deadline Nov 4, PDF max 2 pages, fixed-price ADA and 1–2 week research. Receipt and PDF bytes UNKNOWN. Do not submit a third time by default.
2. **Flip — VERIFIED-PRIMARY:** registration already open and owner-only; automated registration/submission prohibited. Hacking begins Nov 4 00:01 IST (**Nov 3 13:31 EST**); earlier stated Nov 3 ET time is the converted start time, not registration opening.
3. **Identity — UNKNOWN:** legal-form name not confirmed merely from LinkedIn. Prior owner's approval to publicly link identity is a different decision. Need explicit form identity and n8n-use answers.
4. **MLH — CONFLICT:** [Oct 29 acknowledgment](2026-10-29_0812_muse_submissions-review-ack.md) says REGISTERED 07:45 ET; latest open-items note says not registered. Verify receipt; do not submit duplicate registration.
5. **CheckFlow/n8n/Clawlancer — CONFLICT:** [Oct 29 record](2026-10-29_0744_muse_submissions-review.md) says CheckFlow registered, n8n submitted, Clawlancer registered; Oct 30 open-items note says uncertain or blocked. Verify dashboards and receipts before any POST; Clawlancer one-shot API key, dormant by owner's previous choice.
6. **Kalshi — CONFLICT:** [Oct 29 chain-complete](2026-10-29_1825_claude-code_kalshi-chain-complete.md) records Vercel signing key/token provisioned and coms-pwa PR #6 merged, but G3c pinned only on unmerged branch and independent check missing. Oct 30 note asks to redo key/token step 1. **No re-keying or prod orders** until actual deployments and safety reviews reconciled. Owner's [autonomy scope confirmation](2026-10-29_1857_muse_kalshi-autonomy-confirmed.md) is not an implementation/review pass.
7. **Anna — VERIFIED-PRIMARY:** Nov 30 qualification requires approved/published app **and** >=200 qualified app MAU; account signup is insufficient. Official updated portfolio-level deduplication and one grant per builder per month. Feasibility depends on app and organic users (UNKNOWN).
8. **Coinbase Wallet — VERIFIED-PRIMARY:** 25% of net *fees* from eligible same-chain in-app swaps with exclusions/eligibility, not 25% of swap volume.
9. **95 target census — UNKNOWN:** 6+43+26+20=95 but underlying per-target master list absent from COMS. Agent must publish redacted per-item tracker before claim of completed sweep is treated as verified.

## Decided / recommendations (INFERENCE)
- Urgent: owner confirms identity/n8n-use; Muse reconciles Cardano submitted PDF and price before Nov 4; owner manually registers Flip now; verify MLH receipt; begin Anna feasibility only if real-user distribution plausible.
- Split secret entry and signup retries into owner-driven separate steps; avoid ambiguous blanket “apply for all” as operational authorization.
- PARK Clawlancer bounties, ClawGig retries until service restored, gmgn-cli upgrade pending diff/tests, kvmCTF and invitation-only IBM Granite.
- KILL BasedAgents from this application list as a precaution based on COMS assessment; independent fraud determination not made.
- Keep Kalshi technical incident outside grant deadlines; Phase 1 egress diagnosis first, no production order or unsafe gate change.
- Existing bounty scout/project doc has stale blanket no-signup rules and Kalshi doc is stale; treat **latest direct owner instructions** as operative and request owner/Muse reconcile policy documents instead of rewriting unrelated owners' scope.

## Next — assign Muse via COMS request
1. Publish exact **43 needs-owner rows** + master 95 list with deduplication, eligibility and receipts (redacted).
2. Cardano: reconcile two form receipts, exact final PDF, submission price and <=2-page rule; ask Sneaks whether any correction warranted.
3. Check Flip manual-registration status; confirm legal-name entry owner-only.
4. Verify MLH, CheckFlow, n8n, Clawlancer states *read-only* before any further POST.
5. Publish missing Digital Promise eligibility and Solana Foundation grant budget/double-funding disclosure; update Cardano if-awarded plan.
6. Route Kalshi G3c and proxy timeout investigation to independent reviewer; **no key rotation, prod order or unapproved live action**.

## Don't
- Don't infer personal identity, KYC, account status, income, award eligibility, pricing approval, authentication success, or submission receipt.
- Don't repeat submissions/registrations/order POSTs on a mere timeout.
- Don't request secrets in chat or print/export API keys.
- Don't change repo files another agent claimed, trade, deploy or sign for the owner.
