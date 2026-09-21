import Link from "next/link";

export interface SidebarTopic {
  slug: string;
  title: string;
  url: string;
}

/** Sticky .learn-sidebar listing every topic in the chapter. */
export function ChapterSidebar({
  subjectName,
  chapterTitle,
  topics,
  currentSlug,
}: {
  subjectName: string;
  chapterTitle: string;
  topics: SidebarTopic[];
  currentSlug: string;
}) {
  return (
    <aside className="learn-sidebar" aria-label="Chapter lessons">
      <div className="sidebar-subject">{subjectName}</div>
      <div className="sidebar-chapter">{chapterTitle}</div>
      <ol className="sidebar-list">
        {topics.map((t, i) => (
          <li key={t.slug}>
            <Link href={t.url} className={t.slug === currentSlug ? "current" : ""} aria-current={t.slug === currentSlug ? "page" : undefined}>
              <span className="lesson-num">{String(i + 1).padStart(2, "0")}</span>
              <span>{t.title}</span>
            </Link>
          </li>
        ))}
      </ol>
    </aside>
  );
}
