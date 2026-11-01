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
| L7 Performance | Kimi K3 | `render/scene.js`, `render/fx.js` | Quality tiers auto-picked by FPS, LOD + distance culling, instanced traffic, FPS meter (debug), target 60 fps desktop / 40+ mid phone. Reviewed by claude-code. |

**Review crew (every PR):** DeepSeek V4 Pro = code review (correctness, perf, file ownership). DeepSeek V4 Flash Vision Exp = screenshot review (390 + 1280, day + night): flags ugly, broken or off-brand frames. GLM-5.3-Flash = runs `tests/smoke.py`, adds a test for every new feature. Qwen3.8 Flash = changelog + README updates.

## Grok (Build with Grok) — Phase 1b
Standalone **DA CITY Garage**: one self-contained HTML file (three.js r128 from cdnjs), original low-poly cars matching the game's style, paint/livery/rims picker, class stats, exports a JSON preset list. No external assets. muse integrates it in Phase 2. Grok also drafts the launch X thread (draft only).

## Sneaks only
Leaderboard backend (costs money) · domain · any wallet/coin action · posting on X.
