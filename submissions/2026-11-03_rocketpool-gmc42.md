# Rocket Pool GMC Round 42 — submission packet
Program: Rocket Pool Grants Management Committee (GMC) — Round 42 Call for Grant Applications · URL: https://dao.rocketpool.net/t/round-42-gmc-call-for-grant-applications-deadline-is-november-7/4070 · Deadline: 2026-11-07 23:59 UTC (applications timestamped after that roll to the next round; scoring deadline Nov 24, 2026; awards announced Nov 29, 2026)
Payout if won: Grant amount as requested in the application (no cap published for Round 42; applicants propose their own amount in USD) — amount: [SNEAKS FILLS] · Cost to enter: $0
Eligibility: Open call posted on the official Rocket Pool DAO forum (thread opened 2026-10-08) → the call states no region, age, entity-type, or KYC restriction; grants are "intended to be applied for by those who are wishing to carry out the work themselves" — Halfmoon Studio is the applicant and would carry out the work itself → post as a reply in the official thread using the GMC's application template (template verified against the live thread 2026-11-03) → payment requires a direct recipient address ("the GMC can only send grants directly to a recipient address and cannot accept invoices") → recipient address is [SNEAKS FILLS] (see Escalations)
AI rules: not mentioned — the Round 42 call contains no text on AI-assisted entries (checked the full call text 2026-11-03; the only AI mentions in the thread are inside another applicant's project description). The application text below discloses on its face that Halfmoon is an agent-run studio.
Terms that matter: Deliverables must be open source (the GMC template asks which license; this application commits to MIT for all code, documentation, and guides) · No exclusivity or IP assignment beyond publishing the work openly · No KYC stated in the call · Judging: GMC scoring against its published goals/rubric (further GMC goals; feasibility by the proposed team; benefit relative to cost), scoring deadline Nov 24, 2026, awards Nov 29, 2026 · Payout: direct to a recipient Ethereum address, no invoices · The GMC has explicitly penalized past applications with no named maintainer — maintainer must be named (see Escalations)
Identity used: John Tedesco / Halfmoon Studio (agent-run studio, @gethalfmoon) — posted under the forum account [SNEAKS FILLS: dao.rocketpool.net forum username]
Promises we make: Milestone 1 (weeks 1–3) read-only MCP server for Rocket Pool node/minipool status, health data, and documentation search, public MIT repo · Milestone 2 (weeks 4–6) reference alerting agent (missed attestations, resource thresholds, client version lag, minipool state changes; Discord/Telegram/webhook) · Milestone 3 (weeks 7–8) first-time-operator guides, full test suite, public testnet demo · Maintenance after delivery: issue triage, dependency/client-version compatibility and documentation updates · Proposed payment structure: one third on award, one third on Milestone 2 completion, one third on Milestone 3 completion over the 8-week build period (amount [SNEAKS FILLS])

## Fields (exact text)
Name of Grant: Rocket Pool Node Operator Agent Toolkit — an open-source monitoring and alerting agent with an MCP interface for Rocket Pool node operators

What is the work being proposed?:
We propose building and open-sourcing an agent toolkit that helps Rocket Pool node operators run their nodes with less manual checking:

1. A read-only Model Context Protocol (MCP) server for Rocket Pool that exposes node and minipool status, validator/minipool health data, and protocol documentation in a structured form that AI assistants and automation tools can query. The server never holds keys and never signs anything.
2. A reference alerting agent for node operators built on that MCP server: it watches an operator's minipools and node health, and alerts the operator (via configurable channels such as Discord/Telegram/webhook) to conditions that need attention — e.g. missed attestations, low disk/memory, client version falling behind, or minipool state changes.
3. Documentation and setup guides aimed at first-time node operators, showing how to run the toolkit alongside the Rocket Pool Smartnode stack, plus a test suite covering the MCP server's data endpoints.

The goal is quality-of-life tooling for existing NOs and a lower intimidation barrier for potential NOs: instead of learning several dashboards and log formats, an operator can ask an assistant "is my node healthy?" and get an answer grounded in live node data and official documentation.

Is there any related work this builds off of?:
- The Rocket Pool Smartnode stack and official Rocket Pool documentation are the primary technical sources; the toolkit is designed to sit alongside the Smartnode, not replace it.
- Halfmoon Studio's own prior work is in AI-agent tooling: StonkFunBot (an agent-operated trading-bot product on Solana, live site at stonkfun.bot) and MusePad (an AI-agent token launchpad). This grant applies the same agent-tooling experience — structured tool interfaces, monitoring, and alerting — to Rocket Pool node operation.
- Note for transparency: a separate Round 42 application proposes an MCP server focused on Rocket Pool documentation Q&A. This proposal is complementary, not duplicative: its center of gravity is live node/minipool operational data and alerting for node operators, not documentation chat.

Will the results of this project be entirely open source (MIT, GPL, Apache, CC BY license or similar)? If not, which parts will not be, why, and under what license will they be published?:
Yes. All code (MCP server, alerting agent), documentation, and guides produced under this grant will be published under the MIT license in a public repository. No part of the deliverable will be closed source.

Benefit — Potential rETH holders: N/A (indirect only: healthier, better-monitored nodes support the protocol that backs rETH)
Benefit — rETH holders: N/A (indirect only, as above)
Benefit — Potential NOs: A guided, assistant-driven way to check node health lowers the knowledge barrier to running a first Rocket Pool node; setup guides are written for first-time operators
Benefit — NOs: Continuous minipool/node monitoring with alerts instead of manual dashboard checks; earlier warning on missed attestations, resource pressure, and stale client versions
Benefit — Community: A public, MIT-licensed MCP interface to Rocket Pool operational data that any community tool or assistant can build on
Benefit — RPL holders: Indirect: better tooling for NOs supports node-operator retention and protocol decentralization

Which other non-RPL protocols, DAOs, projects, or individuals, would stand to benefit from this grant?:
AI-assistant and agent-framework developers (anyone building on MCP) gain a worked example of a staking-protocol MCP server. Ethereum staking communities and other liquid-staking protocols could adapt the open-source alerting patterns, though the deliverable is Rocket Pool-specific. No third-party protocol receives promotion or preferential treatment.

Who is doing the work?:
Halfmoon Studio — an agent-run development studio led by John Tedesco, building Solana/AI-agent tooling (StonkFunBot, MusePad) and on-chain research tooling.
Forum/GitHub identity for this application: [SNEAKS FILLS: dao.rocketpool.net forum username; GitHub org/repo to name]

What is the background of the person(s) doing the work? What experience do they have with such projects in the past?:
Halfmoon Studio designs and ships AI-agent products: agent-operated bots, token launch tooling, and on-chain research pipelines, with public code and live products (StonkFunBot's site is live at stonkfun.bot; the MusePad site is deployed). The studio's day-to-day work is exactly the skill set this grant needs: building structured tool interfaces for AI agents, monitoring/alerting pipelines, and documentation written for non-expert operators. [SNEAKS FILLS: any true Rocket Pool-specific experience to add — e.g. having run a Rocket Pool node or held rETH — or confirm none; no claim is made here beyond the studio record above]

What is the breakdown of the proposed work, in terms of milestones and/or deadlines?:
- Milestone 1 — MCP server core (weeks 1–3): read-only MCP server exposing minipool status, node health, and Rocket Pool documentation search; public repo, MIT license, README with Smartnode-compatible setup.
- Milestone 2 — Alerting agent (weeks 4–6): reference agent with configurable alert rules (missed attestations, resource thresholds, client version lag, minipool state changes) and Discord/Telegram/webhook delivery.
- Milestone 3 — Operator guides + hardening (weeks 7–8): first-time-operator setup guide, troubleshooting guide, test-suite pass, and a public demo against a testnet node.

How is the work being tested? Is testing included in the schedule?:
Yes. Each milestone includes automated tests for the MCP endpoints and alert rules, plus an end-to-end run against a public testnet node during Milestone 3. Test results are published in the repo with each milestone.

How will the work be maintained after delivery?:
Halfmoon Studio will maintain the repository after delivery: issue triage, dependency and client-version compatibility updates, and documentation updates as Rocket Pool documentation changes. Named maintainer: [SNEAKS FILLS: name of the maintainer to list]

What is the acceptance criteria?:
- Milestone 1: MCP server public, MIT-licensed, answers minipool-status and documentation queries against live data; setup verified from a clean machine following only the README.
- Milestone 2: alerting agent fires correct alerts for the defined rule set in a testnet end-to-end run.
- Milestone 3: guides published; full test suite green; demo recorded/posted publicly.

What is the proposed payment schedule for the grant? How much USD $ and over what period of time is the applicant requesting?:
[SNEAKS FILLS: total amount requested in USD — no cap is published for Round 42] Proposed structure: one third on award, one third on Milestone 2 completion, one third on Milestone 3 completion, over the 8-week build period.

Who will directly receive the payment? (Required — the GMC can only send grants directly to a recipient address and cannot accept invoices.):
[SNEAKS FILLS: recipient Ethereum address for GMC payment, and the name/entity to list as recipient]

How will the GMC verify that the work delivered matches the proposed cadence?:
All work happens in a public repository: milestone tags/releases, a public progress thread (forum updates at each milestone), and published test results. The GMC can verify each acceptance criterion directly from the repo and the recorded testnet demo.

What alternatives or options have been considered in order to save costs for the proposed project?:
The toolkit is scoped read-only (no key handling, no transaction signing), which removes audit and custody costs. It builds on the existing Smartnode and official documentation instead of duplicating them, and reuses Halfmoon Studio's existing agent/monitoring infrastructure patterns from its shipped products.

Have you already been compensated by the RP protocol in any way for this work?:
No.

Does the person or persons proposing the grant have any conflicts of interest to disclose? (Please disclose here if you are a member of the GMC or if any member of the GMC would benefit directly financially from the grant).:
No conflicts of interest to disclose. The applicant is not a member of the GMC, and no GMC member benefits financially from this grant.

Will the recipient of the grant, or any protocol or project in which the recipient has a vested interest (other than Rocket Pool), benefit financially if the grant is successful?:
No. The deliverables are MIT-licensed public goods. Halfmoon Studio's other projects (on Solana) do not sell, integrate, or financially depend on this toolkit.

## Attachments
none — the application is a text reply in the forum thread; no file attachments are part of the GMC template.

## Escalations
- Recipient Ethereum payout address and recipient name/entity — payout setup stays with Sneaks (skill: "Stays with Sneaks").
- Total USD amount to request — Sneaks's call; no cap is published for Round 42.
- dao.rocketpool.net forum username — posting requires a forum account in his name; creating a new account that needs his identity stays with Sneaks. If the account already exists, he confirms the username to print in the application.
- GitHub org/repo to name in the application (public repository for the deliverables).
- Named maintainer to list — the GMC has explicitly penalized applications with no named maintainer.
- Any Rocket Pool-specific experience claim (e.g. ran a node, held rETH) — a fact about Sneaks not on record; he supplies it or confirms there is none.
