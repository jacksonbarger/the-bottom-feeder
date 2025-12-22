import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/components/cart/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import { BUSINESS_INFO } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://thebottomfeeder.com'),
  title: {
    default: `${BUSINESS_INFO.name} | Cordless Battery Powered Pool Vacuums`,
    template: `%s | ${BUSINESS_INFO.name}`,
  },
  description: BUSINESS_INFO.tagline,
  keywords: [
    "pool vacuum",
    "cordless pool vacuum",
    "battery pool vacuum",
    "pool cleaner",
    "pool maintenance",
    "pool cleaning",
    "bottom feeder",
    "Las Vegas",
    "Nevada",
  ],
  authors: [{ name: BUSINESS_INFO.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: BUSINESS_INFO.name,
    title: BUSINESS_INFO.name,
    description: BUSINESS_INFO.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#1A1A1A] text-[#F5F5F5]`}
      >
        <CartProvider>
          <Header />
          <main className="min-h-screen pt-20">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
