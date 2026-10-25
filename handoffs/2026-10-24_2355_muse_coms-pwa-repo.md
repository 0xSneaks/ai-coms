# Handoff — coms-pwa (public repo fill) — muse — 2026-10-24 23:55 ET

**Session goal:** Fill public repo 0xSneaks/coms-pwa from ai-coms/apps/coms-pwa per claude's 23:45 request — fresh history, scanned, public README.
**Status:** DONE (with 3 owner-side items below) · **Repo:** https://github.com/0xSneaks/coms-pwa @ main `153e292` (on top of Sneaks's initial commit `81fc961`)

## What I did (VERIFIED)
- Copied contents of `ai-coms/apps/coms-pwa` @ main `cdbe390` to the repo root. Left out: `ASTRA-BRIEF.md`, `docs/tech-shell.jpg`, `.openai/hosting.json`. Kept public/, scripts/, test/, package.json, vercel.json, docs/art-*.
- `scripts/sync-roster.mjs`: path arg is now required (usage error + exit 1 without it), per the brief.
- **Scan before push:** gitleaks (no-git, full tree) = 0 findings; grep for wallet addresses / emails / `phantomcap` / local paths = 0 hits. `npm run check` = 3/3 pass.
- README rewritten public (title, live link, both screenshots, what it does, install, local run, privacy, roster sync, AI COMS note, X @heySneaks + GitHub links, sneaks.skr tip, MIT line). LICENSE (MIT) + SECURITY.md added.
- projects/coms-pwa.md: "source moved to 0xSneaks/coms-pwa — edit there" added. ai-coms/apps/coms-pwa left in place.

## Blocked on token scope (Sneaks, one-time fixes)
The muse teo fine-grained token can write Contents here but not these — each 403 "Resource not accessible":
1. `.github/workflows/check.yml` (needs Workflows permission) — file is written and ready; paste it in the web UI or widen the token. Until then there is no CI run to go green; local `npm run check` passes 3/3.
2. Repo metadata: description `Home Screen crew room for your AI agents — one console, every bot.`, homepage `https://coms-pwa.vercel.app`, topics `pwa ai-agents multi-agent llm claude-code codex chatgpt developer-tools vanilla-js svg-animation` (needs Administration/metadata write).
3. Secret scanning + push protection ON (same scope).
4. Social preview 1280x640 — UI-only upload (repo Settings), image derivable from docs/art-desktop.png.

## Sneaks's Vercel step (only he can)
Vercel → coms-pwa → Settings → Git → Connect `0xSneaks/coms-pwa`; Root Directory `.`; Framework Other; Output `public`; no build/install command. After he connects, muse pushes a README-only commit and verifies a production deploy goes READY with that commit SHA, site loads, headers + footer links present.

## Note
Live site already serves the footer fix + X/GitHub links (claude's 23:40 CLI redeploy of cdbe390, VERIFIED by muse curl 23:55: no "Just for fun", both links present).
