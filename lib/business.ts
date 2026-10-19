import shop from "@/data/shop.json";
import policy from "@/data/service-policy.json";
import rawReviews from "@/data/reviews.json";
import rawInstallations from "@/data/installations.json";
export type CustomerReview = {
  name: string;
  quote: string;
  rating: number;
  sourceUrl: string;
  approved: boolean;
  verified: boolean;
};
export type Installation = {
  title: string;
  car: string;
  accessory: string;
  beforeImage: string;
  afterImage: string;
  caption: string;
  approved: boolean;
};
export const business = shop as typeof shop & {
  googleProfileUrl?: string;
  googleReviewsUrl?: string;
  googleMapsUrl?: string;
  googleProfileVerified?: boolean;
  ratingVerified?: boolean;
  postalCode?: string;
};
export const servicePolicy = policy;
const query = encodeURIComponent(`${business.name}, ${business.address}`);
export const mapsUrl =
  business.googleProfileUrl ||
  business.googleMapsUrl ||
  `https://www.google.com/maps/search/?api=1&query=${query}`;
export const reviewsUrl = business.googleReviewsUrl || mapsUrl;
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
export const approvedReviews = (rawReviews as CustomerReview[]).filter(
  (r) => r.approved && r.verified && r.sourceUrl,
);
export const approvedInstallations = (
  rawInstallations as Installation[]
).filter((i) => i.approved && i.beforeImage && i.afterImage);
export function businessSchema(origin: string) {
  return {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    name: business.name,
    url: origin,
    telephone: business.phone,
    image: `${origin}/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      addressCountry: "IN",
      ...(business.postalCode ? { postalCode: business.postalCode } : {}),
    },
    openingHours: "Mo-Su 09:00-21:00",
    hasMap: mapsUrl,
    ...(business.googleProfileVerified && business.googleProfileUrl
      ? { sameAs: [business.googleProfileUrl] }
      : {}),
    ...(business.ratingVerified
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: Number(business.rating),
            reviewCount: Number(business.reviewCount.replace(/\D/g, "")),
          },
        }
      : {}),
  };
}
