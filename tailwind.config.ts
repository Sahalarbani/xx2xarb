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
        // Ini penting biar 'bg-brand-dark' di CSS kamu jalan
        brand: {
          accent: "#00f0ff", 
          dark: "#050505",   
        },
      },
      fontFamily: {
        oxanium: ["var(--font-oxanium)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
