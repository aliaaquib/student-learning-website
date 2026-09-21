"use client";

import { useState } from "react";

const CHIPS = ["Linear equations", "Newton's laws", "Python variables", "Photosynthesis", "Supply and demand"];

export default function HeroSearch() {
  const [q, setQ] = useState("");

  const go = (query: string) => {
    const trimmed = query.trim();
    window.location.href = trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search";
  };

  return (
    <div className="search-block">
      <span className="search-label">What do you want to learn?</span>
      <form
        className="search-row"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          go(q);
        }}
      >
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try “linear equations”…"
          aria-label="Search lessons"
        />
        <button type="submit">Search</button>
      </form>
      <div className="chip-row">
        <span className="chip-hint">Popular:</span>
        {CHIPS.map((chip) => (
          <a key={chip} className="chip" href={`/search?q=${encodeURIComponent(chip)}`}>
            {chip}
          </a>
        ))}
      </div>
    </div>
  );
}
