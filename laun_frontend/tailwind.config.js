/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        laun: {
          graphite: "#101827",
          teal: "#2DD4BF",
          violet: "#A78BFA",
          offwhite: "#F3F4F6",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
