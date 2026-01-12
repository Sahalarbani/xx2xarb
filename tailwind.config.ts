import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",        // Folder App (WAJIB)
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Folder Components (WAJIB)
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",        // Folder Lib (Jaga-jaga)
    "./src/**/*.{js,ts,jsx,tsx,mdx}",        // Jaga-jaga kalau pake src
  ],
  theme: {
    extend: {
      colors: {
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
