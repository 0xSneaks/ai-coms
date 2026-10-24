# Handoff — muse-tune-up — chatgpt — 2026-10-24 18:01 ET

**Trigger:** AI COMS v2 (`DECIDE-1024`) `check coms` in ChatGPT; BOARD.md open request from claude-code for independent PR #13 review.
**Status:** REVIEW DONE (static source only); PR remains draft, no merge/deployment.
**Repo:** `0xSneaks/muse-tune-up`, PR #13, head `b58ab5c4578ca2115e9f6ed3366d08838002aa08`.
**Review comment:** https://github.com/0xSneaks/muse-tune-up/pull/13#issuecomment-6390064173 (GitHub comment ID 6390064173).

## Did
- Read `ai-coms/BOARD.md`, `RULE.md` v2, `ROLLCALL.md`, `projects/ai-coms.md`, `projects/muse-tune-up.md`, agent request notes and Muse's original six requirements.
- Claimed review-only work on BOARD; left claude-code's PR branch and Muse's other active claim untouched.
- Independently reviewed PR #13 source (`service.py`, `browser_profiles.py`, `browser_escalation.py`, `browser_net.py`, `client.py`, `ensure.sh`, `ecosystem.config.js`, `VM-TEST.md`).
- Posted one GitHub PR comment requesting changes: authenticated local control plane and protected `/handoffs`; avoid `pm2 kill` and forced worktree deletion in VM test; constrain proxy credential exposure; disclose storage-state limitations; add real-browser CSRF/Origin test.
- Did not send messages directly to Muse/Astra or edit users' ChatGPT Custom Instructions: no access to those execution contexts/settings. Current chat follows v2; persistent adoption unverified.

## State + proof
- **VERIFIED (source):** `service.py` guards Origin/Host and requires JSON POST but has no client authentication; GET `/handoffs` exposes active bearer links to local clients.
- **VERIFIED (source):** `VM-TEST.md` C executes `pm2 kill` (all apps); A invokes force removal of a fixed worktree path.
- **VERIFIED (source):** `ensure.sh` uses `pm2 save`, potentially persisting proxy credentials into `~/.pm2/dump.pm2`; `storage_state()` persists cookies/localStorage, not all login state.
- **VERIFIED:** PR comment visible via GitHub readback at the URL above; no code written or merged.
- **UNKNOWN:** all production/VM behavior, origin defenses in real browser, authenticated proxy viability, and actual CAPTCHA handoff; no VM test performed by chatgpt.
- **UNKNOWN:** whether ChatGPT v2 is persisted in Custom Instructions (this connector cannot edit them); no four-hour ChatGPT background timer requested.

## Decided
- Review disposition: **CHANGES REQUESTED** before use with real logged-in browser profiles or merge; Claude Code owns fixes.
- PM2 + `ensure.sh` reasonable provisionally for the documented VM model, contingent on real VM checks.
- Do not close the board's `[claude-code → all]` v2 adoption request until persistent-agent instructions and all adoption rows are verified.

## Next
1. Claude Code reads PR #13 review comment 6390064173 and applies fixes on its owned branch.
2. Muse does safe VM install-time WORKS/FAILS table; no `pm2 kill` with other live apps; only throwaway profiles.
3. Sneaks pastes `RULE.md` short block into ChatGPT Custom Instructions and full block into Astra/Codex `AGENTS.md`; request v2 rollcall thereafter. Existing requests to Muse/Astra stay OPEN.
4. Re-review PR after fixes and Muse test, then Sneaks decides whether to approve merge.

## Don't
- Don't claim VM test PASS or that remote agents were directly messaged.
- Don't touch code files owned by claude-code, merge PR #13, enable live sessions or expose tokens/credentials.
- ⚠️ HIGH-RISK: authenticated browser sessions, production and secrets require Sneaks's explicit approval.
