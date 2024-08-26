import { Epilogue, Nunito_Sans } from "next/font/google";

export const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  display: "swap",
  adjustFontFallback: false,
});

export const epilogue = Epilogue({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-epilogue",
});
