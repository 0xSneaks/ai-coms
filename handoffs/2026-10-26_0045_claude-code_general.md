# REVIEW AND BREAK DOWN — "museinu" rewards coin — claude-code — 2026-10-26 00:45 ET

Order: orders/2026-10-26_0039_*.md [sneaks → all] · Kind: REVIEW AND BREAK DOWN (review only; nothing built)
**Verdict: TEST on paper/devnet first — PARK any mainnet launch.** ⚠️ HIGH-RISK (money, wallets, public token).

## What the ask is (INTENT, from the order)
1. Launch a coin named **museinu**.
2. Brand: Muse drawn **all blue**.
3. Make it a **rewards token**, with rewards driven by "the best stats you guys can come up with".

## Claims vs evidence
- VERIFIED: nothing exists yet. No museinu code, wallet, mint or art in any repo I can see (muse-tune-up, ai-coms, coms-pwa, seeker-bridge).
- UNKNOWN: which chain or launchpad. The board mentions Solana work and pump/bags launch tooling elsewhere, but nothing is chosen for this.
- UNKNOWN: what "stats" means: holder count? volume? Muse's paper-desk P&L? agent activity?

## Risks (biggest first)
1. **"Rewards from stats" can make it look like an investment product.** INFERENCE, not legal advice: if holders are paid from the team's performance or revenue, regulators can treat it as a security. Have someone qualified look before any public launch.
2. **Money and keys.** A launch needs a funded wallet, a mint authority and liquidity. Per standing rules that is Sneaks-only (⚠️ HIGH-RISK): no agent funds, signs or holds those keys.
3. **Reward mechanics are where tokens get drained.** Reward or claim contracts are the usual exploit target. Any on-chain reward logic needs tests and an independent review before mainnet.
4. **Reputation.** "Inu" memecoins carry rug-pull baggage. Launching under Muse/Phantom branding ties that baggage to the brand.
5. **Stat gaming.** Any stat that pays rewards will be farmed (wash volume, sybil holders). Pick stats that can't be faked cheaply.

## Missing pieces
- Chain plus launch path (launchpad vs. own mint).
- Supply, fees, and whether mint and freeze authority are revoked.
- Where reward money comes from: fees? treasury? If "new tokens", that dilutes holders.
- The stat formula, and who or what computes and signs the payouts.
- Art: blue Muse mascot. This is the safe, buildable part now.

## Concrete next steps (no money moves)
1. **Sneaks picks the stat idea in one line**, e.g. "rewards = share of trading fees, weighted by how long you've held".
2. **Paper design**, about 1 page:
   - supply;
   - fee split;
   - reward formula;
   - anti-gaming rules;
   - who holds which keys.
3. **Devnet/testnet simulation only**, with mocks: model payouts over 30 fake days, including a farming attack.
4. **Blue Muse art** (safe now: Grok/Codex art lane).
5. A mainnet launch only with "✅ Sneaks APPROVED the build" plus his own funding and keys; agents never sign.

claude-code can do 2–3 (design doc + simulation) on Sneaks's word; it won't touch wallets or mainnet.
