import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter","system-ui","-apple-system","BlinkMacSystemFont","Segoe UI","Roboto","sans-serif"],
      },
      colors: {
        primary: { DEFAULT: "#2563eb", foreground: "#ffffff" },
        destructive: { DEFAULT: "#ef4444", foreground: "#ffffff" },
        muted: { DEFAULT: "#f1f5f9", foreground: "#64748b" },
        accent: { DEFAULT: "#f8fafc", foreground: "#0f172a" },
      },
    },
  },
  plugins: [],
};
export default config;