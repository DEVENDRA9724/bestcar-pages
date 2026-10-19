import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, categories, origin, fittedPrice } from "@/lib/catalogue";
import Catalogue, { CatalogueSkeleton } from "@/components/Catalogue";
import ProductDetail from "@/components/ProductDetail";
import ProductCard from "@/components/ProductCard";
export function generateStaticParams() {
  return [...categories, ...products].map((p) => ({ slug: p.slug }));
}
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const c = categories.find((c) => c.slug === params.slug);
  const p = products.find((p) => p.slug === params.slug);
  return {
    title: c ? `${c.name} in Ahmedabad` : p?.name || "Accessory",
    description: c?.intro || p?.description,
    alternates: { canonical: `/products/${params.slug}/` },
    openGraph: {
      title: c?.name || p?.name,
      description: c?.intro || p?.description,
    },
  };
}
export default function ProductRoute({ params }: { params: { slug: string } }) {
  const c = categories.find((c) => c.slug === params.slug);
  if (c)
    return (
      <>
        <section className="page-heading container">
          <span className="eyebrow">CAR ACCESSORIES / {c.name}</span>
          <h1>{c.name}</h1>
          <p>{c.intro}</p>
        </section>
        <Suspense fallback={<CatalogueSkeleton />}>
          <Catalogue category={c.slug} />
        </Suspense>
      </>
    );
  const p = products.find((p) => p.slug === params.slug);
  if (!p) notFound();
  const related = products.filter(
    (x) => x.category === p.category && x.id !== p.id,
  );
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    brand: { "@type": "Brand", name: p.brand },
    image: p.images.length
      ? p.images.map((i) => new URL(i, origin).href)
      : undefined,
    sku: p.id,
    ...(p.price !== null && !p.sample
      ? {
          offers: {
            "@type": "Offer",
            price: fittedPrice(p) ?? p.price,
            priceCurrency: "INR",
            availability: p.inStock
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            url: `${origin}/products/${p.slug}/`,
          },
        }
      : {}),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\u003c"),
        }}
      />
      <ProductDetail product={p} />
      <section className="container section related-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">KEEP EXPLORING</span>
            <h2>MORE FOR YOUR DRIVE</h2>
          </div>
        </div>
        <div className="featured-grid">
          {related.map((x) => (
            <ProductCard key={x.id} product={x} />
          ))}
        </div>
      </section>
    </>
  );
}
