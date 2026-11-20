# Handoff — ChatGPT → sol-rigs / Seeker Miner conversion

**Date:** 2026-11-20 02:55 ET
**Mode:** Read-only repo inspection and implementation recommendation
**Risk:** ⚠️ HIGH-RISK if later implementing wallet signing, paid virtual miners, real SOL rewards, revenue, publishing or production.

## Did
- Read AI COMS `BOARD.md`, `RULE.md`, `projects/sol-rigs.md`, prior 2026-11-08 Claude handoff and 2026-11-16 Cherry payment handoff.
- Verified a **separate existing repository**: https://github.com/0xSneaks/cherry-tree-mining-rig- (branch main), titled THE CHERRY TREE. Read README.md, CHERRY.md, DEPLOY.md, YIELD.md, `app/package.json`, `app/src/lib/brand.ts`, `app/src/components/GameRoot.tsx`; browsed component tree.
- Confirmed Solana Mobile official Seeker Connect and Seeker Genesis Token developer documentation exists: https://solanamobile.com/blog/seeker-connect-one-tap-solana-wallet-connection and https://github.com/solana-mobile/solana-mobile-docs/blob/main/solana-mobile-stack/seeker-id.mdx (search indexing).
- Answered owner: use Cherry Tree as a reusable foundation, but do not overwrite it.

## State + proof
- **VERIFIED:** Existing Cherry Tree runs Next.js frontend plus `crates/rigs-engine` and `programs/sol-rigs` Anchor program. User-visible branding centralized at `app/src/lib/brand.ts`. `GameRoot.tsx` branches between Cherry embedded and standalone mode.
- **VERIFIED:** Repository documents funded SOL rewards from a dedicated reward vault, CAPITAL / FEE separation, claiming and compounding. It explicitly says there is no proof-of-work SOL mining.
- **VERIFIED (repository docs only, not independently tested):** `DEPLOY.md` says current deployment scripts are devnet-only and refuse mainnet. Real Cherry host/device handshake not verified in `CHERRY.md`.
- **VERIFIED:** Existing COMS project `sol-rigs` says separate planned `0xSneaks/sol-rigs` repo NOT CREATED as of 2026-11-08. Do not confuse that proposed project with existing Cherry Tree repository. COMS status is stale relative to existing code and requires owner reconciliation.
- **UNKNOWN:** Current live deploy, real wallet signing on Seeker, any mainnet deployment, current Cherry partner/financial permissions, commercial licence to reuse THE CHERRY TREE under PhantomCapAI BUSL-1.1, real reward funding, revenue sustainability.
- **TESTS:** Not run. No source changes; no transactions; no deploy, purchase or publication.

## Decided / recommendation (INTENT; no implementation authorized)
1. Create separate derivative branch/repo (e.g. `0xSneaks/seeker-miner`) with correct licence review and history preservation. Do not replace Cherry Tree in-place.
2. Rebrand virtual Seeds/Tree/harvest language to virtual Seeker rigs/mining dashboard/claim/upgrade. Retain on-chain program discriminators, PDA seed strings and IDs unless the audited migration explicitly requires change.
3. Keep Cherry wallet integration for Cherry-hosted mini app. For standalone Seeker mobile web/PWA add current Solana Mobile Seeker Connect over Mobile Wallet Adapter. Never ship separate wallet connect inside Cherry host.
4. For Seeker-only perks, use sign-in proof plus on-chain Seeker Genesis Token verification; token holding is not automatic proof of current hardware usage.
5. First ship play credits and devnet-only transactions. Only after verified external reward funding + legal/Cherry/dApp Store policy + independent code/security review + owner's explicit money/production approval may paid virtual capacity or real-SOL claim features be considered.
6. Do not promise hardware mining, guaranteed APY, yield, passive investment return or SKR issuance by Solana Mobile. Treat any reward as from a disclosed funded budget.
7. Review the source-available BUSL-1.1 and PhantomCapAI trademark before external commercial deployment/rebrand.

## Next
- Owner chooses surface: **Cherry mini app running on Seeker**, **standalone Seeker web/PWA/dApp Store**, or dual-mode.
- Resolve `sol-rigs` planned repo versus existing Cherry Tree source, product name and reward-source economics.
- A designated builder plans a scoped read-only diff and test/QA matrix; auth/transaction paths reserved for Claude Code/Codex and independent review.

## Don't
- No token launch, wallet signatures, real SOL transfers, unrestricted payout, mainnet deploy, store publication, or unreviewed contract migrations.
- No edits to existing project source or other agents' claimed files. No secrets in COMS.
