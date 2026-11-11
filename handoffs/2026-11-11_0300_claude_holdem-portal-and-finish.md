# For: claude (Sonnet chat) + claude-code · From: claude · 2026-11-11 03:00 ET
## Re: Cherry Hold'em single-player — portal upload (Sonnet) + finish & deploy (claude-code)

Repo `0xSneaks/cherry-holdem` @ main. State VERIFIED by claude 02:50 ET: 45/45 tests, typecheck clean, build OK, headless 360px full tournament with 0 console errors. Details → [single-player handoff](2026-11-11_0250_claude_cherry-holdem-single-player.md).

---

## PART 1 — Sonnet chat: portal walk-through (skill: cherry-messenger-creator, Phase 5)

Rules: one screen per message, every typed value in its own copy box with the field name in bold above it, wait for Sneaks's screenshot, log each screen to `skills/cherry-messenger-creator/PORTAL-LOG-cherry-holdem.md`. Assets: `assets/cherry-holdem-icon.png` (512) and `assets/cherry-holdem-cover.png` (1200×630) in the app repo — already sent to Sneaks in chat.

Prefilled values (Sneaks confirms; change only if he says):
- **A. New project** — Name `Cherry Hold'em` · Description `Texas Hold'em Sit & Go against bots, inside your Cherry room.` · skip invites · Create project. (Sent to Sneaks 02:50; resume from his screenshot.)
- **B.** Mini app.
- **C. 1/7** — App name `Cherry Hold'em` · Pitch `Texas Hold'em Sit & Go vs bots` (30 chars; fallback `Hold'em vs bots`) · Category **Games** · Icon `cherry-holdem-icon.png`. ⚠️ Fields BELOW Icon are UNMAPPED → ask for a screenshot, map them (cover image likely goes here), update the skill map.
- **D. 2/7** — **An individual**. Legal name + country: Sneaks types, never prefill.
- **E. 3/7** — Solana · countries: leave CU/IR/KP locked, add none · Age rating **18+** (poker = gambling-like mechanics, skill rule).
- **F. 4/7** — **Free (0%)**: v1 is play credits only, no revenue path. Switching to a paid model later = new money layer + Sneaks + review first.
- **G. 5/7** — keep Cherry's standard Terms + Privacy ticked; accept the Developer Agreement.
- **H. 6/7** — **Copy prompt** → Sneaks pastes it → save VERBATIM to the app repo as `docs/CHERRY_INTEGRATION.md`; post App ID + Project ID on the board line (not secrets); hand to claude-code (PART 2). STOP until claude-code posts the live URL. Then: Where your app runs → paste URL → Add → **Run checks** → **Run the test** → screenshot any red.
- **I. 7/7** — ⚠️ UNMAPPED (no app has reached it). Screenshot → map → log → update the skill.

Sign off: handoff + board line + skill map updated with the two new screens.

---

## PART 2 — claude-code: finish + deploy (takes the Vercel import from muse; muse = backup)

Read: this file, the single-player handoff, `docs/CHERRY_INTEGRATION.md` once saved (the portal prompt WINS over everything below).
1. Claim on BOARD.md. Vercel MCP `create_git_project` returned 403 for claude chat — use your CLI creds; if that also fails, mark BLOCKED and ping muse to import via the dashboard.
2. Compliance gaps (VERIFIED missing in the build):
   - In-app block for CU / IR / KP (developer agreement requires it, not only Cherry's open-time block). Vercel Routing Middleware on country → blocked page. Test it.
   - Link Cherry-hosted Terms + Privacy (URLs from the portal prompt) in the lobby footer — link, don't copy.
3. Run the portal prompt's self-check line by line; fix only what fails. Keep scope: no money, no wallet, no new features.
4. Set `CHERRY_APP_ID` on Preview AND Production. Deployment Protection must let Cherry's iframe load the URL.
5. Production deploy only after Sneaks's yes (batched ask; play credits, no money paths).
6. Evidence on the board: `/api/health` → `cherryIdentityConfigured: true` · `/.well-known/cherry-app.json` → 200 JSON with the App ID · `curl -I /` shows `frame-ancestors` CSP, no X-Frame-Options · `/api/auth` → 401 on a junk token · 360px render · `npm test` + typecheck + build. Then post the URL for the Sonnet chat / Sneaks.

Don't: touch auth beyond the SDK's `verifyLaunchToken`, add wallet/signing, change prizes/credits, edit `src/poker/*` except to fix a failing test.
