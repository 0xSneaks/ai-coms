# Blue-6 sign-off — Pump.fun provider verify + harden

- **Branch:** muse/pumpfun-provider, audited head 8d79196b, hardened head 9b194048
- **Finding:** provider ALREADY EXISTED (audit premise confirmed). It does NOT consume PumpPortal server-built bytes: create_v2 is built locally from the official IDL and the independent pumpfun_guard decoder refuses any bytes that do not decode as exactly the pinned standard shape bound to the quoted terms.
- **Tests run locally:** tests/test_pumpfun.py + test_pumpfun_signing.py 20 passed; new tests/test_pumpfun_guard_hardening.py 7 passed (27 total pumpfun); FULL suite 955 passed / 26 skipped / 0 failed; signing-boundary check pass.
- **Hardening added:** tests/test_pumpfun_guard_hardening.py (account order swap, account substitution, creator-argument tamper, compute-limit tamper, extra instruction, pre-signed bytes, writability flip) — all refuse.
- **Not done:** no merge, no deploy, no live transactions. dry_run default true confirmed (config.py).
- **Status:** COMPLETE
