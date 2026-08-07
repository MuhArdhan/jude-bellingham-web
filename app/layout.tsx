import type { Metadata } from "next";
import { Geist, Oswald } from "next/font/google";
import "./globals.css";
import LenisProvider from "./components/LenisProvider";
import ScrollIndicator from "./components/ScrollIndicator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jude Bellingham | The Golden Boy",
  description: "A cinematic tribute exploring the incredible journey, achievements, and pure passion of Jude Bellingham.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${oswald.variable} antialiased`}
    >
      <body className="bg-black text-white min-h-screen">
        <ScrollIndicator />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
