export const catalogueHeaders = [
  "id",
  "slug",
  "name",
  "brand",
  "category",
  "price",
  "mrp",
  "includes_fitting",
  "fitting_price",
  "fitting_time",
  "warranty",
  "universal",
  "car_models",
  "in_stock",
  "featured",
  "sample",
  "badge",
  "description",
  "image_1",
  "image_2",
  "image_3",
  "image_4",
  "spec_1_label",
  "spec_1_value",
  "spec_2_label",
  "spec_2_value",
  "spec_3_label",
  "spec_3_value",
  "spec_4_label",
  "spec_4_value",
  "created_at",
];
export function parseCSV(text) {
  const rows = [];
  let row = [],
    cell = "",
    quoted = false;
  const input = text.replace(/^\uFEFF/, "");
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (c === '"') {
      if (quoted && input[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (!quoted && cell.length)
        throw new Error("Unexpected quote in CSV cell");
      else quoted = !quoted;
    } else if (c === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((c === "\n" || c === "\r") && !quoted) {
      if (c === "\r" && input[i + 1] === "\n") i++;
      row.push(cell);
      if (row.some((v) => v.trim())) rows.push(row);
      row = [];
      cell = "";
    } else cell += c;
  }
  if (quoted) throw new Error("Unclosed quoted CSV cell");
  row.push(cell);
  if (row.some((v) => v.trim())) rows.push(row);
  return rows;
}
export function writeCSV(rows) {
  return (
    "\uFEFF" +
    rows
      .map((row) =>
        row
          .map((value) => {
            const text = value == null ? "" : String(value);
            return /[",\r\n]/.test(text)
              ? '"' + text.replace(/"/g, '""') + '"'
              : text;
          })
          .join(","),
      )
      .join("\r\n") +
    "\r\n"
  );
}
export function productsToCSV(products) {
  return writeCSV([
    catalogueHeaders,
    ...products.map((p) => [
      p.id,
      p.slug,
      p.name,
      p.brand,
      p.category,
      p.price,
      p.mrp,
      p.includesFitting,
      p.fittingPrice ?? "",
      p.fittingTime || "",
      p.warranty || "",
      p.universal,
      p.fitsCars.map((c) => c.model).join(", "),
      p.inStock,
      p.featured,
      p.sample ?? false,
      p.badge || "",
      p.description,
      ...Array.from({ length: 4 }, (_, i) => p.images[i] || ""),
      ...Array.from({ length: 4 }, (_, i) => [
        p.specs[i]?.label || "",
        p.specs[i]?.value || "",
      ]).flat(),
      p.createdAt,
    ]),
  ]);
}
export function productsFromCSV(text, { cars, categories, previous = [] }) {
  const rows = parseCSV(text);
  if (rows.length < 2) throw new Error("Add at least one product row");
  const headers = rows[0].map((v) => v.trim().toLowerCase());
  if (new Set(headers).size !== headers.length)
    throw new Error("CSV contains duplicate column headers");
  for (const key of [
    "id",
    "slug",
    "name",
    "brand",
    "category",
    "price",
    "includes_fitting",
    "universal",
    "car_models",
    "sample",
  ])
    if (!headers.includes(key)) throw new Error(`Missing column: ${key}`);
  const ids = new Set(),
    slugs = new Set(categories.map((c) => c.slug));
  return rows.slice(1).map((cells, i) => {
    const row = Object.fromEntries(
      headers.map((h, j) => [h, (cells[j] || "").trim()]),
    );
    const fail = (message) => {
      throw new Error(`Row ${i + 2}: ${message}`);
    };
    if (cells.length !== headers.length)
      fail(`expected ${headers.length} columns, found ${cells.length}`);
    for (const key of [
      "id",
      "slug",
      "name",
      "brand",
      "category",
      "description",
    ])
      if (!row[key]) fail(`${key} is required`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(row.slug))
      fail("slug must use lowercase letters, numbers and hyphens");
    if (ids.has(row.id) || slugs.has(row.slug))
      fail("duplicate ID or product/category slug");
    ids.add(row.id);
    slugs.add(row.slug);
    if (!categories.some((c) => c.slug === row.category))
      fail("unknown category");
    const bool = (key, fallback = false) => {
      const value = (row[key] || "").toLowerCase();
      if (!value) return fallback;
      if (["true", "yes", "1"].includes(value)) return true;
      if (["false", "no", "0"].includes(value)) return false;
      return fail(`${key} must be true/false or yes/no`);
    };
    const number = (key) => {
      const value = row[key];
      if (!value) return null;
      const number = Number(value.replace(/[₹,\s]/g, ""));
      if (!Number.isFinite(number) || number < 0)
        return fail(`${key} must be blank or a nonnegative INR number`);
      return number;
    };
    const models = (row.car_models || "")
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
    const old = previous.find((p) => p.id === row.id);
    const fitsCars = models.map((model) => {
      const car = cars.find(
        (c) => c.model.toLowerCase() === model.toLowerCase(),
      );
      if (!car)
        return fail(`unknown car model ${model}; add it to the car list first`);
      const previousFit = old?.fitsCars.find((c) => c.model === car.model);
      return {
        brand: car.brand,
        model: car.model,
        ...(previousFit?.years ? { years: previousFit.years } : {}),
      };
    });
    const universal = bool("universal");
    if (!universal && !fitsCars.length)
      fail("choose compatible car models or mark universal");
    const images = Array.from(
      { length: 4 },
      (_, j) => row[`image_${j + 1}`] || "",
    ).filter(Boolean);
    for (const image of images)
      if (
        !(image.startsWith("/") && !image.startsWith("//")) &&
        !image.startsWith("https://")
      )
        fail("images must use local /paths or HTTPS URLs");
    const specs = Array.from({ length: 4 }, (_, j) => ({
      label: row[`spec_${j + 1}_label`] || "",
      value: row[`spec_${j + 1}_value`] || "",
    })).filter((s) => {
      if (Boolean(s.label) !== Boolean(s.value))
        fail("each specification needs both a label and value");
      return s.label;
    });
    if (row.badge && !["Best seller", "New", "Sale"].includes(row.badge))
      fail("unknown badge");
    const createdAt =
      row.created_at || old?.createdAt || new Date().toISOString().slice(0, 10);
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(createdAt) ||
      Number.isNaN(Date.parse(createdAt))
    )
      fail("created_at must be YYYY-MM-DD");
    return {
      id: row.id,
      slug: row.slug,
      name: row.name,
      brand: row.brand,
      category: row.category,
      subcategory: categories.find((c) => c.slug === row.category).name,
      images,
      price: number("price"),
      mrp: number("mrp"),
      ...(row.badge ? { badge: row.badge } : {}),
      fitsCars,
      universal,
      specs,
      description: row.description,
      includesFitting: bool("includes_fitting"),
      fittingPrice: number("fitting_price"),
      fittingTime: row.fitting_time || "",
      warranty: row.warranty || "",
      inStock: bool("in_stock"),
      featured: bool("featured"),
      sample: bool("sample", true),
      createdAt,
    };
  });
}
