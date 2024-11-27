/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
        apple: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
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
