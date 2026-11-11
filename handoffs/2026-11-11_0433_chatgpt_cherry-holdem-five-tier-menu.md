# Handoff — Cherry Hold'em five-tier menu direction
Date: 2026-11-11 04:33 ET
From: chatgpt
To: muse, claude, claude-code
Project: cherry-holdem
Risk: ⚠️ HIGH-RISK only if later converted to paid SOL checkout / wallet functionality.

## Did
- Read BOARD.md and projects/cherry-holdem.md; reviewed preceding 2026-11-11_0429_chatgpt_cherry-holdem-pricing.md handoff.
- Applied Sneaks's new owner direction: packages are intended for the Cherry mini app; REMOVE 'Mini' from menu; cap at 4–5 total; select exactly five surviving previously researched tiers.
- Recorded desired future menu in project spec; no modifications to the claimed Cherry app repo, Vercel, wallet, funds, or payment logic.

## State + proof
INTENT (owner 2026-11-11): For Cherry, five packages maximum. The 'Mini' package ($0.84 proposed) is EXCLUDED, not hidden, so do not create a purchase SKU for it.

Research benchmark (original Nov 11 six-game blackjack iOS tier sample; proposed, not production approved):
| Menu package | Competitor tier mean (USD) | Proposed Cherry USD (mean × 0.85, cents rounded) |
| --- | ---: | ---: |
| Starter | 1.99 | 1.69 |
| Standard | 4.99 | 4.24 |
| Plus | 9.99 | 8.49 |
| Premium | 19.82 (underlying exact mean 19.823333…) | 16.85 |
| Elite | 49.99 | 42.49 |
TOTAL: exactly five. No Mini and no optional Whale tier. Neither chip allocation, purchase economics, nor poker-specific competitor parity has been verified.

SOL price design (NOT live):
- Price book denominated in immutable USD cents per tier; runtime checkout conversion via fresh SOL/USD server oracle/quote.
- With SOL_USD > 0, lamports = ceil((usd_cents/100) / SOL_USD × 1,000,000,000) using exact decimal/fixed point; quote freshness, expiry, recipient, and transaction replay verification gates required.
- Never hardcode the historical $82.80 SOL quote as a current price. No claim of a guaranteed exchange rate.
- Error/expired quote => block purchase, show new quote, explicit user reconfirmation.

## Decided
- Owner's request supersedes the 6-tier draft: choose five tiers, omit Mini.
- Owner's Cherry distribution preference is confirmed. This is menu/product intent, NOT a standalone approval to implement payment flows.
- Existing locked v1 still credits-only (10,000 free credits, SOL_ENABLED=false); legal/Cherry mini-app fee/payment terms and gambling/simulated poker implications require verification before any paid release.

## Next
- Muse/Claude: use five-tier spec in future monetization proposal; run Cherry policy/legal review, determine virtual chip quantities with no redemption value, confirm whether paid chips are allowed, and request explicit owner approval of payment implementation/deployment.
- Keep current v1 free-play release steps moving without monetization code.

## Don't
- Don't create the $0.84 Mini, whale tier, a sixth SKU, SOL escrow, cash-out, entry fees, user deposits, or payment endpoints.
- Don't touch files the muse/claude-code agents claim. Don't enable any live money path. No secrets.
