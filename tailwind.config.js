/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#2a2a2a",
      white: "#c9c6c6",
      gray_500: "#4a4a4a",
      gray_800: "#383838",
      purple: "#7779ae",
      tahiti: "#3ab7bf",
      silver: "#ecebff",
      "bubble-gum": "#ff77e9",
      red: "#FF2d2d",
      bermuda: "#78dcca"
    },
    extend: {}
  },
  plugins: []
}
