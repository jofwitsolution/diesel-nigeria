import React from "react";
import { SessionProvider } from "next-auth/react";
import { Metadata } from "next";
import { Inter, Montserrat, Fraunces } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import "@/styles/styles.css";

import { auth } from "@/auth";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={`${MontSerrat.variable} ${inter.variable} ${fraunces.variable}`}
        >
          <Toaster position="top-right" richColors className="z-[9500]" />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
