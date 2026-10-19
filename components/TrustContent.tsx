import Image from "next/image";
import { ArrowUpRight, Camera, Wrench, ShieldCheck, Clock } from "lucide-react";
import {
  approvedInstallations,
  approvedReviews,
  reviewsUrl,
  servicePolicy,
} from "@/lib/business";
import { WhatsApp } from "./Enquiry";
export function VerifiedReviews() {
  if (!approvedReviews.length) return null;
  return (
    <section className="verified-reviews container section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">CUSTOMER EXPERIENCES</span>
          <h2>FROM THE PEOPLE WE’VE HELPED</h2>
        </div>
        <a
          className="text-link"
          href={reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          More reviews
          <ArrowUpRight size={17} />
        </a>
      </div>
      <div className="verified-review-grid">
        {approvedReviews.map((r, i) => (
          <article key={`${r.name}-${i}`}>
            <span aria-label={`${r.rating} out of 5 stars`}>
              {"★".repeat(Math.round(r.rating))}
            </span>
            <blockquote>“{r.quote}”</blockquote>
            <strong>{r.name}</strong>
            <a
              className="text-link"
              href={r.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View original review
              <ArrowUpRight size={15} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
export function InstallationGallery() {
  return (
    <section className="container work-gallery-section">
      {approvedInstallations.length ? (
        <div className="installation-grid">
          {approvedInstallations.map((item, i) => (
            <article key={`${item.title}-${i}`}>
              <div className="installation-pair">
                <figure>
                  <div>
                    <Image
                      src={item.beforeImage}
                      alt={`${item.car} before ${item.accessory} installation`}
                      fill
                      sizes="(max-width:800px) 45vw, 300px"
                    />
                  </div>
                  <figcaption>BEFORE</figcaption>
                </figure>
                <figure>
                  <div>
                    <Image
                      src={item.afterImage}
                      alt={`${item.car} after ${item.accessory} installation`}
                      fill
                      sizes="(max-width:800px) 45vw, 300px"
                    />
                  </div>
                  <figcaption>AFTER</figcaption>
                </figure>
              </div>
              <span className="eyebrow">
                {item.car} · {item.accessory}
              </span>
              <h2>{item.title}</h2>
              <p>{item.caption}</p>
            </article>
          ))}
        </div>
      ) : (
        <div className="work-request">
          <Camera size={42} />
          <h2>SEE WHAT’S POSSIBLE FOR YOUR CAR.</h2>
          <p>
            Ask our team for recent installation photos for your model and the
            accessory you’re considering. We’ll publish completed work here when
            approved shop photographs are available.
          </p>
          <WhatsApp message="Hi, could you share recent installation photos for my car and the accessories I’m interested in?">
            Request work photos
          </WhatsApp>
        </div>
      )}
    </section>
  );
}
export function FittingPromise() {
  return (
    <section className="container fitting-promise section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">CONFIRM THE DETAILS BEFORE YOU DECIDE</span>
          <h2>A CLEAR QUOTE. A BETTER FIT.</h2>
        </div>
      </div>
      <div className="fitting-promise-grid">
        <article>
          <Wrench size={27} />
          <h3>THE FITTED TOTAL</h3>
          <p>
            Confirm the exact product, installation charge and any
            vehicle-specific parts before agreeing to the work.
          </p>
        </article>
        <article>
          <Clock size={27} />
          <h3>THE TIME NEEDED</h3>
          <p>
            {servicePolicy.defaultFittingTime ||
              "Ask for the fitting time for your specific car and installation. Arrange a suitable visit with our team."}
          </p>
        </article>
        <article>
          <ShieldCheck size={27} />
          <h3>THE WARRANTY TERMS</h3>
          <p>
            {servicePolicy.defaultWarranty ||
              "Ask for written product and fitting warranty terms. Coverage depends on the confirmed product and work."}
          </p>
        </article>
      </div>
      <p className="fitting-quote-note">{servicePolicy.quoteNote}</p>
    </section>
  );
}
