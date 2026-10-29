# Handoff — kalshi-trader re-review + REACT worklist — claude-code — 2026-10-29 13:00 ET

**Session goal:**
- Re-review kalshi-trader @ `9bcabd4c` (muse's request, handoffs/2026-10-29_1238).
- Answer Sneaks's 12:20 REACT order: claude-code's work, ordered easiest → hardest.

**Status:** Re-review DONE. **Verdict: FIX-FIRST on G3 only; everything else PASS.** Prod stays locked.

## Re-review (`9bcabd4c`)
- Tests: `python3 -m pytest` → 77/77 pass. — VERIFIED
- Proofs v2: `projects/kalshi-trader/review_proofs_2026-10-29_v2.py`. Offline only: temp files, no network, no orders.

| Item | Verdict | Evidence |
|---|---|---|
| G1 string `live_enabled` | **PASS** | `config.py` `__post_init__` raises ConfigError; gate uses `is not True`. Proof P1 now rejected. — VERIFIED |
| G2 overridable caps | **PASS** | `min(config, HARD_*)`. Proof P2: a $500 order is refused. — VERIFIED |
| G3 operator self-approval | **FIX-FIRST** | See below. Proof G3b: **ACCEPTED**. — VERIFIED |
| G4 day cap fails open | **PASS** | A corrupt line raises GateError. A missing log while prod previews exist refuses. — VERIFIED |
| G5 unrecorded send | **PASS** | `order_attempt` (cost+fee) is written before `create_order_v2` and deduped by client_order_id. Proof P4b. — VERIFIED |
| G6 token race | **PASS** | `fcntl.flock` around mint and consume, with an 8-thread test. — VERIFIED (code + test) |
| STOP | **PASS** | Re-checked right before both sends. Hard freeze (cancels blocked) per Sneaks's decision. — VERIFIED |
| Secrets / transport | **PASS** | URLError and socket.timeout now go to JSON; no key material. — VERIFIED |
| Path segments | PASS (note) | The regex still allows `.` and `..` as an order_id or ticker. Add `and text not in (".", "..")` in `client.py` `_path_segment`. |

### G3 — why it's still open
- **What it does now:** the prod token is no longer printed. It is written to `~/.config/kalshi/approvals-outbox/<hash>.token` (0600) on **the same VM, owned by the same user the operator runs as**. Execution accepts any matching file in `approved/`.
- **Proof G3b:** `cp approvals-outbox/<hash>.token approved/` and then execute → **accepted**. The CLI never copies the file itself, but muse (or anything with a shell on the VM) can. The secret is on the operator's disk, so the operator can still self-approve.
- **Also:** nothing in coms-pwa or anywhere else implements the "Face ID drops the token" leg yet. Today, the only thing that could write to `approved/` is something running on the VM. — VERIFIED (repo grep; coms-pwa has no such route)
- **Fix that closes it: an approval signature the operator can't forge.**
  1. coms-pwa holds an **Ed25519 private key** in its server env. Agents never see it; Sneaks sets it.
  2. After Face ID, coms-pwa signs `kalshi-approve:v1:<preview_hash>:<expires_unix>`.
  3. The CLI ships the matching **public key** in the repo. It verifies the signature, that the hash matches the re-derived intent, that expiry hasn't passed, and single-use (keep the flock'd used-set).
  4. muse relays the signature. It can't make one.
  5. Remove the outbox secret entirely: the preview hash is public, and the signature is the approval.
- **Who builds what:**
  - The CLI verify side: muse. Small, and testable offline with a test keypair.
  - The coms-pwa signing route: auth + prod → ⚠️ HIGH-RISK. Needs **"✅ Sneaks APPROVED the build"** before claude-code builds it as a draft PR.
  - Creating the key and setting the env var: Sneaks only.

## REACT — claude-code's open work, easiest → hardest
1. **seeker-bridge PR #1 — done on my side.** Waiting on muse to verify, then Sneaks merges and restarts the phone proxy. Effort for me: 0.
2. **halfmoon-proof-kit 2-line wording fix — ~5 min** once Sneaks says "add halfmoon-proof-kit" (or muse pushes it).
3. **kalshi G3 re-check — ~30 min** once muse ships the signature-verify CLI change. I re-run the proofs.
4. **coms-pwa Face ID approval-signing route — ~2–3 h.** Needs Sneaks's approval marker plus his key/env setup (HIGH-RISK).
5. **Zero-Edge Launch verify pass — ~half day** after muse's build and codex's review land.
6. **x402 Paying Agent and LLM Panel — blocked** on Sneaks's decisions: the approval marker, and the stack-picks repo plus vendor keys.

## ⚠️ High-risk
- Funds path. `live_enabled` stays false until G3 PASSes and Sneaks flips it himself.
