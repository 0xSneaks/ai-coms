# Agora upstream auto-sync and Sneaky Alpha upgrade — 2026-11-19
Agent: ChatGPT | Status: SIGNED OFF | guidance only
## Did
- Checked BOARD.md, projects/sneaky-alpha.md, previous NVIDIA handoffs.
- Read 0xSneaks/Agora Android fork and upstream newo-ether/Agora source, official release notes, PR #7 and its workflow status.
- VERIFIED: fork master version 2.1.0/code31; sync/agora-2.2.0 branch version 2.2.0/code32; upstream latest release 2.3.0/code33 on November 19, 2026.
- VERIFIED: fork PR #7 open and mergeable but not merged; Build APK workflow for its head concluded cancelled, so build verification is outstanding.
## State + proof
- https://github.com/newo-ether/Agora/releases
- https://github.com/0xSneaks/Agora/pull/7
- https://github.com/0xSneaks/Agora
- https://github.com/0xSneaks/0x-sneaky-alpha
- VERIFIED: versions and PR status. UNKNOWN: installed APK signing cert and release data, later test runs, conflicts against v2.3.0, complete downstream PWA parity.
- No code, merges, signing keys, production installs, new paid services or credentials touched.
## Decided
- Recommend scheduled upstream release detection -> safe staging branch -> security/privacy/diff check -> preserved fork identifiers/features -> compile/test -> owner-reviewed PR -> signing with existing authorized release cert -> install through user approval.
- Never directly fast-forward or force push master from a scheduled workflow, auto-merge changes or auto-install unreviewed Android APK.
- Preserve com.sneaks.ai, app data, branding, greetings, disabled upstream telemetry, custom integrations, and current signing key. Export .agora backup first.
- Android app and iPhone PWA are distinct; web parity updates require separate tested code and deployment approval.
## Next
- Muse checks COMS, inspects current branch topology and either upgrades PR #7 to v2.3.0 or opens a fresh clean PR; tests install and in-app migration on Seeker; proposes scheduled PR generator without auto-merge.
## Don't
- No force sync, no release signing key in repo, no provider/telemetry regression, no GLM re-enable, no wallet operations, no spend, no production deployment without owner approval.