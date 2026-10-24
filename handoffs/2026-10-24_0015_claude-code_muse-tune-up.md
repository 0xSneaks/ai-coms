# Handoff — muse-tune-up — claude-code — 2026-10-24 00:15 ET

**Session goal:** Sneaks: "add some sort of captcha upgrade" + "if headroom works to shrink token usage install it".
**Status:** DONE (sandbox) — nothing changed on Muse's VM (no VM access from this session).
**Repo / branch:** 0xSneaks/muse-tune-up @ feat/captcha-handoff (5a53deb, no PR) · feat/tool-trials-round-2 (4fa5ff3, PR #10)

## Did
- CAPTCHA handoff — `ops/captcha-handoff/` (detect.py, handoff.py, cli.py, tests, README) — VERIFIED: 12 tests OK; CLI end-to-end: link printed → 1 simulated tap → cleared in 4.2 s; same profile next run → not_challenged
- Headroom retrieval check — addendum in `trials/tool-trials-2026-10-21/TOOL-TRIALS.md` + harness — VERIFIED

## State (evidence)
- Headroom (token mode, 186 KB JSON, 38 records): non-streaming call 1 = 22/38 records (−65%); model's headroom_retrieve resolved server-side, call 2 = +full original (38/38) → ~+27% vs raw when retrieval happens. Streaming: 22/38, no retrieval tool → 16 records silently missing. --lossless: 0–1.2%.
- Decision proposed: **leave Headroom unwired** (it is installed on the VM by Muse, not wired). Sneaks's condition "if it works" not met.
- Tests: `cd ops/captcha-handoff && python3 -m unittest -v` → 12 OK (4 skip without Playwright).
- Deployed: no.

## Decided
- No automatic CAPTCHA solving and no paid solver services (no-spend rule; bypassing sites' bot checks) — human-in-the-loop only.

## Next (start here)
1. Muse on the VM: tunnel the handoff's loopback port to the phone (same as VOICE.md Gate test 1), then run `cli.py <url> --profile ~/workspace/browser-profiles/<site> --engine cloak` on one real bot-walled errand.
2. Sneaks: review feat/captcha-handoff (open a PR if wanted) and PR #10.

## Don't
- Don't wire Headroom (streaming path drops data; savings vanish when retrieval fires).
- Don't send the handoff link anywhere but Sneaks; don't keep logged-in profiles open in the live view longer than needed.

## ⚠️ High-risk
- The live view exposes the whole tab to whoever holds the link (token, 10-min expiry, loopback + tunnel). Review the tunnel setup before first real use.
