# Lumen Learn — Student Learning Website

A free, standalone learning website for school students: real subjects, chapters
and interactive lessons in an editorial, W3Schools-style structure. No backend,
no build step, no tracking — just static files.

## What's inside

- **11 subjects** — Computer Science, Mathematics, Biology, Physics, Chemistry,
  English, History, Geography, Economics, Business, Languages
- **4 curricula with their own structures** — British (Primary → Secondary →
  GCSE/IGCSE → A Level), Cambridge (Primary → Lower Secondary → IGCSE →
  AS/A Level), American (Elementary → Middle → High School), IB (PYP → MYP → DP)
- **Interactive lessons** — explanations, diagrams, code examples, runnable
  Python in the browser (via Pyodide CDN), practice questions, scored quizzes,
  lesson summaries, and next-lesson navigation
- **Hash routing** (`#/subjects/...`, `#/learn/...`) so it works on any static
  host with no server rewrites

## Files

| File | Purpose |
|---|---|
| `index.html` | Page shell: header, nav, footer, script includes |
| `styles.css` | All styling — white editorial design, lime accent |
| `content.js` | All data: curricula, subjects, chapters, lessons |
| `app.js` | Hash router, page renderers, quizzes, Python runner |
| `README.md` | This file |
| `.nojekyll` | Tells GitHub Pages to serve files as-is |

Progress (completed lessons, recently viewed) is kept **in memory only** and
resets on reload — nothing is stored anywhere.

## Run locally

```bash
cd student-learning-website
python3 -m http.server 8000
# open http://localhost:8000
```

Opening `index.html` directly from disk also works, except the Pyodide Python
runner (CDN scripts need `http(s)`).

## Publish on GitHub Pages

1. Create a new GitHub repository and push this folder's contents to the
   default branch (so `index.html` is at the repository root).
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**,
   choose the branch and the `/ (root)` folder, then **Save**.
4. GitHub will give you a `https://<user>.github.io/<repo>/` URL within a
   minute or two.

The `.nojekyll` file ensures Pages serves everything (including files or
folders starting with underscores) without Jekyll processing. No build step
is required — Pages serves the static files directly.

## Editing content

All lesson content lives in `content.js` as plain JS objects. Each lesson is
a list of blocks:

- `h2`, `p`, `list` — text (supports `` `code` `` and `**bold**`)
- `code` — a code sample (`{t:'code', lang:'Python', code:'…'}`)
- `callout` — tip/key-idea box
- `diagram` — inline SVG with a caption
- `tryit` — editable, runnable Python (`{t:'tryit', title, subtitle, code}`)
- `practice` — questions with revealable answers
- `quiz` — scored multiple-choice with explanations
- `summary` — end-of-lesson recap box

Add subjects, chapters or lessons by following the existing structure, then
reload — no build needed.
