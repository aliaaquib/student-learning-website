import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { SUBJECT_SLUGS, getSubject } from "@/lib/subjects";
import {
  CURRICULA,
  CURRICULUM_SLUGS,
  allLevelSlugs,
  resolveLevel,
} from "@/lib/curriculum";
import { getContentChapters } from "@/lib/content";

export function generateStaticParams() {
  return SUBJECT_SLUGS.map((subject) => ({ subject }));
}

export async function generateMetadata({ params }: { params: { subject: string } }) {
  const subject = getSubject(params.subject);
  if (!subject) return {};
  return {
    title: subject.name,
    description: subject.intro,
  };
}

/** Preferred entry level per curriculum (reference: defaultLevel). */
const DEFAULT_LEVELS: Record<string, { slug: string; name: string }> = {
  british: { slug: "year-8", name: "Year 8" },
  cambridge: { slug: "igcse", name: "IGCSE" },
  american: { slug: "grade-8", name: "Grade 8" },
  ib: { slug: "myp-3", name: "MYP 3" },
};

/** Entry level for a subject in a curriculum: the preferred default level when
 *  the subject is offered there, otherwise the first level that offers it. */
function entryLevel(curriculumSlug: string, subjectSlug: string): { slug: string; name: string } {
  const preferred = DEFAULT_LEVELS[curriculumSlug];
  if (preferred) {
    const resolved = resolveLevel(curriculumSlug, preferred.slug);
    if (resolved?.subjects.includes(subjectSlug)) return preferred;
  }
  for (const { slug } of allLevelSlugs(curriculumSlug)) {
    const resolved = resolveLevel(curriculumSlug, slug);
    if (resolved?.subjects.includes(subjectSlug)) return { slug, name: resolved.name };
  }
  return preferred ?? { slug: "", name: "" };
}

/** Chapter page URL for a subject+chapter: prefers the level with published
 *  lessons (Cambridge IGCSE first), otherwise the first level offering the
 *  subject — the chapter page renders gracefully when lessons are still being
 *  written. */
function chapterPath(subjectSlug: string, chapterId: string): string {
  const combos = getContentChapters().filter(
    (c) => c.subject === subjectSlug && c.chapter === chapterId
  );
  const preferred =
    combos.find((c) => c.curriculum === "cambridge" && c.level === "igcse") ?? combos[0];
  if (preferred) {
    return `/subjects/${subjectSlug}/${preferred.curriculum}/${preferred.level}/${chapterId}`;
  }
  for (const cSlug of CURRICULUM_SLUGS) {
    for (const { slug } of allLevelSlugs(cSlug)) {
      const resolved = resolveLevel(cSlug, slug);
      if (resolved?.subjects.includes(subjectSlug)) {
        return `/subjects/${subjectSlug}/${cSlug}/${slug}/${chapterId}`;
      }
    }
  }
  return `/subjects/${subjectSlug}`;
}

export default function SubjectPage({ params }: { params: { subject: string } }) {
  const subject = getSubject(params.subject);
  if (!subject) notFound();

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Subjects", href: "/subjects" },
          { label: subject.name },
        ]}
        title={subject.name}
        lede={subject.intro}
      />

      <section className="subject-overview">
        <div className="overview-grid">
          <aside className="overview-aside">
            <h2>What students will learn</h2>
            <ul className="learn-list">
              {subject.learn.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              Choose curriculum and level
            </div>
            <div className="curriculum-grid">
              {CURRICULUM_SLUGS.map((cSlug, i) => {
                const curriculum = CURRICULA[cSlug];
                const level = entryLevel(cSlug, subject.slug);
                return (
                  <Link
                    key={cSlug}
                    className="curriculum-card"
                    href={`/subjects/${subject.slug}/${cSlug}/${level.slug}`}
                  >
                    <span className="curriculum-num">
                      {String(i + 1).padStart(2, "0")} / PATH
                    </span>
                    <h3>{curriculum.name}</h3>
                    <p>
                      {level.name} · {subject.name}
                    </p>
                    <div className="stage-line" aria-hidden="true">
                      <span>Curriculum</span>
                      <span>{level.name}</span>
                      <span>Chapters</span>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="eyebrow" style={{ margin: "54px 0 18px" }}>
              Chapter overview
            </div>
            <div className="chapters">
              {subject.chapters.map((chapter, i) => (
                <Link
                  key={chapter.id}
                  className="chapter-link"
                  href={chapterPath(subject.slug, chapter.id)}
                >
                  <span className="chapter-index">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="chapter-title">{chapter.title}</span>
                    <span className="chapter-desc">{chapter.desc}</span>
                  </span>
                  <span className="chapter-status">Open →</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
