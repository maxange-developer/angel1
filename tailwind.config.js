/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: "#00f0ff",
          pink: "#ff00ff",
          green: "#00ff41",
        },
      },
      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
        "slide-in": "slideIn 0.5s ease-out",
        "fade-in": "fadeIn 0.6s ease-out",
        typewriter: "typewriter 3s steps(40) 1s forwards",
      },
      keyframes: {
        glow: {
          "0%": {
            boxShadow: "0 0 5px #00f0ff, 0 0 10px #00f0ff, 0 0 15px #00f0ff",
          },
          "100%": {
            boxShadow: "0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 30px #00f0ff",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        typewriter: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      screens: {
        "max-h-820": { raw: "(max-height: 820px)" },
        "max-h-948": { raw: "(max-height: 948px)" },
        "tablet-range": { raw: "(min-width: 1024px) and (max-width: 1280px)" },
        "tablet-compact": {
          raw: "(max-width: 1278px) and (max-height: 948px)",
        },
        "blog-vertical": {
          raw: "(max-width: 1024px) and (min-height: 948px) and (max-height: 1440px)",
        },
        "timeline-vertical": {
          raw: "((max-width: 1023px)) or ((min-width: 1024px) and (max-width: 1280px) and (max-height: 1440px))",
        },
      },
    },
  },
  plugins: [],
};
