import { Suspense } from "react";
import type { Metadata } from "next";
import Catalogue, { CatalogueSkeleton } from "@/components/Catalogue";
export const metadata: Metadata = {
  title: "Car Accessories Catalogue in Mithakhali",
  description:
    "Browse 24 sample car accessories. Filter Android screens, audio, seat covers, lighting and more by car, brand and category. Enquire directly with our Ahmedabad store.",
  alternates: { canonical: "/products/" },
};
export default function Products() {
  return (
    <>
      <section className="page-heading container">
        <span className="eyebrow">GOOD UPGRADES START HERE</span>
        <h1>FIND YOUR NEXT UPGRADE.</h1>
        <p>
          Explore by category, by car, or by what you want to feel on your next
          drive.
        </p>
      </section>
      <Suspense fallback={<CatalogueSkeleton />}>
        <Catalogue />
      </Suspense>
    </>
  );
}
