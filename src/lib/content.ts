import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getChapterTopics } from "./chapters";
import type { TopicWithContent } from "./types";

/** Absolute path to the content/ directory (project root). */
export function contentRoot(): string {
  return path.join(process.cwd(), "content");
}

export interface TopicParams {
  curriculum: string;
  level: string;
  subject: string;
  chapter: string;
  topic: string;
}

function topicFile(p: TopicParams): string {
  return path.join(contentRoot(), p.curriculum, p.level, p.subject, p.chapter, `${p.topic}.mdx`);
}

export function topicExists(p: TopicParams): boolean {
  return fs.existsSync(topicFile(p));
}

export interface TopicContent {
  title: string;
  lede: string;
  source: string;
}

/** Read + parse an MDX topic file (frontmatter: title, lede). */
export function getTopicContent(p: TopicParams): TopicContent | null {
  const file = topicFile(p);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    title: typeof data.title === "string" ? data.title : p.topic,
    lede: typeof data.lede === "string" ? data.lede : "",
    source: content,
  };
}

/** Slugs of topics that actually have MDX files for this chapter. */
export function existingTopicSlugs(p: Omit<TopicParams, "topic">): string[] {
  const dir = path.join(contentRoot(), p.curriculum, p.level, p.subject, p.chapter);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
    .sort();
}

/**
 * Canonical topic metadata (from chapters.ts) filtered to topics that
 * actually have MDX content — so sidebars and lists never link to dead ends.
 */
export function getAvailableTopics(p: Omit<TopicParams, "topic">): TopicWithContent[] {
  const existing = new Set(existingTopicSlugs(p));
  return getChapterTopics(p.chapter)
    .filter((t) => existing.has(t.slug))
    .map((t) => ({
      ...t,
      url: `/subjects/${p.subject}/${p.curriculum}/${p.level}/${p.chapter}/${t.slug}`,
    }));
}

/** Every topic that has an MDX file — for generateStaticParams. */
export function getAllTopicParams(): TopicParams[] {
  const root = contentRoot();
  const out: TopicParams[] = [];
  if (!fs.existsSync(root)) return out;
  for (const curriculum of fs.readdirSync(root)) {
    const cDir = path.join(root, curriculum);
    if (!fs.statSync(cDir).isDirectory()) continue;
    for (const level of fs.readdirSync(cDir)) {
      const lDir = path.join(cDir, level);
      if (!fs.statSync(lDir).isDirectory()) continue;
      for (const subject of fs.readdirSync(lDir)) {
        const sDir = path.join(lDir, subject);
        if (!fs.statSync(sDir).isDirectory()) continue;
        for (const chapter of fs.readdirSync(sDir)) {
          const chDir = path.join(sDir, chapter);
          if (!fs.statSync(chDir).isDirectory()) continue;
          for (const file of fs.readdirSync(chDir)) {
            if (!file.endsWith(".mdx")) continue;
            out.push({ curriculum, level, subject, chapter, topic: file.replace(/\.mdx$/, "") });
          }
        }
      }
    }
  }
  return out;
}

export interface ChapterCombo {
  curriculum: string;
  level: string;
  subject: string;
  chapter: string;
  topicCount: number;
}

/** Every (curriculum, level, subject, chapter) with at least one MDX topic. */
export function getContentChapters(): ChapterCombo[] {
  const seen = new Map<string, ChapterCombo>();
  for (const p of getAllTopicParams()) {
    const key = `${p.curriculum}/${p.level}/${p.subject}/${p.chapter}`;
    const entry = seen.get(key);
    if (entry) entry.topicCount += 1;
    else seen.set(key, { curriculum: p.curriculum, level: p.level, subject: p.subject, chapter: p.chapter, topicCount: 1 });
  }
  return [...seen.values()].sort((a, b) =>
    `${a.subject}${a.curriculum}${a.level}${a.chapter}`.localeCompare(`${b.subject}${b.curriculum}${b.level}${b.chapter}`),
  );
}
