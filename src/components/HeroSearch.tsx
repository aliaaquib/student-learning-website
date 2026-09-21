"use client";

import { useState } from "react";
import Link from "next/link";
import { openSiteSearch } from "./search-bus";

const QUICK_LINKS = [
  { label: "Linear equations", href: "/subjects/mathematics/british/year-8/algebra/linear-equations" },
  { label: "Cell structure", href: "/subjects/biology/cambridge/igcse/cell-biology/cell-structure" },
  { label: "Newton’s laws", href: "/subjects/physics/cambridge/igcse/forces/newtons-laws" },
  { label: "Variables", href: "/subjects/computer-science/cambridge/igcse/programming/variables" },
];

/** Reference hero search: 2px ink field with inset black button and a 7px
 *  lime hard shadow; submitting opens the search overlay (reference behavior),
 *  with quick links to featured lessons beneath. */
export default function HeroSearch() {
  const [q, setQ] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    openSiteSearch(q.trim());
  }

  return (
    <div className="search-wrap">
      <svg className="search-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </svg>
      <form role="search" onSubmit={submit} style={{ display: "contents" }}>
        <input
          className="hero-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search subjects, chapters, and topics"
          aria-label="Search educational content"
        />
        <button className="search-submit" type="submit">
          Search
        </button>
      </form>
      <div className="quick-links">
        <span>Try:</span>
        {QUICK_LINKS.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
