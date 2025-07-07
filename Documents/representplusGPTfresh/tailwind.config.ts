import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-inter)", "sans-serif"],
      serif: ["var(--font-lora)", "serif"],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      background: 'rgb(var(--background) / <alpha-value>)',
      foreground: 'rgb(var(--foreground) / <alpha-value>)',
      primary: 'rgb(var(--primary) / <alpha-value>)',
      muted: 'rgb(var(--muted) / <alpha-value>)',
      card: 'rgb(var(--card) / <alpha-value>)',
      border: 'rgb(var(--border) / <alpha-value>)',
    },
    extend: {
      colors: {
        'agency-dark': '#121212',
        'agency-panel': '#1E1E1E',
        'agency-mint': '#4D9E9A',
        'agency-light': '#EAEAEA',
        'agency-gray': '#A0A0A2',
      },
    }, // We leave extend empty for now
  },
  plugins: [],
}
export default config 