# Seeker bridge — phone-local self-healing installed (blue-12, 2026-11-16)

Sneaks's order: the bridge must heal ON THE PHONE, because once the tunnel is
down the VM has no channel to the phone at all. Installed via the bridge
itself while it was up. All claims verified live on the phone 2026-11-16
~11:04–11:15 ET unless labelled otherwise.

## Why it kept dying (root cause, from the phone's own watchdog log)

- The stack already had a watchdog (`bin/seeker-watchdog.sh`, 5-min loop),
  a Termux:Boot entry, and a wake-lock. The gaps were structural:
- 2026-11-16 morning: Shizuku died → bridge `start.sh` FAILS CLOSED without
  rish uid=2000 → the watchdog logged "bridge: NOT started - rish/Shizuku
  not available" every 5 min from ~05:11 and could not heal the bridge.
  (The tunnel+proxy were up; note the watchdog's public check only proves
  tunnel+proxy — the proxy returns 401 before the bridge is consulted.)
- The watchdog's own log goes silent after 05:56:53 until Sneaks revived
  everything by hand at 11:02 — the watchdog process itself died and
  NOTHING on the phone could restart it (UNVERIFIED mechanism; prime
  suspect is the Android/OEM kill of the Termux process tree — the skill's
  standing next suspect).

## What was installed (phone paths)

1. `~/seeker-bridge/bin/seeker-watchdog.sh` v2 (backup:
   `seeker-watchdog.sh.bak-20261116`, md5-verified swap):
   - Interval 300s → **120s**.
   - Acquires `termux-wake-lock` at start (idempotent).
   - New rish supervision: if Shizuku/rish is down it logs the blocked
     state and raises a phone notification ("Seeker bridge: Shizuku
     stopped — open the Shizuku app and tap Start") at most once/hour
     (`muse-seeker-remote/rish_notify_stamp`).
2. **runit supervision of the watchdog**:
   `$PREFIX/var/service/seeker-watchdog/run` (termux-services/runsvdir
   was already running for conch/sshd/etc.). runsv now restarts the
   watchdog within seconds if it is killed. Current: runsv pid 21614 →
   watchdog pid 21823, `watchdog.pid` in sync, start-all stays compatible
   (it pid-checks the same file; the boot path's network/Shizuku wait
   means no double-start).
3. Nothing else changed: tunnel stays the NAMED tunnel "seeker"
   (`~/.cloudflared/config.yml`, permanent https://seeker.7ohstore.shop →
   127.0.0.1:8766 relay). Sneaky Alpha app config, wallets, agora
   settings untouched.

## Heal test (VERIFIED)

- 11:09:49 ET: killed cloudflared (pid 18913) on purpose, then hands off.
- 11:11:05: watchdog logged `tunnel: process DEAD -> restarting`;
  11:11:07 new tunnel pid 22422 registered on the same permanent URL.
- End-to-end MCP reachable again by 11:12:00 — **time-to-heal ≈ 2 min**
  (bounded by the 120s pass interval + my poll timing).
- Doctor after the test: **ALL PASS (13 checks)** — bridge 18807,
  proxy 18885, tunnel 22422, watchdog 21823, rish uid=2000, public URL
  401/200, boot script + boot app, agora_ask pong (Gemini 3 Flash).

## Oct-2026 hardening audit (via rish, actual vs expected)

| Item | Expected | Actual |
|---|---|---|
| deviceidle whitelist: com.termux, com.termux.boot, com.termux.api, com.sneaks.ai, moe.shizuku.privileged.api | all 5 | ✅ all 5 present |
| Phantom-process monitoring disabled | false | ✅ false |
| max_phantom_processes lifted | set high | ⚠️ was `null` (default 32) → **set to 2147483647, read-back verified** |
| com.sneaks.ai standby bucket | active (10) | ✅ 5 (EXEMPTED — better) |
| com.termux standby bucket | — | 5 (EXEMPTED) |
| RUN_ANY_IN_BACKGROUND com.termux | allow | ✅ allow |
| Wake-lock | held | ✅ `termux:service-wakelock` ACQ LONG (dumpsys power) |

## The one step that is still Sneaks's

Starting **Shizuku** after it dies cannot be automated phone-locally
(non-root; Shizuku's start needs its app's wireless-debugging flow = a
human tap). Everything else now self-heals. When it happens, the phone
itself will notify him (new in v2) instead of the bridge silently
staying down. Tunnel/proxy/app layers heal regardless of Shizuku;
only bridge-server restarts are gated on it (fail-closed by design —
not weakened).

## Residual risks (stated plainly)

- Hardening is not yet proven over days; if deaths continue, the OEM
  power manager is the next suspect (per skill).
- runsvdir itself runs inside the Termux app process; a full Termux
  kill still needs Termux:Boot (installed, verified present) or Sneaks
  opening Termux once. The watchdog can no longer die *alone* and stay
  dead while Termux lives.

— blue-12 → muse · DONE · 2026-11-16
