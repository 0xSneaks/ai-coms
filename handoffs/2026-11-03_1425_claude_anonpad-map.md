# AnonPad — full map to a working launchpad on mogz.fun

**claude SIGN-OFF 2026-11-03 14:25 ET.** muse leads. deepseek = UI only. Detail plan: [2026-11-03_1415_claude_anonpad-plan.md](2026-11-03_1415_claude_anonpad-plan.md) · project: [projects/anonpad.md](../projects/anonpad.md)

## Fixed facts (muse VERIFIED 2026-11-03)
- Program: Meteora DBC `dbcij3LWUppWqq96dh6gJWwBifmcGfLSB5D4DuSMaqN` → graduates to DAMM v2, LP locked
- Quote: wXMR `WXMRyRZhsa19ety5erZhHg4N3xj3EVN92u94422teJp` · XMR config `HVo5h99VcQrzfjq7FRjVrbXEZkAjcoU1aHFoBoPFZcRz` (not on-chain yet)
- Curve: start 7.681 XMR → graduate 112.47 XMR · trade fee 0.50% (0.30 creator / 0.10 mogz / 0.10 Meteora) · setup ≈ 0.006 SOL
- mogz create API: `POST /api/upload` → build tx in browser → `POST /api/tx/cosign` → `POST /api/tx/confirm`
- First launch: muse launches · creator fees → `B4rEgdbjNCQiQAV93Xrw3qicZ5pXMjBqXJRA7wyL9BUU`

## Stage 1 — Setup (muse)
1. Rename repo to 0xSneaks/anonpad. Remove "Stealthpad" everywhere.
2. Next.js + Tailwind + Solana wallet-adapter (Phantom, Solflare). Vercel project, git-connected.
3. AGENTS.md: lanes, hard stops, stack.
✅ Proof: repo URL, grep shows no "stealthpad", Vercel preview builds.

## Stage 2 — Read side (deepseek UI, muse data layer)
1. Data layer (muse): list wXMR-quoted coins — mogz read API filtered by quote = XMR; fallback = on-chain DBC pools by config `HVo5h99…`. Per coin: price, mcap (XMR + USD), curve %, holders, volume.
2. Pages (deepseek): Home · Coins (empty state "be the first XMR coin") · Coin page · How it works · Launch form (button disabled).
3. Risk banner every page. Footer "Built on mogz.fun. Not affiliated with mogz."
4. 390px phone first. Lighthouse mobile ≥ 85.
✅ Proof: preview URL + 390px screenshots of every page.

## Stage 3 — Launch flow (muse, simulate only)
1. Form: name, ticker, image, description, socials, creator-fee mode (wallet / holders / split).
2. Upload → build create tx vs XMR config → cosign → **simulate**. Never send.
3. Confirm screen before signing: name, ticker, quote wXMR, SOL cost, fee wallet.
4. Check cosign response: only expected accounts, no extra transfers.
5. Errors: no SOL, wallet rejected, cosign failed, simulate failed.
✅ Proof: simulate log (accounts, CU, fees, fee wallet = B4rE…9BUU) on the board. 0 broadcasts.

## Stage 4 — Trade flow (muse, simulate only)
1. Buy/sell on Coin page via Meteora DBC swap (Meteora DBC SDK) or mogz trade API if one exists — check first, label VERIFIED/UNKNOWN.
2. Slippage setting, min-out, quote preview in wXMR.
3. After graduation: route to DAMM v2 pool or link to Jupiter.
4. "Get wXMR" panel: link wxmr.io bridge + Jupiter swap SOL→wXMR. Show 0.1 XMR bridge minimum.
✅ Proof: buy + sell simulate logs.

## Stage 5 — Creator fee claim (muse)
1. "My coins" page: connected wallet sees its coins + unclaimed fees.
2. Claim via mogz UI link or DBC claim instruction — whichever is VERIFIED.
✅ Proof: claim simulate log (or UNKNOWN until first coin exists).

## Stage 6 — Independent review (before any money moves)
1. claude-code adversarial review of every signing path (create, swap, claim).
2. deepseek UI pass (copy, mobile, accessibility).
3. Close every FIX.
✅ Proof: review handoff PASS. Sneaks may waive in writing.

## Stage 7 — ⚠️ First live launch (Sneaks yes, ONE batched ask)
Ask once: fund amount + source wallet · coin name/ticker/image · domain or vercel.app.
Then: launch → verify coin on mogz.fun + AnonPad → tiny buy/sell → verify fees land at B4rE…9BUU.
✅ Proof: tx sigs + screenshots.

## Stage 8 — Go public
Production deploy, og:image, X post (chatgpt drafts, Sneaks approves), monitoring (Vercel errors, daily coin-list check).

## Hard stops (always ask Sneaks, batched)
On-chain spend or broadcast · real launch · domain purchase · any AnonPad/$ANON token · cheap models editing signing/tx/fee code · storing user data or keys.

## Every agent, every session
Check in on BOARD.md → claim → work your lane only → handoff `handoffs/<date>_<agent>_anonpad-<stage>.md` → update projects/anonpad.md "Now" → `python3 tools/coms_check.py` → push.
