/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: [
    "./app/**/*.{tsx,jsx,ts,js}",
    "./components/**/*.{tsx,jsx,ts,js}",
    "./global.css",
  ],

  presets: [require("nativewind/preset")],
  safelist: [
    {
      pattern:
        /(bg|border|text|stroke|fill)-(primary|secondary|tertiary|error|success|warning|info|typography|outline|background)-(0|50|100|200|300|400|500|600|700|800|900|950|white|gray|black|error|warning|muted|success|info|light|dark)/,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Poppins", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        poppinsLight: ["Poppins--Light", "sans-serif"],
        poppinsSemiBold: ["Poppins--SemiBold", "sans-serif"],
        poppinsBold: ["Poppins--Bold", "sans-serif"],
      },
      fontSize: {
        "2xs": "10px",
      },
      boxShadow: {
        "hard-1": "-2px 2px 8px 0px rgba(38, 38, 38, 0.20)",
        "hard-2": "0px 3px 10px 0px rgba(38, 38, 38, 0.20)",
        "soft-1": "0px 0px 10px rgba(38, 38, 38, 0.1)",
        "soft-2": "0px 0px 20px rgba(38, 38, 38, 0.2)",
      },
    },
  },
  plugins: [],
};
