/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["'Playfair Display'", "serif"],
        inter: ["'Inter'", "sans-serif"],
      },
      colors: {
        gold: {
          50:  "#FFFDF0",
          100: "#FFF8D6",
          200: "#FFEEA3",
          300: "#FFE066",
          400: "#FFD700",
          500: "#E6C200",
          600: "#C9A800",
          700: "#A68900",
          800: "#7A6500",
          900: "#4D3F00",
        },
        obsidian: {
          50:  "#F5F5F5",
          100: "#E0E0E0",
          200: "#BDBDBD",
          300: "#9E9E9E",
          400: "#757575",
          500: "#424242",
          600: "#212121",
          700: "#1A1A1A",
          800: "#121212",
          900: "#0A0A0A",
          950: "#050505",
        },
      },
      animation: {
        "fade-in-up":   "fadeInUp 0.8s ease both",
        "fade-in":      "fadeIn 0.6s ease both",
        "slide-in-left":"slideInLeft 0.7s ease both",
        "scale-in":     "scaleIn 0.5s ease both",
        "shimmer":      "shimmer 2s linear infinite",
        "float":        "float 3s ease-in-out infinite",
        "pulse-gold":   "pulseGold 2s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%":   { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInLeft: {
          "0%":   { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%":   { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(255,215,0,0.4)" },
          "50%":      { boxShadow: "0 0 0 15px rgba(255,215,0,0)" },
        },
      },
      backgroundImage: {
        "gold-gradient":  "linear-gradient(135deg, #FFD700 0%, #E6C200 50%, #C9A800 100%)",
        "dark-gradient":  "linear-gradient(135deg, #0A0A0A 0%, #121212 50%, #1A1A1A 100%)",
        "hero-pattern":   "radial-gradient(ellipse at top, #1A1A1A 0%, #050505 100%)",
      },
    },
  },
  plugins: [],
};
