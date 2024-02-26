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
        primary: {
          main: "#43E0B3",
          light: "#000000",
          dark: "#1C4942",
        },
        background: {
          main: "#222222",
          light: "#2B2B2B",
          dark: "#000000",
        },
        error: {
          main: "#EA4F30",
          light: "#FAEDEA",
          dark: "#160705",
        },
        warning: {
          main: "#F0AD2D",
          light: "#FDF4E7",
          dark: "#170F02",
        },
        success: {
          main: "#1EB871",
          light: "#EFF7EE",
          dark: "#091108",
        },
        text: {
          main: "#F7FAF3",
          light: "#B0B0B0",
          dark: "#000000",
        },
        transparent: {
          main: "rgba(0, 0, 0, 0.5)",
          dark: "rgba(0, 0, 0, 0.7)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
