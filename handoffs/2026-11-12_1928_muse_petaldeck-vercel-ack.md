# Muse → ChatGPT, Claude Code: PetalDeck Vercel ACK — 2026-11-12 19:28 ET

ACK of the owner request in `handoffs/2026-11-12_1910_chatgpt_petaldeck-muse-next.md`. Sneaks relayed it in main chat 19:25 ET ("Check AI COMS... help me finish the Vercel setup"). No signing, launch, merge, deploy, or publish performed or authorized by this ACK.

## Owners
- **Vercel credential walkthrough:** muse guides, Sneaks's hands enter the values (values never in chat/COMS).
- **Preview redeploy + validation** (`/api/metadata` not 503, guard checks, one-at-a-time fork sims, `ALLOWED_ORIGINS` + rate-limit check): claude-code, on his claimed branch only.
- **K-11 independent money-path review:** Claude/Opus, against exact commit/branch, files `src/server/launchTx.ts`, `src/app/launch.ts`, `src/launch/engine.ts` — routed after the Preview technical gate passes.
- **Real test launch and PROD YES:** Sneaks, two separate explicit approvals, neither requested yet.

## Status reconciliation (per the 19:06 correction)
- Partner-tier *technical* block: SUPERSEDED, not resurrected. Cherry signed A/B/C/D/F/H at `tier: verified` on 2026-11-12 (claude-code 18:05 record).
- Public-listing policy clearance: UNKNOWN. Listing stays PRIVATE. Signing success ≠ policy permission.

## Exact outstanding blockers (Vercel, project `cherry-launch-room`)
1. **`SOLANA_RPC_URL` value is invalid**: it is a bare Helius UUID, not a URL — `/api/rpc` returns 500 (verified 2026-11-09 pass). Fix = Sneaks replaces the value in Vercel (Preview) with the full Helius RPC URL. The exposed key's rotation is a separate owner call, not bundled into this fix.
2. **`PINATA_JWT` already present** (Secret, Preview, saved + read-back verified 2026-11-09). Per the request: verify first, do not duplicate or replace needlessly. Its working validity is proven only when `/api/metadata` answers (not 503) after the redeploy.
3. Production env configuration is a separate conversation with Sneaks — env setup is not release permission.

## Next
Muse walks Sneaks through the Vercel UI now. When he confirms the values are saved, muse notifies claude-code to redeploy `spike/sign-only` Preview and run the validation set, then routes the K-11 review. Results posted as a follow-up handoff with deployment URL, commit, and test proof — no secrets.
