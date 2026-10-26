# Launch kit — MUSEINU / MusePad — claude-code — 2026-10-26 02:15 ET

**Context:** Sneaks overrode the decider KILL ("work on some cool stuff for the launch. Listen to muse"). Following Muse's 01:44/01:58 plan: no Fartcoin quote, no creator buy, fix the site wording, publish receipts. No wallet, trade or posting action by claude-code.

## 1. Fair-launch simulator (built)
- https://claude.ai/artifact/EGi54Xw6HpYPSp2ak8YRZT (private until Sneaks shares it from the page's Share menu)
- Interactive. It shows the same bonding curve and the same bots under "first in the block wins" vs MusePad Rule 01 "one price per slot".
- Honest result at default settings (INFERENCE, model only):
  - inside the launch slot, the sniper/human price gap goes from **1.73× to 1.00×**;
  - but sniper profit from dumping only falls **10.79 → 9.52 SOL**, because being in slot 0 vs later slots still pays.

  So Rule 01 alone is not enough; Rule 03 (sealed orders) has to close the slot edge. The page says this plainly, which makes it good thread material and a spec input.

## 2. Thread draft (for Muse / Sneaks to edit and post; nothing posted)
1/ MUSEINU is Muse, all fuzzy blue. Launched in the open on pump.fun: no dev buy, no pre-allocation. Creator wallet holds 0. Receipts below. 🔵
2/ Receipts (verified on-chain):
   - mint FTmpvGK99eeT5F52YwCZtEKxBfHzdSymYQ4ha3WrHhod;
   - create tx Gojm3tEu…JsQ4;
   - launch cost 0.0067 SOL;
   - creator token balance 0.
3/ Bots traded it within a minute of launch. That's the problem MusePad is about: a launchpad where everyone in the same slot pays one price, bots and humans alike.
4/ Try it yourself: the simulator shows what one-price-per-slot fixes and what it doesn't. Slot edge still exists; sealed orders are the next piece. [simulator link, once shared]
5/ MusePad is a design, not a product yet. MUSEINU gives holders no rights, revenue or returns. Memecoins can go to zero. Building in public: [site] · [board]

## 3. Site wording fixes (for Muse, site owner): paste-ready
- Rules intro: "Eight rules. Enforced by the protocol…" → **"Eight rules MusePad is being designed to enforce in code, so nobody, including us, can bend them. Not built yet."**
- Every rule card: add a small "design goal" tag.
- Funding block: "What it raises builds MusePad." → **"MUSEINU is a memecoin. Holding it gives no rights, revenue, or returns. Creator rewards from it go toward building MusePad, logged in the diary."**
- Remove "Raypad edition: launch form prepared — goes live next" (Muse confirmed it is stale).
- Diary: add the creator-rewards claim (+0.0386 SOL net, tx 5mRTYY6v…76BG) so the funding ledger is complete.

## Next
1. Muse: apply section 3, then pick and edit the thread (section 2). Posting is Sneaks's call.
2. Sneaks: share the simulator link if you want it in the thread.
3. claude-code (on request): turn the simulator into the devnet spec's test cases (multi-wallet, slot-edge, sybil holders).

## Update 02:25 ET — Sneaks: dev buy is ON (owner override)
Sneaks needs a creator bag to pay bills and a possible DEX Screener listing. That is his call. It fits Rule 04 **as long as it's on the curve, in the open, from the published wallet**. The launch itself had no dev buy (VERIFIED, Muse 01:58), so a later open buy is "buying like everyone else".
- Thread post 1: replace "no dev buy, no pre-allocation. Creator wallet holds 0." with **"No pre-allocation, no bundle. The creator buys on the curve in the open, from the public wallet below, like everyone else."**
- Add a receipts line after the buy: **"Creator buy: X SOL → Y MUSEINU, tx …, wallet BxGW…ALEE."**
- Site fix (Muse): change any "no dev buy" claim about MUSEINU to the line above, and log the buy in the funding diary with its tx.
- Suggested, Sneaks decides:
  - one single buy, not split across wallets, so it can't look like a bundle;
  - post a simple sell plan, e.g. "small chunks, announced", to cut dump fear.
- DEX Screener listing: the fee is UNKNOWN (check their current price). It can come from creator rewards plus the 29 USDC already in the wallet.
- Execution (buy, listing payment) = Sneaks or Muse with Sneaks's OK. claude-code moves no money.
