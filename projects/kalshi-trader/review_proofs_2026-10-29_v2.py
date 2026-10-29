import json, os, sys, tempfile, shutil, io, contextlib, time
from pathlib import Path
sys.path.insert(0, "/home/user/kalshi-trader")
from kalshi_trader.config import load_config, ConfigError
from kalshi_trader.gates import GateKeeper, GateError, OrderIntent
from kalshi_trader import cli
from kalshi_trader.client import KalshiError
d = Path(tempfile.mkdtemp()); repo=d/"repo"; repo.mkdir(); (repo/"config.json").write_text(json.dumps({"live_enabled": False}))
cfgdir=d/"cfg"; cfgdir.mkdir()
def gk(cfg): return GateKeeper(cfg, stop_file=d/"STOP", preview_store=d/"prev.json", audit_log=d/"audit.jsonl", approvals_outbox=d/"outbox", approved_dir=d/"approved")
def r(n, fixed, det=""): print(("FIXED   " if fixed else "OPEN    ")+n+(": "+det if det else ""))
os.environ["KALSHI_LIVE"]="1"
# P1
(cfgdir/"trader-config.json").write_text(json.dumps({"live_enabled":"false"}))
try: load_config(repo_root=repo, config_dir=cfgdir); r("P1 string live_enabled", False)
except ConfigError: r("P1 string live_enabled rejected", True)
# P2
(cfgdir/"trader-config.json").write_text(json.dumps({"max_order_cost_usd":1000,"daily_prod_cap_usd":1000}))
c=load_config(repo_root=repo, config_dir=cfgdir)
try: gk(c).check_cost_caps("prod", OrderIntent("buy","yes","T","1000","0.50"), open_orders_count=0); r("P2 caps", False)
except GateError: r("P2 config can't raise caps", True)
# P4a
c=load_config(repo_root=repo, config_dir=d/"none"); al=d/"audit.jsonl"
al.write_text('{"event":"order_submitted","env":"prod","ts":1\n')
try: gk(c).todays_prod_cost_usd(); r("P4a corrupt line", False)
except GateError: r("P4a corrupt audit line fails closed", True)
al.unlink()
# P3 / G3: operator self-approval by copying outbox -> approved
c.live_enabled=True; g=gk(c); i=OrderIntent("buy","yes","T","10","0.50")
card=g.create_preview("prod", i)
r("G3a token not printed to operator", "approval_token" not in card)
h=card["preview_hash"]; (d/"approved").mkdir(exist_ok=True)
shutil.copy(d/"outbox"/f"{h}.token", d/"approved"/f"{h}.token")   # what any shell user on the VM can do
try: g.consume_prod_approval(h,"prod",i); r("G3b operator self-approval", False, "cp outbox/<hash>.token approved/ then execute -> ACCEPTED; token is readable by the operator (mode %o, same uid)"%((d/'outbox'/f'{h}.token').stat().st_mode&0o777))
except GateError as e: r("G3b operator self-approval blocked", True, str(e))
# P4b
al.unlink(missing_ok=True); (d/"prev.json").unlink(missing_ok=True)
class FC:
    env="demo"
    def get_orders(self,**k): return {"orders":[]}
    def create_order_v2(self,p): raise KalshiError("timeout after send")
cli.build_client=lambda env,need_auth: FC(); cli.load_config=lambda: c; cli.GateKeeper=lambda cfg: gk(cfg)
class A: pass
a=A(); a.env="demo"; a.approval_token=None
buf=io.StringIO()
with contextlib.redirect_stdout(buf): cli._write_flow(a,i)
a.approval_token=json.loads(buf.getvalue())["preview"]["approval_token"]
try:
    with contextlib.redirect_stdout(io.StringIO()): cli._write_flow(a,i)
except KalshiError: pass
ev=[json.loads(l)["event"] for l in al.read_text().splitlines()]
r("P4b attempt recorded before send", "order_attempt" in ev, str(ev))
