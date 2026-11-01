#!/usr/bin/env python3
"""Download OG Ticket's public 21-image gallery for local review.

No credentials, wallets, authentication, X scraping, or remote uploads.
Run in a disposable workspace: python3 fetch_vault.py
"""
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import Request, urlopen
import hashlib
import json
import os
import sys

BASE = "https://ogmode.vip"
ROOT = Path(__file__).resolve().parent / "meme-vault"
MAX_BYTES = 15 * 1024 * 1024

def fetch_image(i):
    url = f"{BASE}/meme{i}.jpg"
    req = Request(url, headers={"User-Agent": "OG-asset-archive/1.0 (public research; no login)"})
    with urlopen(req, timeout=25) as res:
        actual = urlparse(res.geturl())
        if (actual.scheme, actual.hostname) != ("https", "ogmode.vip"):
            raise ValueError("unexpected redirect origin")
        ctype = res.headers.get("Content-Type", "").lower()
        if "image/jpeg" not in ctype and "image/jpg" not in ctype:
            raise ValueError(f"unexpected MIME: {ctype}")
        body = res.read(MAX_BYTES + 1)
    if len(body) > MAX_BYTES or not body.startswith(b"\xff\xd8\xff"):
        raise ValueError("not a bounded JPEG payload")
    digest = hashlib.sha256(body).hexdigest()
    path = ROOT / f"meme{i:02d}.jpg"
    tmp = path.with_suffix(".jpg.partial")
    with tmp.open("wb") as out:
        out.write(body)
    os.replace(tmp, path)
    return {"file": path.name, "source_url": url, "bytes": len(body), "sha256": digest}

def main():
    ROOT.mkdir(parents=True, exist_ok=True)
    assets, failures = [], []
    for i in range(1, 22):
        try:
            item = fetch_image(i)
            assets.append(item)
            print("OK", item["file"], item["bytes"])
        except Exception as exc:
            failures.append({"index": i, "error": str(exc)})
            print("FAIL", i, str(exc), file=sys.stderr)
    manifest = {
        "source": f"{BASE}/#meme-vault",
        "ethereum_contract": "0x69420654E8274107a0d455A6E9B08B497F435444",
        "status": "local public-image archive; review redistribution rights",
        "expected": 21,
        "downloaded": len(assets),
        "assets": assets,
        "failures": failures,
    }
    out = ROOT / "manifest.json"
    out.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {out} ({len(assets)}/21 verified downloads)")
    return 0 if not failures else 1

if __name__ == "__main__":
    raise SystemExit(main())
