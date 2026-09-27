#!/usr/bin/env python3
"""Push lesson-review fixes via GitHub git-database API (nested per-subject trees).
Only uploads blobs that changed vs HEAD; reuses existing SHAs otherwise.
Local-only (not committed).
"""
import base64, hashlib, os, sys

sys.path.insert(0, "/home/hatch/workspace/skills/github/bin")
from gh_publish import api_request

ROOT = os.path.expanduser("~/workspace/student-learning-website")
OWNER, REPO = "aliaaquib", "student-learning-website"

def blob_sha(path):
    with open(path, "rb") as f:
        raw = f.read()
    return hashlib.sha1(b"blob %d\0" % len(raw) + raw).hexdigest()

ref = api_request("GET", f"/repos/{OWNER}/{REPO}/git/ref/heads/main")
head_sha = ref["object"]["sha"]
head_commit = api_request("GET", f"/repos/{OWNER}/{REPO}/git/commits/{head_sha}")
base_tree = head_commit["tree"]["sha"]
print("base:", head_sha[:12])

# server-side blob map for content/chapters
tree = api_request("GET", f"/repos/{OWNER}/{REPO}/git/trees/{head_sha}?recursive=1")
if tree.get("truncated"):
    print("WARNING: tree truncated, falling back to per-blob checks")
server = {e["path"]: e["sha"] for e in tree["tree"]
          if e["type"] == "blob" and e["path"].startswith("content/chapters/")}
print(f"server blobs under content/chapters: {len(server)}")

# local files
local = {}
for dirpath, _d, names in os.walk(os.path.join(ROOT, "content", "chapters")):
    for n in names:
        if not n.endswith(".mdx"):
            continue
        full = os.path.join(dirpath, n)
        rel = os.path.relpath(full, ROOT)
        local[rel] = (full, blob_sha(full))

changed = [rel for rel, (full, sha) in local.items() if server.get(rel) != sha]
print(f"changed files: {len(changed)}")
for rel in sorted(changed)[:20]:
    print("  ", rel)
if len(changed) > 20:
    print(f"  ... and {len(changed) - 20} more")

# upload changed blobs
for rel in changed:
    full, sha = local[rel]
    with open(full, "rb") as f:
        content = base64.b64encode(f.read()).decode()
    r = api_request("POST", f"/repos/{OWNER}/{REPO}/git/blobs",
                    {"content": content, "encoding": "base64"})
    assert r["sha"] == sha, f"sha mismatch for {rel}"
print("blobs uploaded")

# per-subject trees (all local files; unchanged SHAs already exist server-side)
subject_dirs = {}
for rel, (full, sha) in local.items():
    parts = rel.split(os.sep)
    subject_dirs.setdefault(parts[2], []).append(("/".join(parts[3:]), sha))
subject_tree_shas = {}
for subject in sorted(subject_dirs):
    entries = [{"path": inner, "mode": "100644", "type": "blob", "sha": sha}
               for inner, sha in sorted(subject_dirs[subject])]
    t = api_request("POST", f"/repos/{OWNER}/{REPO}/git/trees", {"tree": entries})
    subject_tree_shas[subject] = t["sha"]
print(f"subject trees: {len(subject_tree_shas)}")

top_entries = [{"path": f"content/chapters/{s}", "mode": "040000", "type": "tree", "sha": sha}
               for s, sha in sorted(subject_tree_shas.items())]
tree = api_request("POST", f"/repos/{OWNER}/{REPO}/git/trees",
                   {"base_tree": base_tree, "tree": top_entries})
print("tree:", tree["sha"][:12])

commit = api_request("POST", f"/repos/{OWNER}/{REPO}/git/commits", {
    "message": ("Lesson quality review: fix duplicate quiz options, double periods, "
                "and rewrite 8 topically-scrambled lessons (cold-war origins, "
                "normal-distribution, word-classes, ser-and-estar, bubble-sort, "
                "binary-search, ionic-bonding key term, voltage/kinetic fixes)"),
    "tree": tree["sha"],
    "parents": [head_sha],
})
print("commit:", commit["sha"])
api_request("PATCH", f"/repos/{OWNER}/{REPO}/git/refs/heads/main", {"sha": commit["sha"]})
print("main updated ->", commit["sha"])
