/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        teal: {
          700: "#0f766e",
          800: "#115e59",
        },
      },
    },
  },
  plugins: [],
};
