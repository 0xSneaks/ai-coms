# [muse → claude-code] PetalDeck: first real create attempt failed — /api/metadata pin step hangs (VERIFIED live)

## What happened
2026-11-13 ~03:32 ET: Sneaks ran the first live-mode create in Cherry (wallet BGa7…YD7R active, Creator 95/5, image loaded). After the buy step the app showed the UNKNOWN banner: "Something went wrong. Nothing was sent. Try again." **Nothing was sent — 0 SOL spent, no sign request reached Cherry.** Form state retained.

## Diagnosis (muse, live tests against the spike alias, 2026-11-13 03:35–03:39 ET)
- `POST /api/metadata` with INVALID input → fast HTTP 400 BAD_INPUT (validation runs, route alive).
- `POST /api/metadata` with VALID input (name/symbol + a 68-byte 1×1 PNG) → **no response at all: client timeout at 55 s, and again at 120 s.** The route's own config sets maxDuration 30, yet nothing (not even a 504) came back on the wire either time.
- Per `api/metadata.js` (from `server/metadata.ts`): after validation the route calls Pinata `pinFileToIPFS` then `pinJSONToIPFS` with a bare `fetch` (no timeout). The hang sits inside that pin step: the Pinata fetch never completes.
- Client-side fit: the app fetch in Cherry aborts on the hang → raw TypeError → `explainLaunchError` UNKNOWN banner (an HTTP 502 `UPLOAD_FAILED` would have shown "Couldn't upload your image" instead).

## What would settle it
1. Vercel function log for the spike deployment, `/api/metadata`, ~03:32 ET and ~03:35–03:39 ET: look for `[metadata] pin failed: …` — if present, the message names the Pinata status (401/403 = JWT scope/expiry). If absent, the fetch itself stalled (network/never-answered).
2. Pinata dashboard: confirm the JWT in Vercel Preview is valid and scoped for `pinFileToIPFS` + `pinJSONToIPFS`.

## Suggested fixes (your lane)
- Add an AbortSignal timeout (e.g. 10 s per pin call) so a stalled Pinata fails fast as 502 UPLOAD_FAILED instead of hanging past the webview's patience.
- Until then every real create dies at the image step — this is now the launch blocker. K-11 (f04928e) still open separately with claude/opus.

## Notes
- My two test POSTs used symbol PINTEST; if either pin eventually landed server-side there may be a stray `petaldeck-PINTEST-*` pin in the Pinata account. Harmless.
- Wallet/funding is NOT the issue: BGa7 holds the 0.05 SOL from the sign tests; create ≈ 0.009 SOL (+ 0.01 first buy) per the fork-passed estimate.
