# Deploy Best Car Accessories on Cloudflare Pages

This project is a Next.js static export. It does not require a Worker, Pages Functions, an API key, a database or `@cloudflare/next-on-pages`.

In Cloudflare, open Workers & Pages, create a Pages application, and connect `DEVENDRA9724/bestcar` through the GitHub integration. If already connected, use these settings:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | Next.js (Static HTML Export), or None with the settings below |
| Root directory | Repository root (leave blank) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node.js | 22, selected by `.node-version` |

Use `npm run build`, rather than `npx next build`, because it imports the owner CSVs and validates the catalogue before exporting the website. Cloudflare installs dependencies from `package-lock.json`.

`wrangler.toml` also declares the `out` directory for Pages. Its project name is `bestcar`; if deploying to an existing differently named project with Wrangler, use that project's actual name.

## Website URL

Cloudflare supplies `CF_PAGES_URL` at build time. `next.config.mjs` embeds it into the static client bundle, so metadata, sitemap, structured data and WhatsApp product links use the deployed website rather than the previous private preview.

For a custom domain or a stable production canonical URL, set `NEXT_PUBLIC_SITE_URL` in Cloudflare's environment variables and redeploy. Use the full HTTPS origin without a trailing path. This value overrides `CF_PAGES_URL`. No credentials belong in this public variable.

## Product updates

Edit `data/products.csv` or use `/owner/` to check a CSV exported from Excel or Google Sheets. Commit the confirmed CSV and any new product photographs. A push to the connected production branch triggers Cloudflare's next build and deployment.

For a build-time Google Sheets source, optionally set `PRODUCTS_CSV_URL` to an owner-published HTTPS CSV export. The sheet is read during builds; changing a sheet alone does not trigger a deployment.

## Verify locally

```sh
npm ci
npm test
npm run build
node scripts/verify-export.mjs
npm start
```

The export contains all product, category and car landing pages, plus a real 404 page. Do not add a catch-all redirect to index.html; this is a multi-page static export, not an SPA.

## Owner content still needed

The current catalogue remains labelled as samples. Replace product names, fitment, photos and prices with confirmed inventory. Add approved installation photographs, verified customer quotes, actual warranty/fitting terms and the exact Google Business Profile URL using the sheets described in `OWNER-GUIDE.md`.

Official deployment reference: https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/
