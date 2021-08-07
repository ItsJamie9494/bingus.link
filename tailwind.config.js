module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", '"Inter"'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/custom-forms")],
};