# Handoff — justmogit (bot + site) — claude-code — 2026-11-07 16:54 ET

**Status:** HANDING OFF (usage limit). Everything below is pushed. Nothing is merged except PR #4 (earlier). Nothing was posted. Zero real Gemini or X calls today.

## State (VERIFIED 16:54 ET)
| Thing | Where | State |
|---|---|---|
| Bot main | 0xSneaks/just-mog-it `main` @ `b5e18a5` | 206 tests |
| Bot work | branch `claude/admiring-mayer-3n4uj8` @ `485fa70` = [PR #5](https://github.com/0xSneaks/just-mog-it/pull/5) | **420 tests passing**, clean. Codex-gated, NOT merged. The PR description is stale (it says 266) |
| Site main (live) | 0xSneaks/justmogit-site `main` @ `721aca8` | unchanged |
| Site PR #1 | `claude/admiring-mayer-3n4uj8` @ `b72f7be` | venue → mogz. **Owner: DO NOT MERGE** (mogz is out) |
| Site PR #2 | `claude/mog-me-section` @ `606f42c` | **MERGED on owner's "yes merge"** → main `ed7a77d`. **LIVE**: justmogit.vercel.app serves the MOG ME section (VERIFIED by external fetch) |
| Site pfp-changer | `pfp-changer` @ `d410d56` | /api/mog prompt + style refs. Not merged; pfp.html is a showcase only |

## Next-agent block (paste as-is)
```
JUSTMOGIT — next agent (2026-11-07 evening). Repos: 0xSneaks/just-mog-it, 0xSneaks/justmogit-site, 0xSneaks/ai-coms.
First: read ai-coms BOARD.md + projects/justmogit-bot.md + handoffs/2026-11-07_1654_claude-code_justmogit-signoff.md. Add your claim. Sign off with a handoff and run tools/coms_check.py.

NEVER: post to X, flip the kill switch, enable autopost, send any transaction or sign, buy credits, call Gemini for real (not funded until Monday), print or commit secrets, force-push, rewrite history, delete branches, raise any cap, merge any justmogit-site PR (merging deploys to production; owner only), put buys/sells/balances/positions in any file.

TASK 1 (Codex only — you are the named reviewer): review just-mog-it PR #5 (branch claude/admiring-mayer-3n4uj8 @ 485fa70).
- Fresh checkout, then: pip install -r requirements.txt && python3 -m pytest -q. Expect 420 passed. Report the exact count.
- Money path: read docs/REVIEW-NOTES.md and check every listed line in mogit/gates.py, mogit/flow.py and mogit/ledger.py. The gates are: kill switch (persisted, missing = ON, checked before build and before sign), 3/day, 0.025 SOL cap on quote and on simulated spend, SOL-only quote, first buy exactly 0.
- Also skim the "mog me" flow (bot/mogme_queue.py, bot/mogme_pose.py). It is not a money path, but nothing may post unless the item is approved by sneaks or muse AND the kill switch is OFF.
- Post APPROVED @ <sha> or CHANGES (with file:line items) on the ai-coms board under the open [claude-code → codex] PR #5 request.
- If APPROVED and the suite is green: merge PR #5 into main with a MERGE COMMIT. If CHANGES: do not fix them yourself; list them for claude-code.

TASK 2 (any agent, text only): review the shades placement instructions in bot/mogme_pose.py (placement_prompt, POSE_PROMPT, CHECK_PROMPT) and VIPERS_PROMPT in bot/mogme_queue.py. Owner priority: the shades must match the picture and sit right for straight-on, three-quarter and side-profile heads. Suggest concrete wording improvements in a handoff. Do not change code that holds money.

TASK 3 (Muse): the open request on the board — draft the pinned "follow + tag 'mog me'" post and the bot's voice notes (friendly, fun, story only, no price talk). Draft only; nothing is posted until the owner flips go-live.

Label every claim VERIFIED / INFERENCE / UNVERIFIED.
```

## Owner list (Monday)
1. Buy the justmog.it domain.
2. Gemini: put `GEMINI_API_KEY` in the bot's runtime env, set `IMAGE_EDITOR=gemini`, run `python3 -m bot.run mogme-preview` once, then `mogme-list`. Nothing posts.
3. The X media-upload 403: paste the exact error body + endpoint + auth type. Check the app is Read+Write, and do the @justmogit_bot app tap with media.write.
4. ~~Site PR #2~~ merged and live. Leave site PR #1 unmerged, or close it.
5. Answer the open question: where the bot's runtime env lives (names only).

## Decided today (owner)
- Strategy: mog me → grow followers → coin later. Venue: pump.fun or Float, undecided; mogz is out.
- Mog-me: eligibility is 60+ followers + a checkmark + following the bot, otherwise a silent skip. Placement matched to the head pose comes first. NFT-style traits (PIT VIPER frame lettering / GET MOGGED caption / plain), colours from the picture. Budget is $5/day (ceiling $10).
- Muse is the bot's friendly voice; no humans. Approvers are sneaks and muse. The owner flips autopost after testing.
