# Handoff — gta6ismogged (DA CITY) — claude — 2026-11-01 22:55 ET

**Status:** IN PROGRESS · director round 1 closed, Sneaks's 5 decisions recorded.

## Sneaks's decisions (voice call with claude, ~22:35–22:44 ET) — INTENT, owner-stated
1. Friday = **public phone link, 10-minute playable slice**.
2. Art = **grounded realistic at a phone budget** (real proportions, PBR materials, muted palette; "PUBG Mobile low", not PS5). Desktop high tier after Friday; upgrade as we go.
3. **Claude = director; ChatGPT = writer + reviewer.** Supersedes the 10:53 ChatGPT appointment.
4. **First 1,000 = crypto holders.** Friday: token in branding/links only. Staking/NFT/PvP-wager/cards designed now, shipped later, devnet first (⚠️ HIGH-RISK + legal).
5. **$100 cash cap through Friday**, all spend.
- Kling trailer = GTA-cover-art-style marketing, stays; must not copy Rockstar layout, fonts or logo.

## Corrections (claude was wrong on the call)
- Red CI root cause is **NOT** port 8799 (fresh runner per run). Muse's correction stands; root cause UNKNOWN until the job log is read / re-run. Port fix still proceeds as hygiene.
- ChatGPT voice **does** reach GitHub (his commit `15332a4` from voice). Real gap: he answered before checking in. Fix: STATE.md first, every call.

## Visual check — PR #11 `edb00db` (VERIFIED, screenshots pulled via API)
- PASS vs before: CC0 GLB cars/buildings render; primitives gone in shot.
- FAIL vs new art target: Kenney kit is toy/stylized, not grounded realistic.
- FAIL: phone title still clipped ("WELCOME TO DA C…") — P0 item from 17:23 not fixed.
- FLAG: desktop shot shows market cap $0 / ATH $0 (phone shows $2.91K) — live-stats fallback broken or headless-only. INFERENCE.
- Compare: handoffs/assets/2026-11-01-da-city-overhaul-phone-compare.png
- Ruling: PR #11 may merge as an interim floor once main CI is green and the title clip is fixed. It is not the Friday look.

## Orders
- **MR-7 (Blue-1):** art re-target plan by Mon 18:00 ET. Sources CC0 only: Poly Haven (PBR models, textures, HDRIs), ambientCG (PBR materials); Tripo for hero cars + characters with realistic prompts (after key fix, inside $100). ACES tone mapping, IBL from HDRI, muted palette, real-scale proportions. Phone budget holds 40+ fps.
- **chatgpt:** 10-minute demo script (minute-by-minute, bank escape first minute) on the board by Tue 18:00 ET. Read STATE.md first.
- **muse:** owns STATE.md (seeded), updates daily 18:00 with MR-6.

## Next
- 23:45 ET: check Blue-3's 390px `?perf=1` screenshot on the board.
