# Blue-14 → Muse — Sanzaru / Rings revenue investigation: COMPLETE

**Date:** 2026-11-16 · **Lane:** read-only research (no deploy, no wallet, no transactions, no phone, no production changes) · **Claim released with this handoff.**

**Deliverable:** `~/workspace/sanzaru-launch/RINGS-REVENUE-INVESTIGATION.md` (full report: evidence, MVP spec, revenue model, risks, sources).

## Headline findings (all VERIFIED, primary sources + on-chain reads 2026-11-16)

1. **Rings creators earn ZERO trading fees — proven on-chain.** Decoded all 14 Meteora DBC PoolConfigs Rings has ever created (fee-claimer `6zq4WxBjrUA3DwRo7PYY5GWdkbwsUbaf97BMDxFZmJae`) and all 27 live pools beneath them: every config sets `creator_trading_fee_percentage = 0`, every pool's accrued creator fees = 0, migrated LP split = partner 100% permanently locked / creator 0%. The 1.5% flat trade fee splits 0.3% → Meteora protocol (documented 20% share) and 1.2% → Rings as partner (claimable only by Rings' fee-claimer). The prior "1.2% = $RINGS buyback+burn" claim could NOT be re-confirmed from any primary Rings source — on-chain it is ordinary partner revenue; treat destination as INFERENCE. Creator 0% is certain.
2. **Graduation:** SOL config (`Crm9eSV4…EgvJ`) threshold = **82.7 SOL exactly** (migrated pools' reserves confirm). Most Rings launches actually pair against **$RINGS** (three RINGS configs: 58.8M / 13.1M / 9.33M RINGS thresholds), not SOL. Venue totals: 27 pools ever, 3 migrated. Pool creation fee in config = 0; real launch outlay ≈ rent (~0.02 SOL) + chosen first buy (INFERENCE).
3. **Privacy language (use exactly):** Helius Privacy Rings encrypt amounts; addresses stay public — confidentiality, not anonymity. Pool creator is a single-use key (27/27 unique creator addresses on-chain); the first-buy delivery to the launcher's wallet is public (Rings' own copy). Protocol is beta; formal verification pending; audits: Certora, OtterSec, ZK Security. Rings has NO sealed-bid auction product — OTC is bilateral sealed offers, atomic settlement, example fee 0.0025 SOL.
4. **Integrations:** Rings publishes NO API/SDK/widget/referral program (UNKNOWN → link-out only: launch.rings.run, otc.rings.run). The one verified revenue mechanism available to us is **Jupiter's integrator referral fee** on our own site's swap: 50–255 bps, Jupiter retains 20%, integrator nets 80% (at 50 bps → net 0.4% of routed volume). Terminal v3 supports `platformFeeAndAccounts`; V4/Ultra fee support is pending — implementation must pin/verify the bundle or use Swap API v2 `/order` directly.
5. **Kikazaru data stack (verified pricing):** DexScreener API free (300/min pairs, 60/min profiles; NO candles; terms prohibit resale → display/link only), GeckoTerminal free 30/min with OHLCV, Helius free 1M credits/mo (existing key; powers our DBC pool-state decode — the differentiator), Birdeye Lite $39/mo as the Phase-2 paid upgrade (spend gate).

## Recommendation (detail in the report)

- **Feature:** Kikazaru Token Intelligence — free facts-only token fact sheet (price/liquidity/volume + chain-truth panel: authorities, holder concentration, DBC fee %, LP lock, graduation progress; every number source+timestamp labeled; NO invented risk score) carrying the referral-wired Jupiter swap. Mizaru = labeled link-outs to Rings launch/OTC; Iwazaru = deal-room link-out concept (Phase 3 enhanced listings PROPOSED $3–$10). Paid Deep Reports ($2–$5) and Monitoring ($5/mo) are PROPOSED hypotheses — hidden until SOL/USDC pay-then-deliver fulfillment works; 30-day measurement gate first. Tip jar only with an owner-confirmed config address.
- **GO/NO-GO:** (a) Rings as venue — **GO** for the privacy/branding merits with $0 creator-fee expectations in writing; would be NO-GO if fee income were the goal. (b) Feature — **GO**: $0/mo MVP run cost on Blue-13's existing site, no custody, one verified revenue mechanism.
- **Dependencies for MVP:** Lane A CA → set `MINT` → owner one-time Jupiter referral-account setup (owner-signed) → wiring + panel build → repo/Vercel unblocks already on record (GitHub repo creation needs web UI; Vercel needs `phantomcapais-projects` team scope).

## Sign-off
- BOARD claim line updated to DONE/RELEASED in the same push as this handoff.
- Blue-13's files untouched; Blue-11's packet untouched; nothing deployed, funded, connected, or transacted by this lane.
