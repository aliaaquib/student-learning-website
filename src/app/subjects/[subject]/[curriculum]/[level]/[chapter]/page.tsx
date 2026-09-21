import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { CURRICULUM_SLUGS, allLevelSlugs, getCurriculum, resolveLevel } from "@/lib/curriculum";
import { SUBJECT_SLUGS, getChapter, getSubject } from "@/lib/subjects";
import { getAvailableTopics } from "@/lib/content";

export function generateStaticParams() {
  const params: { subject: string; curriculum: string; level: string; chapter: string }[] = [];
  for (const curriculum of CURRICULUM_SLUGS) {
    for (const { slug: level } of allLevelSlugs(curriculum)) {
      const resolved = resolveLevel(curriculum, level);
      if (!resolved) continue;
      for (const subject of SUBJECT_SLUGS) {
        if (!resolved.subjects.includes(subject)) continue;
        const sub = getSubject(subject);
        if (!sub) continue;
        for (const chapter of sub.chapters) {
          params.push({ subject, curriculum, level, chapter: chapter.id });
        }
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { subject: string; curriculum: string; level: string; chapter: string };
}) {
  const subject = getSubject(params.subject);
  const chapter = getChapter(params.subject, params.chapter);
  const curriculum = getCurriculum(params.curriculum);
  const level = curriculum ? resolveLevel(params.curriculum, params.level) : null;
  if (!subject || !chapter || !curriculum || !level) return {};
  return {
    title: `${chapter.title} — ${subject.name} (${curriculum.name} ${level.name})`,
    description: chapter.desc,
  };
}

export default function ChapterPage({
  params,
}: {
  params: { subject: string; curriculum: string; level: string; chapter: string };
}) {
  const subject = getSubject(params.subject);
  const chapter = getChapter(params.subject, params.chapter);
  const curriculum = getCurriculum(params.curriculum);
  const level = curriculum ? resolveLevel(params.curriculum, params.level) : null;
  if (!subject || !chapter || !curriculum || !level || !level.subjects.includes(subject.slug)) notFound();

  const base = `/subjects/${params.subject}/${params.curriculum}/${params.level}/${params.chapter}`;
  const topics = getAvailableTopics({
    curriculum: params.curriculum,
    level: params.level,
    subject: params.subject,
    chapter: params.chapter,
  });

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Subjects", href: "/subjects" },
          { label: subject.name, href: `/subjects/${subject.slug}` },
          {
            label: `${curriculum.name} · ${level.name}`,
            href: `/subjects/${params.subject}/${params.curriculum}/${params.level}`,
          },
          { label: chapter.title },
        ]}
        title={chapter.title}
        lede={chapter.desc}
      />
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Lessons</span>
            <h2>Lessons in this chapter</h2>
            {topics.length > 0 && (
              <p>
                <Link href={`/resources/${params.subject}/${params.curriculum}/${params.level}/${params.chapter}`}>
                  Chapter resources →
                </Link>{" "}
                — notes, worksheets, videos and interactive tools.
              </p>
            )}
          </div>
          {topics.length > 0 ? (
            <div className="chapter-list">
              {topics.map((topic, i) => (
                <Link key={topic.slug} className="chapter-row" href={topic.url}>
                  <span className="chapter-num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{topic.title}</h3>
                    <p>{topic.desc}</p>
                  </div>
                  <span className="lesson-count">Read lesson →</span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="empty-note">
              Lessons for this chapter are being written — check back soon, or explore another chapter.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
