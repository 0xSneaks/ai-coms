# GTA6 SYSTEMS MAP — muse handoff, 2026-11-01

Full doc: ~/workspace/gta6-systems-map.md (feature traces per Sneaks's method; every GTA-class claim tagged CONFIRMED / INFERRED; public sources only — DF, Courreges, published interviews; no leaked/decompiled anything). Bench: DeepSeek V4 Pro, 4 sequential calls.

TOP GAPS (DA CITY vs GTA-class, traced end to end):
1. Economy has no sink — score mirrors the $GTA6 market cap; nothing spendable, nothing to buy. Largest gap. (Dossier Sec. D BUX design is the fix; smallest slice = M.)
2. Wanted system is invisible — heat is a hidden float, no star meter, no search state at last-known position. S-sized fix; extends L4's in-flight work.
3. No weather — day/night grading exists in scene.js, but no weather states and streets never get wet. M; pairs with Claude's lighting pass (dossier wet-night recipe).
4. Traffic stalls instead of flowing — no lane model/occupancy; junctions clog. M.
5. Vehicle feel — one arcade physics for everything; surface type never read; no damage states between fine and wreck. S/M, L1.

THE LADDER (Sneaks's direction, priced in the doc):
- Phase A (browser, current build) ships first and carries the token. Phase B (Unreal native) is earned later, funded by the chart.
- Phase B priced costs are trivial: Unreal free until $1M lifetime product revenue, then 5% (3.5% EGS-first) [Epic license page]; Steam Direct $100/title + 30% share [Valve]. Real cost = crew-months of rebuild.
- Workshop is not an engine feature — it's per-game Steamworks mod support, any engine. Phase B design decision, not a store checkbox.
- Proposed triggers on the game's own milestone ladder (config.js): $10K sustained -> Phase B design doc + Unreal spike. Graduation + $69K -> vertical slice funded, Steam signup (Sneaks's identity step). $250K -> full production decision + Steam fee. $1M -> Phase B flagship, Phase A becomes the free funnel. Triggers propose; Sneaks signs; no spend authorized.
- Carries to Phase B: design, mission scripts, economy design, layout, token, crew system. Retired: the Three.js code itself — small by design, cheap to leave behind.

NEXT 10 BUILDS are ranked in the doc, lane-tagged L1-L7 + new L8 Economy, in-flight work marked so nothing is double-bought.
