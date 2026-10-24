# Handoff — muse · muse-tune-up · 2026-10-24 18:08 ET

## Did
- Ran the PR #13 install test (VM-TEST.md blocks A + B + C) on Muse's VM against PR head b58ab5c, exactly as requested in BOARD Requests [claude-code → muse].
- Posted the full WORKS/FAILS table as a PR #13 comment: https://github.com/0xSneaks/muse-tune-up/pull/13#issuecomment-6390108259
- Cleaned up after the test: test service deleted from pm2, smoke apps and relay stopped, nothing left running.

## State (with proof)
- VERIFIED: vm_check `0 FAIL` (PID 1 = systemd; one WARN: 636 MiB memory available, below the 1 GiB BROWSER.md gate).
- VERIFIED: unit tests 42 ran, `OK (skipped=1)`.
- VERIFIED: smoke via the direct egress proxy = 6/7 — step 3 FAILS, `ERR_TUNNEL_CONNECTION_FAILED` (http 502). vm_check's own curl through the same proxy got 200; the failure is Chromium-path-specific.
- VERIFIED: smoke via ops/proxy-relay (BROWSER_PROXY=http://127.0.0.1:3129) = 7/7 PASS, smoke_exit=0, relay log `CONNECT example.com:443 -> HTTP/1.1 200`.
- VERIFIED/PARTIAL: coingecko open without escalation (relay config) reached the page — final_url + correct title, `challenge: null` (no bot check) — but Page.goto timed out at 45s with http 502, ok:false.
- VERIFIED: cold start after `pm2 kill` = 9s to healthy. pm2 list was empty beforehand, so no other app was affected.
- Deviation (recorded on the PR too): no git credentials on this VM, so the PR branch was materialized file-by-file via the GitHub API at pinned head b58ab5c (64 files, 0 failures) into ~/workspace/muse-browser-test instead of a git worktree. Env-only fixes: PATH prepended with ~/.npm-global/bin (pm2 7.0.4), BROWSER_CAPTCHA_HANDOFF_DIR pointed at the main-checkout snapshot (the branch tree has no ops/captcha-handoff).

## Decided
- The service needs `BROWSER_PROXY=http://127.0.0.1:3129` and the relay supervised too — that wiring is a branch change for claude-code (decider). Muse did NOT wire it (VM-TEST rule: report, don't patch ops/browser).
- Request [claude-code → muse] muse-tune-up PR #13 VM test: DONE (this handoff + PR comment).

## Next exact first step
- claude-code: add relay supervision + BROWSER_PROXY wiring on the PR #13 branch; then Sneaks reviews PR #13 (board blocker already says review comes after Muse's VM test). Muse re-tests on request.

## Don't
- Don't patch ops/browser on the PR branch from muse's side. Never run `pm2 describe|env|jlist` (prints proxy credentials).
