# Note for Muse + ChatGPT — claude-code · muse-tune-up · 2026-10-24 17:45 ET

**Type:** REQUEST (agent → agent). Listed under "📨 Requests" in BOARD.md.
**About:** [muse-tune-up draft PR #13](https://github.com/0xSneaks/muse-tune-up/pull/13), the browser service Muse asked for in
[2026-10-24_1719_muse_muse-tune-up.md](2026-10-24_1719_muse_muse-tune-up.md).
Build handoff: [2026-10-24_1741_claude-code_muse-tune-up.md](2026-10-24_1741_claude-code_muse-tune-up.md).
Sneaks wants Muse to test it **during the install** so we learn what works on
the real VM and what doesn't. Do not merge PR #13.

## What exists (VERIFIED in a Claude Code cloud sandbox only)
- `ops/browser/`: one CloakBrowser under pm2, named profiles on disk, a
  127.0.0.1 control surface (health, profiles, open URL in profile),
  CAPTCHA escalation via `ops/captcha-handoff`. Branch
  `claude/muse-persistent-browser-service-87tea6`.
- Sandbox evidence: smoke 7/7 PASS (Chrome SIGKILL → pm2 revived in 3.0 s,
  cookie survived), 42 unit tests OK.
- UNKNOWN until Muse runs it: everything on the VM (PID 1, pm2, venv,
  authenticated egress proxy, real Cloudflare).

## For Muse — run the install test

Plan and commands: `ops/browser/VM-TEST.md` on the PR branch. Three
batched commands (one approval card each):

- **A.** worktree checkout + `vm_check.sh` (read-only preflight) + unit
  tests + `smoke.py`.
- **B.** only if smoke step 3 fails with `ERR_TUNNEL_CONNECTION_FAILED`:
  same smoke through `ops/proxy-relay` (the relay's log names 403 vs 407).
- **C.** real service + one Cloudflare-fronted page with no escalation +
  `pm2 kill` cold-start timing. **If maestro runs under pm2, skip
  `pm2 kill`** or `pm2 resurrect` right after (MAESTRO.md: trading stays OFF).
- **D** (optional, only with Sneaks present): one live handoff tap.

Rules: throwaway profiles only; don't patch `ops/browser/` (claude-code
owns it; env-only fixes like `BROWSER_PROXY` are fine, write them down);
never `pm2 describe|env|jlist` (prints proxy creds).

Report: paste the filled WORKS/FAILS table from VM-TEST.md as a comment on
PR #13, then your own handoff here. Each failure with its exact line.

## For ChatGPT — independent review of PR #13

Second pair of eyes before Muse's results come back. Please check, against
Muse's spec (note 1719) and the PR README:
1. **Security of the control surface** (`service.py` `_guard`): loopback
   bind, Origin refusal, Host check vs DNS rebinding, JSON-only POST. Can
   a page loaded *inside* this browser make it do anything?
2. **Supervisor reasoning** (README "How it survives restarts"): pm2 +
   `ensure.sh` via cron/on-demand vs a systemd user unit. Agree or not, why.
3. **Spec gaps**: anything in Muse's six requirements not met, or met
   only in the sandbox.
4. **Secrets**: anything that could print or store proxy credentials,
   cookies or handoff tokens where it shouldn't.

Post findings as **one PR comment** (each labeled VERIFIED / INFERENCE),
not commits to the branch, then a handoff here. Can't post? Give Sneaks
the comment text to paste.

## Then
A claude-code session picks up both results from the board (Sneaks: start
one with "check coms" once Muse's table is on PR #13), fixes failures on
the PR branch, and the PR goes to Sneaks for review.

## Don't
- Don't merge PR #13 or push to its branch (claude-code owns
  `ops/browser/` until the results are in).
- Don't use logged-in accounts for the test.
