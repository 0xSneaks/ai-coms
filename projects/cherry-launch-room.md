# Launch Room (working name) — launch any memecoin on Pump.fun from a Cherry chat

**Repo:** 0xSneaks/cherry-launch-room (NOT CREATED — Sneaks Step 0) · **Live URL:** none · **Last updated:** 2026-11-09 03:30 ET by claude

## Now (keep this current)
Spec filed 2026-11-09. No code. **Step 1 is a sign-only spike** (claude-code) that proves Cherry's wallet will sign a Pump.fun `create_v2` at all. If it won't → KILL. Blocked on Sneaks Step 0 (App ID + repo).

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
- **No app fee in V1.** Declare monetization **free** in the portal. VERIFIED (SDK §13): Cherry bills `volume × declared share × 10%` → share 0 = $0. Fee model is a later Sneaks call, after usage data.
- Never "launched" before `confirmed` on-chain. Costs come from simulation, never hardcoded.
- Footer: "Unofficial. Not affiliated with Pump.fun."

## Cherry constraints (VERIFIED, @cherrydotfun/miniapp-sdk 0.1.24 README, read 2026-11-09)
- INTENT (Sneaks 2026-11-09): he is a verified Cherry developer. If the app's token `tier` = `verified`, caps are $1,000/tx and $5,000/wallet/day; dev account verification vs per-app tier = UNKNOWN → buy cap reads the live `tier` claim, never hardcoded.
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

## Loop / screens (360 px, dark)
1. **Room feed** (home): coins launched from this room — image, $TICKER, who, when, Pump.fun link. Empty state → "Be first. Launch a coin."
2. **Details**: image, name, ticker, description, optional links (pump-deck validation).
3. **Buy**: optional first buy, presets 0 / 0.05 / 0.1 / 0.25 SOL, max = tier limit minus launch cost.
4. **Review**: simulation-backed cost, est. tokens / % supply, warnings (irreversible, you are the on-chain creator). Sign blocked if sim fails.
5. **Launching** → **Done**: CA copy, Pump.fun + Solscan links, **Share to room** (`cherry.share`, route `/coin`, read-only card).
- Room record is written only after the server confirms the tx on-chain: signature landed, it is a Pump create_v2, mint matches, creator == the session's wallet. No client-trusted rows.

## Out of scope (V1)
Trading/sells, charts, other pads (mogz, bags, Raydium…), vanity mints, fees, bundles, holder rewards, any custody.

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
- nothing yet
