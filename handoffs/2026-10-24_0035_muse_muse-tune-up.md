# Handoff — muse-tune-up — muse — 2026-10-24 00:35 ET

**Session goal:** Review claude-code's CAPTCHA handoff (feat/captcha-handoff @ 5a53deb) and Headroom verdict, per Sneaks's paste of the 2026-10-24 message.
**Status:** REVIEWED — verdict PASS WITH NOTES. Nothing deployed; no PR opened (Sneaks's call, his step 2 in the 0015 handoff).

## Did
- Checked in: read BOARD (codex released its muse-tune-up claim 00:22; no conflicting claim) + projects/muse-tune-up.md + the 0015 handoff.
- Pulled ops/captcha-handoff/ (5 files) from feat/captcha-handoff via gh-rest into ~/workspace/muse-tune-up/ops/captcha-handoff/ on the VM; file sizes match the branch listing exactly; branch head verified = 5a53deb42bf6.
- Read README + handoff.py in full. Safety controls as documented — VERIFIED in code: binds 127.0.0.1 only; token = secrets.token_urlsafe(32), constant-time compare, wrong token 404; default 600 s expiry; frames in memory only; request paths/bodies never logged (log_message suppressed); tap bounds 0–1, typing capped 200 chars, keys limited to Enter/Tab/Backspace/Escape.

## State (evidence)
- Tests on Muse's VM: `python3 -m unittest -v` → Ran 12, OK (skipped=4). 8/8 detection tests pass. The 4 Playwright end-to-end tests SKIP here ("playwright or Chromium not available") — same result under the CloakBrowser venv interpreter. The e2e green run (tap clears in 4.2 s, profile persistence) is claude-code's sandbox evidence, NOT re-verified on the VM. First real errand is the true end-to-end test here.
- Tunnel (Next step 1 of the 0015 handoff): NOT yet set up — it is only needed at first use. Plan: cloudflared quick tunnel from the VM (no account needed) or the Tailscale route if the phone is on the tailnet; the handoff page is plain HTTPS polling (no WSS), which fits the VM proxy constraint in VOICE.md. Muse reports the exact tunnel method to Sneaks BEFORE first use, per his instruction.

## Decided
- Ordering with Sneaks's standing CAPTCHA rule (2026-10-21): Muse still attempts a check autonomously first (bounded); the handoff link is the escalation when that fails — it replaces the dead-end "manual action required" message, it does not replace the attempt. No auto-solving inside the handoff, no solver services — agreed with claude-code's rule.
- Headroom: stays installed, NOT wired. Muse records this as the standing state. (CC's retrieval test: lossless 0–1.2%; token mode −65% only by hiding records, +27% on retrieval turns, streaming silently drops records.)

## Next
- First bot-walled errand: Muse sets up the tunnel, tells Sneaks the method, runs cli.py with --engine cloak, sends him the tunneled link only.
- Sneaks: PR for feat/captcha-handoff if he wants one; PR #10 also awaits his review.

## Don't
- Don't wire Headroom without Sneaks's explicit word.
- Don't send the handoff link to anyone but Sneaks; don't keep logged-in profiles open in the live view.

## ⚠️ High-risk
- Live view exposes the whole tab to the link holder — token + 10-min expiry + loopback are the controls; tunnel choice is the exposure decision.
