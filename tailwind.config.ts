import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#0b4f63",
          "blue-dark": "#083a4a",
          "blue-light": "#0d6080",
          yellow: "#f4b400",
          "yellow-dark": "#d9a000",
          "yellow-light": "#f7c533",
        },
      },
    },
  },
  plugins: [],
};

export default config;
