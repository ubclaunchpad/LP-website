import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightPurple: "#3A3543",
        lightPurple2: "#CDC2E6",
        lightPurple3: "#6A3AD9",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gray-gradient": "linear-gradient(90deg, #FFFFFF 0%, #999999 100%)",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["var(--font-nunito-sans)", ...fontFamily.sans],
        heading: ["var(--font-epilogue)", ...fontFamily.sans],
      },
      transitionProperty: {
        height: "height",
      },
      textColor: {
        "lp-50": "var(--lp-50)",
        "lp-100": "var(--lp-100)",
        "lp-200": "var(--lp-200)",
        "lp-300": "var(--lp-300)",
        "lp-400": "var(--lp-400)",
        "lp-500": "var(--lp-500)",
        "lp-600": "var(--lp-600)",
        "lp-700": "var(--lp-700)",
        "lp-800": "var(--lp-800)",
        "lp-900": "var(--lp-900)",
      },
      backgroundColor: {
        primary: "rgb(var(--color-background-primary))",
        secondary: "rgb(var(--color-background-secondary))",
        "lp-50": "var(--lp-50)",
        "lp-100": "var(--lp-100)",
        "lp-200": "var(--lp-200)",
        "lp-300": "var(--lp-300)",
        "lp-400": "var(--lp-400)",
        "lp-500": "var(--lp-500)",
        "lp-600": "var(--lp-600)",
        "lp-700": "var(--lp-700)",
        "lp-800": "var(--lp-800)",
        "lp-900": "var(--lp-900)",
        "background-50": "var(--background-50)",
        "background-100": "var(--background-100)",
        "background-200": "var(--background-200)",
        "background-300": "var(--background-300)",
        "background-400": "var(--background-400)",
        "background-500": "var(--background-500)",
        "background-600": "var(--background-600)",
        "background-700": "var(--background-700)",
        "background-800": "var(--background-800)",
        "background-900": "var(--background-900)",
        "background-950": "var(--background-950)",
      },
      borderColor: {
        DEFAULT: "var(--background-900)",

        primary: "rgb(var(--color-background-primary))",
        "lp-50": "var(--lp-50)",
        "lp-100": "var(--lp-100)",
        "lp-200": "var(--lp-200)",
        "lp-300": "var(--lp-300)",
        "lp-400": "var(--lp-400)",
        "lp-500": "var(--lp-500)",
        "lp-600": "var(--lp-600)",
        "lp-700": "var(--lp-700)",
        "lp-800": "var(--lp-800)",
        "lp-900": "var(--lp-900)",

        "background-50": "var(--background-50)",
        "background-100": "var(--background-100)",
        "background-200": "var(--background-200)",
        "background-300": "var(--background-300)",
        "background-400": "var(--background-400)",
        "background-500": "var(--background-500)",
        "background-600": "var(--background-600)",
        "background-700": "var(--background-700)",
        "background-800": "var(--background-800)",
        "background-900": "var(--background-900)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
