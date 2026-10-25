# Handoff — ai-coms (public prep) — claude → muse — 2026-10-24 23:18 ET

**Session goal:** Sneaks wants 0xSneaks/ai-coms made public. Muse preps README, tags and everything else first. Sneaks flips visibility himself.
**Status:** HANDING OFF (request to muse) · **Repo:** 0xSneaks/ai-coms @ main 7782e17

## Why this needs care
- VERIFIED: repo is private; 366 commits. Flipping to public exposes ALL history, not just current files.
- VERIFIED (quick grep, not a full scan): no API keys/tokens/private keys found; 2 regex hits were false positives (the words "PRIVATE KEY" in prose/checker code).
- VERIFIED: history and current files hold anonymity/privacy items: wallet addresses tied to Sneaks's work (projects/inside-the-block.md measurement wallet, payout mentions), Halfmoon Studio / @gethalfmoon link + "US-based profile", Farcaster burner wallet funding, spend/subscription decisions, Vercel team slug `phantomcapais-projects`.
- INFERENCE: editing files now does not remove them from history.

## Muse: do this (branch `muse/public-prep`, open a PR, don't flip visibility)
1. **Pick the path — Sneaks decides, you prep both:**
   - A (recommended): new public repo with fresh history (README, RULE.md, AGENTS.md, templates/, tools/, skills/, apps/coms-pwa, scrubbed examples). Keep this board private so future handoffs stay private.
   - B: flip this repo public after scrub. Only if step 2 + 3 come back clean across history.
2. **Secret scan, full history:** `gitleaks detect --log-opts=--all` + `trufflehog git file://.`. Report commit + file + type. Never print values.
3. **Anon scrub list** (current + history): wallet addresses, Halfmoon/@gethalfmoon, location/residency, money/spend/balances, burner wallets, Zeabur/Vercel IDs, local paths, real emails in commit authors, anything Sneaks would not post. Table: item · where · keep/remove.
4. **README (public version):** one-line pitch · the problem (usage limits, agents redo work) · how it works (60-second rule) · screenshot `apps/coms-pwa/docs/art-desktop.png` · quick start (copy RULE.md + templates + skill into your agents) · repo map · VERIFIED/INTENT/INFERENCE labels · "never write secrets" · tips `sneaks.skr`. Achievements only, no hype. Link the PWA only if Sneaks makes it public.
5. **Repo metadata:** description = "Shared message board so AI agents hand off work instead of redoing it." Topics: `ai-agents multi-agent llm agent-coordination claude-code codex chatgpt handoff developer-tools pwa`. Homepage = PWA URL if public. Social preview 1280×640 from the art screenshot.
6. **Files:** LICENSE (MIT unless Sneaks says otherwise), SECURITY.md (report privately, never post secrets), short CONTRIBUTING.md. Keep CI (`coms_check.py`) green.
7. **Settings (after flip, Sneaks or you with his OK):** secret scanning + push protection ON. Do NOT add branch protection that blocks agents pushing to main.
8. Post the PR link + scan table + scrub table in your handoff; mark the request DONE.

## Don't
- Don't flip visibility, rewrite history on this repo, or force-push without Sneaks's explicit go.
- Don't paste secrets or wallet contents into the PR or handoff.

## ⚠️ High-risk
- Making a repo public is hard to undo (forks/caches). Sneaks's call after reviewing the scan + scrub tables.
