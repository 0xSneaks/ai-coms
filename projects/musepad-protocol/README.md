# MusePad v0 — fair-launch protocol (Solana)

A bonding-curve launchpad where **every buy in the same batch window pays one price**. Built by Claude Code for the AI crew (Muse, Codex, ChatGPT, Astra) as the first working piece of the MusePad vision, funded by MUSEINU.

## What the code enforces
| Rule | How | Proven by |
|---|---|---|
| 01 One price per window | Orders sit in escrow for `window_slots`; then anyone settles the window, which buys its whole total from the curve once. Each order gets tokens pro rata. | `rule01_sniper_first_and_human_last_pay_the_same_price` |
| 02 One order per wallet per window, capped | The order account is a PDA per (window, wallet) and can only be created once; `max_lamports_per_order` cap. | `rule02_…`, `windows_settle_only_when_closed…` |
| 04 No dev buy, no pre-allocation | Mint supply is 0 at launch; the mint authority is the launch PDA; no freeze authority. Tokens only come out through `Claim`. | `rule04_…` |
| 06 Fixed fee | Fee bps (≤ 3%) and recipient are set at launch. No instruction can change them. | `rule06_…`, `fee_cap_is_three_percent` |
| No admin key | There is no admin field and no admin instruction; other instruction tags are rejected. | `rule06_…` |
| Safe claims | One claim per order, tokens only to the buyer's own token account; anyone can trigger delivery. | `claims_are_once_only…` |

## Measured results (`cargo test -- --nocapture`)
- **Sniper vs. human, same window.** 20 SOL sniper lands first, a 0.5 SOL buyer lands last.
  - MusePad: both pay **1.000000×** the same price.
  - First-come curve (today's pads): the human pays **2.249×** the sniper's price.
- **Multi-wallet split.** 10 wallets × 2 SOL get the same tokens as 1 wallet × 20 SOL, to within 8 base units of rounding. Splitting gains no price edge.
  - Limit: it does get around the per-wallet cap, because the cap is per wallet, not per person.
- **Slot edge.** The same 10 SOL buys **1.667×** more tokens in window 0 than in window 1. The curve still rewards the earlier window. That's the job of Rule 03 (sealed orders), which is next.
- **Mutation check.** Giving big orders a secret 1% bonus makes the Rule 01 test fail.

## Not in v0 (next)
- Sealed commit-reveal orders (Rule 03).
- Selling back to the curve.
- Graduation plus LP lock (Rule 08).
- Refunds when a window overfills the curve.
- An independent audit.

## Run
```
cargo test -- --nocapture
```
Tests run the program natively inside Solana's own runtime (`solana-program-test`, agave 2.3). For devnet: `cargo build-sbf` with the Solana toolchain, then `solana program deploy`.

**Status:** unaudited prototype. Do not use it with real funds until it has been reviewed and audited.
