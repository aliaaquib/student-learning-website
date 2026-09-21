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
      <div className="subject-overview">
        <div className="overview-grid">
          <aside className="overview-aside">
            <h2>In this chapter</h2>
            <ul className="learn-list">
              <li>
                {topics.length > 0
                  ? `${topics.length} lesson${topics.length === 1 ? "" : "s"}`
                  : "Lessons coming soon"}
              </li>
              <li>Definitions and key ideas</li>
              <li>Worked examples</li>
              <li>Practice questions with answers</li>
              <li>Short quizzes with explanations</li>
            </ul>
          </aside>
          <div>
            <div className="chapters">
              {topics.length > 0 ? (
                topics.map((topic, i) => (
                  <Link key={topic.slug} className="chapter-link" href={topic.url}>
                    <span className="chapter-index">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="chapter-title">{topic.title}</span>
                      <span className="chapter-desc">{topic.desc}</span>
                    </span>
                    <span className="chapter-status">Read lesson →</span>
                  </Link>
                ))
              ) : (
                <p className="empty-note">
                  Lessons for this chapter are being written — check back soon, or explore another chapter.
                </p>
              )}
            </div>
            {topics.length > 0 && (
              <p style={{ marginTop: 28 }}>
                <Link className="inline-link" href={`/resources/${params.subject}/${params.curriculum}/${params.level}/${params.chapter}`}>
                  Chapter resources →
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
