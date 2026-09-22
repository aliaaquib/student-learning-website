import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { SUBJECT_SLUGS, getSubject } from "@/lib/subjects";
import {
  CURRICULA,
  CURRICULUM_SLUGS,
  curriculumOffersSubject,
} from "@/lib/curriculum";
import { JsonLd, courseJsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return SUBJECT_SLUGS.map((subject) => ({ subject }));
}

export async function generateMetadata({ params }: { params: { subject: string } }) {
  const subject = getSubject(params.subject);
  if (!subject) return {};
  const curricula = CURRICULUM_SLUGS.filter((c) => curriculumOffersSubject(c, subject.slug))
    .map((c) => CURRICULA[c].name)
    .join(", ");
  return pageMetadata({
    title: `${subject.name} lessons, chapters and practice`,
    description: `${subject.tagline ?? subject.intro} Follow ${subject.name} through ${curricula}: levels, chapters, lessons, worked examples and practice — free, no account required.`,
    path: `/subjects/${subject.slug}`,
  });
}

export default function SubjectPage({ params }: { params: { subject: string } }) {
  const subject = getSubject(params.subject);
  if (!subject) notFound();

  return (
    <>
      <JsonLd
        data={courseJsonLd({
          name: `${subject.name} — school lessons and practice`,
          description: subject.intro,
          path: `/subjects/${subject.slug}`,
        })}
      />
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
      </section>
    </>
  );
}
