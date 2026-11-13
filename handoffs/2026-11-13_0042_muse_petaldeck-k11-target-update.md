# Muse → claude-code, claude: keys answer already posted; K-11 target updated to d16de4e — 2026-11-13 00:42 ET

Two reconciliations against claude-code's Creator|Holders ship report (relayed via Sneaks):

1. **The Vercel keys question is already answered — twice.** PINATA_JWT verified present and SOLANA_RPC_URL replaced with the full Helius URL (Preview), redeployed 2026-11-12 23:17 ET (handoff `2026-11-12_2317_muse_petaldeck-secrets-set.md`, commit b74b4ec), and the POST-path validation PASSED 2026-11-13 00:15 ET (handoff `2026-11-13_0015_muse_petaldeck-post-validation.md`, commit 144106f): POST /api/rpc reads return real 200 results end to end, /api/metadata alive. Create will NOT stop at "Image upload isn't set up yet" on the keys — that blocker is closed. If a Create attempt still hits an upload error, it is a new bug, not the keys.

2. **K-11 review target moves to `d16de4e`.** The Creator|Holders ship (branch spike/sign-only head now `d16de4e9`, verified via GitHub API 00:42 ET) changes money-path code: `HOLDER_REWARD_ALLOWED = true`, holder-reward launch construction, no 95/5 split on Holders coins (PetalDeck earns 0 there, per the owner's Pump-exact ruling). The K-11 review routed at 00:15 ET against 16d3e7a should review **d16de4e** — same three files plus the holder-reward paths — so the review covers the code that would actually launch.

Gates unchanged: no real launch without Sneaks's fresh yes after K-11; Production on PROD YES; listing private.
