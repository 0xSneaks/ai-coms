import json, os, sys, tempfile
from pathlib import Path
sys.path.insert(0, "/home/user/kalshi-trader")
from kalshi_trader.config import load_config
from kalshi_trader.gates import GateKeeper, GateError, OrderIntent
from kalshi_trader import cli
from kalshi_trader.client import KalshiError

d = Path(tempfile.mkdtemp())
repo = d/"repo"; repo.mkdir(); (repo/"config.json").write_text(json.dumps({"live_enabled": False}))
cfgdir = d/"cfg"; cfgdir.mkdir()
def gk(cfg): return GateKeeper(cfg, stop_file=d/"STOP", preview_store=d/"prev.json", audit_log=d/"audit.jsonl")
def res(name, ok, detail=""): print(("FINDING " if ok else "no-issue ") + name + (": " + detail if detail else ""))

# P1 live_enabled string "false" passes the prod gate
(cfgdir/"trader-config.json").write_text(json.dumps({"live_enabled": "false"}))
c = load_config(repo_root=repo, config_dir=cfgdir); os.environ["KALSHI_LIVE"] = "1"
try: gk(c).check_env_gate("prod"); res("P1 live_enabled='false' (string) opens prod gate", True)
except GateError: res("P1", False)

# P2 user config raises hard caps
(cfgdir/"trader-config.json").write_text(json.dumps({"max_order_cost_usd": 1000, "daily_prod_cap_usd": 1000}))
c = load_config(repo_root=repo, config_dir=cfgdir)
big = OrderIntent("buy","yes","T","1000","0.50")
try: gk(c).check_cost_caps("prod", big, open_orders_count=0); res("P2 user config lifts $25 caps; $500 prod order passes", True)
except GateError as e: res("P2", False, str(e))

# P3 approval token is self-serve: same caller mints and consumes it
c = load_config(repo_root=repo, config_dir=d/"none")
g = gk(c); i = OrderIntent("buy","yes","T","10","0.50")
card = g.create_preview("prod", i)
try: g.consume_token(card["approval_token"], "prod", i); res("P3 operator can mint+consume its own token (no human secret in the loop)", True)
except GateError: res("P3", False)

# P4a corrupt audit line skipped -> day-cap undercount
g = gk(c); al = d/"audit.jsonl"; al.unlink(missing_ok=True)
import time; now = int(time.time()*1000)
al.write_text(json.dumps({"event":"order_submitted","env":"prod","ts":now,"est_cost_usd":"24.00"})[:-5] + "\n")
res("P4a corrupt audit line ignored by day cap", g.todays_prod_cost_usd() == 0, f"spent read as {g.todays_prod_cost_usd()}")

# P4b order send raises (e.g. timeout after Kalshi accepted) -> nothing counted toward day cap
al.unlink(); prev = d/"prev.json"; prev.unlink(missing_ok=True)
class FakeClient:
    env="prod"
    def get_orders(self, **k): return {"orders": []}
    def create_order_v2(self, payload): raise KalshiError("timeout after send", status=None)
cli.build_client = lambda env, need_auth: FakeClient()
cli.load_config = lambda: c
cli.GateKeeper = lambda cfg: gk(cfg)
c.live_enabled = True
class A: pass
a = A(); a.env="prod"; a.approval_token=None
intent = OrderIntent("buy","yes","T","10","0.50")
import io, contextlib
buf = io.StringIO()
with contextlib.redirect_stdout(buf): cli._write_flow(a, intent)
a.approval_token = json.loads(buf.getvalue())["preview"]["approval_token"]
try:
    with contextlib.redirect_stdout(io.StringIO()): cli._write_flow(a, intent)
except KalshiError: pass
res("P4b failed/uncertain send leaves day cap at $0 (no attempt record)", gk(c).todays_prod_cost_usd() == 0,
    "audit events: " + str([json.loads(l)["event"] for l in al.read_text().splitlines()]))
