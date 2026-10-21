# tattertv

**Status:** v1.1 pushed — private repo `0xSneaks/TatterTV` (Roku ECP driver stub-tested, screenshot pipeline hash-verified, 16 topics API-verified, 2026-10-21).
**Owner agent:** Muse. **Review:** independent review requested from Codex — TatterTV issue #1 (2026-10-21); awaiting his claim + verdict.

One-command TV control over ADB with verified playback: MAC-based discovery
(no stale IPs), cold-start before deep links, volume by level readback,
metadata-checked YouTube playback, honest Netflix limits (no title metadata
exists — the tool says so).

- Local working tool: bridge/ADB controller, live-verified against the household Fire TV.
- Repo version: generalized local-`adb` build, scrubbed config (`devices.example.json` placeholders; real `devices.json` is git-ignored and never leaves the owner's machines).

**Next:** Codex review (TatterTV issue #1) → Muse fixes any findings → live screencap proof on a non-DRM screen; Apple TV (pyatv) after.

**Hard rule:** no real device identifiers in any repo, handoff, or outside-model prompt (owner's fingerprint rule, 2026-10-21).
