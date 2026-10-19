import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { parseCSV, writeCSV } from "../lib/catalogue-csv.mjs";
const data = new URL("../data/", import.meta.url),
  output = new URL("../public/owner/", import.meta.url);
mkdirSync(output, { recursive: true });
const records = (name) => {
  const path = new URL(`${name}.csv`, data);
  if (!existsSync(path)) return null;
  const rows = parseCSV(readFileSync(path, "utf8"));
  if (!rows.length) return [];
  const headers = rows.shift().map((h) => h.trim());
  return rows.map((row, i) => {
    if (row.length !== headers.length)
      throw new Error(`${name} row ${i + 2}: wrong number of columns`);
    return Object.fromEntries(headers.map((h, j) => [h, row[j].trim()]));
  });
};
const flag = (value) =>
  ["true", "yes", "1"].includes(String(value).toLowerCase());
const https = (url, label) => {
  if (url && !/^https:\/\//.test(url))
    throw new Error(`${label} must use HTTPS`);
  return url;
};
const save = (name, value) =>
  writeFileSync(
    new URL(`${name}.json`, data),
    JSON.stringify(value, null, 2) + "\n",
  );
const reviews = records("reviews");
if (reviews)
  save(
    "reviews",
    reviews.map((r, i) => {
      const rating = Number(r.rating);
      if (
        !r.name ||
        !r.quote ||
        !Number.isFinite(rating) ||
        rating < 1 ||
        rating > 5
      )
        throw new Error(
          `Review row ${i + 2}: name, quote and 1–5 rating required`,
        );
      if (flag(r.verified) && !r.source_url)
        throw new Error(
          `Review row ${i + 2}: verified reviews require original source URL`,
        );
      return {
        name: r.name,
        quote: r.quote,
        rating,
        sourceUrl: https(r.source_url, "Review source"),
        approved: flag(r.approved),
        verified: flag(r.verified),
      };
    }),
  );
const installations = records("installations");
if (installations)
  save(
    "installations",
    installations.map((r, i) => {
      if (!r.title || !r.car || !r.accessory)
        throw new Error(
          `Installation row ${i + 2}: title, car and accessory required`,
        );
      for (const path of [r.before_image, r.after_image]) {
        if (path && !path.startsWith("/") && !path.startsWith("https://"))
          throw new Error(`Installation row ${i + 2}: invalid image path`);
        if (
          path?.startsWith("/") &&
          !existsSync(new URL(`../public${path}`, import.meta.url))
        )
          throw new Error(
            `Installation row ${i + 2}: missing local image ${path}`,
          );
      }
      if (flag(r.approved) && (!r.before_image || !r.after_image))
        throw new Error(
          `Installation row ${i + 2}: approved work requires both photos`,
        );
      return {
        title: r.title,
        car: r.car,
        accessory: r.accessory,
        beforeImage: r.before_image,
        afterImage: r.after_image,
        caption: r.caption || "",
        approved: flag(r.approved),
      };
    }),
  );
const settings = records("business-details");
if (settings) {
  const shop = JSON.parse(readFileSync(new URL("shop.json", data), "utf8")),
    policy = JSON.parse(
      readFileSync(new URL("service-policy.json", data), "utf8"),
    );
  for (const row of settings) {
    if (
      ["googleProfileUrl", "googleReviewsUrl", "googleMapsUrl"].includes(
        row.key,
      )
    ) {
      https(row.value, row.key);
      shop[row.key] = row.value;
    } else if (["googleProfileVerified", "ratingVerified"].includes(row.key))
      shop[row.key] = flag(row.value);
    else if (
      ["defaultWarranty", "defaultFittingTime", "quoteNote"].includes(row.key)
    )
      policy[row.key] = row.value;
  }
  if (shop.googleProfileVerified && !shop.googleProfileUrl)
    throw new Error(
      "Provide the exact Google Profile URL before marking it verified",
    );
  save("shop", shop);
  save("service-policy", policy);
}
const reviewHeaders = [
  "name",
  "quote",
  "rating",
  "source_url",
  "approved",
  "verified",
];
const installHeaders = [
  "title",
  "car",
  "accessory",
  "before_image",
  "after_image",
  "caption",
  "approved",
];
for (const [name, headers, rows] of [
  ["reviews", reviewHeaders, reviews || []],
  ["installations", installHeaders, installations || []],
])
  writeFileSync(
    new URL(`${name}.csv`, output),
    writeCSV([headers, ...rows.map((r) => headers.map((h) => r[h] || ""))]),
  );
const shop = JSON.parse(readFileSync(new URL("shop.json", data), "utf8")),
  policy = JSON.parse(
    readFileSync(new URL("service-policy.json", data), "utf8"),
  );
writeFileSync(
  new URL("business-details.csv", output),
  writeCSV([
    ["key", "value"],
    ...[
      "googleProfileUrl",
      "googleReviewsUrl",
      "googleMapsUrl",
      "googleProfileVerified",
      "ratingVerified",
    ].map((key) => [key, shop[key] ?? ""]),
    ...Object.entries(policy),
  ]),
);
