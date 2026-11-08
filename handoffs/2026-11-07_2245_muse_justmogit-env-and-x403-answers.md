# Muse → Claude Code: JustMogIt runtime env + X media 403 — ANSWERS

**Date:** 2026-11-07 22:45 ET · **From:** muse · **To:** claude-code (cc sneaks, claude)
**Answers:** the OPEN board request "[claude-code → muse, sneaks] justmogit · WHERE does the bot's runtime env live… and the exact X media-upload 403 error BODY"
**Evidence base:** read-only inspection of the just-mog-it checkout at `1c6942a` (files cited by path + line). Labels per RULE.md §7. No values recorded anywhere in this note — names only.

## Did

Answered both halves of the request from the code itself, and recorded two rulings from the 2026-11-07 22:41 ET voice call (below).

## Answer 1 — runtime env location (VERIFIED from code)

**There is no host/service yet.** No deployment config exists in the repo — no fly/railway/render/vercel/docker/systemd files (VERIFIED: full top-level + config scan of the `1c6942a` checkout, none found). The bot runs as a **local process**, `python3 -m bot.run …`, reading **plain process environment variables** (`os.environ` / `env()`). Wherever that process is launched, its environment is the env store; nothing is deployed to a hosting service today.

Env var NAMES (VERIFIED):

- `bot/run.py` header (lines 20–24, "Env (names only, values never in the repo)"): `JMI_DB`, `JMI_BOT_WALLET`, `JMI_FEE_ADDRESS`, `JMI_X_BOT_USER_ID`, `JMI_X_USER_TOKEN`, `JMI_RPC_URLS`, `JMI_DAS_URL`, `JMI_PINATA_JWT`, `JMI_GEMINI_KEY`, `JMI_GEMINI_MODEL`, `JMI_VAULT_URL`, `JMI_VAULT_TOKEN`, `IMAGE_EDITOR`, `GEMINI_API_KEY` (gemini only), `JMI_MOGME_QUEUE`, `JMI_MOGME_REFS`.
- Money core `mogit/bot.py` (lines 27–41) + `.env.example` — the OAuth1 set: `X_API_KEY`, `X_API_SECRET`, `X_ACCESS_TOKEN`, `X_ACCESS_SECRET`, `X_BEARER_TOKEN`, `GEMINI_API_KEY`.
- `bot/live/x.py` (lines 1–3, 16–19): the live X adapter uses `JMI_X_USER_TOKEN` as an **OAuth 2.0 Bearer user token** issued to @justmogit_bot with scopes `tweet.read tweet.write users.read media.write offline.access`; media goes to `POST api.x.com/2/media/upload` INIT/APPEND/FINALIZE.

## Answer 2 — X media-upload 403 (VERIFIED from project records)

- The 403 on record came from the **legacy @heySneaks connector** (`custom.legacy-x-api`, `bin/x_post.py`) — the @heySneaks app, **not** the @justmogit_bot app.
- Endpoint: **`POST /2/media/upload`** (chunked INIT → APPEND → FINALIZE, then `POST /2/tweets`), **OAuth1 user context**.
- Recorded in `~/workspace/narrative-ops/justmogit-bot/PLAN.md:173` and `EXECUTION-PLAN.md:17`: "media upload returned 403 on the legacy @heySneaks connector — the Justmogit app's media rights must be verified before this ships."
- **The exact error BODY was never captured** in any project record — NOT CAPTURED, stated plainly; no body is invented here. The records carry the status code, connector, and endpoint only.
- The @justmogit_bot app's `media.write` scope is **declared** in `bot/live/x.py` but **untested live** (UNKNOWN until a real upload attempt is made with the bot's own token).

## Rulings recorded from the 2026-11-07 22:41 ET voice call

1. **Claude (VERIFIED, call):** if the PR #5 merge triggers a production deploy, **HOLD the deploy for Sneaks's yes** — merge approval is not deploy approval. ⚠️ HIGH-RISK gate stands.
2. **Still owed by muse (OPEN, untouched by this sign-off):** reconcile `launch-001-pack.md` + the Tuesday Execution Space — #001 fired Sat 2026-11-07 on mogz, manual, not the bot; mogz OUT as venue; **no Tue 11-10 launch**; backfill `ts` on real ledger entries.

## State

- This request: DONE (both answers above; the 403 body is answered as NOT CAPTURED, which is the true state of the record).
- PR #5: unchanged by this note — Codex independent re-review @ `78fb7973` returned CHANGES (mog-me negative spend gate; see codex 22:40 + claude-code 22:45 handoffs). Merge held; deploy additionally held per ruling 1.

## Next

- claude-code: mog-me 403 diagnosis can proceed on endpoint + auth type above; a live @justmogit_bot upload attempt is the only way to capture a real error body from the bot app.
- muse: reconcile item (ruling 2) remains mine, OPEN.

## Don't

- Don't treat the legacy @heySneaks 403 as evidence about the @justmogit_bot app's media rights.
- Don't deploy on merge without Sneaks's yes (ruling 1).
