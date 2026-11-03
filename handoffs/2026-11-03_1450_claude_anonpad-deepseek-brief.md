# DEEPSEEK — AnonPad UI brief (complete, self-contained)

**From:** claude (on Sneaks's order, 2026-11-03 14:43 ET: "needs to be up and running soon") · **To:** deepseek · **Lead/merger:** muse
**Map:** [2026-11-03_1425_claude_anonpad-map.md](2026-11-03_1425_claude_anonpad-map.md) · **Project:** [projects/anonpad.md](../projects/anonpad.md)

## What AnonPad is
A website where anyone launches a meme coin paired with **wXMR** (Monero bridged to Solana). Launches run through **mogz.fun**'s existing system (Meteora bonding curve). AnonPad is the front end. Non-custodial. Phone first.

## Your lane — UI ONLY
You own: `src/app/**` (pages/layout), `src/components/**`, `src/styles/**`, `public/**`, `src/mocks/**`, all copy.
You NEVER touch: `src/lib/**` (muse: data, mogz API, tx, wallet, signing), env files, secrets, `package.json` deps for wallet/solana (ask muse).
You NEVER send or sign transactions, never handle private keys, never add a backend or database, never add tracking.

## Repo + workflow
- Repo: `0xSneaks/anonpad` (if it's still `0xSneaks/stealthpad`, work there; muse is renaming). Branch from `main`.
- One branch per task: `ui/<task>`. Small PRs. Muse reviews + merges.
- Commit author email: `267828012+0xSneaks@users.noreply.github.com` (Vercel previews fail otherwise).
- Every PR description: what changed + Vercel preview URL + 390px screenshot of each changed page.
- Can't push to GitHub? Post the full changed files in your reply to Sneaks; muse commits them.

## Stack (muse set it up; match it)
Next.js (App Router) + TypeScript + Tailwind. No extra UI libraries without muse's OK. Icons: inline SVG or lucide-react. Fonts: Google Fonts only.

## Data contract (agree with muse — do not change the types)
Muse writes `src/lib/types.ts` and `src/lib/data.ts`. Until those exist, build against **mocks** in `src/mocks/coins.ts` using these exact shapes:

```ts
export type Coin = {
  mint: string; name: string; ticker: string; image: string; description?: string;
  creator: string; createdAt: string;            // ISO
  priceXmr: number; mcapXmr: number; mcapUsd: number;
  curveProgress: number;                         // 0..1 toward 112.47 XMR
  graduated: boolean; holders: number; volume24hXmr: number;
  mogzUrl: string; socials?: { x?: string; telegram?: string; website?: string };
};
export type LaunchValues = {
  name: string; ticker: string; image: File | null; description: string;
  x?: string; telegram?: string; website?: string;
  feeMode: 'wallet' | 'holders' | 'split'; feeWallet?: string;
};
export type TradeSide = 'buy' | 'sell';
```
Data functions muse provides (call these, never fetch mogz yourself): `getXmrCoins(): Promise<Coin[]>`, `getCoin(mint): Promise<Coin | null>`.
Interactive pieces take props; muse wires them:
- `<LaunchForm onSubmit={(v: LaunchValues) => Promise<void>} disabled />`
- `<TradePanel coin={coin} onQuote={(side, amount) => Promise<{out:number; fee:number}>} onSubmit={(side, amount, slippageBps) => Promise<void>} disabled />`
- `<WalletButton />` is muse's — just place it in the header.

## Pages (build all)
1. **Home `/`** — hero: "Launch coins paired with Monero." Sub: "Every AnonPad coin trades against wXMR on a bonding curve. Built on mogz.fun." Buttons: Launch a coin · Browse coins. 3 steps: Get wXMR → Launch → Trade. Live strip: newest 6 coins (empty state below).
2. **Coins `/coins`** — grid/list of wXMR coins. Sort: newest, mcap, volume, closest to graduation. Search by name/ticker/mint. Card: image, name, $TICKER, mcap (XMR + USD), curve progress bar, holders. **Empty state:** "No XMR coins yet. Be the first." + Launch button.
3. **Coin `/coin/[mint]`** — header (image, name, ticker, copy-mint button, socials), stats (price, mcap, holders, 24h volume), curve progress "X / 112.47 XMR to graduation", `<TradePanel disabled>`, link "View on mogz.fun" (`coin.mogzUrl`), graduated badge when true. Chart: placeholder box labeled "Chart coming soon" (muse adds later). 404 state for unknown mint.
4. **Launch `/launch`** — `<LaunchForm disabled>` with: image upload + preview (png/jpg/gif/webp, ≤ 4 MB), name (≤ 32 chars), ticker (≤ 10, A–Z/0–9, auto-uppercase), description (≤ 500), X / Telegram / website (URL check), creator-fee mode radio (my wallet / holders / split) + wallet field when "wallet". Cost box: "Setup ≈ 0.006 SOL (network + rent). Trading fee 0.50%: 0.30% creator · 0.10% mogz · 0.10% Meteora." Client-side validation with inline errors. Button text when disabled: "Launching opens soon".
5. **How it works `/how`** — Get wXMR (bridge at wxmr.io, 0.1 XMR minimum each way; or swap SOL→wXMR on Jupiter) · You need a little SOL for network fees · Bonding curve: starts ~7.68 XMR mcap, graduates at 112.47 XMR to a Meteora DAMM v2 pool with locked liquidity · Fees split · Risks (below) · FAQ (5 Qs).
6. **Global** — header: logo wordmark "AnonPad", nav (Coins, Launch, How it works), `<WalletButton/>` slot. Footer: "Built on mogz.fun. Not affiliated with mogz." + links. 404 page.

## Risk banner (every page, dismissible per session, never removed)
"wXMR is bridged by a single custodial operator. Meme coins can go to zero. Only use what you can lose."

## Look
Dark, private, clean — not a mogz copy, no mogz logo or colors. Monero-orange accent on near-black, one mono font for numbers/mints. Define colors as CSS variables in one place. Big tap targets (≥ 44px). Numbers: XMR to 4 decimals, USD compact ($4.2K).

## Must pass (acceptance)
- 390px wide: no horizontal scroll, every page usable one-handed. Also check 768 and 1280.
- Lighthouse mobile ≥ 85 performance, ≥ 95 accessibility.
- All images have alt text; forms have labels; focus visible; keyboard works.
- `npm run build` and `npm run lint` pass with zero errors.
- No console errors. No external calls except Google Fonts and muse's data functions.
- No "Stealthpad", "Ombro", or "$ANON" anywhere.

## Order of work (speed)
1. `ui/shell` — layout, header, footer, risk banner, theme tokens, 404 → PR
2. `ui/coins` — Coins page + CoinCard + mocks (10 fake coins + empty state) → PR
3. `ui/coin-page` — Coin page + TradePanel UI (disabled) → PR
4. `ui/launch` — Launch page + LaunchForm UI + validation (disabled) → PR
5. `ui/home-how` — Home + How it works + FAQ → PR
6. `ui/polish` — Lighthouse, a11y, 390px fixes → PR

## Report
After each PR, post on the board (or to Sneaks if you can't push): branch, preview URL, screenshots, Lighthouse scores, anything blocked. Label claims VERIFIED / UNKNOWN. When done: handoff `handoffs/<YYYY-MM-DD_HHMM>_deepseek_anonpad-ui.md`.
