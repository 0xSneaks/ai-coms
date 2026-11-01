# OG Flywheel site — BUILD + DEPLOY sign-off · muse · 2026-11-01 12:10 ET

## Owner correction applied
Sneaks's 2026-11-01 11:53 ET correction supersedes the 11:41 ChatGPT ETH-OG brief and the earlier OG BOOMER plan: this is a NEW site for OG (ticker OG), a NEW Flywheel launch on Robinhood Chain. NOT OG BOOMER, NOT the Ethereum $OG, NOT ogmode.vip / OG CTO / OG Ticket. No contract, socials, art, or links from any other OG project were used.

## Did
- Researched Flywheel against official docs (Crius launchpad docs + Sumo launch guide, read live 2026-11-01): flywheel.cash on Robinhood Chain; tokens launch directly into a Uniswap v4 pool (no bonding curve/migration); creation fee 0.0005 ETH; 4% swap tax = 2.95% rewards (creator or holders, set at launch) / 0.95% platform / 0.05% burn / 0.05% locked liquidity; supply creator-set at launch (platform default 100B, 18 decimals); optional dev buy inside the atomic launch tx — its cost depends on the pool opening price, there is NO fixed dollar cost for 0.5% of supply; a token address exists only after the launch tx lands.
- Built the site in a NEW local repo ~/workspace/og/ @ 1fa5f5b (plain HTML/CSS/JS, no deps, no wallet code): Hero "YOU'RE NOT OG." with the owner-supplied approved gold-rim OG logo (sha256 381ec258…, visually verified), OG Museum timeline, How OG Are You? quiz + shareable result card, OG Arcade "Survive the Cycle" (60s canvas game, touch/keys, local leaderboard, shareable score card), Meme Factory (3 templates, PNG download), Launch section (contract PENDING, socials TBA, trading NOT LIVE + verified Flywheel facts with sources), cane-tap easter egg, reduced-motion support.
- Deployed to a NEW Vercel project `og-flywheel` (prj_02kObFJnOMtsxHBwzjIrQJYEmrVv) via the connector; final production deployment dpl_DLk4puDGoziWKZ9NvREUkkoL2Pyv READY. ogmode.vip untouched. $0 spent, no domain bought, no wallet activity, no token launch.
- Dev wallet recorded internally only (owner-supplied 2026-11-01 11:54 ET): 0x07057E8758ccDa20F58832Af036Df91d89E9cf45 — NOT displayed on the site.

## Proof
- LIVE: https://og-flywheel.vercel.app/ returns HTTP 200 publicly (no login wall); live index.html/styles.css/script.js are byte-identical (cmp) to the local repo.
- QA (Playwright, local build = live bytes): 320px / 390px / desktop — no horizontal overflow, 0 console errors; quiz completes to a verdict and its result-card PNG downloads; game plays (HUD score/lives/time live), an idle run ends, score saves to the local leaderboard, share button enables; meme PNG downloads. verify.py ALL PASS (forbidden-identity scan clean: no 0x address anywhere on the site).
- Independent review (Blue-1): overall PASS on identity isolation, no fake data/wallet code, launch-fact accuracy vs sources, and live byte-identity; 3 minor nits found (share-card image race, era-quote toggle, lowercase-only keys) — all fixed in 1fa5f5b and redeployed.

## Blockers / next
- GitHub repo creation is BLOCKED: the stored PAT returns 403 on POST /user/repos (known limit). Source is committed locally (~/workspace/og/ @ 1fa5f5b) + delivered to Sneaks as a zip; creating 0xSneaks/og-flywheel-site in the web UI unblocks a push.
- Awaiting owner: launch date, supply decision, rewards mode, official X/Telegram — the Launch section is structured to drop them in without a redesign.
