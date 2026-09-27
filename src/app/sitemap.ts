import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { SUBJECT_SLUGS } from "@/lib/subjects";
import { getAllPosts, getPostSlugs } from "@/lib/blog";
import {
  CURRICULUM_SLUGS,
  allLevelSlugs,
  curriculumOffersSubject,
  resolveLevel,
} from "@/lib/curriculum";
import {
  allChapterCombos,
  getAllTopicParams,
  getContentChapters,
  topicFileMtime,
} from "@/lib/content";

/**
 * Generates /sitemap.xml for the static export.
 * Lists every public, indexable page: home, indexes, subjects, curricula,
 * levels, chapters, topics and resource pages. Search is intentionally
 * excluded (it carries a noindex meta tag).
 *
 * lastModified is only set where we know a real date: blog posts use their
 * published date, topic pages use their MDX file's modification time.
 * Index pages omit it rather than faking daily churn.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];
  const add = (
    path: string,
    priority: number,
    lastModified?: Date
  ) =>
    urls.push({
      url: `${SITE_URL}${path}`,
      ...(lastModified ? { lastModified } : {}),
      priority,
    });

  add("/", 1.0);
  add("/subjects", 0.9);
  add("/curriculum", 0.9);
  add("/resources", 0.8);
  add("/blog", 0.8);
  add("/about", 0.5);

  // Blog posts (learning journal) — lastmod = published date.
  const postDates = new Map(getAllPosts().map((p) => [p.slug, p.date]));
  for (const slug of getPostSlugs()) {
    const date = postDates.get(slug);
    add(`/blog/${slug}`, 0.8, date ? new Date(`${date}T00:00:00Z`) : undefined);
  }

  for (const subject of SUBJECT_SLUGS) {
    add(`/subjects/${subject}`, 0.9);
  }

  // Subject category indexes (e.g. /subjects/stem).
  for (const category of ["stem", "humanities", "languages"]) {
    add(`/subjects/${category}`, 0.8);
  }

  for (const curriculum of CURRICULUM_SLUGS) {
    add(`/curriculum/${curriculum}`, 0.9);
    for (const { slug: level } of allLevelSlugs(curriculum)) {
      const resolved = resolveLevel(curriculum, level);
      if (!resolved) continue;
      add(`/curriculum/${curriculum}/${level}`, 0.7);
    }
  }

  // Subject → curriculum → level → chapter → topic routes.
  for (const combo of allChapterCombos()) {
    const { subject, curriculum, level, chapter } = combo;
    if (!curriculumOffersSubject(curriculum, subject)) continue;
    add(`/subjects/${subject}/${curriculum}`, 0.8);
    add(`/subjects/${subject}/${curriculum}/${level}`, 0.8);
    add(`/subjects/${subject}/${curriculum}/${level}/${chapter}`, 0.9);
  }
  for (const t of getAllTopicParams()) {
    add(
      `/subjects/${t.subject}/${t.curriculum}/${t.level}/${t.chapter}/${t.topic}`,
      0.9,
      topicFileMtime(t) ?? undefined
    );
  }

  // Resource pages.
  for (const c of getContentChapters()) {
    add(`/resources/${c.subject}/${c.curriculum}/${c.level}/${c.chapter}`, 0.7);
  }

  // Deduplicate (subject/curriculum and subject/curriculum/level are added
  // once per chapter combo above).
  const seen = new Set<string>();
  return urls.filter((u) => {
    if (seen.has(u.url)) return false;
    seen.add(u.url);
    return true;
  });
}
