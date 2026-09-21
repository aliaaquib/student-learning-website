import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/mdx-components";
import { Breadcrumbs } from "@/components/textbook/Breadcrumbs";
import { ChapterSidebar } from "@/components/textbook/ChapterSidebar";
import { NextChapter } from "@/components/textbook/NextChapter";
import { getCurriculum, resolveLevel } from "@/lib/curriculum";
import { getChapter, getSubject } from "@/lib/subjects";
import { getAllTopicParams, getAvailableTopics, getTopicContent } from "@/lib/content";

export function generateStaticParams() {
  return getAllTopicParams();
}

export async function generateMetadata({
  params,
}: {
  params: { subject: string; curriculum: string; level: string; chapter: string; topic: string };
}) {
  const content = getTopicContent(params);
  const subject = getSubject(params.subject);
  if (!content || !subject) return {};
  return {
    title: `${content.title} — ${subject.name}`,
    description: content.lede || content.title,
  };
}

export default function TopicPage({
  params,
}: {
  params: { subject: string; curriculum: string; level: string; chapter: string; topic: string };
}) {
  const subject = getSubject(params.subject);
  const chapter = getChapter(params.subject, params.chapter);
  const curriculum = getCurriculum(params.curriculum);
  const level = curriculum ? resolveLevel(params.curriculum, params.level) : null;
  const content = getTopicContent(params);
  if (!subject || !chapter || !curriculum || !level || !content) notFound();

  const levelBase = `/subjects/${params.subject}/${params.curriculum}/${params.level}`;
  const chapterBase = `${levelBase}/${params.chapter}`;
  const topics = getAvailableTopics({
    curriculum: params.curriculum,
    level: params.level,
    subject: params.subject,
    chapter: params.chapter,
  });
  const index = topics.findIndex((t) => t.slug === params.topic);
  const next = index >= 0 ? topics[index + 1] : undefined;

  return (
    <div className="container">
      <div className="learn-layout">
        <ChapterSidebar
          subjectName={subject.name}
          chapterTitle={chapter.title}
          topics={topics}
          currentSlug={params.topic}
        />
        <div className="lesson-body">
          <Breadcrumbs
            items={[
              { label: "Subjects", href: "/subjects" },
              { label: subject.name, href: `/subjects/${subject.slug}` },
              { label: `${curriculum.name} · ${level.name}`, href: levelBase },
              { label: chapter.title, href: chapterBase },
              { label: content.title },
            ]}
          />
          <h1>{content.title}</h1>
          {content.lede && <p className="lesson-lede">{content.lede}</p>}
          <div className="lesson-content">
            <MDXRemote source={content.source} components={mdxComponents} />
          </div>
          <div className="lesson-footer">
            {next ? (
              <NextChapter kicker="Next lesson" title={next.title} href={next.url} />
            ) : (
              <NextChapter kicker="Chapter complete" title={`Back to ${chapter.title}`} href={chapterBase} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
