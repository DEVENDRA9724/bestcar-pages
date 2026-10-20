"use client";
import { useState, useEffect } from "react";
import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import { buildWhatsAppLink, cars, categories } from "@/lib/catalogue";
import { useVehicle, describeVehicle } from "./VehicleContext";
import { business } from "@/lib/business";
export function WhatsApp({
  message,
  children = "WhatsApp us",
  className = "",
}: {
  message?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const { vehicle } = useVehicle();
  return (
    <a
      className={`button button-gold ${className}`}
      href={buildWhatsAppLink(
        message ||
          `Hi, I would like help choosing accessories for ${describeVehicle(vehicle)}.`,
      )}
      target="_blank"
      rel="noopener noreferrer"
    >
      <MessageCircle size={18} />
      {children}
      <ArrowUpRight size={17} />
    </a>
  );
}
export function Call({
  children = "Call now",
  className = "",
  phone = business.phone,
}: {
  children?: React.ReactNode;
  className?: string;
  phone?: string;
}) {
  return (
    <a
      className={`button button-outline ${className}`}
      href={`tel:${phone.replace(/\s/g, "")}`}
    >
      <Phone size={17} />
      {children}
    </a>
  );
}
export function EstimateForm({ contact = false }: { contact?: boolean }) {
  const { vehicle, setVehicle, ready: vehicleReady } = useVehicle();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [accessory, setAccessory] = useState("");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  useEffect(() => {
    if (!vehicleReady) return;
    setBrand(vehicle.brand);
    setModel(vehicle.model);
  }, [vehicleReady, vehicle.brand, vehicle.model]);
  const brands = Array.from(new Set(cars.map((c) => c.brand)));
  return (
    <form
      className={contact ? "estimate-form contact-form" : "estimate-form"}
      onSubmit={(e) => {
        e.preventDefault();
        setVehicle({ brand, model, details: vehicle.details });
        const message = contact
          ? `Hi, my name is ${name}. I want an estimate for ${accessory} for my ${brand} ${model} ${vehicle.details}. ${notes}`
          : `Hi, I want an estimate for ${accessory} for my ${brand} ${model} ${vehicle.details}.`;
        window.open(
          buildWhatsAppLink(message),
          "_blank",
          "noopener,noreferrer",
        );
      }}
    >
      <fieldset disabled={!ready} className="form-fields">
        {contact && (
          <label>
            Your name
            <input
              value={name}
              required
              maxLength={100}
              onChange={(e) => setName(e.target.value)}
              placeholder="How should we address you?"
            />
          </label>
        )}
        <label>
          Car brand
          <select
            required
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
              setModel("");
              setVehicle({ brand: e.target.value, model: "", details: "" });
            }}
          >
            <option value="" disabled>
              Select brand
            </option>
            {brands.map((b) => (
              <option key={b}>{b}</option>
            ))}
            <option>Other</option>
          </select>
        </label>
        <label>
          Car model
          {brand === "Other" ? (
            <input
              required
              value={model}
              onChange={(e) => {
                setModel(e.target.value);
                setVehicle({
                  brand,
                  model: e.target.value,
                  details: vehicle.details,
                });
              }}
              placeholder="Enter your model"
              maxLength={100}
            />
          ) : (
            <select
              required
              value={model}
              onChange={(e) => {
                setModel(e.target.value);
                setVehicle({
                  brand,
                  model: e.target.value,
                  details: vehicle.details,
                });
              }}
            >
              <option value="" disabled>
                Select model
              </option>
              {cars
                .filter((c) => c.brand === brand)
                .map((c) => (
                  <option key={c.model}>{c.model}</option>
                ))}
              <option>Other model</option>
            </select>
          )}
        </label>
        <label>
          What are you looking for?
          <select
            required
            value={accessory}
            onChange={(e) => setAccessory(e.target.value)}
          >
            <option value="" disabled>
              Select accessory
            </option>
            {categories.map((c) => (
              <option key={c.slug}>{c.name}</option>
            ))}
            <option>Help me choose</option>
          </select>
        </label>
        {contact && (
          <label className="full-field">
            Tell us a little more
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Car year, variant, preferred products or fitting questions"
              maxLength={2000}
            />
          </label>
        )}
        <button className="button button-gold" type="submit">
          {contact ? "Continue on WhatsApp" : "Get a free estimate"}
          <ArrowUpRight size={18} />
        </button>
        <p className="form-note">
          Opens WhatsApp with your details. Send when you’re ready.
        </p>
      </fieldset>
    </form>
  );
}
