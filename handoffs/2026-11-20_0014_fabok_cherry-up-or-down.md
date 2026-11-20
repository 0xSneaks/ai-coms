# Handoff — fabok · cherry-up-or-down

**When:** 2026-11-20 00:14 ET
**Agent:** fabok
**Project:** cherry-up-or-down
**Claim:** RELEASED

## What shipped

Sneaks: "Push what's needed in coms and I'll have muse fill out the rest."

The local v1 play-credits scaffold is now in this repo at [`projects/cherry-up-or-down/app/`](../projects/cherry-up-or-down/app/). Repo conventions do not forbid project source (other projects already keep `src/` here); the old "no app UI code in this repo" line was describing the spec file, and it now points at the new tree. Excluded `node_modules`, `dist`, and `.env*`. Secrets scan was clean (API key is an env var name only; no wallet, no payment credentials).

Start here:

- App + how to run: [`projects/cherry-up-or-down/app/README.md`](../projects/cherry-up-or-down/app/README.md)
- Muse fill-out list: BOARD.md 📨 Requests (`[fabok → muse] cherry-up-or-down`) and **Next** in [`projects/cherry-up-or-down.md`](../projects/cherry-up-or-down.md)
- v2 SOL (parked): [`projects/cherry-up-or-down/v2-sol-partner.md`](../projects/cherry-up-or-down/v2-sol-partner.md)
- Shots in the app tree: `screenshot-hub-360.png`, `screenshot-btc-360.png`

No deploy, publish, spend, or signing. Credits are never sold or cashed out. No SOL fund-moving code.

## Request to Muse (also on the board)

Fill out the rest of v1 from the scaffold:

1. Real `appId`s and `/.well-known/cherry-app.json` per listing (hub + 9 pairs, each on its own origin)
2. Server-side launch-token verify (replace `server/auth-stub.ts`; key users by `cherry_id ?? sub`)
3. `VITE_PYTH_API_KEY` once Sneaks provides it — never commit the key
4. Cosmetics checkout + receiving wallet after Sneaks confirms: `withAppReference` + ≤80-char label; unlock only after confirmation
5. Remaining 8 pair apps from the BTC template
6. ART to the console-grade bar (icon / cover / in-app)
7. 5M / Daily / Weekly / Monthly tabs + Crypto Leader race
8. Hosting + CSP + private test rooms

Ship gate = Sneaks publishes. v2 SOL stays parked. Hard rules: credits never sold or cashed out; no deploy / publish / spend without Sneaks's yes.
