import type { Metadata } from "next";
import { Header, Footer } from "@/components/SiteChrome";
import { VehicleProvider } from "@/components/VehicleContext";
import { origin } from "@/lib/catalogue";
import "./globals.css";
import MotionEnhancements from "@/components/MotionEnhancements";
export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: {
    default: "Best Car Accessories Ahmedabad | Upgrade Your Ride",
    template: "%s | Best Car Accessories",
  },
  description:
    "Explore car accessories at Mithakhali Circle, Ahmedabad. Android screens, car audio installation, seat covers in Navrangpura and in-house fitting. Get a quote on WhatsApp.",
  openGraph: {
    title: "Best Car Accessories — Upgrade Your Ride",
    description:
      "Your car. Your way. Accessories and in-house fitting in Mithakhali, Ahmedabad.",
    images: [{ url: "/logo.png", width: 1536, height: 1024 }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <VehicleProvider>
          <Header />
          <MotionEnhancements />
          <main id="main">{children}</main>
          <Footer />
        </VehicleProvider>
      </body>
    </html>
  );
}
