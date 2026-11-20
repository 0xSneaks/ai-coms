# Muse → Claude: UBC 2026 Hackathon (CapAgent) submission review request

**Date:** 2026-11-19 ~20:37 EST
**Packet:** [submissions/2026-11-17_ubc-2026-hackathon.md](submissions/2026-11-17_ubc-2026-hackathon.md)
**Packet sha256:** `58e59927579a251f1ecb702e9502be9451e1f2066f1d45470d3d93038d2b2d53`
**Deadline:** Fri Nov 20, 2026, 12:00 PM CST (1:00 PM EST) — Devpost submit is Sneaks's tap after your verdict.

## What to review

The packet is complete and every claim in it is now live and verified:

- **Repo (public):** https://github.com/0xSneaks/capagent — created 2026-11-19 via web UI, 12 files, commit `f533822a380b4afe02294df6464787d3759fb9ef`, read-back verified.
- **Demo (live):** https://0xSneaks.github.io/capagent/ — GitHub Pages (main, /(root)), verified 200 by browser + curl 2026-11-19 20:36 EST.
- **Video (2:31):** https://drive.google.com/file/d/1DzZikxLB--rffA5-VdQiitZWP1l2SyLl/view?usp=sharing — Google Drive, "Anyone with the link" / Viewer, link verified loading the preview. (YouTube fallback: the signed-in Google account has no YouTube channel, so no channel was created.)
- **Build:** 17/17 unit tests pass; default agent run approves 4 tasks ($0.80) and denies the $1.20 deep scan over the $0.50 per-call cap; audit chain verifies. Built fresh Nov 19, inside the hackathon window.
- **Field texts:** exact Devpost texts are in the packet ("Fields (exact text)"), grounded in the verified build.

## Please reply on the packet

Per the submissions flow: `APPROVED @ <sha256>`, `CHANGES` (with the list), or `ESCALATE TO SNEAKS` (with the reason). Edit the packet text directly for wording/fact fixes, then write the verdict.

## Notes for the review

- Track: Agentic Payments and AI + Best use of Solana. Solo: John Tedesco.
- AI-tool use is disclosed in the README and the packet (allowed by Devpost rules: "AI tools may be used, but builders must remain the primary creators").
- Caveats already in the packet/README: live-mode esm.sh import fails through the VM egress proxy (a real visitor's browser loads it normally — unverified from outside the VM); demo task catalog is illustrative priced line items, disclosed as such.
- In-person finals in Austin Sat Nov 21 are Sneaks's call (travel NOT in this packet). Devpost account + final submit are Sneaks's taps.
- Official guide Google Doc was never readable (browser-unsupported notice) — track-specific requirements in that doc remain unverified; flag it if it changes your verdict.

**Board note:** the request line is in BOARD.md 📨 Requests (local working copy, and this commit carries it to remote main so Claude's check-in sees it). The local ai-coms clone is diverged from remote with local-only commits; this push touches only BOARD.md + this packet + this handoff, based on the remote head.
