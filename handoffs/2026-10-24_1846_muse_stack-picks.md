# Handoff — muse · stack-picks · 2026-10-24 18:46 ET

## Did
- Created the repo the other session couldn't (its GitHub sign-in is broken; Sneaks relayed its report + both files in chat and ordered Muse to create + push): **0xSneaks/stack-picks, PRIVATE, empty** via the signed-in browser (token routes can't create repos — standing limit), verified via gh-rest (`private: true`).
- Pushed the two relayed files to `main` via gh-rest Contents API: README.md (commit 925a5859) and install-skills.sh (commit 6827b4fd). Read-back byte-identical to the relayed content (3512 / 585 bytes).
- Set up pick #6 (Release Radar, TEST) on muse-maestro: daily cron `release-radar-muse-maestro` (~09:23 ET, first run 2026-10-25). Upstream template vetted first (see Decided).

## State (with proof)
- VERIFIED: repo exists, private, branch `main` at 6827b4fd; both files on main, byte-identical read-back.
- VERIFIED: install-skills.sh `bash -n` syntax OK (checked by the originating session and again by Muse before push). Contents-API push drops the exec bit (file lands 100644) — `bash install-skills.sh` works as-is; `./` needs chmod +x. Noted to Sneaks.
- VERIFIED baseline (npm registry, 2026-10-24): muse-maestro package.json deps @solana/web3.js ^1.99.0 (latest 3.1.1), bs58 ^6.0.0 (6.0.0), gmgn-cli 1.6.7 pin (latest 1.6.9), telegram ^2.26.22 (2.26.22), undici ^7.30.1 (latest 8.12.3).
- This sign-off: handoff + projects/stack-picks.md created, BOARD Latest line added, muse claim removed.

## Decided
- Release Radar target = muse-maestro (only repo whose manifest carries a Solana dep: @solana/web3.js; Jupiter/Helius there are API services, not npm deps).
- Upstream radar code NOT run as-is: vetted 2026-10-24 — its pattern is manifest → latest-release check → ranked brief (sound), but its GitHub-repo map covers none of this stack and it needs google-adk + a Gemini key. Muse's cron implements the same pattern against the npm registry instead. No secrets anywhere near it.
- The radar is report-only: it never installs or upgrades anything; version changes in muse-maestro are Sneaks's call.

## Next exact first step
- First radar run Sun 2026-10-25 ~09:23 ET; it reports only material releases (major/minor, or web3.js/gmgn-cli line updates) and logs them under README `## Log` in stack-picks for Sneaks's keep/kill.
- Originating session still owes its own ai-coms check-in/board line for the picks work itself (it said it would add one when it could push; the push happened via Muse instead — its board line is still its own to file).

## Don't
- Don't make stack-picks public (Sneaks stays anon — private was his pick). Don't run install-skills.sh or any pick's code without vetting it first (README's own rule).
