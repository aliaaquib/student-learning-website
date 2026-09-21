import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { SUBJECT_SLUGS, getSubject } from "@/lib/subjects";
import { CURRICULA, CURRICULUM_SLUGS, resolveLevel } from "@/lib/curriculum";
import { getContentChapters } from "@/lib/content";

export function generateStaticParams() {
  return SUBJECT_SLUGS.map((subject) => ({ subject }));
}

export async function generateMetadata({ params }: { params: { subject: string } }) {
  const subject = getSubject(params.subject);
  if (!subject) return {};
  return {
    title: subject.name,
    description: subject.tagline,
  };
}

/** Deepest available chapter page for this subject+chapter (prefers Cambridge IGCSE). */
function bestChapterPath(subjectSlug: string, chapterId: string): string | null {
  const combos = getContentChapters().filter((c) => c.subject === subjectSlug && c.chapter === chapterId);
  if (combos.length === 0) return null;
  const preferred =
    combos.find((c) => c.curriculum === "cambridge" && c.level === "igcse") ?? combos[0];
  return `/subjects/${subjectSlug}/${preferred.curriculum}/${preferred.level}/${chapterId}`;
}

export default function SubjectPage({ params }: { params: { subject: string } }) {
  const subject = getSubject(params.subject);
  if (!subject) notFound();

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Subjects", href: "/subjects" }, { label: subject.name }]}
        title={
          <>
            <span aria-hidden="true">{subject.icon} </span>
            {subject.name}
          </>
        }
        lede={subject.intro}
      />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What you&rsquo;ll learn</span>
            <h2>Inside {subject.name}</h2>
          </div>
          <ul className="learn-list" style={{ marginBottom: 72 }}>
            {subject.learn.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="section-head">
            <span className="eyebrow">Chapters</span>
            <h2>Chapters</h2>
            <p>Chapters with published lessons link straight to the lesson list.</p>
          </div>
          <div className="chapter-list" style={{ marginBottom: 88 }}>
            {subject.chapters.map((chapter, i) => {
              const href = bestChapterPath(subject.slug, chapter.id);
              const inner = (
                <>
                  <span className="chapter-num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{chapter.title}</h3>
                    <p>{chapter.desc}</p>
                  </div>
                  {href && <span className="lesson-count">Read lessons →</span>}
                </>
              );
              return href ? (
                <Link key={chapter.id} className="chapter-row" href={href}>
                  {inner}
                </Link>
              ) : (
                <div key={chapter.id} className="chapter-row">
                  {inner}
                </div>
              );
            })}
          </div>

          <div className="section-head">
            <span className="eyebrow">Curriculum &amp; level</span>
            <h2>Choose your curriculum and level</h2>
            <p>Lessons are organised per curriculum. Pick yours to see {subject.name} chapters for your level.</p>
          </div>
          <div className="level-grid">
            {CURRICULUM_SLUGS.map((cSlug) => {
              const curriculum = CURRICULA[cSlug];
              const levels = curriculum.stages.flatMap((stage) => [
                { slug: stage.slug, name: stage.name, stage: true },
                ...stage.years.map((y) => ({ slug: y.slug, name: y.name, stage: false })),
              ]);
              const offered = levels.filter((l) => {
                const resolved = resolveLevel(cSlug, l.slug);
                return resolved?.subjects.includes(subject.slug);
              });
              if (offered.length === 0) return null;
              return (
                <div key={cSlug} className="card">
                  <span className="card-meta">{curriculum.tagline}</span>
                  <h3>{curriculum.name}</h3>
                  <div className="year-pills">
                    {offered.map((l) => (
                      <Link key={l.slug} className="year-pill" href={`/subjects/${subject.slug}/${cSlug}/${l.slug}`}>
                        {l.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
