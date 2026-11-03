# AnonPad — XMR config RECONCILED (muse, 2026-11-03 15:40 ET)

Sneaks stopped the funding and demanded reads. He was right to: my "the XMR config was never initialized" claim was wrong as stated. Full reads, no SOL moved.

## What is actually true (all VERIFIED on-chain, mainnet, public RPC + Helius)
- The config mogz's quote list assigns to wXMR — `HVo5h99VcQrzfjq7FRjVrbXEZkAjcoU1aHFoBoPFZcRz` — does NOT exist on-chain (getAccountInfo: NOT FOUND on both providers; control: the SOL config B646J17u… exists, 1,048 B, both providers). mogz's /api/tx/create builds XMR creates against HVo5h (P2 tx decode, account #2) — so mogz's XMR launch path fails regardless of funding. The blocker is mogz's pointer, not our wallet.
- A DIFFERENT, live wXMR config exists: `FHWgd6phRkeNf6UvxkJc4P3xxjo4yPYxQo1bmrSR5axp` (DBC-owned, 1,048 B, wXMR mint at offset 8 — same layout slot as SOL in the SOL config). Found by enumerating all 2,469 DBC config-sized accounts: exactly ONE references the wXMR mint.
- **12 pools trade on FHWgd6** (memcmp scan, config offset 72; pool list + creators in muse's p2/wxmr-pools.json), from 10 distinct creators. One of those pools (27qDe17hT…) was swapped through Jupiter minutes before the check: sig mDspCDwND8mx7fEA65yDP5e3YirXZ4Los96pV8t6MSeomK28kADhvC7cMEEozWLe1ZADTySJHMymfJu8kvwt6jY (RouteV2 → DBC Swap).
- mogz indexes NONE of them: full census of mogz's coin API = 350 coins (245 SOL / 91 MOGZ / 7 USDC / 7 SPCX / 0 wXMR); item lookup for a FHWgd6 mint returns "Coin not found"; DexScreener shows no pairs for sampled mints either. Operator of FHWgd6 = UNKNOWN (not mogz's index, not attributable from reads).
- ombro.fun is a separate system: its coins are pump.fun coins (mint 2meaB6FF…xmr create sig 5QeMSHqGbDUzuBgESEjfGf8YvGXBAfpsamg7cnbJS43dUENy1dnep8GXKvdcRW5iiz3x4kghUxG6WexZUVau3uzc contains pump program 6EF8…, no DBC). Its 46 coins / holders-paid-in-XMR stats are about pump.fun + an XMR payout engine — they never touched the mogz config question.

## Fee wallet — answered by read
No mogz coin shows a fee recipient different from its deployer (GTA$/TUFF/RUNNER walked to create txs: creator == fee payer, 3/3; the proven create payload has no fee-wallet field). Consequence for the map: for creator fees to land at B4rEgdbjNCQiQAV93Xrw3qicZ5pXMjBqXJRA7wyL9BUU, coin #1 must be CREATED FROM that wallet — or the fee destination in the map changes to the creating wallet.

## Decisions this forces (Wed 18:00 batch)
1. Config route: (a) get mogz to point its XMR quote at a real config / initialize HVo5h, or (b) AnonPad integrates Meteora DBC directly against FHWgd6-class configs (bigger build, no mogz dependency), or (c) park launches, ship read-only over the 12 live pools.
2. Funding: DO NOT FUND YET — funding never fixed this leg. When a route clears: 0.01 SOL to 2LYQUArYnaYR2YTePK99mUiYU5mFXn1qZqe5b3xGsvHt (covers 0.00089 rent + 0.00597408 setup + headroom); unspent SOL stays in the wallet and sweeps back on Sneaks's word.
3. UI copy: "be the first XMR coin" is dead (12 wXMR DBC coins exist + Ombro's pump coins). Only safe first-claim: first coin launched on AnonPad.
