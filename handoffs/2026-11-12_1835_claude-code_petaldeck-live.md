# Handoff — cherry-launch-room (PetalDeck) — claude-code — 2026-11-12 18:35 ET

**Session goal:** Sneaks: "put it to fully functioning" → live launches; block for muse (secrets); Grok prompt for the HQ "coin is live" splash (Grok draws, claude-code builds on it).
**Status:** LIVE MODE BUILT + DEPLOYED (owner wallets only). BLOCKED on 2 secrets (Sneaks) → then Sneaks's first real launch.
**Repo / branch:** 0xSneaks/cherry-launch-room @ `claude/quirky-sagan-wxf7a7` = `spike/sign-only` (what Cherry loads) · **Commit:** `a4acf93`

## Did (VERIFIED unless marked)
- `/api/metadata` (pins image + Pump-style metadata JSON to IPFS via Pinata, env `PINATA_JWT`; 503 until set) and `/api/send` (relays ONE fully signed launch tx, preflight ON; gate refuses anything but PetalDeck launch shapes). Files: `server/{metadata,send}.ts`, `src/server/{metadata,launchTx,guard}.ts`.
- App: upload on Continue → fresh blockhash → ONE Cherry approval → mint co-signs → txs sent in order, each confirmed before the next → done sheet (CA + Copy CA, Go trade → pump.fun/coin/<mint>, Solscan). Partial launch → "Finish" re-signs only what didn't land.
- Proof: real-shaped signed P/F/G txs pass the `/api/send` gate AND execute in order on a mainnet fork (P 207,005 → 136,302 CU). 135 tests, typecheck, lint, build ✓. Playwright (mocked send) shows the done + partial screens. NOTHING SENT.
- Live is limited to owner wallets (`LIVE_FOR_OWNERS_ONLY` in `src/app/config.ts`); others see "Creating coins opens soon".

## 📋 BLOCK FOR MUSE — walk Sneaks through this (secrets go ONLY into Vercel, never chat/board)
1. **Pinata key** → pinata.cloud → sign in/up (free plan is fine) → API Keys → New Key → enable `pinFileToIPFS` + `pinJSONToIPFS` (or Admin) → Create → copy the **JWT** (long `eyJ…` string).
2. **Helius RPC** → helius.dev → sign in → copy the **API key** (a UUID like `xxxxxxxx-xxxx-…`). The app accepts either the bare key or the full `https://mainnet.helius-rpc.com/?api-key=…` URL.
3. **Vercel** → project `cherry-launch-room` (team phantomcapais-projects) → Settings → Environment Variables → add, ticking **Preview AND Production**:
   - `PINATA_JWT` = the JWT
   - `SOLANA_RPC_URL` = the Helius key or URL
   - (optional, same screen) `VERCEL_PREVIEW_FEEDBACK_ENABLED` = `0` for **Preview** only — hides the Vercel toolbar at the source (already blocked in code).
4. **Redeploy** → Vercel → Deployments → newest `spike/sign-only` deployment → ⋯ → Redeploy (env changes only apply to new deploys).
5. Post on the board: "SECRETS SET + REDEPLOYED <time>" (names only). claude-code then verifies `/api/metadata` no longer returns 503.
6. In Cherry: "app pays with" = **Cherry Wallet** (not Ftui…3GYp, the fee wallet — blocked by design). Make sure it holds a little SOL (create rent + fees + first buy; the confirm sheet shows the exact SOL before signing).

## 🎨 PROMPT FOR GROK (Sneaks pastes this into Grok Build) — Grok draws, claude-code wires it in
> Build the "Your coin is live" splash screen for PetalDeck, a Cherry mini app (mobile dapp, 360–430 px wide, dark theme, safe-area aware). Brand: the PetalDeck logo — a glossy diagonal capsule pill, mint-green liquid in the bottom half with pixel sparkles, a glossy black top half holding pink cherry blossoms, white rim highlight (attach logo PNG). Colors: background #100e16, surface #1c1825, accent pink #ff9bb2, mint #3fdcae, text #f9f4ff, muted #c1b6cd. Font: system/Inter, bold rounded headings.
> Sequence (≈1.5 s, skippable on tap, respects prefers-reduced-motion): 1) the pill appears center screen and SHAKES; the cherry blossoms swirl and mix INSIDE the top half only — no petals float outside the pill; the mint liquid sloshes. 2) The pill POPS: quick scale-up, flash ring, and a burst of pink petals outward. 3) The result card slides up.
> Result card (must stay clean and thumb-friendly): coin image (square, rounded) + coin name + $TICKER; label "Contract address"; the full CA in a monospace pill that wraps cleanly, with a COPY icon button right next to it (tap → icon turns to a check + "Copied" toast); a big primary pink button "Go trade" (opens the coin's Pump.fun chart); two secondary buttons "Solscan" and "Done"; a small line "Creator fees: you 95% · PetalDeck 5%".
> Deliver: one self-contained HTML/CSS/JS file (no frameworks, no external fonts/CDNs — the app's CSP only allows its own scripts), plus the pill as an SVG with SEPARATE groups/ids for: capsule shell, liquid, each blossom, sparkles — so the blossoms can be animated independently. Use these element ids so it drops into the app: `doneMedia` (coin image slot), `doneTitle`, `doneMint` (CA text), `doneCopy` (copy button), `donePump` (Go trade link), `doneSolscan`, `doneStatus`. No real wallet code; placeholder CA `So1aNaPetaLDeckExampLeCA1111111111111111111`.
> Constraints: 44 px minimum tap targets, no horizontal scroll at 360 px, readable at 16 px, works in an in-app WebView.

## Next (start here)
1. Sneaks + muse: block above (secrets + redeploy). 2. claude-code: verify `/api/metadata` ≠ 503, re-run fork proof. 3. Independent Opus cross-check of `a4acf93` money path (K-11) — claude. 4. Sneaks: ONE small real launch in Cherry (e.g. 0.01 SOL buy) → CA + Solscan on the board. 5. On Sneaks's PROD yes: claude-code flips `LIVE_FOR_OWNERS_ONLY=false`, moves to production URL → Sneaks announces. 6. Grok splash → claude-code wires it into the done sheet.

## Don't
- Don't paste secrets anywhere but Vercel. Don't flip `LIVE_FOR_OWNERS_ONLY` before step 4 passes.

## ⚠️ High-risk
- Real money path now exists (owner-only). Needs: K-11 independent cross-check (`src/server/launchTx.ts`, `src/app/launch.ts` run/retry, `src/launch/engine.ts` fee share) before public.
