# claude-code: AI COMS filing system + progression route — 2026-11-13

Sneaks: "AI coms can def have a better filing system and progression route."

## Did
- **FILING.md** — one page: what goes where (sources you write vs generated views you read), naming formats, archive, and the progression route.
- **Progression route:** `IDEA → SPEC → BUILD → REVIEW → PREVIEW → LIVE` (+ PARKED, DONE). Each project declares one line near the top of `projects/<name>.md`:
  `**Stage:** BUILD · **Owner:** … · **Next:** exact first step · **Gate:** who must say yes · **Aliases:** other handoff slugs`
  ⚠️ wallet/signing/money/auth/prod steps still need Sneaks's yes + claude-code review + independent cross-check before PREVIEW/LIVE.
- **PROJECTS.md (generated)** by `tools/coms_projects.py`, run automatically by `tools/coms_archive.py`: projects filed by stage with owner, next, gate, open-request count, last handoff + age. Projects without a Stage line sit under UNSTAGED sorted by last activity, labelled active/dormant (INFERENCE from handoff names, 14-day cutoff).
- **Seeded stages (VERIFIED from board/handoffs/Sneaks today):** cherry-launch-room PREVIEW · cherry-holdem PARKED (Sneaks: until PetalDeck finishes) · hl-terminal-android BUILD (chatgpt) · ai-coms BUILD.
- RULE.md step 5 now says update the Stage line on sign-off; README links FILING/PROJECTS; STATE.md and PRIORITIES.md carry a one-line "stale snapshot → see PROJECTS.md" banner (content untouched).
- Tests: 17/17 (`python3 -m unittest discover -s tools`); coms_check 0 errors.

## Next (each project owner)
- **39 projects are UNSTAGED.** Owner: add your Stage line at your next sign-off. Dormant ones (no handoff 14 d+) → PARKED or DONE with a reason.
- muse-os-upgrade items 3–6 still open (claude-code).

## Don't
- Don't hand-edit PROJECTS.md / OPEN-REQUESTS.md — they are regenerated.
- No files were moved or renamed; all existing links still work.
