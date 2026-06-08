import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#2563eb", foreground: "#ffffff" },
        destructive: { DEFAULT: "#ef4444", foreground: "#ffffff" },
        muted: { DEFAULT: "#f1f5f9", foreground: "#64748b" },
        accent: { DEFAULT: "#f8fafc", foreground: "#0f172a" },
      },
      fontFamily: {
        sans: ["Inter","system-ui","sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
