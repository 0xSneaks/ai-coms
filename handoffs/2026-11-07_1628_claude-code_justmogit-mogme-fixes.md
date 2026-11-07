# Handoff — justmogit-bot + justmogit-site — claude-code — 2026-11-07 16:28 ET

**Session goal:** mog-me fixes per Sneaks's 16:30 order (relayed by session_018M…, board f73f006; spec in [budget](2026-11-07_1615_claude-code_justmogit-mogme-budget.md) and [test review](2026-11-07_1618_claude-code_justmogit-mogme-test-review.md)). Sneaks confirmed "build all 7" directly in this session.
**Status:** DONE for code and tests. Live Gemini/X is untested by design (stub default, zero calls).
**Repos / commits:** just-mog-it `claude/admiring-mayer-3n4uj8` @ `efaab7e` (rides PR #5, NOT merged) · justmogit-site `pfp-changer` @ `771a800` (pushed, no force, NOT merged)

## Did (VERIFIED)
1. **Budget:** `mog_me.daily_budget_usd: "5.00"`, mog-me's own $/day. Every Gemini try, follow lookup and mog reply is booked to `mogme_spend:<day>`; room is checked before each try. Launch replies keep `reply_budget_usd_per_day` $0.30 and are never touched (test). `autopost: false` and the kill switch are unchanged.
2. **Prompt:** `api/mog.js` vipers on pfp-changer, and the bot's verbatim copy. Wraparound shield sport shades in the SAME art style as the input, sized to the head, centered on the eyes, following angle/tilt, arms behind ears/hair, colours from the pfp palette. "No text, letters, logos or brand names" on frames or lenses. The brand name was also removed from the glitch/cat prompts. The site page copy (`pfp.html` "Pit Vipers" style label) is unchanged.
3. **Style refs:** `GeminiEditor` sends up to 3 reference images after the input, with a "match the shades, never copy faces" line. Source: folder `$JMI_MOGME_REFS` (default `mogme_refs`). `python3 -m bot.run mogme-ref ID` copies an APPROVED gemini mog there. Stub images can never become refs.
4. **Upscale:** avatars under 512 px are upscaled (LANCZOS) so the short side is 1024, before the edit.
5. **No change:** less than `min_changed_fraction` (6%, UNVERIFIED, tune on real output) of pixels visibly changed counts as a fail. Max 2 retries, then a polite text draft; every try is billed. A flat two-patch overlay measures under 6% (test). Safety refusals are still never retried.
6. **Reasons:** approve needs a short reason (1–80 chars). Reject needs one of: wrong size / off the eyes / wrong angle / style mismatch / flat overlay / other[: note]. Saved as `decision_reason`.
7. **Tag:** none, or one line from `mog_me.tags` ("GET MOGGED", "MOGGED BY BRAINROT LABS") at random, drawn in the bottom ~8% corner. URLs, prices, tickers, brands and lowercase are refused at boot.
- Tests: **364 passed** (99 mog-me), clean venv too. The 10 new checks were each mutation-tested: disabling any one fails a test.
- Live calls this pass: **X 0, Gemini 0.**

## Cost math (prices UNVERIFIED: Gemini $0.039/image, X reads per BUILD-SPEC-v2)
- Per mog on the first try: $0.039 + $0.015 reply + $0.005 mention read + $0.010 follow lookup = $0.069, so $5.00 buys **72/day**.
- Worst case (3 tries): $0.147, which is **34/day**.
- The review's measured hit rate was ~$0.13 per good mog, so expect ~38/day.

## Open / owner
- **Style ref files:** Sneaks's two passes (glitch anime girl, Pepe) are in chat only. Drop them into `mogme_refs/` on the bot host, or approve them in the queue and run `mogme-ref ID`.
- The no-change threshold (6%) needs tuning on the first real Gemini outputs Monday.
- Keep the two prompt copies in sync: site `api/mog.js` vipers ↔ bot `VIPERS_PROMPT`.
- PR #5 still needs Codex APPROVED, and pfp-changer still needs a merge decision (production deploy).

## Update: style refs landed (after ai-coms 21772f2)
- VERIFIED: sha256 of both files matches the relay (0ef9baef… pass1-glitch-anime, 7a6cb15c… pass2-pepe); both 1024×1024 JPEG and viewed. Both carry "PIT VIPER" lettering, tag lines and a BRAINROT LABS medallion.
- Bot: `mogme_refs/` (the default `JMI_MOGME_REFS`) @ `5c67afb`, 365 tests passing.
- Site: `api/_mogrefs/` @ `2f2d451` (pfp-changer). Only the vipers style sends them. A mocked-fetch run checked the request: prompt + input + refs line + 2 JPEGs; glitch/cat unchanged. Missing files mean the edit runs without refs. Whether Vercel bundles `api/_mogrefs` is UNVERIFIED until a preview deploy.
- `REFS_PROMPT` (verbatim in both) copies only the shades' shape, fit and art-style integration. It never copies text, letters, logos, brand names, faces, clothing, jewellery, captions or backgrounds.
- If lettering still leaks on Monday's first Gemini runs, ask Sneaks for text-free versions of the refs.
