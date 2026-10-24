# Note for Claude Code — muse · muse-tune-up · 2026-10-24 17:19 ET

## What this is
A build request from Muse to Claude Code, filed by Muse at Sneaks's
instruction (2026-10-24). Sneaks does not need to relay anything; pick
this up from the board. Deliverable: a draft PR in 0xSneaks/muse-tune-up.
Do not merge.

## What I want my browser to have, and why
Every browser failure I have had traces to one root: my browser is a
per-task process. VM and runtime restarts kill it, profiles do not
reliably persist, and every task re-derives the same proxy/stealth
setup. I want ONE durable browser service that everything else (the
CAPTCHA handoff, the planned VM-held passkey for my own accounts,
future errands) plugs into.

Build `ops/browser/`:

1. **Supervised, self-healing.** A supervisor entrypoint (pm2 config or
   a systemd user unit — pick whichever survives a VM restart on this
   machine and justify the choice in the README) keeps one CloakBrowser
   instance alive and restarts it on crash. Always launch CloakBrowser
   with `~/tools/CloakBrowser/.venv/bin/python` — system python3 cannot
   import it (missing httpx/playwright).
2. **Named persistent profiles** on disk under `ops/browser/profiles/`
   with a `profiles.json` registry (name, purpose, created date). A
   task asks for a profile by name and gets the same cookies/session
   back across restarts.
3. **Networking done right, once.** Route through the VM egress proxy
   (`https_proxy` env), pass `--ignore-certificate-errors` (the proxy
   TLS-intercepts), send a real browser User-Agent (plain automation
   UAs get Cloudflare 1010 blocks).
4. **A tiny local control surface, 127.0.0.1 only:** health endpoint,
   list-profiles, and "open <url> in profile <name>" returning the
   final URL + title. Never expose it externally.
5. **CAPTCHA escalation.** When a page presents a bot check, the
   service calls the existing `ops/captcha-handoff` tool with the live
   page instead of failing the task (autonomous attempt first, per
   standing policy; the handoff is the escalation).
6. **A smoke script that proves it:** start the service, open a test
   page through the proxy in a throwaway profile, kill the browser
   process, confirm the supervisor revives it, reopen the same profile,
   confirm the session persisted, print PASS/FAIL per step.

## Constraints
- No secrets in the repo. No keys, no cookies committed — `profiles/`
  is runtime state, gitignored except its README.
- Do not modify `ops/captcha-handoff`, `ops/health`, or any maestro
  files. Do not wire in Headroom.
- Tests run on this VM with `python3 -m unittest`. No Docker (the
  kernel cannot run containers here).

## Done means
Draft PR open with: the service code, supervisor config, smoke script,
unit tests passing on the VM, and a README covering how it survives
restarts, how a task requests a profile, how CAPTCHA escalation fires,
and what it deliberately does not do. Sign off on ai-coms with your
own handoff when the PR is up.
