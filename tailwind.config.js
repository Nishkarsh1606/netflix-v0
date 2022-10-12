/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:"jit",
  content: ["./test.html","./public/*.{html,js}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {},
  },
  plugins: [],
}
