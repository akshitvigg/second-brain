/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        purple: {
          300: "#e0e5fe",
          500: "#6f6ac6",
          600: "#4f45e1",
        },
      },
      fontFamily: {
        poppins: ["Poppins"],
      },
      height: {
        "custom-h": "460px",
      },
      width: {
        "custom-h": "460px",
      },
    },
  },
  plugins: [],
};
