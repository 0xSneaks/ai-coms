# Handoff — coms-pwa (locked Send + faster wake-ups) — claude → claude-code, muse — 2026-10-25 00:45 ET

**Session goal:** Sneaks wants the COMS PWA buttons to actually start the crew, not just copy a prompt. "Encrypted for both": a locked Send button plus faster wake-ups.
**Status:** HANDING OFF (spec + requests). No code written by claude.
**Repo:** 0xSneaks/coms-pwa (source of truth since 2026-10-24) · live https://coms-pwa.vercel.app

## Decided (Sneaks, 2026-10-25 00:40 ET, in claude chat)
- **Locked send**, not ciphertext-on-board: every agent (incl. ChatGPT, Grok, Claude app) must still be able to read orders. Lock = only Sneaks can send; GitHub key stored encrypted on Vercel; HTTPS in transit.
- **Unlock = Face ID passkey (WebAuthn)**, not a passphrase.
- **Wake speed:** Muse polls for new orders every 10 min and fans out; Claude Code check-in goes from 4 h to hourly (claude changed the scheduled task: see State).
- **Builder: claude-code** (decider). Security path → implementation → adversarial review → independent verification. No overflow/cheap models on this path.

## State (evidence)
- VERIFIED: app is a public static PWA; commands are copy-only (`public/app.js` copy handler; "Nothing has been sent automatically"). No API routes. CSP `connect-src 'self'` already allows a same-origin `/api`.
- VERIFIED: claude-code scheduled task "AI COMS check-in" now runs hourly (was every 4 h). Muse VM cron is every 4 h (per RULE.md table).
- VERIFIED: `tools/coms_check.py --inbox <agent>` already matches requests to `all`, so a `[sneaks → all]` line reaches every agent's inbox with no checker change.
- UNKNOWN: whether Vercel project `coms-pwa` is Git-linked to 0xSneaks/coms-pwa yet (owner step in muse's 23:55 handoff).

## Note for claude-code — build this (⚠️ HIGH-RISK: auth + credential + production)
1. **Claim** in BOARD.md, work on a branch + PR in 0xSneaks/coms-pwa. Don't merge or deploy to production without Sneaks's explicit yes.
2. **Passkey (WebAuthn)**, rpID `coms-pwa.vercel.app`, origin `https://coms-pwa.vercel.app`, `userVerification: required`. Use a maintained lib (e.g. `@simplewebauthn/server` + browser) pinned.
   - One-time **setup**: `/api/passkey/register` gated by a one-time `SETUP_CODE` env (Sensitive). It returns the credential public-key JSON; that goes into env `OWNER_PASSKEY` (public key, not secret). After setup, registration is refused if `OWNER_PASSKEY` is set.
   - Challenges stateless: HMAC-signed with `SESSION_SECRET` (Sensitive), 2-min expiry, single use where feasible (counter check).
3. **`POST /api/order`**: verify the passkey assertion, then use `GITHUB_TOKEN` (fine-grained, ai-coms only, Contents R/W, Sensitive env) to write the order to 0xSneaks/ai-coms so it shows in **every** agent's inbox: new file `orders/<YYYY-MM-DD>_<HHMM>.md` + a `📨 Requests` line `- [sneaks → all] <project or "general"> · <order text, one line> · OPEN · <date> → [order](orders/...)`. Handle BOARD.md sha conflicts (retry), or pick another conflict-safe design and record why. Return the commit URL.
4. **Input:** max 2,000 chars, strip control chars, block-quote the text in the order file; warn in UI not to paste secrets; never log the body. Basic rate limit. No CORS beyond same-origin.
5. **UI:** add "Send to crew" beside "Copy command" (copy stays). Face ID prompt → sent state with commit link; clear failure states. Include the typed task in the command (Sneaks noticed all three commands look identical in the visible box; confirm the task text is included and the per-button part is visible without scrolling).
6. **Keep:** existing headers/CSP, no analytics, no third-party requests. Update README privacy/"nothing auto-sends" lines to match.
7. **Tests:** passkey verify happy/forged/replayed/expired, order write mocked, input limits; `npm run check` green.
8. **Review:** request adversarial review (codex or chatgpt) on the PR before Sneaks's deploy yes.
9. **Hand Sneaks** the short owner steps: create the fine-grained token; add `GITHUB_TOKEN`, `SESSION_SECRET`, `SETUP_CODE` as Sensitive env vars in Vercel; register the passkey once on his iPhone.

## Note for muse — 10-min order poll
- Add a VM cron every 10 min: `git fetch` ai-coms; if a new `orders/*.md` exists (or a new `[sneaks → all]` line), run your full check-in and fan the order out per the Paperclip relay; mark your part in your sign-off. Cheap path only (git fetch, no LLM call when nothing new). Keep the 4 h full check-in. Update RULE.md's timer table row for muse.

## Don't
- Don't put ciphertext on the board (Sneaks chose readable orders).
- Don't put any token in the client, the repo, or a handoff. Name variables only.
- Don't use a passphrase fallback without asking Sneaks.
