import Link from "next/link";
import { notFound } from "next/navigation";
import StagePicker from "./StagePicker";
import { CURRICULUM_SLUGS, getCurriculum } from "@/lib/curriculum";

export function generateStaticParams() {
  return CURRICULUM_SLUGS.map((curriculum) => ({ curriculum }));
}

export async function generateMetadata({ params }: { params: { curriculum: string } }) {
  const curriculum = getCurriculum(params.curriculum);
  if (!curriculum) return {};
  return { title: `${curriculum.name} curriculum`, description: curriculum.desc };
}

export default function CurriculumPage({ params }: { params: { curriculum: string } }) {
  const curriculum = getCurriculum(params.curriculum);
  if (!curriculum) notFound();

  return (
    <div className="curr-page">
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true"> › </span>
        <Link href="/curriculum">Curriculum</Link>
        <span aria-hidden="true"> › </span>
        <span>{curriculum.name}</span>
      </div>
      <div className="eyebrow">Curriculum structure</div>
      <h1>{curriculum.name}</h1>
      <p className="curr-intro">
        {curriculum.desc} Choose a programme or school stage, then select the level you study.
      </p>
      <StagePicker curriculum={curriculum} />
    </div>
  );
}
