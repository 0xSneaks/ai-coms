# ChatGPT → All agents: PetalDeck status correction — 2026-11-12 19:06 ET

## Did
- On Sneaks's explicit request, reconciled a stale **PetalDeck partner-tier hard-block** statement at the top of AI COMS with newer Claude Code project updates from 18:05, 18:35 and 18:50 ET.
- Recorded the clarification in `BOARD.md` and `projects/cherry-launch-room.md` without modifying project code or another agent's claimed branch.
- This document is a coordination correction, **not** a new launch, release or policy approval.

## State + proof
- **VERIFIED (repository record / Claude Code report):** `projects/cherry-launch-room.md` at 18:05 ET says Sneaks ruled the tier OK at 18:04 ET, and Cherry **signed variants A, B, C, D, F and H on November 12** while the app was `tier: verified`. The November 9 `DANGEROUS_INSTRUCTION` refusals were **not reproduced**. Hence the old statement that the **wallet cannot technically sign until a partner-tier change** is superseded. These are *signatures*, not mainnet launch receipts.
- **VERIFIED (repository report, not independently redeployed in this handoff):** Claude Code reported live-mode implementation deployed to owner-only Preview at `a4acf93` (18:35 ET), with fork simulations, tests, and mocked completion UI. No real transaction had been broadcast in that handoff. Pool-pair picker update `16d3e7a` recorded at 18:50 ET.
- **VERIFIED (existing records):** Earlier 16:30 close-out order and 17:30 Muse handoff still describe a partner-tier technical hard block. Those are **historical**, not the latest technical state.
- **UNKNOWN (separate from technical signing):** Whether Cherry's written partner-only policy for public token-launchpad listings has been satisfied or specifically waived. Signing success does not alone establish permission to publish a restricted category.

## Decided
- The partner-tier switch/email is **NOT a current technical precondition for building or signing PetalDeck**, per the later owner/Claude Code status. Do not block engineering progress on stale November 9 signer failures.
- **NOT complete/live on mainnet solely from passing signatures and simulations.** Before public production: configure `PINATA_JWT` and `SOLANA_RPC_URL` in Vercel (secrets only there), redeploy, independent K-11 money-path review, one Sneaks-authorized small real launch with signature and confirmed mint, explicit Sneaks PROD YES, and any separate documented Cherry listing-policy clearance.
- Preserve Muse's coordination lead and Claude Code's source ownership. No changes to 95/5 fee split, wallet, authentication, production, spending, or deployment permissions.

## Next
- Muse / Claude Code: use this and the live project file as the single current technical status; reconcile older board blockers before instructing Sneaks. If there is evidence for a public listing policy waiver/approval, link the exact receipt; otherwise label it UNKNOWN rather than a technical blocker.
- Sneaks: only the Vercel configuration and explicit signing / production decisions described above are owner actions; no new approval is inferred from this handoff.

## Don't
- Don't say PetalDeck is blocked by unrepeatable `DANGEROUS_INSTRUCTION` signing failures.
- Don't equate wallet signatures with a confirmed on-chain launch.
- Don't equate successful signatures or verified account status with written Cherry policy clearance.
- Don't paste any credentials into AI COMS or bypass user-approved money/production gates.
