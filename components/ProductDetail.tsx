"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MessageCircle,
  ArrowUpRight,
  Wrench,
  ShieldCheck,
  ChevronRight,
  Clock,
} from "lucide-react";
import {
  Product,
  productPriceLabel,
  productEnquiry,
  categories,
  cars,
  fittingLabel,
} from "@/lib/catalogue";
import { ProductImage } from "./ProductCard";
import { Call } from "./Enquiry";
import { useVehicle, describeVehicle, vehicleQuery } from "./VehicleContext";
import { servicePolicy } from "@/lib/business";
export default function ProductDetail({ product: p }: { product: Product }) {
  const [index, setIndex] = useState(0);
  const category = categories.find((c) => c.slug === p.category);
  const { vehicle, setVehicle, ready } = useVehicle();
  useEffect(() => {
    if (!ready) return;
    const query = new URLSearchParams(window.location.search);
    if (query.has("car") || query.has("brand")) {
      const model = query.get("car") || "";
      setVehicle({
        brand:
          query.get("brand") ||
          cars.find((c) => c.model === model)?.brand ||
          "",
        model,
        details:
          query.get("details") ||
          (model === vehicle.model ? vehicle.details : ""),
      });
    }
  }, [ready, p.id, setVehicle]);
  const enquiry = productEnquiry(p, describeVehicle(vehicle));
  return (
    <div className="container product-detail">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href={`/products/${vehicleQuery(vehicle)}`}>Accessories</Link>
        <ChevronRight size={14} />
        <Link href={`/products/${p.category}/${vehicleQuery(vehicle)}`}>
          {category?.name}
        </Link>
        <ChevronRight size={14} />
        <span>{p.name}</span>
      </nav>
      {p.sample && (
        <div className="sample-notice compact-sample">
          <span>SAMPLE PRODUCT</span>
          <p>
            Illustrative product and image. Confirm actual model, compatibility
            and price with the store.
          </p>
        </div>
      )}
      <div className="detail-layout priority-layout">
        <div className="detail-summary">
          <span className="eyebrow">
            {p.brand} / {category?.name}
          </span>
          <h1>{p.name}</h1>
          <p className="detail-price">{productPriceLabel(p)}</p>
          <p className="price-fitting-note">
            {fittingLabel(p)}
            {p.sample ? " · sample listing" : ""}
          </p>
          {p.mrp !== null && p.price !== null && p.mrp > p.price && (
            <p className="mrp">
              Product MRP <s>₹{p.mrp.toLocaleString("en-IN")}</s>
            </p>
          )}
          <div className="quick-vehicle">
            <span>
              Enquiring for:{" "}
              <strong>
                {describeVehicle(vehicle) === "my car"
                  ? "Choose your car below"
                  : describeVehicle(vehicle)}
              </strong>
            </span>
          </div>
          <div className="detail-actions">
            <a
              className="button button-gold"
              href={enquiry}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} />
              Enquire on WhatsApp
              <ArrowUpRight size={17} />
            </a>
            <Call />
          </div>
          <details className="vehicle-details">
            <summary>
              {vehicle.model
                ? "Change car or add year / variant"
                : "Add your car for a precise quote"}
            </summary>
            <label>
              Your car
              <select
                value={
                  cars.some((c) => c.model === vehicle.model)
                    ? vehicle.model
                    : ""
                }
                onChange={(e) => {
                  const car = cars.find((c) => c.model === e.target.value);
                  setVehicle({
                    brand: car?.brand || "",
                    model: car?.model || "",
                    details: "",
                  });
                }}
              >
                <option value="">Other / not selected</option>
                {cars.map((c) => (
                  <option key={c.slug} value={c.model}>
                    {c.brand} {c.model}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Model year / variant (optional)
              <input
                value={vehicle.details}
                onChange={(e) =>
                  setVehicle({ ...vehicle, details: e.target.value })
                }
                placeholder="e.g. 2022 SX; or enter another car model"
                maxLength={150}
              />
            </label>
          </details>
          <div className="detail-benefits">
            <span>
              <Wrench size={18} />
              {fittingLabel(p)}
            </span>
            <span>
              <ShieldCheck size={18} />
              {p.sample
                ? "Confirm availability before visiting"
                : p.inStock
                  ? "Available · confirm before visiting"
                  : "Ask about availability"}
            </span>
          </div>
        </div>
        <div className="detail-gallery">
          <ProductImage key={`${p.id}-${index}`} product={p} index={index} />
          {p.images.length > 1 && (
            <div className="thumbnails">
              {p.images.map((_, i) => (
                <button
                  key={i}
                  aria-label={`View product image ${i + 1}`}
                  aria-pressed={i === index}
                  onClick={() => setIndex(i)}
                >
                  <ProductImage product={p} index={i} />
                </button>
              ))}
            </div>
          )}
          {p.sample ? (
            <p>
              AI-generated category illustration. Actual product design, brand
              and features may differ.
            </p>
          ) : !p.images.length ? (
            <p>Ask us for current product photographs.</p>
          ) : null}
        </div>
        <div className="detail-information">
          <p>{p.description}</p>
          <div className="detail-fit">
            <h2>FITS YOUR DRIVE</h2>
            <p>
              {p.universal
                ? "Universal accessory. Confirm wiring, mounting and installation for your car."
                : p.fitsCars
                    .map(
                      (c) =>
                        `${c.brand} ${c.model}${c.years ? ` (${c.years})` : ""}`,
                    )
                    .join(" · ")}
            </p>
            <small>
              {p.sample ? "Illustrative fitment. " : ""}Always confirm model
              year and variant.
            </small>
          </div>
          <div className="fitting-terms">
            <h2>FITTING & WARRANTY</h2>
            <dl>
              <div>
                <dt>Fitted starting price</dt>
                <dd>{productPriceLabel(p)}</dd>
              </div>
              <div>
                <dt>Installation</dt>
                <dd>{fittingLabel(p)}</dd>
              </div>
              <div>
                <dt>Fitting time</dt>
                <dd>
                  {p.fittingTime ||
                    servicePolicy.defaultFittingTime ||
                    "Confirmed with your quote"}
                </dd>
              </div>
              <div>
                <dt>Warranty</dt>
                <dd>
                  {p.warranty ||
                    servicePolicy.defaultWarranty ||
                    "Ask for the applicable product and fitting terms"}
                </dd>
              </div>
            </dl>
            <a
              className="text-link"
              href={productEnquiry(p, describeVehicle(vehicle))}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ask for a written fitting quote
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
      <section className="spec-section">
        <div>
          <span className="eyebrow">THE DETAILS</span>
          <h2>KEY SPECIFICATIONS</h2>
          <p>
            Confirm the exact product model, included parts and warranty before
            purchase.
          </p>
        </div>
        <table>
          <caption className="sr-only">{p.name} specifications</caption>
          <tbody>
            {p.specs.map((s) => (
              <tr key={s.label}>
                <th scope="row">{s.label}</th>
                <td>{s.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
