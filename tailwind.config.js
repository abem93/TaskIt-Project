/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'done': '#A7FC99;',
        'inProgress': '#99F6FC',
      }
    },
    
  },
  plugins: [],
}

