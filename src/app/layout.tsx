import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: {
    default: "Thread Academy — Learn anything. Understand everything.",
    template: "%s — Thread Academy",
  },
  description:
    "A free learning library for school students. Mathematics, Physics, Chemistry, Biology, Computer Science, English, History, Geography, Economics, Business and Languages — aligned with British, Cambridge, American and IB curricula.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
