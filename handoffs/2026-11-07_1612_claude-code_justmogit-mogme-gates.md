# Handoff — justmogit-bot — claude-code — 2026-11-07 16:12 ET

**Session goal:** "mog me" add-ons: eligibility gate, follow gate, stub/gemini editor switch. Zero real Gemini calls.
**Status:** PARTIAL. Code and tests are DONE. The live preview E2E is still BLOCKED (no X access from this session).
**Repo / branch:** 0xSneaks/just-mog-it @ `claude/admiring-mayer-3n4uj8` · **Last commit:** `48a7e17` (rides PR #5, Codex-gated, NOT merged)

## Did (VERIFIED)
- Eligibility, fail-closed with a silent skip (no reply, no image, no edit; reason logged to ledger `mogme_ineligible`): `followers_count` ≥ 60 AND `verified_type` ∈ {blue, business, government}. Both are read from the user fields that came with THIS mention read and are never stored. A missing or non-int/non-str field means skip. Tests: 59+check → skip · 60+check → pass · 60+no check → skip · missing → skip, plus business, government and the bool/str edge cases.
- Follow gate: the author must follow @justmogit_bot (`connection_status` contains `followed_by`, relative to the bot's user token). A failed lookup means not following. It runs after the free gates, so ineligible authors cost nothing. Tests: follows → pass · no follow → skip · lookup error → skip · empty or None → skip.
- `edit_pfp(image_bytes) -> image_bytes`: `StubEditor` (fixed PNG, no network, items marked `editor: stub` and REJECTED at post time, never postable) | `GeminiEditor` (same generateContent request as justmogit-site `api/mog.js`, verbatim `vipers` prompt, no retry; a safety block or no image means EditRefused). `IMAGE_EDITOR=stub|gemini` with default stub. gemini without `GEMINI_API_KEY` refuses boot, and so does an unknown value; there is no silent fallback (tests). The `/api/mog` caller is removed.
- Note: the verbatim prompt copy contradicts the earlier "no second copy" rule. The newer instruction put the key in the bot env, so the copy is labelled with its source (pfp-changer @ cc65e34) and must be kept in sync.
- Full suite **328 passed** (clean venv too). Gates were mutation-checked.

## Live calls made this pass
- **X: 0. Gemini: 0.** This session cannot reach api.x.com (proxy) and holds no X or Gemini keys. The endpoints the bot's X access actually allows are therefore UNVERIFIED.

## Follow-check choice (prices UNVERIFIED: BUILD-SPEC-v2 user read $0.010)
- A. `connection_status` in the mentions call's author expansion: **$0 extra** per check, if X returns it there for a user-context token and doesn't bill the expansion users separately. UNVERIFIED.
- B. `GET /2/users/:id?user.fields=connection_status`: **$0.010 per check** (one user read).
- C. Cached bot follower list (`GET /2/users/:bot/followers`, up to 1,000 users per page): about $0.010 × N followers per refresh. At N = 100 and a daily refresh that is ≈ $1.00/day, more than the whole $0.30 budget. It only beats B when checks per refresh exceed N, and a stale cache misjudges people who unfollow.
- **Picked: A, falling back to B.** The cost per request is $0 via the expansion, else $0.010, booked into the shared daily budget (`x_read_spend`).
- Per-mog worst case stays at $0.069 and the cap stays at 4/day.

## Monday: switch to Gemini (exact steps)
1. Put `GEMINI_API_KEY` in the bot's runtime env (name only, never in the repo).
2. Set `IMAGE_EDITOR=gemini`. Optional: `GEMINI_IMAGE_MODEL` (default `gemini-2.5-flash-image`).
3. Run `python3 -m bot.run mogme-preview` once (1 mention read), then `python3 -m bot.run mogme-list`, and open the PNG. Nothing posts: approval and kill OFF are both still required.
4. Check the real Gemini image price, and adjust `mog_me.costs_usd.gemini_image` in config/policy.yaml if needed.

## Still blocked / owner
- Preview E2E with the stub needs X access: `JMI_X_USER_TOKEN` and `JMI_X_BOT_USER_ID` in the runtime env, then `python3 -m bot.run mogme-preview` (1 mention read). The runtime-env location was asked on the board and is unanswered.
- The 403 diagnosis is unchanged (see the [mog-me handoff](2026-11-07_1608_claude-code_justmogit-mogme.md) for the four candidates).
