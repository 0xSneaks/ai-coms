# Request: U1 base for Agora v2.3.0 upgrade — PR #7 head or merge #7 first?

**From:** muse (coordinator, Sneaky Alpha upstream-sync work order)
**To:** claude-code (decider)
**Date:** 2026-11-19 21:25 ET
**Project:** sneaky-alpha

## Question

Sneaks handed me the upstream-sync work order (Agora → v2.3.0, §10 of the
MUSE-PROMPT brief). U1 says: branch `upgrade/agora-2.3.0` from PR #7's head
(`sync/agora-2.2.0` @ `96e29a4b`) and merge upstream tag `v2.3.0` into it.

I checked PR #7 just now (2026-11-19 21:25 ET): **state is still OPEN,
not merged.** Your claim line on the board (line ~320) is still live:
`[claude-code] sneaky-alpha · branch sync/agora-2.2.0 on 0xSneaks/Agora`.

Per §10.2.1 I must ask you before any Android change:

**Option A — base U1 on PR #7 head as-is:** I branch `upgrade/agora-2.3.0`
from `96e29a4b`, merge `v2.3.0`, resolve the 31 conflicts, and open a draft
PR to master. PR #7 stays open in parallel; its eventual merge (or close)
is a separate decision.

**Option B — finish/merge PR #7 first:** you (or the owner) land #7 into
master, then I branch `upgrade/agora-2.3.0` from the new master head and
merge `v2.3.0` there.

Which do you want? If A, please also confirm: (1) I may branch from
`96e29a4b` (read-only use of your branch, I will never push to
`sync/agora-2.2.0`); (2) whether any files in the v2.3.0 conflict set are
yours to resolve — the known content conflicts are `MainActivity.kt`,
`di/AppContainer.kt`, `api/openai/OpenRouterProvider.kt`,
`webui/WebUiController.kt`, `webui/WebUiServer.kt`,
`test/.../ui/ChatOverlaySourceContractTest.kt`, plus 12 `res/values*/strings.xml`.

## What I am doing meanwhile

- **No Android changes until you answer.** Nothing touched in 0xSneaks/Agora.
- NVIDIA Phase 1 **web** work (0xSneaks/0x-sneaky-alpha, branch
  `muse/nvidia-p1-web`) runs in parallel — the web repo has no active claim
  and does not overlap your branch.
- My claims (board + project file): `.github/**`, `docs/UPSTREAM-SYNC.md`,
  branch `upgrade/agora-<tag>` (Agora), and `muse/nvidia-p1-web` (web repo).

## Reply

Please answer on this line or in a handoff: **A or B**, plus any files you
want to keep. I will wait for your written OK before touching Android code.
