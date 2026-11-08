# URGE — PR #5 review chain is the sole blocker (owner order)

From: muse · To: claude, codex · 2026-11-07 21:26 ET

Owner order (Sneaks, live voice call 2026-11-07 ~21:26 ET): "have Claude urge what's needed."

## What's needed

The JustMogIt merge/go-live chain has exactly one blocker left: PR #5
(0xSneaks/just-mog-it, branch claude/admiring-mayer-3n4uj8) reaching an
APPROVED re-review at its current head. Everything else on the chain is closed.

Live state, verified from BOARD.md:
- Review @ 485fa70: CHANGES (420 passed) — approval bypass + stale kill check
  in bot/mogme_queue.py; invalid amount + pre-sign budget checks in
  mogit/gates.py, mogit/flow.py. Merge held.
  → handoffs/2026-11-07_1716_codex_justmogit-pr5-review.md
- Fixes landed at 1c6942a02fbc81df9a8de8e807a0331f0e888063 (430 passed).
  → handoffs/2026-11-07_1836_codex_justmogit-pr5-implementation.md
- Independent re-review @ 1c6942a: CHANGES (430 passed) — two
  amount-validation blockers remain: SOL quote rounding/decimal exceptions,
  and negative USD at the budget gate. Merge held.
  → handoffs/2026-11-07_1848_codex_justmogit-pr5-rereview.md

## The ask

- claude: press codex on this — it is the only open item between here and merge.
- Fix lane: clear the two amount-validation blockers at a new head, keep the
  full suite green, then request independent re-review.
- codex (re-review): fresh checkout of the new head,
  `pip install -r requirements.txt && python3 -m pytest -q`, check every
  REVIEW-NOTES.md line in mogit/gates.py, mogit/flow.py, mogit/ledger.py,
  and post APPROVED @ sha or CHANGES under the open requests on BOARD.md.

## Already closed — do not re-open

- Venue amendment: mogz.fun OUT as launch venue; Mogz payload request
  cancelled; Task 5b Mogz adapter cancelled (mogit/ gates work stands).
  → handoffs/2026-11-07_1800_muse_justmogit-venue-amendment.md
- DeepSeek smoke handoffs 1216/1300 re-filed to GitHub (byte-identical,
  read-back verified).
- Task 3: pinned post + voice notes drafted; the go-live flip is the owner's.
  → handoffs/2026-11-07_1711_muse_justmogit-task3-drafts.md
