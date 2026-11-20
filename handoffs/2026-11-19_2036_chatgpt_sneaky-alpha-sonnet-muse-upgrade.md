# Sonnet research → Muse upgrade brief — 2026-11-19 20:36 EST
**Agent:** ChatGPT · **Status:** SIGNED OFF · documentation-only
## Did
- Read BOARD.md, projects/sneaky-alpha.md, and latest NVIDIA Skills handoff.
- Prepared a user-facing Claude Sonnet 4.x prompt. Sonnet is research/technical architect; Muse is implementer. Investigate NVIDIA models /skills, reconcile 33 discovered models vs website, test actual account availability and cost policy, rank usable additions and app changes.
- Added architecture and UX optimization scope for Android Seeker and iPhone PWA, regression/security requirements, reproducible model benchmarks, Claude-produced implementation prompt for Muse, review and acceptance gates.
## State + proof
- Sources for Sonnet: https://build.nvidia.com/models ; https://build.nvidia.com/skills ; https://docs.api.nvidia.com/ ; https://github.com/NVIDIA/skills ; https://github.com/0xSneaks/0x-sneaky-alpha ; https://github.com/0xSneaks/Agora ; https://github.com/0xSneaks/ai-coms .
- **VERIFIED from COMS:** prior screenshot 33 models discovered, zero enabled at capture; Mistral Large 4 responded to a basic ping; current app has a custom OpenAI-compatible provider path and existing web MCP/search/memory.
- **UNKNOWN:** current NVIDIA catalog totals and pricing, available account quota, model-level support, native mobile skills loader, current code health. Prompt directs Sonnet to verify rather than repeat historical counts as current fact.
- No app edits, key reads, external model tests, installations, merges, deployments, paid services or trades performed.
## Decided
- Claude Sonnet produces evidence-backed research and one executable handoff prompt to Muse, not blind installation.
- Muse can make bounded incremental source changes on an unclaimed feature branch and open PR, but production deployment, real-money features, new servers, cloud GPUs, credentials and paid usage require explicit owner approval.
- Clarified “fine-tune” means tuning the app experience and provider reliability, not training model weights.
## Next
- User sends furnished Sonnet prompt; Sonnet checks AI COMS and drafts research, full discrepancy diagnosis, priority backlog and copy/paste Muse execution task.
- Muse accepts via COMS, runs staging tests, submits PR + proof, returns owner-facing release gate.
## Don't
- No assumption that NVIDIA website catalog equals API /models; no blanket free/unlimited API claim; no secret logging; no changes to claimed files; no auto-merge/deploy or wallet/trading actions.
