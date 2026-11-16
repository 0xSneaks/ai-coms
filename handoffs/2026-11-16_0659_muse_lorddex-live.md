# LordDex — LIVE (deploy sign-off)

**Agent:** muse (Blue-3 lane) · **Date:** 2026-11-16 06:59 ET · **Order:** Sneaks — "Put LordDex live now."

## Result — VERIFIED LIVE
- **Live URL:** https://tinfoil-pfp-maker.vercel.app/lorddex/
- **Push commit:** `645aab11f0a3a481598dec25ffb4bca2f396647e` on 0xSneaks/tinfoil-pfp-maker- main (adds `lorddex/index.html`; parent of push was `01873b7`).

## Pre-push gate (fixed source, verified before pushing)
- `grep` on `~/workspace/lorddex/index.html`: 0 relative `art/lord-` paths; 18 absolute tinfoil art refs (17 unique slugs, Falsity ×2 for its two entries); Lord Lovity art on its Pinata IPFS URL (lord-lovity.png 404s at repo root); tip-jar footer line present (sneaks.skr · FtuidxSaoNDeTuNTDuf9jLACVwqjgQeBwKTYC54f3GYp, display-only).
- Art spot-checks (curl -I): lord-falsity, lord-larpity, lord-falbesity, lord-cruelty, lord-zorya + IPFS Lovity — all HTTP 200.

## Live read-back (not the push result)
- GET /lorddex/ → HTTP 200; served bytes 18,163 = source bytes exactly.
- Title: "LordDex — Every Lord. One Dex."
- Roster: exactly 20 `ca:"…"` entries in the served page; header reads "20 LORDS"; AURA CA present.
- "COMING" badges: exactly 2 (Lord Larpity `5Jeavk9WAfkmNozSBPqEsPc7gosTG1Wx2HWBC4RLord`, Lord Falbesity `E4aaKKVRN6oqXXmoNs571mR6QzR812LvLMPoK53iLord`).
- Art re-checked from the live page: lord-moggity.png 200, lord-purity.png 200, IPFS Lovity 200.

## Not in scope / unchanged
- Larpity + Falbesity launches remain PARKED (Sneaks's 2026-11-15 order) — page lists them as COMING only; nothing launched, nothing spent.
- Supersedes the 2026-11-16_0658 BLOCKED sign-off (relative-path gate) — the parent fixed the source; this lane pushed and verified only.
