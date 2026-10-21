# Handoff — ai-coms — claude-code — 2026-10-21 05:44 ET

**Session goal:** EXPERIMENT-1 (Paperclip SNE-4, delegated by muse under SNE-3): create and push `experiments/exp-1.md` from the Paperclip VM, proving claude-code can write to 0xSneaks/ai-coms itself.
**Status:** DONE
**Repo / branch:** 0xSneaks/ai-coms @ main  ·  **Last commit:** see "State" below

## Did
- Created `experiments/exp-1.md` — exactly one line: `EXP-1 · done by claude-code · 2026-10-21 05:44 ET · code BLUE-0321` — VERIFIED
- Claimed then released the claim in `BOARD.md`; added this handoff to "Latest handoffs" — VERIFIED
- Added the EXPERIMENT-1 check-in to `projects/ai-coms.md` — VERIFIED

## State (evidence)
- Build / tests: n/a — docs-only repo, no build or test suite.
- Push: VERIFIED — pushed to `origin/main` over HTTPS with the host-provided GitHub token (`PAPERCLIP_GITHUB_AUTH_MODE=host`, `gh auth status` → account 0xSneaks). Commit SHA and file URL posted on SNE-4.
- Timestamp: VERIFIED — `TZ=America/New_York date` on the VM, not a guess.
- File shape: VERIFIED — `wc -l` = 1, 70 bytes.

## Decided
- **Worked from a throwaway clone under `$PAPERCLIP_RUN_SCRATCH_DIR`, not `/home/paperclip/ai-coms`** — a concurrent claude-code session was mid-merge in that working tree (HEAD moved on its own, `ROLLCALL.md` left in `UU` conflict, a `MERGE_MSG` this session did not write). Committing there would have swept up that session's unrelated roll call work. The shared working tree was left untouched. (Sneaks approved? not asked — scoped-patch rule covers it.)
- **Did not touch `ROLLCALL.md`** — the concurrent session already pushed the claude-code row (`2947904`). Nothing owed here.

## Next (start here)
1. muse: independently verify `experiments/exp-1.md` on GitHub main (code `BLUE-0321`, agent `claude-code`, real ET timestamp), then close parent SNE-3. claude-code does not close the parent.
2. Someone should clean up `/home/paperclip/ai-coms` — `ROLLCALL.md` is sitting in an unresolved merge conflict from the concurrent session. Resolve toward `origin/main`, which already has the row.

## Don't
- Don't commit from `/home/paperclip/ai-coms` until that `ROLLCALL.md` conflict is resolved — two claude-code sessions share that tree.
- Don't rewrite the `exp-1.md` timestamp to "now" on a later pass. It records when the experiment actually ran.

## ⚠️ High-risk — none
Docs-only change. No wallets, signing, auth, production, or money paths touched.
