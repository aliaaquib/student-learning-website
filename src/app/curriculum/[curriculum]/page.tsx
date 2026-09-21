import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { CURRICULUM_SLUGS, getCurriculum } from "@/lib/curriculum";

export function generateStaticParams() {
  return CURRICULUM_SLUGS.map((curriculum) => ({ curriculum }));
}

export async function generateMetadata({ params }: { params: { curriculum: string } }) {
  const curriculum = getCurriculum(params.curriculum);
  if (!curriculum) return {};
  return { title: `${curriculum.name} curriculum`, description: curriculum.desc };
}

export default function CurriculumPage({ params }: { params: { curriculum: string } }) {
  const curriculum = getCurriculum(params.curriculum);
  if (!curriculum) notFound();

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Curriculum", href: "/curriculum" }, { label: curriculum.name }]}
        title={`${curriculum.name} curriculum`}
        lede={curriculum.desc}
      />
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Level structure</span>
            <h2>How {curriculum.name} is organised</h2>
            <p>Pick a stage or a specific year to see the subjects offered at that level.</p>
          </div>
          {curriculum.stages.map((stage) => (
            <div key={stage.slug} style={{ marginBottom: 56 }}>
              <h3 style={{ fontSize: 24, marginBottom: 8 }}>{stage.name}</h3>
              <p style={{ color: "var(--muted)", marginBottom: 20 }}>{stage.desc}</p>
              <div className="year-pills">
                <Link className="year-pill" href={`/curriculum/${curriculum.slug}/${stage.slug}`}>
                  All of {stage.name} →
                </Link>
                {stage.years.map((year) => (
                  <Link key={year.slug} className="year-pill" href={`/curriculum/${curriculum.slug}/${year.slug}`}>
                    {year.name}
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
