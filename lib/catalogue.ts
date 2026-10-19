import rawProducts from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import carsData from "@/data/cars.json";
import shop from "@/data/shop.json";
export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  images: string[];
  price: number | null;
  mrp: number | null;
  badge?: "Best seller" | "New" | "Sale";
  fitsCars: { brand: string; model: string; years?: string }[];
  universal: boolean;
  specs: { label: string; value: string }[];
  description: string;
  includesFitting: boolean;
  inStock: boolean;
  featured: boolean;
  createdAt: string;
  sample?: boolean;
  fittingPrice?: number | null;
  fittingTime?: string;
  warranty?: string;
};
export const products = rawProducts as Product[];
export const categories = categoriesData;
export const cars = carsData;
export const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const buildWhatsAppLink = (message: string) =>
  `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(message)}`;
export {
  priceLabel,
  fittedPrice,
  productPriceLabel,
  fittingLabel,
} from "./pricing.mjs";
export function productEnquiry(p: Product, car = "my car") {
  return buildWhatsAppLink(
    `Hi, I want a price for ${p.name} for ${car}. Please confirm availability, compatibility and fitting. ${origin}/products/${p.slug}/`,
  );
}
export function fitsCar(p: Product, model: string, brand = "") {
  return (
    p.universal ||
    p.fitsCars.some(
      (c) => (!model || c.model === model) && (!brand || c.brand === brand),
    )
  );
}
