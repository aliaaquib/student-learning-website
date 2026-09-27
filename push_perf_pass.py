#!/usr/bin/env python3
"""Push performance-pass changes via GitHub git-database API.
Changed: src/app/globals.css, src/app/layout.tsx, vercel.json, public/fonts/*.woff2
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

files = [
    "src/app/globals.css",
    "src/app/layout.tsx",
    "vercel.json",
] + sorted(
    os.path.join("public", "fonts", f)
    for f in os.listdir(os.path.join(ROOT, "public", "fonts"))
    if f.endswith(".woff2")
)
print(f"files to push: {len(files)}")
for f in files:
    print("  ", f)

# upload blobs
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

# build nested trees: public/fonts, src/app, root
def make_tree(entries):
    t = api_request("POST", f"/repos/{OWNER}/{REPO}/git/trees", {"tree": entries})
    return t["sha"]

fonts_entries = [{"path": os.path.basename(rel), "mode": "100644", "type": "blob", "sha": shas[rel]}
                 for rel in sorted(files) if rel.startswith("public/fonts/")]
fonts_tree = make_tree(fonts_entries)
print("public/fonts tree:", fonts_tree[:12])

public_tree = make_tree([{"path": "fonts", "mode": "040000", "type": "tree", "sha": fonts_tree}])
print("public tree:", public_tree[:12])

app_entries = [{"path": os.path.basename(rel), "mode": "100644", "type": "blob", "sha": shas[rel]}
               for rel in sorted(files) if rel.startswith("src/app/")]
app_tree = make_tree(app_entries)
print("src/app tree:", app_tree[:12])

src_tree = make_tree([{"path": "app", "mode": "040000", "type": "tree", "sha": app_tree}])
print("src tree:", src_tree[:12])

top_entries = [
    {"path": "public", "mode": "040000", "type": "tree", "sha": public_tree},
    {"path": "src", "mode": "040000", "type": "tree", "sha": src_tree},
    {"path": "vercel.json", "mode": "100644", "type": "blob", "sha": shas["vercel.json"]},
]
tree = api_request("POST", f"/repos/{OWNER}/{REPO}/git/trees",
                   {"base_tree": base_tree, "tree": top_entries})
print("tree:", tree["sha"][:12])

commit = api_request("POST", f"/repos/{OWNER}/{REPO}/git/commits", {
    "message": ("Performance pass: self-host Manrope + Newsreader fonts "
                "(remove render-blocking Google Fonts stylesheet; same files, "
                "same @font-face rules, zero visual change), tighten CSP "
                "(drop fonts.googleapis.com / fonts.gstatic.com)"),
    "tree": tree["sha"],
    "parents": [head_sha],
})
print("commit:", commit["sha"])
api_request("PATCH", f"/repos/{OWNER}/{REPO}/git/refs/heads/main", {"sha": commit["sha"]})
print("main updated ->", commit["sha"])
