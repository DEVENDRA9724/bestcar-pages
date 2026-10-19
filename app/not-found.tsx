import Link from "next/link";
export default function NotFound() {
  return (
    <section className="container empty-state not-found">
      <span className="eyebrow">404 / WRONG TURN</span>
      <h1>LET’S GET YOU BACK ON THE ROAD.</h1>
      <p>We couldn’t find that page. Your next upgrade is in the catalogue.</p>
      <Link href="/products/" className="button button-gold">
        Explore accessories
      </Link>
    </section>
  );
}
