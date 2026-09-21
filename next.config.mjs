/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export only: the whole site is prerendered to out/ — no server needed.
  output: "export",
  // Keep URLs clean (/subjects/mathematics, not /subjects/mathematics.html).
  trailingSlash: false,
  images: { unoptimized: true },
  // MDX lesson content is compiled at build time from content/**/*.mdx
  // via next-mdx-remote (see src/lib/content.ts).
};

export default nextConfig;
