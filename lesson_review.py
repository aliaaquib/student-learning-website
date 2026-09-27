#!/usr/bin/env python3
"""Lesson quality review scanner for Thread Academy.
Scans all content/chapters/*/*.mdx lessons for structural defects,
quiz integrity issues, and verifiable arithmetic errors.
Local-only QA tool (not committed).
Usage: python3 lesson_review.py [--briefs] [--json out.json]
"""
import json, os, re, sys, html
from collections import defaultdict

ROOT = os.path.expanduser("~/workspace/student-learning-website")
SHARED = os.path.join(ROOT, "content", "chapters")
LESSONS_DIR = os.path.expanduser("~/workspace/gen/lessons")

FINDINGS = []  # (severity, file, check, detail)

def report(sev, f, check, detail):
    FINDINGS.append({"severity": sev, "file": f, "check": check, "detail": detail})

def unesc(s):
    return html.unescape(s or "")

# ---------- attribute / tag parsing ----------

def parse_quiz_questions(text, fname):
    """Yield dicts for each <QuizQuestion ... /> tag."""
    out = []
    for m in re.finditer(r"<QuizQuestion\b(.*?)/>", text, re.DOTALL):
        body = m.group(1)
        qm = re.search(r'question="((?:[^"\\]|\\.)*)"', body)
        em = re.search(r'explanation="((?:[^"\\]|\\.)*)"', body)
        am = re.search(r"answer=\{(\d+)\}", body)
        # options={[...]} with string-aware bracket matching
        opts = None
        om = re.search(r"options=\{", body)
        if om:
            i = om.end()  # at '['
            depth, instr, esc = 0, False, False
            j = i
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
                        if depth == 0:
                            break
                j += 1
            raw = body[i:j + 1]
            try:
                opts = json.loads(raw)
            except Exception:
                opts = None
        out.append({
            "question": unesc(qm.group(1)) if qm else "",
            "options": [unesc(o) for o in opts] if isinstance(opts, list) else None,
            "answer": int(am.group(1)) if am else None,
            "explanation": unesc(em.group(1)) if em else "",
            "raw_options_ok": opts is not None,
        })
    return out

def parse_practice_items(text):
    out = []
    for m in re.finditer(r'<PracticeItem\s+question="((?:[^"\\]|\\.)*)"\s+hint="((?:[^"\\]|\\.)*)"\s*>(.*?)</PracticeItem>', text, re.DOTALL):
        out.append({
            "question": unesc(m.group(1)),
            "hint": unesc(m.group(2)),
            "answer": unesc(m.group(3)).strip(),
        })
    return out

def get_frontmatter(text):
    m = re.match(r"---\n(.*?)\n---\n", text, re.DOTALL)
    if not m: return {}
    fm = {}
    for line in m.group(1).splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            fm[k.strip()] = v.strip().strip('"')
    return fm

# ---------- arithmetic verification ----------

ARITH = str.maketrans({"−": "-", "–": "-", "×": "*", "x": "*", "÷": "/", "·": "*"})

def norm_arith(s):
    return s.translate(ARITH)

def solve_arith(q):
    """Return expected numeric answer for simple arithmetic questions, else None."""
    s = norm_arith(q).strip()
    # A op B = ?
    m = re.search(r"(\d+(?:\.\d+)?)\s*([+\-*/])\s*(\d+(?:\.\d+)?)\s*=\s*\?", s)
    if m:
        a, op, b = float(m.group(1)), m.group(2), float(m.group(3))
        if op == "+": r = a + b
        elif op == "-": r = a - b
        elif op == "*": r = a * b
        elif op == "/":
            if b == 0: return None
            r = a / b
        return r
    # A + ? = C  /  A - ? = C
    m = re.search(r"(\d+(?:\.\d+)?)\s*([+\-])\s*\?\s*=\s*(\d+(?:\.\d+)?)", s)
    if m:
        a, op, c = float(m.group(1)), m.group(2), float(m.group(3))
        return c - a if op == "+" else a - c
    # one-step equations: x + a = c, x - a = c, a + x = c, a - x = c, ax = c, x/a = c
    # only when the question is clearly a solve-for-x
    if re.search(r"solve", s, re.I) or re.fullmatch(r"\s*[a-z0-9+\-*/.()\s]+\s*=\s*[\d.]+\s*", s):
        m = re.search(r"([a-z])\s*([+\-])\s*(\d+(?:\.\d+)?)\s*=\s*(\d+(?:\.\d+)?)", s)
        if m:
            var, op, a, c = m.group(1), m.group(2), float(m.group(3)), float(m.group(4))
            return c - a if op == "+" else c + a
        m = re.search(r"(\d+(?:\.\d+)?)\s*([+\-])\s*([a-z])\s*=\s*(\d+(?:\.\d+)?)", s)
        if m:
            a, op, var, c = float(m.group(1)), m.group(2), m.group(3), float(m.group(4))
            return c - a if op == "+" else a - c
        m = re.search(r"(\d+(?:\.\d+)?)\s*([a-z])\s*=\s*(\d+(?:\.\d+)?)", s)
        if m:
            a, c = float(m.group(1)), float(m.group(3))
            return c / a if a != 0 else None
    return None

def fmt_num(r):
    if r is None: return None
    if abs(r - round(r)) < 1e-9:
        return str(int(round(r)))
    return str(round(r, 2))

def contains_number(text, num_str):
    return re.search(r"(?<![\d.])" + re.escape(num_str) + r"(?![\d.])", text) is not None

# ---------- per-file checks ----------

PLACEHOLDER = re.compile(r"\bTODO\b|\bFIXME\b|\bXXX\b|\[insert|As an AI language model")
PLACEHOLDER_I = re.compile(r"lorem ipsum|generated by AI", re.I)
MOJIBAKE = re.compile(r"Ã©|Ã¨|â€™|â€œ|â€�|Â ")

def check_file(path, rel):
    text = open(path, encoding="utf-8").read()
    fm = get_frontmatter(text)
    if not fm.get("title"):
        report("error", rel, "frontmatter", "missing/empty title")
    if not fm.get("lede"):
        report("error", rel, "frontmatter", "missing/empty lede")

    is_quiz_file = "<Quiz" in text
    if is_quiz_file:
        for sec, tag in [("objectives", "<LearningObjectives>"), ("definition", "<Definition"),
                         ("key-ideas", "## Key ideas"), ("worked-example", "<WorkedExample"),
                         ("mistakes", "Common mistakes"), ("practice", "<PracticeQuestions>"),
                         ("quiz", "<Quiz"), ("summary", "<Summary>")]:
            if tag not in text:
                report("warning", rel, "structure", f"missing section: {sec}")

    if PLACEHOLDER.search(text) or PLACEHOLDER_I.search(text):
        m = PLACEHOLDER.search(text) or PLACEHOLDER_I.search(text)
        report("error", rel, "placeholder", m.group(0)[:40])
    if MOJIBAKE.search(text):
        report("error", rel, "encoding", "possible mojibake: " + MOJIBAKE.search(text).group(0))

    words = len(re.findall(r"[A-Za-zÀ-ÿЀ-џ\u4e00-\u9fff\u0600-\u06ff]+", text))
    if words < 150:
        report("warning", rel, "thin", f"only ~{words} words")

    # --- practice items ---
    practice = parse_practice_items(text)
    practice_answers = set()
    for i, p in enumerate(practice):
        if not p["question"].strip():
            report("error", rel, "practice", f"item {i}: empty question")
        if not p["answer"].strip():
            report("error", rel, "practice", f"item {i}: empty answer")
        if not p["hint"].strip():
            report("warning", rel, "practice", f"item {i}: empty hint")
        practice_answers.add(re.sub(r"\s+", " ", p["answer"]).strip().lower())
        exp = solve_arith(p["question"])
        if exp is not None:
            want = fmt_num(exp)
            if not contains_number(p["answer"], want):
                report("error", rel, "arithmetic",
                       f"practice {i}: '{p['question'][:50]}' expects {want}, answer text: '{p['answer'][:60]}'")

    # --- worked example ---
    for m in re.finditer(r"<WorkedExample\b.*?>(.*?)</WorkedExample>", text, re.DOTALL):
        body = unesc(m.group(1))
        if "**Answer:**" not in body and "Answer:" not in body:
            report("warning", rel, "worked-example", "no Answer: line")

    # --- quiz ---
    questions = parse_quiz_questions(text, rel)
    if is_quiz_file and len(questions) < 2:
        report("warning", rel, "quiz", f"only {len(questions)} quiz questions")
    for i, q in enumerate(questions):
        tag = f"quiz q{i}"
        if not q["question"].strip():
            report("error", rel, tag, "empty question")
        if not q["raw_options_ok"] or not isinstance(q["options"], list):
            report("error", rel, tag, "options failed to parse")
            continue
        opts = q["options"]
        if len(opts) < 2:
            report("error", rel, tag, f"only {len(opts)} options")
            continue
        if any(not o.strip() for o in opts):
            report("error", rel, tag, "empty option text")
        if q["answer"] is None or not (0 <= q["answer"] < len(opts)):
            report("error", rel, tag, f"answer index {q['answer']} out of range for {len(opts)} options")
            continue
        normed = [re.sub(r"\s+", " ", o).strip().lower() for o in opts]
        if len(set(normed)) < len(normed):
            dups = [o for o in set(normed) if normed.count(o) > 1]
            report("error", rel, tag, f"duplicate options: {dups[0][:60]}")
        if not q["explanation"].strip():
            report("warning", rel, tag, "empty explanation")
        # recycled distractor: wrong option == verbatim practice answer
        for j, o in enumerate(opts):
            if j == q["answer"]:
                continue
            if re.sub(r"\s+", " ", o).strip().lower() in practice_answers:
                report("info", rel, tag, f"option {j} is a verbatim recycled practice answer (weak distractor)")
                break
        # arithmetic verification
        exp = solve_arith(q["question"])
        if exp is not None:
            want = fmt_num(exp)
            marked = opts[q["answer"]]
            if not contains_number(marked, want):
                report("error", rel, tag,
                       f"arithmetic: '{q['question'][:50]}' expects {want}, marked answer: '{marked[:60]}'")

def check_briefs():
    """Arithmetic-check brief practice answers (source of generated lessons)."""
    import glob
    for f in sorted(glob.glob(os.path.join(LESSONS_DIR, "briefs*.json")) +
                    glob.glob(os.path.join(LESSONS_DIR, "partials", "*.json"))):
        try:
            data = json.load(open(f, encoding="utf-8"))
        except Exception as e:
            report("warning", f, "brief", f"unparseable: {e}")
            continue
        chapters = data.get("chapters", data)
        for cid, c in chapters.items():
            if not isinstance(c, dict) or "brief" not in c:
                continue
            b = c["brief"] or {}
            for i, p in enumerate(b.get("practice", []) or []):
                q, a = p.get("q", ""), p.get("a", "")
                exp = solve_arith(q)
                if exp is not None:
                    want = fmt_num(exp)
                    if not contains_number(a or "", want):
                        report("error", os.path.basename(f), "brief-arithmetic",
                               f"{c.get('subject')}/{cid} practice {i}: '{q[:50]}' expects {want}, brief says '{(a or '')[:60]}'")
            ex = b.get("example") or {}
            exp = solve_arith(ex.get("problem", ""))
            if exp is not None:
                want = fmt_num(exp)
                if not contains_number(ex.get("answer", "") or "", want):
                    report("error", os.path.basename(f), "brief-arithmetic",
                           f"{c.get('subject')}/{cid} worked example expects {want}")

def main():
    do_briefs = "--briefs" in sys.argv
    files = []
    for subj in sorted(os.listdir(SHARED)):
        sdir = os.path.join(SHARED, subj)
        if not os.path.isdir(sdir):
            continue
        for chap in sorted(os.listdir(sdir)):
            cdir = os.path.join(sdir, chap)
            if not os.path.isdir(cdir):
                continue
            for fn in sorted(os.listdir(cdir)):
                if fn.endswith(".mdx"):
                    files.append(os.path.join(cdir, fn))
    for path in files:
        rel = os.path.relpath(path, ROOT)
        try:
            check_file(path, rel)
        except Exception as e:
            report("warning", rel, "scanner", f"scanner crashed: {e}")
    if do_briefs:
        check_briefs()

    by_sev = defaultdict(int)
    by_check = defaultdict(int)
    for f in FINDINGS:
        by_sev[f["severity"]] += 1
        by_check[f["check"]] += 1
    print(f"files scanned: {len(files)}")
    print("by severity:", dict(by_sev))
    print("by check:", dict(sorted(by_check.items(), key=lambda x: -x[1])))
    if "--json" in sys.argv:
        out = sys.argv[sys.argv.index("--json") + 1]
        json.dump(FINDINGS, open(out, "w"), indent=1)
        print("wrote", out)
    # print errors (not info) in full
    for f in FINDINGS:
        if f["severity"] in ("error", "warning"):
            print(f"[{f['severity']}] {f['file']} :: {f['check']} :: {f['detail'][:160]}")

if __name__ == "__main__":
    main()
