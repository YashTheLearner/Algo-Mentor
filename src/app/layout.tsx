import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AlgoMentor",
  description: "AI-powered DSA mentor for guided problem solving & interview preparation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-[--bg] text-[--text] font-sans">

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="h-[calc(100vh-56px)]">
          {children}
        </main>

      </body>
    </html>
  );
}