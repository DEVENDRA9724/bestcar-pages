import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";
const load = (name) =>
  JSON.parse(
    readFileSync(new URL(`../data/${name}.json`, import.meta.url), "utf8"),
  );
const products = load("products"),
  categories = load("categories"),
  cars = load("cars");
const paths = [
  "",
  "products/",
  "about/",
  "contact/",
  "privacy-policy/",
  "our-work/",
  "owner/",
  ...products.map((p) => `products/${p.slug}/`),
  ...categories.map((c) => `products/${c.slug}/`),
  ...cars.map((c) => `cars/${c.slug}/`),
];
for (const path of paths)
  assert(
    existsSync(new URL(`../out/${path}index.html`, import.meta.url)),
    `Missing static page: /${path}`,
  );
for (const product of products) {
  const html = readFileSync(
    new URL(`../out/products/${product.slug}/index.html`, import.meta.url),
    "utf8",
  );
  const matches = [
    ...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs),
  ];
  const schema = matches
    .map((m) => JSON.parse(m[1]))
    .find((s) => s["@type"] === "Product");
  assert(schema, `Missing Product schema for ${product.slug}`);
  if (product.price === null)
    assert(
      !schema.offers,
      `Unknown price must not produce an offer: ${product.slug}`,
    );
}
assert(
  existsSync(new URL("../out/robots.txt", import.meta.url)),
  "Missing robots.txt",
);
assert(
  existsSync(new URL("../out/sitemap.xml", import.meta.url)),
  "Missing sitemap",
);
console.log(
  `Static export verified: ${paths.length} pages, ${products.length} Product schemas, sitemap and robots.txt.`,
);
