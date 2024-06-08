import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#0f172a",
        "secondary": "#334155",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        slideInFromLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInFromRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInFromBottom: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideInFromTop: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        pulse: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        assembleLeft: 'slideInFromLeft 1.5s ease-out forwards',
        assembleRight: 'slideInFromRight 1.5s ease-out forwards',
        assembleTop: 'slideInFromTop 1.5s ease-out forwards',
        assembleBottom: 'slideInFromBottom 1.5s ease-out forwards',
        fadeIn: 'fadeIn 1s ease-out forwards',
      },
      perspective: { // Add this if Tailwind doesn't support it natively
        'none': 'none',
        '1000': '1000px',
      },
    },
  },
  plugins: [],
};

export default config;
