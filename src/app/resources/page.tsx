import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getContentChapters } from "@/lib/content";
import { getCurriculum, resolveLevel } from "@/lib/curriculum";
import { getChapter, getSubject } from "@/lib/subjects";

export const metadata = {
  title: "Resources",
  description: "Notes, worksheets, videos, interactive tools and revision materials for every chapter.",
};

export default function ResourcesHubPage() {
  const chapters = getContentChapters();
  const bySubject = new Map<string, typeof chapters>();
  for (const c of chapters) {
    const list = bySubject.get(c.subject) ?? [];
    list.push(c);
    bySubject.set(c.subject, list);
  }

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Resources" }]}
        title="Resources"
        lede="Everything that goes with a chapter: study notes, printable-style worksheets, hand-picked video searches, interactive tools and revision checklists."
      />
      <section className="section">
        <div className="container">
          {[...bySubject.entries()].map(([subjectSlug, list]) => {
            const subject = getSubject(subjectSlug);
            if (!subject) return null;
            return (
              <div key={subjectSlug} style={{ marginBottom: 64 }}>
                <h2
                  style={{
                    fontSize: 15,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--faint)",
                    marginBottom: 24,
                  }}
                >
                  {subject.icon} {subject.name}
                </h2>
                <div className="chapter-list">
                  {list.map((c) => {
                    const curriculum = getCurriculum(c.curriculum);
                    const level = curriculum ? resolveLevel(c.curriculum, c.level) : null;
                    const chapter = getChapter(c.subject, c.chapter);
                    if (!curriculum || !level || !chapter) return null;
                    return (
                      <Link
                        key={`${c.curriculum}/${c.level}/${c.chapter}`}
                        className="chapter-row"
                        href={`/resources/${c.subject}/${c.curriculum}/${c.level}/${c.chapter}`}
                      >
                        <span className="chapter-num">
                          {curriculum.name} · {level.name}
                        </span>
                        <div>
                          <h3>{chapter.title}</h3>
                          <p>{chapter.desc}</p>
                        </div>
                        <span className="lesson-count">
                          {c.topicCount} lesson{c.topicCount === 1 ? "" : "s"} · resources →
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
