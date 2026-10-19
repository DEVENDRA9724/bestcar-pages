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

## Fix the reported deployment failure

The reported log ends with a successful build followed by:

```text
Executing user deploy command: npx wrangler deploy
Missing entry-point to Worker script or to assets directory
```

This is a Workers deployment command. The repository is configured for Pages, and the website has already built successfully. A repository change cannot change the Cloudflare dashboard's selected deployment product.

To deploy through Pages:

1. Open **Workers & Pages → Create application → Pages → Connect to Git**. If the creation screen opens on Workers, switch to the Pages option first.
2. Select GitHub repository **DEVENDRA9724/bestcar** and production branch **main**.
3. Set the build command to **npm run build**, output directory to **out**, and leave the root directory blank.
4. Save and deploy. Pages uploads the output after the build automatically; there is no separate deploy command to enter.
5. Check that the deployment succeeds and open the resulting **pages.dev** address. Check a product page directly as well as the home page.

If the current project's settings require a deploy command such as `npx wrangler deploy`, it is the Workers build flow. Create the Pages project using the steps above. There is no need to delete the existing Worker to complete this setup.

For a separately configured manual Pages upload, the CLI command is `npx wrangler pages deploy out --project-name=bestcar` after building. It requires Cloudflare authentication and an appropriate Pages project. This is not a replacement for setting up Pages Git integration.

References: [Pages Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/) and [Pages direct upload](https://developers.cloudflare.com/pages/get-started/direct-upload/).

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
