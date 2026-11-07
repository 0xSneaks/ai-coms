# Handoff — justmogit-bot — claude-code — 2026-11-07 15:49 ET

**Session goal:** JUSTMOGIT CONSOLIDATED DIRECTIVE (2026-11-07). Supersedes earlier blocks.
**Status:** PARTIAL. Tasks 3, 4, 5 and 7 are done. Task 1 is done apart from the merge, which waits for Codex's APPROVED. Task 2 is parked by the directive. Task 6 is BLOCKED.
**Repo / branch:** 0xSneaks/just-mog-it @ `claude/admiring-mayer-3n4uj8` · **Last commit:** `5f27d93` · [PR #5](https://github.com/0xSneaks/just-mog-it/pull/5) (open, Codex-gated)

## Did
- Task 1: opened PR #5 (branch → main, 8 commits). It is **not merged**; it waits for Codex to post APPROVED here. PR #1 was closed with a one-line comment after `git merge-base --is-ancestor 94f4ea1 origin/main` returned true. VERIFIED.
- Task 2 (callout guard hardening): PARKED with mogz. `bot/callout.py` lands as-is in PR #5. No history-proof guard was built.
- Task 3: `bot/replies.py` `launched(d, mint, venue)` takes the venue from the launch record: `pump.fun` → "on pumpfun", `mogz.fun` → "on mogz", and an unknown or missing venue raises `ReplyError` so no reply is sent. `bot/engine.py` records `venue=pump.fun` at fire time, because its `_prepare` builds only through the pump adapter. Tests were added, including an engine happy-path assertion. The disclaimer regression test stays green. `b0aea8d`, VERIFIED.
- Task 4: removed `ref: codex/deepseek-pair-preview` from `.github/workflows/deepseek-smoke.yml`; nothing else changed. NOT dispatched. `8d74d81`, VERIFIED.
- Task 5: money-core gates. Tests were written first (`tests/test_moneycore_gates.py`, 19 tests), then the code: `mogit/gates.py`, plus `mogit/flow.py` and `mogit/ledger.py`. `0c50f9a`, VERIFIED.
  - Kill switch: persisted in the ledger file, ON unless the stored value is exactly `false`, and `boot()` sets it ON.
  - Max 3 launches per UTC day, counting settled and pending entries; an entry without a `ts` counts as today.
  - 0.025 SOL cap on both the quote and the simulated spend.
  - SOL-only quote and `first_buy_lamports` exactly 0.
  - Where checked: before build, and again under the ledger lock before sign.
  - Mutation check: each gate was disabled in turn, and its tests failed every time.
  - No venue adapter was built.
- Task 6: **BLOCKED**. `python3 scripts/read_launch_metadata.py` → `Tunnel connection failed: 403 Forbidden` (VERIFIED). isMutable, updateAuthority and uri are UNVERIFIED. Rule to apply once read: if isMutable is false, the description can never be corrected; if true, it is correctable only by a signed update from the update authority, which is owner-gated and must not be attempted.
- Task 7: `5f27d93`, VERIFIED.
  - BOT.md now states the two paths: `mogit/` is the money core with its venue adapter pending; `bot/` is the X engine plus the pump.fun pipeline, specced and never launched.
  - README: venue and gate rows updated. The launch record is unchanged: CA, tx, venue, dev buy 0, manual executor note, nothing more.
  - `requirements.txt` now includes `httpx` and `PyYAML`; a fresh venv runs `pip install -r requirements.txt && python3 -m pytest -q` → 266 passed.
  - `docs/REVIEW-NOTES.md` lists every money-path line.

## State (evidence)
- Tests: `python3 -m pytest -q` → **266 passed** (VERIFIED, both locally and in a clean venv).
- Deployed: no. Site PR justmogit-site#1 is still unmerged.

## Decided
- The kill switch lives in the ledger file, which is already required, protected by the file lock, and read before build and before sign. Nothing new can be forgotten.
- A ledger entry without a timestamp counts toward today's limit (fail closed). **Muse:** if the real ledger holds 3 or more old launches without `ts`, backfill `ts` or every launch is refused.

## Next (start here)
1. **Codex:** review PR #5 against `docs/REVIEW-NOTES.md` and post APPROVED or CHANGES here. Then claude-code merges with a merge commit, suite green.
2. **Muse:** bring `launch-001-pack.md` and the execution Space in line with reality. Launch #001 fired 2026-11-07 on mogz, manually, not by the bot. Mogz is now out as a venue, and there is no Tuesday 2026-11-10 launch. Neither file is reachable from the repos.
3. Task 6: run `python3 scripts/read_launch_metadata.py` from a session on environment "JustMogIt (bot + site + coms)", which allows Solana RPC.

## Don't
- Don't build a Mogz adapter or request a Mogz payload; that is cancelled.
- Don't dispatch the smoke workflow.
- Don't widen `mogit/guard.py` pins.

## ⚠️ High-risk
- PR #5 changes money-core gate code (`mogit/`). It needs Codex's independent review before merge. Nothing signs or sends: there is no venue adapter and the vault is unwired.
