# Handoff — muse · inside-the-block · 2026-10-24 15:01 ET

## Did
- VERIFIED: Built the Phase 1 harness skeleton at Sneaks's explicit GO (2026-10-24 14:55 ET, main chat). Local repo ~/workspace/inside-the-block on Muse's VM, git commit 10bd3f7 (local only, no remote — public repo is a later gated step). ~1,400 lines of pure-stdlib Python 3, zero dependencies.
- Modules: config (study constants), fees (FeeAccountant, hard cap), burst (16-tx planner, tier pattern reversed on alternate bursts), txbuild + ed25519 (offline Solana tx construction/signing), leaders (leader schedule, validator/client ID), capture (block landed-order), dataset (JSONL, signature+slot), analyze (pre-registered Spearman rules), sender (simulated default + gated live), rpc, cli (plan / dry-run / analyze / send).
- DESIGN.md (pre-registered experiment design) copied into the repo; its text is unchanged apart from a status note.

## State + proof
- VERIFIED: 22/22 unit tests pass on the VM (`python3 -m unittest discover -s tests -t .` → OK). Coverage includes RFC 8032 Ed25519 vectors, exact tier fee math, cap refusal (30th all-high burst refused, ledger unchanged), burst decorrelation, message structure, signed-tx verification with a throwaway key, dry-run end-to-end, and the live gate raising without its env flag.
- VERIFIED: `python3 -m harness plan` — per-burst fee 730,000 lamports; 18 planned bursts = 0.013140 SOL; worst case (all tx top tier) 0.030240 SOL; hard cap 0.05 SOL. Matches the design doc's arithmetic.
- VERIFIED: dry-run in a simulated fee-ordered world yields fee-ordered verdicts for all demo validators (rho_fee ~ -0.97); the random (H0) world yields no fee-ordered verdicts.
- NOT RUN: Docker repro (this VM's kernel cannot run containers — Dockerfile/compose are written to spec for judges' machines); live send path (by design — triple-gated, Phase 3 only, after the Oct 30-31 checkpoint).
- Nothing sent on any network; no keys loaded; the measurement wallet was not touched. ⚠️ HIGH-RISK surface noted: live path exists in code but is gated by --live AND INSIDE_BLOCK_LIVE_OK=1 AND fee-accountant approval, and verifies the loaded key matches the measurement wallet before sending.

## Decided
- Candidate per Sneaks's build process: Muse built directly (spec complete, bounded, dry-run verifiable); Muse verified.
- Pure stdlib over solana-py/solders: zero-dependency repro for judges; Ed25519 implemented in-repo and pinned to RFC vectors after two real bugs were caught by those tests (base-point constant typo, point-decode bit bug — both fixed, vectors now pass).
- Marker mechanism implemented as the design's candidate (self-transfer amount = 10,000 + send index); DESIGN.md keeps it a Phase 2 decision.
- Client classification is conservative: explicit jito/firedancer markers only, otherwise UNKNOWN (design's weakest-leg rule).

## Next (exact first step)
- Phase 2 (Oct 27-29): devnet shakedown — marker mechanism test, 16-tx-in-one-window reliability, client-ID reliability against known validators, fee-cap refusal test on devnet. First step: point the harness RPC at devnet and run the pipeline against SimulatedBlockSource replaced by RpcBlockSource on devnet slots.

## Don't
- Do NOT run the live send path before the Oct 30-31 checkpoint with Sneaks (includes the submission-credit validity check).
- Do NOT create the public GitHub repo or submit anything without Sneaks's approval.
- Do NOT touch any wallet other than the dedicated measurement wallet; never touch the funded excess above the 0.05 SOL cap.
