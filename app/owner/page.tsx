import type { Metadata } from "next";
import OwnerCatalogue from "@/components/OwnerCatalogue";
export const metadata: Metadata = {
  title: "Owner Catalogue Updates",
  robots: { index: false, follow: false },
  alternates: { canonical: "/owner/" },
};
export default function OwnerPage() {
  return (
    <>
      <section className="page-heading container">
        <span className="eyebrow">OWNER WORKSPACE</span>
        <h1>UPDATE PRODUCTS. WITHOUT EDITING CODE.</h1>
        <p>
          Maintain the catalogue in Excel or Google Sheets, check your changes
          here, then publish the confirmed file.
        </p>
      </section>
      <OwnerCatalogue />
    </>
  );
}
