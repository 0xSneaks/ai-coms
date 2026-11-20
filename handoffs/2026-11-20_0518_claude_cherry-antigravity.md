# Handoff: claude (chat) → claude-code, muse · cherry-antigravity · 2026-11-20 05:18 ET

Paste to `0xSneaks/ai-coms/handoffs/2026-11-20_0518_claude_cherry-antigravity.md`. Chat has no push access (VERIFIED: no GitHub token).

## Did
Portal walk with Sneaks, wizard 1/8 → 7/8 (screenshots seen: 1/8, 4/8, 5/8 money, 7/8). 2/8 and 3/8 not seen by claude; Sneaks reports they were set correctly.

## State (portal)
- Project "Antigravity", Mini app.
- App ID `243a432e-a793-4aa9-9984-106387faad30` · Project ID `app_8bc59a6aef11` (not secrets).
- 1/8 VERIFIED (screenshot): name Antigravity; pitch "See where Hyperliquid money is flowing."; category Tools; icon + cover uploaded.
- 4/8 INTENT per Sneaks: Live chat, Full app (chat hidden behind a button). Not re-seen after tap.
- Money step: Sales 10% (portal preselected Free; Sneaks told to switch). Not re-seen after tap.
- 7/8 VERIFIED (screenshot): portal prompt copied; saved below as spec. App URL not added; checks + test not run.
- Portal prompt facts: tier unverified ($50/tx, $50/wallet/day), chains solana, blocked CU/IR/KP/SD, SDK ^0.1.24, Sales.

## Decided
- Sales, not Free: app sells USDC passes.
- Live chat + Full app: share-to-room cards need a readable room. ASSUMPTION: Channel may also allow share; switch back to Channel if checks object.

## Next (exact first step)
1. claude-code: save the portal prompt verbatim as `docs/CHERRY_INTEGRATION.md` on `claude/antigravity-v1`; set env `APP_ID` (Vercel + API host) to the App ID above.
2. claude-code: reconcile with build prompt. Portal blocks CU/IR/KP/SD only; spec also needs Crimea/Sevastopol/occupied Donetsk/Luhansk/Kherson/Zaporizhzhia blocked in-app.
3. claude-code: confirm listing age rating is 18+ (portal prompt does not state it; claude never saw 3/8).
4. muse: preview URL (Vercel web + container/VM API), then post on board.
5. Sneaks: add URL under "Where your app runs", Run checks, Run the test, screenshot reds; Continue to 8/8 only after pass.

## Don't
No production deploy, no wallet signature or real payment, no receiving-wallet change without Sneaks's yes. Never push to main. No secrets in chat.

## High-risk
⚠️ Money path (pass payments): implementation → codex adversarial review → independent verify before any real tx. Unverified tier: two 30d passes ($60) in one UTC day will hit DAILY_LIMIT; handle the message.

## Open flags (not blocking)
- Name clash with Google Antigravity (IDE).
- Icon (red ball on stem) may read as a Cherry-style mark; cover shows red bars that resemble candles. Art is Sneaks/grok-bot's call.
- Ask team@cherry.fun whether public whale positions count as "signals for a fee" before publish.
