import Link from "next/link";
import PageHero from "@/components/PageHero";
import { CURRICULUM_SLUGS, CURRICULA } from "@/lib/curriculum";

export const metadata = {
  title: "About",
  description: "Why Thread Academy exists, what it provides, and how students use it.",
};

const APPROACH = [
  {
    title: "Understanding before memorising",
    text: "Every lesson explains the why, not just the what. Definitions come with intuition, procedures come with reasoning, and worked examples show the thinking — not just the answer.",
  },
  {
    title: "Small steps, in order",
    text: "Chapters break into short lessons that build on each other. You never need to hold five new ideas at once; each page teaches one thing well.",
  },
  {
    title: "Practice is part of the lesson",
    text: "Reading feels like learning but usually isn't. That's why every lesson embeds practice questions and quizzes with hidden answers — retrieval is what makes knowledge stick.",
  },
  {
    title: "Mistakes are the material",
    text: "Common mistakes get their own callouts. Quizzes explain every wrong answer. Getting it wrong here, where it's free, beats getting it wrong in the exam.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        title="About Thread Academy"
        lede="A free learning library built on a simple belief: any student, anywhere, should be able to understand anything — if it's explained well enough."
      />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Why we exist</span>
            <h2>Textbooks are expensive. Tutors are expensive. Understanding shouldn&rsquo;t be.</h2>
            <p>
              Thread Academy exists to give every student a clear, patient teacher for every subject — one that
              never gets tired, never judges, and is free forever. We write the kind of explanations we wished
              we&rsquo;d had: precise but friendly, rigorous but never intimidating.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What it provides</span>
            <h2>What you&rsquo;ll find here</h2>
          </div>
          <div className="card-grid">
            <div className="card">
              <span className="card-icon" aria-hidden="true">📖</span>
              <h3>Textbook lessons</h3>
              <p>Structured lessons with definitions, explanations, worked examples, diagrams and summaries — written to be read, not skimmed.</p>
            </div>
            <div className="card">
              <span className="card-icon" aria-hidden="true">✏️</span>
              <h3>Practice &amp; quizzes</h3>
              <p>Reveal-answer practice questions and self-marking quizzes built into every lesson, so you test yourself as you go.</p>
            </div>
            <div className="card">
              <span className="card-icon" aria-hidden="true">🧰</span>
              <h3>Resources per chapter</h3>
              <p>Notes, worksheets, video searches, interactive tools — like the equation solver — and revision checklists for every chapter.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Content structure</span>
            <h2>How the library is organised</h2>
            <p>
              Content flows from <strong>subject</strong> → <strong>curriculum</strong> → <strong>level</strong> →{" "}
              <strong>chapter</strong> → <strong>lesson</strong>. Pick your subject, then the curriculum and level
              your school follows, and you&rsquo;ll get chapters and lessons arranged for exactly that stage.
            </p>
          </div>
          <div className="section-head">
            <span className="eyebrow">Curricula supported</span>
            <h2>Four curricula, four structures</h2>
            <p>We don&rsquo;t force every curriculum into one shape — each keeps its own stages and levels.</p>
          </div>
          <div className="card-grid two">
            {CURRICULUM_SLUGS.map((slug) => {
              const c = CURRICULA[slug];
              return (
                <Link key={slug} className="card" href={`/curriculum/${slug}`}>
                  <span className="card-meta">{c.tagline}</span>
                  <h3>{c.name}</h3>
                  <p>
                    {c.stages.map((s) => s.name).join(" → ")}
                  </p>
                  <span className="card-link">Explore curriculum →</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">For students</span>
            <h2>How to use Thread Academy</h2>
          </div>
          <div className="steps">
            <div className="step">
              <span className="step-num">CATCH UP</span>
              <h3>Missed something in class?</h3>
              <p>Search the topic and read the lesson — it starts from zero and builds up, so gaps get filled fast.</p>
            </div>
            <div className="step">
              <span className="step-num">KEEP UP</span>
              <h3>Learning it this term?</h3>
              <p>Follow your curriculum&rsquo;s chapters alongside school, using practice questions to lock each idea in.</p>
            </div>
            <div className="step">
              <span className="step-num">REVISE</span>
              <h3>Exams approaching?</h3>
              <p>Head to a chapter&rsquo;s resources page: revision checklists, worksheets and quizzes in one place.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our approach</span>
            <h2>How we think about education</h2>
          </div>
          <div className="card-grid two">
            {APPROACH.map((item) => (
              <div key={item.title} className="card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
