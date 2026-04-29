/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Base
        ink: "#FFFFFF",
        panel: "rgba(255, 255, 255, 0.7)",

        // Text colors
        text: "#0F172A",
        subtext: "#475569",

        // Accent palette
        brandprimary: "#4F46E5",
        brandsecondary: "#06B6D4",
        accent: "#EC4899",

        // Aliases to avoid breaking existing code
        cyan: "#06B6D4",
        plasma: "#EC4899",
        violet: "#4F46E5",

        // UI helpers
        border: "rgba(15, 23, 42, 0.08)",
        muted: "#F1F5F9",
        hover: "#E0E7FF"
      },

      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },

      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.08)",
        glow: "0 0 40px rgba(79, 70, 229, 0.25)"
      },

      backgroundImage: {
        "subtle-grid":
          "linear-gradient(rgba(15,23,42,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,.04) 1px, transparent 1px)",

        "gradient-main":
          "radial-gradient(circle at 10% 20%, rgba(79,70,229,0.12), transparent 40%), radial-gradient(circle at 90% 80%, rgba(6,182,212,0.12), transparent 40%)"
      }
    }
  },
  plugins: []
};