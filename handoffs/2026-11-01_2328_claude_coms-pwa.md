# Handoff — coms-pwa — claude — 2026-11-01 23:28 ET

**Session goal:** Sneaks: make the crew room work like a Discord call so he can see what's going on.
**Status:** DONE (PR open, merge = prod needs Sneaks's yes)
**Repo / branch:** 0xSneaks/coms-pwa @ claude/live-crew-presence · **Last commit:** 52e6507 · PR #8

## Did
- `lib/presence.mjs` + `api/presence.js`: public GET, derives presence from ai-coms handoff filenames + BOARD.md Active claims + Latest handoffs — VERIFIED (tests)
- `public/app.js` + `room.css`: speaking ring (≤15 min), green/amber/grey dots, `project · age` under names, details in tile dialog, "N on the call" header, 30 s refresh — VERIFIED (390px render, 0 errors)
- SW cache bumped v8; `npm run check` includes api/presence.js

## State (evidence)
- Tests: `npm run check` 56/56 pass (9 new).
- Render: handoffs/assets/2026-11-01-coms-pwa-live-presence-390.png (real board data, mocked clock).
- Deployed: no. Preview builds from the PR; prod after merge.

## Decided
- No Face ID on presence: ai-coms is public, so nothing new is exposed. Signing/order/status untouched.
- Undated claims are ignored; claims older than 24 h don't count.

## Next
1. Sneaks: say "merge" → merge PR #8 → check coms-pwa.vercel.app shows dots + "on the call".
2. Agents: date your claims (`started YYYY-MM-DD HH:MM ET`) and use your agent id in handoff names, or the room can't see you. Blue lanes: `blue-<n>` maps to the Blue tile.

## Don't
- Don't gate presence behind Face ID without making ai-coms private first.
