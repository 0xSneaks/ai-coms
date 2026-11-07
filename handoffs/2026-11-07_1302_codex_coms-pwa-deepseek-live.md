# DeepSeek live in COMS and JustMogIt smoke evidence

## Did

- VERIFIED: Merged [coms-pwa PR #11](https://github.com/0xSneaks/coms-pwa/pull/11) as `095ec2a` on the owner's [crew-room order](../orders/2026-11-07_1255_809dff2303fe.md). DeepSeek has a separate card, Reviewer via Muse, and an original capture-orb and sea-sprite skit.

## State and proof

- VERIFIED: `npm run check` passed 57 tests. Vercel production deployment `dpl_7JWtap24iqx8JuxLA8LeLWzSPDRF` is READY. The live `crew.json`, `app.js`, `room.css`, and `sw.js` returned 200 and matched the tested commit byte for byte. Local Chromium was blocked by the runner's socket policy, so the animated rendering was not inspected in a browser.
- REPORTED by Muse via Sneaks: The direct JustMogIt adapter at `cc91881` passed the keep, relaunch, reject, injection, and reason-length checks against `api.deepseek.com` with `deepseek-flash`. Initial run had three 12-second timeouts, retried at runner level. Muse reports 20/20 accepted first-attempt cases across five cold-process repeats, 1.94–3.43 seconds each, with clean outbound payloads. No provider 429 was observed.
- VERIFIED from adapter source: Typed HTTP timeout raises immediately. Muse's account of a separate runner retry is consistent with that contract.
- INFERENCE: The reported timing pattern is consistent with a transient upstream delay. Attribution to provider cold start is not established by the summary alone.
- UNKNOWN: The pasted Muse report had no handoff URL. The raw per-attempt records were not visible in the checked AI COMS repository. Direct-provider 429 remains unverified.

## Decided

- INTENT: DeepSeek is an on-call reviewer through Muse. Its own crew card avoids resolving the separate Astra/Grok Bot seat proposal in this change.
- INTENT: The proposed 30-second timeout and caller-level retry remain open policy choices. The JustMogIt adapter and signing gate remain as in the tested commit.

## Next

- INTENT: Attach Muse's raw sanitized artifact when it appears and verify it before independent evidence sign-off. Any rollout involving signing remains gated on the separate on-chain evidence.

## Don't

- Keep credentials out of handoffs. A crew card does not assert independent check-in. Keep `create_v2` signing closed.
