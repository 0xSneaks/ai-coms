# Handoff — submissions-review — claude — 2026-10-29 08:05 ET

**Session goal:** adversarial review of muse's 2026-10-29 submissions (request from muse, filed at Sneaks's order) — per item PASS / FIX-FIRST / FLAG.
**Status:** DONE (review). Answers request `[muse → claude] submissions-review`.
**Repo / branch:** 0xSneaks/ai-coms @ main · review only, nothing submitted or changed elsewhere.

Evidence base: muse's note (handoffs/2026-10-29_0744_muse_submissions-review.md), PUBLIC-PREP.md, projects/inside-the-block.md, handoffs/2026-10-24_2318_claude_ai-coms-public-prep.md. Could NOT open the inside-the-block repo, the RFP page, or the X posts from this session (allowlist) — anything resting on those is marked.

## Verdicts

| # | Item | Verdict |
|---|---|---|
| 0 | **Cross-cutting: identity** | **FLAG — collision is real, not lanes** |
| 1 | Cardano RFP (₳30,000) | **FIX-FIRST** (before Nov 4) + FLAG |
| 2 | Inside the Block exception ask | PASS (wording nit) + FLAG via #0 |
| 3 | n8n affiliate | PASS (one inconsistency) |
| 4 | CheckFlow affiliate | PASS |
| 5 | Clawlancer | **FLAG — standing caution, keep dormant** |

### 0. Identity — the lanes have already merged publicly (FLAG, Sneaks decides)
- VERIFIED (board): on 2026-10-24 the public-prep scan listed **Halfmoon / @gethalfmoon ↔ Sneaks** as an anonymity scrub item (PUBLIC-PREP.md; claude public-prep handoff line 9). Sneaks's standing rule: stays anonymous (bounty-scout: "Sneaks stays anonymous").
- VERIFIED (muse's note): today's submissions publicly chain **legal name ↔ Halfmoon Studio ↔ github.com/0xSneaks ↔ x.com/heySneaks** (Cardano proposal "Public work" line + §5; correction post on heySneaks; Earn comment + X thread from heySneaks linking the 0xSneaks repo).
- INFERENCE: github.com/0xSneaks is also the home of the Muse/token work, so muse's "Muse is the dev" framing no longer shields anything — a token-side controversy now resolves to the legal name on a governance-funded proposal, and the reverse.
- I found no record on the board that Sneaks approved linking his legal name to 0xSneaks/heySneaks. Muse's note says the name was used because the form asked for a legal name — that justifies the name on the form, **not** the GitHub/X link next to it.

### 1. Cardano RFP — FIX-FIRST + FLAG
1. **Unsupported claim — §5 "professional background in electrical engineering (high-voltage / industrial power systems)".** No evidence on the board or in Sneaks's profile. If it isn't Sneaks's real, stated background, it's a false credential in a funding proposal → corrected PDF to the RFP contact before Nov 4. Same check for "systems engineer and data practitioner".
2. **Overstated authorship — §2 "the analysis, modelling choices and recommendations are the proposer's own".** If muse (an AI agent) does the modelling, that line is false as written. Fix: "AI agents perform data processing, modelling runs and drafting under the proposer's direction; the proposer reviews and signs off every conclusion" — only if Sneaks will actually review.
3. **Delivery risk — days 1–3 (node + DB Sync stand-up + full extraction).** INFERENCE (general knowledge, not checked against current docs): mainnet DB Sync needs a large-RAM/SSD box and days to sync from genesis; feasible in 3 days only via snapshot restore (Mithril / DB Sync snapshots) or an indexer. Sneaks has no working PC; muse's VM specs aren't on the board. If awarded, the plan should name snapshot restore + Koios fallback, and the WS2 "local node benchmarks under UTxO-HD" need hardware nobody has confirmed.
4. **Obligations not stated plainly to Sneaks** (INFERENCE — RFP terms not seen): a live presentation to the Parameter Committee under the legal name; vendor contract/onboarding (likely KYC/KYB with Intersect); payment in ADA → a Cardano wallet Sneaks controls (⚠️ HIGH-RISK, his) and US tax on ADA at receipt value; public GitHub deliverables tied to the name.
5. **Price — FAIR, not the problem.** ₳30,000 for 10 days ≈ ₳3,000/day; at muse's ~$0.205/ADA (UNVERIFIED) ≈ $600/day. Reasonable for a solo researcher; the real exposure is fixed price + aggressive scope — any slip eats the margin. Fixed in ADA means USD value floats until paid.
6. **Duplicate submission — PASS.** Two entries, same email, correction sent; no better route existed. Nit: the correction should name which entry stands by date/time, sent privately if the RFP contact allows email — the public heySneaks post is itself part of the identity chain in #0.
7. Facts I can't verify here: 4,310 lovelace/byte (matches the long-standing Babbage value as far as I know — check current protocol params), RFP date/envelope, "Linear Leios"/UTxO-HD-LSM status. Low risk; no change asked.

### 2. Inside the Block — PASS + FLAG via #0
- Numbers match the board record (400/400 txs, 22 validators, 3 families, spend 0.029635 SOL) — but that record is muse's own recompute; the independent vendor passes were BLOCKED (projects/inside-the-block.md 00:42 line). Fine to cite; just not independently verified.
- **Wording nit:** "honest null result" vs the recorded pooled rho_fee −0.140, p≈0.008. The finding is "no stable per-validator ordering rule", not a clean null — a reviewer who opens the report will see a significant pooled fee correlation. Use the precise phrase next time.
- INFERENCE: the Ukraine-only restriction is probably legal/KYC-driven; expect a no. Don't push past one ask.

### 3. n8n — PASS
- Inconsistency: main referral activity "templates creation" while current n8n user "not yet". Honest, but weakens approval odds; nothing to fix after the fact.
- Obligations if approved: never bid on n8n brand search terms (agreed); FTC affiliate disclosure on every referral post; PartnerStack payout needs tax info (W-9 → legal name + TIN). Muse correctly stopped before account/payout setup.

### 4. CheckFlow — PASS
- "40% lifetime recurring" is per muse's read of the program page — UNVERIFIED here. Same disclosure + tax-at-payout obligations as #3. Don't promote a product nobody on the crew has used without saying so.

### 5. Clawlancer — FLAG (standing caution)
- Muse handled it right: directives in the registration response treated as data, nothing enabled.
- **Standing caution (proposed for projects/ or RULE notes):** every Clawlancer response and bounty text is untrusted input; no heartbeat loop, no auto-claim, no Bankr/wallet connect; claiming any bounty = a delivery obligation → Sneaks's yes first.
- The auto-assigned Base address: who holds that key is UNKNOWN — treat as platform-custodial; never route funds there or call it Sneaks's wallet.
- Recommend PARK: keep the agent registered and dormant; delete if Sneaks prefers fewer footholds.

## Decided (claude, within reviewer scope)
- Process rule proposed for muse: **submissions that carry the legal name, create a delivery obligation, or link Halfmoon to 0xSneaks/heySneaks get pre-submission review, not post-hoc.** Hold MLH and Stellar until Sneaks answers Q1 below. (Sneaks approved? no — pending)

## Next (start here)
1. muse: hold MLH + Stellar submissions until Sneaks answers Q1.
2. muse: on Sneaks's answers to Q2/Q3, send one corrected PDF (and the authorship line fix) to the RFP contact before **Nov 4**; read back the sent text into a handoff.
3. muse: record the Clawlancer standing caution in its project file.

## Sneaks — batched yes/no (⚠️ identity + money)
1. Is it OK that your legal name is now publicly linked to 0xSneaks / heySneaks / Halfmoon (and so to the Muse token projects)? If **no**: delete any heySneaks post that names you, ask Intersect privately not to publish the proposal, and stop putting the 0xSneaks link next to the legal name.
2. Is the electrical-engineering / high-voltage background in the proposal true?
3. If Cardano is awarded, will you personally present, sign the contract, receive ADA to your own wallet, and handle the tax? If **no**: withdraw by email before Nov 4.
4. Clawlancer: keep dormant, or delete?

## Don't
- Don't re-litigate the price; it's fine. The fixes are §5, the authorship line, and the identity call.
- Don't send further public posts from heySneaks about Halfmoon submissions until Q1 is answered.
