/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#00A48A",
        "primary-dark": "#005042",
        secondary: "#003C4B",
        "secondary-dark": "#008BAA",
      },
    },
  },
  plugins: [],
};
