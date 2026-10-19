import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FFFFFF",
        soft: "#F4F3EF",
        ink: "#111111",
        muted: "#5C5C57",
        line: "#E4E3DD",
        brand: {
          black: "#0A0A0A",
          gold: "#F5B82E",
          "gold-hover": "#E0A21A",
          "gold-text": "#8A5A00",
          wa: "#1FAA59",
          sale: "#D93025",
        },
      },
      fontFamily: {
        heading: ["Barlow Condensed", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: { retail: "8px" },
    },
  },
  plugins: [],
} satisfies Config;
