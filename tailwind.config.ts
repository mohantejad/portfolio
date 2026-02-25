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
        ink: "#0b0f1a",
        surface: "#0f172a",
        panel: "#111827",
        border: "#1f2937",
        primary: "#6ee7f8",
        primaryStrong: "#22d3ee",
        accent: "#f59e0b",
        text: "#e6edf7",
        muted: "#94a3b8",
        hover: "#34d399",
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(34, 211, 238, 0.2)',
        card: '0 12px 30px rgba(2, 6, 23, 0.5)',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(180deg, rgba(11, 15, 26, 0.9) 0%, rgba(11, 15, 26, 0.2) 50%, rgba(11, 15, 26, 0.9) 100%)',
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")
  ],
} satisfies Config;
