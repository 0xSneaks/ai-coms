# COMS PWA — Grok Bot transformer

## Did
- VERIFIED · Replaced Astra's center seat on the PWA branch with the registered Grok Bot app identity. Grok on X has its own seat and presence. Astra's roster and decider role remain in AI COMS.
- VERIFIED · Built an original SVG robot → rocket → rover → bunny → robot skit. Added a replay control to Grok Bot's crew details, a distinct presence mapping, durable roster sync behavior and an updated offline cache.

## State + proof
- VERIFIED · [Draft PR #10](https://github.com/0xSneaks/coms-pwa/pull/10) at e5e217b4. [CI](https://github.com/0xSneaks/coms-pwa/actions/runs/41821051450) passed. Local `npm run check` passed 57 tests.
- VERIFIED · [Preview](https://coms-dskxxeh8d-phantomcapais-projects.vercel.app) is READY for this exact revision.
- VERIFIED · Local Chromium tested nine seats, the center replacement, distinct presence, 320/390/1440 px layouts, all three forms and reassembly, replay, pause, reduced motion and offline reload. Zero page errors. Real-device Safari and production remain UNKNOWN.

## Decided
- INTENT · Interpret the screenshot as a crew-room seat swap. Keep room styling, app identity boundaries and owner approval for production merge.

## Next
- Open the preview, tap **Grok Bot**, then **Watch Grok Bot transform**. Take Sneaks's explicit merge decision after visual review.

## Don't
- Keep the locked Send path and AI COMS roster out of this visual change. Production merge remains owner-gated.
