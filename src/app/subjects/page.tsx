import Link from "next/link";
import PageHero from "@/components/PageHero";
import { CATEGORY_ORDER, subjectsByCategory } from "@/lib/subjects";

export const metadata = {
  title: "Subjects",
  description: "Browse all twelve Thread Academy subjects — Mathematics, Sciences, Humanities and Languages.",
};

export default function SubjectsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Subjects" }]}
        title="Subjects"
        lede="Twelve subjects, each organised into chapters and bite-sized lessons. Pick a subject, then choose your curriculum and level."
      />
      <section className="section">
        <div className="container">
          {CATEGORY_ORDER.map((category) => (
            <div key={category} style={{ marginBottom: 64 }}>
              <h2
                style={{
                  fontSize: 15,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--faint)",
                  marginBottom: 24,
                }}
              >
                {category}
              </h2>
              <div className="card-grid">
                {subjectsByCategory(category).map((subject) => (
                  <Link key={subject.slug} className="card" href={`/subjects/${subject.slug}`}>
                    <span className="card-icon" aria-hidden="true">{subject.icon}</span>
                    <span className="card-meta">{subject.chapters.length} chapters</span>
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
    </>
  );
}
