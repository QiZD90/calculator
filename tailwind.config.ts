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
        'background': '#17171C',
        'accent': '#4B5EFC',
        'high': '#4E505F',
        'low': '#2E2F38'
      },
      spacing: {
        '18': '4.5rem'
      }
    }
  },
  plugins: [],
};
export default config;
