# Handoff — gta6ismogged (DA CITY) — claude — 2026-11-01 22:35 ET

**Session goal:** Sneaks appointed Claude VETERAN DIRECTOR + MUSE REMEDIATION ORCHESTRATOR (clause MUSE-FRIDAY-LOCKDOWN-001) for DA CITY, Friday 2026-11-06 gate.
**Status:** IN PROGRESS (round 1 issued; interrogation of Sneaks open)
**Repo / branch:** 0xSneaks/GTA6isMOGGED- @ main (not touched this session)

## Director handover
- INTENT (Sneaks, 22:26 ET, this chat): Claude takes the director role. Supersedes the ChatGPT appointment (handoffs/2026-11-01_1053) per "Sneaks's latest instruction overrides the board". ChatGPT's P0 VISUAL RESCUE (17:23, game issue #10) is ADOPTED unchanged — not redone.
- Released: claude's stale `lane/8` claim on `play/js/render/**` (08:45 ET, no work since). Render owner for Friday = muse/Blue-1 on `lane/visual-overhaul-10x`; claude-code = render reviewer.

## Muse diagnostic — round 1 (evidence = board/handoffs, not re-run)
| Standard | Result | Evidence |
|---|---|---|
| Brief comprehension | YELLOW | "mod" slip corrected; OG/BOOMER naming rupture; $SON-on-Mogz was an interpretation |
| Concrete decisions | PASS | ops logged with tx/commit-level proof all day |
| Scope discipline | FAIL | locked first-minute loop (bank escape / swipe dodge / tap vault / safehouse timer) NOT in build; meanwhile Ch.3 endgame, 8 radio stations, casino + NFT design, 38 KB weather spec |
| Feasibility awareness | PASS | told Sneaks literal PS5-in-browser is not reachable |
| Art/perf trade-off | FAIL | 226 CC0 GLBs on main, render still primitives (visual review FAIL 17:23); no art bible; zero device FPS |
| Production realism | FAIL | 7+ model lanes on a 4-day clock; two render owners claimed |
| Deadline awareness | YELLOW | Friday set; no burn-down |
| Evidence of completion | FAIL | main smoke CI red since PR #9 (claude-code 20:22); real-phone FPS + night shots UNMEASURED |
Root cause (INFERENCE): nobody owned "what ships Friday", and merge gates were not enforced.

## Fix orders to muse (MR = Muse Remediation)
1. **MR-1 FREEZE — now.** No merges of casino, NFT, story Ch.3+, soundtrack wiring, weather, garage until the Friday slice gate passes. Verify: board line + no feature merge on main.
2. **MR-2 CI GREEN — Mon 11/02 12:00 ET.** Fix main smoke (hardcoded port 8799 in tests/smoke.py per L3 note). Nothing merges onto red main. Verify: green Actions run URL on main.
3. **MR-3 ONE RENDER OWNER — now.** Blue-1 owns `play/js/render/**`; claude-code reviews. Execute issue #10 unchanged.
4. **MR-4 PERF HUD — Mon 11/02 18:00 ET.** `?perf=1` overlay: fps, frame ms p50/p95, draw calls, triangles, JS heap. Fix silent PLAY-before-ready (loading gate). Verify: 390px screenshot with HUD.
5. **MR-5 BUILD THE LOCKED LOOP — Tue 11/03 18:00 ET.** Greybox the first-minute loop as written. Verify: headless 390px playthrough clip + screenshots, zero console errors.
6. **MR-6 DAILY EVIDENCE — 18:00 ET every day to Friday.** 390/1280 day/night shots, CI link, perf numbers, one line per MR. No "done" without these.

## Waiting on Sneaks (batched)
- Round-1 answers: Friday deliverable form · art direction · director chain · first-1,000 audience · Friday cash cap.
- Replace repo secret TRIPO_API_KEY with the Tripo key starting `tsk_`.
- One real-phone test once MR-4 lands (screenshot of the HUD).

## Don't
- Don't redo ChatGPT's P0 audit. Don't start Phase-2 features. Don't merge on red CI.
