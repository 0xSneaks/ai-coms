import json, os, sys, tempfile, base64
from pathlib import Path
sys.path.insert(0, "/home/user/kalshi-trader")
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey
from cryptography.hazmat.primitives import serialization
from kalshi_trader.config import load_config
from kalshi_trader.gates import GateKeeper, GateError, OrderIntent, intent_hash
d=Path(tempfile.mkdtemp()); repo=d/"repo"; repo.mkdir()
(repo/"config.json").write_text(json.dumps({"live_enabled": False}))
cfg=d/"cfg"; cfg.mkdir()
def gk(c): return GateKeeper(c, stop_file=d/"STOP", preview_store=d/"prev.json", audit_log=d/"audit.jsonl", approved_dir=d/"approved")
def r(n, ok, det=""): print(("PASS    " if ok else "FAIL    ")+n+(": "+det if det else ""))
# baseline: no pubkey -> prod refuses
c=load_config(repo_root=repo, config_dir=cfg); g=gk(c); i=OrderIntent("buy","yes","T","10","0.50")
g.create_preview("prod", i); h=intent_hash("prod", i)
try: g.consume_prod_approval(h,"prod",i); r("G3 no-pubkey fails closed", False)
except GateError: r("G3 no-pubkey fails closed", True)
# attack: operator mints its own keypair, writes pubkey (and live_enabled) into the operator-writable user config, signs
sk=Ed25519PrivateKey.generate()
pub=sk.public_key().public_bytes(serialization.Encoding.Raw, serialization.PublicFormat.Raw)
(cfg/"trader-config.json").write_text(json.dumps({"approval_pubkey_b64": base64.b64encode(pub).decode(), "live_enabled": True}))
c=load_config(repo_root=repo, config_dir=cfg); g=gk(c)
g.create_preview("prod", i)
exp=int(__import__("time").time())+600
sig=sk.sign(GateKeeper.approval_message(h, exp).encode())
(d/"approved").mkdir(exist_ok=True)
(d/"approved"/f"{h}.sig").write_text(json.dumps({"signature_b64": base64.b64encode(sig).decode(), "expires_unix": exp}))
try: g.consume_prod_approval(h,"prod",i); r("G3 operator-minted key rejected", False, "self-generated key in ~/.config/kalshi/trader-config.json + self-signed approval -> ACCEPTED; live_enabled:true from the same file also accepted (live_enabled=%s)"%c.live_enabled)
except GateError as e: r("G3 operator-minted key rejected", True, str(e))
# replay
try: g.consume_prod_approval(h,"prod",i); r("G3 replay", False)
except GateError: r("G3 replay of used signature refused", True)
