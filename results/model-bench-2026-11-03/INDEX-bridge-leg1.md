# Model bench 2026-11-03 — raw reply index

| model | status | seconds | file |
|---|---|---|---|
| OpenCode Go:beam-free | ok | 12.1 | OpenCode Go-beam-free.md |
| OpenCode Go:deepseek-v4-pro | ok | 27.1 | OpenCode Go-deepseek-v4-pro.md |
| OpenCode Go:hy4-preview | error | 40.5 | OpenCode Go-hy4-preview.md |
| OpenCode Go:iceman-contributor-free | error | 40.6 | OpenCode Go-iceman-contributor-free.md |
| OpenCode Go:kimi-k2.7-code | ok | 37.8 | OpenCode Go-kimi-k2.7-code.md |
| OpenCode Go:kimi-k3 | ok | 28.3 | OpenCode Go-kimi-k3.md |
| OpenCode Go:longcat-2.0 | error | 40.7 | OpenCode Go-longcat-2.0.md |
| OpenCode Go:minimax-m3.1-flash | ok | 34.6 | OpenCode Go-minimax-m3.1-flash.md |
| OpenCode Go:qwen3.8-max | error | 40.6 | OpenCode Go-qwen3.8-max.md |
| OpenCode Go:step-5-preview | ok | 29.7 | OpenCode Go-step-5-preview.md |

Note: error rows for hy4-preview, iceman-contributor-free, longcat-2.0 and qwen3.8-max are bridge-client HTTP read timeouts at ~40s on both attempts (seeker_mcp.post uses timeout=40); the models may simply answer slower than that.
