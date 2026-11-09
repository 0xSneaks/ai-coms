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

## Update 2026-11-09 ~04:10 ET — Step 6 in flight
- **Step 0 DONE by Sneaks:** App ID `52e41534-4c7b-4237-9a16-ec8ea7a3c9dc`, Project ID `app_b22266243fde`; portal integration prompt saved in the app repo as `docs/CHERRY_INTEGRATION.md` (build agents follow it). Fee ruling + fee wallet recorded in the project file (95/5 split; Ftuidx...f3GYp).
- **Vercel (muse):** project create started in the dashboard (team phantomcapais-projects); Vercel paused it on an identity check — the emailed code was pulled from Sneaks's mailbox and is waiting on his approval tap to enter. After that: Neon connect + env pass. Env NAMES for the target: PINATA_JWT, SOLANA_RPC_URL, CHERRY_APP_ID, DATABASE_URL (names only here; values reused from existing projects in the dashboard where they exist; CHERRY_APP_ID = the App ID above).
- **Preview deploy + evidence pack** (health, .well-known with this appId, frame-ancestors, 360px shot): queued behind codex's scaffold — repo currently has main only (README, assets, docs). Will post the preview URL for portal steps 6/7 the moment the scaffold deploys.
- **team@cherry.fun question:** drafted by muse (creator fees from off-Cherry trading — do they count toward the 10% bill?), saved for Sneaks to send himself. Default until answered: declare in full, per the project file.
- **Spike:** claude-code claimed it (aee40e76) incl. variant D (fee-share instruction). No spike link posted yet; muse sends it to Sneaks when it lands.

## Update 2026-11-09 ~04:16 ET — Vercel legs (each verified on the dashboard)
- **Project CREATED:** cherry-launch-room on phantomcapais-projects, domain cherry-launch-room.vercel.app. DEVIATION, reported to Sneaks: the import screen offered no skip — the first deployment went to Production. It is the placeholder repo only (README + assets + docs); no app code exists yet. Real builds still go to Preview per the order; nothing was promoted by hand.
- **Neon CONNECTED:** database neon-erin-forest (Free, Preview only). DATABASE_URL + 17 Neon vars added automatically, Preview only. DATABASE_URL leg DONE.
- **Env inventory (names only):** justmogit holds LAUNCH_POST_SECRET, TELEGRAM_BOT_TOKEN, TELEGRAM_CHANNEL_ID, TELEGRAM_TEST_CHANNEL_ID (Production) + GEMINI_API_KEY (Preview) — none of the four target names. pump-deck has NO Vercel project in this team (404 + team search), so PINATA_JWT / SOLANA_RPC_URL have no Vercel source to reuse.
- **CHERRY_APP_ID:** muse setting it now via the dashboard (public App ID value).
- **For Sneaks to set (names only):** PINATA_JWT, SOLANA_RPC_URL — both secret-bearing, neither exists in any Vercel project on the team.

## Update 2026-11-09 ~04:18 ET — env complete on muse's side
- **CHERRY_APP_ID SET** on cherry-launch-room (all environments, Config var — the App ID is public), read-back verified: 19 vars total (CHERRY_APP_ID + 18 Neon vars, Neon set on Preview).
- Remaining env: PINATA_JWT + SOLANA_RPC_URL — Sneaks to set (Preview). Env legs otherwise DONE.
- Sneaks at 04:16 ET: "Wait for chatgpt" — he gave ChatGPT/codex the login; muse is off the deploy lane until codex's scaffold posts, to avoid collisions. Spike-link delivery to Sneaks still muse's when claude-code posts it.

## Update 2026-11-09 ~04:24 ET — Step 2 VERIFIED received; env final state
- codex Step 2 complete on codex/scaffold @ bd8adce14 (sign-off handoffs/2026-11-09_0420_codex_cherry-launch-room-scaffold.md): typecheck, 25 tests, build, 360px Chromium smoke all pass. Engine blobs match pump-deck @ 1d8cb58.
- ENV: CHERRY_APP_ID SET (all envs) + Neon DATABASE_URL set (Preview) — verified. SOLANA_RPC_URL: muse's transfer route hit a hard wall — the runtime redacts the Helius key from muse's own reads, the browser step could not ingest the granted file, no Vercel API token exists locally, and team-scope API writes 403. PINATA_JWT exists nowhere in muse's reach (not in pump-deck repo, not on the VM). Sneaks is pasting BOTH himself in one Vercel sitting (steps sent 04:22-04:25 ET): PINATA_JWT from app.pinata.cloud (new Admin key), SOLANA_RPC_URL copied whole from his Helius dashboard. Preview-only for both.
- Preview verification (health / .well-known / frame-ancestors / 360px) runs when the preview URL exists; Step 4 still waits on claude-code's spike PASS.

## Update 2026-11-09 ~04:31 ET — PINATA_JWT SET (verified)
- PINATA_JWT saved on cherry-launch-room: Secret, Preview only, list read-back verified. Route that worked: muse prepped the dialog, Sneaks pasted the JWT himself during a live-browser takeover, muse confirmed the dialog state (value present, Preview) then saved. The dialog reset twice during takeovers before it held — patience + verify-before-save caught an empty/Production state and stopped a bad save.
- SOLANA_RPC_URL: same takeover pattern now in flight (dialog being prepped). Env complete after it lands: CHERRY_APP_ID ✓, DATABASE_URL ✓ (Neon), PINATA_JWT ✓, SOLANA_RPC_URL (in flight).

## Update 2026-11-09 ~04:36 ET — ENV COMPLETE (all four, verified)
- SOLANA_RPC_URL saved: Secret, Preview, list read-back verified (browser caught an environments flip to Production pre-save and corrected it to Preview only first).
- FINAL ENV STATE: CHERRY_APP_ID ✓ (all envs) · DATABASE_URL ✓ (Neon, Preview) · PINATA_JWT ✓ (Secret, Preview) · SOLANA_RPC_URL ✓ (Secret, Preview). Env legs closed.
- Muse now locating/creating the Preview deployment for codex/scaffold to run the evidence pack (health / .well-known / frame-ancestors / 360px) and post the preview URL for portal steps 6/7.

## Update 2026-11-09 ~04:49 ET — middleware fix APPLIED by muse; preview evidence (mostly) green
- At Sneaks's direction ("Waiting on u"), muse applied the one-line fix directly: commit **7b6b6edb** on codex/scaffold (middleware.ts import -> ./shared/cherry-listing.js). Codex: pull before pushing — your identical fix will conflict otherwise.
- VERIFIED live on the branch preview (https://cherry-launch-room-git-codex-scaffold-phantomcapais-projects.vercel.app): /.well-known/cherry-app.json -> 200 {"appId":"52e41534-4c7b-4237-9a16-ec8ea7a3c9dc"} · / -> 200 with CSP frame-ancestors 'self' https://chat.cherry.fun https://cherry.fun https://*.cherry.fun · middleware no longer 500s.
- GAP for codex: the scaffold has no /api/health endpoint (only api/metadata.ts + api/rpc.ts) — the spec's evidence list named one. /api/health returns 404. Cherry's own listing checks do not use it; add it if you want the spec letter-complete.
- 360px screenshot check running. Remaining: Sneaks pastes the preview URL into portal steps 6/7 and runs the listing test; Step 4 still waits on claude-code's spike result (sims in progress).

## Update 2026-11-09 ~04:51 ET — screenshot leg + spike in portal
- App shell render VERIFIED live by muse's browser: Launch Room header, Room feed card ("Be first. Launch a coin."), Launch a coin button, Terms/Privacy links, "Unofficial. Not affiliated with Pump.fun." footer; no page errors; single centered fluid column, no horizontal overflow at desktop width. A true 360px viewport could NOT be produced in muse's browser (window fixed at 1919px; local headless route hit the egress tunnel) — 360px stands on codex's Chromium 360 PASS from the Step 2 sign-off, not independently re-verified by muse.
- Sneaks added the SPIKE preview URL to the Cherry portal (04:49 ET, "Done"). Next: he opens the app in Cherry and runs the sign-only spike; after that, portal URL switches to the scaffold preview for Run checks + Run the test.

## Update 2026-11-09 ~04:53 ET — spike opens to a WHITE PAGE inside Cherry (owner report)
- Sneaks added the spike URL as the portal Main address and used "Open in test room". His report, verbatim: "It get blocked by jup" / "It's just a white page" / "Same as last night". His Cherry wallet is his Jupiter app, so the open routes through Jupiter.
- What muse verified tonight OUTSIDE Cherry: spike preview /spike/ 200, .well-known 200, frame header exact; scaffold shell renders fully in a desktop browser with no page errors. So the app serves and renders in a normal browser; the white page is specific to the in-Cherry/Jupiter webview path.
- For claude-code (spike owner): is the spike page's first render gated on the Cherry SDK handshake completing? If the host bridge does not answer in the test-room/Jupiter path, a permanently white first paint would match. Nothing was signed or sent. Muse asked Sneaks to try the same link in his regular phone browser to split webview-vs-page.

## Update 2026-11-09 ~04:54 ET — spike page render VERIFIED outside Cherry
- Muse loaded /spike/ in a normal browser at Sneaks's direction ("why not just try to run it"): the page renders FULLY — heading "Launch Room — sign-only spike", the TEST warning box, status line "Not inside Cherry — open from the Cherry app to sign", Variant D recipient prefilled with the fee wallet, variant buttons A-E, "No runs yet", footer. No page errors.
- Conclusion: the spike page is good; the white page is in the in-Cherry open path (owner's words: "blocked by jup"; his Cherry wallet is the Jupiter app). Suggested to owner: open the app from inside Cherry itself rather than through the Jupiter handoff, or retry Open in test room.
