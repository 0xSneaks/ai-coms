# Note for muse — inside-the-block — claude — 2026-10-24 20:10 ET

**Session goal:** Sneaks's direction: tell Muse which OpenCode models to use for an independent recompute of the study, and how to install OpenCode via Termux.
**Status:** HANDING OFF → muse
**Repo / branch:** 0xSneaks/ai-coms @ main

## Why
Every review so far (claude, grok, chatgpt) worked from the §7 table you posted. Nobody but you has run the raw data. Two new vendors recompute everything from `data/live-dataset.jsonl` + `harness/`. They add a check, not opinions.

## 1. Models — use existing Zen credits (CORRECTED 20:15 ET)

> **Correction (Sneaks, 20:13):** No Go/Go Plus subscription in either workspace (Console-verified Oct 21). $10 Zen credit balance, auto-recharge off. Use Zen pay-as-you-go IDs below. Do not subscribe to Go for this.
> Cost estimate (INFERENCE): ~$1–2 per model per full run → ~$3 of the $10. Stop if the Console shows >$5 used for this job.

| Role | Model ID | Why |
|---|---|---|
| Recompute A | `opencode/gemini-4-argon` | Google — only major vendor not yet on the panel |
| Recompute B | `opencode/deepseek-v4-pro` | Different lineage, strong at math |

- If DeepSeek is refused for region/privacy, that's a Console setting (Settings → Privacy → Regions) — **Sneaks only**. Until then, run Gemini only.
- Adding credits or turning on auto-recharge = spend → Sneaks's call.
- Don't use: GPT / Claude / Grok (already on panel), Muse Spark (your own family, not independent), GLM (Sneaks ruled it out), any `*-free` / Big Pickle / MiMo / Flint / Nemotron (may train on or retain data).

Source: https://opencode.ai/docs/go · https://opencode.ai/docs/zen

## 2. Install

**On your VM:** already done — opencode-ai 1.19.3 (your 19:05 stack-picks handoff). Skip to step 3.

**On the Seeker via Termux** (only if Sneaks wants it on the phone). Use proot-distro Ubuntu. Native `npm i -g opencode-ai` FAILS on Termux — no android-arm64 binary (opencode issue #12515). Untested on his device = INFERENCE; verify each step.

```bash
pkg update && pkg upgrade -y
pkg install -y proot-distro
proot-distro install ubuntu
proot-distro login ubuntu
# now inside Ubuntu:
apt update && apt install -y curl git ca-certificates
curl -fsSL https://opencode.ai/install | bash
exec bash
opencode --version
```
- Prints a version → working. Fails → stop and report the exact error. Don't try fixes on your own.
- Do NOT use third-party installers (Cortermux/`core-termux` script, `bun-termux-loader`). Unvetted `curl | bash` on a wallet phone is a no.
- Never give OpenCode access to Seed Vault, wallet apps, or key files.

## 3. Connect (key = credential)

1. If the VM's OpenCode isn't already connected to Zen: Sneaks copies the Zen API key from the Console → gives it to you via secure input.
2. You: `opencode` → `/connect` → **OpenCode Zen / pay-as-you-go** → paste key. Never print, log, or commit it.
3. `/models` → confirm both model IDs show.

## 4. Run the recompute (read-only)

1. Make a clean copy: `cp -r ~/workspace/inside-the-block ~/recompute && rm -f <wallet file>` — the copy must contain NO key/wallet files. Check with `ls -la` and a grep for key material before step 2.
2. `cd ~/recompute && opencode -m opencode/gemini-4-argon` then paste the prompt below. Repeat with `opencode/deepseek-v4-pro`. Fresh session per model; neither sees the other's answer or any review handoff.

**Prompt (paste as-is):**
```text
You are an independent auditor. Read-only: do not edit, send transactions, or run anything that touches a network.
Inputs: data/live-dataset.jsonl (raw records) and harness/ (analysis code). Do NOT read REPORT.md, SUBMISSION.md, or any review notes.
1. From the raw records alone, write your own script (stdlib Python) that recomputes: record count, landed count, slot range, qualifying (burst, leader) groups with n>=8, Spearman rho_send and rho_fee per group (state tie handling), and per-validator verdicts under this rule: fee-ordered or arrival-ordered only if ALL qualifying bursts of that validator have |rho|>=0.7 in that direction; otherwise mixed (bursts disagree) or no-pattern.
2. Run `python3 -m harness analyze data/live-dataset.jsonl` and diff its output against yours. List every mismatch.
3. Exploratory: n-weighted pooled mean of rho_fee and rho_send across all qualifying groups, with a permutation p-value (shuffle landed order within each group, 10,000 runs). State the sign convention.
4. Report how many groups span more than one slot.
Output: a table of your numbers vs the harness numbers, a list of mismatches (or "none"), the pooled results, and one verdict line: MATCHES / MISMATCH.
```

## 5. Report back
- One handoff per model: `handoffs/<date>_<time>_muse_inside-the-block-recompute-<model>.md` with its output table and verdict line.
- Compare with claude's pooled estimate (rho_fee ≈ −0.16, p ≈ 0.003, from the posted table). Agree or disagree — post either.
- Mark the board request below DONE.

## Don't
- Don't edit the study repo or entry from these runs.
- Don't add Zen credits, enable auto-recharge, subscribe to Go, or change Console privacy — Sneaks only.
- Don't let either model see the wallet file, the key, or other reviews.

## ⚠️ High-risk
- Wallet file must not be in the recompute copy. Key handling stays in secure input only.
