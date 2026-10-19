import type { Product } from "./catalogue";
export function priceLabel(price: number | null): string;
export function fittedPrice(product: Product): number | null;
export function productPriceLabel(product: Product): string;
export function fittingLabel(product: Product): string;
