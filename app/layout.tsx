import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CursorGlow } from "./components/CursorGlow";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://azuo.in"),
  title: "AZUO — Engineering products that don't exist yet",
  description:
    "AZUO is an engineering studio. You imagine it, we engineer it — from impossible ideas to production systems. AI systems, industrial AI, voice interfaces, digital twins, and the platforms around them.",
  keywords: [
    "engineering studio",
    "AI systems",
    "industrial AI",
    "voice interfaces",
    "digital twin",
    "product engineering",
  ],
  openGraph: {
    title: "AZUO — Engineering products that don't exist yet",
    description:
      "You imagine it. We engineer it. From impossible ideas to production systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Layered depth field — behind everything (grid lives in Hero only) */}
        <div className="backdrop-field" aria-hidden />
        <div className="noise-layer" aria-hidden />
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
