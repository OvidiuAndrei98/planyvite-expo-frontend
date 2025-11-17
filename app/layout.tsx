import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Footer } from "@/components/navigation/Footer";
import DesktopMenu from "@/components/navigation/DesktopMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Planyvite Expo",
  applicationName: "Planyvite Expo - Catalog furnizori pentru evenimentul tau",
  referrer: "origin-when-cross-origin",
  publisher: "planyvite.ro",
  description:
    "Planyvite Expo - Acces la furnizori și resurse pentru planificarea evenimentelor tale",
  openGraph: {
    title: "Titlul Site-ului",
    description: "O scurtă descriere a paginii tale.",
    images: [
      {
        url: "/planyvite_logo.svg",
        width: 1200,
        height: 630,
        alt: "Imagine de previzualizare a site-ului",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
