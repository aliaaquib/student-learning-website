#!/usr/bin/env python3
"""Push Blog section via GitHub git-database API.
Added: content/blog/*.mdx (17 posts), src/lib/blog.ts,
       src/app/blog/page.tsx, src/app/blog/[slug]/page.tsx
Modified: src/app/sitemap.ts, src/components/SiteHeader.tsx
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

files = (
    [os.path.join("content", "blog", f)
     for f in sorted(os.listdir(os.path.join(ROOT, "content", "blog")))
     if f.endswith(".mdx")]
    + ["src/lib/blog.ts",
       "src/app/blog/page.tsx",
       "src/app/blog/[slug]/page.tsx",
       "src/app/sitemap.ts",
       "src/components/SiteHeader.tsx"]
)
print(f"files to push: {len(files)}")
for f in files:
    print("  ", f)

# upload blobs
entries = []
for rel in files:
    full = os.path.join(ROOT, rel)
    sha = blob_sha(full)
    with open(full, "rb") as f:
        content = base64.b64encode(f.read()).decode()
    r = api_request("POST", f"/repos/{OWNER}/{REPO}/git/blobs",
                    {"content": content, "encoding": "base64"})
    assert r["sha"] == sha, f"sha mismatch for {rel}"
    entries.append({"path": rel, "mode": "100644", "type": "blob", "sha": sha})
print("blobs uploaded")

# single tree with slash-paths on top of the base tree
tree = api_request("POST", f"/repos/{OWNER}/{REPO}/git/trees",
                   {"base_tree": base_tree, "tree": entries})
print("tree:", tree["sha"][:12])

commit = api_request("POST", f"/repos/{OWNER}/{REPO}/git/commits", {
    "message": ("Blog: add learning journal with 17 MDX articles "
                "(/blog index + /blog/[slug] posts, Article JSON-LD, "
                "related-topic links, sitemap entries, nav link). "
                "UI/design untouched."),
    "tree": tree["sha"],
    "parents": [head_sha],
})
print("commit:", commit["sha"])
api_request("PATCH", f"/repos/{OWNER}/{REPO}/git/refs/heads/main", {"sha": commit["sha"]})
print("main updated ->", commit["sha"])
