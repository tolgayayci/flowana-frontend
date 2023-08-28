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
        "sfgreen": {  
          DEFAULT: '#4297A0',    
          400: '#A9D7DC',  
          500: '#8DC9D0',  
          600: '#70BCC4',  
          700: '#53AEB8',  
          800: '#4297A0',  
          900: '#327278',  
          950: '#295F64'
        },
        "sfred": {
          500: '#FAE5E6',
          600: '#F3C3C5',
          700: '#ECA1A5',
          800: '#E57F84',
          900: '#DC5057',
          950: '#D73941'
        },
        sfgray: "#FFCDB2",
        sfblack: "rgba(51, 51, 51, 0.5)"
      },
      fontFamily: {
        'cabin': ['"Cabin"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
