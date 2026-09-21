import Link from "next/link";

export interface RelatedLink {
  title: string;
  href: string;
}

export function RelatedTopics({ items }: { items: RelatedLink[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="chapter-list" style={{ marginTop: 8 }}>
      {items.map((item) => (
        <Link key={item.href} className="chapter-row" href={item.href}>
          <div>
            <h3>{item.title}</h3>
          </div>
          <span className="lesson-count">Read lesson →</span>
        </Link>
      ))}
    </div>
  );
}
