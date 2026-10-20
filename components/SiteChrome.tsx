"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { Call, WhatsApp } from "./Enquiry";
import { VehicleSummary, useVehicle, describeVehicle } from "./VehicleContext";
import { products, productEnquiry, productPriceLabel } from "@/lib/catalogue";
import { MessageCircle } from "lucide-react";
import { business, mapsUrl, directionsUrl } from "@/lib/business";
const links = [
  ["Home", "/"],
  ["Accessories", "/products/"],
  ["Our work", "/our-work/"],
  ["About us", "/about/"],
  ["Visit us", "/contact/"],
];
export function Logo() {
  return (
    <Link
      href="/"
      className="logo-window"
      aria-label="Best Car Accessories home"
    >
      <Image
        src="/logo.png"
        alt="Best Car Accessories — Upgrade Your Ride"
        fill
        sizes="(max-width:600px) 220px, 300px"
        priority
      />
    </Link>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="top-strip">
        <div className="container">
          <span>
            <MapPin size={13} />
            Mithakhali Circle, Ahmedabad
          </span>
          <span>
            <Clock size={13} />9 AM – 9 PM, every day <i />{" "}
            <a href={`tel:${business.phone.replace(/\s/g, "")}`}>
              +91 99134 08885
            </a>
          </span>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Logo />
          <nav
            className={open ? "main-nav is-open" : "main-nav"}
            aria-label="Main navigation"
          >
            {links.map(([label, href]) => (
              <Link
                href={href}
                key={href}
                onClick={() => setOpen(false)}
                aria-current={
                  (
                    href === "/"
                      ? path === "/"
                      : path.startsWith(href.slice(0, -1))
                  )
                    ? "page"
                    : undefined
                }
              >
                {label}
              </Link>
            ))}
          </nav>
          <Call className="header-call" />
          <button
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <VehicleSummary />
    </>
  );
}
export function Footer() {
  const path = usePathname();
  const currentProduct = products.find(
    (p) => path === `/products/${p.slug}/` || path === `/products/${p.slug}`,
  );
  const { vehicle } = useVehicle();
  return (
    <>
      <section className="cta-band">
        <div className="container">
          <div>
            <span className="eyebrow">YOUR NEXT UPGRADE STARTS HERE</span>
            <h2>LET’S TALK ABOUT YOUR CAR.</h2>
          </div>
          <WhatsApp className="button-black">Get expert help</WhatsApp>
        </div>
      </section>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <Logo />
            <p>
              Good accessories. Expert fitting.
              <br />A better everyday drive.
            </p>
          </div>
          <div>
            <h3>EXPLORE</h3>
            <Link href="/products/">All accessories</Link>
            <Link href="/about/">About the store</Link>
            <Link href="/contact/">Visit & contact</Link>
            <Link href="/our-work/">Installation work</Link>
            <Link href="/owner/">Owner product updates</Link>
          </div>
          <div>
            <h3>COME SAY HELLO</h3>
            <p>
              Urvashi Complex, No. 15,
              <br />
              Mithakhali Circle, Navrangpura,
              <br />
              Ahmedabad
            </p>
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
              Get directions <ArrowUpRight size={14} />
            </a>
          </div>
          <div>
            <h3>LET’S CONNECT</h3>
            <a href={`tel:${business.phone.replace(/\s/g, "")}`}>
              +91 99134 08885
            </a>
            <p>9:00 AM – 9:00 PM daily</p>
            <WhatsApp>WhatsApp us</WhatsApp>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Best Car Accessories</span>
          <Link href="/privacy-policy/">Privacy policy</Link>
          <span>UPGRADE YOUR RIDE.</span>
        </div>
      </footer>
      <div
        className={`mobile-contact ${currentProduct ? "mobile-product-contact" : ""}`}
      >
        {currentProduct && (
          <span className="mobile-product-price">
            {productPriceLabel(currentProduct)}
          </span>
        )}
        <Call />
        {currentProduct ? (
          <a
            className="button button-gold"
            href={productEnquiry(currentProduct, describeVehicle(vehicle))}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={17} />
            Get price
          </a>
        ) : (
          <WhatsApp />
        )}
      </div>
    </>
  );
}
