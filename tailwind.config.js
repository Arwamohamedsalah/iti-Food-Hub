/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        iti: {
          red: '#B92429',
          'red-dark': '#8F1F24',
          gray: '#757575',
          50: '#FBF4F4',
          100: '#F3E2E3',
          200: '#E5C5C7',
        },
      },
    },
  },
  plugins: [],
};
