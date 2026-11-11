---
name: cherry-messenger-creator
description: Come up with a Cherry messenger (cherry.fun) mini-app idea, route the build to Sneaks's agents, and finish with exact portal upload steps and copy for every field.
---

# Cherry Messenger Creator

Idea → portal listing → build by agents → live in Cherry. Sneaks gets every portal field as a copy box.
Triggers: "cherry messenger creator", "new cherry app", "make a cherry mini app", "idea for cherry".

## Mission (Sneaks, 2026-11-11 — read first, applies to every phase)
- **Goal:** bring social activity back to Cherry rooms with HQ products, and profit. The end test is high-quality output and user enjoyment — a reason to come back. Repeat users are the goal.
- **The badge:** Sneaks is one of the first 5 Cherry developers to get the verified badge, and it's on his profile. Every app ships under it. Treat it as trust to repay: polished before the portal, clean on policy, never sloppy or borderline. Full upload rights are a responsibility, not a shortcut.
- **Limits ≠ income (OBSERVED portal 2026-11-11 03:15 ET):** identity documents submitted, status "Checking your documents"; Sneaks still shows **Unverified** ($50/tx, $50/wallet/day). When it clears, his projects "switch to Verified on their own": $1,000/tx, $5,000 per wallet per day, Verified badge, featured-shelf eligibility. Those are caps on what one user's wallet can move through an app, not earnings. Revenue comes from the money model each app declares (step 4/7) and Cherry's 10% bill. Play-credit apps move no money.
- So every app needs a repeat-play hook (daily bonus/streaks, stats, room leaderboards, share-to-room) and a quality bar (360px polish, fast first frame, no dead ends) before it's listed.

Label every platform claim: VERIFIED (read today in docs/code/live URL/portal screen) · OBSERVED (seen in Sneaks's portal session, may change) · ASSUMPTION. Never invent field names, limits, fees or IDs.

**Copy-box rule (Sneaks 2026-11-09):** every value Sneaks types goes in its own code block, field name in bold above it. Taps/choices are plain bold text ("tap **Other**"). No values inline in prose. One screen per message; wait for his screenshot; log each screen.

## Phase 0 — Check coms
Check in on 0xSneaks/ai-coms (BOARD.md + projects/<slug>.md). Respect claims. Add a claim for `cherry-<slug>`.

## Phase 1 — Idea
1. If Sneaks gave an idea, sharpen it. If not, generate 3.
2. Each idea must use Cherry's edge: it runs inside a chat room. Use room context (room id, title, member count) as the growth loop — group play, room leaderboards, room-vs-room, share-to-room.
3. Score each: fun in 10 seconds · room/social hook · build size (S/M/L) · money risk · Cherry fit on a 360px phone.
4. Verdict per idea: KILL / PARK / TEST / BUILD, one line of evidence + cost.
5. Name check: search Cherry + web for the name. ("SOL Miner" was already taken by a Cherry group.)
6. Reuse first: check Sneaks's repos for an engine that already does the core job (e.g. pump-deck for Pump.fun launches).
7. Default to PLAY-CREDITS mode for games. Real SOL only behind a flag, after adversarial review.
8. Hard no: rewards paid from new players' deposits (Ponzi-shaped), fake APR/rewards, "mining" claims that imply real SOL issuance, hidden fees.
9. Money model is decided BEFORE the portal (step 4/7 asks for it). Sneaks does not ship free by default — propose a fee and the cheapest way to take it (OBSERVED 2026-11-09: "we're not doing this for free"; then "lower the fee, make it more appealing" → pick a rate users barely feel).
10. Lock the pick with Sneaks in one yes/no (batch with the Phase 2 Sneaks items).

## Phase 2 — Spec + Sneaks-only items (batch in ONE message)
Write `projects/cherry-<slug>.md` on the board: name, one-line pitch, loop, screens, money model, what's out of scope.
For anything that signs or moves money: a **sign-only spike** first (build the real tx, call `wallet.signTransaction`, never broadcast, record the host's result code) — it is the go/no-go before any UI work.
Ask Sneaks only for things that need his identity:
- Walk the portal with him (Phase 5) — gets App ID, Project ID and the generated integration prompt.
- Create repo `0xSneaks/cherry-<slug>` or approve an agent creating it.
- For real-money apps: fee rate + receiving wallet (default sneaks.skr — confirm per app).
- ⚠️ HIGH-RISK yes/no: the spike tap, the first real transaction, production.

## Phase 3 — Build (route to agents, Sneaks is not the relay)
Post tasks on the coms board with bounded files per agent. Conserve Claude: give UI/scaffold to OpenCode (DeepSeek — no "check coms" line in its prompt) or Codex; Claude Code/Codex own auth + money; Muse owns Vercel/deploy/live checks. Overflow/cheap models never touch auth, signing or payout code.

**The spec is the portal's generated prompt** (wizard step 6/7 → Copy prompt), saved verbatim to the app repo as `docs/CHERRY_INTEGRATION.md`. It is app-specific (App ID, tier, revenue model, blocked countries, SDK version, hosted legal URLs, self-check). The contract below is the backup; where they differ, the portal prompt wins.

Build contract (re-verify against the current `@cherrydotfun/miniapp-sdk` README before coding):
- Next.js or plain web (Vite fine). Mobile-first 360px, dark theme, 44px touch targets, skeleton on the first frame (no blank screen, no full-screen spinner); `isInsideCherry()` is synchronous for first-render decisions.
- SDK `@cherrydotfun/miniapp-sdk` latest (+ /react, /solana or /kit).
- CSP on every HTML response: `frame-ancestors 'self' https://chat.cherry.fun https://cherry.fun https://*.cherry.fun`. No X-Frame-Options.
- `public/.well-known/cherry-app.json` → `{"appId":"<App ID>"}`, 200 JSON on every origin, no redirect/SPA fallback.
- Inside Cherry: NO connect-wallet button, NO signMessage login — the portal test fails on either.
- Backend `verifyLaunchToken(token, { appId })` once → own session in memory + Authorization header, no cookies. Must reject wrong aud/iss/app_id and expired tokens (the test sends them). Issuer `https://chat.cherry.fun`, keys `https://chat.cherry.fun/.well-known/jwks.json`.
- Key users by `cherry_id ?? sub`, not the wallet. Use `useCherryUser()` for name/avatar.
- Server-authoritative state, ledger table, idempotent claim endpoints, tests for the math and double-claim.
- Standalone (plain browser) path works but is second-class.
- Wallet: show action + amount before signing; label ≤80 chars, amount must match; build for `paymentWallet`; reference key (`withAppReference`) on every tx, on an instruction we control (System transfer etc.), never on another program's instruction; never approvals/delegation, authority changes, durable nonces, subscriptions; handle USER_REJECTED / POLICY_DENIED (policyCode) / PRECHECK_UNAVAILABLE with clear messages, no retry loops.
- Limits (VERIFIED portal 2026-11-09): every NEW app starts Unverified — $50/tx, $50/wallet/day — even for a verified developer. Per-app identity verification AFTER publishing raises it to $1,000 / $5,000. Read the live `tier` claim; never hardcode.
- Fees: nothing for Cherry inside our transactions, no billing API. Cherry bills monthly on the revenue we report (10%); no bill under $100/month volume.
- Compliance: Cherry blocks CU/IR/KP at open AND the developer agreement requires blocking them in-app too. Link Cherry-hosted Terms + Privacy (URLs in the portal prompt) — link, don't copy. 18+ content behind the 18+ rating. Act on reports within 72 h.

## Policy rules learned the hard way (cherry-launch-room, 2026-11-09)
- VERIFIED (portal.cherry.fun/docs/mini-apps/policy.md, version 2026-11-09, read by claude-code): token launches, presales, ICOs/IDOs, bonding-curve launches and launchpads are **Partner apps only** (written agreement with Cherry + own licences). Verified tier does NOT unlock restricted categories. Check the policy page in Phase 1 for every idea — KILL or PARK anything restricted unless the app's live `tier` claim says partner.
- VERIFIED (wallet.md): authority changes / account reassignment are **Refused** for Unverified + Verified. Pump create_v2 CPIs `SetAuthority`, so every in-Cherry Pump launch is refused with `DANGEROUS_INSTRUCTION` (the A–H spike). Nothing to strip on our side.
- VERIFIED (policy.md): Cherry may PAUSE an app that keeps sending refused transactions → after one refused spike tap, stop and diagnose; never re-tap in a loop.
- VERIFIED (policy.md): no wallet-connect or signing outside Cherry → no external-wallet workaround.
- OBSERVED: a claimed partner deal means nothing until the server-verified launch token shows `tier: partner` for that App ID.
- UNKNOWN — casino / games of chance / play credits: the Cherry terms check (projects/cherry-factory.md item 2) has no posted result. Casino games stay play-credits only with the wager layer stubbed, until that check posts and Sneaks rules.

## Phase 4 — Verify (evidence, not claims)
Muse deploys to Vercel PREVIEW first (every env var set on the target, or boot = 500). Then check and paste results on the board:
- `/api/health` shows Cherry identity configured
- `/.well-known/cherry-app.json` → 200 JSON with the right appId
- frame-ancestors header present on `/`
- 360px dark render, no connect-wallet inside Cherry
- typecheck, tests, build pass; every box of the portal prompt's self-check
Money paths: implementation → adversarial review by a different agent → independent verification.
Only then tell Sneaks to add the URL and press the portal checks.

## Phase 5 — Portal walk-through (live, screen by screen)
Make the images first (Pillow; from Sneaks's logo if he sends one — he owns the call on his art): **icon 512×512 PNG** (logo with ~5% black padding so rounded crops don't clip) and **cover 1200×630 PNG** (logo left, name + pitch right, matching palette). Send both (SendUserFile where available) and put copies in the app repo `assets/`.

Walk Sneaks through the portal one screen at a time, copy boxes only. Log each screen to `skills/cherry-messenger-creator/PORTAL-LOG-<slug>.md`. Map OBSERVED 2026-11-09 (Launch Room):

**A. New project** (portal.cherry.fun → ☰ → Projects → new)
**Name**
```
<APP NAME>
```
**Description** (optional)
```
<one line>
```
Notification email: his own, optional. Invite teammates: skip. Tap **Create project**.

**B. Start your Cherry integration** — tap **Mini app** (not Chat embed, not Bot).

**C. Wizard 1/7 · Tell us about your app** ("what people see in the Cherry marketplace")
Project: preset. **App name** · **One-line pitch** (≤ ~50 chars safest; give a short fallback) in copy boxes.
Category (one chip): Games · Trading · DeFi · Predictions · Launchpads · NFTs · Payments · Shopping · Rewards · Social · AI · Tools · Education · Other.
Icon: upload `<slug>-icon.png`. (Fields below Icon: capture on the next run.)

**D. 2/7 · Who runs it** — Operated by: A company (default) | **An individual** (unless a REGISTERED company exists). Legal name + country: Sneaks types them; agents never prefill identity.

**E. 3/7 · Where it runs** — Chains: **Solana** (EVM soon). Countries you do not serve: CU/IR/KP pre-locked; add more only if the app needs it. Age rating: Everyone | 13+ | **18+** for gambling-like mechanics, real-money games or token speculation.

**F. 4/7 · How you make money** — Sales (10% of what users pay) · Commission (10% of your share of volume) · Other (describe; share optional) · Free (0%).
- Category Launchpads auto-selects **Commission** — switch it if that's wrong.
- Revenue that doesn't come from what users move in the app (e.g. a share of Pump.fun creator fees) → **Other**, describe it in a copy box, leave **The share you keep** EMPTY ("You'll state it on the bill"). A % there would bill us on volume we never kept.
- Bill: monthly, on the 1st, self-declared revenue, 10%, 7 days to pay in USDC, then the app pauses. Different terms → team@cherry.fun.

**G. 5/7 · Terms** — keep **Use Cherry's standard Terms of Service and Privacy Policy** ticked; accept the Cherry Developer Agreement.

**H. 6/7 · Integrate** — tap **Copy prompt** (or Download .md) → Sneaks pastes it to Claude → save verbatim to `docs/CHERRY_INTEGRATION.md` in the app repo; App ID + Project ID go on the board (not secrets). STOP here until deployed.
Then, after Muse posts "live": **Where your app runs** (paste URL → Add) · **Run checks** · **Run the test** (needs a pass on the current URL to publish) · screenshot any red → send it.

**I. 7/7** — not yet observed; capture on the first app that reaches it.

Skip: Website "Verify" (badge only). Never share: anything labeled secret, private key, API key.
If the portal shows a field not on this map, ask Sneaks for a screenshot and map it — never guess. Update this map when a screen changes.

## Phase 6 — Prompt blocks + sign off
After the walk-through, give Sneaks one paste-ready block per agent (claude-code / codex / muse) with: read list (board project file, handoff, `docs/CHERRY_INTEGRATION.md`), exact steps, Don'ts, and what to bring Sneaks.
Handoff file + project file + BOARD.md line + release claim. Report to Sneaks: what's live (with evidence) and the ≤3 things only he can do.
