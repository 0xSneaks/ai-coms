# Handoff — justmogit-bot — claude-code — 2026-11-07 16:08 ET

**Session goal:** "mog me" X flow. A user tags @justmogit_bot "mog me" and gets their OWN PFP with shades. Approval-gated.
**Status:** PARTIAL. Build and tests are DONE. The 403 diagnosis and the live preview E2E are BLOCKED (no creds or network here; owner actions needed).
**Repo / branch:** 0xSneaks/just-mog-it @ `claude/admiring-mayer-3n4uj8` · **Last commit:** `bd989d6` (rides [PR #5](https://github.com/0xSneaks/just-mog-it/pull/5), Codex-gated, NOT merged)

## Did (VERIFIED unless marked)
- Intake already existed (`bot/run.py` loop persists `since_id`; `bot/parse.py` matches the whole "mog me" phrase). Added: retweet and own-post skip, plus dedupe by tweet id (`bot/mogme_queue.py`, `bot/live/x.py`).
- Target is the mention AUTHOR only. The avatar comes from the author's `profile_image_url`, or a lookup by `author_id`. Other tagged users and attached images are never used (test).
- Hardened fetch: `_normal` stripped to full size · https only · `pbs.twimg.com` only (no userinfo, no custom port) · redirects never followed · 10 s · 5 MB · jpeg/png/webp checked by Content-Type AND magic bytes, then a PIL verify. A default avatar or a failed fetch queues a polite text-only draft, which still needs approval.
- Edit: `SiteMogEditor` POSTs to justmogit-site `/api/mog` (branch `pfp-changer`, `api/mog.js`, style `vipers`). There is no second copy of the prompt, and no retry. A refusal or failure is logged as `mogme_refused`; nothing is queued or posted. A small "GET MOGGED" tag is added bottom-right with Pillow (the vipers prompt has no tag).
- Limits (fail closed): 1 per author per rolling 24 h · daily cap derived from prices · shared $/day budget (coin replies + Gemini) · a missing price refuses.
- Queue: PNG + JSON per mention in `$JMI_MOGME_QUEUE`, status PENDING. `mogme-approve ID NAME` requires a name. `mogme-post` posts APPROVED items only, never while the kill switch is ON (a missing or non-False value means ON). Items are marked POSTING before any X call, so nothing double-posts. `mog_me.autopost: false`.
- `bot/engine.py` `mog_me` no longer posts directly. The legacy `mogit/bot.py` listener (PFP v1.0.0, which posted with no approval, kill switch or budget) now refuses to start.
- Tests: `tests/test_mogme_queue.py`, 41 tests with mocked X, fetch and Gemini. Full suite **306 passed**, including in a clean venv. Each gate was mutation-checked: the kill switch, dedupe, cooldown, cap, autopost, approval, host allowlist, MIME sniff and refusal all make tests fail when disabled.

## Cost math (prices UNVERIFIED except where noted)
- Per mog, worst case: Gemini image $0.039 (gemini-2.5-flash-image list price, 1290 output tokens × $30/1M; UNVERIFIED today) + reply $0.015 (policy `plain_post`) + mention read $0.005 + user read $0.010 (BUILD-SPEC-v2; UNVERIFIED) = **$0.069**.
- Daily cap = floor($0.30 / $0.069) = **4 mogs/day = $0.276**, which fits inside $0.30. The burst $0.50 is not used.
- The budget is shared with coin replies. Gemini is booked at generation, so rejected previews still count. Media-upload cost is assumed $0 (UNVERIFIED).

## X media-upload 403: cause UNVERIFIED
No error body is recorded anywhere on ai-coms, and this session cannot reach api.x.com (proxy) and holds no X tokens. Facts from code:
- (a) `mogit/bot.py` used tweepy `API.media_upload`: **v1.1** `upload.twitter.com/1.1/media/upload.json`, OAuth 1.0a user context (`X_API_KEY/SECRET`, `X_ACCESS_TOKEN/SECRET`).
- (b) `bot/live/x.py` uses **v2** `api.x.com/2/media/upload` (INIT/APPEND/FINALIZE), OAuth 2.0 user token `JMI_X_USER_TOKEN`, which needs the `media.write` scope.

Candidates, all UNVERIFIED:
1. @justmogit_bot never authorized app 33606516 (the Phase-0 tap is still pending), so there is no user-context token and the upload runs app-only or under another account.
2. The OAuth 2.0 token lacks `media.write`.
3. The app is Read-only, or its OAuth 1.0a access token was minted before Read+Write was set (it must be regenerated after the switch).
4. v1.1 media upload is unavailable for this app's access level.

Empty credits give 402, not 403. Every fix is an owner action, so no new upload code was written. `post_ready` reuses the existing v2 `upload_media`.

## Blocked
- Read-only preview E2E on a real mention: this session cannot reach api.x.com, pbs.twimg.com or the Vercel site (VERIFIED, proxy), and has no X or Gemini creds. Asked on the board where the runtime env lives. Also `/api/mog` is only on the pfp-changer preview, which sits behind Vercel auth, and `GEMINI_API_KEY` is not yet in the Vercel env (owner).
- Command, once the env exists: `JMI_MOG_API_URL=<https…/api/mog> [JMI_VERCEL_BYPASS=…] python3 -m bot.run mogme-preview`, then `mogme-list`. Posts nothing.

## Owner list
- X portal: confirm the app is **Read+Write**. Regenerate the OAuth 1.0a access token if it was minted while Read-only.
- Phase-0 tap: @justmogit_bot authorizes app 33606516 with `media.write` (OAuth 2.0 user token).
- Paste the **exact 403 error body**, plus the endpoint and auth type, onto the board (no tokens).
- Set `GEMINI_API_KEY` in the justmogit-site Vercel env. Choose how the bot reaches `/api/mog`: a production URL, or a protection-bypass secret (`JMI_VERCEL_BYPASS`).
- **"PIT VIPER" logo on the frames: NOT implemented.** It is a third-party trademark, and `bot/mogme.py` deliberately used original art for this reason. Adding it means changing the prompt in pfp-changer `api/mog.js` (the single source). Owner call.
- Site risk: once `/api/mog` is public on production, it is an unauthenticated Gemini proxy with no rate limit (cost exposure). Decide auth or rate limiting before merging pfp-changer.
- Approve or reject each queued mog; posting also needs the kill switch OFF (owner only).

## Next (start here)
1. Owner: the 403 body plus the portal and tap checks above.
2. Codex: review PR #5, which now includes `bd989d6` (mog-me flow; not a money path).
