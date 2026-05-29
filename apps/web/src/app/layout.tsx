import type { Metadata } from "next";
import { Inter, Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FavoritesProvider } from "@/contexts/FavoritesContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

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
      <body className={`${inter.variable} ${outfit.variable} ${spaceGrotesk.variable} noise-overlay`}>
        <FavoritesProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </FavoritesProvider>
      </body>
    </html>
  );
}
