# Snorkel AI Open Benchmarks Grants — submission packet

**Step-1 check (2026-11-03, official page https://benchmarks.snorkel.ai, crawled 2026-11-03 12:20 UTC): PASS, with escalations below.**
- Real and live: YES — page headline "$30M Open Benchmarks Grants for Frontier AI", banner "Rolling acceptances open"; $30M commitment (expanded 10x, announced Oct 7, 2026) and the "Propose a benchmark" route are on the live page.
- Deadline: none — rolling acceptances, no closing date published.
- Eligibility: page invites "researchers, domain experts, and open-source teams"; the Propose-a-benchmark route is for "teams building open benchmarks and new measurement methods." No region, age, entity-type, or KYC requirement is stated on the page.
- AI-assisted entries: not mentioned on the page (no rule for or against AI-assisted proposals).

Program: Snorkel AI — Open Benchmarks Grants, "Propose a benchmark" route · URL: https://benchmarks.snorkel.ai · Deadline: none (rolling acceptances)
Payout if won: in-kind only — expert data (labeling/generation/verification via Snorkel's expert network), research and engineering support (pipeline design, schema validation, QC), compute credits and hosting/distribution via program partners. No per-grant cash amount is published; $30M is the total program commitment. · Cost to enter: $0
Eligibility: open call for teams building open benchmarks and new measurement methods → Halfmoon Studio proposing an open benchmark fits the stated route (https://benchmarks.snorkel.ai, "Propose a benchmark" section). Focus areas on the page include Cybersecurity, Dynamic settings, Long-running work, and Open-ended outputs → the proposed benchmark is framed on those axes. No KYC, region, or entity requirement found on the official page.
AI rules: not mentioned
Terms that matter: funded benchmarks are open ("kept open so the field can inspect methods and reproduce findings"); the Fellowship route states "open release with academic attribution" — the proposal commits to open release of tasks, snapshots, ground-truth derivations, and graders. No IP assignment, exclusivity, or KYC terms are published on the program page; any terms presented at actual submission time must be re-read before submitting.
Identity used: John Tedesco · thatdudesneaks@gmail.com · Halfmoon Studio (agent-run studio, @gethalfmoon)
Promises we make: build and openly release (1) the ground-truth derivation pipeline + label-source documentation, (2) frozen task set v1 with snapshots and negative controls, (3) a deterministic grading harness + verifier suite, (4) baseline results across publicly available agent systems with full run artifacts, (5) a rolling live split + maintenance/versioning plan. No calendar dates are promised (relative milestones only).

## Fields (exact text)
Benchmark name: ChainScope-Bench — an open benchmark for verifiable on-chain actor intelligence by AI agents. [Benchmark idea is Muse's proposal — SNEAKS TO APPROVE, see Escalations]

What it measures: Whether an AI agent can turn raw public blockchain data into correct, checkable actor intelligence: given the public transaction history around a set of addresses, the agent must produce a structured report that (a) clusters addresses into actors with stated evidence, (b) traces fund-flow paths between actors, and (c) classifies actor behavior (e.g., exchange, bridge, mixer-adjacent, exploit-associated, ordinary user) with calibrated confidence. This is real analyst work today — incident response, compliance screening, and ecosystem research all depend on it — and there is no open benchmark for it, because ground truth is hard to build. Building that ground truth reproducibly is the contribution.

Why this fits the program's frontier axes: Cybersecurity / Safety — actor attribution is core to exploit response and fraud interdiction. Dynamic settings — the underlying chain data keeps moving; the benchmark ships frozen, verifiable snapshots for scoring plus a rolling live split, so it resists saturation and contamination by construction. Long-running work — full investigations span many tool calls and long horizons, not single-turn answers. Open-ended outputs — the deliverable is a structured intelligence report, graded on content, not a multiple-choice answer.

Task design: Each task presents a frozen snapshot: raw transactions, token transfers, and program/contract interactions for a defined address neighborhood and time window (data only — no pre-digested labels). The agent returns a machine-readable report: address clusters, fund-flow paths (as transaction-hash chains), behavior labels, and a confidence per claim. Task families: (1) cluster attribution, (2) fund-flow tracing from a known source (e.g., a publicly documented exploit or bridge flow), (3) behavior classification of unlabeled actors, (4) negative control — ordinary-user neighborhoods where the correct answer includes not over-claiming attribution.

Ground truth: Derived only from public, reproducible sources: published labeled-address datasets, exchange/protocol-published addresses, and post-mortem-documented flows from public incident reports. Every ground-truth label ships with its source and derivation, so the labels themselves are auditable and correctable. A held-out split uses labels derived after task release to detect contamination.

How outputs are graded: Clustering — pairwise precision/recall and F1 against ground-truth actor clusters. Fund-flow paths — fraction of claimed hops backed by real transaction hashes in the snapshot (hallucinated hops score zero and are penalized), plus path completeness against the reference flow. Classification — per-class accuracy with a calibration term (confident wrong answers cost more than hedged ones). Over-claiming control — false-attribution rate on negative-control tasks reported as a headline metric. All grading is scripted and open; no model judge is required for the core scores.

Stage: Concept, with adjacent tooling in the proposer's production lane: the studio already builds crawler datasets, on-chain actor-intelligence data, and validator-ordering research as reproducible artifacts. The benchmark itself (task set, ground-truth pipeline, grading harness) is what this grant would fund building and releasing openly. [Stage wording — SNEAKS TO CONFIRM, see Escalations]

Support requested: Expert data — review of ground-truth labels and task realism by experienced chain-analysis practitioners from Snorkel's expert network. Research & engineering support — grading-harness design review, schema validation, and QC on task construction. Compute & hosting — hosting for snapshots and the public leaderboard/submission endpoint; compute for baseline agent runs. Cash budget: [SNEAKS FILLS — no amounts are published by the program; leave blank or omit if in-kind only]

Deliverables and milestones (relative — no dates): 1. Ground-truth derivation pipeline + label-source documentation (open). 2. Frozen task set v1 with snapshots and negative controls (open). 3. Deterministic grading harness + verifier suite (open). 4. Baseline results across publicly available agent systems, published with full run artifacts. 5. Rolling live split + maintenance/versioning plan.

Open release commitment: Tasks, snapshots, ground-truth derivations, and graders released openly with attribution, per program norms.

Applicant: Halfmoon Studio — an agent-run research studio led by John Tedesco. Proven lane: reproducible measurement and research deliverables (on-chain actor-intelligence datasets, validator-ordering research, crawler datasets). Contact: John Tedesco · thatdudesneaks@gmail.com

## Attachments
none — no links to prior public work are cited; none were invented. [SNEAKS FILLS if he wants specific public-work links added — any addition goes back to review per skill]

## Escalations
- Benchmark idea approval: ChainScope-Bench is Muse's proposal, not Sneaks's — Sneaks approves or replaces it before review.
- Affiliation line: packet uses "Halfmoon Studio — an agent-run research studio led by John Tedesco" — Sneaks confirms this is the line to publish.
- Stage statement: the "concept with adjacent tooling in production use" wording is a claim about the studio — Sneaks confirms it is accurate before submission.
- Cash figure: any cash ask beyond in-kind support is Sneaks's number ([SNEAKS FILLS] in Fields); the program publishes no amounts.
- Anything the live submission form asks beyond these fields (e.g., contract, IP, or payout terms presented at submit time) returns to Sneaks per the Stays-with-Sneaks list.

---
## Review — claude-code · 2026-11-03 07:55 ET
**ESCALATE TO SNEAKS:** approve or replace the ChainScope-Bench idea, the affiliation line, the stage wording, and any cash ask. Any contract/IP terms shown at submit come back to him.
**CHANGES (small):**
1. "already builds … on-chain actor-intelligence datasets … as reproducible artifacts": link one public artifact or soften it to "has built". As written it's a claim with no link, and the packet says none are cited.
2. Ground truth: add one line saying labeled-address sources are used only where their license allows redistribution. Some public label sets forbid it.
3. Behavior labels like "exploit-associated / mixer-adjacent" on real addresses carry defamation risk. Add: "labels are evidence-linked and limited to publicly documented incidents".
- Otherwise clean: in-kind only, no dates promised, open release.
