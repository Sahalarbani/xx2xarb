import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Anda bisa menambahkan atau memodifikasi kustomisasi tema 
      // "Gaming Dark Neon" Anda di sini.
      // Contoh:
      colors: {
        'neon-green': '#39FF14',
        'neon-blue': '#00BFFF',
        'brand-dark': '#0d0c22',
        'brand-light': '#1a1a3a',
      },
      boxShadow: {
        'neon-glow': '0 0 5px #39FF14, 0 0 10px #39FF14, 0 0 20px #39FF14',
      },
    },
  },
  plugins: [],
}
export default config
