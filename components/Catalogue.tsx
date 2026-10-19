"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  ChevronDown,
} from "lucide-react";
import {
  cars,
  categories,
  products,
  fitsCar,
  fittedPrice,
} from "@/lib/catalogue";
import { useVehicle } from "./VehicleContext";
import ProductCard from "./ProductCard";
export function CatalogueSkeleton() {
  return (
    <div
      className="container catalogue-skeleton"
      aria-label="Loading catalogue"
      role="status"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div />
          <span />
          <span />
        </div>
      ))}
    </div>
  );
}
export default function Catalogue({
  category = "",
  model = "",
  carBrand = "",
}: {
  category?: string;
  model?: string;
  carBrand?: string;
}) {
  const params = useSearchParams();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState(category);
  const { vehicle, setVehicle, ready } = useVehicle();
  const brand = vehicle.brand;
  const car = vehicle.model;
  const setBrand = (value: string) =>
    setVehicle({ brand: value, model: "", details: "" });
  const setCar = (value: string) =>
    setVehicle({
      brand: brand || cars.find((c) => c.model === value)?.brand || "",
      model: value,
      details: "",
    });
  const [maker, setMaker] = useState("");
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState("popular");
  const [limit, setLimit] = useState(8);
  const [mobile, setMobile] = useState(false);
  const sheet = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    setCat(category || params.get("category") || "");
    if (!ready) return;
    if (model || carBrand || params.has("car") || params.has("brand")) {
      const nextModel = model || params.get("car") || "";
      setVehicle({
        brand:
          carBrand ||
          params.get("brand") ||
          cars.find((c) => c.model === nextModel)?.brand ||
          "",
        model: nextModel,
        details:
          params.get("details") ||
          (vehicle.model === nextModel ? vehicle.details : ""),
      });
    }
  }, [params, category, model, carBrand, ready, setVehicle]);
  useEffect(() => {
    setLimit(8);
  }, [q, cat, brand, car, maker, price, sort]);
  useEffect(() => {
    const d = sheet.current;
    if (mobile) {
      d?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      d?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);
  const reset = () => {
    setQ("");
    setCat("");
    setVehicle({ brand: "", model: "", details: "" });
    setMaker("");
    setPrice("all");
    setSort("popular");
  };
  const filtered = products
    .filter(
      (p) =>
        (!q ||
          `${p.name} ${p.brand} ${p.subcategory}`
            .toLowerCase()
            .includes(q.toLowerCase())) &&
        (!cat || p.category === cat) &&
        (!(brand || car) || fitsCar(p, car, brand)) &&
        (!maker || p.brand === maker) &&
        (price === "all" ||
          (price === "quote" && p.price === null) ||
          (price === "under5000" &&
            p.price !== null &&
            (fittedPrice(p) ?? p.price) < 5000) ||
          (price === "5000-15000" &&
            p.price !== null &&
            (fittedPrice(p) ?? p.price) >= 5000 &&
            (fittedPrice(p) ?? p.price) <= 15000) ||
          (price === "over15000" &&
            p.price !== null &&
            (fittedPrice(p) ?? p.price) > 15000)),
    )
    .sort((a, b) =>
      sort === "price"
        ? (fittedPrice(a) ?? a.price ?? Infinity) -
          (fittedPrice(b) ?? b.price ?? Infinity)
        : sort === "newest"
          ? b.createdAt.localeCompare(a.createdAt)
          : Number(b.featured) - Number(a.featured),
    );
  const brands = Array.from(new Set(cars.map((c) => c.brand)));
  const makers = Array.from(new Set(products.map((p) => p.brand))).sort();
  const count = [cat, brand, car, maker, price === "all" ? "" : price].filter(
    Boolean,
  ).length;
  const filters = (
    <>
      <div className="filter-heading">
        <h2>FILTER BY</h2>
        <button className="reset-button" onClick={reset}>
          <RotateCcw size={13} />
          Reset
        </button>
      </div>
      <label>
        Category
        <select value={cat} onChange={(e) => setCat(e.target.value)}>
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Car brand
        <select
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
          }}
        >
          <option value="">All car brands</option>
          {brands.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </label>
      <label>
        Car model
        <select value={car} onChange={(e) => setCar(e.target.value)}>
          <option value="">All models</option>
          {cars
            .filter((c) => !brand || c.brand === brand)
            .map((c) => (
              <option key={c.slug}>{c.model}</option>
            ))}
        </select>
      </label>
      <label>
        Product brand
        <select value={maker} onChange={(e) => setMaker(e.target.value)}>
          <option value="">All product brands</option>
          {makers.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </label>
      <label>
        Price range
        <select value={price} onChange={(e) => setPrice(e.target.value)}>
          <option value="all">All prices</option>
          <option value="quote">Call for price</option>
          <option value="under5000">Under ₹5,000</option>
          <option value="5000-15000">₹5,000 – ₹15,000</option>
          <option value="over15000">Over ₹15,000</option>
        </select>
      </label>
      <p className="filter-note">
        Universal accessories stay in your results. Always confirm fitment for
        your exact year and variant.
      </p>
    </>
  );
  return (
    <section className="container catalogue">
      {products.some((p) => p.sample) && (
        <div className="sample-notice">
          <span>DEMO CATALOGUE</span>
          <p>
            Sample products are clearly labelled. Names, brands and fitment in
            sample listings are illustrative. Confirm real products,
            availability and prices with our team.
          </p>
        </div>
      )}
      <div className="catalogue-layout">
        <aside className="filter-sidebar" aria-label="Catalogue filters">
          {filters}
        </aside>
        <div className="catalogue-main">
          <div className="catalogue-tools">
            <label className="search-field">
              <Search size={19} />
              <input
                type="search"
                aria-label="Search products"
                placeholder="Search accessories, brands…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </label>
            <label className="sort-field">
              <span>Sort by</span>
              <select
                aria-label="Sort products"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="popular">Popular</option>
                <option value="price">Price: low to high</option>
                <option value="newest">Newest</option>
              </select>
            </label>
          </div>
          <div className="result-line">
            <p aria-live="polite">
              <strong>{filtered.length}</strong>{" "}
              {filtered.length === 1 ? "product" : "products"}
              {car ? ` for ${car}` : ""}
            </p>
            <button
              className="mobile-filter button button-outline"
              onClick={() => setMobile(true)}
            >
              <SlidersHorizontal size={16} />
              Filters{count > 0 ? ` (${count})` : ""}
            </button>
            {count > 0 && (
              <button className="clear-filters" onClick={reset}>
                Clear filters <X size={13} />
              </button>
            )}
          </div>
          {filtered.length ? (
            <>
              <div className="catalogue-products">
                {filtered.slice(0, limit).map((p) => (
                  <ProductCard key={p.id} product={p} car={car || undefined} />
                ))}
              </div>
              <div className="load-more">
                <p>
                  Showing {Math.min(limit, filtered.length)} of{" "}
                  {filtered.length} products
                </p>
                {limit < filtered.length && (
                  <button
                    className="button button-outline"
                    onClick={() => setLimit(limit + 8)}
                  >
                    Load more accessories <ChevronDown size={17} />
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="empty-state">
              <Search size={38} />
              <h2>NO MATCHES THIS TIME.</h2>
              <p>
                Try another filter or ask us about the accessory you have in
                mind.
              </p>
              <button className="button button-gold" onClick={reset}>
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>
      <dialog
        ref={sheet}
        className="filter-sheet"
        onCancel={() => setMobile(false)}
        onClick={(e) => {
          if (e.target === sheet.current) setMobile(false);
        }}
      >
        <div className="sheet-top">
          <h2>FIND YOUR UPGRADE</h2>
          <button
            aria-label="Close filters"
            className="icon-button"
            onClick={() => setMobile(false)}
          >
            <X />
          </button>
        </div>
        <div className="sheet-fields">{filters}</div>
        <button
          className="button button-gold sheet-apply"
          onClick={() => setMobile(false)}
        >
          Show {filtered.length} products
        </button>
      </dialog>
    </section>
  );
}
