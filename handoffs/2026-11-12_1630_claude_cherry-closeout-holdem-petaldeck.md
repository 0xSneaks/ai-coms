# ORDER — CHERRY CLOSE-OUT: POKER + PETALDECK — claude → all — 2026-11-12 16:30 ET

**Owner order (Sneaks, chat 16:18 ET):** close out the two Cherry projects: the poker app (cherry-holdem) and PetalDeck (cherry-launch-room).
**Lead / orchestrator:** muse. **Deciders:** claude-code (build), Sneaks (anything ⚠️).
Check in first (BOARD + project file + claims). Never edit claimed files. Sign off with a handoff after every step.

---

## 1. POKER — repo 0xSneaks/cherry-holdem · project file `projects/cherry-holdem.md`

**DONE =** published in the Cherry portal under a new name, Production live, HQ bar met, free credits only (SOL_ENABLED=false).

**State (VERIFIED from board):** single-player Sit & Go built (49/49 tests), Preview live, UI kit PASS (`778d58f`), SB/BB badges (`88104e4`), Sudan + occupied UA block (`ea8cc21`). Sneaks rated lobby + table LOW. Blocked on: new name, portal App ID / Project ID / portal prompt.

| # | Owner | Task | Done when |
|---|---|---|---|
| P1 | **Sneaks** | Pick the new name. No "Cherry", nothing that looks like a Cherry product. | Name posted on board |
| P2 | claude-code | Post the lobby/table gap list (from Sneaks's LOW rating) to the project file. Wire the full UI kit (`778d58f`) in: table, chips, lobby, panels, rings, icons, avatars. HQ RULE: Grok sheet detail, no flat CSS. | 360 px screenshots (lobby, table, showdown) on board |
| P3 | grok-bot | Finish the number cards: hearts → claude PASS → diamonds → clubs → spades. Pips only, no text. | `grok-bot ✓ <suit> <hash>` per suit |
| P4 | claude-code | Swap in the new name everywhere (UI, metadata, `cherry-app.json`, listing copy). Keep in-app CU/IR/KP + SD/UA blocks, Cherry Terms/Privacy links, 18+. | grep shows no old name; tests green |
| P5 | **Sneaks** + Claude chat (Sonnet) | Portal walk with the new name (`/cherry-messenger-creator`, Age 18+). Copy the portal prompt + App ID + Project ID. | All 3 pasted to board / muse |
| P6 | muse | Save the portal prompt to `docs/CHERRY_INTEGRATION.md` exactly as written. Fill IDs in `shared/cherry-listing.ts`. Set env `CHERRY_APP_ID` (Preview + Production). Push → Preview. | health 200, `/.well-known/cherry-app.json` correct, legal links 200 |
| P7 | muse | Test inside Cherry on the phone: handshake ≤ 5 s, no wallet prompt on load, full game vs bots. | Screen recording / screenshots on board |
| P8 | **Sneaks** | ✅ yes for Production. | "PROD YES" on board |
| P9 | muse | Promote to Production. Portal app URL = Production. Run portal checks. Publish. | Listing live; evidence on board |

**Don't:** add SOL, buy-ins, purchases, or cash-out. Paid chip tiers stay parked (⚠️ legal + Sneaks).

---

## 2. PETALDECK — repo 0xSneaks/cherry-launch-room · project file `projects/cherry-launch-room.md`

**DONE =** Cherry grants partner tier, a real launch signs in Cherry, Production live with the 95/5 fee split, listing published.

**HARD BLOCKER (VERIFIED, board):** Cherry policy makes token launches / launchpads **Partner apps only**. Cherry Wallet refused every launch tx with `DANGEROUS_INSTRUCTION`. Likely cause: Pump `create_v2` runs `SetAuthority`, which is refused below partner tier (INFERENCE). App 52e41534… still shows `tier: verified`, not partner. **No agent builds toward live launches until the app shows `tier: partner`.**

| # | Owner | Task | Done when |
|---|---|---|---|
| D1 | muse | Draft the email to team@cherry.fun: set partner tier on app `52e41534-4c7b-4237-9a16-ec8ea7a3c9dc` + allow Pump `create_v2` authority revoke (SetAuthority / metadata authority → null). Post the draft. | Draft on board |
| D2 | **Sneaks** | Send it from his Cherry dev account (his identity). | "SENT" + date on board |
| D3 | muse | Keep the listing PRIVATE. Nobody taps A–H again (Cherry can pause apps that keep sending refused tx). | Confirmed private |
| D4 | codex or claude-code | Finish everything that doesn't need signing: banner fix (keep original art, move/resize, round bold font), room feed, share card, `ALLOWED_ORIGINS` lock on `/api/metadata` + `/api/rpc`, hide Vercel toolbar on Preview. | Preview screenshots + origin test on board |
| D5 | claude-code | ⚠️ Money-path review: fee wallet pinned as the raw address constant + test, `updateFeeShares` 9500/500 set once, reference key on our own ix, tier-based buy cap from the live `tier` claim. Then an **independent Opus cross-check** (K-11 rule). | Both PASS on board |
| D6 | muse | Daily: check the launch token `tier`. When it says `partner`, post it. | "TIER PARTNER" on board |
| D7 | **Sneaks** | Taps variant A once (after D6 only). | Result on board |
| D8 | claude-code | If A passes: real launch flow live mode on Preview. One real test launch only on Sneaks's ✅ (small buy). | Confirmed tx + mint on Solscan |
| D9 | **Sneaks** → muse | ✅ PROD YES → muse promotes, publishes listing. | Listing live |

**Fallback, Sneaks's call:** if Cherry says no or hasn't answered in 7 days, choose: (a) keep waiting, (b) pivot PetalDeck to a no-signing app (e.g. a room feed/tracker of Pump launches), or (c) park it.

---

## Sneaks's batch (only these need you)
1. P1: new poker name.
2. P5: portal walk (Claude chat guides you).
3. D2: send the Cherry partner email.
4. P8 / D7 / D9: yes/no taps when the board asks.

## Rules
- VERIFIED / INTENT / INFERENCE / UNKNOWN on every claim. No "done" without evidence.
- No secrets on the board. Env var NAMES only.
- ⚠️ Wallet, signing, fee, and Production steps need Sneaks's yes + claude-code review + independent cross-check.
- Muse posts a one-screen status to the board after each step closes.
