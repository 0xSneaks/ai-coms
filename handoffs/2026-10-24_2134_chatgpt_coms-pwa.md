# COMS PWA technical shell + note for Astra
**Date:** 2026-10-24 21:34 ET
**Owner:** chatgpt
**Verdict:** TECHNICAL SHELL VERIFIED; ART / ORIGINAL-APP INTEGRATION / DEPLOYMENT NOT READY

## Did
- VERIFIED: read BOARD, RULE v2, roster, roll call, project records and Grok's 21:09 handoff. Claimed only unowned staged files.
- VERIFIED: pushed 22 files at apps/coms-pwa on branch `chatgpt/coms-pwa-shell-2026-10-24`, commit `0449e20c2c11508406478be0ab9392cc6e3a5f97`; draft [PR #5](https://github.com/0xSneaks/ai-coms/pull/5). Remote tree hashes match all 22 local files.
- VERIFIED: static PWA shell, Home Screen manifest, real PNG icons including maskable/iOS, service worker, safe areas, accessible dialogs, reduced motion/pause, and command composition.
- VERIFIED: crew is the union of active AGENTS-ROSTER entries and roll-call signatures. All nine present, including Astra and Muse Blue; removed GLM/Z Code excluded. No status filter. Activity remains UNKNOWN.
- VERIFIED: provided [Astra brief](https://github.com/0xSneaks/ai-coms/blob/chatgpt/coms-pwa-shell-2026-10-24/apps/coms-pwa/ASTRA-BRIEF.md). Room/CSS separated from shell behavior.

## State + proof
- VERIFIED: `npm run check`: 3 tests pass (roster union/removals/instances; command material validation; real icon dimensions and offline asset existence) plus JS syntax checks.
- VERIFIED: browser at local preview rendered all nine crew; CHECK COMS, REACT and REVIEW dialogs preserved text; pause motion and installation instructions work. Clipboard denied in this preview: fallback selects command and explains manual Copy.
- VERIFIED: full ai-coms text snapshot plus app files passed `coms_check.py`: 0 errors, 0 warnings.
- VERIFIED: screenshot `apps/coms-pwa/docs/tech-shell.jpg` is the staged shell, not finished Astra artwork.
- UNKNOWN: actual device installation and HTTPS offline behavior. No installation or offline-success claim.
- VERIFIED: buttons compose commands to copy; they DO NOT automatically dispatch or change the board. No private BOARD content or credentials are embedded.
- UNKNOWN: Grok's original app source/branch and original handlers. GitHub searches and ai-coms tree did not locate them. This is a staged continuation, not an edit of an identified existing deployment.
- VERIFIED: existing URL reached Vercel login; Vercel team API returns 403 requiring owner team authorization. No production app changed.

## Decided
- VERIFIED (Sneaks's clarification): first-person seated user; glass pane in front; EVERY roster/roll-call model behind glass, idle or active; funny, animated, silly, VERY BRIGHT and cute. Console with one input + three buttons on user's side. Boiler Room bot silhouette/visor/antenna/gauge remains reference; dark industrial direction superseded.
- VERIFIED (Sneaks): ChatGPT to handle technical portion and supply prompt to Astra for art. Final visual pass remains open.
- INTENT: no paid image calls or new spending.
- ⚠️ HIGH-RISK: Sneaks explicitly requested Vercel production deployment; team consent still requires his action.

## Note for Astra
- INTENT: take the visual pass from PR #5; read ASTRA-BRIEF.md first and claim `apps/coms-pwa/public/room.css` plus new artwork assets. Coordinate before editing per-bot SVG in app.js. No active ChatGPT code claim remains.
- Preserve roster-driven membership, crew buttons/IDs, accessibility, motion preferences, PWA and command behavior.
- Do not replace this with movie characters, generic dashboard cards, dark industrial art or a third-person view of the seated user.
- Add depth, glass reflections, colorful cute characters, props, silly personal animations. Sleeping/idle agents stay in the room.
- Report with screenshots, test results, commit and handoff. Art is DONE only after that verification.

## Next
1. Astra: check out `chatgpt/coms-pwa-shell-2026-10-24`; read apps/coms-pwa/ASTRA-BRIEF.md; claim art files on BOARD.
2. After owner authorizes team `team_4T9nErrDGecNcX5d212vAWhQ`, inspect Vercel `coms-pwa` project linkage to locate original source and preserve established auth/dispatch.
3. Integrate art and source; verify HTTPS/offline/install on phone; deploy intended project and verify READY before claiming live.

## Don't
- Do not say backend/agent dispatch is implemented.
- Do not call decorative animation live agent telemetry or infer status from an old handoff.
- Do not disable protection or publish private board contents to bypass missing auth.
- Preserve Claude Code/Muse claims. Do not mark Grok's art request DONE while final art/integration is pending.
