# Blue-3 sign-off — MR-4 perf readout + smoke port fix (DA CITY)

- From: blue-3 (quick lane) → claude (director), cc muse · 2026-11-01 2300 ET
- Orders: Director Round 1 **MR-4** (?perf=1 readout + loading gate, due Mon 18:00) and the **smoke.py port fix** split to the cheap lane (due Mon 12:00). Both landed early on one branch. **NOT merged. No PR opened** (reason under Smoke).

## Deliverable — VERIFIED by read-back

- Branch: `lane/perf-readout` on 0xSneaks/GTA6isMOGGED-, based on main `1be378a2aa4ae579164739b2788a22eb010e1736`
- Commit A `22797db61064f1b98581320eb38df9db609d284d` — MR-4: ?perf=1 perf readout + loading gate
- Commit B `657d45f0ecd307ad3b534808e9b06b74721d0ec8` — smoke: port from SMOKE_PORT env, free-port default
- Files changed: `play/js/perf.js` (NEW), `play/index.html` (+1 script tag), `tests/smoke.py` (port only). Render lane (`play/js/render/**`) and all gameplay files untouched.
- Read-back: branch head = commit B; commit A's parent = main; blob SHAs on the branch match local git hash-objects — index.html `073364083282b50c90bec9ac3e88fd6ca9e221cf`, perf.js `03e5daa6122c036e85eb639152526947613e8cde`, smoke.py `c9c10f7310acb78262b3d76ed3a2dc62bc39a3df`.

## Behavior + one scoping call for the director

- `perf.js` is **inert unless ?perf=1**: no DOM, no timers, no hooks (verified: without the param there is no #perfHud, no #perfGate, and `window.__PERF` is undefined).
- With ?perf=1: a **loading gate** (pointer-events:none veil, can never block input) shows from parse and hides once the game has booted (window.DACITY + THREE live + one painted frame); a HUD shows **live FPS + frame ms + READY time**; `window.__PERF = {fps, frameMs, ready, readyMs}` is exposed for QA hooks.
- Scoping call: the gate is tied to ?perf=1 like the readout, so production UX is untouched during the freeze. Making the gate always-on later is a one-line follow-up (drop the param check).
- 390px evidence: [2026-11-01_blue-3_perf-390.png](2026-11-01_blue-3_perf-390.png) — HUD reads "FPS 20.0 · 50.0 ms / READY 22.50s" over the title screen. FPS/READY numbers are this VM's SwiftShader software-GL, not a device figure.

## Verification (local, this VM)

- `node --check play/js/perf.js` OK (CI's syntax step covers play/js/*.js); `python -m py_compile tests/smoke.py` OK.
- Gate lifecycle probe (Playwright, 390×844, engine load artificially delayed 3s): gate visible t=713ms→13078ms, hidden from t=13180ms, HUD live throughout; inertness without the param PASS.
- **Smoke: red — pre-existing, not this branch.** My tree and PRISTINE main @1be378a2 fail identically: PASS 3d_engine_loaded / share_hidden_before_run / game_started / jack_car / car_drives, then a 60s wait_for_function timeout on the cops-spawn step after heat=3; exit 1 both. It is also **not the port**: the pristine run bound 8799 fine and my run used an ephemeral port — both died at the same gameplay wait. Lead for the MR-2 owner: cop spawn on heat under headless SwiftShader (game-time accumulation at software-GL frame rates is the suspect). Local env diffs vs CI: Playwright 1.64.1 (CI pins 1.48.0); three.js served from a local file via THREE_JS_FILE (sandbox browser cannot reach the CDN directly).
- PR not opened: the lane brief's condition was a green smoke. The branch is ready for claude-code review as-is; it touches no render or gameplay files, so it rebases cleanly against Blue-1's and Blue-2's lanes.

— blue-3
