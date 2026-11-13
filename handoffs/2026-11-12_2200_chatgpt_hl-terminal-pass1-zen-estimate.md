# ChatGPT → Muse / DeepSeek / Codex — HL terminal Pass 1 and Zen budget gate
Date: 2026-11-12
Project: hl-terminal-android
Status: SIGNED OFF — code DRAFTED ONLY, FIX FIRST; OpenCode Zen forecast requested, no paid requests

## Did
- Read ai-coms BOARD.md and projects/hl-terminal-android.md. No active claim over this new audit lane.
- Inspected DeepSeek free-app BUILD PASS 1 text bundle: 12 complete config/domain/storage files, but test files and UI shell promised in next batch; no committed repo, tests or Hyperliquid live connection.
- Found material problems to correct: PnL may add fees with wrong sign and skips closedPnl on fee-token mismatch; builder-fee handling requires source-contract verification; fill dedup recorded before persistence succeeds and no account-scoped key; canceled partial orders display PARTIALLY_FILLED instead of CANCELED and terminal logic ignores late fills; notification gate marks event as notified before verifying the order and has no durable dedup.
- Verified official OpenCode pay-as-you-go model prices are per million tokens with separate input/output/cache rates; OpenCode Go is a separate pricing/product path. User requested a Muse prompt to estimate using existing Zen credits, but the actual balance and account-specific rate are UNKNOWN. Muse must inspect its own console/session ledger read-only and forecast cost without paid inference or top-ups.

## State + proof
VERIFIED: DeepSeek sent named source snippets for types, reducer, persistence, ledger, PnL, notification; no tests executed, code only in chat.
VERIFIED: GitHub terminal target repo was previously returned 404. The user uses the free DeepSeek app with no GitHub connections; manual paste/import required.
UNKNOWN: live Zen balance, model IDs enabled in owner account, token usage estimates, live exchange accuracy, app runtime.
No code imported or trades changed, no GitHub app repo, paid model call, balance adjustment or deployment.

## Decided
- Keep DeepSeek on free app for code drafts; request targeted corrections and remaining tests/UI files in next batch.
- Muse cost gate ONLY: compare existing Zen token prices, remaining usable credit, projected per-stage costs (import/code-fix, tests, Codex review, Claude final, contingency), provider separation, no double counting subscription seats.
- Never treat completed file snippets or claimed test readiness as verified. Codex code review after a reproducible branch and tests, Claude final.

## Next
1. Sneaks asks Muse to perform the read-only OpenCode Zen cost estimate using the copy-ready prompt from ChatGPT.
2. DeepSeek corrects Pass 1 audit findings and supplies next full source files/tests through manual copy.
3. ChatGPT/authorized agent establishes private repo and imports only after validating each batch, then CodeX independent review.

## Don't
No OpenCode paid test calls, auto-recharge, new credits, API keys in chat or COMS, placing/edit/canceling Hyperliquid orders, trade approval, production deploy or fabricated balance/pricing.
