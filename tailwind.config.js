/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#53BF9D",
        secondary: "#F9F2ED",
      },
      fontFamily: {
        novaMono: ["Nova Mono", "sans-serif"],
      },
    },
  },
  plugins: [],
};
