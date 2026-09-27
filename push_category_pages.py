#!/usr/bin/env python3
"""Push homepage subject-reduction + category pages via GitHub git-database API.
Changed: src/app/page.tsx, src/app/subjects/[subject]/page.tsx, src/app/sitemap.ts
Merges with existing trees (base_tree at each level) so nothing is dropped.
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

# Find existing subtree SHAs level by level (recursive listing truncates on big repos).
def tree_entries(sha):
    return api_request("GET", f"/repos/{OWNER}/{REPO}/git/trees/{sha}")["tree"]

def find_dir(entries, name):
    for e in entries:
        if e["type"] == "tree" and e["path"] == name:
            return e["sha"]
    raise KeyError(name)

src_dir_sha = find_dir(tree_entries(base_tree), "src")
app_dir_sha = find_dir(tree_entries(src_dir_sha), "app")
subjects_dir_sha = find_dir(tree_entries(app_dir_sha), "subjects")
subject_dir_sha = find_dir(tree_entries(subjects_dir_sha), "[subject]")
print("subtrees ok")

files = [
    "src/app/page.tsx",
    "src/app/subjects/[subject]/page.tsx",
    "src/app/sitemap.ts",
]

shas = {}
for rel in files:
    full = os.path.join(ROOT, rel)
    sha = blob_sha(full)
    with open(full, "rb") as f:
        content = base64.b64encode(f.read()).decode()
    r = api_request("POST", f"/repos/{OWNER}/{REPO}/git/blobs",
                    {"content": content, "encoding": "base64"})
    assert r["sha"] == sha, f"sha mismatch for {rel}"
    shas[rel] = sha
print("blobs uploaded")

def make_tree(base, entries):
    t = api_request("POST", f"/repos/{OWNER}/{REPO}/git/trees",
                    {"base_tree": base, "tree": entries})
    return t["sha"]

# src/app/subjects/[subject]/page.tsx
subject_tree = make_tree(subject_dir_sha, [
    {"path": "page.tsx", "mode": "100644", "type": "blob",
     "sha": shas["src/app/subjects/[subject]/page.tsx"]},
])
print("src/app/subjects/[subject] tree:", subject_tree[:12])

# src/app/subjects/ (only [subject]/ changes inside)
subjects_tree = make_tree(subjects_dir_sha, [
    {"path": "[subject]", "mode": "040000", "type": "tree", "sha": subject_tree},
])
print("src/app/subjects tree:", subjects_tree[:12])

# src/app/page.tsx, src/app/sitemap.ts, src/app/subjects/
app_tree = make_tree(app_dir_sha, [
    {"path": "page.tsx", "mode": "100644", "type": "blob", "sha": shas["src/app/page.tsx"]},
    {"path": "sitemap.ts", "mode": "100644", "type": "blob", "sha": shas["src/app/sitemap.ts"]},
    {"path": "subjects", "mode": "040000", "type": "tree", "sha": subjects_tree},
])
print("src/app tree:", app_tree[:12])

# src/app/
src_tree = make_tree(src_dir_sha, [
    {"path": "app", "mode": "040000", "type": "tree", "sha": app_tree},
])
print("src tree:", src_tree[:12])

# root
tree = make_tree(base_tree, [
    {"path": "src", "mode": "040000", "type": "tree", "sha": src_tree},
])
print("root tree:", tree[:12])

commit = api_request("POST", f"/repos/{OWNER}/{REPO}/git/commits", {
    "message": ("Homepage: show 3 subjects per category with 'Browse <category> subjects' links; "
                "add /subjects/stem, /subjects/humanities, /subjects/languages category pages "
                "reusing the subject-card design; sitemap entries. No UI restyle."),
    "tree": tree,
    "parents": [head_sha],
})
print("commit:", commit["sha"])
api_request("PATCH", f"/repos/{OWNER}/{REPO}/git/refs/heads/main", {"sha": commit["sha"]})
print("main updated ->", commit["sha"])
