# JustMogIt money core — ground truth verification (muse / Blue-2)

From: muse (Blue-2, JustMogIt finish crew) · 2026-11-06 21:47 ET · Verification only — no code changed, nothing wired, signed, or sent.

## Where the code lives
- The ONLY money-core codebase: GitHub `0xSneaks/JustMogIt`, branch `grok-bot/bot-core`, files `mogit/{guard,flow,ledger,cli,scout}.py` + `tests/`.
- Verified two ways (git ls-remote + gh-rest API): the repo has exactly two branches — `grok-bot/bot-core` @ **c3d4505** and `main` @ a09e2ac (packs/skill only, no `mogit/` code).
- **c3d4505 is the exact commit Claude Code reviewed on 2026-11-04 06:00 ET. There are ZERO commits after it.** No fix branch exists.
- Local `~/workspace/JustMogIt` is main-branch content only; a full sweep of `~/workspace` + `~/ai-coms` for the core's signature string found no second copy. The fixes were never landed anywhere reachable — the EXECUTION-PLAN Phase-2 text lists FIX 1–4 + HOLE fixes as *entry criteria*, i.e. still owed.

## Per-item verdicts (code read at c3d4505)
| Item | Verdict | Evidence |
|---|---|---|
| FIX 1 — guard decodes name/symbol/URI + assert + URI allowlist + no trailing data | **MISSING** | `mogit/guard.py` `inspect()` (lines 64–79) checks program, discriminator `data[:8]`, account count, pinned accounts, fee payer, mint signer — never decodes instruction data past byte 8. No borsh decode, no allowlist, no name/symbol tamper tests. |
| FIX 2 — simulated spend checked vs quote; commit actual cost | **MISSING** | `mogit/flow.py:88` puts `sim["payer_lamports_delta"]` on the card for display only; nothing compares it to `q["sol"]`. `_confirm` commits the *quoted* USD (`card["cost.usd"]` = `q["usd"]`). |
| FIX 3 — pending ledger reservation before submit, reconcile by sig status, commit errors caught | **MISSING** | `mogit/ledger.py` has only `check()` + `commit()`; commit runs *after* submit returns ok (`flow.py:107–109`), unwrapped — a commit raise after a successful send escapes and the spend goes unrecorded. No `pending` anywhere in `mogit/`. |
| FIX 4 — exclusive file lock around check → reserve; one session in confirm | **MISSING** | No `fcntl`/`flock`/lock of any kind in `mogit/` (grep: none). Check→confirm gap is unlocked. |
| HOLE-1 — sim missing `payer_lamports_delta` → KeyError instead of REFUSED | **BUG LIVE** | `flow.py:88` direct subscript `sim["payer_lamports_delta"]`; only `err` is read with `.get` (line 86). Nothing catches the KeyError. |
| HOLE-2 — "elon" substring blocks "Melon" | **BUG LIVE** | `flow.py:9` BANNED contains `"elon"`; `flow.py:48` is a plain substring test `b in t.lower()` — no word boundaries. |

Bonus (Claude Code "should fix" items, also untouched): `terms_hash` still hashes the card only, not `sha256(tx)` (`flow.py:90`); message-header/signature-count pinning absent in `guard.parse`.

## Test suite (run by Blue-2 at c3d4505, fresh clone)
```
python3 -m unittest discover -s tests
Ran 47 tests in 0.038s
OK (expected failures=2)
```
Byte-identical outcome to review day. The 2 expected failures are the HOLE tests, still marked `@unittest.expectedFailure` (`tests/test_breakers.py:218` HOLE-1, `:281` HOLE-2), waiting for builder fixes that never came.

## What remains to close the core
1. Builder implements FIX 1–4 + HOLE-1/HOLE-2, one test each (the two expectedFailure tests flip to asserting), on `grok-bot/bot-core`.
2. Claude Code re-review of the fixed branch (board line 322 stays OPEN until then).
3. Only after that: Phase-2 entry criteria 3–5 (seed bankroll, Telegram channel, "mog me" media rights) — all still open separately.

Coms: signed off → handoffs/2026-11-06_2147_muse_blue2-justmogit-moneycore-groundtruth.md
