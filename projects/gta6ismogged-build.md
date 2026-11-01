# DA CITY build-out — crew plan (AI COMS test run)

**Repo:** 0xSneaks/GTA6isMOGGED- · **Live:** https://gta6ismogged.vercel.app/play/ · **Owner:** Sneaks · **Plan by:** claude, 2026-11-01
**Status file for the game:** [gta6ismogged.md](gta6ismogged.md)

This is a test of AI COMS: many agents, one repo, strict order, high quality. Follow it exactly.

## Hard rules (every agent, every commit)
1. **Original only.** No Rockstar/Take-Two names, logos, characters, maps, music, UI or art. No leaked footage or leaked assets, not even as reference. No copyrighted music, fonts outside Google Fonts, or third-party models/textures. Make it in code, or make it yourself.
2. **Branch + PR, never push to main.** Branch `lane/<id>-<slug>`. Muse merges only after review + green CI.
3. **Gate:** `python tests/smoke.py` passes, `node --check` passes, no console errors, screenshots at 390px and 1280px (day + night) in the PR.
4. **Own your files.** Only touch the files your lane owns (table below). Need another lane's file → 📨 request on BOARD, don't edit it.
5. **No wallet, no backend, no spend, no new dependencies** without Sneaks's yes (batched by muse).
6. **AI COMS:** check in (BOARD + this file + inbox), claim your lane on BOARD, sign off with a handoff. Label claims VERIFIED / INFERENCE / UNKNOWN.
7. Deciders between agents: claude-code + astra (RULE.md v2). Sneaks overrides.

## Order
| Phase | What | Who | Blocks |
|---|---|---|---|
| 0 | Split `play/game.js` into ES modules, zero behavior change, CI green | **codex** | everything else |
| 1 | Lanes L1–L7 in parallel (own files only) | OpenCode crew via muse | needs Phase 0 merged |
| 1b | Garage prototype (standalone file) | **grok** | none (merges in Phase 2) |
| 2 | Integrate Garage, balance pass, perf pass on real phones | muse + L7 + claude-code review | Phase 1 merged |
| 3 | Launch: trailer shots, X thread draft, Sneaks posts | muse + grok draft | Sneaks's go |

## Phase 0 module layout (codex)
`play/js/` as native ES modules (`<script type="module">`), three.js stays a global from cdnjs:
`config.js` (constants, tiles enum, nodes) · `state.js` (S, store, helpers) · `world.js` (map gen, buildings, districts, road graph) · `traffic.js` (cars/peds spawn, lane following, recycle) · `police.js` (cop + flee AI, heat, witnesses) · `player.js` (input, camRel, player + car physics) · `missions.js` (STORY, SIDE, jobs) · `audio.js` (sfx, radio) · `ui.js` (HUD, title, share, live data, minimap) · `render/scene.js` (renderer, sky, lights, day/night) · `render/city.js` (static geometry) · `render/actors.js` (cars, peds, coins, markers) · `render/fx.js` (particles, skids, overlay text) · `main.js` (boot + loop).
Keep `window.DACITY` for the smoke test. Done = identical behavior, smoke test green in CI.

## Phase 1 lanes (OpenCode Go models, run by muse)
| Lane | Model (OpenCode Go) | Owns | Build |
|---|---|---|---|
| L1 Vehicles | GPT 6 Luna | `traffic.js` (vehicle defs), `render/actors.js` (vehicle meshes) | Vehicle classes: sports, van, bike, bus, boat on water. Per-class handling + health. Damage visuals (dents → smoke → fire). |
| L2 World | GLM-5.3 | `world.js`, `render/city.js` | Third island (port with cranes + containers), a waterfront highway loop, alleys, a beach pier, landmark per district, more varied building shapes (setbacks, rooftop pools). |
| L3 Story | Qwen3.8 Max | `missions.js` | Chapter 2: 6 new missions (race, escort, timed delivery, chase from cops, rooftop stash via helipad, finale at HQ). Mission select on title. Dialogue in the same dry, funny voice. |
| L4 Police + AI | Kimi K2.7 Code | `police.js` | Pursuit tactics (box-in, roadblocks at heat 3+, spike strips at 5), traffic reacting to sirens, ped panic, smarter flee routes. |
| L5 Audio | MiMo-V2.6-Pro | `audio.js` | Engine sound by speed + class, tire squeal, siren doppler, crash variety, 2 more original radio stations, ambient city at night. |
| L6 UI | MiniMax M3 | `ui.js`, `play/index.html` | Settings (quality, sound, sensitivity, invert), full map view, mission log, controller support, better phone layout, onboarding hints. |
| L8 Visual lab | Claude Code | `play/lab/**` now; later `render/actors.js` car meshes + `render/scene.js` sky (coordinate with L1/L7 via 📨) | Next-gen car silhouettes (extruded profiles, wheels, glass, light glow), sky dome (sun, stars, clouds), neon glow halos, stepped towers. Port after Phase 0. |
| L7 Performance | Kimi K3 | `render/scene.js`, `render/fx.js` | Quality tiers auto-picked by FPS, LOD + distance culling, instanced traffic, FPS meter (debug), target 60 fps desktop / 40+ mid phone. Reviewed by claude-code. |

**Review crew (every PR):** DeepSeek V4 Pro = code review (correctness, perf, file ownership). DeepSeek V4 Flash Vision Exp = screenshot review (390 + 1280, day + night): flags ugly, broken or off-brand frames. GLM-5.3-Flash = runs `tests/smoke.py`, adds a test for every new feature. Qwen3.8 Flash = changelog + README updates.

## Grok (Build with Grok) — Phase 1b
Standalone **DA CITY Garage**: one self-contained HTML file (three.js r128 from cdnjs), original low-poly cars matching the game's style, paint/livery/rims picker, class stats, exports a JSON preset list. No external assets. muse integrates it in Phase 2. Grok also drafts the launch X thread (draft only).

## Sneaks only
Leaderboard backend (costs money) · domain · any wallet/coin action · posting on X.

## PHASE 1 PREP — muse, 2026-11-01

**STATUS (VERIFIED 2026-11-01 ~08:06 ET): Phase 1 has NOT started and must NOT start.** Phase 1 lanes begin only when codex's Phase 0 `lane/0-modules` PR is merged. At prep time the repo 0xSneaks/GTA6isMOGGED- has **no pull requests and only a `main` branch** — Phase 0 has not landed. This section is staging only: lane → model → files → branch map, review crew, gates, merge order. Muse claims each lane on BOARD as it starts it (after Phase 0 merges).

### Lane map (models per Sneaks's directive, 2026-11-01)

| Lane | Model (OpenCode Go) | Branch | Owns (exact files) | Build |
|---|---|---|---|---|
| L1 Vehicles | GPT 6 Luna | `lane/1-vehicles` | `play/js/traffic.js` (vehicle defs), `play/js/render/actors.js` (vehicle meshes) | Vehicle classes: sports, van, bike, bus, boat on water. Per-class handling + health. Damage visuals (dents → smoke → fire). |
| L2 World | GLM-5.3 | `lane/2-world` | `play/js/world.js`, `play/js/render/city.js` | Third island (port: cranes, containers), waterfront highway loop, alleys, beach pier, a landmark per district, varied building shapes. |
| L3 Story | Qwen3.8 Max | `lane/3-story` | `play/js/missions.js` | Chapter 2: 6 new missions (race, escort, timed delivery, cop chase, rooftop stash, finale at HQ), mission select, same dry funny voice. |
| L4 Police + AI | Kimi K2.7 Code | `lane/4-police-ai` | `play/js/police.js` | Box-ins, roadblocks at heat 3+, spike strips at 5, traffic yields to sirens, ped panic, smarter getaway routes. |
| L5 Audio | MiMo-V2.6-Pro | `lane/5-audio` | `play/js/audio.js` | Engine sound by speed/class, tire squeal, siren doppler, crash variety, 2 more ORIGINAL radio stations, night city ambience. |
| L6 UI | MiniMax M3 | `lane/6-ui` | `play/js/ui.js`, `play/index.html` | Settings (quality, sound, sensitivity, invert), full map, mission log, controller support, phone layout polish, first-play hints. |
| L7 Performance | Kimi K3 | `lane/7-performance` | `play/js/render/scene.js`, `play/js/render/fx.js` | Auto quality tiers by FPS, LOD + culling, instanced traffic, debug FPS meter. Target 60 fps desktop, 40+ mid phone. Claude Code reviews this lane (in addition to the review crew). |

### PREP NOTES — plan vs. actual tree (main tree `def87088`, read at prep time)

- **PREP NOTE 1 (blocking fact, not an error): none of the lane-owned module files exist yet.** The current tree has no `play/js/` directory at all: the game is still the monolith `play/game.js` (84,231 B) plus `play/index.html` (13,886 B). Every "Owns" path above is a **Phase 0 layout target** — those files come into existence only when codex's `lane/0-modules` split merges. No lane may be claimed or started against the monolith.
- **PREP NOTE 2 (path ambiguity in the plan): the lane table above in this file lists bare filenames** (`traffic.js`, `render/actors.js`, …), while the plan's own Phase 0 layout roots the modules at `play/js/` and `play/js/render/`. The map above uses the full Phase 0 paths. If codex's split lands different paths, muse corrects this map to the merged tree before any lane starts — nobody guesses.
- **PREP NOTE 3 (L6 is split-state):** L6 owns one file that exists today (`play/index.html`) and one Phase 0 target (`play/js/ui.js`). L6 still waits for Phase 0 like every other lane.
- **PREP NOTE 4 (harness already in place):** `tests/smoke.py` (5,175 B) and CI `.github/workflows/smoke.yml` already exist on main — the review crew's test role and the green-CI gate have their harness; Phase 0's job is to keep them green through the split, not create them.
- **PREP NOTE 5 (screenshots):** gate screenshots (390px + 1280px, day + night) go in each lane PR; the tree already carries `docs/shots/` with the current build's shots — the established location, noted for consistency.

### Review crew (every Phase 1 PR, before merge)

- **DeepSeek V4 Pro** — code review: correctness, performance, did the lane stay in its files.
- **DeepSeek V4 Flash Vision Exp** — screenshot review at 390px + 1280px, day + night: reject anything ugly, broken or off-style.
- **GLM-5.3-Flash** — runs `tests/smoke.py`, adds a test for each new feature.
- **Qwen3.8 Flash** — changelog + README updates.

### Gates (no merge unless all green)

Green CI · `python tests/smoke.py` passes · `node --check` passes · no console errors · screenshots in PR (390px + 1280px, day + night) · real-phone FPS noted by muse. **Muse merges, nobody else.**

### Merge order (when lanes collide)

**L7 → L2 → L1 → L4 → L3 → L5 → L6** (per Sneaks's directive, 2026-11-01).

### Rules reminder

One branch + PR per lane (`lane/<id>-<slug>`); a lane touches ONLY the files it owns — need another lane's file → 📨 request on BOARD, don't edit it. Original content only: no Rockstar names/logos/characters/maps/music/art, no leaked footage/assets as reference, no third-party models/textures/music. No new deps, backend, wallet or spend without Sneaks (batch asks). Phase 2 (Grok's Garage integration, balance pass, real-phone perf pass) starts only after Phase 1 merges.


## UPDATE — CC0 assets approved (Sneaks, 2026-11-01 08:43 ET)
Sneaks approved free **CC0** 3D model packs (public-domain, no permission needed) to replace the code-built boxes. Rule 1 now reads: original game content **or CC0 assets with a license file + credit**; still no Rockstar material, no leaked material, no non-CC0 third-party assets.

### New lane L9 Assets — muse (VM has internet; claude's sandbox can't reach kenney.nl)
- Download CC0 packs: Kenney **City Kit (Commercial)**, **City Kit (Suburban)**, **City Kit (Roads)**, **Car Kit**; Quaternius city/vehicle/character packs **only if** their page says CC0.
- Verify each pack's license text says CC0 (save it). Keep GLB (or glTF) files only. Target total < 25 MB (phones).
- Commit to `play/assets/<pack>/` + `play/assets/CREDITS.md` (pack, author, URL, license, date). Branch `lane/9-assets`, PR, merge.
- Already verified by claude: KenneyNL/Starter-Kit-City-Builder and Starter-Kit-Racing READMEs mark their 3D models CC0 (4 small buildings, roads, trucks, motorcycle) — usable as a fallback set.

### Render ownership change (to avoid two agents in one file)
- **L8 (claude) = Visual overhaul, owns `play/js/render/**` first:** lighting (sky reflections on paint/glass, glow, softer shadows, color grade), then swap boxes for CC0 models once L9 merges.
- L1 / L2 / L7 start with their non-render files (traffic.js, world.js, perf metrics); render edits go through L8 by 📨 until L8 merges.
- Merge order: **L9 → L8 → L7 → L2 → L1 → L4 → L3 → L5 → L6**.


## CREW BRIEF v1
Sneaks sends this exact block to both claude and muse (2026-11-01 ~08:50 ET). Copy below is canonical.
See the reply in chat, also mirrored here on purpose so every agent reads the same thing:
- Goal: the most beautiful free open-world browser game we can ship, our own world, built in days.
- Order: L9 assets → L8 visual → L7 → L2 → L1 → L4 → L3 → L5 → L6. Muse merges; nobody pushes to main.
- Claude (L8) owns play/js/render/**. Muse runs L9, the OpenCode lanes, merges, deploys, phone tests.
- Quality bar: 60 fps desktop / 40+ phone; real models, not boxes; lit night city; smooth camera; driving that feels good (drift, speed sense, engine sound); missions with personality; no visual bugs in the 390/1280 day+night screenshots.

### CREW BRIEF v1.1 — creative direction (Sneaks, 2026-11-01 09:08 ET)
Replaces the brief's "CONTENT" section:
- Take inspiration from the best of gaming: open-world freedom, heists, quests, character-driven stories, game feel. Learn from how great games play; build our own versions.
- Characters: build an original cast from real-world references (street fashion, photography, mood boards, local culture), each with a name, look, voice and role in the story.
- Features in scope: quests and side-quests, multi-stage heists, crew members, collectibles, in-game NFTs (cosmetics, vehicles, property).
- NFTs: design + build off-chain / devnet first. Anything on mainnet (minting, wallets, signing, spending) waits for Sneaks's yes.
- Models: original or CC0 with credit in play/assets/CREDITS.md.
- Sneaks only: money, mainnet, domain, posting on X.
