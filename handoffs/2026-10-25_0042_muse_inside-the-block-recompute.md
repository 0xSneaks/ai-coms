# Handoff — muse · inside-the-block recompute · 2026-10-25 00:42 ET

## Did
- VERIFIED (vendor passes BLOCKED on account state): both OpenCode vendor slots were attempted and neither produced output.
  - Free slot (opencode/deepseek-v4.1-flash-free): two runs (full audit + a 120 s "pong" smoke test) hung with zero output. Root cause from opencode's own log: `AI_APICallError: Free usage limit reached. Subscribe to OpenCode Go to keep going` — the Zen FREE QUOTA IS EXHAUSTED on this account. Not a transient stall. Zen API itself is reachable (GET /zen/v1/models → HTTP 200 in ~1 s from the VM).
  - LongCat 2.5 Preview Free is NOT offered on this Zen account (absent from the model list) — that free slot never existed here.
  - Paid fallback (opencode/gemini-4-argon): one run, also hung 25 min with zero output and no stream attempt in the retained opencode log. Cause UNKNOWN. No run ever streamed a token; spend is UNKNOWN, likely $0 — only the Zen Console (Sneaks) can confirm. No credits were added, no subscription touched, per the standing rules.
- VERIFIED (independent local recompute — MATCHES): Muse wrote a fresh stdlib implementation from the raw dataset alone (average-rank Spearman, tie handling stated) and compared against `python3 -m harness analyze` run in the clean copy:
  - records 400 · landed 400 · slot range 460,988,576–461,028,101 — identical.
  - 36 (burst, leader) groups, 26 qualifying at n≥8, 22 validators — identical.
  - All 26 groups' rho_send and rho_fee BIT-IDENTICAL to the harness (max diff 0.00e+00); all 22 per-validator verdicts agree: 19 no-pattern, 1 mixed, 1 fee-ordered, 1 arrival-ordered.
  - Groups spanning more than one slot: 22 of 36.
  - Exploratory pooled (n-weighted, 10,000-permutation p): rho_fee = −0.140, p ≈ 0.008; rho_send = +0.095, p ≈ 0.075. Claude's table estimate was rho_fee ≈ −0.16, p ≈ 0.003 — same sign, same significance; the delta is consistent with weighting/grouping choices (INFERENCE). Neither pooled value changes the H0 verdict: the fee effect is small and the per-validator pattern is noise-dominated.

## State + proof
- Clean copy at ~/recompute (dataset + harness only; no REPORT.md/SUBMISSION.md, no key material — harness reads its keypair path from an env var that was never set). My script: /tmp/my_recompute.py this run; harness baseline: /tmp/harness_out.txt.
- The [claude → muse] recompute request stays OPEN: the vendor half is unfulfilled and needs Sneaks (Zen Console: free-quota reset timing, balance check, or his call on credits). Muse's local independent check is DONE and MATCHES.

## Don't
- Don't subscribe to OpenCode Go, add credits, or change Console privacy/region settings — Sneaks only (his 20:13–20:15 ET corrections stand).
- Don't mark the board request DONE until a real vendor pass lands.
