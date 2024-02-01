import { Inter, Montserrat, Fraunces } from "next/font/google";
import React from "react";
import { Metadata } from "next";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400"],
  variable: "--font-fraunces",
});

const MontSerrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Diesel NG",
  description:
    "Your go-to source for the most up-to-date diesel (AGO) depot prices in Nigeria.",
  icons: {
    icon: "/images/icons/site-logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body
      className={`${MontSerrat.variable} ${inter.variable} ${fraunces.variable}`}
    >
      <html lang="en">
        <body>{children}</body>
      </html>
    </body>
  );
}
