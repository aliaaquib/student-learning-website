#!/usr/bin/env python3
"""Surgical push of the curriculum change via GitHub git-database API.

Only rebuilds trees on paths that changed (src/** edits, content/cambridge +
content/american additions, content/british deletions); reuses server SHAs for
everything else. Merges at the top with base_tree so unrelated paths are kept.
Local-only (not committed).
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

ref = api_request("GET", f"/repos/{OWNER}/{REPO}/git/ref/heads/main")
head_sha = ref["object"]["sha"]
head_commit = api_request("GET", f"/repos/{OWNER}/{REPO}/git/commits/{head_sha}")
base_tree = head_commit["tree"]["sha"]
print("base:", head_sha[:12], flush=True)

tree = api_request("GET", f"/repos/{OWNER}/{REPO}/git/trees/{head_sha}?recursive=1")
assert not tree.get("truncated"), "tree truncated, aborting"
server = {e["path"]: (e["sha"], e["type"]) for e in tree["tree"]}
print(f"server entries: {len(server)}", flush=True)

local = {}
for top in TRACKED:
    for dirpath, _d, names in os.walk(os.path.join(ROOT, top)):
        for n in names:
            if n.startswith("."):
                continue
            full = os.path.join(dirpath, n)
            rel = os.path.relpath(full, ROOT).replace(os.sep, "/")
            local[rel] = (full, blob_sha(full))

changed = {rel: v for rel, v in local.items()
           if server.get(rel, (None,))[0] != v[1]}
deleted = [rel for rel, (sha, typ) in server.items()
           if typ == "blob" and rel.split("/")[0] in TRACKED and rel not in local]
print(f"changed/new: {len(changed)}, deleted: {len(deleted)}", flush=True)

for i, (rel, (full, sha)) in enumerate(changed.items()):
    with open(full, "rb") as f:
        content = base64.b64encode(f.read()).decode()
    r = api_request("POST", f"/repos/{OWNER}/{REPO}/git/blobs",
                    {"content": content, "encoding": "base64"})
    assert r["sha"] == sha, f"sha mismatch for {rel}"
    if (i + 1) % 25 == 0:
        print(f"  uploaded {i + 1}/{len(changed)}", flush=True)
print("blobs uploaded", flush=True)

def ancestors(path):
    parts = path.split("/")
    return ["/".join(parts[:i]) for i in range(1, len(parts))]

affected = set()
for rel in list(changed) + deleted:
    affected.update(ancestors(rel))
affected = {d for d in affected if d.split("/")[0] in TRACKED}
affected.update(TRACKED)  # rebuild top trees too
print(f"affected dirs: {len(affected)}", flush=True)

def children_of(d):
    """Immediate children of dir d from server listing: name -> (sha, type)."""
    out = {}
    prefix = d + "/"
    for path, (sha, typ) in server.items():
        if path.startswith(prefix):
            rest = path[len(prefix):]
            if "/" not in rest:
                out[rest] = (sha, typ)
    return out

new_tree_sha = {}
deleted_dirs = set()
for d in sorted(affected, key=lambda x: -x.count("/")):
    entries = []
    kids = children_of(d)
    # names that must appear: server kids minus deleted, plus changed/new files
    names = set(kids)
    for rel in list(changed) + deleted:
        if rel.rsplit("/", 1)[0] == d:
            names.add(rel.rsplit("/", 1)[1])
    for name in sorted(names):
        child = f"{d}/{name}"
        if child in deleted or child in deleted_dirs:
            continue
        if child in changed:
            entries.append({"path": name, "mode": "100644", "type": "blob",
                            "sha": changed[child][1]})
        elif child in new_tree_sha:
            entries.append({"path": name, "mode": "040000", "type": "tree",
                            "sha": new_tree_sha[child]})
        elif name in kids:
            sha, typ = kids[name]
            entries.append({"path": name,
                            "mode": "040000" if typ == "tree" else "100644",
                            "type": typ, "sha": sha})
        # else: name came from changed with deeper path; handled via new_tree_sha
    # subdirs affected but not direct server children (new dirs)
    for sub, sha in sorted(new_tree_sha.items()):
        if sub.rsplit("/", 1)[0] == d and sub.split("/")[-1] not in [e["path"] for e in entries]:
            entries.append({"path": sub.split("/")[-1], "mode": "040000",
                            "type": "tree", "sha": sha})
    if not entries:
        # dir emptied by deletions (e.g. content/british) -> drop it entirely
        deleted_dirs.add(d)
        continue
    t = api_request("POST", f"/repos/{OWNER}/{REPO}/git/trees", {"tree": entries})
    new_tree_sha[d] = t["sha"]
print("subtrees rebuilt", flush=True)

top = api_request("POST", f"/repos/{OWNER}/{REPO}/git/trees", {
    "base_tree": base_tree,
    "tree": [{"path": d, "mode": "040000", "type": "tree", "sha": new_tree_sha[d]}
             for d in sorted(TRACKED) if d in new_tree_sha],
})
print("top tree:", top["sha"][:12], flush=True)

commit = api_request("POST", f"/repos/{OWNER}/{REPO}/git/commits", {
    "message": ("Curricula update: remove British curriculum, keep Cambridge, add Indian "
                "CBSE/ICSE. Order is now Cambridge, American, IB, CBSE/ICSE across the "
                "whole site. British-authored lesson overrides migrated to their Cambridge "
                "equivalents (IGCSE Year 1, AS Level, Stage 8) and sociology to American "
                "Grades 11-12; copy updated on homepage, subjects, curriculum, about, "
                "layout metadata and footer. No UI/design changes."),
    "tree": top["sha"],
    "parents": [head_sha],
})
print("commit:", commit["sha"], flush=True)
api_request("PATCH", f"/repos/{OWNER}/{REPO}/git/refs/heads/main", {"sha": commit["sha"]})
print("main updated ->", commit["sha"], flush=True)
