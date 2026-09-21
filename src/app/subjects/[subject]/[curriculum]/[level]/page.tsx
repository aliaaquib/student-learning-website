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
    description: `Follow the ${subject.name} chapters for ${curriculum.name} ${level.name}.`,
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
          { label: subject.name, href: `/subjects/${subject.slug}` },
          { label: curriculum.name, href: `/curriculum/${curriculum.slug}` },
          { label: level.name },
        ]}
        eyebrow={`${subject.name} · ${curriculum.name} · ${level.name}`}
        title={subject.name}
        lede={`Follow the ${subject.name} chapters for ${curriculum.name} ${level.name}. The topics below move from foundations to connected applications.`}
      />
      <section className="subject-overview">
        <div className="overview-grid">
          <aside className="overview-aside">
            <h2>Your route</h2>
            <ul className="learn-list">
              <li>{subject.name}</li>
              <li>{curriculum.name}</li>
              <li>{level.name}</li>
              <li>Chapters and topics</li>
            </ul>
          </aside>
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              Chapters
            </div>
            <div className="chapters">
              {subject.chapters.map((chapter, i) => {
                const topics = getAvailableTopics({
                  curriculum: params.curriculum,
                  level: params.level,
                  subject: params.subject,
                  chapter: chapter.id,
                });
                const href =
                  topics.length > 0
                    ? topics[0].url
                    : `/subjects/${params.subject}/${params.curriculum}/${params.level}/${chapter.id}`;
                return (
                  <Link key={chapter.id} className="chapter-link" href={href}>
                    <span className="chapter-index">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="chapter-title">{chapter.title}</span>
                      <span className="chapter-desc">{chapter.desc}</span>
                    </span>
                    <span className="chapter-status">Read →</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
