import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        main: '#FFDC58', // Bright yellow
        mainAccent: '#ffc800',
        mainAccent2: '#f6a313', // RGB 246,163,19
        overlay: 'rgba(0,0,0,0.8)',
        bg: '#FEF2E8',
        text: '#000',
        border: '#000',
        darkBg: '#374151',
        darkText: '#eeefe9',
        darkBorder: '#000',
      },
      borderRadius: {
        base: '8px',
      },
      boxShadow: {
        light: '1px 4px 0px 0px #000',
        dark: '1px 4px 0px 0px #000',
      },
      translate: {
        boxShadowX: '1px',
        boxShadowY: '4px',
        reverseBoxShadowX: '-1px',
        reverseBoxShadowY: '-4px',
      },
      fontFamily: {
        sans: ['Public Sans', 'Montserrat', 'sans-serif'],
        heading: ['Montserrat', 'Public Sans', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      fontSize: {
        'large-title': ['64px', 'auto'],
        'medium-title': ['24px', 'auto'],
        'small-title': ['12px', 'auto'],
        'small-subtitle': ['10px', 'auto'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
