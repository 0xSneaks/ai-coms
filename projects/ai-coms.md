# AI COMS

**Repo:** 0xSneaks/ai-coms  ·  **Live URL:** none  ·  **Last updated:** 2026-10-21 by claude + muse

## Now
VERIFIED · EXPERIMENT-2 marker pushed and remote verified on `codex/sne-5-exp-2`; Codex completed the board relay.

Paperclip live test running. EXPERIMENT-1 done: claude-code wrote and pushed `experiments/exp-1.md` from the Paperclip VM; muse independently verified the exact marker through the GitHub API; parent closure (SNE-3) is the final bookkeeping step.

## Established
- VERIFIED · Codex relay delivery: `experiments/exp-2.md`, commit `df5c5ff2a58b12b74882f2f801b4b6b6dda8586c`.
- Purpose: shared notes so agents don't overlap when Sneaks switches models — INTENT (Sneaks, 2026-10-21)
- Plain Markdown + git, no app/backend; any agent that can read GitHub can use it — claude, 2026-10-21
- No secrets in this repo, ever — claude, 2026-10-21

## Built
- README protocol, BOARD, roster, templates, projects index — VERIFIED (files in repo)
- Paperclip company package — `paperclip/` — VERIFIED import (2026-10-21, claude). Live test: `paperclip/EXPERIMENT.md`.
- `experiments/exp-1.md` — EXP-1 marker, code BLUE-0321 — VERIFIED push (2026-10-21 05:44 ET, claude-code).

## To do
- EXPERIMENT-2: no implementation work remains; board may review the feature branch for integration. [Handoff](../handoffs/2026-10-21_0611_codex_ai-coms.md).
1. Paste the "Cross-agent coordination" snippet (README) into each active project's CLAUDE.md / AGENTS.md and into Muse's instructions — Sneaks
2. Fill UNKNOWN cells in AGENTS-ROSTER.md — Sneaks
3. Each agent creates `projects/<slug>.md` the first time it touches a project

## Known issues / gotchas
- Chat-only agents can't commit; they hand Sneaks a handoff to paste.

## Codex check-in — 2026-10-21 03:24 ET
- VERIFIED · GitHub read/write access; signed ROLLCALL.md with BLUE-0321 (commit a6f96b0d353747253a452992579dfa65fe7ce0eb).
- VERIFIED · Handoff: [2026-10-21_0324_codex_ai-coms.md](../handoffs/2026-10-21_0324_codex_ai-coms.md).
- INTENT · Next project task begins with a fresh board/project read; preserve Muse's rule-installation claim.

## Muse check-in — 2026-10-21 03:43 ET
- VERIFIED · Rule installed: OpenCode global ~/.config/opencode/AGENTS.md + AGENTS.md in 7 local repos (MusePark appended; 0x-sneaky-alpha, Agora-ios-pwa, Yolo-crawl-, agora-dev, crawler-build, muse-maestro created) — local only, push awaits Sneaks's word.
- VERIFIED · Signed ROLLCALL.md as muse (commit 253ad0a11c); spawned Blue signed as muse-blue (commit 2b2b5a994c).
- UNKNOWN · Fresh-OpenCode-session "check coms" test launched ~03:26 ET; output not yet returned at sign-off. Result owed to Sneaks in chat.
- Handoff: [2026-10-21_0343_muse_ai-coms.md](../handoffs/2026-10-21_0343_muse_ai-coms.md).

## Claude Code check-in — 2026-10-21 05:44 ET
- VERIFIED · EXPERIMENT-1 (Paperclip SNE-4, delegated by muse under SNE-3): created `experiments/exp-1.md`, one line, code BLUE-0321, real ET timestamp from the VM clock. Pushed to main myself — no human relay.
- VERIFIED · GitHub write from the Paperclip VM works for claude-code (host auth mode, token account 0xSneaks).
- VERIFIED · Committed from a scratch clone, not `/home/paperclip/ai-coms` — a concurrent claude-code session was mid-merge there with `ROLLCALL.md` conflicted. Shared tree left untouched.
- INTENT · muse verifies `exp-1.md` on GitHub main independently and closes SNE-3. I do not close the parent.
- Handoff: [2026-10-21_0544_claude-code_ai-coms.md](../handoffs/2026-10-21_0544_claude-code_ai-coms.md).

## Muse verification — 2026-10-21 05:49 ET
- VERIFIED · GitHub main contains the requested one-line marker; blob `dfeedb11d7e4679609556c9a1103bf0fed8448f3`, delivery commit `4ac06b72bfbade2c85e5b181d64ca08655f6deed`. Claude Code authored the file; Muse only verified it.
- VERIFIED · Existing VM GitHub CLI access works; connector setup is unnecessary for this task.

## Codex check-in — 2026-10-24 17:18 ET
- VERIFIED · Read live board, roll call, project file and handoffs; refreshed BLUE-0321 roll call using GitHub connector.
- VERIFIED · No product work; Claude Code and Muse active claims preserved.
- INTENT · Next assigned project begins with fresh coordination reads.
- Handoff: [2026-10-24_1718_codex_ai-coms.md](../handoffs/2026-10-24_1718_codex_ai-coms.md).
