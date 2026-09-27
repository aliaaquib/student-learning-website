import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/mdx-components";
import { ChapterSidebar } from "@/components/textbook/ChapterSidebar";
import { getCurriculum, resolveLevel } from "@/lib/curriculum";
import { getSubject } from "@/lib/subjects";
import { getChapterFor } from "@/lib/stage-chapters";
import { getAllTopicParams, getAvailableTopics, getTopicContent } from "@/lib/content";
import { JsonLd, articleJsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

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
  const curriculum = getCurriculum(params.curriculum);
  const level = curriculum ? resolveLevel(params.curriculum, params.level) : null;
  const levelPart = curriculum && level ? ` (${curriculum.name} ${level.name})` : "";
  const levelDesc = curriculum && level ? ` ${curriculum.name} ${level.name} lesson` : " lesson";
  return pageMetadata({
    title: `${content.title} — ${subject.name}${levelPart}`,
    description: content.lede
      ? `${content.lede}${levelDesc} with worked examples and practice.`
      : `${content.title}: a ${subject.name}${levelDesc} with worked examples and practice.`,
    path: `/subjects/${params.subject}/${params.curriculum}/${params.level}/${params.chapter}/${params.topic}`,
    type: "article",
  });
}

export default function TopicPage({
  params,
}: {
  params: { subject: string; curriculum: string; level: string; chapter: string; topic: string };
}) {
  const subject = getSubject(params.subject);
  const chapter = getChapterFor(params.subject, params.curriculum, params.level, params.chapter);
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

  // Previous / next lesson within this chapter, for sequential navigation
  // with descriptive anchor text (helps students and search engines).
  const currentIndex = topics.findIndex((t) => t.slug === params.topic);
  const prevTopic = currentIndex > 0 ? topics[currentIndex - 1] : null;
  const nextTopic =
    currentIndex >= 0 && currentIndex < topics.length - 1 ? topics[currentIndex + 1] : null;

  const crumbs = [
    { label: "Home", href: "/" },
    { label: subject.name, href: `/subjects/${params.subject}` },
    { label: `${curriculum.name} ${level.name}`, href: levelBase },
    { label: chapter.title, href: chapterBase },
    { label: content.title },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: subject.name, path: `/subjects/${params.subject}` },
            {
              name: `${curriculum.name} ${level.name}`,
              path: levelBase,
            },
            { name: chapter.title, path: chapterBase },
            { name: content.title },
          ]),
          articleJsonLd({
            headline: content.title,
            description: content.lede || `${content.title} — a ${subject.name} lesson.`,
            path: `/subjects/${params.subject}/${params.curriculum}/${params.level}/${params.chapter}/${params.topic}`,
            chapter: chapter.title,
          }),
        ]}
      />
      <div className="lesson-layout">
      <ChapterSidebar
        subjectName={subject.name}
        chapterTitle={chapter.title}
        topics={topics}
        currentSlug={params.topic}
        backHref={levelBase}
        backLabel={`${curriculum.name} ${level.name}`}
      />
      <div className="lesson-main">
        {/* Visible breadcrumb trail in the same language as PageHero's,
            matching the BreadcrumbList JSON-LD above. */}
        <nav className="breadcrumb" aria-label="Breadcrumb" style={{ padding: "18px 24px 0" }}>
          {crumbs.map((c, i) => (
            <span key={i}>
              {i > 0 && <span aria-hidden="true"> › </span>}
              {c.href ? <Link href={c.href}>{c.label}</Link> : c.label}
            </span>
          ))}
        </nav>
        <div className="lesson-top">
          <h1>{content.title}</h1>
          {content.lede && <p>{content.lede}</p>}
        </div>
        <article className="lesson-article">
          {/* blockJS:false — our MDX is authored in-repo (trusted); it passes
              arrays/numbers as JSX props (e.g. QuizQuestion options).
              blockDangerousJS stays on (v6 default) as a safety net. */}
          <MDXRemote source={content.source} components={mdxComponents} options={{ blockJS: false }} />
          <div className="lesson-finish">
            {prevTopic && (
              <Link className="next-btn" href={prevTopic.url}>
                ← Previous: {prevTopic.title}
              </Link>
            )}
            {nextTopic && (
              <Link className="next-btn" href={nextTopic.url}>
                Next: {nextTopic.title} →
              </Link>
            )}
            <Link className="next-btn" href={levelBase}>
              Back to {subject.name} chapters
            </Link>
            <Link
              className="next-btn"
              href={`/resources/${params.subject}/${params.curriculum}/${params.level}/${params.chapter}`}
            >
              Related resources →
            </Link>
          </div>
        </article>
      </div>
      </div>
    </>
  );
}
