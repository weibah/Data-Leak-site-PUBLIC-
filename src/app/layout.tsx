import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BrokenData — Data Marketplace",
  description: "Access free and premium datasets. Raw, real, and ready to use.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} antialiased bg-black text-green-400`}
        style={{ fontFamily: "var(--font-geist-mono), monospace" }}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
