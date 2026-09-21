import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import {
  CURRICULUM_SLUGS,
  curriculumOffersSubject,
  getCurriculum,
} from "@/lib/curriculum";
import { SUBJECT_SLUGS, getSubject } from "@/lib/subjects";
import LevelPicker from "./LevelPicker";

export function generateStaticParams() {
  const params: { subject: string; curriculum: string }[] = [];
  for (const subject of SUBJECT_SLUGS) {
    for (const curriculum of CURRICULUM_SLUGS) {
      if (curriculumOffersSubject(curriculum, subject)) {
        params.push({ subject, curriculum });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { subject: string; curriculum: string };
}) {
  const subject = getSubject(params.subject);
  const curriculum = getCurriculum(params.curriculum);
  if (!subject || !curriculum) return {};
  return {
    title: `${subject.name} — ${curriculum.name}`,
    description: `Choose a ${curriculum.name} level to open the ${subject.name} chapters.`,
  };
}

export default function SubjectCurriculumPage({
  params,
}: {
  params: { subject: string; curriculum: string };
}) {
  const subject = getSubject(params.subject);
  const curriculum = getCurriculum(params.curriculum);
  if (!subject || !curriculum || !curriculumOffersSubject(curriculum.slug, subject.slug)) {
    notFound();
  }

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Subjects", href: "/subjects" },
          { label: subject.name, href: `/subjects/${subject.slug}` },
          { label: curriculum.name },
        ]}
        eyebrow={`${subject.name} · ${curriculum.name}`}
        title="Choose your level"
        lede={`Pick a level to see the ${subject.name} chapters written for the ${curriculum.name} curriculum.`}
      />
      <section className="subject-overview">
        <div className="overview-grid">
          <aside className="overview-aside">
            <h2>Your route</h2>
            <ul className="learn-list">
              <li>{subject.name}</li>
              <li>{curriculum.name}</li>
              <li>Choose a level</li>
              <li>Chapters and topics</li>
            </ul>
          </aside>
          <div>
            <LevelPicker curriculum={curriculum} subject={subject} />
          </div>
        </div>
      </section>
    </>
  );
}
