#!/usr/bin/env python3
"""Push curriculum change (British removed, CBSE/ICSE added) via GitHub git-database API.

Covers: src/** edits, content/cambridge + content/american additions,
content/british deletions. Rebuilds src and content trees bottom-up from the
local working copy and merges at the top with base_tree, so unrelated paths
(public/, etc.) are never dropped. Local-only (not committed).
"""
import base64, hashlib, os, sys

sys.path.insert(0, "/home/hatch/workspace/skills/github/bin")
from gh_publish import api_request

ROOT = os.path.expanduser("~/workspace/student-learning-website")
OWNER, REPO = "aliaaquib", "student-learning-website"
TRACKED = ["src", "content"]

def blob_sha(path):
    with open(path, "rb") as f:
        raw = f.read()
    return hashlib.sha1(b"blob %d\0" % len(raw) + raw).hexdigest()

def upload_blob(full, sha):
    with open(full, "rb") as f:
        content = base64.b64encode(f.read()).decode()
    r = api_request("POST", f"/repos/{OWNER}/{REPO}/git/blobs",
                    {"content": content, "encoding": "base64"})
    assert r["sha"] == sha, f"sha mismatch for {full}"

ref = api_request("GET", f"/repos/{OWNER}/{REPO}/git/ref/heads/main")
head_sha = ref["object"]["sha"]
head_commit = api_request("GET", f"/repos/{OWNER}/{REPO}/git/commits/{head_sha}")
base_tree = head_commit["tree"]["sha"]
print("base:", head_sha[:12])

tree = api_request("GET", f"/repos/{OWNER}/{REPO}/git/trees/{head_sha}?recursive=1")
assert not tree.get("truncated"), "tree truncated, aborting"
server = {e["path"]: e["sha"] for e in tree["tree"] if e["type"] == "blob"}
print(f"server blobs: {len(server)}")

# local files under tracked dirs
local = {}
for top in TRACKED:
    for dirpath, _d, names in os.walk(os.path.join(ROOT, top)):
        for n in names:
            if n.startswith("."):
                continue
            full = os.path.join(dirpath, n)
            rel = os.path.relpath(full, ROOT).replace(os.sep, "/")
            local[rel] = (full, blob_sha(full))
print(f"local files: {len(local)}")

changed = [rel for rel, (full, sha) in local.items() if server.get(rel) != sha]
deleted = [rel for rel in server if rel.split("/")[0] in TRACKED and rel not in local]
print(f"changed/new: {len(changed)}, deleted: {len(deleted)}")
for rel in changed:
    upload_blob(*local[rel])
print("blobs uploaded")

# bottom-up trees from local listing (deletions vanish naturally)
dirs = {}
for rel, (_full, sha) in local.items():
    d, name = rel.rsplit("/", 1)
    dirs.setdefault(d, {"files": [], "subdirs": set()})
    dirs[d]["files"].append((name, sha))
all_dirs = set(dirs)
for d in list(all_dirs):
    parts = d.split("/")
    for i in range(1, len(parts)):
        parent = "/".join(parts[:i])
        all_dirs.add(parent)
for d in all_dirs:
    dirs.setdefault(d, {"files": [], "subdirs": set()})
for d in all_dirs:
    if "/" in d:
        parent = d.rsplit("/", 1)[0]
        dirs[parent]["subdirs"].add(d.rsplit("/", 1)[1])

def build(d, depth=0):
    entries = [{"path": n, "mode": "100644", "type": "blob", "sha": s}
               for n, s in sorted(dirs[d]["files"])]
    for sub in sorted(dirs[d]["subdirs"]):
        sub_sha = build(f"{d}/{sub}", depth + 1)
        if sub_sha:
            entries.append({"path": sub, "mode": "040000", "type": "tree",
                            "sha": sub_sha})
    if not entries:
        return None
    t = api_request("POST", f"/repos/{OWNER}/{REPO}/git/trees", {"tree": entries})
    return t["sha"]

top_shas = {}
for top in TRACKED:
    sha = build(top)
    assert sha, f"empty tree for {top}"
    top_shas[top] = sha
    print(f"{top} tree: {sha[:12]}")

new_tree = api_request("POST", f"/repos/{OWNER}/{REPO}/git/trees", {
    "base_tree": base_tree,
    "tree": [{"path": top, "mode": "040000", "type": "tree", "sha": sha}
             for top, sha in sorted(top_shas.items())],
})
print("tree:", new_tree["sha"][:12])

commit = api_request("POST", f"/repos/{OWNER}/{REPO}/git/commits", {
    "message": ("Curricula update: remove British curriculum, keep Cambridge, add Indian "
                "CBSE/ICSE. Order is now Cambridge, American, IB, CBSE/ICSE across the "
                "whole site. British-authored lesson overrides migrated to their Cambridge "
                "equivalents (IGCSE Year 1, AS Level, Stage 8) and sociology to American "
                "Grades 11-12; copy updated on homepage, subjects, curriculum, about, "
                "layout metadata and footer. No UI/design changes."),
    "tree": new_tree["sha"],
    "parents": [head_sha],
})
print("commit:", commit["sha"])
api_request("PATCH", f"/repos/{OWNER}/{REPO}/git/refs/heads/main", {"sha": commit["sha"]})
print("main updated ->", commit["sha"])
