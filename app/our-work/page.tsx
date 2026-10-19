import type { Metadata } from "next";
import {
  InstallationGallery,
  FittingPromise,
  VerifiedReviews,
} from "@/components/TrustContent";
export const metadata: Metadata = {
  title: "Installation Work & Fitting in Ahmedabad",
  description:
    "Ask Best Car Accessories for recent installation photos, vehicle-specific fitting advice and a written quote at Mithakhali Circle, Ahmedabad.",
  alternates: { canonical: "/our-work/" },
};
export default function Work() {
  return (
    <>
      <section className="page-heading container">
        <span className="eyebrow">FROM THE WORKSHOP</span>
        <h1>THE DETAILS. FITTED RIGHT.</h1>
        <p>
          See approved before-and-after installations, or ask our team for
          recent work on a car like yours.
        </p>
      </section>
      <InstallationGallery />
      <FittingPromise />
      <VerifiedReviews />
      <div className="section" />
    </>
  );
}
