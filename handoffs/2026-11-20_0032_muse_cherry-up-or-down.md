# Handoff — muse · cherry-up-or-down v1 fill-out

**When:** 2026-11-20 00:32 ET
**Agent:** muse
**Project:** cherry-up-or-down
**Claim:** RELEASED (request DONE — see BOARD.md)
**Branch (local fresh clone):** `muse/cherry-up-or-down-v1-fillout` at
`~/workspace/cherry-up-or-down/` (fresh clone of origin/main @ `c1c9dbf`;
NOT the diverged `~/ai-coms` clone). Pushed via the MCP `push_files`
snapshot flow — see "Push" below.

## What shipped

The v1 play-credits fill-out from fabok's scaffold, per the
`[fabok → muse] cherry-up-or-down` request. No deploy, publish, spend, or
signing. No SOL fund-moving code. Credits are never sold or cashed out.

1. **AppIds + domain proof — done as far as code can go.** Single source of
   truth `app/src/config/listings.json` (10 listings; every `appId` still a
   `TODO_APP_ID_*` placeholder — portal ids do not exist yet, none invented).
   `app/src/config/apps.ts` derives `LISTINGS` / `APP_IDS` /
   `LISTING_ORIGINS` from it, plus `isPlaceholder` / `isConfiguredAppId` and
   `VITE_LISTING`-driven `CURRENT_LISTING`. Every build writes
   `dist/.well-known/cherry-app.json` for its listing via the
   `cherryDomainProof` plugin in `vite.config.ts` (warns loudly on
   placeholders, never fails the build for them). New scripts:
   `scripts/gen-domain-proof.mjs <listing> [--write <dir>] [--all]` and
   `scripts/build-listing.mjs <listing>` (builds + verifies the proof file).
   Verified: `build-listing.mjs BTC` writes `TODO_APP_ID_BTC`; hub build
   writes `TODO_APP_ID_HUB`.
2. **Server-side launch-token verify — done.** `server/auth-stub.ts` is
   deleted; `server/auth.ts` implements `verifyCherryUser` /
   `requireCherryUser` on `@cherrydotfun/miniapp-sdk` `verifyLaunchToken`
   (RS256 vs Cherry JWKS; JWKS-unavailable = reject). Users keyed by
   `cherry_id ?? sub`. Each listing verifies for ITS appId, from server
   config (`CHERRY_APP_ID` env); placeholder appIds fail fast. Tests in
   `src/engine/selftest.ts` with a local JWKS (`jose`, devDependency):
   valid token → `cherry_id` key; no `cherry_id` → `sub` fallback; wrong
   app (aud present → `AUDIENCE_MISMATCH`; no aud → `APP_ID_MISMATCH`);
   expired → `TOKEN_EXPIRED`; garbage → `TOKEN_INVALID`; tampered
   signature → `SIGNATURE_INVALID`; missing Bearer header → `TOKEN_INVALID`;
   placeholder appId → `INVALID_OPTIONS`. `tsconfig.json` now includes
   `server/` so the auth module is type-checked by `npm run build`.
3. **Pyth key — SKIPPED (blocked on Sneaks), confirmed safe.** The code
   reads `VITE_PYTH_API_KEY` from env only (`readPythApiKey` in
   `src/engine/pricing.ts`, tested: unset/blank → undefined → labeled mock).
   No key value anywhere in the tree; no `.env` file.
4. **Cosmetics checkout — SKIPPED (blocked on receiving wallet).** Stub
   stays (`src/engine/cosmetics.ts`). No wallet address written anywhere.
5. **Remaining 8 pair apps — done.** All nine pairs were already routable
   (`#/eth`, …) from the BTC template; the fill-out makes them first-class
   listings: `VITE_LISTING` per-listing builds, per-listing domain proof,
   and pair listings open directly on their pair screen (verified by
   screenshot: a BTC-listing build at `/` renders the BTC 15 min screen).
   Pair-config completeness is now asserted in the selftest (all 9 Pyth
   feed ids 64-hex, names, colors, seeds; 10 listings; appIds match
   `listings.json`).
6. **ART — NOT generated (grok-bot's lane).** No grok-bot art for this
   family exists anywhere in the repo (checked: only fabok's screenshots).
   Nothing wired in; the inline SVG glyphs in `src/ui/icons.ts` remain
   placeholders. Still missing for grok-bot: 10 icons (512×512), 10 covers
   (1200×630), one 9:16 hub splash, pair-screen chrome kit (asset metals,
   Up/Down buttons, pie timer, sparkline, LIVE/Past pills).
7. **Tabs + Crypto Leader — done (already in scaffold, verified).**
   Hub: 15 MIN / HOURLY live, DAILY / WEEKLY / MONTHLY greyed "soon".
   Pair: 5M greyed "soon", 15M / 1H live. Crypto Leader card renders the
   top 2 by multiplier, is tappable (opens that pair), and says "playable
   race is v2". Confirmed in the 360px screenshots.
8. **Hosting + CSP + test rooms — PREPARED only.** `app/DEPLOY-PLAN.md`
   (10 projects, one per listing, `VITE_LISTING` env; per-listing server
   running `server/auth.ts`; test-room checklist), `app/vercel.json`
   (production CSP + frame-ancestors, config only), dev/preview CSP already
   in `vite.config.ts`. Nothing deployed.

## Verify (all green, 2026-11-20 ~00:32 ET)

- `npm test` — engine selftest ok · credits economy ok · pair config +
  pyth env ok · launch-token verify ok.
- `npm run build` (tsc --noEmit + vite) — green; hub + BTC-listing builds
  verified, domain-proof file correct in each.
- 360px screenshots (headless Chromium, mock feed — Pyth key unset):
  `handoffs/assets/2026-11-20-cherry-up-or-down/screenshot-hub-360-muse-fillout.png`,
  `screenshot-btc-360-muse-fillout.png`,
  `screenshot-btc-listing-360-muse-fillout.png`.
  Hub shows Coins list, live/greyed tabs, cards with Price to beat /
  Current, sparklines, pills, countdowns. BTC pair shows TO BEAT / NOW,
  LIVE tag, countdown, chart + TARGET line, Past marks, Chance, Up/Down
  with multipliers, "Play credits only · not cashable · not for sale".
- Secrets scan: no `.env` files, no key assignments, no wallet strings,
  no SOL deposit/escrow/payout/stake code (one comment in
  `src/engine/currency.ts` states that absence), no Kalshi API/data in code
  (the only "Kalshi" string in the UI is the existing "not a Kalshi feed"
  disclaimer). The only `privateKey` hit is the ephemeral RSA test keypair
  generated at runtime in the selftest.

## Files changed (branch `muse/cherry-up-or-down-v1-fillout`)

- Modified: `app/README.md`, `app/package.json`,
  `app/package-lock.json` (+`jose` devDependency), `app/src/cherry.ts`,
  `app/src/config/apps.ts`, `app/src/engine/pricing.ts`,
  `app/src/engine/selftest.ts`, `app/src/main.ts`, `app/tsconfig.json`,
  `app/vite.config.ts`
- Deleted in the local branch: `app/server/auth-stub.ts` (replaced by
  `app/server/auth.ts`). NOTE: the snapshot push cannot carry deletions,
  so the stub file still exists on remote `main` — dead code, nothing
  references it; delete via web UI or git (see "Push" above).
- Added: `app/server/auth.ts`, `app/src/config/listings.json`,
  `app/scripts/gen-domain-proof.mjs`, `app/scripts/build-listing.mjs`,
  `app/PORTAL-CHECKLIST.md`, `app/DEPLOY-PLAN.md`, `app/vercel.json`
- Screenshots (binary — NOT in the snapshot push; in the local clone at
  `handoffs/assets/2026-11-20-cherry-up-or-down/*-muse-fillout.png`):
  hub, BTC pair, BTC-listing default view.

## 10-listing appId table (all TODO — portal ids do not exist)

| Listing | App name | appId | Origin |
| --- | --- | --- | --- |
| hub | Up or Down | `TODO_APP_ID_HUB` | `TODO_ORIGIN_HUB` |
| BTC | BTC Up or Down | `TODO_APP_ID_BTC` | `TODO_ORIGIN_BTC` |
| ETH | ETH Up or Down | `TODO_APP_ID_ETH` | `TODO_ORIGIN_ETH` |
| SOL | SOL Up or Down | `TODO_APP_ID_SOL` | `TODO_ORIGIN_SOL` |
| ZEC | ZEC Up or Down | `TODO_APP_ID_ZEC` | `TODO_ORIGIN_ZEC` |
| XRP | XRP Up or Down | `TODO_APP_ID_XRP` | `TODO_ORIGIN_XRP` |
| NEAR | NEAR Up or Down | `TODO_APP_ID_NEAR` | `TODO_ORIGIN_NEAR` |
| HYPE | HYPE Up or Down | `TODO_APP_ID_HYPE` | `TODO_ORIGIN_HYPE` |
| DOGE | DOGE Up or Down | `TODO_APP_ID_DOGE` | `TODO_ORIGIN_DOGE` |
| BNB | BNB Up or Down | `TODO_APP_ID_BNB` | `TODO_ORIGIN_BNB` |

Full portal steps + what-to-paste-where: `app/PORTAL-CHECKLIST.md`.

## Blocked / needs Sneaks (not build work)

- Portal appIds for all 10 listings (create in the portal, paste into
  `src/config/listings.json` + `CHERRY_APP_ID` per listing server).
- Origins + hosting choice (fill `TODO_ORIGIN_*`, deploy per
  `DEPLOY-PLAN.md` — his yes first).
- `VITE_PYTH_API_KEY` (env only, never committed).
- Receiving wallet for cosmetics checkout (stub stays until confirmed).
- ART — grok-bot's lane, all of it (see §6 above).

## Correction — Partner status is UNCONFIRMED

`projects/cherry-up-or-down/v2-sol-partner.md` contains the line "Sneaks
says he is a Cherry Partner." Treat that as **UNCONFIRMED, not
established**: the live portal tier check showed Verified (not Partner),
and Sneaks approved a draft email to team@cherry.fun asking for a Partner
agreement — which only makes sense if Partner is not yet in place. Nothing
in this handoff states he is a Partner, and nothing here un-parks v2.
**v2 SOL stays parked.**

## Push

- Method: MCP `push_files` snapshot flow to remote ai-coms `main`
  (text files only — the snapshot flow cannot carry binary files, so the
  three PNG screenshots stay in the local clone; see "Files changed").
- Sync record: `~/workspace/cherry-up-or-down.muse-github-snapshot-sync.json`
  (adjacent to the clone, per the snapshot-push procedure).
- **Pushed 2026-11-20 ~00:45 ET — commit
  [`ccfbe4b7a2039d8d1daac5fd84e77ab788d26c02`](https://github.com/0xSneaks/ai-coms/commit/ccfbe4b7a2039d8d1daac5fd84e77ab788d26c02)
  on remote `main`** (head before push: `a687a07`). Read-back verified two
  ways: MCP `list_commits` head = `ccfbe4b…`, and `git fetch` origin/main =
  same SHA; `auth.ts` + `listings.json` present in the remote tree;
  remote `BOARD.md` contains the DONE marker and "v1 fill-out DONE
  2026-11-20 by muse". Sync record updated with the commit + per-path
  sha256. Two upstream commits landed mid-session (`beac617`,
  `a687a07` — holdem BOARD pointer + Hold'em pause); both rebased in,
  BOARD.md conflicts resolved keeping the upstream holdem line.
- **Known gap — `auth-stub.ts` deletion NOT carried:** the snapshot flow
  cannot push deletions, so `projects/cherry-up-or-down/app/server/auth-stub.ts`
  still exists on remote `main` (verified in the remote tree). Nothing
  references it anymore (grep clean except historical handoffs + the
  task-list wording in the project file). Delete it via the GitHub web UI
  or a normal git push; until then it is dead code, not a live stub.
- **Screenshots stay local only** (binary, snapshot flow cannot carry
  them): `handoffs/assets/2026-11-20-cherry-up-or-down/*.png` in the
  local clone at `~/workspace/cherry-up-or-down/`.

## Next

- Sneaks: portal appIds → paste into `listings.json`; hosting + origins;
  Pyth key; receiving wallet; grok-bot art.
- Then: per-listing test rooms (DEPLOY-PLAN.md checklist) → Sneaks
  publishes. Do not publish if the Policy class is in doubt — ask
  team@cherry.fun first.
