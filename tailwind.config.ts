import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

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
        'gray-gradient': 'linear-gradient(90deg, #FFFFFF 0%, #999999 100%)',
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["var(--font-nunito-sans)", ...fontFamily.sans],
        heading: ["var(--font-epilogue)", ...fontFamily.sans],
      },
      backgroundColor: {
        "primary": "rgb(var(--color-background-primary))",
      }

    },
  },
  plugins: [],
};
export default config;
