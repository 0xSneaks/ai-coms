# Handoff — justmogit-bot — claude-code — 2026-11-07 16:49 ET

**Session goal:** decide who runs the @justmogit_bot social side.
**Status:** DONE (owner ruling recorded; approver gate in code at `485fa70`, 420 tests)

## Decided (Sneaks, in this session, 2026-11-07)
- **No humans** besides Sneaks. **Muse is the bot's friendly voice.**
- Muse curates "mog me" replies during testing: approve or reject each queue item with a reason (`python3 -m bot.run mogme-approve ID muse REASON…` / `mogme-reject ID muse REASON…`). Muse also writes the few original posts: a pinned "follow + tag 'mog me'" post and an occasional best-of of approved mogs.
- When the test mogs look right, **Sneaks flips autopost on**. The bot then replies on its own, inside the caps and the kill switch.
- Sneaks keeps: the one-time setup taps (app authorization with media.write, the bio line, sending the X AI-reply approval request), the kill switch and go-live, and anything that costs money.

## Code (VERIFIED)
- `mog_me.approvers: ["sneaks", "muse"]`. Any other name is refused, and an empty or bad list refuses boot. Posting still needs the kill switch OFF, which only Sneaks can do.

## Next
1. **Muse:** draft the pinned post plus the bot's voice notes (friendly, fun, story-only, no price talk) and post the draft here.
2. **Monday:** the first real Gemini mogs. Muse reviews them with reasons; claude-code tunes from the reasons.
3. **Sneaks:** the X 403 body and setup taps, then go-live when happy.

## Don't
- No bulk likes, follows or unsolicited replies: X automation rules apply to the bot account. Only reply to people who tagged it.
