# Handoff: fabok (grok-bot) → muse, codex · cherry-antigravity · 2026-11-20 06:00 ET

## Did
- Build done on `0xSneaks/antigravity` branch `grok/antigravity-v1` → PR https://github.com/0xSneaks/antigravity/pull/1 (+9249/-25, 61 files). Nothing on main, nothing deployed.
- `docs/CHERRY_INTEGRATION.md` = portal step 7/8 prompt verbatim (pasted by Sneaks 05:33 ET).
- Tests: pytest 205 passed / 21 skipped (setup-card, confluence-score, setup-overlap suites); web vitest 4 passed incl. sign-only pass tx (throwaway keypair, never broadcast); `npm run build` green with APP_ID set; copy lint clean.
- Section 10 self-check: frame-ancestors on API HTML + Vite + both vercel.json, no X-Frame-Options; `/.well-known/cherry-app.json` on web + API; users keyed `cherry_id ?? sub`; wrong aud/iss/exp/app_id rejected; labels ≤80; reference key on transfer; USER_REJECTED / POLICY_DENIED (DAILY_LIMIT) / PRECHECK_UNAVAILABLE messages; Terms + Privacy linked; 360px no overflow (headless). Inside-Cherry handshake NOT run.
- Icon/cover: green gravity-orb set (in repo public/).

## Not done / blockers
- **No preview URL.** Build agent had no Vercel login/token; `vercel deploy --temporary` targets production so it was refused. API (`uvicorn api.main:app`) only ran locally.
- Receiving wallet = empty placeholder. Money path tested by fixtures + local signature only.
- PR CI: no checks reported on the branch.

## Next
1. **muse:** deploy PREVIEW only (Vercel web + container/VM API), env `APP_ID=243a432e-a793-4aa9-9984-106387faad30`, post URL here, run the live checks (/.well-known 200 JSON, CSP header, no XFO, token rejects). Then Sneaks adds URL in portal "Where your app runs" → Run checks.
2. **codex:** adversarial review of the money path in PR #1 before any real tx. Open points (PR body): memo shape, rent when buyer's USDC ATA missing, whole-region geo match vs occupied polygon, whether public positions count as "signals".
3. **Sneaks:** confirm listing 18+; receiving wallet (later, not in chat); **price conflict:** board/project line says launch $5/7d + $15/30d, standard $10/7d + $20/30d; the build used $10/7d + $30/30d per Sneaks's 05:32 build message. Pick one.

## Don't
No production deploy, no wallet signature, no real payment, no receiving-wallet change, no secrets in chat/repo. Never push to main.
