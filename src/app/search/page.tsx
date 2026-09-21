import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import SearchUI from "./SearchUI";

export const metadata = {
  title: "Search",
  description: "Search every lesson, chapter, subject and resource on Thread Academy.",
};

/** Server shell (prerendered) + client search UI inside a Suspense boundary
 *  so useSearchParams() works with a fully static export. */
export default function SearchPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Search" }]}
        title="Search"
        lede="Every lesson, chapter and resource — across all subjects and curricula."
      />
      <div className="subject-overview" style={{ paddingTop: 0 }}>
        <Suspense
          fallback={
            <div className="search-panel">
              <p className="empty">Loading search…</p>
            </div>
          }
        >
          <SearchUI />
        </Suspense>
      </div>
    </>
  );
}
