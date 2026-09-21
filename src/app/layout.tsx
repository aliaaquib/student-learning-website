import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SearchOverlayHost } from "@/components/SearchOverlayHost";

export const metadata: Metadata = {
  title: {
    default: "Thread Academy — Follow the thread. Understand the subject.",
    template: "%s — Thread Academy",
  },
  description:
    "Thread Academy is an open educational knowledge platform for school learning: clear lessons, practice and tests across British, Cambridge, American and IB curricula. No account required.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Newsreader:opsz,wght@6..72,500;6..72,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="shell">
          <SiteHeader />
          <main className="view">{children}</main>
          <SiteFooter />
          <SearchOverlayHost />
        </div>
      </body>
    </html>
  );
}
