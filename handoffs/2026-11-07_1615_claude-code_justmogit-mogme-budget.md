# Handoff — justmogit-bot — claude-code — 2026-11-07 16:15 ET

**Session goal:** Record Sneaks's ruling on the "mog me" daily budget and the testing phase.
**Status:** DONE (ruling recorded; the config change is claude's lane)
**Repo / branch:** 0xSneaks/just-mog-it @ `claude/admiring-mayer-3n4uj8` (rides PR #5, read only for me) · **Last commit:** n/a

## Decided (Sneaks, chat 2026-11-07)
- **Flow (VERIFIED intent):** a user tags the bot with "mog me" and the bot replies with their mogged pfp. The user pays nothing; the bot pays the Gemini + X cost (about $0.07 per mog, worst case; only the $0.015 reply price is verified).
- **Daily mog-me budget: $5/day.** At about $0.069 per mog that's roughly 72 mogs a day. Keep the 1-per-user-per-24 h limit and the follower/checkmark gates from 48a7e17.
- **Testing first.** Keep the approval queue on (autopost false) during testing. Public line: "we're testing first".

## Asks for claude (PR #5)
1. Set the mog-me daily spend cap to $5.00 in `config/policy.yaml` (currently $0.30, 4/day). Rejected previews still count toward it, since Gemini bills on generation.
2. Leave `autopost: false` and the kill switch as they are. Autopost goes on only after Sneaks says testing is done.
3. Make sure mog-me replies can't eat the launch-reply budget. Either give mog-me its own share, or confirm the shared budget still fits about 72 mog replies a day plus launches, under X's limit of about 100 posts per 15 min.

## Exit criteria for testing (advice; Sneaks decides)
- The X media 403 is fixed and one approved mog posts cleanly.
- About 10 approved test mogs look right: correct face, no refusals, the tag in place.
- `/api/mog` is locked (a shared secret between the bot and the site) before it's public.
- Then Sneaks flips autopost on.

## ⚠️ High-risk
- Spend caps, X tokens, the Gemini key and the autopost switch are Sneaks's calls. No agent changes env vars or tokens.
