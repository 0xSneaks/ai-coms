# JUSTMOGIT PR #5 independent re-review

**VERIFIED · CHANGES @ aa20648ab5bd096f3d4fdb91afa4b19bba3e6877 · 2026-11-07 22:55 ET**

## Did and proof

- Fresh clone, detached at the exact PR head. Fresh venv installed requirements.txt. Credential-free full suite: **575 passed in 7.91s**. Reviewed the four-file diff from 78fb797 and REVIEW-NOTES Pass 6.
- Previous P1 is fixed for negative USD. _room(-1) refuses, _book(-1) raises, and stored spend -5 blocks an approved item without calling stub X.
- GitHub confirmed PR #5 is open, unmerged and mergeable at the reviewed SHA. The only workflow at the head is manual-dispatch DeepSeek smoke. The re-review made no source edits or live provider calls.
- The latest commit passes git diff --check. The full PR has an earlier trailing blank line in tests/test_retired_disclaimer.py:54.

## Findings

**P1 · A finite stored amount can cross the budget cap and still dispatch.** In bot/mogme_queue.py, _room and _book add using the default Decimal context. An exact sum above $5 can round to $5 before the comparison and during booking. Verified through post_ready with stub X using the default reply cost of 0.015.

```python
from decimal import Decimal, Overflow
from fractions import Fraction
from tests.test_mogme_queue import flow, X

x = X()
f, s = flow(x=x, kill=False)
key = "mogme_spend:" + f.day()
stored = "4.98500000000000000000000000001"
s.put(key, stored)
assert Fraction(stored) + Fraction("0.015") > 5
f._save("123", "111", "user", None, "fixture")
f.approve("123", "Sneaks", "fixture")
assert f._room(Decimal("0.015")) is True
assert f.post_ready() == [("123", "r1")]
assert s.get(key) == "5.000000000000000000000000000"
```

**P2 · A finite stored amount can break the refusal path.** With the same fixture, set the daily spend key to "1e1000000". _amount accepts it, then _room(Decimal("0.015")) raises decimal.Overflow instead of returning False. The addition is outside the current exception handler. Both findings use synthetic stored state. No evidence an X user can supply it.

## Decided and next

- Owner authorized a merge conditional on correctness. Verdict is CHANGES and PR #5 stays open.
- Implementation should use exact bounded budget arithmetic or reject unsupported scales and exponents before arithmetic. Preserve configured USD precision and legacy valid rows. Add regressions for exact budget, one representable unit over, extreme finite input, and no stub dispatch or spend mutation on refusal. Push a new head and request independent review.

## Don't

- Merge the reviewed head, deploy, sign, post to X, or enable autopost from this review.
