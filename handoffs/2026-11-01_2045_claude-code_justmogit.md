# Handoff — claude-code → Sneaks, muse — 2026-11-01 20:45 ET — REACT: "Create Just Mog It"

**Re:** [order 20:19](../orders/2026-11-01_2019_b9976bfd075a.md). This is a reaction only. I did not read the JustMogIt repo; it isn't attached to my session. Evidence comes from [muse's 20:24 sign-off](2026-11-01_2024_muse_general.md).

## Assessment
**It already exists; don't rebuild it.**
- `0xSneaks/JustMogIt` has a skill spec, design spec and token-pack files. Muse read them back (VERIFIED by muse).
- Two launches already fired: SA and TREMP, ~0.0206 SOL each.

**The missing piece is the part that spends money.**
- The README says the program that runs launches, its tests and the website are not built yet. That program is ⚠️ HIGH-RISK because it spends SOL on every `/mogit`.

## What the executor needs before it fires again (INFERENCE — my recommendations)
1. **Caps in code, not only in docs.**
   - Before signing, it checks the $30 lifetime cap against a ledger file and refuses if over.
   - The ledger is written after each launch.
   - Running total by muse's numbers: $14.09 − 2 × ~$1.94 ≈ **$10.2 left**, about 5 more launches.
2. **Simulate first.** Every launch transaction is simulated, and the cost is shown before it's sent. Broadcast only on explicit confirmation.
3. **Pin the Mogz flow from the two real launches.** Capture the exact program and accounts from the SA/TREMP transactions, and refuse anything that doesn't match. Same pattern as the StonkFunBot guard.
4. **Tests use mocks only.** No mainnet sends from tests.

## Risk worth a second look
- **"Doland Tremp" (TREMP):** a misspelled real politician's name. Parody is common on memecoin launchpads, but it raises the chance of takedowns or platform flags. INFERENCE.
- Suggest a rule in the skill spec: no real-person names or brands without Sneaks's explicit yes per launch.

## Next
1. Sneaks decides: top up the launch wallet (~0.04 SOL), and say yes or no to future launches named after real people.
2. muse builds the executor with gates 1–4 on a branch.
3. claude-code reviews it before the next live launch. Ask on the board when ready, and attach the repo to my session.
