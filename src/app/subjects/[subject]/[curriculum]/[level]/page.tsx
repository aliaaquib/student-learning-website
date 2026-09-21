import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { CURRICULUM_SLUGS, allLevelSlugs, getCurriculum, resolveLevel } from "@/lib/curriculum";
import { SUBJECT_SLUGS, getSubject } from "@/lib/subjects";
import { getAvailableTopics } from "@/lib/content";

export function generateStaticParams() {
  const params: { subject: string; curriculum: string; level: string }[] = [];
  for (const curriculum of CURRICULUM_SLUGS) {
    for (const { slug: level } of allLevelSlugs(curriculum)) {
      const resolved = resolveLevel(curriculum, level);
      if (!resolved) continue;
      for (const subject of SUBJECT_SLUGS) {
        if (resolved.subjects.includes(subject)) {
          params.push({ subject, curriculum, level });
        }
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { subject: string; curriculum: string; level: string };
}) {
  const subject = getSubject(params.subject);
  const curriculum = getCurriculum(params.curriculum);
  const level = curriculum ? resolveLevel(params.curriculum, params.level) : null;
  if (!subject || !curriculum || !level) return {};
  return {
    title: `${subject.name} — ${curriculum.name} ${level.name}`,
    description: `${subject.name} chapters for ${curriculum.name} ${level.name}: ${subject.tagline}`,
  };
}

export default function SubjectLevelPage({
  params,
}: {
  params: { subject: string; curriculum: string; level: string };
}) {
  const subject = getSubject(params.subject);
  const curriculum = getCurriculum(params.curriculum);
  const level = curriculum ? resolveLevel(params.curriculum, params.level) : null;
  if (!subject || !curriculum || !level || !level.subjects.includes(subject.slug)) notFound();

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Subjects", href: "/subjects" },
          { label: subject.name, href: `/subjects/${subject.slug}` },
          { label: `${curriculum.name} · ${level.name}` },
        ]}
        title={`${subject.name}`}
        lede={`${curriculum.name} ${level.name} — ${level.desc} Browse the chapters below; each chapter lists its lessons.`}
      />
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Chapters</span>
            <h2>Chapters</h2>
          </div>
          <div className="chapter-list">
            {subject.chapters.map((chapter, i) => {
              const topics = getAvailableTopics({
                curriculum: params.curriculum,
                level: params.level,
                subject: params.subject,
                chapter: chapter.id,
              });
              return (
                <Link
                  key={chapter.id}
                  className="chapter-row"
                  href={`/subjects/${params.subject}/${params.curriculum}/${params.level}/${chapter.id}`}
                >
                  <span className="chapter-num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{chapter.title}</h3>
                    <p>{chapter.desc}</p>
                  </div>
                  <span className="lesson-count">
                    {topics.length > 0 ? `${topics.length} lesson${topics.length === 1 ? "" : "s"}` : "Coming soon"}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
