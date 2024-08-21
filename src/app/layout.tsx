import type { Metadata } from "next";
import "./globals.css";
import { epilogue, nunitoSans } from "@/app/fonts";

export const metadata: Metadata = {
  title: "UBC Launch Pad",
  description:
    "A student-run software engineering team devoted to building software projects in a collaborative and professional environment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.variable} ${epilogue.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
