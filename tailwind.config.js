/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{htm,js}", "./*/*.{htm,js}"],
  theme: {
    screens: {
      'xs': '490px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: [],
}

