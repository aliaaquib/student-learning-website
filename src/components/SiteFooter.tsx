import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span>
            <span className="logo-mark" aria-hidden="true" />
          </span>
          <span className="logo-text">Thread&nbsp;Academy</span>
          <p className="footer-note">
            A free, open learning library for school students — clear explanations, worked examples and
            interactive practice across every major subject and curriculum.
          </p>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          <Link href="/subjects">Subjects</Link>
          <Link href="/curriculum">Curriculum</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/about">About</Link>
          <Link href="/search">Search</Link>
        </nav>
      </div>
      <div className="container footer-bottom">
        <p>Thread Academy — learn anything. Understand everything. Content is written for learners and shared freely for education.</p>
      </div>
    </footer>
  );
}
