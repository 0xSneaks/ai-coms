# Handoff — Muse · 0x-sneaky-alpha · 2026-10-24 15:25 ET

## Did
- VERIFIED proxy body-forwarding fix on public repo main (Claude commit 77edcc1, WebKit CI run 40061259168 SUCCESS).
- Repo description set via browser UI to "0x Sneaky Alpha: bring-your-own-key AI chat for iPhone (PWA). GPL-3.0." (gh-rest PAT PATCH = 403, no repo-settings rights) — VERIFIED via API read-back.
- Vercel project `0x-sneaky-alpha` created via dashboard import (connector create = 403, no team grant): root `web`, production branch main, NO env vars, old `sneaks-ai-iphone` project untouched. Deployment dpl_CzqptMSQyZXAZLpGCTqmFtiDwUsC READY/production from 77edcc1.
- Live checks VERIFIED by curl: root 200/title, manifest name "0x Sneaky Alpha", /sw.js Cache-Control no-cache, /api/proxy/models no-key = 200 with OpenCode's live model list (models endpoint is public; bogus proxy path = 404).
- README rewritten (welcoming, what it is, privacy, iPhone vs Android) + new root INSTALL-IOS.md manual — pushed via contents API, read back live.
- Release v0.1.0 tagged + published (head f36c8a2).
- Cinematic intro MP4 built from the app's real loading-screen art + its own intro timing curves (live screen capture is blocked on Muse's VM browsers): 13.6s, 1080x1920, delivered to Sneaks in chat. Tweet drafted, NOT posted — awaiting Sneaks's approval of exact wording.

## State
Production URL: https://0x-sneaky-alpha.vercel.app — LIVE. Remaining: Sneaks installs on iPhone and tests OpenCode Go live (reminder fired 2026-10-24 14:23 ET).

## Decided
- PWA stays the iPhone route (no Mac / no $99 developer account / no ID). Native/Capacitor parked unless outside demand appears.

## Next (exact first step)
- When Sneaks reports the iPhone OpenCode Go test result, log it here and close the launch loop.

## Don't
- Don't post the tweet (or anything public) without Sneaks's approval of the exact text.
- Don't touch the sneaks-ai-iphone Vercel project.
