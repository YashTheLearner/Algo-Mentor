import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import AuthProvider from "@/components/providers/session-provider";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
      className={cn(geistMono.variable, "font-sans", geist.variable)}
      data-scroll="smooth"
    >
      <body className="bg-[--bg] text-[--text] font-sans">

        {/* Navbar */}
        {/* <Navbar /> */}

        {/* Main Content */}
        <main className="h-[calc(100vh-56px)]">
          <AuthProvider>
  {children}
</AuthProvider>
        </main>

      </body>
    </html>
  );
}