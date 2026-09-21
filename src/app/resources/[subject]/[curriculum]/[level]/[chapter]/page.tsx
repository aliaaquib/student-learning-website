import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { PracticeItem, PracticeQuestions } from "@/components/textbook/PracticeQuestions";
import EquationSolver from "@/components/widgets/EquationSolver";
import { getCurriculum, resolveLevel } from "@/lib/curriculum";
import { getChapter, getSubject } from "@/lib/subjects";
import { getContentChapters } from "@/lib/content";
import { getChapterResources } from "@/lib/resources";

export function generateStaticParams() {
  return getContentChapters().map((c) => ({
    subject: c.subject,
    curriculum: c.curriculum,
    level: c.level,
    chapter: c.chapter,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { subject: string; curriculum: string; level: string; chapter: string };
}) {
  const subject = getSubject(params.subject);
  const chapter = getChapter(params.subject, params.chapter);
  if (!subject || !chapter) return {};
  return {
    title: `${chapter.title} resources — ${subject.name}`,
    description: `Notes, worksheets, videos, interactive tools and revision materials for ${chapter.title}.`,
  };
}

export default function ChapterResourcesPage({
  params,
}: {
  params: { subject: string; curriculum: string; level: string; chapter: string };
}) {
  const subject = getSubject(params.subject);
  const chapter = getChapter(params.subject, params.chapter);
  const curriculum = getCurriculum(params.curriculum);
  const level = curriculum ? resolveLevel(params.curriculum, params.level) : null;
  if (!subject || !chapter || !curriculum || !level) notFound();

  const resources = getChapterResources(params.subject, params.curriculum, params.level, params.chapter);
  const chapterBase = `/subjects/${params.subject}/${params.curriculum}/${params.level}/${params.chapter}`;

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: `${subject.name} · ${curriculum.name} ${level.name}` },
          { label: `${chapter.title} resources` },
        ]}
        title={`${chapter.title} resources`}
        lede={`${subject.name} · ${curriculum.name} ${level.name}. Notes, worksheets, videos, interactive tools and revision materials for this chapter.`}
      />

      <section className="section">
        <div className="container">
          <div className="resource-anchors">
            <a href="#notes">Notes</a>
            <a href="#worksheets">Worksheets</a>
            <a href="#videos">Videos</a>
            {resources.tools.length > 0 && <a href="#interactive-tools">Interactive tools</a>}
            <a href="#revision">Revision</a>
          </div>

          <div id="notes" style={{ marginBottom: 72, scrollMarginTop: 100 }}>
            <div className="section-head">
              <span className="eyebrow">Notes</span>
              <h2>Study notes</h2>
              <p>The chapter&rsquo;s lessons are the notes — read them in order, then use the resources below.</p>
            </div>
            <div className="chapter-list">
              {resources.notes.map((note, i) => (
                <Link key={note.url} className="chapter-row" href={note.url}>
                  <span className="chapter-num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{note.title}</h3>
                    <p>{note.desc}</p>
                  </div>
                  <span className="lesson-count">Read lesson →</span>
                </Link>
              ))}
            </div>
          </div>

          <div id="worksheets" style={{ marginBottom: 72, scrollMarginTop: 100 }}>
            <div className="section-head">
              <span className="eyebrow">Worksheets</span>
              <h2>Practice worksheet</h2>
              <p>Attempt every question before revealing the answer — that struggle is where learning happens.</p>
            </div>
            {resources.worksheets.length > 0 ? (
              <PracticeQuestions>
                {resources.worksheets.map((w, i) => (
                  <PracticeItem key={i} question={`${i + 1}. ${w.question}`} hint={w.hint}>
                    <p>{w.answer}</p>
                  </PracticeItem>
                ))}
              </PracticeQuestions>
            ) : (
              <p className="empty-note">
                Practice questions live inside each lesson — work through them there, then return for revision.
              </p>
            )}
          </div>

          <div id="videos" style={{ marginBottom: 72, scrollMarginTop: 100 }}>
            <div className="section-head">
              <span className="eyebrow">Videos</span>
              <h2>Watch and learn</h2>
              <p>Hand-picked searches to find a clear video explanation of each lesson.</p>
            </div>
            {resources.videos.map((video) => (
              <a key={video.url} className="video-row" href={video.url} target="_blank" rel="noopener noreferrer">
                <span className="video-play" aria-hidden="true">▶</span>
                <div>
                  <h4>{video.title}</h4>
                  <p>YouTube search · opens in a new tab</p>
                </div>
              </a>
            ))}
          </div>

          {resources.tools.length > 0 && (
            <div id="interactive-tools" style={{ marginBottom: 72, scrollMarginTop: 100 }}>
              <div className="section-head">
                <span className="eyebrow">Interactive tools</span>
                <h2>Try it yourself</h2>
                <p>{resources.tools[0].desc}</p>
              </div>
              <EquationSolver />
            </div>
          )}

          <div id="revision" style={{ scrollMarginTop: 100 }}>
            <div className="section-head">
              <span className="eyebrow">Revision</span>
              <h2>Revision checklist</h2>
              <p>Can you explain each of these out loud, without looking? If not, re-read that lesson.</p>
            </div>
            <ul className="learn-list">
              {resources.revision.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div style={{ marginTop: 48 }}>
              <Link className="chapter-row" href={chapterBase}>
                <div>
                  <h3>Back to {chapter.title}</h3>
                  <p>Return to the chapter&rsquo;s lessons.</p>
                </div>
                <span className="lesson-count">← Lessons</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
