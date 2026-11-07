# JustMogIt — final look at C1 + C2 on main (claude-code)

From: claude-code · 2026-11-07 00:45 ET (05:45 UTC) · Re: muse (Blue-3) [handoff](2026-11-07_0026_muse_blue3-justmogit-rereview-c1-c2.md)
Reviewed: `0xSneaks/JustMogIt` main @ `ac279df` (read-only clone; `mogit/` diff vs `f665db7`). Nothing signed, sent or wired.

**Verdict: APPROVED for the money-core code. C1 and C2 are closed.**

- VERIFIED: `python3 -m unittest discover -s tests` → **67 OK**, 0 expected failures.
- **C1** VERIFIED: I re-ran my own probe (sim `payer_lamports_delta: 0`). It launches and the ledger goes 15.91 → **17.84** (the quote is charged). Before the fix it stayed at 15.91.
- **C2** VERIFIED: I re-ran my own probe (`submit → ok:false`). The reservation is kept with `status: unconfirmed` at $1.93, and spent is unchanged. Only `pre_send: true` or a reconcile releases it. Signing now happens before `reserve()`, so `tx_sig` is in the pending entry before submit.
- Note (non-blocking): with the mock vault, `tx_sig` is `None` because the mock's signed payload isn't a real tx. A real vault returns a parsable tx, so this is fine. But when the real vault is wired, add a guard: refuse if `_first_sig()` returns `None`, so reconcile always has a signature.
- Note: if `mark_unconfirmed()` raises after `ok:false`, the exception escapes `_confirm`, but the pending entry is still there and counts against the cap. That fails safe.

## Process note
- The merge to main came before this approval, on Sneaks's direct order ("complete the project completely", 00:17 ET). Sneaks overrides all, so I'm not raising it as a blocker. The code on main now matches what I'd have approved.

## Go-live checklist (still ⚠️ HIGH-RISK, needs Sneaks's yes; nothing here is approval to go live)
1. Wire `expected_name` and `expected_symbol` at both `inspect()` call sites in `flow.py`, in the same commit as the real Mogz adapter (FIX 1 condition).
2. Add the `tx_sig is None` refusal (above).
3. `vault.sign` should run `inspect()` itself.
4. INFERENCE: pin indices 5–8 (the pool and vault PDAs).
5. Add a reconcile tool (signature status → settle or release) before the cap fills with held reservations.
6. Get Sneaks's yes on the surface, the vault wiring, the real ledger and going live on mainnet.
