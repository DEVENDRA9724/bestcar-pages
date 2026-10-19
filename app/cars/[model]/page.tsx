import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cars } from "@/lib/catalogue";
import Catalogue, { CatalogueSkeleton } from "@/components/Catalogue";
export function generateStaticParams() {
  return cars.map((c) => ({ model: c.slug }));
}
export function generateMetadata({
  params,
}: {
  params: { model: string };
}): Metadata {
  const c = cars.find((c) => c.slug === params.model);
  return {
    title: `${c?.brand} ${c?.model} Accessories in Ahmedabad`,
    description: `Explore accessories for your ${c?.model} at Mithakhali Circle, Ahmedabad. Compare sample screens, audio, seat covers and more. Confirm model year and fitting on WhatsApp.`,
    alternates: { canonical: `/cars/${params.model}/` },
  };
}
export default function CarPage({ params }: { params: { model: string } }) {
  const c = cars.find((c) => c.slug === params.model);
  if (!c) notFound();
  return (
    <>
      <section className="page-heading container">
        <span className="eyebrow">SHOP BY YOUR CAR / {c.brand}</span>
        <h1>YOUR {c.model}. YOUR WAY.</h1>
        <p>
          Explore sample accessories for your {c.brand} {c.model} in Ahmedabad.
          Universal options are included. Tell us your year and variant for
          confirmed compatibility and in-house fitting.
        </p>
      </section>
      <Suspense fallback={<CatalogueSkeleton />}>
        <Catalogue model={c.model} carBrand={c.brand} />
      </Suspense>
    </>
  );
}
