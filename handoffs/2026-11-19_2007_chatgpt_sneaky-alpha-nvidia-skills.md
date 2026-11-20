# NVIDIA Skills suitability — Sneaky Alpha — 2026-11-19 20:07 ET
**Agent:** chatgpt · **Status:** SIGNED OFF · research-only

## Did
- Checked BOARD.md and projects/sneaky-alpha.md; latest prior handoff 2026-11-19_2000_chatgpt_sneaky-alpha-five-model-comparison.md.
- Inspected 0xSneaks/0x-sneaky-alpha README and queried code search for native skill loader; native Agent Skills runtime was NOT VERIFIED.
- Checked NVIDIA's official build.nvidia.com/skills catalog, NVIDIA/skills README/catalog, official NVIDIA playbook, and CLI docs.
- Distinguished Agent Skills (instructions usable by supported coding agents) from installed LLMs, MCP servers, or runtime tools.
- Drafted a bounded Muse implementation request; no installation performed.

## State + proof
- NVIDIA Skills catalog: https://build.nvidia.com/skills (~472 at capture, fluctuating).
- Primary repository and catalog/install guidance: https://github.com/NVIDIA/skills
- Official NVIDIA install examples: https://build.nvidia.com/playbooks/setting-up-your-dev-environment/overview
- App: https://github.com/0xSneaks/0x-sneaky-alpha (supports model providers, web search, memory and remote MCP per README).
- Candidate skills present in NVIDIA catalog:
  1. nvidia-skill-finder: install to Muse's supported coding agent to discover relevant skills (not app UI).
  2. ethos-write: portable purpose/permission/decision boundaries, complements COMS roles.
  3. nemo-relay-instrument-calls + nemo-relay-plugin-observability: evaluate instrumentation for model errors, latency, and tool failure; requires runtime integration rather than importing a prompt.
  4. nemo-retriever-mcp: evaluate search over vetted COMS/docs corpus; requires retrieval backend and compatible remote MCP access/auth.
  5. data-designer and rag-eval: optional synthetic eval corpus / RAG quality testing only after scope/resources approval.
- **VERIFIED:** skill names and vendor descriptions; official CLI targets Codex/Claude Code and other coding agents; app README's existing MCP and memory features.
- **INFERENCE:** above candidate usefulness for Sneaky Alpha.
- **UNKNOWN:** availability of compatible skill runtime in the phone/PWA, resource requirements/charges, whether Muse's host supports target CLI or remote MCP, results/latency of any deployed integration.
- No app code, secrets, keys, dependencies, deployments, servers, trades, spend, or user device settings touched.

## Decided
- TEST two low-impact agent-side skills first (finder, ethos); assess telemetry and retriever separately after architecture/security review.
- Do not instruct a blind 'install all 472 skills' or claim a skill installed in Muse's workspace becomes an app feature.
- All changes must respect existing ownership/claims and user approvals for service deployment, credentials or spending.

## Next
- Muse checks COMS, source ownership, and current app runtime, then proposes exact agent-side install and possible remote-MCP adapter with security/resource gates.
- Run model failure diagnosis on sandbox test tasks without recording keys or personal conversation contents.
- Submit build PR only after owner approval; no auto-merge/deploy.

## Don't
- Do not expose credentials, silently route private chats through new server-side proxies, perform wallet actions, initiate GPU/cloud instances, spend credits, or claim free unlimited access.
- Do not treat NeMo-RL session-memory as a generic drop-in app memory store, or RAG Blueprint as lightweight no-service software.
