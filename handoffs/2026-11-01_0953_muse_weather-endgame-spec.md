# DA CITY — Weather-First Sequencing + Endgame Event Spec

*Written 2026-11-01 by Muse, on Sneaks's directives from the live call (~09:46–09:52 ET). Grounded in the codebase as of main `cd0d325ee9ff` (Phase 0 module split). DESIGN + SEQUENCING ONLY — no code in this document ships by itself; each lane implements its own slice.*

---

## PART 1 — SEQUENCING: WEATHER IS LAYER ONE

Sneaks's ruling, verbatim in substance: **weather comes first because it affects every aspect of the game — whether you walk inside or outside.** Order of integration:

1. **Claude's lighting fix** (L8, in flight — dusk/black-frame regression; sky-reflection step is the suspect).
2. **Model swap** (L9 Assets — CC0 packs, confirmed GO by Sneaks first-hand ~09:47 ET).
3. **WEATHER (this spec)** — the first *systems* layer after visuals. It lands before any new content layer that would have to be built twice without it.
4. **Endgame event** (Part 3) — its late stages *force* storm state, so it cannot be built before weather exists.
5. Everything else downstream (casino district, Phase 2 content) inherits weather for free.

In-flight lanes (L3 Story, L4 Police, L5 Audio, L6 UI, L10 Soundtrack) do **not** stop. Weather's shared-file touches (see Collision Register) are applied at merge time by Muse in the merge order, so parallel work never blocks on them.

---

## PART 2 — THE WEATHER SYSTEM

### 2.1 Current state of the code (what weather builds on)

- **Time-of-day lives inside the renderer.** `play/js/render/scene.js` computes the sun angle from `S.time / 360` every frame and derives `night` / `dusk` factors, then drives sky color, `scene.fog`, hemisphere/sun intensity, facade emissive, lamp glow, and `toneMappingExposure`. There is **no weather state anywhere** — no rain, no cloud cover, no fog variation beyond the fixed fog range (700 → 1700 touch / 2400 desktop).
- **Particles exist and are capped.** `play/js/render/fx.js` runs a pooled `THREE.Points` system (PMAX 700) fed from `S.parts` (kinds: spark, smoke, confetti, text) plus an instanced skid-mark mesh (400). Rain must live inside this budget discipline, not beside it.
- **Grip has exactly one chokepoint.** `play/js/player.js` `drivePhysics()` lateral-velocity damping uses `grip = hand ? 1.6 : 8.5`. Player, traffic, and police all drive through this one function. One multiplier changes driving feel city-wide.
- **Audio is synthesized tones.** `play/js/audio.js` has a `tone()` helper, an `sfx` table, and the procedural radio. There is **no ambient layer at all** today — no wind, no room tone. Weather audio is a new ambient bus, not a tweak.
- **Pedestrians are simple.** `play/js/traffic.js` `updatePeds()` walks peds on walkable tiles (`WALK/PARK/PROM/SAND/LOT` per `world.js`). No reactions to anything today.
- **There are no enterable interiors.** Buildings are solid tiles (`solidAt()`); "indoors" in the current build means *under cover* — the two Moonbridge rows (`BRIDGE_Y` in `world.js`), building pads, and the promenade. The indoor leg of weather is therefore: **rain occlusion + audio muffling under cover**, specified now, and a standing rule for the first real interior (Causeway Club / garage) when it lands: interior spaces read the same weather state for windows, door sound, and ambience bleed. Do not fake interiors that don't exist.

### 2.2 Weather state machine (new module: `play/js/weather.js` — L2 World)

A single state object, owned by L2, read by everyone else. Nobody else writes it.

```js
S.weather = {
  state: "clear",        // clear | overcast | rain | storm | fog
  wet: 0,                // 0..1 surface wetness (lags rain; dries slowly)
  wind: 0,               // 0..1, drives audio + tree/sign sway hooks
  front: 0,              // 0..1 progress toward next state change
  forced: null,          // mission/event override (Part 3 uses this)
}
```

Rules:

- **States:** `clear`, `overcast`, `rain`, `storm`, `fog`. Fog is a morning-weighted state; storm is rain + wind + lightning.
- **Transitions are fronts, not switches.** A front rolls in over 20–40 s of game time: sky darkens first, wind rises, then precipitation starts. Clearing reverses the order. `front` is the blend factor every consumer lerps on — no consumer ever hard-cuts.
- **Cadence:** state changes every ~3–6 minutes of play, weighted: clear 40% / overcast 25% / rain 20% / fog 10% / storm 5%. Storm is rare enough to feel like an event. Night storms read scarier for free via the existing night factor.
- **Wetness is a memory, not a mirror.** `wet` rises while raining (≈ +1/45 s), falls when not (≈ −1/180 s, slower at night). Grip, reflections, and skid length read `wet`, so the city stays slippery after the rain stops — the single most "alive" detail in the system.
- **Deterministic seed for tests:** weather RNG uses its own `mulberry32` stream (pattern already in `state.js`) so `tests/smoke.py` can force states.
- **Loop hook:** `updateWeather(dt)` is called from `main.js` beside `updateEffects(dt)` — one added line (see Collision Register).

### 2.3 Consumer map — who does what with the state

| Piece | Behavior | Module | Lane |
|---|---|---|---|
| Sky & light | Overcast desaturates `skyDay` toward grey-violet; storm sky drops exposure; fog state pulls fog near/far in hard (700→ ~250 near) | `render/scene.js` (lerp targets beside existing night/dusk math) | **L8 / Claude** |
| Fog | `scene.fog` color tracks sky as today; distances scale with state + `front` | `render/scene.js` | **L8 / Claude** |
| Wet surfaces | Ground/water response: raise `poolMat`-style sheen on roads — implement as a wet-sheen overlay plane set + roughness drop on the water material; building `facadeMats` get a slight specular lift. All scaled by `S.weather.wet` | `render/city.js` (`createCity` materials) | **L8 / Claude** |
| Rain itself | A dedicated `THREE.Points` streak field around the camera (recycled volume, ~600 drops desktop / ~250 touch, inside the fx budget discipline), slant = wind. Splashes reuse `burst()` at ground level, throttled | `render/fx.js` | **L8 / Claude** |
| Lightning | Storm only: random 4–9 s cadence — a 60–120 ms exposure/hemi flash (double-blink pattern), thunder follows 0.4–2 s later (distance lie), occasional `shake(1)` at closest range | flash: `render/scene.js`; thunder: `audio.js` | **L8 + L5** |
| Vehicle grip | `drivePhysics()` grip multiplier: `grip * (1 - 0.45 * wet)` on ROAD, less on SAND already loose (sand reads `wet` at half rate — mud), bridges full effect (exposed). Skid marks live longer & spawn easier when wet (threshold in the skid writer) | `player.js` (one multiplier) + `traffic.js` (skid spawn) | **L2 spec, L1 applies** ⚠️ |
| Traffic behavior | AI cars cap speed × (1 − 0.25·wet); headlights on in rain/fog regardless of time of day (`actors.js setNight()` gets a weather OR-term) | `traffic.js`, `render/actors.js` | **L2 + L8** ⚠️ |
| Pedestrians | Rain/storm: peds hurry (speed × 1.5), path bias toward WALK/PROM covered edges and away from open PARK/SAND; a fraction shelter in place under pads/bridges until rain eases. Fog: peds slow slightly. Umbrella prop is an actors-mesh question — **deferred**, behavior ships first | behavior: `traffic.js updatePeds()`; props: `render/actors.js` | **L2** (props L8, deferred) |
| Police | No fairness exploit: cops read the same grip multiplier (they do — same `drivePhysics`), and heat decay is unchanged. Storm slightly reduces witness radius (`police.js witness()` range × 0.8 in storm — rain hides crime, funny and fair) | `police.js` | **L4 reviews, L2 specs** ⚠️ |
| Audio — ambience | New ambient bus in `audio.js`: filtered-noise rain loop (gain ∝ rain intensity), wind loop (gain ∝ `wind`), thunder claps (noise burst + low sine drop, delayed after flash). Under cover (bridge rows / pads): rain gain −60% + lowpass — the "indoors" cue | `audio.js` | **L5 Audio** |
| Audio — surface | Tire/splash sfx hooks scale with `wet` when L5's vehicle audio lands; no new files | `audio.js` | **L5 Audio** |
| HUD / comms | Small weather glyph beside the district toast + a one-line toast on front arrival ("🌧 Front rolling in…"). Forecast is flavor, not a system: the phone/radio can lie about it (L6's call on flavor text) | `ui.js` | **L6 UI** |
| Missions | Missions may *read* weather (flavor, Part 3 forcing) but Chapter 2 content must not *require* a random state — only `forced` states gate progress | `missions.js` | **L3 Story** |

### 2.4 Performance + platform guardrails

- Rain Points field is one draw call, recycled around the camera; counts halve on `isTouch` (same flag `scene.js` already computes).
- Fog state *reduces* far plane load — weather must never cost frames on a mid phone; if anything, fog is a perf subsidy.
- No new dependencies, no new assets, no backend. All procedural, matching the game's existing construction.
- `tests/smoke.py` gains, per weather PR: force each state headlessly, assert no console errors and `S.weather` transitions — GLM-5.3-Flash adds the test per the standing review-crew rule.

### 2.5 Collision register (flagged explicitly, per Sneaks's lane rules)

1. **`play/js/state.js` (SHARED) — `S.weather` field.** One object added to `S`. Every lane reads state; nobody else adds weather fields. Muse applies at merge.
2. **`play/js/main.js` (SHARED) — one `updateWeather(dt)` call + import.** Applied at merge by Muse, after L8's lighting PR, to avoid racing the in-flight lanes.
3. **`play/js/player.js` — grip multiplier line.** `drivePhysics()` is L1 Vehicles' handling surface, but the multiplier is weather's. **Resolution:** L2 writes the exact one-line change (`grip *= (1 - 0.45 * S.weather.wet)` via an exported `gripMul()` from `weather.js`); L1 reviews it in the weather PR; Muse merges. L1 does not re-tune base grip in the same window.
4. **`play/js/traffic.js` — ownership already contested** (roster study: board gives L4 `police.js` only; an earlier brief said "AI parts of traffic.js"). Weather needs `updatePeds()` + traffic speed caps here. **Resolution proposed:** traffic *behavior* hooks for weather go in L2's weather PR with L4 as reviewer; the standing L2/L4 traffic question stays open for Claude/Sneaks — flagged, not settled by this spec.
5. **`play/js/render/scene.js` — Claude's lighting fix is in flight in this exact file.** Weather's scene hooks are written *against the post-fix file*. Weather render work does not branch until
...[truncated 7402 chars]