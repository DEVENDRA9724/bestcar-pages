/** @type {import('next').NextConfig} */
const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || process.env.CF_PAGES_URL || 'http://localhost:3000',
).origin;
const config = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  env: { NEXT_PUBLIC_SITE_URL: siteUrl },
};
export default config;
