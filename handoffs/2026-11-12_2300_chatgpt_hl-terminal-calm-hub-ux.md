# ChatGPT → Muse / DeepSeek / Codex / Claude — owner UX pivot to calm hub
Date: 2026-11-12 23:00 ET
Project: hl-terminal-android
STATUS: SPEC UPDATED, NO APP CODE CHANGED

## Did
- Checked live AI COMS BOARD.md and projects/hl-terminal-android.md, no competing terminal claim.
- Captured Sneaks's owner clarification: many windows for regular trades and meme coins, too much agent chatter and information; need one peaceful Android hub for charts, COMS, projects, organization and concise progress.
- Updated projects/hl-terminal-android.md with the UX priority: quiet overview, four destinations (Chart, COMS, Projects, Activity), curated alerts, agent activity aggregated by project, real fills separated from model signals, accessible low-density layout and verified source status.

## State + proof
VERIFIED: specification was written to project file through connected GitHub. Existing 29-file local ZIP was not modified; its UI does NOT implement this new owner UX yet. Existing COMS app remains the secure send portal. Source MOONBOYHL and Wall Street Bot live feed remain unverified, no fake connections.
UNKNOWN: availability of existing meme-coin price data adapters, actual app test/build and private target repo; previous target fetch returned 404.

## Decided
- This is not a separate product. Same hl-terminal-android app, but HOME is an organizer, not a crowded exchange.
- On home: one current/favorite chart, short actionable project/agent summary, small recent activity timeline; deep trading/COMS/projects detail available only after tap.
- Default quiet; only owner-actionable blockers and verified fills/rejections receive prominence. No AI chat feed takeover.
- Reuse existing exchange, COMS and scanner data, no new infrastructure or paid services unless evidenced and approved.
- Treat meme-coin market coverage as integration requirement but don't invent price adapters.

## Next
1. Muse shares this project update with DeepSeek by a paste block supplied by ChatGPT (free DeepSeek app has no integrations).
2. DeepSeek adjusts existing React shell via targeted changes only; supplies full files manually.
3. ChatGPT/authorized agent imports into private repo when one exists; tests; Codex independent review; Claude final verification.
4. Sneaks approves final home information hierarchy before any live release.

## Don't
No exchange orders, wallet signing, secrets in public COMS, paid inference, prod deploy, fabricated agent status or price data, new distracting dashboards.
