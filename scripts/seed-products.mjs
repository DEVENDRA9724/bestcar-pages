import { writeFileSync, readFileSync } from "node:fs";
const cats = JSON.parse(
  readFileSync(new URL("../data/categories.json", import.meta.url)),
);
const cars = JSON.parse(
  readFileSync(new URL("../data/cars.json", import.meta.url)),
);
const names = [
  [
    "9-inch connected touchscreen",
    "10-inch Android display",
    "Compact touchscreen receiver",
  ],
  [
    "Component speaker upgrade",
    "Four-channel amplifier",
    "Coaxial speaker pair",
  ],
  [
    "Tailored comfort seat covers",
    "Dual-tone seat cover set",
    "Easy-care seat cover set",
  ],
  [
    "Cabin ambient lighting kit",
    "Footwell lighting kit",
    "Exterior lighting upgrade",
  ],
  [
    "Front recording dashcam",
    "Dual-channel dashcam",
    "Compact everyday dashcam",
  ],
  ["Rear parking camera", "Wide-view parking camera", "Parking assistance kit"],
  [
    "Heat-control film consultation",
    "Visibility-first film consultation",
    "Cabin comfort film consultation",
  ],
  ["Vehicle-fit floor mat set", "Boot protection mat", "Interior styling kit"],
];
const brands = [
  ["Blaupunkt", "JVC", "Sony"],
  ["JBL", "Pioneer", "Sony"],
  ["Best Car Accessories", "Best Car Accessories", "Best Car Accessories"],
  ["Best Car Accessories", "Best Car Accessories", "Best Car Accessories"],
  ["Blaupunkt", "JVC", "Blaupunkt"],
  ["Blaupunkt", "Best Car Accessories", "Best Car Accessories"],
  ["Best Car Accessories", "Best Car Accessories", "Best Car Accessories"],
  ["Best Car Accessories", "Best Car Accessories", "Best Car Accessories"],
];
const products = cats.flatMap((cat, i) =>
  names[i].map((name, j) => ({
    id: `sample-${i + 1}-${j + 1}`,
    slug: `${cat.slug}-${j + 1}`,
    name,
    brand: brands[i][j],
    category: cat.slug,
    subcategory: cat.name,
    images: [],
    price: null,
    mrp: null,
    ...(j === 1 ? { badge: "New" } : {}),
    fitsCars: [
      cars[(i + j) % cars.length],
      cars[(i + j + 3) % cars.length],
      cars[(i + j + 5) % cars.length],
    ],
    universal: [1, 4].includes(i),
    specs: [
      { label: "Product type", value: cat.name },
      { label: "Selection", value: "Illustrative catalogue sample" },
      {
        label: "Compatibility",
        value: "Confirm model, year and variant with our team",
      },
      {
        label: "Installation",
        value: "In-house fitting available; quote separately",
      },
    ],
    description: `${cat.short}. This ${cat.name.toLowerCase()} listing demonstrates an option you can discuss with our Mithakhali team. The brand, product specifications and fitment shown are illustrative. Ask us to confirm the actual available product and a fitting estimate.`,
    includesFitting: false,
    inStock: false,
    featured: j === 0,
    createdAt: `2026-10-${String(1 + i * 3 + j).padStart(2, "0")}`,
    sample: true,
  })),
);
writeFileSync(
  new URL("../data/products.json", import.meta.url),
  JSON.stringify(products, null, 2) + "\n",
);
