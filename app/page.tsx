import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Wrench,
  Star,
  Car,
  Check,
  MessageCircle,
} from "lucide-react";
import {
  cars,
  categories,
  products,
  origin,
  buildWhatsAppLink,
} from "@/lib/catalogue";
import CategoryIcon from "@/components/CategoryIcon";
import ProductCard from "@/components/ProductCard";
import { EstimateForm, WhatsApp } from "@/components/Enquiry";
import Visit from "@/components/Visit";
import UpgradeExplorer from "@/components/UpgradeExplorer";
import { businessSchema, business, reviewsUrl } from "@/lib/business";
import { FittingPromise, VerifiedReviews } from "@/components/TrustContent";
const faq = [
  [
    "How do I get a price?",
    "Choose an accessory and tap Get price to open WhatsApp with the product already mentioned. Share your car model, year and variant so our team can confirm options and a quote.",
  ],
  [
    "Can you fit the accessories at your store?",
    "Yes, we offer in-house fitting at Mithakhali Circle. Ask us to confirm the fitting charge, time needed and compatibility for your car before your visit.",
  ],
  [
    "Can I order or pay online?",
    "This catalogue helps you explore and enquire. Products, availability, fitting and payment are arranged directly with our local store.",
  ],
  [
    "Will a universal accessory fit my car?",
    "Universal accessories may suit many vehicles, but wiring, mounting and installation can vary. Our team will confirm the right fit for your exact model and variant.",
  ],
  [
    "What warranty comes with the products?",
    "Warranty terms depend on the actual brand and product. Ask for the applicable manufacturer warranty, invoice and installation terms before confirming your purchase.",
  ],
  [
    "Are the products and photos in this catalogue final?",
    "The current catalogue contains 24 clearly marked sample listings and photo placeholders. Please contact the store for confirmed products, real photos and current prices.",
  ],
];
export default function Home() {
  const schema = businessSchema(origin);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="home-hero container">
        <div className="hero-copy">
          <span className="eyebrow">
            <i />
            MITHAKHALI, AHMEDABAD
          </span>
          <h1>
            YOUR CAR.
            <br />
            YOUR WAY.
          </h1>
          <p className="hero-tagline">UPGRADE YOUR RIDE.</p>
          <p>
            Better sound. More comfort. A look that’s yours.
            <br />
            Explore premium car accessories with expert fitting, right here in
            Ahmedabad.
          </p>
          <div className="inline-actions">
            <Link className="button button-gold" href="/products/">
              Explore accessories
              <ArrowUpRight size={19} />
            </Link>
            <a className="text-link" href="#estimate">
              Get a free estimate
              <ArrowRight size={18} />
            </a>
          </div>
          <div className="hero-proof">
            <span className="star-box">
              <Star size={18} fill="currentColor" />
            </span>
            <span>
              <strong>4.9/5</strong> <span>from ~1,600 Google reviews*</span>
            </span>
          </div>
        </div>
        <div className="hero-photo">
          <Image
            src="/images/hero.webp"
            alt="BMW on the road, automotive inspiration for your next upgrade"
            fill
            priority
            sizes="(max-width:800px) 100vw, 55vw"
          />
          <div className="hero-photo-top">
            <span>THE DETAILS MAKE THE DRIVE.</span>
            <span>EST. FOR ENTHUSIASTS</span>
          </div>
          <div className="hero-photo-bottom">
            <span>
              GOOD ACCESSORIES.
              <br />
              <strong>GREAT DRIVES.</strong>
            </span>
            <span className="round-arrow">
              <ArrowUpRight size={27} />
            </span>
          </div>
        </div>
      </section>
      <div className="trust-bar">
        <div className="container">
          <span>
            <Star size={19} />
            4.9 Google rating*
          </span>
          <span>
            <ShieldCheck size={19} />
            Genuine brands
          </span>
          <span>
            <Wrench size={19} />
            In-house fitting
          </span>
          <span>
            <MapIcon />
            Your local car experts
          </span>
        </div>
      </div>
      <section className="estimate-section container" id="estimate">
        <div className="estimate-intro">
          <span className="eyebrow">LET’S FIND YOUR FIT</span>
          <h2>WHAT DO YOU DRIVE?</h2>
        </div>
        <EstimateForm />
      </section>
      <UpgradeExplorer />
      <section className="container section" id="categories">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FIND YOUR NEXT UPGRADE</span>
            <h2>SHOP BY CATEGORY</h2>
          </div>
          <Link href="/products/" className="text-link">
            View all accessories
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="category-grid">
          {categories.map((c, i) => (
            <Link
              href={`/products/${c.slug}/`}
              className="category-tile"
              key={c.slug}
            >
              <div className="category-tile-top">
                <span className="category-counter">0{i + 1}</span>
                <ArrowUpRight size={18} />
              </div>
              <CategoryIcon category={c.slug} size={47} />
              <h3>{c.name}</h3>
              <p>{c.short}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="car-section section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">A GOOD FIT CHANGES EVERYTHING</span>
              <h2>FIND ACCESSORIES FOR YOUR CAR</h2>
            </div>
            <p>
              Start with your model.
              <br />
              We’ll help with the details.
            </p>
          </div>
          <div className="car-chips">
            {cars.map((c) => (
              <Link href={`/cars/${c.slug}/`} key={c.slug}>
                <Car size={25} />
                <span>
                  <small>{c.brand}</small>
                  <strong>{c.model}</strong>
                </span>
                <ArrowUpRight size={16} />
              </Link>
            ))}
            <a
              href={buildWhatsAppLink(
                "Hi, I would like help finding accessories for my car model.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="other-car"
            >
              Other model
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>
      <section className="container section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">IDEAS FOR YOUR EVERYDAY DRIVE</span>
            <h2>EXPLORE THE HIGHLIGHTS</h2>
          </div>
          <Link href="/products/" className="text-link">
            Browse all {products.length} products
            <ArrowUpRight size={18} />
          </Link>
        </div>
        {products.some((p) => p.sample) && (
          <div className="sample-notice">
            <span>SAMPLE SELECTION</span>
            <p>
              Illustrative products and fitment. Ask us for current products,
              photos and a confirmed quote.
            </p>
          </div>
        )}
        <div className="featured-grid">
          {products
            .filter((p) => p.featured)
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </section>
      <section className="brands-section container">
        <span className="eyebrow">
          BRANDS YOU KNOW.
          <br />
          OPTIONS YOU’LL LOVE.
        </span>
        <div className="brand-row">
          <span className="brand-sony">SONY</span>
          <span className="brand-jbl">JBL</span>
          <span className="brand-pioneer">Pioneer</span>
          <span>JVC</span>
          <span className="brand-blaupunkt">
            <i />
            BLAUPUNKT
          </span>
        </div>
      </section>
      <section className="how-section section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">FROM IDEA TO INSTALLATION</span>
              <h2>A BETTER DRIVE. IN THREE STEPS.</h2>
            </div>
            <p>
              Personal advice. A clear quote.
              <br />A fitting finish.
            </p>
          </div>
          <div className="steps">
            {[
              [
                "01",
                "FIND YOUR UPGRADE",
                "Browse the catalogue or tell us what you want to improve. Sound, comfort, style — start anywhere.",
              ],
              [
                "02",
                "LET’S GET IT RIGHT",
                "Share your car model, year and variant on WhatsApp. We’ll discuss options, fitment and the price.",
              ],
              [
                "03",
                "VISIT. FIT. ENJOY.",
                "Drop into our Mithakhali store, confirm your selection and arrange professional in-house installation.",
              ],
            ].map(([n, t, d]) => (
              <article key={n}>
                <span className="step-number">{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="reviews-section container section">
        <div className="rating-panel">
          <span className="eyebrow">LOCAL STORE. LOCAL TRUST.</span>
          <div className="review-rating">
            4.9<span>/ 5</span>
          </div>
          <div className="review-stars" aria-label="Five stars">
            ★★★★★
          </div>
          <p>~1,600 Google reviews*</p>
          <a
            href={reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Find us on Google
            <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="review-copy">
          <span className="eyebrow">
            COME FOR AN UPGRADE. STAY FOR THE SERVICE.
          </span>
          <h2>
            YOUR CAR MATTERS TO YOU.
            <br />
            IT MATTERS TO US, TOO.
          </h2>
          <p>
            From choosing the right accessories to talking through installation,
            we’re here to make the process straightforward.
          </p>
          <div className="review-checks">
            <span>
              <Check size={19} />
              Talk to the team doing the fitting
            </span>
            <span>
              <Check size={19} />
              See your options before deciding
            </span>
            <span>
              <Check size={19} />
              Get a quote for your specific car
            </span>
          </div>
          <p className="small-note">
            *Approximate rating and review count supplied in the business brief.
            Verified customer quotes will be added when provided.
          </p>
        </div>
      </section>
      <section className="faq-section container section">
        <div>
          <span className="eyebrow">A FEW THINGS TO KNOW</span>
          <h2>
            GOOD QUESTIONS.
            <br />
            STRAIGHT ANSWERS.
          </h2>
          <p>
            Need something more specific?
            <br />
            Our team is a message away.
          </p>
          <WhatsApp>Ask us on WhatsApp</WhatsApp>
        </div>
        <div className="faq-list">
          {faq.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span>+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <VerifiedReviews />
      <FittingPromise />
      <div className="container work-home-link">
        <Link href="/our-work/" className="button button-outline">
          Installation work & fitting details
          <ArrowUpRight size={17} />
        </Link>
      </div>
      <Visit />
    </>
  );
}
function MapIcon() {
  return <Car size={19} />;
}
