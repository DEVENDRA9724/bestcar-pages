import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import { Call } from "./Enquiry";
import { business, mapsUrl, directionsUrl } from "@/lib/business";
export default function Visit() {
  return (
    <section className="visit-section container section">
      <div className="visit-info">
        <span className="eyebrow">YOUR LOCAL CAR ACCESSORY STORE</span>
        <h2>
          DROP IN.
          <br />
          DRIVE OUT DIFFERENT.
        </h2>
        <p>
          See your options up close. Talk to our team. Find the right upgrade
          for your everyday drive.
        </p>
        <div className="visit-line">
          <MapPin size={21} />
          <div>
            <strong>BEST CAR ACCESSORIES</strong>
            <p>
              Urvashi Complex, No. 15, Mithakhali Circle,
              <br />
              Navrangpura, Ahmedabad
            </p>
          </div>
        </div>
        <div className="visit-line">
          <Clock size={21} />
          <div>
            <strong>OPEN EVERY DAY</strong>
            <p>9:00 AM – 9:00 PM</p>
          </div>
        </div>
        <div className="inline-actions">
          <Call>{business.phone}</Call>
          <Call phone={business.alternatePhone}>{business.alternatePhone}</Call>
          <a
            className="text-link"
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Find us on Google Maps
            <ArrowUpRight size={18} />
          </a>
          <a
            className="text-link"
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get directions
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
      <div className="visit-map">
        <iframe
          title="Map of Urvashi Complex at Mithakhali Circle, Ahmedabad"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://maps.google.com/maps?q=Urvashi%20Complex%20Mithakhali%20Circle%20Ahmedabad&z=15&output=embed"
        />
        <div className="map-caption">
          <MapPin size={18} />
          <span>MITHAKHALI CIRCLE, AHMEDABAD</span>
          <ArrowUpRight size={18} />
        </div>
      </div>
    </section>
  );
}
