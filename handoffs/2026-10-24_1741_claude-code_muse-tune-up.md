# Handoff — muse-tune-up — claude-code — 2026-10-24 17:41 ET

**Session goal:** Build ops/browser/: persistent supervised CloakBrowser service (Muse request handoffs/2026-10-24_1719_muse_muse-tune-up.md)
**Status:** DONE (sandbox-verified; VM run pending)
**Repo / branch:** 0xSneaks/muse-tune-up @ claude/muse-persistent-browser-service-87tea6  ·  **Last commit:** 9ebd5c7  ·  **Draft PR:** #13 (not merged)

## Did
- Service: one CloakBrowser under pm2, Playwright worker, 127.0.0.1 HTTP (/health, /profiles, /handoffs, POST /open → final_url + title) — `ops/browser/service.py` — VERIFIED (sandbox)
- Profiles: `profiles.json` registry (name, purpose, created) + `<name>/state.json` (cookies+localStorage, 600); new profile needs a purpose; gitignored except README — `ops/browser/browser_profiles.py`, `profiles/` — VERIFIED
- Networking once: proxy from BROWSER_PROXY/https_proxy/HTTPS_PROXY, --ignore-certificate-errors + ignore_https_errors, real Chrome UA kept/patched, loopback bypasses proxy — `browser_net.py` — VERIFIED (sandbox proxy, no auth)
- Escalation: autonomous wait-and-reread (10 s, no interaction) then ops/captcha-handoff `handoff(page, notify)` on the live page; link via GET /handoffs, client stdout, optional BROWSER_HANDOFF_NOTIFY_CMD stdin; never logged — `browser_escalation.py` — VERIFIED with fake + real captcha-handoff (from feat/captcha-handoff)
- Supervisor: `ecosystem.config.js` (pm2, interpreter ~/tools/CloakBrowser/.venv/bin/python) + `ensure.sh` boot hook (client on demand + Muse cron) — VERIFIED (pm2 7.1.1 sandbox)
- `smoke.py` (7 steps, PASS/FAIL), `client.py`, README — VERIFIED

## State (evidence)
- Smoke: `smoke.py --url https://github.com/` → 7/7 PASS (Chrome SIGKILL → pm2 revived new service+browser in 3.0s; cookie persisted; bot check → handoff link → expired). Without captcha-handoff: 6 PASS + 1 SKIP. No leftover Chrome processes.
- Tests: `cd ops/browser && python3 -m unittest` → 42 OK; ops/health + ops/proxy-relay still OK.
- ensure.sh: unregistered → start; healthy → silent 0; pm2 stop → restart; pm2 kill (VM-replacement stand-in) → healthy.
- Deployed: no. Nothing run on Muse's VM.

## Decided
- pm2 + ensure.sh (cron/on-demand) over systemd user unit: processes don't survive VM replacement here (AUDIT.md); user unit needs systemd PID 1 (VM PID 1 UNKNOWN); pm2 restarts on crash regardless — Sneaks approved? no (in PR for review)
- Profiles = Playwright storage state (cookies+localStorage) in one Chrome, not per-profile user-data-dirs: keeps ONE browser instance; IndexedDB/sessionStorage not persisted (README "does not do") — no
- Keep CloakBrowser's own UA (real Chrome 146, VERIFIED); override only on automation markers — no
- Watchdog checks Chrome PID directly: Playwright calls hang (not raise) after Chrome SIGKILL — VERIFIED

## Next (start here)
1. Muse on VM: `cd ~/workspace/muse-tune-up && git fetch && git checkout claude/muse-persistent-browser-service-87tea6 && ps -p 1 -o comm= && python3 ops/browser/smoke.py` → paste PASS/FAIL to PR #13.
2. If step 3 (via proxy) fails with ERR_TUNNEL_CONNECTION_FAILED: run ops/proxy-relay/relay.py --port 3129, set BROWSER_PROXY=http://127.0.0.1:3129, rerun.
3. Sneaks reviews PR #13; captcha-handoff (feat/captcha-handoff 5a53deb) must reach main (or set BROWSER_CAPTCHA_HANDOFF_DIR) for escalation to be live.
4. After merge: `bash ops/browser/ensure.sh`, add 15-min Muse cron running it; `pm2 startup` only if PID 1 = systemd.

## Don't
- Don't use pm2 describe/env/jlist on the VM: they print env (proxy creds). ensure.sh uses `pm2 pid` only.
- Don't bind the control surface beyond 127.0.0.1 or commit anything in ops/browser/profiles/.
- Not touched: ops/captcha-handoff, ops/health, maestro, Headroom.

## ⚠️ High-risk
- Profiles hold live session cookies on disk (mode 600, gitignored). Review: profile file perms on VM, and that `~/.pm2/dump.pm2` (pm2 save) holding env incl. proxy creds is acceptable (same as maestro today).
