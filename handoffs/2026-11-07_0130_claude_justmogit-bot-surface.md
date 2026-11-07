# Handoff — justmogit-bot — claude — 2026-11-07 01:30 ET

**Session goal:** Sneaks: "finish the just mog it build" (X bot surface per BUILD-SPEC-v2 + owner brief).
**Status:** PARTIAL — logic done + tested with fakes; real adapters + pump.fun guard not built (HIGH-RISK).
**Repo / branch:** 0xSneaks/just-mog-it @ `claude/x-bot-surface` · **Last commit:** `ff89940` · PR #1 (open, not merged)

## Did
- Found main @ ac279df5 holds ONLY the Mogz `/mogit` money core — zero X code, zero pump.fun code; `mogit/guard.py` pinned to Meteora DBC — VERIFIED (read + grep)
- Built `bot/` + `config/policy.yaml`: policy loader, trigger parse, hard-skip screen, rug/wrong-pair rules, spelling lock, dossier + rescue prefix, sqlite store, job state machine, gates, reservation, fire/reconcile/kill/expiry, fee loop 25/25/50 + tiers, replies, "mog me" renderer — VERIFIED (tests)
- `mogit/` untouched — VERIFIED (diff)

## State (evidence)
- Tests: `python3 -m unittest discover -s tests` → **121 OK** (67 old + 54 new) on rebased branch — VERIFIED
- Deployed: no. Nothing wired to X, RPC, vault, or payments; every adapter defaults to Unwired → raises → fails closed (test_unwired_adapters_fail_closed_before_money)

## Decided
- Fee is requested only AFTER dossier/eligibility pass; cap counts queued jobs so nobody pays for a slot that can't exist; paid-but-refused → `fee_refund_owed` ledger row (Sneaks decides refunds) — claude (Sneaks approved? no)
- rug.rule default `strict` (price drop alone never qualifies) vs owner brief OR — flip `rug.rule: any` in policy — Sneaks approved? no
- Replies never write "pump.fun" (X auto-links it = $0.20 URL post) — claude
- Tiers weight the holder-pool distribution; mogger 25% fixed — INFERENCE of owner rule; Sneaks to confirm whether moggers also tier

## Next (start here)
1. claude-code: review PR #1 (`bot/engine.py` money paths first: reserve/fire/_confirmed/reconcile/_finish)
2. muse: build real adapters behind `bot/adapters.py` contracts, one PR each, no signer until (3)
3. Pin a pump.fun create-ix guard from a REAL pump.fun create tx (decode + assert mint/name/symbol/uri/no dev buy) — new module, tests from real fixture bytes

## Don't
- Don't reuse `mogit/guard.py` for pump.fun — wrong program
- Don't put keys/mint keypairs in repo or store; `vault.new_mint` returns pubkey only

## ⚠️ High-risk (wallets, signing, auth, prod, money)
- Every real adapter, the pump.fun guard, vault wiring, payment verifier → independent review + Sneaks's yes
- Owner gates unchanged: X written approval (`x_reply_approval_ref` empty = public boot refused), bot-account OAuth tap (+ media.write), 5 SOL seed, go-live yes
- Open owner numbers (ASSUMPTION in policy.yaml): min_pair_liquidity_sol 0.5, description_max_chars 1000, mogger.min_payout_sol 0.01, tier thresholds
