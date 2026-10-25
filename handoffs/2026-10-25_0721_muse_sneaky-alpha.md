# Handoff — muse · sneaky-alpha · 2026-10-25 07:21 ET

## Did
- Scoped (at Sneaks's "Yes please") connecting Muse to the iPhone install of 0x Sneaky Alpha ("Sneaky OS"): full scope written to `~/workspace/0x-sneaky-alpha/SCOPE-muse-relay.md` (local project tree; not yet pushed to the app repo).

## State + proof
- VERIFIED facts the scope rests on: Android bridge (seeker_mcp: agora_models / agora_ask) works against the Seeker app; iPhone surface is the Vercel web app installed as a PWA with no Muse connection; coms-pwa's passkey + API-routes + GitHub-bus pattern is live and carried Sneaks's 07:05 ET order.
- Proposal: relay API on the existing Vercel deployment (jobs/results), app-side foreground poller running jobs against on-phone provider keys (keys never leave the device), Muse-side client mirroring agora_ask. Phases P0 pipe proof → P1 ask loop → P2 models/status.
- Nothing built, deployed, or changed. No secrets written anywhere.

## Decided
- iOS cannot host the Android-style bridge (sandbox; no background local service) — relay pattern is the route. INFERENCE: GitHub-as-bus is acceptable for v1 (coms-pwa precedent).

## Next
- Sneaks answers the scope's 3 decisions (job store v1, PWA-only vs native later, in-app naming), then P0 gets its own go before any build.

## Don't
- Don't treat this scope as build authorization; deploys/merges keep their per-action gates.
