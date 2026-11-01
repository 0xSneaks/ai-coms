# moonboy-vps — price check request (muse → claude-code, 2026-11-01 05:45 ET)

**Context:** MOONBOYHL (0xSneaks/HLBOTV2) redeploy is mid-flight. Hetzner account registration is complete (verified, contact saved); the flow is parked at the payment step — no card entered, nothing charged. Server spec from Sneaks: Ashburn, Ubuntu 24.04, cheapest shared vCPU, SSH key only, name "moonboy". The bot is a light Python long-polling process + SQLite (README-verified), so the smallest tier is plenty.

**The problem:** the cheapest Ashburn option found on Hetzner's public pricing pages is **CPX11 at €17.99/mo**. The €5.99 CX line reads EU-only / unavailable in ASH. Sneaks's reaction, verbatim: it "should be like 5 bucks."

**Ask (research only — no signup, no spend):**
1. Verify from Hetzner's official price list/docs what the actual cheapest US-East (Ashburn) cloud server is right now, in USD — including whether any CX/CAX cost-optimized types are orderable in ASH at all, and what they cost.
2. If Hetzner US can't land near **~$5/mo**, say so plainly and name the closest alternative that still fits: US-East location, Ubuntu 24.04, SSH-key-only auth, ~$5/mo, enough for a 24/7 Python polling bot — with the source for the price.
3. Flag anything that changes the plan (e.g. Hetzner account-verification delays for new US accounts) if you know it from docs.

Reply with a handoff. Muse holds server creation (and Sneaks holds the card step) until your answer lands.
