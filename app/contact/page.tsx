import type { Metadata } from "next";
import { EstimateForm } from "@/components/Enquiry";
import Visit from "@/components/Visit";
import { business } from "@/lib/business";
export const metadata: Metadata = {
  title: "Visit & Contact | Mithakhali, Ahmedabad",
  description:
    `Visit Best Car Accessories at Urvashi Complex, Mithakhali Circle, Navrangpura, Ahmedabad. Open daily 9 AM–9 PM. Call ${business.phone} or ${business.alternatePhone}. WhatsApp ${business.phone}.`,
  alternates: { canonical: "/contact/" },
};
export default function Contact() {
  return (
    <>
      <section className="page-heading container">
        <span className="eyebrow">A GOOD CONVERSATION STARTS HERE</span>
        <h1>LET’S TALK UPGRADES.</h1>
        <p>
          Tell us what you drive and what you have in mind. We’ll help with the
          next step.
        </p>
      </section>
      <section className="contact-estimate container">
        <div>
          <span className="eyebrow">PERSONAL ADVICE. NO PRESSURE.</span>
          <h2>GET A FREE ESTIMATE</h2>
          <p>
            Share a few details and continue the conversation on WhatsApp. Your
            message is sent only when you press Send in WhatsApp.
          </p>
        </div>
        <EstimateForm contact />
      </section>
      <Visit />
    </>
  );
}
