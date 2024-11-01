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
        background: "var(--background)",
        foreground: "var(--foreground)",
        'standard-dark-blue': '#012665',
        'standard-orange': '#F88E38',
        'button-orange': '#FF7300',
      },
      fontFamily: {
        header: ['var(--font-montserrat)'],
        body: ['var(--font-roboto)'],
      }
    },
  },
  plugins: [],
};
export default config;
