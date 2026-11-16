# Cherry block — update-pass AUDIT done (blue-15, 2026-11-16)

**Scope:** read-only audit for Sneaks's 2026-11-16 ruling (ALL Cherry apps need an update pass to current payment/SDK wiring before any un-park/launch). No deploys, no publishes, no production promotions, no payment-recipient changes, no Hold'em UI changes. sneaks.skr untouched.

**Deliverable:** `~/workspace/cherry-study/UPDATE-PASS-AUDIT.md` (full table + per-app detail, proof inline).

## Findings (VERIFIED from repo files unless labeled)

- **Baseline:** current SDK = `@cherrydotfun/miniapp-sdk` **0.1.24** (reference SOURCE.md, upstream `b5a8136`). Migration 0.1.21→0.1.24 (README §19): **no breaking API changes**.
- **Royale** (app `6a6aecb6-…`): the ONLY app behind — SDK **0.1.21** (package.json + installed + lockfile, local worktree `pay-work` @ `12da12b`). Payment wiring live by design: server-built SOL top-ups to the 3% fee receiver (`src/lib/env.ts:59-68`), fee split = accounting on the purchase row, Cherry 10% via invoice rail; `cherry-app.json` present; `verify.ts:82` uses deprecated `expectedAppId`. **Update = dep bump ^0.1.24 + lockfile + one-line `appId` rename + `npm run check` + portal retest. No payment-logic change.** Repo head UNVERIFIED via API (PAT 404, known scope limit).
- **PetalDeck** (app `52e41534-…`): SDK **0.1.24 already**; provider init VERIFIED (`src/app/main.ts:547`); revenue wiring = Pump fee-sharing 95/5 set at launch (`src/launch/engine.ts:197`), Cherry 10% on the monthly bill. Repo heads VERIFIED via API: main `30581e5` (screenshots merge, not the app line); Preview line `claude/quirky-sagan-wxf7a7` @ `b093028`, validated head `f04928e`. **No code update exists — the pass is Production `SOLANA_RPC_URL`, K-11 PASS (outstanding since 2026-11-13), Creator-mode proof launch, PROD YES.** Public-listing policy clearance still UNKNOWN.
- **Hold'em**: no App ID exists (`shared/cherry-listing.ts`: both IDs `''`, HQ copy VERIFIED); HQ work copy already on SDK **0.1.24**; engine extract has no SDK dep. **No payment wiring by spec** (credits-only, `SOL_ENABLED=false`) — paid packs are a new build behind name pick + portal prompt + freeze lift + legal review + PROD YES. Canonical repo UNVERIFIED (PAT 404).
- **Pachinko**: SDK **0.1.24**; local-only tree (not a git repo); payments hard-disabled in code (`src/lib/env.ts`: `SOL_ENABLED = false as const`, `packsEnabled: false`, "deliberately NOT env-flippable… owner decision that also wires a real payment driver"). Needs name/repo/portal submission before any wiring can go live.

## Owner gates batched for one ask (via coordinator)

(a) Royale Production promotion tap — after the free SDK bump lands on a branch + passes checks; (b) PetalDeck PROD YES + Production `SOLANA_RPC_URL` + proof-launch go (contingent on K-11, a Claude/Opus deliverable); (c) Hold'em name + portal prompt; (d) Pachinko name + repo + submission go. **No payment-recipient changes proposed anywhere.**

**Status:** audit DONE, claim released. Per-app update execution waits on the coordinator's confirmation (owner gates batched first). · blue-15 · 2026-11-16
