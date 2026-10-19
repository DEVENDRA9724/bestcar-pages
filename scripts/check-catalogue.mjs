import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";
const load = (name) =>
  JSON.parse(
    readFileSync(new URL(`../data/${name}.json`, import.meta.url), "utf8"),
  );
const products = load("products"),
  categories = load("categories"),
  cars = load("cars");
const slugs = new Set(categories.map((c) => c.slug)),
  ids = new Set();
for (const p of products) {
  const context = `Product ${p.id || p.name || "(unnamed)"}`;
  for (const field of [
    "id",
    "slug",
    "name",
    "brand",
    "category",
    "subcategory",
    "description",
    "createdAt",
  ])
    assert.equal(
      typeof p[field],
      "string",
      `${context}: ${field} must be text`,
    );
  assert(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug),
    `${context}: use a lowercase hyphenated slug`,
  );
  assert(!slugs.has(p.slug), `${context}: duplicate product/category slug`);
  slugs.add(p.slug);
  assert(!ids.has(p.id), `${context}: duplicate ID`);
  ids.add(p.id);
  assert(
    categories.some((c) => c.slug === p.category),
    `${context}: unknown category`,
  );
  for (const field of ["price", "mrp", "fittingPrice"])
    assert(
      p[field] == null ||
        (typeof p[field] === "number" &&
          Number.isFinite(p[field]) &&
          p[field] >= 0),
      `${context}: ${field} must be null or a nonnegative number`,
    );
  for (const field of ["universal", "includesFitting", "inStock", "featured"])
    assert.equal(
      typeof p[field],
      "boolean",
      `${context}: ${field} must be boolean`,
    );
  assert(Array.isArray(p.images), `${context}: images must be an array`);
  for (const image of p.images) {
    assert.equal(
      typeof image,
      "string",
      `${context}: image paths must be strings`,
    );
    assert(
      image.startsWith("/") || image.startsWith("https://"),
      `${context}: use a local absolute path or HTTPS image`,
    );
    if (image.startsWith("/"))
      assert(
        existsSync(new URL(`../public${image}`, import.meta.url)),
        `${context}: local image is missing: ${image}`,
      );
  }
  assert(Array.isArray(p.fitsCars), `${context}: fitsCars must be an array`);
  assert(
    p.universal || p.fitsCars.length > 0,
    `${context}: non-universal products need compatibility details`,
  );
  for (const car of p.fitsCars)
    assert(
      typeof car.brand === "string" && typeof car.model === "string",
      `${context}: invalid compatibility entry`,
    );
  assert(
    Array.isArray(p.specs) &&
      p.specs.every(
        (s) => typeof s.label === "string" && typeof s.value === "string",
      ),
    `${context}: invalid specifications`,
  );
  assert(
    !Number.isNaN(Date.parse(p.createdAt)),
    `${context}: createdAt must be a valid date`,
  );
  assert(
    !p.badge || ["Best seller", "New", "Sale"].includes(p.badge),
    `${context}: unrecognized badge`,
  );
}
assert.equal(
  new Set(cars.map((c) => c.slug)).size,
  cars.length,
  "Car model slugs must be unique",
);
console.log(
  `Catalogue validated: ${products.length} products, ${categories.length} categories, ${cars.length} car pages.`,
);
