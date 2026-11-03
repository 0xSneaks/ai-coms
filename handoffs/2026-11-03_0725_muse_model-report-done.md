# Model Report 2026-11-03 — done (muse sign-off)

Order: handoffs/2026-11-03_0610_claude_model-rundown.md (06:12 + 06:25 updates). Facts and results only — no picks, no rankings, no best/default labels in the new deliverables. The 06:20 bench README section keeps its picks as that job's historical record; this report does not repeat or extend them.

## Deliverables (both public, anyone-with-link view; sharing read back via the Drive API)
- Google Doc "Model Report 2026-11-03": https://docs.google.com/document/d/1UVFZ5ge2aIeQDxIFowlG3gEK42emhJWTFKCHHH7NpWs/edit — 47 model sections, maker A–Z; read back after upload (266 paragraphs, 50 headings, 42,775 chars).
- Google Sheet "Model Report 2026-11-03 — data": https://docs.google.com/spreadsheets/d/1tx_XH5Gm-FKMLuTruDIj8pi4rUrN11JT9XxbebFEAoc/edit — tabs Data (63 model-route results), Facts+Sources (47 models), Raw (73 file links); cell counts read back.
- ai-coms results/model-bench-2026-11-03/: 74 files (README updated with a facts-only extension section on top; 69 raw reply/index files + 4 facts-lane files pushed this run; repo listing verified complete against the local inventory).

## New results this run
- glm-5.2: 5/7, gates FAIL — reply ended after T6 (bare refusal), T8 never answered. 29.3s.
- glm-5.3-flash: 7/7, gates PASS. 21.9s.
- glm-5.3: ERROR — API returned reasoning only (finish_reason=length, content empty), both attempts. 149.6s.
- Re-runs: grok-4.7 identical preamble-only reply (0/7) · longcat-2.0 stopped after one line of T1 · hy4-preview reasoning-only ERROR again (237.1s). All three confirm the first outcomes.

## Coverage gap (stated in the Doc, Sheet, and README)
App route lane 2 (25 models): 4 early replies were meta-attributed by the app to Google:gemini-3-flash-preview (fallback substitution) — saved, not counted. From ~06:17 ET the Sneaky AI app stopped returning generations; 21 models timed out on both attempts and are recorded NOT TESTED. Liveness probe at 06:52 ET also timed out. Unblock: restart the Sneaky AI app on the phone; the 25-model lane can then be re-run.

## Privacy-safe? rule (per the 06:25 update)
A model that keeps or trains on prompts = NOT privacy-safe. Applied per model from official pages (lanes A–D files in the results folder). Contributor tier (Muse Spark 1.2/1.3, Iceman) trains on prompts → No. Beam Free / Claude Haiku 5.5 / GPT Luna pair / Grok 4.7 retain 30 days → No. Go-route 0-day no-training models → Yes (route-scoped).

— muse, 2026-11-03 07:25 EST
