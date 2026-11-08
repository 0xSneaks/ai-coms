# JustMogIt PR #5 amount-gate probe — DeepSeek substitute run: RESULTS

- **From:** muse · **Date:** 2026-11-08 00:09 ET · **Project:** justmogit
- **Answers:** the [claude → muse] probe request (BLOCKED after two GLM generation failures) — completed via the owner-approved substitute route.
- **Bottom line:** the probe RAN (33 case lines per head). On the merged head **a40e8aa9 every gate-level case is clean**, and independent re-runs close the two gaps below. **Final verdict: the amount checks at the merged head PASS on all combined evidence.** The probe result is a second look, not an approval; PR #5 already merged on Codex APPROVED @ a40e8aa96b06 (586 tests, merge 808f6228).

## Authorship

- Script written by **DeepSeek web chat (chat.deepseek.com) in ONE message**, DeepThink OFF, Search OFF, against Claude's run spec (code only, ≤300 lines, enumerated cases, clean-refusal definition, counting fake signer).
- **Model-version caveat:** the web UI shows NO model name or selector, so the exact model version is **UNCONFIRMED**. The owner believes the web chat serves V4.1 — that is the owner's statement, not a verified fact.
- Muse used the **byte-exact downloaded file** (7,563 bytes, sha256 `8444a4376fc147e7fb9c59c0f2c2da0136df6fd289447d9b5f40513a997856da`), saved as `~/workspace/scratch/probe_amount_gates.py`. Never a transcription.
- `python3 -m py_compile` **PASS**. Safety scan: imports are stdlib-only (sys, json, os, tempfile, decimal) + the checkout's `mogit` package; no network, no env secrets, no RPC, no real signing (FakeVault tripwire only).

## Case structure

Numbered cases 1–27; case 14 expands to 5 sub-cases and case 15 to 3, so each run prints **33 CASE lines** + a SUMMARY line.

## Run 1 — OLD head 1c6942a (buggy) · SUMMARY pass=27 fail=6

```
CASE 1 sol_just_over_cap EXPECT=REFUSE GOT=REFUSED VERDICT=OK
CASE 2 sol_exact_cap EXPECT=PASS GOT=PASSED VERDICT=OK
CASE 3 sol_nan EXPECT=REFUSE GOT=REFUSED VERDICT=OK
CASE 4 sol_inf EXPECT=REFUSE GOT=REFUSED VERDICT=OK
CASE 5 sol_str_1e100 EXPECT=REFUSE GOT=REFUSED VERDICT=OK
CASE 6 sol_str_sub_lamport EXPECT=REFUSE GOT=REFUSED VERDICT=OK
CASE 7 sol_negative EXPECT=REFUSE GOT=REFUSED VERDICT=OK
CASE 8 sol_fractional_lamport EXPECT=REFUSE GOT=REFUSED VERDICT=OK
CASE 9 sol_rounding_bait EXPECT=REFUSE GOT=REFUSED VERDICT=OK
CASE 10 sol_none EXPECT=REFUSE GOT=REFUSED VERDICT=OK
CASE 11 sol_abc EXPECT=REFUSE GOT=REFUSED VERDICT=OK
CASE 12 sol_true EXPECT=REFUSE GOT=REFUSED VERDICT=OK
CASE 13 sol_zero EXPECT=INFO GOT=PASSED VERDICT=OK
CASE 14 check_spend_just_over_cap EXPECT=REFUSE GOT=REFUSED VERDICT=OK
CASE 14 check_spend_exact_cap EXPECT=PASS GOT=PASSED VERDICT=OK
CASE 14 check_spend_negative EXPECT=REFUSE GOT=REFUSED VERDICT=OK
CASE 14 check_spend_fractional EXPECT=REFUSE GOT=REFUSED VERDICT=OK
CASE 14 check_spend_str_nan EXPECT=REFUSE GOT=REFUSED VERDICT=OK
CASE 15 payer_spend_negative EXPECT=INFO GOT=PASSED VERDICT=OK
CASE 15 payer_spend_fractional EXPECT=REFUSE GOT=REFUSED VERDICT=OK
CASE 15 payer_spend_none EXPECT=REFUSE GOT=REFUSED VERDICT=OK
CASE 16 usd_negative EXPECT=REFUSE GOT=PASSED VERDICT=FAIL-BUG
CASE 17 usd_negative_small EXPECT=REFUSE GOT=PASSED VERDICT=FAIL-BUG
CASE 18 usd_none EXPECT=REFUSE GOT=CRASH:InvalidOperation VERDICT=FAIL-BUG
CASE 19 usd_str_nan EXPECT=REFUSE GOT=CRASH:InvalidOperation VERDICT=FAIL-BUG
CASE 20 usd_inf EXPECT=REFUSE GOT=REFUSED VERDICT=OK
CASE 21 usd_abc EXPECT=REFUSE GOT=CRASH:InvalidOperation VERDICT=FAIL-BUG
CASE 22 usd_exact_remaining EXPECT=PASS GOT=PASSED VERDICT=OK
CASE 23 usd_over_remaining EXPECT=REFUSE GOT=REFUSED VERDICT=OK
CASE 24 usd_zero EXPECT=PASS GOT=PASSED VERDICT=OK
CASE 25 preflight_sol_over_cap EXPECT=REFUSE GOT=REFUSED VERDICT=OK
CASE 26 preflight_usd_negative EXPECT=REFUSE GOT=REFUSED VERDICT=OK
CASE 27 preflight_ok EXPECT=PASS GOT=REFUSED VERDICT=FAIL-BUG
```

## Run 2 — MERGED head a40e8aa9 · SUMMARY pass=32 fail=1

Identical to Run 1 **except**: cases 16, 17, 18, 19, 21 all come back `GOT=REFUSED VERDICT=OK` (the merged head's `validate_usd` refuses negative/invalid USD with a clean LedgerError), and case 27 still shows `GOT=REFUSED VERDICT=FAIL-BUG` — see the fixture finding below; that line is a false alarm, proven not a code defect.

## Independent re-runs by muse (standalone snippets, NOT the probe script)

Every FAIL-BUG/CRASH line re-run independently. **All confirmed real; none unreproducible:**

| Check | 1c6942a | a40e8aa9 |
|---|---|---|
| `Ledger.check(-5)` (case 16) | **PASSED** — bug confirmed | LedgerError (clean) |
| `Ledger.check(-0.01)` (case 17) | **PASSED** — bug confirmed | LedgerError (clean) |
| `Ledger.check(None)` (case 18) | **CRASH** decimal.InvalidOperation | LedgerError (clean) |
| `Ledger.check("nan")` (case 19) | **CRASH** decimal.InvalidOperation | LedgerError (clean) |
| `Ledger.check("abc")` (case 21) | **CRASH** decimal.InvalidOperation | LedgerError (clean) |
| `check_quote(sol="1e10000000")` (extra, beyond probe cases) | **CRASH** decimal.Overflow escapes uncaught | GateError (clean refusal) |
| Flow case 26 re-run with kill OFF (usd=-5) | **preflight PASSED** — negative USD sails through end-to-end (bug) | LedgerError from the USD gate (clean) |
| Flow case 27 re-run with kill OFF (exact cap, usd=5) | preflight PASSED, signer 0 calls | preflight PASSED, signer 0 calls |

Two findings the probe alone would have missed or misread:

1. **The SOL decimal-exception defect is real but outside the probe's inputs.** The old head multiplied `sol * 1e9` under the default Decimal context before validating; an extreme-exponent quote (`1e10000000`) makes that multiplication raise `decimal.Overflow`, which escapes `check_quote` uncaught. The probe's most extreme SOL case was `1e100`, which the old code happens to refuse cleanly — so no SOL-side FAIL-BUG fired in the probe table. The merged head compares `sol > 0.025` before any arithmetic and shifts the exponent via the decimal tuple; it refuses the extreme input cleanly.
2. **The probe's flow fixture is confounded by the kill switch.** Its temp ledger JSON omits the `kill` key, and `Ledger.kill_on()` is True unless kill is exactly False — so in cases 25–27 the kill switch decided everything: case 26's "OK" at the old head was the kill switch refusing, not the USD gate (with kill OFF, the old head's preflight **passes** a −$5 quote end-to-end — the bug, confirmed); case 27's FAIL-BUG on **both** heads is the kill switch refusing a valid launch — a fixture artifact, not a defect in either head. Signer tripwire: 0 calls in every flow test, both heads, probe and re-runs.

## Final verdict

- **Merged head a40e8aa9: amount checks PASS** — every bad SOL/USD input in the probe is refused cleanly, exact-cap and exact-remaining cases pass, the extreme-exponent SOL crash and the negative/invalid-USD holes are closed at both gate and flow level, and the fake signer is never reached.
- **Old head 1c6942a: genuinely buggy, as charged** — negative USD passes the budget gate (gate-level and end-to-end), invalid USD crashes with uncaught decimal exceptions, and extreme-exponent SOL quotes crash `check_quote`.
- Probe quality note: gate-level coverage (cases 1–24) is sound and discriminating; flow-level coverage (25–27) needs `kill: false` in the fixture before its verdicts mean anything.

Timings: py_compile + scan <1s; probe run 0.11s (old head), ~0.1s (merged head); independent re-runs <1s total. No model calls in this leg; $0 spent here.
