"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import CategoryIcon from "./CategoryIcon";
import {
  Product,
  productPriceLabel,
  productEnquiry,
  fittingLabel,
} from "@/lib/catalogue";
import { useVehicle, vehicleQuery, describeVehicle } from "./VehicleContext";
export function ProductImage({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="product-art">
      {product.images[index] && !failed ? (
        <Image
          src={product.images[index]}
          alt={
            product.sample
              ? `Illustrative unbranded ${product.subcategory.toLowerCase()} sample, not an actual product photograph`
              : `${product.brand} ${product.name}, product view ${index + 1}`
          }
          fill
          sizes="(max-width:600px) 90vw, (max-width:1000px) 45vw, 300px"
          onError={() => setFailed(true)}
        />
      ) : (
        <>
          <CategoryIcon category={product.category} size={84} />
          <span>PRODUCT PHOTO COMING SOON</span>
        </>
      )}
      {product.sample && product.images[index] && !failed && (
        <span className="illustration-label">ILLUSTRATIVE SAMPLE IMAGE</span>
      )}
    </div>
  );
}
export default function ProductCard({
  product,
  car,
}: {
  product: Product;
  car?: string;
}) {
  const { vehicle } = useVehicle();
  const detailUrl = `/products/${product.slug}/${vehicleQuery(vehicle)}`;
  const fits = product.universal
    ? "Universal · confirm installation"
    : `${product.fitsCars
        .slice(0, 2)
        .map((c) => c.model)
        .join(
          ", ",
        )}${product.fitsCars.length > 2 ? ` +${product.fitsCars.length - 2}` : ""}`;
  return (
    <article className="product-card">
      <Link
        className="product-image-link"
        href={detailUrl}
        aria-label={`View ${product.name}`}
      >
        <ProductImage product={product} />
        {product.badge && <span className="badge">{product.badge}</span>}
        {product.sample && <span className="sample-tag">SAMPLE</span>}
      </Link>
      <div className="product-content">
        <span className="product-brand">{product.brand}</span>
        <Link href={detailUrl}>
          <h3>{product.name}</h3>
        </Link>
        <p className="product-fit">Fits: {fits}</p>
        <strong className="price">{productPriceLabel(product)}</strong>
        <p className="card-fitting">{fittingLabel(product)}</p>
        <div className="card-actions">
          <a
            className="button button-gold"
            href={productEnquiry(
              product,
              vehicle.model || vehicle.brand ? describeVehicle(vehicle) : car,
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get price
            <ArrowUpRight size={16} />
          </a>
          <Link className="button button-outline" href={detailUrl}>
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
