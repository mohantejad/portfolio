import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        primary: "#d6f8ff",
        secondary: "#6366f1",
        accent: "#facc15",
        text: "#dce7e9",
        navbar: "#111827",
        hover: "#3ebed5",
      },
      fontFamily: {
        geist: ['Geist', 'sans-serif'],
        geistMono: ['Geist Mono', 'monospace'],
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")
  ],
} satisfies Config;
