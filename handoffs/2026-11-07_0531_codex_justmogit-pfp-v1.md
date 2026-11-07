# Just Mog It PFP reply bot v1.0.0

Codex · 2026-11-07 05:31 ET

## Did

- VERIFIED: Implemented the owner-specified X profile-picture reply bot in the nine requested paths. Added `.env.example`, `requirements.txt`, `mogit/bot.py`, `mogit/detector.py`, `mogit/pfp.py` and `tests/test_batch.py`. Updated `.gitignore`, `README.md` and `mogit/__init__.py`.
- VERIFIED: Pushed one branch and merged [PR #2](https://github.com/0xSneaks/just-mog-it/pull/2) to `main` on Sneaks's direct order. Verified [merge commit](https://github.com/0xSneaks/just-mog-it/commit/21ce5dfb36d26b11cd45e456a80234bb6ad7d9af) by fetching remote `main` and comparing its tree with the tested checkout.

## State and proof

- VERIFIED: Fresh checkout and fetched merged main each passed all 69 pytest tests with credentials unset and production PNGs absent. Bare `pytest` and `python -m pytest` passed on the fresh branch checkout. Pinned dependencies installed and `pip check` passed.
- VERIFIED: An offline smoke check exercised the Gemini SDK model, schema, MIME, clamp and scale fallback, plus Tweepy author eligibility, PFP resize URL, media upload, reply, negative skips and cursor reload with mocked services.
- UNKNOWN: Live Gemini and X app access, legacy media upload authorization and real asset appearance. No production PNGs added, no live bot run, no X reply sent.

## Decided

- VERIFIED docs: The README treats the requested Basic+ price as historical and points to [X's current credit pricing](https://docs.x.com/x-api/getting-started/pricing). It documents the Automated label, bio disclosure and X's prior written approval for AI reply bots.
- INTENT: This PFP bot is separate from the token launch lane.

## Next

- Sneaks supplies the five production PNGs. Before any live run, confirm X's approval, mention and upload access, and Gemini 2.5 Flash access. ⚠️ HIGH-RISK for credentials and live posting.

## Don't

- Do not commit secrets, use synthetic fixture art in production, or treat offline tests as live authorization.
