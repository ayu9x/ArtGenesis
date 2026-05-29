import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "ArtGenesis — Discover, Collect & Sell Extraordinary NFTs",
  description:
    "ArtGenesis is the premier NFT marketplace for digital art. Discover, collect, and sell extraordinary NFTs across Polygon, Ethereum, Base, and Arbitrum.",
  keywords: [
    "NFT",
    "marketplace",
    "digital art",
    "crypto",
    "blockchain",
    "Polygon",
    "Ethereum",
    "collectibles",
  ],
  authors: [{ name: "ArtGenesis" }],
  openGraph: {
    title: "ArtGenesis — NFT Marketplace",
    description: "Discover, collect & sell extraordinary NFTs",
    type: "website",
    locale: "en_US",
    siteName: "ArtGenesis",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArtGenesis — NFT Marketplace",
    description: "Discover, collect & sell extraordinary NFTs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="noise-overlay">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
