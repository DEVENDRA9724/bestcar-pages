import { readFileSync, writeFileSync } from "node:fs";
import { productsToCSV } from "../lib/catalogue-csv.mjs";
const products = JSON.parse(
  readFileSync(new URL("../data/products.json", import.meta.url), "utf8"),
);
writeFileSync(
  new URL("../data/products.csv", import.meta.url),
  productsToCSV(products),
);
