# Apply-all / opportunities — reconciled action board
**Owner:** Sneaks · **Coordinator:** Muse · **Independent reviewer:** ChatGPT · **Reviewed:** 2026-10-30 12:19 ET
**Source of queue:** [Muse's 12:15 handoff](../handoffs/2026-10-30_1215_muse_open-items.md)
**Scope:** triage and organization only. No applications, registrations, signatures, trading, wallet connection, credential entry, or deployment executed by this review.

## Ground truth and notation
- **VERIFIED-PRIMARY** = publicly published program terms/timing were independently checked (does **not** verify a personal account or submission).
- **RECORDED-COMS** = an agent handoff states an action happened; actual receipt/account state not independently checked here.
- **CONFLICT** = two COMS records disagree; verify receipts or exact persisted state before any retries.
- **UNKNOWN** = evidence absent. **INTENT** = next action proposed, not executed.
- **Owner approval:** every real submission, identity/KYC, grant obligation, spend, live trade, wallet action, and production-auth change needs an explicit, scoped Sneaks decision. Do not invent form answers. Separate per-target outcomes.

## A. Deadline-critical and user-dependent (in execution order)
| Priority | Target / deadline | Current state + evidence | Next action and owner | Gate / verdict |
|---|---|---|---|---|
| A0 | **Identity + n8n one-line answer** (today) | **UNKNOWN:** public LinkedIn profile/name is not proof of legal-form name; n8n-use answer absent. Older COMS handoffs record owner's consent to public identity linkage, which is a **different** question. | **Sneaks:** confirm legal name privately for legal/KYC forms; answer **yes/no** to existing n8n use. **Muse:** apply only to eligible forms after confirmation. | **DO NOW**; do not auto-fill or publish identifying details. |
| A1 | **Cardano Intersect RFP** (Nov 4) | **VERIFIED-PRIMARY:** due Nov 4, PDF <=2 pages, fixed ADA price, 1–2 weeks, public presentation possible. **CONFLICT:** [Oct 29 submission handoff](../handoffs/2026-10-29_0744_muse_submissions-review.md) says *two submissions already confirmed* and final price **₳30,000**; Oct 30 handoff calls *₳12,500 placeholder* and says waiting to submit. **UNKNOWN:** original receipts/PDF validity. | **Muse:** obtain redacted form confirmations and exact *submitted PDF*; compare price, name, 2-page limit, RFP methodology, delivery feasibility; explicitly identify authoritative/latest submission. **Sneaks:** only approve **correction/replacement if needed**, not a new default application; settle price/contract obligations. | **FIX-FIRST / NO DUPLICATE SUBMISSION.** Official: https://forum.cardano.org/t/public-rfp-research-on-cardanos-utxocostperbyte-parameter/157406 |
| A2 | **Flip the Switch** (register NOW; hack Nov 3 ET–Nov 7) | **VERIFIED-PRIMARY:** registration currently open; event starts Nov 4 **00:01 IST = Nov 3 13:31 EST**, submissions close Nov 7 23:59 IST. Rules require a real legal identity and prohibit agent/bulk/automated **registration or submission**. AI-assisted building is allowed. **UNKNOWN:** Sneaks enrollment. | **Sneaks:** manually register after confirming exact legal form identity. **Muse:** pre-event design/prep only; select Switch-centered workflow and track deadline; owner manually submits. | **DO NEXT; no bot registration.** https://www.wemakedevs.org/hackathons/switch/rules and /schedule |
| A3 | **MLH Solana Hackathon** (Nov 6–8) | **VERIFIED-PRIMARY:** event Nov 6–8. **CONFLICT:** [Oct 29 acknowledgment](../handoffs/2026-10-29_0812_muse_submissions-review-ack.md) says **REGISTERED at 07:45 ET**, Oct 30 handoff says *still needs registration*. **UNKNOWN:** MLH confirmation/account status. | **Muse:** check signup receipt/account page first. **Sneaks:** only complete missing real profile fields if not already registered. Prep **Tx Autopsy** design; no hackathon code prematurely if event rules restrict start. | **VERIFY BEFORE RETRY.** https://events.mlh.com/events/15200-solana-hackathon |
| A4 | **Anna AI Founding Builder** (qualification Nov 30) | **VERIFIED-PRIMARY:** requires approved/published app and >=200 **qualified** monthly active users during qualification period, not merely account signup. Official forum says review typically 3–5 business days; portfolio-level *deduplicated* MAU and max one monthly grant per builder. **UNKNOWN:** account/app acceptance, feasibility of real user acquisition. | **Sneaks:** enroll personally if pursuing. **Muse:** select **one** viable already-built app, estimate honest distribution/review lead time, read current official rules. | **TEST FEASIBILITY NOW, not Nov 29.** https://forum.anna.partners/t/founding-builder-buidl-deadline-while-app-review-is-pending-and-mau-counting-for-bundle-only-apps/351/2 and https://forum.anna.partners/t/turn-your-ai-agents-apps-into-recurring-monthly-grants-join-the-anna-ai-os-founding-builder-program-up-to-80k-month-pool/205/2 |

## B. Owner-only administration: one short secure session, no bulk blind submits
| Target | Reconciled state | Safe next step |
|---|---|---|
| CheckFlow | **CONFLICT:** [Oct 29 account record](../handoffs/2026-10-29_0744_muse_submissions-review.md) states **REGISTERED, live affiliate link** and password entered; Oct 30 handoff says account NOT confirmed after password step. | Verify login/affiliate dashboard and receipt with Sneaks present; do **not** reset/re-register by default. Passwords stay in secure-entry cards; never in COMS. |
| n8n | **RECORDED-COMS:** affiliate application SUBMITTED via PartnerStack Oct 29; optional PartnerStack account/payout setup incomplete. Oct 30 says form blocked. | Verify application status/email; ask n8n-use truth; make separate owner decision on PartnerStack account/payout, avoiding another application. |
| Remaining 43 needs-Sneaks | **UNKNOWN:** `~/workspace/apply-all/master-list.md` isn't attached to COMS; totals 6+43+26+20=95 arithmetically, but target-level states and overlaps are unverified. | Muse publish **redacted** table per target: program, application URL, deadline+timezone, eligibility, status/receipt, precise missing owner input, obligations, amount/cost, and **next permissible action**. Do not run undifferentiated password or application bulk. |
| Coinbase Wallet referral | **VERIFIED-PRIMARY:** 25% of **net fees** on eligible in-app native same-chain swaps, not trading volume or all transfers; subject to region/KYC, anti-self-referral, and specific wallet attribution. **UNKNOWN** personal in-app eligibility. | Sneaks checks in app only; **no agent wallet interaction** and no promise of income. https://wallet.coinbase.com/official-referral-terms.html |

## C. Safety and technical work — independent of grant queue
| Target | State | Next step / guard |
|---|---|---|
| **Kalshi approval chain** ⚠️ HIGH-RISK | **CONFLICT:** Oct 30 handoff calls Vercel token+new Ed25519 key step 1 pending, while [Oct 29 chain-complete handoff](../handoffs/2026-10-29_1825_claude-code_kalshi-chain-complete.md) records token configured, signing key stored, coms-pwa PR #6 merged/deployed; approval pubkey pinned **only on an unmerged branch** and independent G3c recheck outstanding. [Autonomy confirmation](../handoffs/2026-10-29_1857_muse_kalshi-autonomy-confirmed.md) is scope approval, **not evidence that code was reviewed or enabled**. | **STOP before rotating keys or granting tokens again.** Reconcile cloud secret names, deployed signer, pinned public key, branch and recheck status *without revealing secrets*. Diagnose POST read-timeouts **Phase 1 only** (5 repetitions, curl vs Python); only build daemon if verified feasible. Keep prod read-only; no orders as tests. |
| gmgn-cli 1.6.7 → 1.7.1 | **VERIFIED-PRIMARY:** 1.7.1 exists (publisher package lock); **UNKNOWN:** safe behavior changes, specific security impact and local installed package integrity. | **PARK version change:** stay pinned 1.6.7 pending upstream diff, lock/integrity review and read-only regression tests. No trading-capability upgrade by default. |
| Clawlancer | **CONFLICT:** [Oct 29 registration record](../handoffs/2026-10-29_0744_muse_submissions-review.md) says registered and credential stored; Oct 30 calls registration POST UNKNOWN. Owner earlier chose **dormant**. | Inspect existing account status/key inventory **without printing it** before any network retry. No wallet connect, heartbeat or auto-claim; no blind POST (key one-time display). **PARK.** |
| ClawGig | **RECORDED-COMS:** site marked DEPLOYMENT_DISABLED, no user-side fault demonstrated. | One read-only site-health check later; no repeated registrations until site works. **PARK.** |

## D. Park / kill / separate operational backlog
- **KILL from applications:** BasedAgents — COMS-flagged scam pattern; no funded-wallet contact. This is a safety disposition from agent assessment, not independent proof of fraud.
- **PARK:** Google kvmCTF (discovery only; entry requires a substantive VM-escape exploit, not a normal form); HackerOne x IBM Granite (select researchers/invite-only, no cold asks); Clawlancer active bounty claims; generic speculative affiliate spam.
- **HackerOne profile / Veriff:** owner-controlled optional long-term setup, **not** Granite program enrollment. Treat ID verification as separate, sensitive consent.
- **Separate backlog:** TV ADB authorization, FOMO login, VPN/OpenVPN credential provisioning, MusePad Zero-Edge Launch, mogz board cleanup, OpenCode Atlas catalog, unrelated REAL OR BS/ATH/other project tasks. Use project-specific files/claims; don't bury in the 95-application spreadsheet.
- **Open deliverables Muse owes the crew:** full 43-target table, Digital Promise eligibility/draft, Solana Foundation grant budget and double-funding disclosure, Cardano *if awarded* hardware/snapshot/payment plan, MLH `Tx Autopsy` concept. Evidence: [Claude review](../handoffs/2026-10-29_0935_claude_muse-brief-reply.md).

## Non-negotiable procedural safeguards
1. **One target = one row + one recorded outcome.** Submissions are not complete without receipt ID, timestamp, or documented form confirmation. Distinguish `DRAFT`, `SUBMITTED/UNCONFIRMED`, `SUBMITTED/CONFIRMED`, `REGISTERED`, `AWAITING REVIEW`, `BLOCKED`, `PARKED`, `KILLED`.
2. **Do not repeat POST on timeout** where an account, signup, bounty, or trade might have been created: reconcile by read-only inspection first. For one-time-API-key services, ask owner before a new attempt.
3. **No manufactured identities, skills, legal names, KYC fields, claims, program eligibility, metrics, referral earnings or form receipts.**
4. **No live trading or funding** and no new signing-key/token rotation merely to resolve a stale to-do.
5. **Review before submission:** any proposal with legal identity, delivery obligation, financial quotation, external public linkage, or wallet/KYC consequences requires Sneaks's explicit per-target approval.
6. For hackathons, **follow entry/submission rules and prior-work disclosure**; separately track registration and project submission.

## Evidence still missing
- Actual `apply-all/master-list.md` and six apply-ready target names; verified per-target coverage of the 95.
- Cardano **submitted** PDF bytes, page count, signed-off ADA quotation, form receipts, latest authoritative entry, any requested correction.
- Flip owner registration confirmation and precise user identity for prize verification.
- MLH registration receipt and any Devpost registration.
- CheckFlow dashboard proof; PartnerStack n8n status.
- Kalshi G3c review/merge/VM deployed SHA and read-only client/proxy timing records.
- Clawlancer account status before attempting re-registration.
- Anna app selected, actual account status and qualified-MAU plan.
- gmgn 1.7.1 changelog/diff + test evidence.

## Owner price preference — 2026-10-30 12:27 ET
- **VERIFIED (direct in-chat preference):** After being asked whether to keep ₳30,000, Sneaks answered: “I don't even know what's that means but I picked it so yeah.” He was informed that **₳30,000 is 30,000 ADA**, *not $30,000*, and is a proposed payment **if accepted** for a research deliverable, not an amount he must pay.
- **DECISION SCOPE:** Treat **₳30,000 as the current preferred quotation only**. Because Sneaks said he did not understand the terms, do **not** interpret this as informed consent to a binding contract, re-submission, correction, delivery obligation, or wallet action; these require explicit separate approval after explanation.
- **NEXT:** Muse reconciles the already-reported Oct 29 ₳30,000 submission(s) with the later draft ₳12,500 placeholder, obtains evidence and stops duplicate submissions. See [price handoff](../handoffs/2026-10-30_1227_chatgpt_cardano-price.md).

## Four-target pursuit preference — 2026-10-30 12:30 ET
- **VERIFIED (user words):** After the Cardano price discussion, Sneaks asked, "Can we go for all four of them" and followed with, "Oreo. You got this." He had previously requested one item at a time.
- **INFERENCE / provisional referent:** Treat "all four" as the four current deadline-relevant opportunities: (1) Cardano Intersect RFP, (2) Flip the Switch Hackathon, (3) MLH Solana Hackathon, and (4) Anna AI Founding Builder. If Sneaks names a different four, revise this grouping before action.
- **INTENT:** Pursue prep/reconciliation for all four, sequential owner interactions; do not treat the brief encouragement as a legal identity assertion, specific form approval, registration confirmation, contract acceptance, or authorization to submit on his behalf.
- **Cardano — CONFLICT:** Oct 29 COMS says two form submissions at ₳30,000; Oct 30 says draft at ₳12,500. Obtain receipts/submitted PDF and confirm <=2 pages before proposing any correction. No duplicate application. Deadline Nov 4. [Official RFP](https://forum.cardano.org/t/public-rfp-research-on-cardanos-utxocostperbyte-parameter/157406).
- **Flip — OWNER ACTION:** Official page says registration open now; registration/entry by bot prohibited. [Owner registration page](https://www.wemakedevs.org/hackathons/switch); starts Nov 4 00:01 IST (Nov 3 13:31 New York), closes Nov 7 23:59 IST. No agent signup or submission. Select an AI COMS × Switch workflow for preparatory ideation only. [Rules](https://www.wemakedevs.org/hackathons/switch/rules).
- **MLH Solana — CONFLICT:** Oct 29 says registered; Oct 30 says blocked. Verify email/account evidence first; don't register again. Event Nov 6–8. [MLH page](https://events.mlh.com/events/15200-solana-hackathon).
- **Anna — UNKNOWN owner account and feasibility:** Founding Builder qualification by Nov 30 requires app approved/published and >=200 qualified MAU in a single month; signup is not qualification. Identify an existing viable app and realistic user distribution before consuming effort. [Official clarification](https://forum.anna.partners/t/founding-builder-buidl-deadline-while-app-review-is-pending-and-mau-counting-for-bundle-only-apps/351/2).
- **NEXT owner-facing step, one at a time:** ask Sneaks to register himself for Flip using the official page, then confirm status; meanwhile Muse read-only reconciles Cardano and MLH. No credential handling or real submissions from this preference.
