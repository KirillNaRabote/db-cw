//import type { Config } from "tailwindcss";
/** @type {import('tailwindcss').Config} */
const twColors = require('tailwindcss/colors')

const colors = {
  transparent: twColors.transparent,
  gray: '#CDCDCD',
  black: '#2E3239',
  white: twColors.white,
  primary: '#FF9902',
  secondary: '#161D25',
  'bg-color': 'F2F2F5',
  aqua: '#268697',
  red: twColors.red[400]
}

module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{html,js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors,
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    zIndex: {
      1: 1,
      2: 2,
      3: 3
    },
    keyframes: {
      animationOpacity: {
        from: {opacity: '0.2'},
        to: {opacity: '1'}
      },
      scaleIn: {
        '0%': {
          opacity: '0',
          transform: 'scale(0.9)'
        },
        '50%': {
          opacity: '0.3',
        },
        '100%': {
          opacity: '1',
          transform: 'scale(1)'
        }
      }
    }
  },
  plugins: [],
};
