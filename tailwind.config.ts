import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";
import plugin from "tailwindcss/plugin";

const SHADES = {
  lp: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
  background: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
};

// Tailwind can't apply an opacity modifier (bg-lp-400/15) to a plain var()
// color and silently emits no CSS for it, so each color is a function that
// mixes the variable with transparent instead.
const withOpacity =
  (variable: string) =>
  ({ opacityValue }: { opacityValue?: string }) =>
    opacityValue === undefined || opacityValue === "1"
      ? `var(${variable})`
      : `color-mix(in srgb, var(${variable}) calc(${opacityValue} * 100%), transparent)`;

const customColors = Object.fromEntries(
  Object.entries(SHADES).flatMap(([name, shades]) =>
    shades.map((shade) => [
      `${name}-${shade}`,
      withOpacity(`--${name}-${shade}`),
    ]),
  ),
);

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
        lightPurple4: "#5e566d",
        ...customColors,
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
      backgroundColor: {
        primary: "rgb(var(--color-background-primary))",
        secondary: "rgb(var(--color-background-secondary))",
      },
      borderColor: {
        DEFAULT: "var(--background-900)",
        primary: "rgb(var(--color-background-primary))",
      },
    },
  },
  plugins: [
    typography,
    plugin(({ addUtilities }) => {
      addUtilities({
        ".field-sizing-content": {
          "field-sizing": "content",
        },
      });
    }),
  ],
};
export default config;
