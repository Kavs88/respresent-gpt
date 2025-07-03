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
      white: '#ffffff',
      black: '#000000',
      background: '#0E0E0E',
      foreground: '#E5E5E5',
      primary: '#00ff9d', // Neon Green
      muted: '#888888',
    },
    extend: {}, // We leave extend empty for now
  },
  plugins: [],
}
export default config 