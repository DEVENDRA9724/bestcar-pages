"use client";
import { useState } from "react";
import Link from "next/link";
import { AudioLines, Armchair, Lightbulb, ArrowUpRight } from "lucide-react";
import { useVehicle, vehicleQuery } from "./VehicleContext";
const modes = [
  {
    id: "sound",
    label: "Sound",
    title: "FEEL EVERY NOTE.",
    copy: "Explore speakers, amplifiers and screens for a soundtrack that makes the journey.",
    slug: "speakers-amplifiers",
    icon: AudioLines,
  },
  {
    id: "comfort",
    label: "Comfort",
    title: "MAKE YOURSELF AT HOME.",
    copy: "Explore seat covers and thoughtful interior details for a cabin that feels like yours.",
    slug: "seat-covers",
    icon: Armchair,
  },
  {
    id: "style",
    label: "Style",
    title: "SET A DIFFERENT MOOD.",
    copy: "Explore lighting and finishing touches that add a little personality to every drive.",
    slug: "lighting",
    icon: Lightbulb,
  },
];
export default function UpgradeExplorer() {
  const [selected, setSelected] = useState(0);
  const current = modes[selected];
  const { vehicle } = useVehicle();
  return (
    <section className="container upgrade-explorer" id="upgrade-garage">
      <div className="garage-panel">
        <div className="garage-top">
          <span className="eyebrow">THE UPGRADE GARAGE</span>
          <span>EXPLORE YOUR DRIVE</span>
        </div>
        <div className="garage-body">
          <div className="garage-illustration" aria-hidden="true">
            <svg
              viewBox="0 0 720 260"
              className={`garage-car mode-${current.id}`}
            >
              <path className="garage-ground" d="M34 211H680" />
              <path
                className="garage-body-fill"
                d="M76 163L92 124L185 111Q260 42 359 56Q430 60 494 115L596 131Q630 137 644 169L638 194H585Q576 147 535 147Q491 147 484 194H247Q236 148 194 148Q153 148 143 194H80Z"
              />
              <path
                className="car-outline"
                d="M76 163L92 124L185 111Q260 42 359 56Q430 60 494 115L596 131Q630 137 644 169L638 194H585M484 194H247M143 194H80L76 163"
              />
              <path
                className="car-window"
                d="M212 111Q265 65 336 68L338 115ZM353 69Q421 75 469 117L353 115Z"
              />
              <path
                className="car-detail"
                d="M339 125V181M482 130L475 176M101 143H147M598 145L625 154M383 135H405M96 182H137"
              />
              <circle className="car-wheel" cx="195" cy="192" r="39" />
              <circle className="car-wheel" cx="535" cy="192" r="39" />
              <circle className="car-rim" cx="195" cy="192" r="24" />
              <circle className="car-rim" cx="535" cy="192" r="24" />
              <path
                className="car-rim-lines"
                d="M195 170V214M173 192H217M535 170V214M513 192H557"
              />
              <g className="garage-sound-zone">
                <circle cx="174" cy="135" r="10" />
                <path d="M155 122Q141 135 155 148M144 113Q122 135 144 157M193 122Q207 135 193 148" />
              </g>
              <g className="garage-comfort-zone">
                <path d="M307 105V144Q307 157 320 157H341V172H294Q284 172 284 160V111Q284 99 295 99Q307 99 307 105ZM398 116V145Q398 157 410 157H430V172H386Q375 172 375 160V120Q375 109 386 109Q398 109 398 116Z" />
              </g>
              <g className="garage-style-zone">
                <path d="M255 198H478M603 157L630 165M98 140H136" />
                <path className="style-secondary" d="M266 207H467" />
              </g>
              <path className="garage-track" d="M49 235H127M604 235H678" />
              <text x="360" y="244" textAnchor="middle">
                YOUR CAR. YOUR WAY.
              </text>
            </svg>
            <div className="garage-annotation">
              <span>0{selected + 1}</span>
              <span>{current.label.toUpperCase()} UPGRADE</span>
              <span className="annotation-line" />
            </div>
          </div>
          <div className="garage-copy">
            <span className="eyebrow">SMALL CHANGES. A DIFFERENT DRIVE.</span>
            <h2 key={current.title}>{current.title}</h2>
            <p key={current.copy}>{current.copy}</p>
            <Link
              className="text-link"
              href={`/products/${current.slug}/${vehicleQuery(vehicle)}`}
            >
              Explore {current.label.toLowerCase()} upgrades
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
        <div
          className="garage-controls"
          role="group"
          aria-label="Explore accessory upgrades"
        >
          {modes.map((mode, i) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
              >
                <Icon size={20} />
                <span>{mode.label}</span>
                <span className="garage-tab-number">0{i + 1}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
