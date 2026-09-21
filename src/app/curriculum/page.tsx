import Link from "next/link";
import PageHero from "@/components/PageHero";
import { CURRICULA, CURRICULUM_SLUGS } from "@/lib/curriculum";

export const metadata = {
  title: "Curricula",
  description: "British, Cambridge, American and IB curricula — each with its own level structure.",
};

export default function CurriculumIndexPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Curriculum" }]}
        title="Curricula"
        lede="Four curricula, four different structures. Thread Academy follows each one's own organisation — stages, years and levels exactly as schools use them."
      />
      <section className="section">
        <div className="container">
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
    </>
  );
}
