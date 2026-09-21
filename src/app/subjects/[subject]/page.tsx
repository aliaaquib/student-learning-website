import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { SUBJECT_SLUGS, getSubject } from "@/lib/subjects";
import {
  CURRICULA,
  CURRICULUM_SLUGS,
  curriculumOffersSubject,
} from "@/lib/curriculum";

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
              Choose curriculum
            </div>
            <div className="curriculum-grid">
              {CURRICULUM_SLUGS.filter((cSlug) => curriculumOffersSubject(cSlug, subject.slug)).map(
                (cSlug, i) => {
                  const curriculum = CURRICULA[cSlug];
                  return (
                    <Link
                      key={cSlug}
                      className="curriculum-card"
                      href={`/subjects/${subject.slug}/${cSlug}`}
                    >
                      <span className="curriculum-num">
                        {String(i + 1).padStart(2, "0")} / PATH
                      </span>
                      <h3>{curriculum.name}</h3>
                      <p>
                        {curriculum.stages.map((s) => s.name).join(" · ")}
                      </p>
                      <div className="stage-line" aria-hidden="true">
                        <span>Curriculum</span>
                        <span>Level</span>
                        <span>Chapters</span>
                      </div>
                    </Link>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
