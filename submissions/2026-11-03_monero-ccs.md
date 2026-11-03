# Monero CCS (Community Crowdfunding System) — submission packet

**Step-1 check (2026-11-03, official pages https://ccs.getmonero.org and https://ccs.getmonero.org/how-to-ccs/, both crawled 2026-11-03 12:20 UTC): PASS on program facts, BLOCKED on account — see Escalations. The GitLab account is Sneaks's step; nothing can be posted until he creates it.**
- Real and live: YES — CCS is Monero's standing community crowdfunding system; the how-to page documents the full submission route (GitLab fork → proposal file → Merge Request).
- Deadline: none for submitting — proposals are accepted on a rolling basis. The proposal itself must carry an expiration date (Sneaks fills, see Fields).
- Eligibility: open to anyone who registers an account on Monero's GitLab instance (repo.getmonero.org). Funding is not automatic: the community discusses the Merge Request and the Core Team merges it into "Funding Required" when there is loose consensus; the community then pledges XMR, escrowed by the Core Team. Funding is not guaranteed.
- AI-assisted entries: not mentioned in the CCS rules or the how-to page.
- CCS is a crowdfunding proposal system, not a grant program: the proposer names an amount in XMR and the community decides whether to fund it.

Program: Monero CCS — CCS Proposals repository (repo.getmonero.org) · URL: https://ccs.getmonero.org/how-to-ccs/ · Deadline: none (rolling); proposal expiration date required — [SNEAKS FILLS]
Payout if won: community-pledged XMR up to the requested amount [SNEAKS FILLS — total XMR], held in escrow by the Monero Core Team and disbursed per milestone after the proposer posts a written completion report in the proposal's GitLab comments. Funding is not guaranteed. · Cost to enter: $0
Eligibility: account on Monero's GitLab instance + a fork of the CCS Proposals repo → account creation is escalated to Sneaks (below); proposal must follow the official front-matter template exactly ("FORMATTING MUST BE PRESERVED, OR THE PROPOSAL WILL NOT WORK"), state what it is about, who completes it, why it matters to Monero, milestones + projected timeline, and an expiration date (all per https://ccs.getmonero.org/how-to-ccs/).
AI rules: not mentioned
Terms that matter: all work must be licensed permissively at all stages — a restrictive license terminates the proposal. A donation address must NEVER appear in the proposal. MR title must be the proposal's `title:` field exactly; MR description is the proposal body with the front matter excluded. Do NOT fill in `done:` under milestones; under `payouts:` only match the count to the milestones and leave the fields blank. The proposer is expected to actively build community support and post progress updates; edits after submission are publicly visible.
Identity used: John Tedesco · thatdudesneaks@gmail.com · Halfmoon Studio (agent-run studio, @gethalfmoon) · Monero GitLab author handle: [SNEAKS FILLS — proposals are public and reputation attaches to the handle]
Promises we make: (1) methodology document + collection pipeline, published openly for community comment, with a dry-run sample dataset; (2) first full census dataset + ecosystem map v1 with reproduction instructions; (3) second census edition, ecosystem map update, and final report with limitations and handover notes; written completion reports posted on the proposal per milestone; all data and code permissively licensed and public from the start. Calendar dates are [SNEAKS FILLS].

## Fields (exact text)
Proposal file name: [SNEAKS FILLS: handle]-monero-infrastructure-ecosystem-census.md (draft working name: halfmoon-monero-infrastructure-ecosystem-census.md — final name must include Sneaks's GitLab handle)

Proposal file contents (front matter + body, exactly as it will be committed):
---
layout: fr
title: Monero Public Infrastructure and Ecosystem Census: A Reproducible Open Dataset
author: [SNEAKS FILLS]
date: [SNEAKS FILLS — submission date, format e.g. January 31, 2019]
amount: [SNEAKS FILLS — total XMR]
milestones:
  - name: Milestone 1 - Methodology and collection pipeline
    funds: 30% ([SNEAKS FILLS] XMR)
    done:
    status: unfinished
  - name: Milestone 2 - First full census dataset
    funds: 40% ([SNEAKS FILLS] XMR)
    done:
    status: unfinished
  - name: Milestone 3 - Second census edition, ecosystem map, and final report
    funds: 30% ([SNEAKS FILLS] XMR)
    done:
    status: unfinished
payouts:
  - date:
    amount:
  - date:
    amount:
  - date:
    amount:
---

What this proposal is

Claims about Monero's decentralization and adoption are made constantly — node counts, geographic spread, mining pool concentration, how much maintained software and how many services actually exist around the protocol — but they are rarely backed by a dataset anyone can re-derive. This proposal funds a reproducible census of Monero's public infrastructure and ecosystem, published as versioned open datasets with the full collection methodology and code, so the numbers can be checked, challenged, and tracked over time.

Scope is deliberately limited to public, aggregate infrastructure data: reachable public nodes and their observable properties from public peer data, public remote-node availability, mining pool hashrate distribution as published by the pools themselves, and a structured map of maintained ecosystem software and services (wallets, libraries, explorers, payment tooling) with maintenance-status fields. This proposal does not attempt any measurement aimed at transaction privacy or deanonymization; it measures the public infrastructure layer only, and the methodology document will state that boundary explicitly.

Deliverables

- The census dataset (CSV/JSON), versioned, permissively licensed, in two editions so change over time is visible.
- The collection and derivation code (permissive license) with a documented methodology, so any figure can be reproduced by an independent party.
- A structured ecosystem map dataset (software/services, status, public links) with a changelog.
- A short final report summarizing findings and known limitations.

Who will complete it

Halfmoon Studio, an agent-run research studio led by John Tedesco, whose working lane is exactly this kind of deliverable: reproducible measurement and research artifacts, including on-chain actor-intelligence datasets, validator-ordering research, and crawler-built datasets. All collection code and data will be public from the start, and milestone completion reports will be posted here as required.

Why it is important for Monero and the community

- Checkable decentralization claims. Pool concentration and node distribution are security-relevant facts the community cites in every mining and infrastructure debate; a reproducible dataset ends arguments-by-assertion.
- A maintained ecosystem map. New contributors and users currently piece together the state of wallets, libraries, and services from scattered sources; a versioned map dataset is reusable by getmonero.org contributors, educators, and researchers.
- A repeatable method. Because the pipeline and methodology are open, anyone can run the next census edition — the lasting value is the method, not a single snapshot.

Milestones and projected timeline [SNEAKS FILLS: calendar dates at submission]

1. Methodology and collection pipeline — methodology document published for community comment; collection code public; dry-run sample dataset released for review.
2. First full census dataset — complete public-infrastructure census + ecosystem map v1, published with reproduction instructions.
3. Second census edition, ecosystem map update, and final report — repeat census after an interval so deltas are measurable; final report with limitations and handover notes so the community can continue the series.

Expiration date

[SNEAKS FILLS — CCS requires one; if the proposal is not fully funded by this date, pledged funds release per CCS rules.]

Merge Request title: Monero Public Infrastructure and Ecosystem Census: A Reproducible Open Dataset
Merge Request description: the proposal body above, front matter excluded (exactly as it appears under the front matter).

## Attachments
none

## Escalations
- **GitLab account creation (BLOCKER):** CCS submission requires an account on Monero's GitLab instance, repo.getmonero.org. Creating a new account in Sneaks's name/identity stays with Sneaks (Stays-with-Sneaks list) — he creates the account and forks the CCS Proposals repo; nothing can be posted before that.
- Proposal topic approval: the census topic is Muse's in-lane suggestion — Sneaks approves or replaces it.
- Author handle: the public GitLab handle the proposal runs under is Sneaks's choice ([SNEAKS FILLS]); reputation attaches to it.
- Amount: total XMR and the per-milestone split (30/40/30 in the draft) are Sneaks's numbers ([SNEAKS FILLS]); there is no published range.
- Timeline and expiration date: all calendar dates are Sneaks's ([SNEAKS FILLS]).
- Community legwork commitment: CCS expects the proposer to drum up support, answer discussion on the MR, post progress updates, and file written milestone completion reports — Sneaks confirms he accepts that ongoing public commitment before anything is posted.
- Payout mechanics: milestone funds are XMR disbursed from Core Team escrow; receiving/holding XMR is a wallet matter that stays with Sneaks.

---
## Review — claude-code · 2026-11-03 07:55 ET
**ESCALATE TO SNEAKS:** GitLab account + handle, the topic, the XMR amount and split, the dates and expiration, the ongoing public legwork, and the XMR wallet (stays with him).
**CHANGES (before re-review):**
1. ⚠️ "reachable public nodes and their observable properties from public peer data": a node-IP census is a sore point in the Monero community (it's what spy-node operators do). State plainly: no IP addresses published, aggregate counts only (country/ASN level), no long-running peer monitoring. Without that it will likely be rejected and could hurt his handle's reputation.
2. Disclose in "Who will complete it" that the work is done by automated agents under his direction (the ZCG packet does this; CCS should too).
- The privacy-boundary paragraph, the permissive license and no donation address in the proposal are all correct.
