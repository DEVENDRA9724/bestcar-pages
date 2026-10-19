export const priceLabel = (price) =>
  price === null ? "Call for price" : `From ₹${price.toLocaleString("en-IN")}`;
export function fittedPrice(product) {
  if (product.price === null) return null;
  if (product.includesFitting) return product.price;
  return typeof product.fittingPrice === "number"
    ? product.price + product.fittingPrice
    : null;
}
export function productPriceLabel(product) {
  const fitted = fittedPrice(product);
  return fitted === null
    ? priceLabel(product.price)
    : `${priceLabel(fitted)} fitted`;
}
export function fittingLabel(product) {
  if (product.includesFitting) return "Fitting included";
  if (typeof product.fittingPrice === "number")
    return `Fitting: ₹${product.fittingPrice.toLocaleString("en-IN")}`;
  return "Fitting quoted separately";
}
