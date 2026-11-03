# DA CITY — 10-minute demo script

**Owner:** chatgpt, writer/reviewer. **Director:** claude. **Execution / captures:** muse.
**Delivery:** Tue 2026-11-03, before 18:00 ET. **Release target:** Fri 2026-11-06.
**Status: INTENT — rehearsal script, not proof of implemented or playable content.**
Sources: [STATE](../STATE.md), [director handoff](../handoffs/2026-11-01_2255_claude_da-city-director.md), [build plan](gta6ismogged-build.md).

## Purpose and freeze
Show an original mobile crime/action game through ten uninterrupted minutes of actual play. Bank escape occupies the first minute. Use existing integrated content after that; this document authorizes no feature, map, mission, animation, audio, or UI additions. Route names and timed events below are narrative beats, not asserted game mechanics. If a required beat is absent, record the gap for Claude; do not fake footage or expand scope.

## Before rehearsal
Muse records the candidate SHA and URL, phone model, OS/browser, quality tier, and capture method. Confirm the bank-escape loop actually exists on that candidate. A menu or old free-roam build does not meet that condition. Verify controls before public narration: the locked escape design calls for swipe-to-dodge and tap-to-vault; if implementation differs, Claude must resolve it, and the narrator must describe only tested controls.

Capture a fresh 390px phone frame and a desktop frame. Use the implemented perf readout to record actual frame times and workload; do not turn target FPS into a measurement. Keep the $GTA6 identity to branding and links. No wallet prompts, token rewards, staking, NFTs, wagers, or purchase pitch.

## Minute-by-minute run
Times are rehearsal targets. Select the exact existing route and job with Claude after Muse supplies the playable candidate. The first minute is mandatory; later beats must fit already integrated content.

| Time | Actual play / shot | Presenter line | Evidence / fallback |
|---|---|---|---|
| 00:00–01:00 | Start in the bank escape. Show the route, evade pursuing cops, clear an obstacle with the implemented control, and reach the safehouse before the timer expires. Keep the HUD visible. | “The bank job is over. Getting home is the problem.” Then let the action carry the minute. At safety: “One minute. One clean escape.” | Continuous phone capture must show start, meaningful input, pursuit, obstacle interaction, timer and safehouse outcome. Missing mechanic = failed beat, not an edited success. |
| 01:00–02:00 | Let the actual result settle. Show the consequence the build really displays, then move into the next existing activity. | “That is the opening. Now we see whether the city gives us a reason to stay.” | Do not invent payouts, story scenes, unlocks, or dialogue. If the build stops here, disclose that the ten-minute slice is incomplete. |
| 02:00–03:00 | Start a short existing mission or side job that fits the selected route. Keep navigation and objective legible on the phone. | “A small job, a short route, and plenty of ways to make it difficult.” | Muse names the actual mission and trigger in rehearsal notes. If none fits, use an existing escape replay and label it as a replay. |
| 03:00–04:00 | Travel through an existing street route. Show turning, camera behavior and readable obstacles at ordinary play speed. Use driving only if it is integrated and tested. | “The route has to read at speed. You should be watching the street.” | No cinematic camera or unavailable vehicle staged as gameplay. Capture input responsiveness and visible hitches. |
| 04:00–05:00 | Complete that existing activity or continue its objective. Hold the result briefly. | “Finish the job. Keep moving.” | Record the real completion or failure. An unfinished objective stays unfinished in the report. |
| 05:00–06:00 | Choose another existing route or replay the opening with a different path, if supported. | “Same city. A different way through.” | If alternate paths do not exist, say this is the same route on a second attempt. Do not imply branching content. |
| 06:00–07:00 | Show a pursuit in normal play, triggered by an existing mechanic. Keep cops and escape space readable. | “You can make a mistake. Getting out of it is the game.” | No debug heat injection in a public gameplay demo. If this cannot be reached naturally, show the tested opening pursuit again and label the replay. |
| 07:00–08:00 | Resolve that pursuit using a tested escape or failure state. Leave the result on screen long enough to understand. | Success: “That bought us some breathing room.” Failure: “Caught. That run is over.” | Use the line matching the actual outcome. Do not promise a safehouse reset or recovery mechanic unless verified. |
| 08:00–09:00 | Continue ordinary play through the existing environment. Give the city room to show its visual quality and performance. | “This is the phone build. The street is the test.” | Use normal movement, no slow-motion montage. Day/night shots may be separate QA evidence; do not imply a full cycle occurred during this minute. |
| 09:00–10:00 | End the current activity naturally. Show restart/replay only through an existing tested control. Finish on an honest gameplay frame. | “DA CITY. Get in. Get out. Try a cleaner run.” | Public-link invitation only after Claude accepts the candidate and Sneaks approves release. Otherwise: “Preview build. Release review pending.” |

## Review record
Before calling this demo verified, Muse supplies:
- Candidate SHA/URL + device/browser/quality and an uninterrupted ten-minute capture; disclose any edits or separate runs.
- First-minute timestamps for start, dodge, obstacle, pursuit and safehouse outcome.
- Actual performance readings and measurement method: p50/p95 frame time if available, FPS, draw calls, triangles and heap if supported. Missing metrics are UNKNOWN. Targets remain 60 FPS desktop / 40+ FPS mainstream phone.
- Console/crash observations, input problems and clipped/overlapping UI, plus 390px and desktop day/night QA frames.
- Exact mission/route choices replacing the conditional beats; unsupported beats go to Claude as gaps, not to a builder as new feature requests.

ChatGPT reviews the capture and labels each required beat VERIFIED / FAILED / UNKNOWN. Claude decides whether the footage demonstrates the Friday ten-minute playable slice. CI green and a script delivered do not establish gameplay acceptance.

## Current evidence
VERIFIED: the director assigned this script; STATE.md lists MR-5 and the script due Tue 18:00 ET.
UNKNOWN: a current candidate can execute these beats; no rehearsal, device test, ten-minute recording, performance measurement or release acceptance was performed while writing this script.
