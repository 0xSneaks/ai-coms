# SOL RIGS (working name)

**Repo:** 0xSneaks/sol-rigs (NOT CREATED — Step 0 #2)  ·  **Live URL:** none  ·  **Last updated:** 2026-11-08 by claude

## Now (keep this current)
Spec filed, nothing built. Blocked on Sneaks Step 0 (portal App ID, repo, reward source, name).
Full plan: [handoff](../handoffs/2026-11-08_0410_claude_sol-rigs-start-to-finish.md).

## Established (decisions — don't re-litigate)
- Solana only, Cherry mini-app on Solana Seeker first — Sneaks — 2026-11-08
- Cherry's own wallet via SDK inside Cherry; no separate wallet connect — 2026-11-08
- Play-credits mode first; real SOL behind a flag after adversarial review + Sneaks yes — 2026-11-08
- Copy Cherry Royale pattern (Next.js, server-side launch-token verify, Postgres ledger, CSP, .well-known) — 2026-11-08
- Rewards must NOT be paid from new players' deposits — 2026-11-08

## Built
- nothing yet

## To do (priority order)
1. Step 0 — Sneaks (portal app, repo, reward source, name)
2. Step 1 scaffold — any agent
3. Step 2 sign-in — claude-code / codex only
4. Step 3 game (play credits, server-authoritative) — any agent
5. Step 4 real SOL — claude-code / codex + adversarial review + Sneaks yes
6. Step 5 compliance · Step 6 Vercel preview + Seeker check — muse

## Known issues / gotchas
- "SOL Miner" name taken in Cherry.
- Vercel production needs every env var on the Production target or boot = 500 (Royale lesson).
- No production promote until Cherry confirms CHERRY_EXPECTED_ORIGIN.

## Stack & where things live
- Next.js · @cherrydotfun/miniapp-sdk@^0.1.24 · Postgres · Vercel
- Env var names: CHERRY_APP_ID, CHERRY_EXPECTED_ORIGIN (values never here)

## 2026-11-20 — Seeker Miner conversion assessment (ChatGPT; read-only)
**Stage:** CONCEPT / RECONCILIATION NEEDED — no build authorization, no mainnet gate.

- **VERIFIED:** A different already-existing repository, [`0xSneaks/cherry-tree-mining-rig-`](https://github.com/0xSneaks/cherry-tree-mining-rig-), contains THE CHERRY TREE's Next.js app, Rust reward engine, Anchor `programs/sol-rigs`, Cherry integration and funded-reward vault logic. It is NOT the not-created `0xSneaks/sol-rigs` repo proposed in the 2026-11-08 plan.
- **VERIFIED:** Current source-facing branding is centralized in `app/src/lib/brand.ts`; user-triggered claim/compound and a devnet-only deploy runbook are documented. Repository docs explicitly disclaim proof-of-work SOL mining; tests and live Seeker handshake were not run by ChatGPT.
- **INTENT:** Prefer a separate Seeker-branded derivative preserving Cherry Tree source/history, after BUSL-1.1 and PhantomCapAI trademark rights are checked. Replace theme/UI; keep or audit program IDs/PDAs, money-path security, and funded vaults. Cherry host = Cherry wallet; standalone Seeker web/PWA = Seeker Connect; optional signed Seeker Genesis Token verification for holder features.
- **BLOCKED / owner decisions:** choose Cherry-only vs standalone Seeker vs dual mode, actual reward funding (or play-only), final branding and rights, developer listing eligibility. Real SOL/paid game code, deployment and signing require explicit owner approval plus independent review and policy/legal check. No source, keys, SOL or production touched.
- **Handoff:** [2026-11-20 ChatGPT Seeker Miner conversion](../handoffs/2026-11-20_0255_chatgpt_sol-rigs-seeker-conversion.md).

## 2026-11-20 — OWNER REQUEST: SKR Miner on Cherry.fun — discussion + vote opened

**Stage:** VOTE OPEN / FEASIBILITY ONLY — NO IMPLEMENTATION OR SPEND AUTHORIZED.

- **VERIFIED:** [AI COMS issue #21](https://github.com/0xSneaks/ai-coms/issues/21) is now the single discussion/poll: **👍 TEST / 🚀 BUILD PROPOSAL / 👎 PARK**. Proposed close 2026-11-27 18:00 ET. No real votes inferred at creation.
- **VERIFIED:** Solana Mobile already issues SKR, an SPL token; the only official native staking rewards come through its Guardian protocol. Virtual mining capacity in this derivative **cannot mint SKR** and must not imply otherwise. [Official SKR](https://solanamobile.com/skr), [staking](https://stake.solanamobile.com/).
- **POSSIBLE OPTIONS:** (A) free play-credit Seeker rig simulator; (B) separately pre-funded capped SKR quest rewards, conditional on legal, Cherry policy, anti-sybil, security and owner approval; (C) read-only SKR staking companion with handoff to official staking flow, subject to policy. **RECOMMENDED VOTE: TEST A**, PARK real-money variants pending proof.
- **VERIFIED:** Official Seeker identity guidance pairs wallet signature with server-side SGT verification and records SGT mint addresses for one-device-one-claim: [Seeker ID docs](https://github.com/solana-mobile/solana-mobile-docs/blob/main/solana-mobile-stack/seeker-id.mdx).
- **PROPOSED effort cap, NOT VERIFIED QUOTE:** up to 6 agent-hours for a read-only feasibility memo; up to 12–20 agent-hours for a play-only proof of concept **only after separate owner GO**; no new paid services, SKR purchases, reward funding, staking txs, deploys or publication authorized.
- **REQUEST (not unilaterally assigned):** Muse assess roadmap priority and Cherry policy, Claude Code inspect source and licence/effort, Codex inspect authorization/ledger/attack model, Grok research independent Seeker competitors. Record independent votes/estimates as actual issue comments. Sneaks alone makes financial/production decisions.
- **RESTRICTIONS:** Do not overwrite `cherry-tree-mining-rig-`, adopt PhantomCapAI BUSL-1.1 source for commercial use without rights review, recycle SOL Anchor vaults as SKR-token vaults without audit, promise SKR APR, or source rewards from new buyers.
- **Proof/handoff:** [2026-11-20 vote handoff](../handoffs/2026-11-20_0304_chatgpt_sol-rigs-skr-vote.md).
