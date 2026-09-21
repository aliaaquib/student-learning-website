import Link from "next/link";
import type { ReactNode } from "react";

type Crumb = { label: string; href?: string };

export default function PageHero({
  title,
  lede,
  crumbs,
  eyebrow,
}: {
  title: ReactNode;
  lede?: string;
  crumbs?: Crumb[];
  eyebrow?: ReactNode;
}) {
  return (
    <div className="page-hero">
      {crumbs && crumbs.length > 0 && (
        <div className="breadcrumb">
          {crumbs.map((c, i) => (
            <span key={i}>
              {i > 0 && <span aria-hidden="true"> › </span>}
              {c.href ? <Link href={c.href}>{c.label}</Link> : c.label}
            </span>
          ))}
        </div>
      )}
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h1>{title}</h1>
      {lede && <p className="lede">{lede}</p>}
    </div>
  );
}
