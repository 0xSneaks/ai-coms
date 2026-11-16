# Cherry.fun Revenue App Audit — evidence gate (2026-11-16)

**Owner request:** 12–24h active-wall-clock research with 4 bounded sub-agent routes and a separate adversarial audit.
**Coordinator target:** muse-orchestrator; **ChatGPT role:** evidence/synthesis/adversarial auditor only.
**Status:** PREPARED / NOT DISPATCHED IN MUSE RUNTIME. This GitHub issue is an instruction packet, not proof of an active worker, subagents, long-poll inbox, or a research clock.
**Safety:** READ-ONLY. No logins bypassed, no wallet signing, no purchases, no publishing, no production changes, no personal data scraping.

## Acceptance gate
- >=12 hours of actual active wall-clock research (record start, end and verified worker/runtime evidence; scheduled idle time alone DOES NOT count)
- 3/4 nonempty signed A1-A4 route contracts minimum
- ChatGPT/DeepSeek adversarial audit SIGNED
- >=5 Cherry apps with evidence of **realized revenue**, not merely an available payment flow; two independent sources per revenue claim, source URLs
- Developer-badge upload matrix populated (Direct; Requires review/partner; Blocked)
- Strict failure after 24h if incomplete, with route exhaustion log, `return_gate: fail`.

## Route contracts
A1 Marketplace Miner: `[{app_id,name,revenue_model,fee_split_pct,source_url}]`; inspect public Cherry listing, room, official app URL, screenshots when possible; no unauthorized scraping of user profiles or rooms.
A2 SDK & Portal Auditor: `{badge_tier_privileges,listing_test_criteria,revenue_share_rules,source_urls}`; use official current policy, not old COMS assumptions.
A3 On-chain Signal Hunter: `[{app_id,treasury_tx_count_30d,estimated_revenue_signal}]`; obtain recipient/treasury from verified sources, chain/tx links, explain attribution and net revenue assumptions; never count gross deposits, stake/pool balances, protocol transfers, or transfers between own wallets as profit.
A4 Competitive Pattern Analyst: Markdown `pattern | cherry.fun implementation | evidence`; fee-supported and realized separate.
ChatGPT lane after A1–A4: cross-check TWO independent evidence sources per claimed earning app; flag unverifiable claims; rank compliant uploads.

## Research baseline and important corrections (2026-11-16)
- Official Cherry mini-app directory: https://cherry.fun/learn/features/mini-apps/ (16 listed October 2026, named examples); static web endpoint https://chat.cherry.fun/market?kind=app yields little/no content without JS, so use authorized app/browser access, not synthetic listings.
- Official policy **v2026-11-10**: https://portal.cherry.fun/docs/mini-apps/policy . Verified is identity, NOT Partner. Trading existing tokens, NFTs and simple marketplaces may self-list; token launches, paid investment signals, copy trading, lending, staking, derivatives, predictions are PARTNER ONLY; real-money chance games require Verified + iGaming rules + country bans incl. US + no iOS. No evasion, and local laws/licenses are developer's responsibility.
- Official billing: https://portal.cherry.fun/docs/mini-apps/monetization . 10% of developer revenue, first $100 of monthly volume free, **monthly** USDC invoice; app-side revenue declaration & reference key required. Earlier Nov 16 COMS Blue-1 handoff described weekly invoices / optional 90:10 transaction split; treat this as stale until reconciled to current public official docs.
- Official listing: https://portal.cherry.fun/docs/mini-apps/listing . Self-serve once origin, framing, token handshake, backend auth checks, metadata, legal pages and live automated test pass. Badge never bypasses tests.
- Official Cherry app economics examples: SOL Reclaim collects a cut from reclaimed rent; Earn app states 0.5% deposit fee: https://cherry.fun/learn/features/mini-apps/ . SOL Miner, Plinko and Tramplin move/stake value but **gross stake/TVL is not proven revenue**. Cherry's homepage $100/mo paid group example is explicitly illustrative NOT an actual paying room.
- Official paid group share is 70/30 as of September 2026: https://cherry.fun/learn/features/paid-communities-and-channels/ ; this is a NATIVE group product, not automatically a third-party mini-app upload.
- Existing COMS Cherry study: handoffs/2026-11-16_0655_blue-1_cherry-income-study.md; SDK/payment audit: handoffs/2026-11-16_1345_blue-15_cherry-update-pass-audit.md. These report local-owned Royale fee rails / PetalDeck planned Creator-mode 95/5, but **no verified external paid customers or realized revenue**.
- The public site currently advertises SOL Reclaim, BananaZone, Earn, Swap, Tramplin, Terminal, eSIM and others https://cherry.fun/ ; app-room member counts and reviews **do not equal sales**.

## Work protocol
- Muse checks existing claims/requests before claiming lead; do not impersonate an actual subagent.
- To activate the user's exact long-run contract, Muse must execute `board dispatch run` on its own runtime and publish command/worker ID. GitHub issue/this packet alone is **not** execution.
- Log actual runtime start; checkpoint evidence in a shared location every 2h: `{elapsed_hours,routes_completed,evidence_count}` plus timestamp/source and worker identity.
- If a route stalls >90min reassign to ChatGPT lane; don't fabricate subagent receipts. Use blocking comms, not busy polling.
- At 12h gate earliest, return only if all conditions pass. At 24h stop with hard FAIL report and exhaustive log.
- Do not call direct badges proof of partner status. Do not recommend real-money US-facing slots/crash or public Pump launch as badge-direct.

## Upload fit candidate patterns to evaluate
1. Wallet dust reclaim with disclosed service fee; ordinary utility, possible direct if instructions within tier; competing with Cherry-owned SOL Reclaim.
2. Original paid game items/credits in skill-only games with NO redemption/wager path; sales via Cherry wallet, self-serve, tests, repeat-play loop.
3. AI portfolio/transaction analysis sold as **software utility** without advice/signals or managed trades; direct if policy-compliant, otherwise ask Cherry.
4. Existing-token swap or shopping marketplace with transparent commission, no launch/copy-trading/investment recommendation.
5. Native paid room/channel as an **adjacent product** 70% creator share, not counted as a badge mini-app upload.
6. Chance games with real money: iGaming restrictions, NOT direct U.S. audience; partner/license/legal review before any production decision.

## End format
Six user-requested headings followed by `{"return_gate":"pass|fail","elapsed_hours":N,"subagents_completed":N}`, plus the actual COMS handoff signed before closeout.

## 2026-11-16 13:46 ET coordination sign-off
ChatGPT relay COMPLETED document setup and filed [dispatch issue #20](https://github.com/0xSneaks/ai-coms/issues/20); [handoff](../handoffs/2026-11-16_1346_chatgpt_cherry-revenue-audit-dispatch.md). A 2h recurring checkpoint automation is enabled (first 15:45 ET), but **Muse's actual long-running worker is NOT running/ACKed** in verified evidence. A1–A4 receipts = 0; independently verified fee revenue apps = 0. The 12h active-runtime gate has NOT started. Await Muse to ACK, execute its own CLI `board dispatch run`, and post worker ID.

## 2026-11-16 — Owner follow-up: logged-in 12-hour platform reconnaissance (additive, not restart)

**INTENT (Sneaks by voice):** Muse logs into Cherry.fun using an authorized account/session, inspects the *full application and developer submission/pricing UI*, and spawns a genuine **12-hour background subagent**. Focus on what's missing from the marketplace, newly appearing apps, quick high-quality uploads using his developer badge, prices/price configuration, revenue mechanisms and verified actual earnings. **Preserve existing A1/A4 work and issue #20**; this changes emphasis, not the original hard evidence gate. A green light to research/prepare is **not** proof of Partner tier or approval to publish, spend or transact.

**Assigned Muse deliverables:** (1) timestamped logged-in marketplace/competitor/gap map; (2) pricing setup and exact authoring/upload cookbook with fee/unit economics; (3) DIRECT/REVIEW/PARTNER/BLOCKED badge matrix; (4) ranked 3–5 quick-ship options with repo reuse and quality/review gates; (5) active 12h worker ID/start, 2h checkpoints and evidence; (6) independently verified realized-revenue table, or explicitly FAIL if proofs missing. Limit page captures to authorized content, never credentials or user private data.

**STATUS:** ChatGPT recorded the owner order in [follow-up handoff](../handoffs/2026-11-16_chatgpt_cherry-revenue-audit-owner-followup.md). **Muse worker ACK/ID/start and logged-in reconnaissance are UNKNOWN** until Muse posts proof; no claim that research is running. A1/A4 handoff entries are present on BOARD, but do not yet establish the five independently verified realized-revenue rows.

## 2026-11-16 — Owner addon: customer cash-in/out foundation and Seeker Miner

**INTENT:** Include an additional design/recon workstream in Muse's existing 12-hour investigation: verify end-to-end customer deposit/purchase, balances, withdrawals/redemptions, refunds, payout/reconciliation and failure handling across current Cherry slots/Royale, Hold'em, PetalDeck, Pachinko and other owned builds. Investigate whether a Seeker Miner product could reuse a trustworthy shared payment/settlement core. Require verified repo SHA, working-vs-scaffolded flags, exact fee/price configuration, customer journey, permissions/tier and rigorous test/review gates.

**AUTHORITATIVE HANDOFF:** [2026-11-16 ChatGPT cash-in/out owner follow-up](../handoffs/2026-11-16_chatgpt_cherry-cash-in-out-followup.md). Keep prior logged-in app-recon task and issue #20; do not start over.

**UNKNOWN:** Whether cash-out is supported/allowed, real-money gaming authorization, exact working payment/wallet infrastructure, Seeker Miner mechanics and any live revenue. Owner's statement of full developer green light does not establish Partner/iGaming/regulatory approval. **No live payments, payouts, wallets, wagers, deployments or spend authorized.** Muse must ACK and produce actual worker/run evidence, not just planning notes.
