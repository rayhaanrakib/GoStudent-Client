/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0BAC7C',
        secondary: '#262626',
        accent: '#FF8080',
        // Light mode semantic colors
        'surface': {
          DEFAULT: '#ffffff',
          dark: '#1a1a2e',
        },
        'surface-alt': {
          DEFAULT: '#f8fafc',
          dark: '#16213e',
        },
        'surface-muted': {
          DEFAULT: '#f2f2f7',
          dark: '#0f3460',
        },
        'text-primary': {
          DEFAULT: '#1e293b',
          dark: '#f1f5f9',
        },
        'text-secondary': {
          DEFAULT: '#475569',
          dark: '#cbd5e1',
        },
        'text-muted': {
          DEFAULT: '#64748b',
          dark: '#94a3b8',
        },
        'border-default': {
          DEFAULT: '#e2e8f0',
          dark: '#334155',
        },
      },
      fontFamily: {
        sans: ['"Baloo Da 2"', 'system-ui', 'sans-serif'],
      },
    },
  },
  daisyui: {
    themes: ["emerald"],
  },
  plugins: [
    require("daisyui"),
    require('preline/plugin'),
  ],
}
