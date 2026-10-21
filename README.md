# Best Car Accessories — Upgrade Your Car

Mobile-first, statically generated retail catalogue for the Mithakhali, Ahmedabad store. Built with Next.js 14 App Router, TypeScript, Tailwind CSS, Next Image and Lucide. Prepared for Cloudflare Pages. All enquiries open WhatsApp or a telephone link; there is no cart, checkout, payment processor or customer database.

## Setup

For the owner-friendly workflow, read `OWNER-GUIDE.md` and open `/owner/`. The current product CSV is imported automatically during builds. The site also supports approved installation and review CSVs and a Google profile/service terms sheet; unknown business facts remain blank until supplied.

Use Node.js 20 or later. In this folder:

```sh
npm install
npm run dev
```

Open the local URL printed by Next.js. For production checks:

```sh
npm run build
node scripts/verify-export.mjs
npm start
```

The build validates product data, checks TypeScript, generates the pages and exports the complete site to `out/`. The export verifier checks every catalogue/category/car route and confirms that unquoted products have no price offers in their JSON-LD. `npm start` serves the production export at `http://127.0.0.1:3000`. `npm run typecheck` is also available after the build.

## Pages and source

- `app/page.tsx`: home, categories, car models, featured products, FAQ and reviews/rating block.
- `app/products/page.tsx`: full catalogue with search, filters, sort and load more.
- `app/products/[slug]/page.tsx`: resolves both category slugs and individual product slugs. Next.js cannot have two different dynamic segment names under the same `/products` directory, so a shared route distinguishes them from data.
- `app/cars/[model]/page.tsx`: model landing pages generated from `data/cars.json`.
- `/about/`, `/contact/`, `/privacy-policy/`: supporting pages.
- `components/`: header/footer, enquiry forms, product cards, image gallery, filters, category icons and visit section.
- `lib/catalogue.ts`: product type, data boundary, compatibility logic, price formatting, canonical origin and WhatsApp helpers. This is where a future Sanity or Google Sheets data adapter can be introduced. No CMS connection is currently configured.
- `data/products.json`: 24 illustrative listings, three per category. All prices and MRP are null. `sample: true` keeps the sample notice on product details and avoids asserting stock availability.
- `data/categories.json`, `data/cars.json`, `data/shop.json`: category, vehicle and business references. Displayed shop details in the page/chrome components must also be checked when changing business information.
- `tailwind.config.ts`: all palette tokens. CSS references those tokens through variables.

## Replace placeholder data

The owner must supply:

1. The confirmed brand and exact model/name of every product, category and subcategory. Brand associations in sample listings are illustrative and are not manufacturer product claims.
2. Two to four licensed photos per product on a plain background, plus permission to use them. Place local images under `public/products/` and reference `/products/photo-name.webp` in the JSON. The supplied logo is `public/logo.png`; do not replace it without approval.
3. Actual price or starting price in INR, optional MRP, and whether fitting is included. Leave `price: null` for Call for price.
4. Confirmed compatibility: car brand, model, year range, variant restrictions and any wiring/mounting requirements. Confirm universal suitability and installation requirements separately.
5. Exact specifications, description, stock state and fitting arrangements. `inStock` controls availability on confirmed listings. Leave sample listings marked `sample: true` until verified.
6. The real vehicle models the shop services most, for `data/cars.json` and model pages.
7. Written warranty terms for the actual products and installation. The site does not promise an unverified warranty.
8. Verified Google review quotes, customer display names, permission to publish, and a current rating/review count. No invented customer quotes appear in this site. The supplied approximate 4.9/~1,600 rating is labelled as supplied by the business. AggregateRating is excluded from LocalBusiness JSON-LD until ratingVerified is confirmed.
9. Confirmed address, phone, business hours, exact Google Maps pin, storefront/installation photos and any approved legal/privacy copy.

Replace the stock hero/interior photos before presenting them as shop work. They are automotive inspiration from Unsplash, not photographs of this business or completed installations. Sources: `https://unsplash.com/photos/` image IDs `photo-1555215695-3004980ad54e` and `photo-1612368812851-5f7baf8c0d1d`.

## Add or edit a product

The demo now includes eight AI-generated, unbranded category photographs, shared by the three sample products in each category. They are illustrative placeholders, not photos of actual branded inventory. The optimized WebP files are in `public/products/sample-*.webp`; all originals remain in the Codex generated-images folder. The exact shared prompt and eight subject prompts are recorded in `data/sample-image-prompts.json`. They were made with the built-in image-generation tool. Replace each sample product's images array with its real photos when available. `scripts/link-sample-images.mjs` only changes products that remain marked sample. `scripts/prepare-sample-images.mjs` re-encodes the saved generated originals into WebP without changing their content.

The authoritative product source is now `data/products.csv`. Start with the current CSV from `/owner/`, or the Excel starter workbook, and edit rows without touching code. The build automatically imports CSV into `data/products.json`; direct JSON edits will be overwritten while CSV is present. Developers can use the following JSON shape when writing a different data adapter:

```json
{
  "id": "your-unique-id",
  "slug": "your-confirmed-product-slug",
  "name": "Confirmed product name",
  "brand": "Confirmed brand",
  "category": "android-screens",
  "subcategory": "Android Screens",
  "images": ["/products/front.webp", "/products/back.webp"],
  "price": null,
  "mrp": null,
  "fitsCars": [
    { "brand": "Hyundai", "model": "Creta", "years": "Owner-confirmed years" }
  ],
  "universal": false,
  "specs": [
    { "label": "Screen size", "value": "Owner-confirmed specification" }
  ],
  "description": "Describe the confirmed product and its fitment requirements.",
  "includesFitting": false,
  "inStock": true,
  "featured": false,
  "createdAt": "2026-10-20",
  "sample": false
}
```

Use unique lowercase hyphenated slugs that do not conflict with any category slug. `badge` is optional: Best seller, New or Sale. Assign these only when true. Use numbers for prices, not currency strings. A numeric price displays From ₹X; null displays Call for price. Setting `featured: true` includes the item in the home highlights. Keep eight featured products for the intended layout. The data is static: rebuild and deploy after edits. Do not run `scripts/seed-products.mjs` after replacing data; it overwrites the catalogue with demonstration data.

The catalogue preserves universal items under car filters. Price sorting puts unquoted products after priced products. Numeric price ranges exclude products with unknown prices; Call for price explicitly selects them. The Popular sort puts featured products first, without inventing sales figures.

## Deploy to Cloudflare Pages

Connect `DEVENDRA9724/bestcar-pages` to a Cloudflare Pages project. Use production branch `main`, repository root, build command `npm run build`, and output directory `out`. Node.js 22 is selected by `.node-version`.

If the build succeeds but `npx wrangler deploy` fails with "Missing entry-point", Cloudflare is running the Workers deployment flow. Create a **Pages** application through **Workers & Pages → Create application → Pages → Connect to Git** using the settings above. Pages deploys the build output automatically without a separate deploy command. See the recovery steps in [CLOUDFLARE-PAGES.md](CLOUDFLARE-PAGES.md#fix-the-reported-deployment-failure).

The deployment URL is read from Cloudflare's `CF_PAGES_URL` at build time and embedded for metadata, sitemap and WhatsApp product links. Set `NEXT_PUBLIC_SITE_URL` to your final HTTPS domain to override it. See [CLOUDFLARE-PAGES.md](CLOUDFLARE-PAGES.md) for the complete setup. Verify all contact details, map pin and product content before public launch.

## Accessibility and verification

Native labels, keyboard-operable selects and FAQ accordions, focus outlines, a skip link, native modal filter sheet, descriptive alt text, primary tap targets of at least 48px and reduced-motion support are included. Fonts have system fallbacks. Product photo failures fall back to category illustrations. No looping animations, gradients or glass effects are used. Lighthouse 90+ is a target; no unmeasured score is claimed. Check final owner-supplied imagery and the public host with Lighthouse and real devices.

Forms construct a WhatsApp draft without saving the entered data on this website. Google Maps and Google Fonts are external services. Update the privacy policy if analytics, a CMS, tracking or other services are added.
