import Link from "next/link";
import HeroSearch from "@/components/HeroSearch";
import { CATEGORY_ORDER, subjectsByCategory } from "@/lib/subjects";
import { CURRICULA, CURRICULUM_SLUGS } from "@/lib/curriculum";

const STEPS = [
  {
    num: "01",
    title: "Discover",
    text: "Search any topic — “linear equations”, “Newton's laws” — or browse by subject, curriculum and level until you find exactly what you need.",
  },
  {
    num: "02",
    title: "Learn",
    text: "Read clear, structured textbook lessons: definitions, explanations, worked examples and diagrams, written to be understood — not memorised.",
  },
  {
    num: "03",
    title: "Practice",
    text: "Work through practice questions with hidden answers. Attempt each one yourself first, then reveal the solution to check your thinking.",
  },
  {
    num: "04",
    title: "Test",
    text: "Take short quizzes with instant explanations for every answer, so mistakes become the most useful part of the lesson.",
  },
  {
    num: "05",
    title: "Track",
    text: "Follow the chapter sidebar to keep your place as you move through a topic, lesson by lesson, in a sensible order.",
  },
  {
    num: "06",
    title: "Continue",
    text: "Every lesson links to the next one and to revision resources — notes, worksheets, videos and interactive tools for the chapter.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <span className="hero-kicker">A free learning library</span>
          <h1>
            Learn anything. <span className="accent-word">Understand everything.</span>
          </h1>
          <p className="hero-sub">
            Clear explanations, worked examples and interactive practice across Mathematics, Science,
            Humanities and Languages — aligned with the British, Cambridge, American and IB curricula.
          </p>
          <HeroSearch />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Subjects</span>
            <h2>Explore subjects</h2>
            <p>Twelve subjects, each organised into chapters and bite-sized lessons you can read in any order.</p>
          </div>
          {CATEGORY_ORDER.map((category) => (
            <div key={category} style={{ marginBottom: 64 }}>
              <h3
                style={{
                  fontSize: 15,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--faint)",
                  marginBottom: 24,
                }}
              >
                {category}
              </h3>
              <div className="card-grid">
                {subjectsByCategory(category).map((subject) => (
                  <Link key={subject.slug} className="card" href={`/subjects/${subject.slug}`}>
                    <span className="card-icon" aria-hidden="true">{subject.icon}</span>
                    <h3>{subject.name}</h3>
                    <p>{subject.tagline}</p>
                    <span className="card-link">Explore subject →</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Curricula</span>
            <h2>Learn it your way</h2>
            <p>Every curriculum keeps its own structure — pick the one your school follows.</p>
          </div>
          <div className="card-grid two">
            {CURRICULUM_SLUGS.map((slug) => {
              const c = CURRICULA[slug];
              return (
                <Link key={slug} className="card" href={`/curriculum/${slug}`}>
                  <span className="card-meta">{c.tagline}</span>
                  <h3>{c.name}</h3>
                  <p>{c.desc}</p>
                  <span className="card-link">Explore curriculum →</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How it works</span>
            <h2>A simple loop for learning</h2>
            <p>No accounts, no tracking, no paywalls — just a study loop that works.</p>
          </div>
          <div className="steps">
            {STEPS.map((step) => (
              <div key={step.num} className="step">
                <span className="step-num">STEP {step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
