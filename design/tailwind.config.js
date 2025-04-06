/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: "#275E91",
        secondary: "#7A8D79",
        highlight: "#C9D4DC",
        
        // Text and background colors
        text: "#1C1C1C",
        background: "#ECEDE3",
        footer: "#F5F5EF",
        
        // Status/indicator colors
        success: "#2E7D32",
        warning: "#F57C00",
        error: "#C62828",
        
        // Additional colors
        accent: "#5B7B9C",
      },
      fontFamily: {
        headers: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      spacing: {
        // Base spacing units
        tiny: "4px",
        small: "8px",
        medium: "16px",
        large: "24px",
        xlarge: "32px",
        huge: "48px",
      },
      borderRadius: {
        DEFAULT: "4px",
        card: "8px",
      },
      boxShadow: {
        card: "0px 2px 4px rgba(0, 0, 0, 0.05)",
        "card-hover": "0px 4px 8px rgba(0, 0, 0, 0.1)",
      },
      animation: {
        "fade-in": "fadeIn 250ms ease-out",
        "slide-up": "slideUp 250ms ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
