import Link from "next/link";
import type { ReactNode } from "react";

export interface Crumb {
  label: string;
  href?: string;
}

/** page-hero: crumb + big title + lede, per the design. */
export default function PageHero({ crumbs, title, lede }: { crumbs?: Crumb[]; title: ReactNode; lede?: ReactNode }) {
  return (
    <div className="page-hero">
      <div className="container">
        {crumbs && crumbs.length > 0 && (
          <span className="crumb">
            {crumbs.map((c, i) => (
              <span key={i}>
                {i > 0 && " / "}
                {c.href ? <Link href={c.href}>{c.label}</Link> : c.label}
              </span>
            ))}
          </span>
        )}
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
      </div>
    </div>
  );
}
