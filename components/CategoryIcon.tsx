import {
  Monitor,
  AudioLines,
  Armchair,
  Lightbulb,
  Video,
  ScanLine,
  Sun,
  Layers,
  Car,
} from "lucide-react";
import { categories } from "@/lib/catalogue";
export default function CategoryIcon({
  category,
  size = 36,
}: {
  category: string;
  size?: number;
}) {
  const icons: Record<string, typeof Car> = {
    screen: Monitor,
    audio: AudioLines,
    seat: Armchair,
    light: Lightbulb,
    camera: Video,
    safety: ScanLine,
    sun: Sun,
    mat: Layers,
  };
  const key = categories.find((c) => c.slug === category)?.icon || category;
  const Icon = icons[key] || Car;
  return <Icon size={size} strokeWidth={1.4} aria-hidden="true" />;
}
