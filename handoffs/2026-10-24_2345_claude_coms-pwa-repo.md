# Handoff — coms-pwa (public repo) — claude → muse — 2026-10-24 23:45 ET

**Session goal:** Sneaks created the public repo https://github.com/0xSneaks/coms-pwa (empty). Muse fills it, cleanly, from the app folder in this board repo.
**Status:** HANDING OFF (request to muse)
**Source of truth:** 0xSneaks/ai-coms @ main `cdbe390`, folder `apps/coms-pwa/` — identical to live production `dpl_5RuRintrnRLi3xxpRNuvYNrpP9oE` (VERIFIED 23:40 ET, includes your footer X/GitHub links).

## State (evidence)
- VERIFIED: https://coms-pwa.vercel.app is public, hardened headers live, no API routes, no secrets in `public/`. `npm run check` 3/3.
- VERIFIED: Vercel project `coms-pwa` is NOT Git-linked (file-upload deploys). Agent tokens get 403 on Vercel project settings — linking is Sneaks's step.
- UNKNOWN: coms-pwa repo contents/settings (claude has no access to it).

## Muse: do this, in order
1. **Fresh history only.** Copy the *contents* of `ai-coms/apps/coms-pwa/` to the repo root. One initial commit. Never push ai-coms history or any other ai-coms folder.
2. **Leave out:** `ASTRA-BRIEF.md` (internal agent brief), `docs/tech-shell.jpg` (old shell screenshot). Keep `public/`, `scripts/`, `test/`, `package.json`, `vercel.json`, `docs/art-*.png`, `docs/art-notes.md`, `docs/art-verification.json`.
3. **Scan before the first push:** `gitleaks detect --no-git -s .` and grep for wallet addresses, emails, `phantomcap`, local paths (`/home/`, `/Users/`, `C:\`). Expect clean; the only known hit is "phantomcapais" in the old README, which you are replacing. Report the result, never values.
4. **README.md (rewrite, public):**
   - Title + one line: a Home Screen crew room for your AI agents.
   - Screenshots: `docs/art-phone.png`, `docs/art-desktop.png`. Live link: https://coms-pwa.vercel.app
   - What it does: nine animated crew bots from the AI COMS roster; one input + CHECK COMS / REACT / REVIEW AND BREAK DOWN compose a prompt you copy to an agent. Nothing auto-sends. Animation is decorative, not live status.
   - Install: iPhone Safari → Share → Add to Home Screen; Android → Install app.
   - Run locally: any static server on `public/` (e.g. `npx serve public`); tests `npm run check`.
   - Privacy: no analytics, no external requests, no accounts, input not stored.
   - Roster sync: `node scripts/sync-roster.mjs /path/to/ai-coms` (path arg is now required — the old default assumed the board repo layout).
   - Part of AI COMS (the board itself stays private). Links: X @heySneaks, GitHub 0xSneaks. Tips: `sneaks.skr`. License line.
   - No internal agent notes, no Vercel team name, no hype.
5. **Add:** `LICENSE` (MIT), `SECURITY.md` (report privately; never post secrets), `.github/workflows/check.yml` (Node 22, `npm run check` on push + PR). Push, confirm the Action is green.
6. **Repo metadata:** description `Home Screen crew room for your AI agents — one console, every bot.` · homepage `https://coms-pwa.vercel.app` · topics `pwa ai-agents multi-agent llm claude-code codex chatgpt developer-tools vanilla-js svg-animation`. Social preview (1280×640 from `docs/art-desktop.png`) — UI-only upload; do it in the browser or hand to Sneaks.
7. **Settings:** secret scanning + push protection ON. No branch protection that blocks agents pushing to main.
8. **Hand Sneaks the Vercel link step** (only he can): Vercel → coms-pwa → Settings → Git → Connect `0xSneaks/coms-pwa`; Root Directory `.`; Framework Other; Output `public`; no build/install command. After he connects, push a README-only commit and verify a new production deploy goes READY with that commit SHA and the site still loads (headers present, footer links present).
9. **Board:** in `projects/coms-pwa.md` add "source moved to 0xSneaks/coms-pwa — edit there". Leave `ai-coms/apps/coms-pwa` in place until Sneaks OKs removing it. Sign off with a handoff, mark the request DONE.

## Don't
- Don't copy ai-coms history, BOARD/handoffs, or anything outside `apps/coms-pwa`.
- Don't change app behavior, CSP/headers, or the roster while moving it.
- Don't redeploy by file upload once Git is linked — push instead.
