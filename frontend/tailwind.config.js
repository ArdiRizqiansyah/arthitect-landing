/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
        barlow: ["Barlow", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        linear: "#F4F6F5",
        "primary-app": "#254D4D",
        "primary-surfacea-app": "#254D4D33",
        "dark-app": "#2E2F32",
        "bg-main": "#F8F8F8",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};

