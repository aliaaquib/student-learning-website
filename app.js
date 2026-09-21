/* ============================================================
   Lumen Learn — app.js
   Hash router + page renderers. No backend, no persistence:
   progress (completed lessons, recently viewed) lives in memory
   and resets when the page reloads.
   ============================================================ */

/* ---------------- in-memory state ---------------- */
const state = {
  completed: new Set(),   // "subject/chapter/lesson"
  recent: []              // [{subject, chapter, lesson, title}]
};

/* ---------------- helpers ---------------- */
function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Light inline markup used in lesson text: `code` and **bold**
function inline(text) {
  return esc(text)
    .replace(/`([^`]+)`/g, '<code class="inline">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

function subjectOf(slug) { return SUBJECTS[slug]; }

function chapterOf(subjectSlug, chapterId) {
  const s = subjectOf(subjectSlug);
  return s ? s.chapters.find(c => c.id === chapterId) : null;
}

function lessonOf(subjectSlug, chapterId, lessonId) {
  const c = chapterOf(subjectSlug, chapterId);
  return c ? c.lessons.find(l => l.id === lessonId) : null;
}

function lessonKey(s, c, l) { return s + "/" + c + "/" + l; }

function lessonUrl(s, c, l) { return "#/learn/" + s + "/" + c + "/" + l; }

function chapterUrl(s, c) { return "#/chapter/" + s + "/" + c; }

// Parse "#/path/parts?query" into {path:[...], query:{...}}
function parseHash() {
  let h = location.hash || "#/";
  h = h.replace(/^#/, "");
  const qi = h.indexOf("?");
  let path = h, query = {};
  if (qi !== -1) {
    path = h.slice(0, qi);
    const params = new URLSearchParams(h.slice(qi + 1));
    params.forEach((v, k) => { query[k] = v; });
  }
  const parts = path.split("/").filter(Boolean);
  return { parts, query };
}

function markRecent(s, c, l) {
  const key = lessonKey(s, c, l);
  state.recent = state.recent.filter(r => r.key !== key);
  const lesson = lessonOf(s, c, l);
  state.recent.unshift({
    key, subject: s, chapter: c, lesson: l,
    title: lesson ? lesson.title : l,
    subjectName: subjectOf(s) ? subjectOf(s).name : s
  });
  state.recent = state.recent.slice(0, 8);
}

/* ---------------- Pyodide (Python in the browser) ---------------- */
let pyodidePromise = null;
function loadPyodide() {
  if (!pyodidePromise) {
    pyodidePromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
      script.onload = () => {
        window.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/" })
          .then(resolve, reject);
      };
      script.onerror = () => reject(new Error("Could not load the Python runtime."));
      document.head.appendChild(script);
    });
  }
  return pyodidePromise;
}

async function runPython(code, outputEl, statusEl, btn) {
  outputEl.classList.add("visible");
  try {
    statusEl.textContent = "Loading Python runtime (first run takes a few seconds)…";
    btn.disabled = true;
    const py = await loadPyodide();
    statusEl.textContent = "Running…";
    py.setStdout({ batched: s => { outputEl.textContent += s + "\n"; } });
    py.setStderr({ batched: s => { outputEl.textContent += s + "\n"; } });
    outputEl.textContent = "";
    await py.runPythonAsync(code);
    statusEl.textContent = "Done.";
  } catch (err) {
    outputEl.textContent += "\n[Error] " + (err && err.message ? err.message : err);
    statusEl.textContent = "Something went wrong — check your code and try again.";
  } finally {
    btn.disabled = false;
  }
}

/* ---------------- block renderer ---------------- */
let tryitCounter = 0;

function renderBlocks(blocks) {
  return blocks.map(b => {
    switch (b.t) {
      case "h2":
        return "<h2>" + inline(b.text) + "</h2>";
      case "p":
        return "<p>" + inline(b.text) + "</p>";
      case "list":
        return "<ul>" + b.items.map(i => "<li>" + inline(i) + "</li>").join("") + "</ul>";
      case "code":
        return '<div class="code-block"><div class="code-head"><span>' + esc(b.lang || "Code") +
          '</span><button class="copy-btn" data-copy>Copy</button></div><pre>' + esc(b.code) + "</pre></div>";
      case "callout":
        return '<div class="callout ' + esc(b.kind || "note") + '"><div class="callout-title">' +
          esc(b.title || "Note") + "</div><p>" + inline(b.text) + "</p></div>";
      case "diagram":
        return '<figure class="diagram">' + b.svg +
          (b.caption ? "<figcaption>" + esc(b.caption) + "</figcaption>" : "") + "</figure>";
      case "tryit": {
        tryitCounter++;
        const id = "tryit-" + tryitCounter;
        return '<div class="tryit" id="' + id + '">' +
          '<div class="tryit-head"><div><strong>' + esc(b.title || "Try it") + "</strong><br><span>" +
          esc(b.subtitle || "Run real Python in your browser.") + "</span></div></div>" +
          '<textarea aria-label="Editable Python code" spellcheck="false">' + esc(b.code) + "</textarea>" +
          '<div class="tryit-foot"><button class="run-btn" data-run>▶ Run</button>' +
          '<span class="tryit-status"></span></div>' +
          '<pre class="tryit-output" aria-live="polite"></pre></div>';
      }
      case "practice":
        return '<div class="practice">' + b.items.map(item =>
          '<div class="practice-item"><div class="p-q">' + inline(item.q) + "</div>" +
          (item.hint ? '<div class="p-hint">Hint: ' + inline(item.hint) + "</div>" : "") +
          '<button class="reveal-btn" data-reveal>Show answer</button>' +
          '<div class="practice-answer"><div class="code-block"><div class="code-head"><span>Answer</span></div><pre>' +
          esc(item.answer) + "</pre></div></div></div>"
        ).join("") + "</div>";
      case "quiz":
        return renderQuiz(b.questions);
      case "summary":
        return '<div class="callout key"><div class="callout-title">Lesson summary</div><ul style="margin:0">' +
          b.items.map(i => "<li>" + inline(i) + "</li>").join("") + "</ul></div>";
      default:
        return "";
    }
  }).join("");
}

let quizCounter = 0;
function renderQuiz(questions) {
  quizCounter++;
  const qid = "quiz-" + quizCounter;
  const qs = questions.map((q, qi) => {
    const opts = q.options.map((opt, oi) =>
      '<button class="quiz-opt" data-q="' + qi + '" data-o="' + oi + '" data-a="' + q.answer + '">' +
      esc(opt) + "</button>"
    ).join("");
    return '<div class="quiz-q" data-qq="' + qi + '"><p class="q-text">' + (qi + 1) + ". " + inline(q.q) + "</p>" +
      '<div class="quiz-opts">' + opts + "</div>" +
      '<div class="quiz-explain">' + inline(q.explain || "") + "</div></div>";
  }).join("");
  return '<div class="quiz" id="' + qid + '" data-total="' + questions.length + '">' +
    '<div class="quiz-head">Check your understanding</div>' +
    '<div class="quiz-body">' + qs + "</div>" +
    '<div class="quiz-score" aria-live="polite"></div></div>';
}

/* ---------------- interactive wiring (after render) ---------------- */
function wireInteractions(root) {
  // Copy buttons
  root.querySelectorAll("[data-copy]").forEach(btn => {
    btn.addEventListener("click", () => {
      const pre = btn.closest(".code-block").querySelector("pre");
      navigator.clipboard.writeText(pre.textContent).then(() => {
        btn.textContent = "Copied ✓";
        setTimeout(() => { btn.textContent = "Copy"; }, 1500);
      });
    });
  });

  // Practice reveal
  root.querySelectorAll("[data-reveal]").forEach(btn => {
    btn.addEventListener("click", () => {
      const ans = btn.parentElement.querySelector(".practice-answer");
      const open = ans.classList.toggle("visible");
      btn.textContent = open ? "Hide answer" : "Show answer";
    });
  });

  // Try-it run buttons
  root.querySelectorAll(".tryit").forEach(box => {
    const btn = box.querySelector("[data-run]");
    const ta = box.querySelector("textarea");
    const out = box.querySelector(".tryit-output");
    const status = box.querySelector(".tryit-status");
    btn.addEventListener("click", () => runPython(ta.value, out, status, btn));
  });

  // Quiz options
  root.querySelectorAll(".quiz").forEach(quiz => {
    const total = parseInt(quiz.dataset.total, 10);
    let answered = 0, correct = 0;
    const scoreEl = quiz.querySelector(".quiz-score");
    quiz.querySelectorAll(".quiz-opt").forEach(opt => {
      opt.addEventListener("click", () => {
        const qBox = opt.closest(".quiz-q");
        if (qBox.dataset.done) return;
        qBox.dataset.done = "1";
        answered++;
        const right = parseInt(opt.dataset.a, 10) === parseInt(opt.dataset.o, 10);
        qBox.querySelectorAll(".quiz-opt").forEach(o => {
          o.disabled = true;
          if (parseInt(o.dataset.o, 10) === parseInt(o.dataset.a, 10)) o.classList.add("correct");
        });
        if (!right) opt.classList.add("wrong"); else correct++;
        const ex = qBox.querySelector(".quiz-explain");
        if (ex && ex.textContent.trim()) ex.classList.add("visible");
        if (answered === total) {
          scoreEl.innerHTML = "You scored <strong>" + correct + " / " + total + "</strong>" +
            (correct === total ? " — perfect! 🎉" : correct >= total / 2 ? " — good work, keep going." : " — review the lesson and try again.");
          scoreEl.classList.add("visible");
        }
      });
    });
  });

  // Mark-complete buttons
  root.querySelectorAll("[data-complete]").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.complete;
      state.completed.add(key);
      btn.textContent = "✓ Completed";
      btn.classList.add("done");
      btn.disabled = true;
      const note = btn.parentElement.querySelector(".complete-note");
      if (note) note.textContent = "Nice work — this resets when you reload the page.";
    });
  });

  // Search forms
  root.querySelectorAll("[data-search-form]").forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const q = form.querySelector("input").value.trim();
      location.hash = "#/search" + (q ? "?q=" + encodeURIComponent(q) : "");
    });
  });

  // Example chips
  root.querySelectorAll("[data-chip]").forEach(chip => {
    chip.addEventListener("click", e => {
      e.preventDefault();
      location.hash = chip.getAttribute("href");
    });
  });
}

/* ---------------- page: home ---------------- */
function pageHome() {
  const subjectCards = Object.keys(SUBJECTS).map(slug => {
    const s = SUBJECTS[slug];
    return '<a class="card" href="#/subjects/' + slug + '">' +
      '<div class="card-icon" aria-hidden="true">' + s.icon + "</div>" +
      "<h3>" + esc(s.name) + "</h3><p>" + esc(s.tagline) + "</p>" +
      '<span class="card-link">Start learning →</span></a>';
  }).join("");

  const curriculumCards = Object.keys(CURRICULA).map(slug => {
    const c = CURRICULA[slug];
    const levels = c.levels.map(l => l.name).join(" → ");
    return '<a class="card" href="#/curriculums/' + slug + '">' +
      "<h3>" + esc(c.name) + "</h3>" +
      '<p class="card-meta">' + esc(c.tagline) + "</p>" +
      "<p>" + esc(levels) + "</p>" +
      '<span class="card-link">Explore curriculum →</span></a>';
  }).join("");

  const recent = state.recent.length
    ? '<div class="recent-strip"><h3>Continue where you stopped <span style="color:var(--faint);font-weight:400;font-size:14px;">(this session only)</span></h3>' +
      '<div class="recent-list">' + state.recent.map(r =>
        '<a class="chip" href="' + lessonUrl(r.subject, r.chapter, r.lesson) + '">' +
        esc(r.subjectName) + " · " + esc(r.title) + "</a>"
      ).join("") + "</div></div>"
    : "";

  return `
  <section class="hero">
    <div class="container">
      <span class="hero-kicker">A free learning library for school students</span>
      <h1>Learn anything.<br><span class="accent-word">Understand</span> everything.</h1>
      <p class="hero-sub">Learn Computer Science, Mathematics, Biology, Physics, Chemistry, English, History, Geography, Economics and more — aligned with the curriculum you study.</p>
      <div class="search-block">
        <form data-search-form>
          <label class="search-label" for="hero-search">What do you want to learn?</label>
          <div class="search-row">
            <input id="hero-search" type="search" placeholder="Try &quot;loops&quot;, &quot;algebra&quot;, &quot;cells&quot;…" autocomplete="off">
            <button type="submit">Search</button>
          </div>
        </form>
        <div class="chip-row">
          <span class="chip-hint">Examples:</span>
          <a class="chip" data-chip href="#/search?q=Python">Python</a>
          <a class="chip" data-chip href="#/search?q=Algebra">Algebra</a>
          <a class="chip" data-chip href="#/search?q=Biology">Biology</a>
          <a class="chip" data-chip href="#/search?q=Physics">Physics</a>
          <a class="chip" data-chip href="#/search?q=Chemistry">Chemistry</a>
        </div>
      </div>
      ${recent}
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Subjects</span>
        <h2>Explore subjects</h2>
        <p>Real chapters, real lessons — pick a subject and start reading. Every card below opens an actual subject page.</p>
      </div>
      <div class="card-grid">${subjectCards}</div>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Curriculums</span>
        <h2>Learn the way your curriculum is taught.</h2>
        <p>Choose the system you study in. Each curriculum keeps its own structure — levels, years and grades exactly as your school organises them.</p>
      </div>
      <div class="card-grid two">${curriculumCards}</div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">How it works</span>
        <h2>How learning works here</h2>
        <p>Six steps, repeated for every topic — the same rhythm top students use.</p>
      </div>
      <div class="steps">
        <div class="step"><span class="step-num">01 — Discover</span><h3>Find your topic</h3><p>Browse subjects, follow your curriculum's levels and years, or search for exactly what you need.</p></div>
        <div class="step"><span class="step-num">02 — Learn</span><h3>Read the lesson</h3><p>Clear explanations, worked examples and diagrams — like a great textbook that respects your time.</p></div>
        <div class="step"><span class="step-num">03 — Practice</span><h3>Try it yourself</h3><p>Run real Python in your browser, answer practice questions, and check your reasoning.</p></div>
        <div class="step"><span class="step-num">04 — Test</span><h3>Take the quiz</h3><p>Scored quizzes with explanations show what you've actually understood.</p></div>
        <div class="step"><span class="step-num">05 — Track</span><h3>Mark complete</h3><p>Tick off finished lessons and watch your path through each chapter fill in.</p></div>
        <div class="step"><span class="step-num">06 — Continue</span><h3>Keep going</h3><p>Every lesson points to the next one — you'll always know exactly where to go next.</p></div>
      </div>
      <div style="margin-top:56px;">
        <a class="btn btn-primary btn-large" href="#/subjects">Start learning</a>
      </div>
    </div>
  </section>`;
}

/* ---------------- page: subjects index ---------------- */
function pageSubjects() {
  const cards = Object.keys(SUBJECTS).map(slug => {
    const s = SUBJECTS[slug];
    const lessonCount = s.chapters.reduce((n, c) => n + c.lessons.length, 0);
    return '<a class="card" href="#/subjects/' + slug + '">' +
      '<div class="card-icon" aria-hidden="true">' + s.icon + "</div>" +
      "<h3>" + esc(s.name) + "</h3><p>" + esc(s.tagline) + "</p>" +
      '<span class="card-meta">' + s.chapters.length + " chapters · " + lessonCount + " lessons</span>" +
      '<span class="card-link">Open subject →</span></a>';
  }).join("");

  return `
  <section class="page-hero"><div class="container">
    <span class="crumb"><a href="#/">Home</a> / Subjects</span>
    <h1>Subjects</h1>
    <p class="lede">Every subject below is a real, browsable course — chapters, lessons, practice and quizzes included.</p>
  </div></section>
  <section class="section"><div class="container">
    <div class="card-grid">${cards}</div>
  </div></section>`;
}

/* ---------------- page: subject ---------------- */
function pageSubject(slug) {
  const s = subjectOf(slug);
  if (!s) return pageNotFound();

  const chapters = s.chapters.map((ch, i) => {
    const n = ch.lessons.length;
    const inner = n
      ? '<a class="chapter-row" href="' + chapterUrl(slug, ch.id) + '">'
      : '<div class="chapter-row">';
    return inner +
      '<span class="chapter-num">Chapter ' + (i + 1) + "</span>" +
      "<div><h3>" + esc(ch.title) + "</h3><p>" + esc(ch.desc) + "</p></div>" +
      '<span class="lesson-count">' + (n ? n + (n === 1 ? " lesson" : " lessons") : "Outline — lessons coming soon") + "</span>" +
      (n ? "</a>" : "</div>");
  }).join("");

  const learn = (s.learn || []).map(x => "<li>" + esc(x) + "</li>").join("");

  return `
  <section class="page-hero"><div class="container">
    <span class="crumb"><a href="#/">Home</a> / <a href="#/subjects">Subjects</a> / ${esc(s.name)}</span>
    <h1><span aria-hidden="true">${s.icon}</span> ${esc(s.name)}</h1>
    <p class="lede">${esc(s.intro)}</p>
  </div></section>
  <section class="section"><div class="container">
    <div class="section-head">
      <span class="eyebrow">What you'll learn</span>
      <h2>Inside this subject</h2>
    </div>
    <ul class="learn-list" style="margin-bottom:64px;">${learn}</ul>
    <div class="section-head">
      <span class="eyebrow">Chapters</span>
      <h2>Chapters</h2>
    </div>
    <div class="chapter-list">${chapters}</div>
  </div></section>`;
}

/* ---------------- page: chapter ---------------- */
function pageChapter(subjectSlug, chapterId) {
  const s = subjectOf(subjectSlug);
  const ch = chapterOf(subjectSlug, chapterId);
  if (!s || !ch) return pageNotFound();

  const lessons = ch.lessons.map((l, i) => {
    const key = lessonKey(subjectSlug, chapterId, l.id);
    const done = state.completed.has(key);
    return '<a class="chapter-row" href="' + lessonUrl(subjectSlug, chapterId, l.id) + '">' +
      '<span class="chapter-num">' + String(i + 1).padStart(2, "0") + "</span>" +
      "<div><h3>" + esc(l.title) + (done ? ' <span style="color:var(--accent-dark)">✓</span>' : "") + "</h3>" +
      "<p>" + esc(l.lede) + "</p></div>" +
      '<span class="lesson-count">Lesson ' + (i + 1) + "</span></a>";
  }).join("");

  const doneCount = ch.lessons.filter(l => state.completed.has(lessonKey(subjectSlug, chapterId, l.id))).length;
  const pct = ch.lessons.length ? Math.round(doneCount / ch.lessons.length * 100) : 0;

  return `
  <section class="page-hero"><div class="container">
    <span class="crumb"><a href="#/">Home</a> / <a href="#/subjects">Subjects</a> / <a href="#/subjects/${subjectSlug}">${esc(s.name)}</a> / ${esc(ch.title)}</span>
    <h1>${esc(ch.title)}</h1>
    <p class="lede">${esc(ch.desc)}</p>
    ${ch.lessons.length ? '<div style="max-width:420px;margin-top:28px;"><div style="font-size:14px;color:var(--muted);font-weight:600;">' + doneCount + " of " + ch.lessons.length + " lessons complete</div><div class='progress-bar'><div style='width:" + pct + "%'></div></div></div>" : ""}
  </div></section>
  <section class="section"><div class="container">
    <div class="section-head">
      <span class="eyebrow">Lessons</span>
      <h2>Lessons in this chapter</h2>
    </div>
    ${lessons.length ? '<div class="chapter-list">' + lessons + "</div>" : '<p class="empty-note">Lessons for this chapter are being written — check back soon.</p>'}
  </div></section>`;
}

/* ---------------- page: curriculums index ---------------- */
function pageCurriculums() {
  const cards = Object.keys(CURRICULA).map(slug => {
    const c = CURRICULA[slug];
    return '<a class="card" href="#/curriculums/' + slug + '">' +
      "<h3>" + esc(c.name) + "</h3>" +
      '<p class="card-meta">' + esc(c.tagline) + "</p>" +
      "<p>" + esc(c.desc) + "</p>" +
      '<span class="card-link">Explore curriculum →</span></a>';
  }).join("");

  return `
  <section class="page-hero"><div class="container">
    <span class="crumb"><a href="#/">Home</a> / Curriculums</span>
    <h1>Curriculums</h1>
    <p class="lede">Pick the system you study in. Each curriculum keeps its own levels, years and grades — exactly as your school organises them.</p>
  </div></section>
  <section class="section"><div class="container">
    <div class="card-grid two">${cards}</div>
  </div></section>`;
}

/* ---------------- page: curriculum drill-down ---------------- */
function pageCurriculum(slug, query) {
  const c = CURRICULA[slug];
  if (!c) return pageNotFound();

  const li = query.level !== undefined ? parseInt(query.level, 10) : null;
  const yi = query.year !== undefined ? parseInt(query.year, 10) : null;

  // Level 3: year -> subjects -> chapters
  if (li !== null && yi !== null && c.levels[li] && c.levels[li].years[yi]) {
    const level = c.levels[li];
    const year = c.levels[li].years[yi];
    const subjectCards = year.subjects.map(ss => {
      const s = subjectOf(ss);
      if (!s) return "";
      const chapters = s.chapters.filter(ch => ch.lessons.length).map(ch =>
        '<a class="chip" href="' + chapterUrl(ss, ch.id) + '">' + esc(ch.title) + "</a>"
      ).join("");
      return '<div class="card"><div class="card-icon" aria-hidden="true">' + s.icon + "</div>" +
        "<h3>" + esc(s.name) + "</h3><p>" + esc(s.tagline) + "</p>" +
        (chapters ? '<div class="chip-row" style="margin-top:4px;">' + chapters + "</div>" : "") +
        '<a class="card-link" href="#/subjects/' + ss + '">Open subject page →</a></div>';
    }).join("");

    return `
    <section class="page-hero"><div class="container">
      <span class="crumb"><a href="#/">Home</a> / <a href="#/curriculums">Curriculums</a> / <a href="#/curriculums/${slug}">${esc(c.name)}</a> / ${esc(level.name)} / ${esc(year.name)}</span>
      <h1>${esc(year.name)}</h1>
      <p class="lede">${esc(c.name)} · ${esc(level.name)} — choose a subject, then a chapter, to start learning.</p>
    </div></section>
    <section class="section"><div class="container">
      <div class="card-grid">${subjectCards}</div>
    </div></section>`;
  }

  // Level 2: level -> years
  if (li !== null && c.levels[li]) {
    const level = c.levels[li];
    const years = level.years.map((y, i) =>
      '<a class="year-pill" href="#/curriculums/' + slug + "?level=" + li + "&year=" + i + '">' + esc(y.name) + "</a>"
    ).join("");
    return `
    <section class="page-hero"><div class="container">
      <span class="crumb"><a href="#/">Home</a> / <a href="#/curriculums">Curriculums</a> / <a href="#/curriculums/${slug}">${esc(c.name)}</a> / ${esc(level.name)}</span>
      <h1>${esc(level.name)}</h1>
      <p class="lede">${esc(level.desc)}</p>
    </div></section>
    <section class="section"><div class="container">
      <div class="section-head"><span class="eyebrow">Choose</span><h2>Pick your year</h2></div>
      <div class="year-pills">${years}</div>
    </div></section>`;
  }

  // Level 1: curriculum -> levels
  const levels = c.levels.map((l, i) => {
    const yearPills = l.years.map((y, j) =>
      '<a class="chip" href="#/curriculums/' + slug + "?level=" + i + "&year=" + j + '">' + esc(y.name) + "</a>"
    ).join("");
    return '<div class="card"><h3>' + esc(l.name) + "</h3><p>" + esc(l.desc) + "</p>" +
      '<div class="chip-row" style="margin-top:4px;"><span class="chip-hint">Years:</span>' + yearPills + "</div></div>";
  }).join("");

  return `
  <section class="page-hero"><div class="container">
    <span class="crumb"><a href="#/">Home</a> / <a href="#/curriculums">Curriculums</a> / ${esc(c.name)}</span>
    <h1>${esc(c.name)}</h1>
    <p class="lede">${esc(c.desc)}</p>
  </div></section>
  <section class="section"><div class="container">
    <div class="section-head"><span class="eyebrow">Structure</span><h2>Levels</h2><p>Each level organises its own years — pick one to see subjects and chapters.</p></div>
    <div class="level-grid">${levels}</div>
  </div></section>`;
}

/* ---------------- page: learning paths ---------------- */
function pagePaths() {
  const cards = LEARNING_PATHS.map(p =>
    '<a class="card" href="' + lessonUrl(p.subject, p.chapter, p.firstLesson) + '">' +
    "<h3>" + esc(p.title) + "</h3>" +
    '<p class="card-meta">' + esc(p.meta) + "</p>" +
    "<p>" + esc(p.desc) + "</p>" +
    '<span class="card-link">Start the path →</span></a>'
  ).join("");

  return `
  <section class="page-hero"><div class="container">
    <span class="crumb"><a href="#/">Home</a> / Learning Paths</span>
    <h1>Learning Paths</h1>
    <p class="lede">Curated sequences of lessons that take you from zero to capable — follow them in order and don't skip the practice.</p>
  </div></section>
  <section class="section"><div class="container">
    <div class="card-grid two">${cards}</div>
  </div></section>`;
}

/* ---------------- page: search ---------------- */
function searchIndex() {
  const q = (parseHash().query.q || "").toLowerCase().trim();
  if (!q) return { q: "", subjects: [], chapters: [], lessons: [] };

  const subjects = [], chapters = [], lessons = [];
  Object.keys(SUBJECTS).forEach(slug => {
    const s = SUBJECTS[slug];
    if ((s.name + " " + s.tagline + " " + s.intro).toLowerCase().includes(q))
      subjects.push({ slug, name: s.name, tagline: s.tagline });
    s.chapters.forEach(ch => {
      if ((ch.title + " " + ch.desc).toLowerCase().includes(q))
        chapters.push({ slug, chId: ch.id, title: ch.title, desc: ch.desc, subjectName: s.name });
      ch.lessons.forEach(l => {
        const hay = (l.title + " " + l.lede).toLowerCase();
        if (hay.includes(q))
          lessons.push({ slug, chId: ch.id, lId: l.id, title: l.title, lede: l.lede, subjectName: s.name, chapterTitle: ch.title });
      });
    });
  });
  return { q, subjects, chapters, lessons };
}

function pageSearch() {
  const { q, subjects, chapters, lessons } = searchIndex();

  const sHtml = subjects.map(r =>
    '<a class="result-item" href="#/subjects/' + r.slug + '"><span class="r-kind">Subject</span>' +
    '<span class="r-title">' + esc(r.name) + '</span><span class="r-path">' + esc(r.tagline) + "</span></a>"
  ).join("");

  const cHtml = chapters.map(r =>
    '<a class="result-item" href="' + chapterUrl(r.slug, r.chId) + '"><span class="r-kind">Chapter · ' + esc(r.subjectName) + "</span>" +
    '<span class="r-title">' + esc(r.title) + '</span><span class="r-path">' + esc(r.desc) + "</span></a>"
  ).join("");

  const lHtml = lessons.map(r =>
    '<a class="result-item" href="' + lessonUrl(r.slug, r.chId, r.lId) + '"><span class="r-kind">Lesson · ' + esc(r.subjectName) + " · " + esc(r.chapterTitle) + "</span>" +
    '<span class="r-title">' + esc(r.title) + '</span><span class="r-path">' + esc(r.lede) + "</span></a>"
  ).join("");

  const total = subjects.length + chapters.length + lessons.length;
  const results = q
    ? (total
      ? '<p style="color:var(--muted);font-size:18px;margin-bottom:40px;">' + total + " result" + (total === 1 ? "" : "s") + ' for “' + esc(q) + "”</p>" +
        (subjects.length ? '<div class="result-group"><h3>Subjects</h3>' + sHtml + "</div>" : "") +
        (chapters.length ? '<div class="result-group"><h3>Chapters</h3>' + cHtml + "</div>" : "") +
        (lessons.length ? '<div class="result-group"><h3>Lessons</h3>' + lHtml + "</div>" : "")
      : '<p class="empty-note">No results for “' + esc(q) + "”. Try “loops”, “algebra”, “cells”, “atoms” or “demand”.")
    : '<p class="empty-note">Type above to search across all subjects, chapters and lessons.</p>';

  return `
  <section class="page-hero"><div class="container">
    <span class="crumb"><a href="#/">Home</a> / Search</span>
    <h1>Search</h1>
    <div class="search-page-box" style="margin-top:32px;">
      <form data-search-form>
        <div class="search-row">
          <input type="search" name="q" placeholder="What do you want to learn?" value="${esc(q)}" autocomplete="off" aria-label="Search lessons">
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  </div></section>
  <section class="section" style="padding-top:48px;"><div class="container">
    ${results}
  </div></section>`;
}

/* ---------------- page: lesson ---------------- */
function pageLesson(subjectSlug, chapterId, lessonId) {
  const s = subjectOf(subjectSlug);
  const ch = chapterOf(subjectSlug, chapterId);
  const lesson = lessonOf(subjectSlug, chapterId, lessonId);
  if (!s || !ch || !lesson) return pageNotFound();

  markRecent(subjectSlug, chapterId, lessonId);

  const idx = ch.lessons.findIndex(l => l.id === lessonId);
  const prev = idx > 0 ? ch.lessons[idx - 1] : null;
  const next = idx < ch.lessons.length - 1 ? ch.lessons[idx + 1] : null;

  // Sidebar
  const sideItems = ch.lessons.map((l, i) => {
    const key = lessonKey(subjectSlug, chapterId, l.id);
    const done = state.completed.has(key);
    return '<li><a href="' + lessonUrl(subjectSlug, chapterId, l.id) + '"' +
      (l.id === lessonId ? ' class="current" aria-current="page"' : "") + ">" +
      '<span class="lesson-num">' + String(i + 1).padStart(2, "0") + "</span>" +
      "<span>" + esc(l.title) + "</span>" +
      (done ? '<span class="done-dot">✓</span>' : "") + "</a></li>";
  }).join("");

  const key = lessonKey(subjectSlug, chapterId, lessonId);
  const done = state.completed.has(key);

  const nextCard = next
    ? '<a class="next-lesson-card" href="' + lessonUrl(subjectSlug, chapterId, next.id) + '">' +
      '<div><span class="nl-kicker">Next lesson</span><h3>' + esc(next.title) + "</h3></div>" +
      '<span class="nl-arrow" aria-hidden="true">→</span></a>'
    : '<a class="next-lesson-card" href="' + chapterUrl(subjectSlug, chapterId) + '">' +
      '<div><span class="nl-kicker">Chapter complete</span><h3>Back to ' + esc(ch.title) + "</h3></div>" +
      '<span class="nl-arrow" aria-hidden="true">→</span></a>';

  return `
  <div class="container">
    <div class="learn-layout">
      <aside class="learn-sidebar" aria-label="Chapter lessons">
        <div class="sidebar-subject">${esc(s.name)}</div>
        <div class="sidebar-chapter">${esc(ch.title)}</div>
        <ul class="sidebar-list">${sideItems}</ul>
      </aside>
      <article class="lesson-body">
        <div class="breadcrumb">
          <a href="#/">Home</a> · <a href="#/subjects/${subjectSlug}">${esc(s.name)}</a> ·
          <a href="${chapterUrl(subjectSlug, chapterId)}">${esc(ch.title)}</a>
        </div>
        <h1>${esc(lesson.title)}</h1>
        <p class="lesson-lede">${esc(lesson.lede)}</p>
        <div class="lesson-content">${renderBlocks(lesson.blocks)}</div>
        <div class="lesson-footer">
          <div class="complete-row">
            <button class="complete-btn${done ? " done" : ""}" data-complete="${key}"${done ? " disabled" : ""}>${done ? "✓ Completed" : "Mark lesson complete"}</button>
            <span class="complete-note">${done ? "Nice work — this resets when you reload the page." : "Track your progress through this chapter (session only)."}</span>
          </div>
          ${nextCard}
        </div>
      </article>
    </div>
  </div>`;
}

/* ---------------- 404 ---------------- */
function pageNotFound() {
  return `
  <section class="page-hero"><div class="container">
    <h1>Page not found</h1>
    <p class="lede">That page doesn't exist — but there's plenty to learn. <a href="#/subjects">Browse subjects</a> or <a href="#/">go home</a>.</p>
  </div></section>`;
}

/* ---------------- router ---------------- */
const app = document.getElementById("app");

function setActiveNav(parts) {
  const map = { subjects: 1, curriculums: 2, paths: 3, search: 4 };
  document.querySelectorAll(".main-nav a").forEach(a => a.classList.remove("active"));
  const idx = map[parts[0]];
  if (idx !== undefined) {
    const links = document.querySelectorAll(".main-nav a");
    if (links[idx]) links[idx].classList.add("active");
  }
}

function render() {
  const { parts, query } = parseHash();
  let html;

  if (parts.length === 0) {
    html = pageHome();
  } else if (parts[0] === "subjects" && parts.length === 1) {
    html = pageSubjects();
  } else if (parts[0] === "subjects" && parts[1]) {
    html = pageSubject(parts[1]);
  } else if (parts[0] === "chapter" && parts[1] && parts[2]) {
    html = pageChapter(parts[1], parts[2]);
  } else if (parts[0] === "learn" && parts[1] && parts[2] && parts[3]) {
    html = pageLesson(parts[1], parts[2], parts[3]);
  } else if (parts[0] === "curriculums" && parts.length === 1) {
    html = pageCurriculums();
  } else if (parts[0] === "curriculums" && parts[1]) {
    html = pageCurriculum(parts[1], query);
  } else if (parts[0] === "paths") {
    html = pagePaths();
  } else if (parts[0] === "search") {
    html = pageSearch();
  } else {
    html = pageNotFound();
  }

  app.innerHTML = html;
  setActiveNav(parts);
  wireInteractions(app);
  window.scrollTo(0, 0);
}

/* ---------------- init ---------------- */
window.addEventListener("hashchange", render);

// Mobile nav toggle
document.addEventListener("click", e => {
  const toggle = e.target.closest(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  } else if (nav && nav.classList.contains("open") && !e.target.closest(".main-nav")) {
    nav.classList.remove("open");
  }
});

render();
