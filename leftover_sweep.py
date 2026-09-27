#!/usr/bin/env python3
"""
leftover_sweep.py — Site-wide leftover sweep for Thread Academy.

Usage:
    python3 leftover_sweep.py "Your route"
    python3 leftover_sweep.py "mobile-menu" --class
    python3 leftover_sweep.py "Curriculum structure" --sources out

Scans the page templates (src/) and the built static site (out/) for the
given text and reports every matching page and template by name with the
matched text shown. Read-only: never edits anything.

Exit code 0 always; an empty result is reported as "nowhere found".
"""

import argparse
import html as htmlmod
import os
import re
import sys

ROOT = os.path.expanduser("~/workspace/student-learning-website")
SRC = os.path.join(ROOT, "src")
OUT = os.path.join(ROOT, "out")
SNIPPET_RADIUS = 60
MAX_MATCHES_PER_FILE = 5


def snippet(text, match, radius=SNIPPET_RADIUS):
    start = max(0, match.start() - radius)
    end = min(len(text), match.end() + radius)
    return "…" + " ".join(text[start:end].split()) + "…"


def scan_templates(needle):
    hits = []
    pattern = re.compile(re.escape(needle), re.IGNORECASE)
    for dirpath, dirnames, filenames in os.walk(SRC):
        dirnames[:] = [d for d in dirnames if d not in ("node_modules", ".next")]
        for name in sorted(filenames):
            if not name.endswith((".tsx", ".ts", ".jsx")):
                continue
            path = os.path.join(dirpath, name)
            rel = os.path.relpath(path, ROOT)
            with open(path, "r", encoding="utf-8", errors="replace") as f:
                for lineno, line in enumerate(f, 1):
                    m = pattern.search(line)
                    if m:
                        hits.append(
                            (rel, lineno, snippet(line.strip(), pattern.search(line.strip())))
                        )
                        if sum(1 for h in hits if h[0] == rel) >= MAX_MATCHES_PER_FILE:
                            break
    return hits


def scan_built(needle):
    hits = []
    pattern = re.compile(re.escape(needle), re.IGNORECASE)
    if not os.path.isdir(OUT):
        return hits
    for dirpath, dirnames, filenames in os.walk(OUT):
        for name in sorted(filenames):
            if not name.endswith(".html"):
                continue
            path = os.path.join(dirpath, name)
            rel = os.path.relpath(path, OUT)
            with open(path, "r", encoding="utf-8", errors="replace") as f:
                raw = f.read()
            text = htmlmod.unescape(re.sub(r"<[^>]+>", " ", raw))
            text = " ".join(text.split())
            for m in pattern.finditer(text):
                hits.append((rel, 0, snippet(text, m)))
                if len(hits) > 500:
                    break
    return hits


def main():
    ap = argparse.ArgumentParser(description="Site-wide leftover sweep for Thread Academy")
    ap.add_argument("needle", help="Text or element name that was removed")
    ap.add_argument(
        "--sources",
        choices=("both", "templates", "out"),
        default="both",
        help="Which sources to scan (default: both)",
    )
    args = ap.parse_args()

    all_hits = []
    if args.sources in ("both", "templates"):
        for rel, lineno, ctx in scan_templates(args.needle):
            all_hits.append(("template", rel, lineno, ctx))
    if args.sources in ("both", "out"):
        for rel, lineno, ctx in scan_built(args.needle):
            all_hits.append(("built page", rel, lineno, ctx))

    print(f'Leftover sweep for: "{args.needle}"')
    print(f"Scanned: {'templates + built site' if args.sources == 'both' else args.sources}")
    print()
    if not all_hits:
        print("Nowhere found — this element no longer appears anywhere.")
        return 0
    for kind, rel, lineno, ctx in all_hits:
        loc = f"{rel}:{lineno}" if lineno else rel
        print(f"- [{kind}] {loc}")
        print(f"    {ctx}")
    print()
    print(f"{len(all_hits)} match(es) total.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
