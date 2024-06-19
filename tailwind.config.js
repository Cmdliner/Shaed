import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      sm: '360px',
      md: '600px',
      lg: '900px',
    },
  },
  plugins: [
    daisyui
  ],
  daisyui: {
     themes: ["dark"]
  }
}

