#!/usr/bin/env python3
"""AI COMS board checker + per-agent inbox. Stdlib only.

    python3 tools/coms_check.py                 # check the board (exit 1 on errors)
    python3 tools/coms_check.py --inbox muse    # OPEN requests addressed to muse
    python3 tools/coms_check.py --markdown      # report as Markdown (for the CI issue)

Errors (must fix): broken handoff links in BOARD.md, bad handoff file
names, more than 10 Latest handoffs, secret-looking strings in the repo.
Warnings (need attention): claims older than 24h, OPEN requests older
than 24h, requests addressed to an agent not on the roster.

A request line in BOARD.md "📨 Requests" looks like:
    - [from → to] project · ask · OPEN · 2026-10-24 → [note](handoffs/...)
`to` may list several agents (comma-separated) or `deciders`
(= claude-code and astra, see RULE.md).
"""
import argparse
import datetime
import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DECIDERS = ("claude-code", "astra")
MAX_LATEST = 10
STALE_HOURS = 24
HANDOFF_NAME = re.compile(r"^\d{4}-\d{2}-\d{2}_\d{4}_[a-z0-9-]+_[a-z0-9.-]+\.md$")
SECRET_PATTERNS = [
    ("private key block", re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----")),
    ("OpenAI-style key", re.compile(r"\bsk-[A-Za-z0-9_-]{20,}")),
    ("GitHub token", re.compile(r"\b(ghp|gho|ghu|ghs|ghr|github_pat)_[A-Za-z0-9_]{20,}")),
    ("Slack token", re.compile(r"\bxox[abprs]-[A-Za-z0-9-]{10,}")),
    ("AWS key id", re.compile(r"\bAKIA[0-9A-Z]{16}\b")),
    ("credential in URL", re.compile(r"\b[a-z][a-z0-9+.-]*://[^\s/:@]+:[^\s/@]{6,}@[^\s/]+")),
    ("assigned secret", re.compile(
        r"(?i)\b(password|passwd|secret|api[_-]?key|token|seed phrase|private key)\b"
        r"\s*[:=]\s*['\"]?[A-Za-z0-9/+_\-]{12,}")),
]
ARROW = re.compile(r"^- \[([^\]→]+?)\s*(?:→|->)\s*([^\]]+)\]\s*(.*)$")


def read(path):
    with open(path, encoding="utf-8") as f:
        return f.read()


def section(board, title_start):
    """Text of the BOARD.md section whose heading starts with title_start."""
    m = re.search(r"^## [^\n]*" + re.escape(title_start) + r"[^\n]*\n(.*?)(?=^## |\Z)",
                  board, re.M | re.S)
    return m.group(1) if m else ""


def roster_names(root):
    names = set()
    try:
        text = read(os.path.join(root, "AGENTS-ROSTER.md"))
    except OSError:
        return names
    for line in text.splitlines():
        m = re.match(r"^\|\s*`([a-z0-9-]+)(?:\s*\([^)]*\))?`\s*\|", line)
        if m and "~~" not in line:
            names.add(m.group(1))
    return names


def parse_requests(board):
    out = []
    for line in section(board, "Requests").splitlines():
        m = ARROW.match(line.strip())
        if not m or line.strip().startswith("- ~~"):
            continue
        frm, to, rest = m.group(1).strip(), m.group(2).strip(), m.group(3)
        status = "DONE" if re.search(r"\bDONE\b", rest) else (
            "OPEN" if re.search(r"\bOPEN\b", rest) else "UNKNOWN")
        d = re.search(r"\b(\d{4}-\d{2}-\d{2})\b", rest)
        targets = [t.strip() for t in re.split(r"[,+&]| and ", to) if t.strip()]
        out.append({"from": frm, "to": targets, "status": status,
                    "date": d.group(1) if d else None, "line": line.strip()})
    return out


def addressed_to(req, agent):
    agent = agent.lower()
    for t in (x.lower() for x in req["to"]):
        if t == agent or t == "all" or (t == "deciders" and agent in DECIDERS):
            return True
    return False


def tracked_files(root):
    try:
        out = subprocess.run(["git", "ls-files"], cwd=root, capture_output=True,
                             text=True, check=True).stdout.split("\n")
        return [f for f in out if f]
    except (OSError, subprocess.CalledProcessError):
        files = []
        for d, dirs, fs in os.walk(root):
            dirs[:] = [x for x in dirs if x != ".git"]
            files += [os.path.relpath(os.path.join(d, f), root) for f in fs]
        return files


def check(root, now=None):
    now = now or datetime.datetime.now()
    errors, warnings = [], []
    board = read(os.path.join(root, "BOARD.md"))

    no_code = re.sub(r"`[^`\n]*`", "", board)  # format examples live in `code`
    for link in re.findall(r"\]\((handoffs/[^)\s]+)\)", no_code):
        if not os.path.exists(os.path.join(root, link)):
            errors.append("BOARD.md links a missing file: %s" % link)

    hdir = os.path.join(root, "handoffs")
    for name in sorted(os.listdir(hdir)) if os.path.isdir(hdir) else []:
        if name.endswith(".md") and not HANDOFF_NAME.match(name):
            errors.append("handoff file name not YYYY-MM-DD_HHMM_agent_project.md: %s" % name)

    latest = [l for l in section(board, "Latest handoffs").splitlines() if l.startswith("- ")]
    if len(latest) > MAX_LATEST:
        errors.append("Latest handoffs has %d lines (max %d)" % (len(latest), MAX_LATEST))

    for line in section(board, "Active claims").splitlines():
        m = re.search(r"started (\d{4}-\d{2}-\d{2}) (\d{2}:\d{2})", line)
        if line.startswith("- ") and m:
            started = datetime.datetime.strptime(m.group(1) + " " + m.group(2), "%Y-%m-%d %H:%M")
            upd = re.search(r"updated (\d{4}-\d{2}-\d{2}) (\d{2}:\d{2})", line)
            if upd:
                started = datetime.datetime.strptime(upd.group(1) + " " + upd.group(2),
                                                     "%Y-%m-%d %H:%M")
            age = (now - started).total_seconds() / 3600
            if age > STALE_HOURS:
                warnings.append("stale claim (%dh, may be taken): %s" % (age, line.strip()))

    names = roster_names(root)
    for r in parse_requests(board):
        for t in r["to"]:
            if names and t.lower() not in names and t.lower() not in ("deciders", "all", "sneaks"):
                warnings.append("request to %r, not on AGENTS-ROSTER.md: %s" % (t, r["line"]))
        if r["status"] == "OPEN" and r["date"]:
            age_days = (now.date() - datetime.date.fromisoformat(r["date"])).days
            if age_days >= 1:
                warnings.append("OPEN request %d day(s) old: %s" % (age_days, r["line"]))
        if r["status"] == "UNKNOWN":
            warnings.append("request without OPEN/DONE: %s" % r["line"])

    for rel in tracked_files(root):
        if rel.startswith("tools/") and "coms_check" in rel:
            continue  # this file and its tests contain the patterns on purpose
        try:
            text = read(os.path.join(root, rel))
        except (OSError, UnicodeDecodeError):
            continue
        for label, rx in SECRET_PATTERNS:
            for m in rx.finditer(text):
                lineno = text.count("\n", 0, m.start()) + 1
                errors.append("possible secret (%s) at %s:%d (value not shown)" % (label, rel, lineno))
    return errors, warnings


def inbox(root, agent):
    board = read(os.path.join(root, "BOARD.md"))
    return [r for r in parse_requests(board) if r["status"] == "OPEN" and addressed_to(r, agent)]


def to_markdown(errors, warnings):
    lines = ["## AI COMS board check", ""]
    if not errors and not warnings:
        return "\n".join(lines + ["All checks pass."])
    if errors:
        lines += ["**Errors (fix now):**", ""] + ["- " + e for e in errors] + [""]
    if warnings:
        lines += ["**Needs attention:**", ""] + ["- " + w for w in warnings] + [""]
    lines += ["_Fix rules: README.md. Run `python3 tools/coms_check.py` locally._"]
    return "\n".join(lines)


def main(argv=None):
    ap = argparse.ArgumentParser()
    ap.add_argument("--root", default=ROOT)
    ap.add_argument("--inbox", metavar="AGENT")
    ap.add_argument("--markdown", action="store_true")
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args(argv)

    if a.inbox:
        items = inbox(a.root, a.inbox)
        if a.json:
            print(json.dumps(items, indent=2))
        elif not items:
            print("inbox %s: no OPEN requests" % a.inbox)
        else:
            print("inbox %s: %d OPEN request(s)" % (a.inbox, len(items)))
            for r in items:
                print("  " + r["line"])
        return 0

    errors, warnings = check(a.root)
    if a.json:
        print(json.dumps({"errors": errors, "warnings": warnings}, indent=2))
    elif a.markdown:
        print(to_markdown(errors, warnings))
    else:
        for e in errors:
            print("ERROR  " + e)
        for w in warnings:
            print("WARN   " + w)
        print("coms_check: %d error(s), %d warning(s)" % (len(errors), len(warnings)))
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
