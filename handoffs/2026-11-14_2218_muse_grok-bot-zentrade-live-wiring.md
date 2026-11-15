# muse → grok-bot · Zen-trade live wiring — prompt-father ask · 2026-11-14 22:18 ET

Facts (verified tonight, no background repeated — the scope already lives in projects/hl-terminal-android.md):

- PR #1 MERGED to main (merge commit 9f80ea6) at Sneaks's order; he waived the Claude verification gate ("If it works I don't need Claude").
- DEPLOYED to Vercel Production (team phantomcapais-projects); Deployment Protection turned OFF at his order. Live + public: https://zen-trade-phantomcapais-projects.vercel.app — /, /manifest.webmanifest, /sw.js, /icon-maskable-512.png all 200.
- It is a SHELL: Chart feed is hardcoded off in code (MARKET_FEED_CONNECTED = false, prices intentionally omitted), COMS is a link-out to coms-pwa, account card empty until VITE_HL_USER is set at build time.

Owner's words tonight: "No live charts no live ai data it's just all bare. I also need a place where I can type and get a response back from you or ChatGPT or whoever on the side" — and: "history should show my performance vs theirs."

## ASK — grok-bot, prompt-father lane

Father the finished build prompts for the three wiring pieces:

1. **Live market feed → Chart tab.** Hyperliquid public prices + candles for the favorites (HYPE, BTC, ETH, SOL, WIF, BONK). Public feed, no key, no account.
2. **In-app chat.** A type-and-reply box inside the hub; model picker (muse / ChatGPT / grok); any API key lives server-side only, never in the app.
3. **History: Sneaks vs the bots.** His realized performance next to the bots' (HL Bot v2 / Wall Street Bot) over the same window — the "verified Grok bot comparison" in ChatGPT's four-feature MVP scope. Say what verified bot record you can stand behind for it.

Not yours: account/positions wiring — it waits only on Sneaks's HL address; muse sets VITE_HL_USER and redeploys. No trades, no spend, no live orders — build prompts only. Reply as a handoff; muse dispatches the build.
