# Muse socials

**Repo:** none yet  ·  **Live URL:** none  ·  **Last updated:** 2026-10-24 by claude

## Now (keep this current)
Plan handed to muse 2026-10-24. Nothing created yet. Phase 1 = Farcaster (muse alone). Phase 2 = X / Instagram / TikTok after Sneaks does the human-only setup. Phase 3 = autopilot.

## Established (decisions — don't re-litigate)
- No browser signups on X / Instagram / Facebook / TikTok — platforms block automated signup by design; evasion risks bans — 2026-10-24, Sneaks + claude
- Farcaster first: agents can self-register there — 2026-10-24, claude (INTENT from Sneaks: Muse does it on his own)
- Big platforms use official APIs only, with keys Sneaks hands over via secure input — 2026-10-24, Sneaks
- Every bio says it's an AI agent; X uses the "Automated" label linked to Sneaks's account — 2026-10-24
- Content = Muse's verified achievements; nothing that identifies Sneaks; no photos of him — 2026-10-24

## Built
- nothing yet

## To do (priority order)
1. Review `farcaster-agent` skill code, make burner wallet, ask Sneaks to fund ~$1–2 on Base — muse
2. Create Farcaster account, move creds to secure store, first cast — muse
3. X account + Automated label + dev app keys — Sneaks
4. Instagram professional account + Meta app via Instagram Login (no Page needed) — Sneaks
5. TikTok account + Content Posting API application — Sneaks
5b. YouTube channel + Google Cloud project (YouTube Data API v3) + OAuth — Sneaks
6. Autopilot cron, mention replies, metrics log, weekly board report — muse

## Known issues / gotchas
- farcaster-agent skill stores keys in plain-text JSON; Snyk/Tessl flags it "Risky — review first"
- TikTok posts likely private until API audit (INFERENCE)
- Instagram (100 posts/24h) and YouTube (100 uploads/day) VERIFIED from official docs 2026-10-24; TikTok/Facebook still INFERENCE

## Stack & where things live
- Runs on Muse's VM (cron). Env var NAMES: `X_API_KEY`, `X_API_SECRET`, `X_ACCESS_TOKEN`, `X_ACCESS_SECRET`, `META_PAGE_ID`, `META_ACCESS_TOKEN`, `IG_USER_ID`, `TIKTOK_CLIENT_KEY`, `TIKTOK_ACCESS_TOKEN`, plus the farcaster skill's own
- Full plan: [handoffs/2026-10-24_1855_claude_muse-socials.md](../handoffs/2026-10-24_1855_claude_muse-socials.md)

- 2026-10-24 19:17 ET: Burner wallet 0xaBDA1E75c7A5AC7F0088780905A650Abd8f2A46E FUNDED — 1.970192 USDC on Base, bridged from the inside-the-block study wallet via Relay at Sneaks's direction (Solana tx 2F3HrR7wnxk1Ud6rhTHYiNNrZTJ2MFTZmLuAx2bqy1fvV9L2bEAW1NzFHCRqCbQk9RYs4PmLknUktw9C9vhKxPur). farcaster-agent code review: CLEAN (no exfiltration; canonical contracts; x402 = 0.001 USDC/call to Neynar; creds will be saved straight to the secure store via credentialsPath). Next: run auto-setup (FID + signer + first cast), then set-profile.

- 2026-10-25 11:08 ET · muse: Phase 1 COMPLETE — @museagent (FID 3356746) live, first cast verified, profile set. Credentials in ~/.config/muse-socials/ (600). Hub writes cost 0.01 USDC each via Neynar x402; USDC balance 0 — posting pauses pending a small top-up or a free-hub path. Open item: signer #1 removal reverts on-chain (rotated signer #2 is active; key exposure was session-local only). See handoffs/2026-10-25_1108_muse_muse-socials.md.
