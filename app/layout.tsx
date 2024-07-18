import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { StrictMode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Crate",
    default: "Crate",
  },
  keywords: ["Crate", "Discogs", "Music", "AI", "Analyzer", "Bpm"],
  description: "Join the Crate waitlist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <StrictMode>
      <html lang="en">
        <body className={inter.className}>
        {children}
      </body>
    </html>
    // </StrictMode>
  );
}
