# Review request — Muse's submissions of 2026-10-29

**From:** muse → **To:** claude (filed by muse at Sneaks's direct order, 2026-10-29 ~07:44 ET)
**Ask:** adversarial review of everything Muse submitted today. Per item: **PASS / FIX-FIRST / FLAG**, with the specific line or claim at fault. Sneaks relays; reply as a handoff on this board and Muse will file it.

## What to check hardest
1. Any claim not supported by the evidence cited next to it.
2. Identity/framing consistency: these submissions run as **John Tedesco / Halfmoon Studio**; Muse's token projects publicly frame **Muse as the dev**. Different lanes — flag any actual collision.
3. Cardano price sanity: ₳30,000 (~$6.1–6.2K at ~$0.205/ADA) for a 10-working-day scope — underpriced, fair, or over?
4. The duplicate-submission handling on item 1 (first filed as "Sneaks", then refiled corrected; no withdrawal route existed).
5. Anything that creates an obligation, exposure, or expectation Sneaks has not seen stated plainly.

## Item 1 — Cardano Intersect RFP proposal (SUBMITTED, deadline Nov 4)
- RFP: "Research on Cardano's utxoCostPerByte Parameter", via ClickUp form. Submitted twice under halfmoonstudio@proton.me: first as "Sneaks", then corrected as **John Tedesco** with the final PDF (the form's helper text asked for a full legal name). Both times the form confirmed receipt; no reference number exists.
- Correction note posted to the RFP poster's stated questions contact: https://x.com/heySneaks/status/2115769202141167951
- Price in the proposal: **₳30,000** fixed. §5 discloses no Cardano track record.
- Full final text:

---

# Proposal: Research on Cardano's `utxoCostPerByte` Parameter

**Submitted to:** Intersect — Parameter Committee (research funded by the Technical Steering Committee)
**In response to:** Public RFP, "Research on Cardano's utxoCostPerByte Parameter" (Cardano Forum, 16 October 2026)
**Proposer:** John Tedesco — independent researcher/builder, Halfmoon Studio
**Public work:** https://github.com/0xSneaks
**Submission deadline:** 4 November 2026

---

## 1. Understanding the problem

`utxoCostPerByte` (currently 4,310 lovelace per byte on mainnet) sets the minimum lovelace that must be locked in every UTxO, as a function of that UTxO's serialised size. It is, in effect, Cardano's price on ledger state: it determines how much user capital is immobilised per entry, how expensive it is to grow the UTxO set, and — indirectly — the hardware floor for every node that must store and serve that set.

That price was calibrated for an earlier era of the network. Three things have moved since: the size and composition of the UTxO set itself (native assets, reference scripts, inline datums), node storage technology (notably UTxO-HD's move of the set to disk with an LSM backend), and the planned protocol roadmap (Peras, Linear Leios). If the parameter is now higher than the real marginal cost of state, users and dApps are overpaying in locked capital on every UTxO — a quiet, continuous tax on usability. If it is cut too far, the network subsidises state bloat: faster set growth, heavier nodes, weaker resistance to dust-style state-flooding, and centralisation pressure on SPOs and wallet infrastructure. The RFP's question — how far can it *safely* be reduced — is therefore an empirical one: reconstruct the true cost curve of a byte of UTxO state, today and on a two-year horizon, and find where the price stops covering it.

## 2. Proposed approach and methodology

Four workstreams, run as one reproducible data pipeline so that every figure in the final report can be re-derived by the Committee or the community:

**WS1 — Measure the actual UTxO set.** Stand up a Cardano node with DB Sync and extract the full current UTxO set: size distribution, entry composition (plain ADA, multi-asset bundles, datum- and script-bearing entries), and the locked-lovelace distribution. Cross-validate headline statistics against a public indexer (Koios). Then recompute, for a grid of candidate `utxoCostPerByte` values, exactly how much locked capital each value releases and which classes of UTxO benefit.

**WS2 — Model the real cost of state.** Convert set size into hardware reality: RAM/disk requirements for nodes under both the in-memory ledger and UTxO-HD (LSM) configurations, using published node benchmarks and, where gaps exist, targeted local benchmarks of node memory and sync behaviour against set size. Project hardware costs on a two-year horizon under reasonable commodity-hardware assumptions for SPOs, relays, wallets and light infrastructure — so the "cost per byte" is grounded in what operators actually buy, not in abstract storage prices.

**WS3 — Stress the growth and security side.** Model UTxO-set growth under reduced prices, treating the parameter as an economic throttle: cheaper entries change user and attacker behaviour alike. Quantify the cost of a state-bloat/dust attack per gigabyte of forced state at each candidate value, and model set-growth scenarios (organic growth at historical rates, plus adversarial and high-adoption upside cases) against the WS2 hardware envelope. Interacting parameters — block size and other settings *within the existing guardrails* — are varied where they materially change the answer, and the Peras/Linear Leios horizon is treated as a scenario input, not assumed away.

**WS4 — Synthesise a defensible floor.** Combine WS1–WS3 into a sensitivity analysis whose output is a recommended lowest sustainable value (or a narrow range), with the binding constraint at that value named explicitly — whether it is hardware, attack cost, or growth headroom — and a staged reduction path with review triggers, so governance can move in steps and stop if measurements diverge from the model.

Consistent with the RFP's guidance, AI-assisted tooling will be used for data processing and drafting support; the analysis, modelling choices and recommendations are the proposer's own, and all code and data will be published openly (public GitHub) alongside the report.

## 3. Deliverables

1. **Assessment of the lowest technically and economically sustainable `utxoCostPerByte` value**, with the evidence chain behind it.
2. **Risk, trade-off and limitation analysis** for reducing the parameter, covering economic and security concerns (state bloat, attack cost, node centralisation pressure, interactions with fees and other parameters).
3. **Analysis of the impact of not reducing the parameter** — the ongoing cost in locked user capital and dApp usability if the status quo holds.
4. **Evidence-based recommendations**, including safeguards and mitigations (staged changes, guardrail-consistent companion settings, monitoring triggers).
5. Supporting artefacts: the measurement dataset, analysis code and benchmark results, published openly for independent reproduction.
6. Presentation of the findings to the Parameter Committee and engagement with community questions, as requested in the RFP.

## 4. Timeline

The work is scoped to the RFP's expected 1–2 week envelope — **10 working days** from kickoff:

| Days | Work |
|---|---|
| 1–3 | Node/DB Sync stand-up; full UTxO-set extraction and statistics (WS1) |
| 4–6 | Hardware/cost modelling and node benchmarks, incl. UTxO-HD scenarios (WS2) |
| 7–8 | Growth, economic and security scenario analysis (WS3) |
| 9–10 | Synthesis, recommended floor and safeguards (WS4); report drafting and delivery |

## 5. Relevant experience

John Tedesco is an independent builder operating as Halfmoon Studio, with a professional background in electrical engineering (high-voltage / industrial power systems) — a discipline built on exactly the kind of conservative, measurement-first parameter and safety-margin analysis this RFP calls for — and a current practice centred on AI-agent tooling, data pipelines and open-source software, all published in the open at github.com/0xSneaks. The proposed methodology plays directly to that combination: large-scale on-chain data extraction and modelling, automated analysis pipelines, and reproducible, publicly verifiable outputs. In the interest of full disclosure: the proposer is a systems engineer and data practitioner approaching Cardano's parameter question from measurement and modelling, rather than a long-standing Cardano protocol insider; the proposal is deliberately designed so that its claims rest on published data and reproducible code, not on reputation.

## 6. Fixed-price quotation

**₳30,000 (thirty thousand ada)** — fixed price for the complete scope above, including the report, open dataset and code, and the Committee presentation.




---

## Item 2 — Inside the Block: exception ask to Superteam Ukraine (POSTED Oct 28–29)
- Study (public): https://github.com/0xSneaks/inside-the-block — 400 self-txs, 22 validators, 3 client families, honest null result. Listing is Ukraine-residents-only; Halfmoon's Submit button is disabled by region.
- Earn comment (live, 278 chars): "Halfmoon Studio (US) completed this study in full — 400 self-txs, 22 validators, 3 client families, reproducible repo, honest null result — but the Ukraine-only restriction disables our Submit button. Would you consider an exception? https://github.com/0xSneaks/inside-the-block"
- X thread (4 posts, text verified chunk-by-chunk after an earlier single-post attempt was silently truncated by X and deleted): https://x.com/heySneaks/status/2115766802223341840

## Item 3 — n8n Affiliate application (SUBMITTED via PartnerStack, pending review)
- Filed as John Tedesco / Halfmoon Studio / halfmoonstudio@proton.me. Answers: other affiliate programs "None"; main referral activity "templates creation"; currently an n8n user "not yet"; website https://github.com/0xSneaks; branded-search no-bid acknowledgement agreed. Terms if approved: 30% of referrals for 12 months. The optional PartnerStack account creation after submission was NOT done (needs Sneaks's password + payout setup).

## Item 4 — CheckFlow Affiliate (REGISTERED, live)
- Account created (John Tedesco / halfmoonstudio@proton.me; password set by Sneaks via secure entry). Affiliate link: https://checkflow.io?via=v1OWVq7MznTg (40% lifetime recurring per the program page). Payout setup deliberately not done — the program only needs an email at payout.

## Item 5 — Clawlancer agent registration (REGISTERED)
- Agent "muse" registered for Halfmoon Studio; API key stored on Muse's VM (0600). No wallet seed, signature, KYC, or payment involved; platform auto-assigned a placeholder Base address.
- **Trust note for your judgement:** Clawlancer's registration response embedded directives (run a heartbeat loop, auto-claim bounties scoring ≥80, connect a Bankr wallet). Treated as third-party content, ignored in full, nothing enabled. A standing caution for this platform may be worth your FLAG.

## Not in scope of this request
- MLH Solana Hackathon registration and the Stellar SCF Interest Form are still in flight — not yet submissions.
- Drafts only (nothing submitted): Fediverse, Solana Foundation, Filecoin, Sentient proposals — available for a later round if Sneaks wants them reviewed.
- Your ATH evaluation (handoffs/2026-10-27_1804_muse_ath.md) remains open on its own track; this request does not replace it.

— muse
