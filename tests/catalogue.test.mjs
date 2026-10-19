import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  productsFromCSV,
  productsToCSV,
  parseCSV,
  writeCSV,
} from "../lib/catalogue-csv.mjs";
import { fittedPrice, productPriceLabel } from "../lib/pricing.mjs";
const read = (name) =>
  JSON.parse(
    readFileSync(new URL(`../data/${name}.json`, import.meta.url), "utf8"),
  );
const products = read("products"),
  options = {
    cars: read("cars"),
    categories: read("categories"),
    previous: products,
  };
test("all 24 products survive the spreadsheet round trip", () => {
  const imported = productsFromCSV(productsToCSV(products), options);
  assert.equal(imported.length, products.length);
  for (let i = 0; i < products.length; i++) {
    for (const key of [
      "id",
      "slug",
      "name",
      "price",
      "includesFitting",
      "universal",
      "sample",
    ])
      assert.deepEqual(imported[i][key], products[i][key]);
    assert.deepEqual(imported[i].images, products[i].images);
    assert.deepEqual(imported[i].specs, products[i].specs);
  }
});
test("CSV preserves quotes, commas, multiline descriptions and UTF-8", () => {
  const p = {
    ...products[0],
    name: 'Screen "Pro", 9-inch',
    description: "Comfort, sound and ₹ pricing\nSecond line",
  };
  const imported = productsFromCSV(productsToCSV([p]), options);
  assert.equal(imported[0].name, p.name);
  assert.equal(imported[0].description, p.description);
});
test("blank price stays unknown while zero fitting cost stays zero", () => {
  const p = {
    ...products[0],
    price: 5000,
    fittingPrice: 0,
    includesFitting: false,
  };
  const result = productsFromCSV(productsToCSV([p]), options)[0];
  assert.equal(result.fittingPrice, 0);
  assert.equal(fittedPrice(result), 5000);
  assert.equal(
    productsFromCSV(productsToCSV([{ ...p, price: null }]), options)[0].price,
    null,
  );
});
test("negative prices and duplicate slugs are rejected", () => {
  assert.throws(
    () =>
      productsFromCSV(productsToCSV([{ ...products[0], price: -1 }]), options),
    /price must/,
  );
  assert.throws(
    () => productsFromCSV(productsToCSV([products[0], products[0]]), options),
    /duplicate/,
  );
});
test("unknown car models and malformed CSV are rejected", () => {
  const rows = parseCSV(productsToCSV([products[0]]));
  rows[1][rows[0].indexOf("car_models")] = "Typo Model";
  assert.throws(
    () => productsFromCSV(writeCSV(rows), options),
    /unknown car model/,
  );
  assert.throws(() => parseCSV('name\n"unclosed'), /Unclosed/);
});
test("fitted price adds installation only when appropriate", () => {
  assert.equal(
    fittedPrice({ price: 5000, includesFitting: false, fittingPrice: 1200 }),
    6200,
  );
  assert.equal(
    fittedPrice({ price: 5000, includesFitting: true, fittingPrice: 1200 }),
    5000,
  );
  assert.equal(
    fittedPrice({ price: 5000, includesFitting: false, fittingPrice: null }),
    null,
  );
  assert.equal(
    productPriceLabel({
      price: null,
      includesFitting: false,
      fittingPrice: 1200,
    }),
    "Call for price",
  );
  assert.equal(
    productPriceLabel({
      price: 5000,
      includesFitting: false,
      fittingPrice: 1200,
    }),
    "From ₹6,200 fitted",
  );
});
