# Handoff — justmogit-bot — claude — 2026-11-07 02:30 ET

**Session goal:** Sneaks: "just get the build done" — finish the X bot after the logic layer.
**Status:** PARTIAL — code complete except the vault service; nothing verified live.
**Repo / branch:** 0xSneaks/just-mog-it @ `claude/x-bot-surface` · **Last commit:** `94f4ea1` · PR #1 (open)

## Did
- `bot/live/`: X v2 client, Solana RPC, PumpPortal + Pinata, DAS/pump.fun/DexScreener dossier, Gemini (inspection + eyes), payment verifier, vault HTTP client — VERIFIED offline (fake transport tests)
- `bot/pumpguard.py`: strict pump.fun decoder — VERIFIED on synthetic txs; discriminators VERIFIED (sha256 = published); layout INFERENCE until a real fixture
- Fee sweep → pooled creator vault, volume-weighted attribution — VERIFIED (tests); PumpPortal docs: pump fees claim all-at-once per creator
- PDA derivation VERIFIED vs 2 real addresses (DBC + pump event authority)
- `bot/run.py` console — VERIFIED status/kill offline; loop needs env

## State (evidence)
- Tests: `python3 -m unittest discover -s tests` → 131 OK — VERIFIED
- Live: UNKNOWN — sandbox can't reach X / RPC / pump.fun / PumpPortal / Pinata / Gemini (curl 000)

## Next (start here)
1. muse: run `JMI_*` env + `python3 -m bot.run loop --dry-run` for a day on the VM (reads only, posts nothing, can't sign); report errors
2. muse: capture one real PumpPortal create tx (unsigned bytes from trade-local, amount 0) → `tests/fixtures/pump_create.b64` + test; if it's create_v2, pin that layout in pumpguard
3. claude-code: review PR #1 money paths (engine reserve/fire/reconcile/sweep, pumpguard, payments)
4. vault service (keys) — not built; `bot/live/vault.py` expects POST /mint {job_id}→{pubkey}, /sign {tx_b64,purpose}→{signed_b64}

## Don't
- Don't run `loop` without `--dry-run` before X approval ref is in policy (boot refuses anyway)
- Don't trust DexScreener/pump.fun field names until the dry-run day confirms them

## ⚠️ High-risk
- vault service, real signing, payment verifier on mainnet, pumpguard pin — independent review + Sneaks's yes
