/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    letterSpacing: {
      default: '0.2',
    },
    container: {
      center: true,
      padding: '12px',
    },
    extend: {
      screens: {
        xs: '376px',
        sm: '576px',
        md: '768px',
        lg: '1440px',
      },
      colors: {
        primary: '#F9B471',
        secondary: '#51A8BC',
        tertiary: '#BDE8F9',
        gray: {
          light: '#F9F8F6',
          DEFAULT: '#EEEDE8',
          dark: '#A5A39C',
        },
        'light-main': '#FFFAF4',
        dark: '#4D4C52',
        disabled: '#E2E1DD',
      },
      fontSize: {
        24: '24px',
        20: '20px',
        16: '16px',
        14: '14px',
        12: '12px',
        10: '10px',
      },
    },
  },
  plugins: [],
};
