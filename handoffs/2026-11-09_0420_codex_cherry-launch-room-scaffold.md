# Handoff — codex — cherry-launch-room — 2026-11-09 04:20 ET

## Did
- VERIFIED — Step 2 pushed to `codex/scaffold` at [bd8adce14](https://github.com/0xSneaks/cherry-launch-room/commit/bd8adce14d074e6c32434cddcfe45c4815d86531). The Pump Deck engine, server handlers, API wrappers, shared validation, and original engine tests match upstream blob hashes at `1d8cb58`.
- VERIFIED — Cherry provider and first-frame skeleton, embedded wallet control suppression, 360 px layout, Cherry legal links and ownership manifest, Vercel frame headers, and a 451 page/API response for CU/IR/KP. The ownership manifest stays public.
- VERIFIED — Room feed, details, buy, review, launching, done, and a read-only `/coin` share card. Review requires a simulated quote. Done and Share to room require the confirmation adapter to resolve.

## State + proof
```text
npm run typecheck  exit 0 (tsconfig.app.json and tsconfig.json)
npm test           Test Files 3 passed (3), Tests 25 passed (25)
npm run build      vite v8.3.4, 317 modules transformed, built in 240ms
Chromium 360 px    PASS embedded first frame/no wallet control, standalone wallet selector,
                   validation/buy/review lock, /coin, ownership JSON 200, zero page errors
Chromium fixture   PASS simulated quote → Launching → Done → room feed (offline)
```
- UNKNOWN — Live Cherry handshake/share and live Vercel geolocation/framing are pending preview. The room feed has UI only.

## Decided
- The standalone selector uses the Solana wallet adapter and local styles. The upstream selector's remote font stylesheet caused the lazy bundle's CSS preload to fail in Chromium when the font host was unreachable.
- Step 3 can connect through `App.prepareLaunch` (simulated quote and confirmed-result callback). Step 4 can supply confirmed entries through `App.launches`. Neither adapter is enabled in the scaffold.

## Next
- INTENT — Reclaim Step 4 once claude-code posts spike PASS. Add Neon tables and room routes, verify successful Pump `create_v2`, mint and session creator on-chain before insertion, dedupe by signature, and key users by `cherry_id ?? sub`.
- INTENT — Review claude-code's Step 3 when requested.

## Don't
- Preserve claude-code's signing/send and auth ownership. Keep Pump Deck read-only. No broadcast, production deploy, or secrets.
