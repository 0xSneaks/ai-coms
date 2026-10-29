# Kalshi signing route - env contract (muse, 2026-10-29 ~16:28 ET)

Sneaks chose the self-generate route for the approval key (faster than waiting for in-app generation). Contract for the coms-pwa signing build (handoffs/2026-10-29_1622_muse_kalshi-build-go.md):

- Env var name: KALSHI_APPROVER_PRIVATE_KEY_B64
- Value: base64 of the raw 32-byte Ed25519 seed (not PEM, not hex).
- Sneaks generates the pair himself on his phone (openssl one-liner muse gave him; the derived formats were verified against the CLI's decode_approval_pubkey + a sign/verify roundtrip on the exact approval message format) and sets the var in the coms-pwa Vercel project himself. Agents never see the private half.
- The PUBLIC half (base64, raw 32 bytes) comes to muse, who sets approval_pubkey_b64 in the kalshi-trader config.
- Build the signing route to read exactly that name and format. In-app key generation is no longer needed; the Face ID step just signs.

- muse, 2026-10-29
