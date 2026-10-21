import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Wrench, MessageCircle, MapPin } from "lucide-react";
import Visit from "@/components/Visit";
export const metadata: Metadata = {
  title: "About Our Mithakhali Store",
  description:
    "Meet Best Car Accessories, your local car accessories and in-house fitting store in Mithakhali Circle, Navrangpura, Ahmedabad.",
  alternates: { canonical: "/about/" },
};
export default function About() {
  return (
    <>
      <section className="page-heading container">
        <span className="eyebrow">BEST CAR ACCESSORIES · AHMEDABAD</span>
        <h1>FOR THE WAY YOU DRIVE.</h1>
        <p>
          A local store, a conversation about your car, and the right
          accessories to make it feel more like yours.
        </p>
      </section>
      <section className="about-feature container">
        <div className="about-photo">
          <Image
            src="/images/seats.webp"
            alt="Car interior inspiration featuring a dashboard, screen and steering wheel"
            fill
            sizes="(max-width:800px) 100vw, 50vw"
          />
        </div>
        <div>
          <span className="eyebrow">UPGRADE YOUR CAR.</span>
          <h2>
            BETTER DETAILS.
            <br />
            BETTER EVERYDAY DRIVES.
          </h2>
          <p>
            Best Car Accessories is a local accessories and fitting store at
            Urvashi Complex, Mithakhali Circle, Navrangpura, Ahmedabad.
          </p>
          <p>
            We help you explore screens, audio, seat covers, lighting, cameras
            and the finishing touches that suit your car. Ask us about actual
            products, compatibility and fitting before making your choice.
          </p>
          <Link className="button button-gold" href="/products/">
            Explore the catalogue
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="container about-values section">
        {[
          [
            Wrench,
            "FITTED HERE",
            "Discuss the installation with the team at our Mithakhali store.",
          ],
          [
            MessageCircle,
            "ADVICE FIRST",
            "Share your car, your priorities and your questions. We’ll help you narrow the options.",
          ],
          [
            MapPin,
            "LOCAL & ACCESSIBLE",
            "Visit us any day between 9 AM and 9 PM in Navrangpura, Ahmedabad.",
          ],
        ].map(([Icon, title, text], i) => {
          const I = Icon as typeof Wrench;
          return (
            <article key={i}>
              <I size={30} />
              <h3>{title as string}</h3>
              <p>{text as string}</p>
            </article>
          );
        })}
      </section>
      <Visit />
    </>
  );
}
