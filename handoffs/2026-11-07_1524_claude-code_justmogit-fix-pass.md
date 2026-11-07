# Handoff — justmogit-bot + justmogit-site — claude-code — 2026-11-07 15:24 ET

**Session goal:** JustMogIt fix pass (Tasks 1–5). Owner brief dated 2026-11-07.
**Status:** PARTIAL. Tasks 2, 3 and 4 are done apart from one blocked read in 3.4. Tasks 1 and 3.4 are BLOCKED. Task 5 is done; the site PR waits for the owner.
**Repo / branch:** 0xSneaks/just-mog-it @ `claude/admiring-mayer-3n4uj8` (last commit `865a1ae`, not merged) · 0xSneaks/justmogit-site @ `claude/admiring-mayer-3n4uj8` ([PR #1](https://github.com/0xSneaks/justmogit-site/pull/1), NOT merged)

## Did
- Task 1, Mogz create adapter: **BLOCKED**. The proven create payload (quote = SOL, firstBuyQuote = 0) is in neither repo. The bot repo has only prose mentions plus raw on-chain tx fixtures, and the site has nothing. Requested below. Nothing was guessed or rebuilt. VERIFIED (`git grep` across every branch of both repos).
- Task 2b: reviewed `codex/deepseek-pair-preview` (runner `f3542ffd`, head `eda1b37`) and opened [PR #4](https://github.com/0xSneaks/just-mog-it/pull/4). Merged with a merge commit as `b5e18a5`. VERIFIED: 204 tests passed on the branch and 206 on the local merge with main. No force-push.
- Task 2c: Actions run 42407864926 concluded `success` with `overall: PASS`. It checked out `codex/deepseek-pair-preview` at `eda1b37`. The warm-up returned 200/200 in 1.65 s. Cases 1–4 each passed on their first POST in 1.19–1.70 s. Reason lengths were 118/152/157/135 (all ≤ 280). No 429 was observed (UNVERIFIED by design). The key showed only as `***` and no key material appeared in the logs. VERIFIED. Conclusion: the repo secret works. The sanitized JSON is at `docs/evidence/deepseek-smoke-run-42407864926.json` on the bot branch.
- Task 2a, timeout ruling: `bot/live/deepseek.py` is byte-untouched (sha256 `0430730b…68ef`, pinned in a test) and `timeout_s` stays 12.0 (the change to 30 is rejected). The caller now retries exactly once on a timeout, and a second timeout means skip with no launch: `bot/pair_review.py`. The boot warm-up is in `bot/engine.py` + `bot/live/deepseek_warmup.py`, and a failed warm-up never blocks boot. Ruling and reason are in `docs/DEEPSEEK-TIMEOUT.md`. VERIFIED: `tests/test_deepseek_timeout_ruling.py` (18 tests).
- Task 3: sweep done. The owner's story-only commits (`3e3c0b6`, `eae194b`, …) had already removed the phrase from the policy prefix, replies and tests. I added `RETIRED_DESC` stripping on copied target descriptions (`bot/metadata.py`) and the regression test `tests/test_retired_disclaimer.py`. VERIFIED: the test fails if the old prefix is put back (mutation run), and the file was restored afterwards.
- Task 3.4: **BLOCKED**. The network proxy refuses Solana RPC (`api.mainnet-beta.solana.com` → CONNECT 403, VERIFIED). The read-only reader `scripts/read_launch_metadata.py` (a single `getAccountInfo`) is ready, and its decoder is tested offline. isMutable, updateAuthority, uri and host are UNKNOWN. Whether the description can be corrected is UNKNOWN until the script runs.
- Task 4: `bot/callout.py`. It POSTs to `/api/callouts` and counts as done only once `GET /api/coins/<CA>/callouts` confirms the callout. It stops at AWAITING_APPROVAL by default and requires per-item owner approval. Guard: if the posting wallet's balance of the mint (SPL Token + Token-2022) is above 0, or the read fails, the item is REFUSED and nothing is posted. Adapters are unwired by default. VERIFIED: `tests/test_callout.py`, mocks only, the real endpoint was never called.
- Task 5, bot repo: README/SKILL/SPEC moved to `docs/archive/v0/` with a SUPERSEDED header. Content under the header is byte-identical (VERIFIED, sha256 matched). New README front door points to BUILD-SPEC-v2.md + BOT.md and has the built-vs-specced table and the Launch #001 record. `docs/REVIEW-NOTES.md` is written for Codex.
- Task 5, site repo: the pump.fun venue claims now say mogz.fun (hero note, meta description, how-it-works). Audio is untouched and no launches section was added. PR #1 is open and **not merged**.

## State (evidence)
- Tests: `python3 -m pytest -q` on the bot branch → **246 passed** (VERIFIED). main after the PR #4 merge → 206 passed (VERIFIED locally before merging).
- Deployed: no. The site PR is unmerged.

## Decided
- Kept `timeout_s` at 12.0 and rejected 30.0. The run showed warm latency under 2 s, and 12 + 12 s is the worst case before a skip. Owner ruling; nothing contradicted it.
- Callout GET shape: verify() accepts a JSON list or `{"callouts":[…]}` matched on `text`. Anything else counts as not confirmed. INFERENCE, because the real shape and the POST auth are UNVERIFIED.

## Next (start here)
1. Owner or muse: put the proven Mogz create payload (request/response shape, quote = SOL, firstBuyQuote = 0) into `0xSneaks/just-mog-it`. Then rerun Task 1. Pointer only, not used: `stonkfunbot` `muse/mogz-provider` @ `6359e266` mentions create-payload pins.
2. Run `python3 scripts/read_launch_metadata.py` in a session on the new personal environment **"JustMogIt (bot + site + coms)"**, which allows `api.mainnet-beta.solana.com`. That answers Task 3.4.
3. Codex: review the bot branch per `docs/REVIEW-NOTES.md`, then PR it to main.
4. Owner: decide on site PR #1. Merging it deploys.

## Don't
- Don't edit `bot/live/deepseek.py`. Its hash is pinned.
- Don't add a launches or callouts section to the site.
- Don't call the real `mogz.fun/api/callouts` from tests.

## ⚠️ High-risk (wallets, signing, auth, prod, money)
- No money or signing path was touched (see REVIEW-NOTES). The callout balance guard reads a wallet balance; it never signs.
- PR #4 merged PR #1's X-bot surface into main. It is offline and fails closed (kill switch ON at boot), but Codex should confirm.
- Site PR #1 deploys to production on merge, so it needs the owner's OK.
