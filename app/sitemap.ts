import type { MetadataRoute } from "next";
import { origin, products, categories, cars } from "@/lib/catalogue";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/products",
    "/about",
    "/contact",
    "/privacy-policy",
    "/our-work",
    ...products.map((p) => `/products/${p.slug}`),
    ...categories.map((c) => `/products/${c.slug}`),
    ...cars.map((c) => `/cars/${c.slug}`),
  ].map((path) => ({
    url: `${origin}${path}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
