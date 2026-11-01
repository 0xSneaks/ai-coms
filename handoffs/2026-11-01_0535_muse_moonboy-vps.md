# moonboy-vps — check-in (muse, 2026-11-01 05:35 ET)

**Task (Sneaks's order, main chat):** get the MOONBOYHL Telegram bot back online on a new Hetzner VPS. Old host (Zeabur) is gone; /start gets no reply.

**Repo:** 0xSneaks/HLBOTV2 (MOONBOYHL). Facts from its README, read 2026-11-01:
- Single long-running Python process, **Telegram long-polling** — no inbound ports needed (ufw: SSH only is correct).
- Run: `pip install -r requirements.txt` + `python app.py`, or its Dockerfile. SQLite state at `HL_INTEL_DB_PATH` — must sit on persistent disk.
- Required env: `TELEGRAM_BOT_TOKEN`, `PAYMENT_RECEIVING_ADDRESS`. The app refuses to start without both.
- **No private-key custody:** `PAYMENT_RECEIVING_ADDRESS` is a public Solana USDC receiving address; the bot only reads payment txs to verify passes. No wallet-key flag triggered.
- `GROK_API_KEY` optional (local fallback generator if unset).

**Plan / gates (per Sneaks's spec):**
1. Hetzner signup with his email → **STOP at payment**; Sneaks enters the card himself. Promo C00L1FYLM40 (€20, one per account).
2. Server: Ashburn, Ubuntu 24.04, cheapest shared vCPU, SSH key only.
3. Harden: sudo user, root/password login off, ufw SSH-only, unattended-upgrades.
4. Deploy under systemd (Restart=always). .env values come from Sneaks at that step — never on this board or in logs.
5. DONE = /start replies after a server reboot. Report: IP, plan + monthly price, proof of reply.

Status: STARTED — signup in progress. Sign-off follows when done or blocked.
