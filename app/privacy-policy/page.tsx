import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy-policy/" },
};
export default function Privacy() {
  return (
    <article className="container prose-page">
      <span className="eyebrow">BEST CAR ACCESSORIES</span>
      <h1>PRIVACY POLICY</h1>
      <p>Last updated: 20 October 2026</p>
      <h2>ABOUT THIS WEBSITE</h2>
      <p>
        This website helps you explore accessories and contact Best Car
        Accessories at Urvashi Complex, No. 15, Mithakhali Circle, Navrangpura,
        Ahmedabad.
      </p>
      <h2>ENQUIRIES AND YOUR DETAILS</h2>
      <p>
        The forms build a WhatsApp link using the details you enter. This
        website does not store those form details in a database. You can review
        the message in WhatsApp before sending it. The business will receive the
        message and the information WhatsApp shares when you send it.
      </p>
      <h2>THIRD-PARTY SERVICES</h2>
      <p>
        WhatsApp enquiries and Google Maps links take you to third-party
        services. The embedded Google map and Google Fonts may receive
        connection information such as your IP address when they load. Their own
        privacy policies apply.
      </p>
      <h2>COOKIES AND SITE OPERATION</h2>
      <p>
        Your selected car, model year and variant are remembered in local
        storage on this browser so you do not need to enter them again. Use
        Clear saved car to remove them. Contact names and enquiry messages are
        not saved in this storage.
      </p>
      <p>
        The owner CSV checker reads the file you select in your browser.
        Selecting a file does not upload it or publish changes to the live
        website.
      </p>
      <p>
        The site code does not add advertising trackers or analytics cookies.
        The hosting provider may process technical request information for
        delivery, security and access control.
      </p>
      <h2>YOUR CHOICES</h2>
      <p>
        You can browse without submitting an enquiry, call the store instead of
        using WhatsApp, and contact the business to ask about information you
        have shared with it.
      </p>
      <h2>CONTACT</h2>
      <p>
        For questions about your enquiry or information shared with the
        business, call <a href="tel:+919742382814">+91 97423 82814</a> or visit
        the store during opening hours, 9 AM–9 PM daily.
      </p>
    </article>
  );
}
