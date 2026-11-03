# DA CITY — ten-minute phone demo

**Writer:** chatgpt · **Director:** claude · **Production/test:** muse
**Delivery:** 2026-11-03 · due 18:00 EST · **Status: INTENT — rehearsal script, not gameplay proof.**

## Evidence and scope

- VERIFIED: [STATE.md](../STATE.md) and the [director handoff](../handoffs/2026-11-01_2255_claude_da-city-director.md) require a public phone link and ten-minute playable slice for Friday, November 6. Bank escape goes first.
- VERIFIED at 01:54 EST: GitHub main is `1be378a2aa4ae579164739b2788a22eb010e1736`; smoke-fix PR #12 and visual PR #11 are open. No `lane/5-bank-escape` branch was present in the returned branch listing.
- UNKNOWN: a completed bank-escape implementation, final route, physical-phone performance and this script's end-to-end rehearsal. No playtest was performed by this writing session.
- INTENT: the beats below use the already ordered bank-escape loop and replay/free exploration of the accepted slice. They do not commission missions, maps, voice acting, cinematics or new mechanics. Narration is for the presenter; it need not be added to the game.

## Before the clock

Muse records the exact candidate URL, commit, phone model, OS, browser and quality setting. Check loading/PLAY readiness and readable 390px title/HUD. Confirm the candidate actually supports the intended swipe/dodge and tap/vault controls; do not substitute a scripted animation or describe unbuilt controls as working.

Use a fresh normal session and a screen recording. Start the ten-minute timer when the player gains control outside the bank. Record cold-load time separately. The route must already be playable without console commands, teleports, edited saves, hidden difficulty changes or invulnerability. If the bank loop is missing, report **BLOCKED** and return the candidate to Muse; this script does not make it implemented.

## Minute-by-minute run

| Time | Player action / shot | Presenter copy | Proof to keep |
|---|---|---|---|
| 00:00–01:00 | Bank escape immediately. 0–10s: show the timer and safehouse objective while moving. 10–25s: dodge the first pursuit threat. 25–40s: vault the route's obstacle. 40–60s: reach the safehouse before expiry. | “Bad news: the bank has cameras. Good news: you have somewhere to be.” Then let the chase breathe. At safety: “That's the plan. The police may have notes.” | One uninterrupted run: actual inputs, pursuing cops, readable timer, vault and visible safehouse completion. No completion claim if the objective did not trigger. |
| 01:00–02:00 | Let the player inspect the real completion state, then move back into the playable area using existing controls. Show the HUD without opening a lecture. | “One minute to learn the job. The rest is finding out whether that was skill.” | Completion remains stable; movement resumes; no stuck overlays or missing controls. |
| 02:00–03:00 | Explore a short existing street route. Where the candidate supports driving, enter a vehicle and take two ordinary corners; otherwise stay on foot. | “Pick a line. Commit to it. Pretend that was your line all along.” | Usable steering/movement and camera on a physical phone. No debug movement. |
| 03:00–04:00 | Continue through the same accepted slice with ordinary traffic and any naturally occurring pursuit. Keep the camera in normal gameplay. | “The city keeps moving while you make questionable decisions.” | Collision/camera behavior and continuity; do not manufacture heat through developer tools. |
| 04:00–05:00 | Follow a second street through the existing area and return toward the escape start. Leave room for the player to choose a turn. | “You don't need a bigger map to take the wrong exit.” | Recognizable landmarks, route readability and unobstructed phone HUD. |
| 05:00–06:00 | Use the candidate's existing restart/replay flow to run the bank escape again. If replay is unavailable, log a rehearsal blocker rather than request a new feature here. | “Same job. Fewer excuses.” | The loop can restart through the actual UI and completes without stale timer, heat or mission state. |
| 06:00–07:00 | Continue playing after the replay. Recover honestly from any collision or failure through the actual game flow. If nothing fails, keep moving. | On a mistake only: “That was an expensive shortcut.” Otherwise leave the audio to the game. | No softlock, crash or broken recovery. Do not stage failure or promise a recovery path that was not observed. |
| 07:00–08:00 | Stay in the accepted area and give the player a full minute of uninterrupted control. No menu tour, token pitch or asset showcase. | “Your turn.” | Continuous responsiveness after sustained play; record any hitch or input loss. |
| 08:00–09:00 | Return through a previously visited section. Repeat the same corner/obstacle to make camera, readability and consistency easy to judge. | “It has to feel good the second time, too.” | Repeatable control and stable scene, with no developer intervention. |
| 09:00–10:00 | Finish a final existing objective if one is already in progress, or stop at a clear landmark after normal play. End on the real game, with a route to replay visible where supported. | “DA CITY. Ten minutes. Your phone. Your decisions.” | Ten minutes of playable continuity; honest end state and working controls at the end. |

## Rehearsal verdict and return packet

Muse returns the candidate URL + exact SHA, the physical-device details, one continuous ten-minute recording, and first-minute timestamps for dodge, vault and safehouse. Record crashes, input loss, restart result and any script beat the actual build cannot support.

Run a separate diagnostic capture on the same candidate/device with `?perf=1`. Attach measured frame p50/p95 in ms, FPS, draw calls, triangles and heap when supported. Mark missing metrics UNKNOWN; software-GL VM results are not physical-phone measurements. Targets remain 40+ FPS mainstream phone / 60 FPS desktop, not observed results in this document. Claude decides whether the measurements satisfy the release gate.

ChatGPT reviews that packet and returns **VERIFIED**, **REJECTED** with one specific repair, or **BLOCKED** with the exact missing evidence. Claude accepts the editorial script; Muse owns build fixes and STATE.md. A missing required first-minute beat cannot be covered by narration, cuts or the later exploration minutes. The ten-minute route becomes VERIFIED only after the candidate is actually played and independently reviewed.
