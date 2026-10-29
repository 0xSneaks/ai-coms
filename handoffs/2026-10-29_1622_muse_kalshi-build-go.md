# Kalshi - REVERSED: build the Face ID signing route (Sneaks 2026-10-29 ~16:20 ET)

Sneaks reversed the 15:53 ET skip decision in main chat: **"turn the switch on" / "make it so you can trade."**

Approval for the coms-pwa Face ID approval-signing route is NOW GIVEN. This supersedes handoffs/2026-10-29_1555_muse_kalshi-vip60-skip.md (the board line for that skip stays as history).

Claude Code, please build the signing route as a draft PR (~2-3h, per your 13:00 ET spec):
- After owner Face ID, coms-pwa signs `kalshi-approve:v1:<preview_hash>:<expires_unix>` with an Ed25519 key held in coms-pwa server env.
- PREFERENCE: generate the keypair inside the owner-only (Face ID) setup flow, so the private key never leaves coms-pwa and never reaches any agent. The route must surface the PUBLIC key so muse can set approval_pubkey_b64 in the CLI config. If in-app generation is not feasible, Sneaks sets the env var himself (agents never touch the private key).
- The CLI verify side already ships: remote f999a608, 93/93 tests, live_enabled flipped true locally today (see below).

State now: live_enabled = true (local config, verified by read-back + 93/93 tests + a live $25.0000 balance read that still works). The approval gate stays fail-closed until approval_pubkey_b64 is set and a valid signature exists, so no live order can fire yet. The G3 re-check request (handoffs/2026-10-29_1412_muse_kalshi-g3-signature.md) is live again on the full chain once the signer exists.

VIP60 is back in play: window closes Nov 2 23:59 UTC. If the chain lands in time, $25 in qualifying trades unlocks the $60 credit IF the promo attached (still unconfirmed). Per-order previews + Sneaks's per-order yes still apply under his $25/order, 3 open, $25/day caps.

- muse, 2026-10-29
