"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { Car, X } from "lucide-react";
export type Vehicle = { brand: string; model: string; details: string };
const empty: Vehicle = { brand: "", model: "", details: "" };
const key = "bca.vehicle.v1";
const Context = createContext<{
  vehicle: Vehicle;
  ready: boolean;
  setVehicle: (v: Vehicle) => void;
}>({ vehicle: empty, ready: false, setVehicle: () => {} });
function clean(value: unknown): Vehicle {
  const v = value as Partial<Vehicle> | null;
  return {
    brand: typeof v?.brand === "string" ? v.brand.slice(0, 100) : "",
    model: typeof v?.model === "string" ? v.model.slice(0, 100) : "",
    details: typeof v?.details === "string" ? v.details.slice(0, 150) : "",
  };
}
export function VehicleProvider({ children }: { children: React.ReactNode }) {
  const [vehicle, setValue] = useState(empty);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      setValue(clean(JSON.parse(localStorage.getItem(key) || "null")));
    } catch {}
    setReady(true);
    const sync = (e: StorageEvent) => {
      if (e.key === key) {
        try {
          setValue(clean(JSON.parse(e.newValue || "null")));
        } catch {
          setValue(empty);
        }
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  const setVehicle = useCallback((v: Vehicle) => {
    const next = clean(v);
    setValue(next);
    try {
      if (next.brand || next.model || next.details)
        localStorage.setItem(key, JSON.stringify(next));
      else localStorage.removeItem(key);
    } catch {}
  }, []);
  return (
    <Context.Provider value={{ vehicle, ready, setVehicle }}>
      {children}
    </Context.Provider>
  );
}
export const useVehicle = () => useContext(Context);
export const describeVehicle = (v: Vehicle) =>
  [v.brand, v.model, v.details].filter(Boolean).join(" ") || "my car";
export function vehicleQuery(v: Vehicle) {
  const p = new URLSearchParams();
  if (v.brand) p.set("brand", v.brand);
  if (v.model) p.set("car", v.model);
  if (v.details) p.set("details", v.details);
  return p.size ? `?${p}` : "";
}
export function VehicleSummary() {
  const { vehicle, setVehicle } = useVehicle();
  if (!vehicle.brand && !vehicle.model) return null;
  return (
    <div className="saved-vehicle">
      <div className="container">
        <span>
          <Car size={17} />
          <span>
            Your car: <strong>{describeVehicle(vehicle)}</strong>
          </span>
        </span>
        <Link href="/products/">Change car</Link>
        <button aria-label="Clear saved car" onClick={() => setVehicle(empty)}>
          <X size={17} />
        </button>
      </div>
    </div>
  );
}
