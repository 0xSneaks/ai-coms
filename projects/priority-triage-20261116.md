# Priority rescue plan — Kalshi + Zen-trade + remaining blockers

**Date:** 2026-11-16 19:54 ET  
**Stage:** TRIAGE / REVIEW, not authorization for live trades  
**Owner:** Sneaks · **Coordinator:** Muse · **Scope:** planning only  
**Source:** AI COMS BOARD.md, projects/kalshi.md, projects/kalshi-trader.md, projects/hl-terminal-android.md, current GitHub README/config/PR search, handoffs linked below.

## Verified baseline and handoff

1. **Kalshi** — `0xSneaks/kalshi-trader` exists; README documents signed out-of-band Face ID approvals, caps, STOP and demo-first writes; main `config.json` currently has `live_enabled:true`, **not proof that live orders are currently enabled** (also needs `KALSHI_LIVE=1` and valid signed approval). P1 demo end-to-end is NOT RUN. On 2026-11-01 Claude judged shard-aware branch merge-safe with flaky demo-token fix, but autonomous `muse/autonomy-mode` **FIX-FIRST**, including self-approval, directionless edge, replayable preview and shipped-on issues. Private `~/workspace/kalshi-bot` unified bot (reported 31 tests, paper mode) remains unreviewed; its STOP/caps/demo gating was previously flagged by Claude. **Last relevant handoff:** `handoffs/2026-11-01_2105_claude_kalshi-trader.md`. **Next:** demo credentials and demo place/cancel proof; independent security review; no autonomy/live trading yet.
2. **Zen-trade** — current private `0xSneaks/Zen-trade` main includes PR #8 live HL trade backend/server signer; 2026-11-16 source review found hard-coded main-account public address, no explicit rate limiting in `api/chat-login.ts`, and README falsely claims no live trade endpoint. Public repo visibility NO-GO. Open PR #11 asserts main was broken by parallel merges (missing `parabolicSar`, `HL-PAIRS.txt`, `lightweight-charts` dependency); its author reports 175/175 tests and green build on PR, **not independently retested here**; production reportedly serves pre-merge bundle. Physical Android, live trades and access protections UNKNOWN. **Last relevant handoff:** `handoffs/2026-11-16_1925_chatgpt_zentrade-prepublic-security-review.md`. **Next:** secure prod, independently test PR #11, repair main and verify deploy before any feature expansion.

## Ordered execution checklist

### P0 — safety / no live exposure
- [ ] **Zen host security audit (Muse + independent Claude/Codex; owner approves operational changes):** check actual Vercel Deployment Protection and authentication, live `/api/trade` exposure, login throttling, signing-key environment and whether any client-initiated call can trade without an explicit user approval. Restrict unsafe endpoints or remove trading env capability pending review. Inspect all refs/history for leaks; if a genuine exposure is found, owner rotates affected credentials. Do not paste secrets into COMS.
- [ ] **Kalshi live gate audit (Muse + Claude/Codex):** establish current runtime `KALSHI_LIVE`, `STOP`, signer pin, matching SHA and execution route. Preserve hard caps (≤$25/order, ≤3 open, ≤$25/day), signed per-order confirmation, and STOP semantics. Do not activate `muse/autonomy-mode`. A `live_enabled:true` file is a risk condition to inspect, not authority to execute.

### P1 — unlock a verifiable working product
- [ ] **Zen build-repair PR #11 (Codex, independent Claude):** compare claimed three merge-stomp fixes with current main, run clean `npm ci`, `npx tsc --noEmit`, `npm test`, `npm run build`; review Solana wallet RPC inputs, quote trust, rate control and any added data exposure. Record exact SHAs and evidence. Merge/deploy only on owner YES after pass; prove deployed bundle matches approved commit.
- [ ] **Kalshi choose one execution path (Muse):** canonical gated CLI for eventual orders; keep `kalshi-bot` as research/signal engine only until source can be pushed privately and reviewed. Avoid connecting a second executor with looser controls.
- [ ] **Kalshi demo account/key (Sneaks — secure dashboard only):** create separate demo API identity, supply credential path privately to authorized VM/operator, not in chat/repo. Run read-only demo proof → demo preview → actual demo create/cancel → reconciliation + audit logs + STOP/caps/duplicate/replay fault tests. Official docs: https://docs.kalshi.com/getting_started/api_keys.
- [ ] **Kalshi branch fixes (Muse → Codex → Claude):** fix demo argparse token flake (`token_hex` or safe argument syntax); recheck shard-aware transfer bound to preview hash; verify G3c pinned pubkey in executable HEAD. Keep autonomy OFF. If autonomy is proposed later, require owner-signed, time-boxed, one-use budget grant plus directional positive edge and a burned preview, with zero ability to self-authorize. No live activation from this planning task.
- [ ] **Zen core data (Codex + Muse):** connect actual Hyperliquid selected chart, verified positions/open orders/fills, mark and freshness, execution overlays, WS gap/backfill and ledger reconciliation. Surface UNKNOWN/STALE/UNCONNECTED instead of dummy fills or guessed P&L; chart-first mobile UI.
- [ ] **Zen COMS/Grok intelligence (Muse + Grok Bot):** prove authenticated owner-approved COMS send/read, MOONBOYHL data interface and verifiable Grok bot trade events. Distinguish bot intent from real fills. Retain quiet alerts. Do NOT add autonomous orders.
- [ ] **Zen release acceptance (Codex independent + Claude final + owner):** server access/abuse tests, authenticated owner-only experience, no keys/client signer, manual ticket confirmation tests, 360px browser, actual Chrome PWA installation on Seeker/Android, real exchange read-only smoke, consent-gated live execution if separately ordered. Gate release on evidence.

### P2 — business pipeline / COMS operations
- [ ] **Cherry revenue audit (Muse):** finish existing issue #20 evidence gate using current worker/checkpoints, no fresh restart; distinguish declared revenue model from verified payments. Confirm developer badge eligibility and partner-only categories before any uploads.
- [ ] **Cherry money paths (Muse/Claude/Codex):** per app, prove payment receipt → settlement ledger → refund/payout/cash-out; SDK and policy gates first; no wagers/wallet moves without owner sign-off. Royale SDK update and Hold'em/PetalDeck app-specific blockers as separate lanes.
- [ ] **MOONBOYHL bot runtime + Grok proof (Muse):** verify actual hosting and fresh signals before Zen-trade treats it as live; no claimed bot track record without exchange receipts.
- [ ] **JustMogIt PR #5 (Codex + Claude):** finish exact-SHA amount-validation re-review; merge and production deploy are separate owner decisions.
- [ ] **AI COMS hygiene (Muse):** resolve issue #13 missing/bad handoff links and stale claims; archive superseded requests and remove false active labels. Preserve all currently claimed source paths.

### P3 — defer
- [ ] Park new trading automation, extra dashboards, DA CITY visual expansion, additional coin launches and speculative miner monetization until the P0/P1 evidence gates are green. No new cloud/model spend in this plan.

## Minimal owner decisions (batch, not many interruptions)
1. Kalshi demo account/API key (created in Kalshi demo, installed directly in secured VM); **not** permission for live trading.
2. Approve an independent Zen production security test and fixes, and any later merge/deploy separately.
3. Confirm that Kalshi remains manually approved per order (recommended) and autonomy stays OFF until separately reviewed.
4. Confirm project order: Zen safety + build green first, then Kalshi demo, then Zen functioning chart/COMS/Grok, then Cherry revenue.

## Definition of done
- Kalshi: independent review at exact SHA; isolated demo order and cancel proof; STOP/caps/replay tests; signed approval flow verified; production still OFF until separate owner order.
- Zen: protected deployment and API, clean main build, real chart/position/order source with freshness, genuine COMS read/send, bot-feed provenance, safe manual ticket tests, physical install evidence and independent final review.
- Other lanes: evidence-backed, owner-actionable handoffs, not status inflation.

**No trades, credentials, production toggles, deployments, merges, spending or source changes authorized by this document.**
