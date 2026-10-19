import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  renameSync,
} from "node:fs";
import { productsFromCSV, productsToCSV } from "../lib/catalogue-csv.mjs";
const data = new URL("../data/", import.meta.url),
  output = new URL("../public/owner/", import.meta.url);
const read = (name) =>
  JSON.parse(readFileSync(new URL(`${name}.json`, data), "utf8"));
let products = read("products");
const source = new URL("products.csv", data);
let csv = "";
if (process.env.PRODUCTS_CSV_URL) {
  const url = new URL(process.env.PRODUCTS_CSV_URL);
  if (url.protocol !== "https:")
    throw new Error("PRODUCTS_CSV_URL must use HTTPS");
  const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
  if (!response.ok)
    throw new Error(`Spreadsheet fetch failed: ${response.status}`);
  csv = await response.text();
} else if (existsSync(source)) csv = readFileSync(source, "utf8");
if (csv) {
  products = productsFromCSV(csv, {
    cars: read("cars"),
    categories: read("categories"),
    previous: products,
  });
  const temporary = new URL("products.import.json", data);
  writeFileSync(temporary, JSON.stringify(products, null, 2) + "\n");
  renameSync(temporary, new URL("products.json", data));
  console.log(`Imported ${products.length} products from spreadsheet CSV.`);
}
mkdirSync(output, { recursive: true });
writeFileSync(new URL("products.csv", output), productsToCSV(products));
