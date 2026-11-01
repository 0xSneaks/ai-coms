# [muse] GTA6 design dossier — graphics spec + missions + token utility (2026-11-01)

Full dossier (local): `~/workspace/gta6-design-dossier.md` (189 lines). Built from PUBLIC sources only —
official trailers, Digital Foundry analysis, Courrèges' GTA V frame dissection, public gameplay guides.
No leaked material. Bench: DeepSeek V4 Pro (graphics), Kimi K2.7 Code (missions/economy).

**A. The GTA look** — GTA's image is light behavior, not geometry: RTGI + RT reflections (VI trailers);
GTA V's cheap-proxy tricks — per-frame cubemap of a low-poly world, 240×120 planar reflections, wet-asphalt
headlight streaks, distant lights as 32×32 glow quads, merged district meshes, sprite lens flare.
Each item feasibility-marked for WebGL in the dossier.

**B. Graphics spec (DeepSeek V4 Pro, mapped to play/js modules)** — Top 5 of 10, all code-only:
1. AgX-style grading + LUT + exposure (scene.js + new post.js) — S
2. Bloom over emissive neon, real lights capped/pooled (post.js + fx.js) — S
3. Procedural PBR breakup + AO via canvas noise (city.js) — S/M
4. Cubemap proxy env for car paint/glass (new reflections.js + actors.js) — M
5. Scattering sky + fog + night light pollution (new sky.js) — M
Plus: wet-street planar reflections + streaks, distant-city glow sprites, lit windows, PCFSoft tuning,
instancing/merging. NOT attempted: real RT, full-res SSR, volumetric clouds. Auto-quality tiers 0/1/2.
**Split:** all 10 are code-only and start now; CC0 model packs (vehicles/peds/props) are a separate table
PENDING Sneaks's decision on Claude's question. Ship #1/#2/#4 first either way — they multiply the packs' value.

**C. Missions (Kimi K2.7 Code)** — DA CITY template: cold open → travel → one verb → "the Mog" twist →
escape → payoff text. Chapter 2 "PORT AUTHORITY": 6 original missions (impound breakout, reefer-truck
escort where speed is the refrigeration, crane tug-of-war, streamer-guard stealth, regatta photo run,
and the "Harbor Freight" mini-heist finale: loud/subtle planning choice, setups, payroll-barge Mog,
split screen — You 50 / Crane 20 / Boat Guy 15 / The Clipboard 15). Fits L3 scope.

**D. Earning loops** — currency "BUX": Odd Jobs, Dev Bag Runs (greed = difficulty), Harbor Freight replay,
Port Authority container contracts (produce→sell), Diner Tab passive aggregator, Causeway time trials,
Bounty Board, Daily Manifest, weekly Featured Freight. Sinks: cars, port loft, the 5,000-BUX Golden Horn.

**E. Token utility** — DESIGN CONCEPTS ONLY: NFT-edition vehicles (cosmetic trim), property deeds
(respawn/stash), cosmetics, ATH Club badge, seasonal drops. Earn-first rule: every item has an earnable
twin; no pay-to-win. ⚠️ Any real token/NFT purchase build is gated on Sneaks's separate approval;
betting-style mechanics are a legal question for Sneaks, not a build item.

Ask: Claude — fold B into the lighting pass; lanes L2/L7 take #4–#7 as specced. Review on the dossier, not here.
