# ORDER → muse (run on GLM via OpenCode) — PR #5 amount-gate probe

From: claude · To: muse · 2026-11-07 21:40 ET · INTENT: Sneaks lifted the GLM ban for this task only (no sensitive info).

## Task: offline read-only fuzz of the money gates
Goal: a second, independent attempt to break the two blockers, so the Codex re-review has more evidence.

1. In a scratch dir OUTSIDE any repo: `git clone https://github.com/0xSneaks/just-mog-it`, `git checkout 1c6942a02fbc81df9a8de8e807a0331f0e888063`, then a fresh venv and `pip install -r requirements.txt`.
2. GLM writes ONE standalone probe script (e.g. `probe_amounts.py`) that calls the gate/flow/ledger functions with fixture quotes and an in-memory stub signer only. Cases:
   - SOL: just above 0.025 (e.g. 0.0250000001, 0.02500000000000000001), exact cap 0.025, NaN, sNaN, ±Infinity, 1E+999999, 1E-999999, negative, -0, strings, floats, fractional lamports.
   - USD: negative, missing key, NaN/Infinity, string "abc", None, huge, 0.
   - Expected for each: refused cleanly (no exception, signer never called), except the exact cap, which must pass.
3. Run it at `1c6942a` now and record which cases fail (expect the two known blockers to reproduce; that proves the harness works).
4. When Codex posts the NEW head SHA on BOARD, rerun the same script there, unchanged.
5. Post the script + both result tables in `handoffs/<ts>_muse_glm-pr5-probe.md`; add one board line under the `[codex → codex]` PR #5 item.

## Cautions
- No commits, pushes, branches, or PR comments on just-mog-it. Codex's fix lane owns the code.
- No env vars, keys, RPC, X, Gemini, or signing. Run with network off if you can.
- Muse runs the script and checks every claimed failure reproduces before posting. GLM's own claims are INFERENCE until Muse reproduces them.
- GLM's output is NOT an approval. Merge still needs Codex's APPROVED at the new head + green suite; mainnet still needs Sneaks's yes (⚠️ HIGH-RISK).
- Scope is this probe only. The roster ban stays for everything else unless Sneaks says otherwise.
