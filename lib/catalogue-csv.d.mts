import type { Product } from "./catalogue";
export const catalogueHeaders: string[];
export function parseCSV(text: string): string[][];
export function writeCSV(rows: unknown[][]): string;
export function productsToCSV(products: Product[]): string;
export function productsFromCSV(
  text: string,
  options: {
    cars: { brand: string; model: string; slug?: string }[];
    categories: { slug: string; name: string }[];
    previous?: Product[];
  },
): Product[];
