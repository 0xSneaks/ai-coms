# muse — Launch Room kickstart (2026-11-09 ~03:22 ET)

Claim per Sneaks's order 2026-11-09 03:13 ET. Project: [projects/cherry-launch-room.md](../projects/cherry-launch-room.md) · Spec: [handoffs/2026-11-09_0330_claude_cherry-launch-room.md](2026-11-09_0330_claude_cherry-launch-room.md)

## Claim
- **muse** owns kickstart coordination + Step 6 (Vercel Preview deploy + evidence pack).
- Steps 2 + 4 → codex after the spike posts PASS. Step 3 (money + auth) → claude-code or codex. Step 5 → the other of the two.

## → claude-code: START Step 1 now
Sign-only spike, variants A (create-only) / B (+reference) / C (+0.01 SOL buy) per the spec handoff.
- Repo `0xSneaks/cherry-launch-room` is being created via the github.com web UI (repo leg below). If it exists when you read this, branch `spike/sign-only` there; if not, use a scratch branch and move it over when the repo lands.
- NEVER broadcast. Never store or log signed bytes. Log variant + result + byte size only.
- Post PASS/FAIL per variant on the board.

## Legs (each verified as reported)
- **Repo:** PAT create-repo → 403 VERIFIED (muse teo, "Resource not accessible by personal access token"). GitHub App `create_repository` → 403 VERIFIED ("Resource not accessible by integration"). Web-UI creation IN FLIGHT (muse browser, started ~03:16 ET). URL posts here when it lands.
- **Vercel:** connector cannot do project-level work on team phantomcapais-projects (403 scope; documented in muse's connector notes 2026-10-24/25). Route = Vercel dashboard in the browser, after the repo exists: create PREVIEW project `cherry-launch-room` (no production), Neon via the dashboard Storage tab. Env var NAMES needed: PINATA_JWT, SOLANA_RPC_URL, CHERRY_APP_ID, DATABASE_URL. Which already exist on justmogit/pump-deck gets inventoried in the same dashboard pass (names only, never values).
- **Art:** Sneaks uploaded the final logo (512×512) + banner (1200×630) at 03:14 ET — exact portal sizes. Staged for the portal listing step.
- **Directory name check:** IN FLIGHT (muse browser on the Cherry portal). CLEAR/TAKEN verdict follows in an update to this handoff.

## For Sneaks (batched — his taps only)
- Create the app in the Cherry portal → the App ID.
- HIGH-RISK yes/nos stay his: the spike tap, the first real launch, production.

## Don'ts (standing, from the order)
No mainnet launch or broadcast by any agent. No production deploy. No app fee. No custody. pump-deck untouched. DeepSeek/overflow never touches src/launch/, server/, or auth. Secret values never written — names only.

## Update 2026-11-09 ~03:18 ET — name check
- **"Launch Room": CLEAR.** Cherry Marketplace (chat.cherry.fun/market?kind=app, searchable without sign-in): no app named "Launch Room", "LaunchRoom", or "Launch Pad"; "Launch" alone also returns nothing in Apps. Screenshot of the empty result captured by muse's browser. The name is free to claim.

## Update 2026-11-09 ~03:20 ET — repo LIVE
- **Repo created:** https://github.com/0xSneaks/cherry-launch-room (private, main branch) via the github.com web UI after both API routes 403'd. Verified by API read-back.
- **Art in repo:** `assets/logo.png` (512x512) + `assets/banner.png` (1200x630), owner-supplied, commits 554de94a + 173ef537.
- **Vercel:** dashboard pass IN FLIGHT (project create + Neon + env-name inventory on justmogit/pump-deck).
