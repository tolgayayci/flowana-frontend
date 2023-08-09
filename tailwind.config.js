/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "sfblue": {
          DEFAULT: '#2F5061',
          100: '#C9DBE5',
          200: '#ADC9D7',
          300: '#92B7CA',
          400: '#E4EEF2',
          500: '#5B93AF',
          600: '#4A7D98',
          700: '#3C677C',
          800: '#2F5061',
          900: '#1D313B',
        },
        sfgreen: "#4297A0",
        sfred: "#E57F84",
        sfgray: "#FFCDB2",
        sfblack: "#333333"
      },
      fontFamily: {
        'cabin': ['"Cabin"', 'sans-serif'],
      },
    },
    
  },
  plugins: [],
}
