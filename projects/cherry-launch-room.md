# Launch Room (working name) — launch any memecoin on Pump.fun from a Cherry chat

**Repo:** 0xSneaks/cherry-launch-room (private, created by muse 2026-11-09) · **App ID:** `52e41534-4c7b-4237-9a16-ec8ea7a3c9dc` · **Project ID:** `app_b22266243fde` · **Live URL:** none · **Last updated:** 2026-11-09 04:20 ET by codex

## Now (keep this current)
**08:42 claude-code:** PetalDeck UI v2 (pump-structure 'Create new coin' + buy/confirm sheets) @ `5e21d07` on `ccr-554d0091-ew1ew2`, dry-run. A–H results table still missing → routes untested. Sneaks signs in as fee wallet Ftui… → switch to BGa7…YD7R. → [handoff](../handoffs/2026-11-09_0842_claude-code_petaldeck-ui-v2.md)

**08:31 claude-code:** PetalDeck main screen (pump-style create form, confirm sheet, Compact/minimal tiers) DONE on `ccr-554d0091-ew1ew2` @ `250b15a`, dry-run only; A–H harness at `/debug/`. Fee recipient from `/api/config` (`PETALDECK_FEE_WALLET`, else pinned). Sneaks's Cherry wallet = fee wallet → blocked on the form by design. → [handoff](../handoffs/2026-11-09_0831_claude-code_petaldeck-ui.md)

**04:45 claude-code:** sign-only spike BUILT on `spike/sign-only` (`a2a9975`) and live on Preview `https://cherry-launch-room-git-spike-sign-only-phantomcapais-projects.vercel.app/spike/` (VERIFIED 200 + .well-known + frame-ancestors). Waiting on Sneaks's tap (A→D). Step 3 gated on A signing. **Byte budget (VERIFIED offline): full launch tx (create + buy + 95/5 fee share + reference) = 1667–1705 B > 1232 → needs v0 + app-owned lookup table (Sneaks yes, ~0.01 SOL once) or two approvals.** pump-sdk 4.3.1 facts → [handoff](../handoffs/2026-11-09_0445_claude-code_cherry-launch-room-spike.md).

~~VERIFIED — Step 2 scaffold is on [codex/scaffold](https://github.com/0xSneaks/cherry-launch-room/tree/codex/scaffold) @ `bd8adce14`. INTENT — claude-code owns the Step 1 sign-only spike and Step 3. Step 4 is gated on claude-code posting spike PASS. [Scaffold proof](../handoffs/2026-11-09_0420_codex_cherry-launch-room-scaffold.md).~~ (superseded 04:45)

## Pitch
Launch a Pump.fun coin without leaving the chat. Your room sees it the second it lands.

## Verdict — TEST (claude, 2026-11-09)
- Engine exists: 0xSneaks/pump-deck core (create_v2, size math, send/confirm, Pinata metadata, RPC proxy) — 20 tests, no UI, never run on mainnet (VERIFIED from its HANDOFF.md @ 1d8cb58).
- Cherry SDK 0.1.24 has `wallet.signTransaction` (wallet:sign) — needed because the mint keypair must co-sign (VERIFIED, SDK README §7).
- No native token launcher seen in Cherry (OBSERVED: App Store listing; Cherry-side name/app search still owed).
- Cost: M build. Money to test = $0 (spike signs, never broadcasts). Kill switch = spike result.
- INTENT (Sneaks 2026-11-09): Pump.fun only; see how it does before adding more pads.

## Established (don't re-litigate)
- Venue: Pump.fun `create_v2`, SOL pair, standard launch (no mayhem, no cashback, no holder reward). Engine copied from pump-deck @ `1d8cb58` with a provenance note; pump-deck itself untouched.
- Non-custodial: user's Cherry wallet is creator + fee payer + signer. App never holds user keys or funds. Only keypair the app makes = per-launch mint, in memory.
- ~~No app fee in V1~~ SUPERSEDED. **OWNER RULING (Sneaks 2026-11-09 03:50): V1 takes a cut.** Every coin launched gets a Pump fee-sharing split at launch: **user 95% / app 5%** of the coin's creator fees = bps 9500 / 500 (lowered 10%→5% by Sneaks 03:51). Cherry is NOT in the split (changed 03:53, claude): VERIFIED portal step 4/7 says the bill is monthly on self-declared revenue, so Cherry gets 10% of what we actually earn via that bill; an in-split 0.5% would not be tagged to the app and risks paying twice. Portal money setting = **Other, 5%** with a description saying it is 5% of creator fees, not of launch volume (we keep none of the SOL users spend in-app). VERIFIED (@pump-fun/pump-sdk 4.3.1 README §Fee Sharing): split via `updateFeeShares` (SOL-quoted), shareholders by `shareBps`, settable **once only**; SOL-pair creator fee RATE is not configurable (we split, we don't raise it). Shown to user before signing: "You keep 95% of creator fees. 5% goes to Launch Room. Permanent." App fee wallet (OWNER, Sneaks 2026-11-09 04:03) = `FtuidxSaoNDeTuNTDuf9jLACVwqjgQeBwKTYC54f3GYp` (= sneaks.skr). Use the raw base58 address in code/config, NEVER the .skr name (resolution fails in some places). Money path: pin it as a constant with a test that asserts the exact string; any change needs Sneaks's yes. UNKNOWN: whether off-Cherry trading fees count as 'revenue through Cherry' — default: declare it and pay the 10% on the monthly bill; muse asks team@cherry.fun.
- Never "launched" before `confirmed` on-chain. Costs come from simulation, never hardcoded.
- Footer: "Unofficial. Not affiliated with Pump.fun."

## Cherry portal integration prompt (VERIFIED, generated for this app 2026-11-09)
→ repo `docs/CHERRY_INTEGRATION.md` — **build agents follow it.** Key adds vs the SDK README: legal pages are Cherry-hosted — link https://portal.cherry.fun/legal/app_b22266243fde/52e41534-4c7b-4237-9a16-ec8ea7a3c9dc/terms and …/privacy (don't copy); block CU/IR/KP **inside the app too** (Developer Agreement duty, not only the listing); 18+ content behind the 18+ rating; reports acted on within 72 h; no Cherry fee inside our transactions, no billing API; no bill under $100/month volume; reference key on every tx; `isInsideCherry()` for first-frame detection; `useCherryUser()` for name/avatar.

## Cherry constraints (VERIFIED, @cherrydotfun/miniapp-sdk 0.1.24 README, read 2026-11-09)
- VERIFIED (portal step 3/7, 2026-11-09): new apps start Unverified ($50/tx, $50/wallet/day); per-app identity verification AFTER publishing raises it to $1,000/$5,000. Cherry blocks CU/IR/KP for every app itself. Prior note kept: INTENT (Sneaks 2026-11-09): he is a verified Cherry developer. If the app's token `tier` = `verified`, caps are $1,000/tx and $5,000/wallet/day; dev account verification vs per-app tier = UNKNOWN → buy cap reads the live `tier` claim, never hardcoded.
- Tier limits per app: **unverified $50/tx and $50/wallet/day outflow**; verified $1,000/$5,000. Forbidden for both: token Approve/delegation, `SetAuthority`, `Assign`, durable nonces, subscriptions. → dev-buy input capped by tier; handle `TX_LIMIT` / `DAILY_LIMIT` with the SDK's suggested copy.
- `signTransaction` returns signed bytes; app broadcasts itself (current pump-deck send.ts flow). `signAndSendTransaction` can't be used (mint must co-sign).
- Reference key: on every tx, as a read-only non-signer account on **an instruction we control** (System transfer etc.). **Never append it to the Pump instruction.** Static key, not in an ALT.
- Label ≤ 80 chars, amount must match: e.g. `Launch $TICKER on Pump.fun + buy 0.1 SOL`.
- Errors: USER_REJECTED silent; POLICY_DENIED by policyCode; PRECHECK_UNAVAILABLE retry later; WALLET_CHANGED/NOT_A_SIGNER rebuild for `paymentWallet`; no retry loops.
- Listing test: handshake ≤ 5 s, no connect/sign on load, backend `verifyLaunchToken` (iss https://chat.cherry.fun), frame-ancestors CSP, `/.well-known/cherry-app.json`, privacy + terms + security contact.

## UNKNOWN — the spike answers these
1. Does Cherry's precheck pass `create_v2` (CPI sets Token-2022 authorities internally) or return FORBIDDEN_INSTRUCTION / DANGEROUS_INSTRUCTION / UNSTATED_ROLE? → **go/no-go.**
2. Does it accept a tx already needing a second signer (mint)?
3. Byte budget: create + buy + reference instruction vs 1232. pump-deck measured create+buy at 1188–1231 B with no budget ixs; a reference ix adds ~70 B → likely over. Options (claude-code decides): v0 tx + app-owned ALT of Pump's fixed accounts (one-time rent, needs Sneaks yes), or cap name/ticker length.
4. How the host prices a brand-new token mint for the $50 check (PRICE_UNAVAILABLE risk on the dev buy).
5. Fee-sharing setup: the coin's creator becomes the SharingConfig PDA (pump-sdk README). Does Cherry's precheck pass the fee-share instruction (authority-like change)? Same tx as create or a second tx (signAllTransactions, one approval)? Pump SDK is now 4.3.1 (pump-deck pinned 4.0.0) — re-verify create_v2 + fee-sharing against current docs before coding. Spike variant D tests it.

## Loop / screens (360 px, dark)
1. **Room feed** (home): coins launched from this room — image, $TICKER, who, when, Pump.fun link. Empty state → "Be first. Launch a coin."
2. **Details**: image, name, ticker, description, optional links (pump-deck validation).
3. **Buy**: optional first buy, presets 0 / 0.05 / 0.1 / 0.25 SOL, max = tier limit minus launch cost.
4. **Review**: simulation-backed cost, est. tokens / % supply, warnings (irreversible, you are the on-chain creator). Sign blocked if sim fails.
5. **Launching** → **Done**: CA copy, Pump.fun + Solscan links, **Share to room** (`cherry.share`, route `/coin`, read-only card).
- Room record is written only after the server confirms the tx on-chain: signature landed, it is a Pump create_v2, mint matches, creator == the session's wallet. No client-trusted rows.

- INTENT (Sneaks 2026-11-09 03:46): Float launchpad is the next pad, and it WILL carry an app fee. Before that fee code ships, switch the portal money setting off Free (flat fee per launch = Sales; % of volume = Commission). Fee size + fee wallet = Sneaks's call then.

## Out of scope (V1)
Trading/sells, charts, other pads (mogz, bags, Raydium…), vanity mints, extra fees beyond the creator-fee split, bundles, holder rewards, any custody.

## Build split
| Step | Owner | Notes |
|---|---|---|
| 0 | sneaks | App ID + project ID, repo, yes/no list (see handoff) |
| 1 spike (sign-only) | claude-code | ⚠️ HIGH-RISK path. `/spike` route, never broadcasts |
| 2 scaffold + shell | codex (or OpenCode/DeepSeek UI only) | Vite app from pump-deck, Cherry provider, CSP, .well-known, 360 px dark shell |
| 3 auth + launch adapter | claude-code or codex | verifyLaunchToken session, CherryWalletAdapter into send.ts, labels, errors, reference ix, tier cap |
| 4 room feed API + DB | codex | Neon, server-side tx verification, keyed by `cherry_id ?? sub` |
| 5 adversarial review | the other of claude-code/codex | money + auth paths |
| 6 preview deploy + live checks | muse | env: PINATA_JWT, SOLANA_RPC_URL, CHERRY_APP_ID, DATABASE_URL; geoblock CU/IR/KP |
| 7 first real launch | sneaks | create-only first, then tiny buy — his wallet, his yes |

## Art
- Logo: owner-supplied (Sneaks 2026-11-09) — pixel cherry in a green/clear pill → `assets/cherry-launch-room/logo-source.jpg`; icon + cover rebuilt from it. ⚠️ Green pill reads as Pump.fun's mark — Cherry listing rule: no impersonation of other brands (SDK §15). OWNER RULING (Sneaks 2026-11-09 03:12): keep the logo — "I'm verified".

## Built
- VERIFIED — Cherry Vite/React shell, pinned Pump Deck import, geoblock, ownership JSON, wizard and read-only share card. Typecheck, 25 tests, build and local 360 px Chromium passed.
