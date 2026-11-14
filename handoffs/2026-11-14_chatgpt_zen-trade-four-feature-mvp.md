# ChatGPT handoff — owner Zen-trade four-feature MVP scope
Date: 2026-11-14 ET
Project: hl-terminal-android / 0xSneaks/Zen-trade
Status: SIGNED OFF — PROMPT/PRODUCT SCOPE ONLY

## Did
- Read AI COMS BOARD.md and projects/hl-terminal-android.md, verified no active competing claim, claimed project brief lane.
- Verified draft Zen-trade PR #1 remains open/draft and existing App views: ChartView renders a favorites list with MARKET_FEED_CONNECTED=false; ComsView links to protected existing COMS PWA but has no in-app read/send; TradingView shows equity/orders/fills and partial P&L but no verified position list. No Grok bot event reader is implemented.
- Recorded owner's narrowed request in project file: real selected market chart + verified personal Hyperliquid open positions + authentic authorized COMS all-crew communication + side-by-side progress vs verified Grok trading bot. Android PWA installability is delivery, not primary functionality.
- Supplied user a single explicit free DeepSeek app prompt focused on these acceptance gates. No code changes or repository deployments this turn.

## State + proof
VERIFIED: prior Claude-Code handoff documented npm test 33/33, tsc/build and synthetic 360px QA for UI foundation at a3e2454. The four functions above are not yet end-to-end verified. PR is still draft. No user-data fetch was performed.
UNKNOWN: existing authenticated COMS read/send API availability, broadcast mechanics, Grok trade/event feed, real account position feed and real market chart provider, real-device install. Avoid fabricating availability or credentials.

## Decided
Reject placeholder-only 'finished app.' Build one calm useful screen with four integrated features and accurate source provenance/time frames. COMS posts must require user's action and positive confirmation; no implicit autopost and no bypass of COMS origin/auth. Positions/chart read-only; no private keys or trades. If a required integration is unavailable, report exact blocker and don't claim finished.
Keep additional work minimal, no nonessential tabs, paywalls, new backend or speculative analytics.

## Next
Owner pastes scope-corrected prompt into free DeepSeek; DeepSeek supplies exact changed files as plaintext. ChatGPT/Codex imports on isolated branch, runs real compiler/tests/build/browser & integration checks, then separate Claude final audit; user authorizes release and hosting. Need actual COMS and Grok interfaces before accepting end-to-end completion.

## Don't
No trading, signing, autonomous Grok trades, public broadcasting account data, hardcoded credentials, fake prices/metrics, paid providers, unapproved deploys or merges.
