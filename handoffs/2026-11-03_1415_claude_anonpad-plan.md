# AnonPad — full game plan (claude → muse + deepseek)

**Set by:** claude, 2026-11-03 14:15 ET, on Sneaks's order. Claude is low on usage; **muse leads** until claude is back. Project file: [projects/anonpad.md](../projects/anonpad.md).

## What we ship
A web front end where anyone launches a coin **quoted in wXMR** through mogz.fun's existing launch flow (Meteora DBC). Coins also show on mogz.fun. We write **no on-chain program**.

## Crew + lanes (never edit the other lane's files)

| Lane | Owner | Files | Never touches |
|---|---|---|---|
| **TX** — mogz API, create tx build, wallet sign, cosign, confirm, simulate | **muse** | `src/lib/mogz/**`, `src/lib/tx/**`, `src/lib/wallet/**`, env config | — |
| **UI** — pages, components, copy, styles, read-only data views, SEO, mobile | **deepseek** | `src/app/**` pages, `src/components/**`, `src/styles/**`, `public/**`, copy | anything in TX lane, signing, keys, env secrets |

Muse = lead and merger. DeepSeek works on branches `ui/<thing>`, opens PRs; muse reviews + merges. DeepSeek is a cheap model → **no signing / tx / fee / wallet code, ever** (Sneaks's standing rule).

## Phases (each ends with proof posted on the board)

### P0 — Setup (muse) · today
1. Rename repo `0xSneaks/stealthpad` → `0xSneaks/anonpad` (GitHub rename keeps redirects). If it doesn't exist yet, create `0xSneaks/anonpad`.
2. Replace every "Stealthpad" in code/copy with "AnonPad".
3. Update repo `AGENTS.md`: name, lanes table above, hard stops below.
4. Look up the "AnonPad" Solana token (solanacompass mint `DoAhRQs5iEi65fkwDQDZwi5DeZ6kzSV455eFbh8ZuWhn`). Real project using the name? → tell Sneaks before anything goes public.
5. Read-only: does mogz have a referral / partner / front-end fee program? Answer VERIFIED/UNKNOWN in projects/anonpad.md.
**DONE =** repo URL + `grep -ri stealthpad` returns nothing + 2 answers posted.

### P1 — Read-only site live on preview (deepseek UI, muse deploys) · day 1
- Pages: **Home** (what it is, 3 steps, "be the first XMR coin"), **Launch** (form only, button disabled until P2), **Coins** (list of wXMR-quoted mogz coins from mogz read API, empty state when 0), **Coin** (price, mcap in XMR + USD, curve progress to 112.47 XMR, holders, link to mogz page), **How it works** (get wXMR via wxmr.io, 0.1 XMR bridge min, need ~0.01 SOL for fees, fee split 0.30/0.10/0.10).
- Risk banner on every page: "wXMR is bridged by a single custodial operator. Only use what you can lose."
- Footer: "Built on mogz.fun. Not affiliated with mogz." No mogz logo.
- Mobile first: works at 390px, no horizontal scroll. Lighthouse mobile ≥ 85.
- No wallet, no tracking, no backend in P1.
**DONE =** Vercel preview URL + 390px screenshots of all 5 pages + Lighthouse score.

### P2 — Create flow, simulate only (muse TX) · day 1–2
1. Wallet connect: Phantom + Solflare (wallet-adapter). User's wallet signs. AnonPad never holds keys.
2. Flow: `POST /api/upload` (image + metadata) → build create tx in browser against XMR DBC config → `POST /api/tx/cosign` → **simulate** (`simulateTransaction`, mainnet RPC) → show result. **Do not send.**
3. Before the sign prompt, show the user: name, ticker, quote = wXMR, setup cost in SOL, creator-fee destination (wallet / holders / split).
4. Input checks: name/ticker length, image type + size, no script in text fields.
5. Clear errors for: no SOL, wallet rejected, cosign failed, simulate failed.
**DONE =** simulate log (accounts, CU, fee) for one fake coin posted on the board. Zero broadcasts.

### P3 — Independent review (before any real launch)
- **claude-code** (or claude when back): adversarial review of the TX lane — what gets signed, which accounts, no hidden transfers, no key exposure, cosign response checked before signing.
- deepseek: UI review only (copy, mobile, accessibility).
**DONE =** review handoff with PASS / FIX list. FIXes closed.

### P4 — ⚠️ FIRST REAL LAUNCH — Sneaks yes required
Batch these to Sneaks in ONE message:
1. Fund which wallet, how much (≈0.006 SOL setup + any first buy; mogz $30 budget rule).
2. First coin: name + ticker + image (a test coin or a real one?).
3. Creator-fee destination for that coin.
4. Domain? (cost, which name) — or stay on vercel.app.
After yes: one launch, record tx sig, verify coin shows on mogz.fun AND AnonPad, verify a 1-wXMR-sized buy/sell works, verify creator fee is claimable.
**DONE =** tx sigs + screenshots on the board.

### P5 — Go public
- Production deploy, og:image, X post copy (chatgpt drafts, Sneaks approves).
- Add "Launch an XMR coin" link from Sneaks's other sites only if Sneaks says so.

## Hard stops — ask Sneaks first, batched
- Any on-chain tx or spend. Any real launch. Any domain purchase.
- Any AnonPad token, or using $ANON.
- Any change to signing/tx/fee code by deepseek or another cheap model.
- Anything that collects user data or adds a backend that stores state.

## Board rules
Each agent: claim on BOARD.md before work, sign off with a handoff `handoffs/<date>_<agent>_anonpad-<phase>.md`, keep projects/anonpad.md "Now" current, run `python3 tools/coms_check.py` before pushing. Label claims VERIFIED / INFERENCE / UNKNOWN.
