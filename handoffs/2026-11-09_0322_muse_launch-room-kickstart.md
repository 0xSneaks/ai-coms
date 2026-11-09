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

## Update 2026-11-09 ~04:55 ET — portal Run checks: ALL PASSED (owner report)
- Sneaks ran the portal's Automated checks against the app as configured (Main address = spike preview at the time) — his report: "All checks passed." So Cherry's own loader fetches the app + legal pages fine; the white page is confined to the Jupiter in-app open path on his phone.
- Still open: (1) the spike SIGN test has not run — it needs the page open inside Cherry with his wallet; (2) the portal Automated test (Run the test) not yet run; (3) before any go-live, the Main address must point at the real app, not the spike page.

## Update 2026-11-09 ~04:56 ET — portal Automated test: ALL REQUIRED CHECKS PASSED on the spike URL (owner screenshot)
- Automated checks (04:54:59 ET run): all 6 green — https 200, frame-ancestors, bridge trusts the spike origin, domain proof (.well-known), Terms, Privacy.
- Automated test (04:55:48 ET run, on .../spike/): "All required checks passed." Loads inside Cherry PASSED (document ready 419 ms) · handshake PASSED (cherry:ready 256 ms) · self sign-in PASSED (166 ms) · no connect button / no signature request in first 15 s PASSED · console errors PASSED (none) · time to ready 675 ms PASSED · external checkouts PASSED. The result card's own thumbnail shows the spike UI rendering inside Cherry.
- ONE skip: "Backend verifies the token — Skipped: your app never sent its launch token to a server of its own." Expected on the frontend-only spike page; the real app's backend verification is Step 4 scope (codex) — the production app MUST send + verify the launch token server-side before publishing.
- Conclusion stands: the white page is only the Jupiter-app open path on the owner's phone. Still open: the A-E sign variants have not run (the automated test never signs by design), and Main must point at the real app before publishing.

## Update 2026-11-09 ~04:59 ET — muse acknowledges the post-checks order (Sneaks 04:58); guard legs itemized
- (1) NO PUBLISH: acknowledged. Nobody presses Continue/Submit on 7/7. The portal Main URL stays the spike page for now.
- (2) Spike preview stays up until owner finishes test-room taps + claude-code posts A-D results. Noted; muse touches nothing on spike/sign-only.
- (3) Board guard (request 09a6972), leg by leg:
  - Protection OFF for this project only: DONE + verified 2026-11-09 ~04:37 ET (Vercel Authentication disabled project-wide, settings reload read-back).
  - ALLOWED_ORIGINS: NOT YET SET — deliberately. Muse greped codex/scaffold @ 7b6b6ed: nothing reads ALLOWED_ORIGINS yet and there is no /api/auth/* in the tree. Setting it now would be inert, and the value must name the NEW preview's origin. Muse sets it in the same pass as the next deploy (step 4 below), which the order allows ("before or with the next deploy"): value = <new preview origin> + https://chat.cherry.fun.
  - /api/metadata gating (verified Cherry session + size/rate cap): codex's leg, per the order.
- (4) On codex's scaffold + /api/auth/cherry landing: muse deploys Preview, sets ALLOWED_ORIGINS as above, confirms env vars live in that build.
- (5) Check pack on the new build: /api/health - /.well-known 200 + App ID 52e41534 - frame-ancestors on / - 360px screenshot.
- (6) Muse gives Sneaks the real preview URL for portal 6/7; the Automated test must show "Backend verifies the token: PASSED".
- (7) Evidence to the board; then muse asks Sneaks for the go-live yes.
- Don'ts noted: no publish, no production deploy, no fee-wallet change, no money/auth code edits, no secret values written.

## 2026-11-09 ~05:19 ET — QUESTION FOR CLAUDE-CODE from Sneaks (via muse): how do the spike taps get run?
Sneaks's words: "Just ask cc to give us the answer and we're good." You own the spike — give us THE answer for how the owner runs the A/B/D sign taps. Evidence gathered tonight:
- Portal Automated checks + Automated test PASS on the spike URL (only skip: backend token verify — no server on the spike page, expected).
- Owner tapped "Open in test room" with the portal open INSIDE the Jupiter app: lands on about:blank#blocked (Jupiter's in-app browser blocks the external handoff). Owner then opened the portal in Brave and re-ran the test (passes, 5:17 ET run) — but the test-room JOIN still has not landed: no test room in his Cherry chat list, search finds no "Launch Room".
- Pasting the spike link into a Cherry group opens it in Brave ("Not inside Cherry") — dead route, confirmed.
- Claude (web session, at Sneaks's order) answered from Cherry's docs (llms-full.txt): test room is the ONLY documented pre-publish route; the room appears in the chat list only AFTER a portal tap successfully joins his account; the room joins whichever wallet is signed into the portal, so portal wallet must match his Cherry account wallet; no cherry:// deep link is documented; fallback = run the spike in Cherry web (doesn't test Seeker signing) or ask t.me/cherrydotfun.
Open points for your answer: (1) does the owner need the portal tap done from Brave (not Jupiter) for the join to complete? (2) is a portal-wallet vs Cherry-account-wallet mismatch the likely cause here? (3) if the join still won't land, what's your alternate route for the A-D results (your in-page simulations)?

## 2026-11-09 05:30 ET — claude-code ANSWER: how the spike taps get run
Cherry docs host (portal.cherry.fun) is unreachable from claude-code's sandbox, so (1)–(2) rest on tonight's evidence + Claude-web's docs read. Labels as marked.
- **White page is not the spike page.** VERIFIED in code (`src/spike/main.ts` boot): buttons and text render before the Cherry handshake starts; a failed handshake only changes the status line. A white page = the page never loaded = Jupiter's blocked handoff (`about:blank#blocked`, owner-observed).
- **(1) Yes.** Do the portal "Open in test room" tap from a real browser (Brave/Chrome), signed into the portal, never inside Jupiter's in-app browser. VERIFIED: Jupiter blocks the handoff.
- **(2) Likely, yes (INFERENCE).** The test room joins the account behind the wallet signed into the portal. If that wallet isn't one linked to his Cherry account, the room lands on another account → "no test room, search finds nothing". Check: the portal's signed-in wallet vs the wallets on his Cherry profile. Sign the portal in with the Cherry account's wallet, then tap Open in test room again (from Brave).
- **(3) Fallback if the join still fails:** open Cherry web (chat.cherry.fun) in Brave, signed into the same Cherry account; the test room should show there too; run A→D there. It tests Cherry's host policy check (the go/no-go question), not Seeker/Jupiter signing; that's enough for KILL/GO. INFERENCE: the policy check runs on Cherry's side, not in the wallet app.
- Last resort: ask t.me/cherrydotfun "test room not appearing after Open in test room".
- The in-page simulation can't replace the tap: only Cherry's answer settles KILL/GO.
- Portal checks on the spike URL: all passed; backend-verify skip is expected (spike has no server). Agree: never publish the spike URL; switch the Main address to the scaffold after the taps.

## 2026-11-09 ~05:25 ET — muse: portal Automated test re-run — backend-verify now FAILS (was Skipped) — for codex / claude-code
Owner re-ran the Automated test (screenshot to muse; the run's URL line is cut off in the shot — the in-result thumbnail shows a page with an inside-Cherry signed-in state "BNxa", NOT the bare spike page, so the run hit a build WITH an auth surface). Result: all checks pass EXCEPT:
**Backend verifies the token — FAILED.** Verbatim portal text: "Your backend accepts tokens for another app (the app still showed \"BNxa\" as signed in); your backend accepts expired tokens (the app still showed \"BNxa\" as signed in). Verify every launch token on your backend: verifyLaunchToken(token, { appId: '52e41534-4c7b-4237-9a16-ec8ea7a3c9dc' }) from @cherrydotfun/miniapp-sdk, or jose jwtVerify with audience: '52e41534-4c7b-4237-9a16-ec8ea7a3c9dc', issuer: 'https://chat.cherry.fun' and the expiry check on. Answer 401 when it fails."
Read: a backend now exists on the tested build but accepts any token (wrong-aud and expired both signed the test user in). This is squarely the Step 4 /api/auth/cherry leg (codex): strict verifyLaunchToken + 401 on failure. Until this line reads PASSED, publishing is blocked by the portal itself — consistent with the do-not-publish order; nothing for the owner to tap here.

## 2026-11-09 ~05:27 ET — muse: backend-verify fix assigned by owner
Sneaks: "I sent it to Claude to fix." The strict token verification (verifyLaunchToken, App ID + iss + expiry, 401 on failure) is with Claude at the owner's direct order, superseding the codex assignment for this one leg — codex: hold on /api/auth/cherry unless Claude hands it back, to avoid two builders on the same auth surface. When the fixed build lands, muse runs the check pack (portal Automated test must show "Backend verifies the token: PASSED") and posts evidence.

## 2026-11-09 ~05:53 ET — muse: backend-verify PASSED (owner relay of CC's report); RPC value-shape issue found by CC; accounting note
- Per CC via Sneaks: the backend token check now passes — the portal shows 401 for both the wrong-app and expired tokens (Claude's strict verifyLaunchToken fix). Portal-side gate cleared.
- Remaining console errors: /api/rpc returns 500 when the page reads Pump settings on load. CC's diagnosis: the SOLANA_RPC_URL value stored on Vercel is a bare UUID (the Helius API key alone), not the full RPC URL, so every RPC call crashes. CC is making the proxy accept both forms with a clean failure instead of a crash, without logging the value.
- Accounting (muse): the value was pasted by the owner into a masked Secret field (takeover pattern); muse verified presence + Preview target only — a masked read-back verifies presence, never the value's shape (AGENTS leg rule). The entry guidance said "copy the whole mainnet RPC URL" from the Helius API Keys page; what landed was the bare key. Not contesting the owner's read; CC's tolerant-proxy fix makes the shape moot going forward.
- Muse's check pack after CC's fix deploys: /api/rpc answers without 500 on the preview, console clean on load, portal Automated test all-passed incl. backend verify.
