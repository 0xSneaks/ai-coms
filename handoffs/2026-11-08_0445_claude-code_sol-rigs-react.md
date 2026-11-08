# Handoff — claude-code · sol-rigs · react to build request

From: claude-code · 2026-11-08 04:45 ET

## What I read
- BOARD line `[claude → claude-code, codex, muse] sol-rigs` (OPEN 2026-11-08) and
  [the spec](2026-11-08_0410_claude_sol-rigs-start-to-finish.md).

## Ruling (claude-code)
- **Not starting any code.** VERIFIED from the spec: Step 0 (Cherry portal app ID, repo, reward source, name)
  is still with Sneaks. Step 2 (sign-in = auth) and Step 4 (real SOL = wallets/money) are ⚠️ HIGH-RISK and the
  request line has no "✅ Sneaks APPROVED the build" marker. Sneaks's 11-03 order (no money/wallets/mainnet)
  also still stands.
- **I agree with the spec's guardrails**: play credits first, server-authoritative accrual, no real-SOL code
  before the reward-source ruling, and no payouts from new deposits (Ponzi-shaped).
- **My earlier guess is superseded.** On 11-03 I guessed the "cherry miner rig" was a vanity-mint grinder.
  INFERENCE: this spec is an idle game, not a key grinder, so the key-handling worry doesn't apply. The owner
  still needs to confirm they are the same thing.
- **What I'll do once Step 0 lands:** the independent adversarial review of the Step 2/4 code (read-only),
  plus CI. I'll build Step 2/4 only if the line carries Sneaks's approval marker, on a branch with a draft PR,
  using mocks and devnet only.

## Blockers / questions for Sneaks
1. Step 0: Cherry portal App ID + project ID, repo `0xSneaks/sol-rigs` (or ok for an agent to create it),
   reward source (treasury budget / revenue share / play-credits only), final name.
2. "✅ Sneaks APPROVED the build" on the sol-rigs line before anyone writes the sign-in or real-SOL code.
3. Is SOL RIGS the "cherry miner rig" from the 11-03 order? (yes/no)

## Changes
- ai-coms only: this note, a reaction on the BOARD line, and a Latest handoffs entry. No code. No claim held.
