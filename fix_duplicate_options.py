#!/usr/bin/env python3
"""Fix duplicate quiz options (generator padding bug) in lesson MDX files.
For each affected <QuizQuestion>, dedupes options keeping the first occurrence
of each distinct option (by normalized text, preserving original raw tokens),
and recomputes answer={n} to point at the surviving correct option.
Local-only QA tool (not committed).
Usage: python3 fix_duplicate_options.py [--apply]
"""
import json, os, re, sys

ROOT = os.path.expanduser("~/workspace/student-learning-website")
FINDINGS = json.load(open("/tmp/review_findings.json"))
TARGETS = sorted({f["file"] for f in FINDINGS
                  if f["severity"] == "error" and f["check"].startswith("quiz q") and "duplicate options" in f["detail"]})

def split_raw_options(raw):
    """Split '["a", "b"]' into raw element tokens, string-aware. raw includes brackets."""
    inner = raw[1:-1]
    toks, depth, instr, esc, cur = [], 0, False, False, ""
    for ch in inner:
        if instr:
            cur += ch
            if esc: esc = False
            elif ch == "\\": esc = True
            elif ch == '"': instr = False
        else:
            if ch == '"':
                instr = True; cur += ch
            elif ch == "," and depth == 0:
                toks.append(cur.strip()); cur = ""
            else:
                if ch == "[": depth += 1
                elif ch == "]": depth -= 1
                cur += ch
    if cur.strip():
        toks.append(cur.strip())
    return toks

def norm(s):
    return re.sub(r"\s+", " ", s).strip().lower()

def fix_file(rel, apply):
    path = os.path.join(ROOT, rel)
    text = open(path, encoding="utf-8").read()
    out, nfixes = [], 0
    pos = 0
    for m in re.finditer(r"<QuizQuestion\b(.*?)/>", text, re.DOTALL):
        body = m.group(1)
        am = re.search(r"answer=\{(\d+)\}", body)
        om = re.search(r"options=\{", body)
        if not (am and om):
            continue
        # locate raw array with string-aware scan
        i = om.end()
        depth, instr, esc, j = 0, False, False, i
        while j < len(body):
            ch = body[j]
            if instr:
                if esc: esc = False
                elif ch == "\\": esc = True
                elif ch == '"': instr = False
            else:
                if ch == '"': instr = True
                elif ch == "[": depth += 1
                elif ch == "]":
                    depth -= 1
                    if depth == 0: break
            j += 1
        raw = body[i:j + 1]
        toks = split_raw_options(raw)
        vals = []
        ok = True
        for t in toks:
            try:
                vals.append(json.loads(t))
            except Exception:
                ok = False; break
        if not ok:
            continue
        seen, kept_toks, kept_vals = set(), [], []
        for t, v in zip(toks, vals):
            k = norm(v)
            if k not in seen:
                seen.add(k); kept_toks.append(t); kept_vals.append(v)
        if len(kept_toks) == len(toks):
            continue  # no dupes
        old_answer = int(am.group(1))
        correct_norm = norm(vals[old_answer]) if 0 <= old_answer < len(vals) else None
        new_answer = next((k for k, v in enumerate(kept_vals) if norm(v) == correct_norm), 0)
        if len(kept_toks) < 2:
            print(f"SKIP (would leave {len(kept_toks)} option): {rel}")
            continue
        new_body = body[:om.start()] + "options={[" + ", ".join(kept_toks) + "]" + body[j + 1:]
        new_body = re.sub(r"answer=\{\d+\}", "answer={" + str(new_answer) + "}", new_body, count=1)
        out.append(text[pos:m.start()])
        out.append("<QuizQuestion" + new_body + "/>")
        pos = m.end()
        nfixes += 1
        print(f"{'FIX' if apply else 'WOULD-FIX'} {rel}: {len(toks)}->{len(kept_toks)} options, answer {old_answer}->{new_answer}")
    out.append(text[pos:])
    if apply and nfixes:
        open(path, "w", encoding="utf-8").write("".join(out))
    return nfixes

total = 0
for rel in TARGETS:
    total += fix_file(rel, "--apply" in sys.argv)
print(f"{'applied' if '--apply' in sys.argv else 'dry-run'}: {total} questions fixed in {len(TARGETS)} files")
