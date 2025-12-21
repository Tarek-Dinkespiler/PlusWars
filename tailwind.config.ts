import type { Config } from "tailwindcss"

const config: Config = {
  // Enable class-based dark mode
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#000",
        white: "#fff",
        // Dark mode specific colors
        'dark-bg': "#1a1a1a",
        'dark-border': "#666",
        'dark-text': "#f5f5f5",
      },
      fontFamily: {
        sans: ["system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}

export default config
