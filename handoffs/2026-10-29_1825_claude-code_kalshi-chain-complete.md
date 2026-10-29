# kalshi chain complete — claude-code → muse — 2026-10-29 18:25 ET

**Session goal:** Sneaks's order: keygen → G3c pin → merge coms-pwa PR #6 → this handoff. Supersedes my 18:00 BLOCKED handoff. Sneaks added the Vercel token as a proxy-injected network secret, and `GET /v2/user` returned 200.
**Status:** DONE. No live orders were placed.

## State (evidence)
| Item | State |
|---|---|
| Env var | `KALSHI_APPROVER_PRIVATE_KEY_B64` on coms-pwa (`prj_8TUOVuSw2TwViifvlCTlO03aX7Gj`): sensitive, production + preview. Env-list GET, names only. — VERIFIED |
| Pubkey | `1bJZbbAPJZfDYLFXcYYiUwQ9GqJx1UY9UN/ealrEJig=`. Self-test is in [the pubkey handoff](2026-10-29_1818_claude-code_kalshi-approval-pubkey.md). — VERIFIED |
| G3c pin | 0xSneaks/kalshi-trader @ `claude/kalshi-chain-completion-ftfjg9`, commit **`46dc238`**. `python3 -m pytest` gives 108/108 (93 old + 15 new). — VERIFIED |
| PR #6 | Merged into coms-pwa main as `f54a29a`. CI `check` was green on head f20bf83; `npm ci && npm run check` gave 47/47 locally. — VERIFIED |
| Deploy | Vercel production `dpl_EoScxrqrQ4QCBcaoEprzyTGy7GjG` for f54a29a: **READY** (Vercel API). — VERIFIED |
| Live route smoke test | Not run: this container's proxy refuses `coms-pwa.vercel.app`. — UNKNOWN |

## G3c change (46dc238)
- `config.APPROVAL_PUBKEY_B64` is pinned. It is the `TraderConfig` default and the only source for the key.
- `load_config` raises `ConfigError` when:
  - the user config (`~/.config/kalshi/trader-config.json`) sets `live_enabled` or `approval_pubkey_b64`, with any value;
  - the repo `config.json` sets `approval_pubkey_b64`.
- `live_enabled` is now read only from the repo `config.json`. **Note: main's config.json has `live_enabled: true` (Sneaks, e742da8).**
- New tests in `tests/test_g3c_pin.py`:
  - the pin decodes, and it verifies the published self-test signature;
  - user-config refusals (True, False, and even restating the pinned key), repo-config pubkey refusal, non-object refusal;
  - live_enabled read from the repo config; caps still lowerable;
  - **proof-v3**: a self-minted user-config key plus live_enabled → ConfigError at load. A self-signed drop is refused at the approval gate by the pinned key.
- Running the unmodified `review_proofs_2026-10-29_v3.py` now ends in ConfigError at `load_config`, so the attack can't load. — VERIFIED
- Docs updated: README.md, gates.py docstring.
- **The pin is on the branch, not main yet.** It goes to main after your re-check passes. A PR has not been opened (ask Sneaks or claude-code).

## Next (muse)
1. Verify the self-test signature against the pubkey (your committed step).
2. Re-check G3c at `46dc238` (re-run proof v3; review `kalshi_trader/config.py` and `tests/test_g3c_pin.py`). Pass → it gets merged to kalshi-trader main. Your VM must run that commit before any prod use.
3. Then bring Sneaks the first order **preview** (no execution without his Face ID approval).

## Don't
- Don't copy the pubkey into `trader-config.json`. That is now a ConfigError by design.

## ⚠️ High-risk
- Prod approval signing key + funds path. Needs muse's independent re-check of 46dc238. The live approval route on coms-pwa.vercel.app has not been exercised end to end. The first real approval is the first live test.
