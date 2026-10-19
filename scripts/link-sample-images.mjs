import { readFileSync, writeFileSync, existsSync } from "node:fs";
const dataUrl = new URL("../data/products.json", import.meta.url);
const products = JSON.parse(readFileSync(dataUrl, "utf8"));
for (const product of products) {
  if (!product.sample) continue;
  const path = `/products/sample-${product.category}.webp`;
  if (existsSync(new URL(`../public${path}`, import.meta.url)))
    product.images = [path];
}
writeFileSync(dataUrl, JSON.stringify(products, null, 2) + "\n");
