import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { CURRICULUM_SLUGS, allLevelSlugs, getCurriculum, resolveLevel } from "@/lib/curriculum";
import { getSubject } from "@/lib/subjects";

export function generateStaticParams() {
  const params: { curriculum: string; level: string }[] = [];
  for (const curriculum of CURRICULUM_SLUGS) {
    for (const { slug: level } of allLevelSlugs(curriculum)) {
      params.push({ curriculum, level });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: { curriculum: string; level: string } }) {
  const curriculum = getCurriculum(params.curriculum);
  const level = curriculum ? resolveLevel(params.curriculum, params.level) : null;
  if (!curriculum || !level) return {};
  return {
    title: `${curriculum.name} ${level.name}`,
    description: `Subjects offered in ${curriculum.name} ${level.name}.`,
  };
}

export default function CurriculumLevelPage({ params }: { params: { curriculum: string; level: string } }) {
  const curriculum = getCurriculum(params.curriculum);
  const level = curriculum ? resolveLevel(params.curriculum, params.level) : null;
  if (!curriculum || !level) notFound();

  const subjects = level.subjects.map((s) => getSubject(s)).filter((s) => s !== null);

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Curriculum", href: "/curriculum" },
          { label: curriculum.name, href: `/curriculum/${curriculum.slug}` },
          { label: level.name },
        ]}
        title={`${curriculum.name} · ${level.name}`}
        lede={`${level.desc} Choose a subject to see its chapters for this level.`}
      />
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Subjects</span>
            <h2>Subjects at this level</h2>
          </div>
          <div className="card-grid">
            {subjects.map((subject) => (
              <Link
                key={subject.slug}
                className="card"
                href={`/subjects/${subject.slug}/${curriculum.slug}/${level.slug}`}
              >
                <span className="card-icon" aria-hidden="true">{subject.icon}</span>
                <h3>{subject.name}</h3>
                <p>{subject.tagline}</p>
                <span className="card-link">View chapters →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
