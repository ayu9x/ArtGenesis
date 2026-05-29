"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  Users,
  Palette,
  Zap,
  Clock,
  Flame,
  Gamepad2,
  Crown,
  Image as ImageIcon,
  Camera,
  Music,
  Sparkles,
  ChevronRight,
  BadgeCheck,
  ExternalLink,
} from "lucide-react";
import { NFTCard } from "@/components/nft/NFTCard";
import styles from "./page.module.css";

// ============ Mock Data ============
const STATS = [
  { label: "Total NFTs", value: "125K+", icon: Palette },
  { label: "Creators", value: "8.2K+", icon: Users },
  { label: "Volume Traded", value: "52K ETH", icon: TrendingUp },
];

const TRENDING_NFTS = [
  {
    id: "1",
    image: "/images/RareNFT.jpg",
    title: "Genesis Oracle #001",
    collection: "Genesis Collection",
    isVerified: true,
    price: "2.45",
    usdPrice: "4,890",
    creatorAvatar: "/images/Hackatao.jpg",
    creatorName: "Hackatao",
    likes: 234,
  },
  {
    id: "2",
    image: "/images/LiveAuction.jpg",
    title: "Cosmic Dreams #147",
    collection: "Cosmic Series",
    isVerified: true,
    price: "1.8",
    usdPrice: "3,600",
    creatorAvatar: "/images/Mike.jpg",
    creatorName: "Mike Parisella",
    likes: 186,
  },
  {
    id: "3",
    image: "/images/Savana.jpg",
    title: "Savanna Spirits",
    collection: "Nature Art",
    isVerified: false,
    price: "0.95",
    usdPrice: "1,900",
    creatorAvatar: "/images/Reeza.jpg",
    creatorName: "Reza Afshar",
    likes: 142,
  },
  {
    id: "4",
    image: "/images/Skyborne.png",
    title: "Skyborne Immortal #42",
    collection: "Skyborne Genesis",
    isVerified: true,
    price: "3.2",
    usdPrice: "6,400",
    creatorAvatar: "/images/Tobi.jpg",
    creatorName: "Tobi Schnorpfeil",
    likes: 312,
    isAuction: true,
    endTime: "2h 15m",
  },
];

const TOP_CREATORS = [
  {
    name: "Hackatao",
    handle: "@hackatao",
    avatar: "/images/Hackatao.jpg",
    volume: "342 ETH",
    isFollowing: true,
  },
  {
    name: "Mike Parisella",
    handle: "@slimesunday",
    avatar: "/images/Mike.jpg",
    volume: "289 ETH",
    isFollowing: true,
  },
  {
    name: "Reza Afshar",
    handle: "@rezaa_afsharr",
    avatar: "/images/Reeza.jpg",
    volume: "215 ETH",
    isFollowing: false,
  },
  {
    name: "Tobi Schnorpfeil",
    handle: "@tschnorpfei",
    avatar: "/images/Tobi.jpg",
    volume: "198 ETH",
    isFollowing: true,
  },
];

const CATEGORIES = [
  { name: "Art", icon: Palette, color: "#8b5cf6", count: "42K" },
  { name: "Gaming", icon: Gamepad2, color: "#06b6d4", count: "28K" },
  { name: "PFPs", icon: Crown, color: "#f59e0b", count: "35K" },
  { name: "Photography", icon: Camera, color: "#10b981", count: "18K" },
  { name: "Music", icon: Music, color: "#ef4444", count: "12K" },
  { name: "Collectibles", icon: Sparkles, color: "#ec4899", count: "22K" },
];

const LIVE_AUCTIONS = [
  {
    id: "a1",
    image: "/images/LiveAuction.jpg",
    title: "Ethereal Visions #88",
    collection: "Ethereal Collection",
    isVerified: true,
    price: "5.2",
    usdPrice: "10,400",
    creatorName: "Hackatao",
    creatorAvatar: "/images/Hackatao.jpg",
    likes: 89,
    isAuction: true,
    endTime: "1h 32m",
  },
  {
    id: "a2",
    image: "/images/RareNFT.jpg",
    title: "Digital Renaissance",
    collection: "Art Masters",
    isVerified: true,
    price: "3.7",
    usdPrice: "7,400",
    creatorName: "Mike Parisella",
    creatorAvatar: "/images/Mike.jpg",
    likes: 156,
    isAuction: true,
    endTime: "3h 45m",
  },
  {
    id: "a3",
    image: "/images/Savana.jpg",
    title: "Nature's Whisper #21",
    collection: "Wild Collection",
    isVerified: false,
    price: "1.4",
    usdPrice: "2,800",
    creatorName: "Reza Afshar",
    creatorAvatar: "/images/Reeza.jpg",
    likes: 67,
    isAuction: true,
    endTime: "5h 10m",
  },
];

// ============ Animated Counter ============
function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  return <span className={styles.counterValue}>{target}{suffix}</span>;
}

// ============ Home Page ============
export default function HomePage() {
  return (
    <div className={styles.page}>
      {/* ============ HERO SECTION ============ */}
      <section className={styles.hero} id="hero-section">
        <div className={styles.heroBackground}>
          <div className={styles.heroOrb1} />
          <div className={styles.heroOrb2} />
          <div className={styles.heroOrb3} />
          <div className={styles.heroGrid} />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>
              <Zap size={14} />
              <span>The Future of Digital Art</span>
            </div>

            <h1 className={styles.heroTitle}>
              Discover, Collect &<br />
              Sell Extraordinary{" "}
              <span className={styles.heroTitleAccent}>NFTs</span>
            </h1>

            <p className={styles.heroDesc}>
              ArtGenesis is the premier marketplace for unique digital
              collectibles. Explore curated collections from the world&apos;s
              top creators across multiple blockchains.
            </p>

            <div className={styles.heroCtas}>
              <Link href="/marketplace" className={styles.heroPrimaryBtn}>
                Explore Marketplace
                <ArrowRight size={18} />
              </Link>
              <Link href="/create" className={styles.heroSecondaryBtn}>
                Start Creating
              </Link>
            </div>

            {/* Stats */}
            <div className={styles.heroStats}>
              {STATS.map((stat) => (
                <div key={stat.label} className={styles.statItem}>
                  <stat.icon size={20} className={styles.statIcon} />
                  <div>
                    <p className={styles.statValue}>
                      <AnimatedCounter target={stat.value} />
                    </p>
                    <p className={styles.statLabel}>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Featured NFT */}
          <div className={styles.heroCard}>
            <div className={styles.heroCardInner}>
              <div className={styles.heroCardImage}>
                <Image
                  src="/images/RareNFT.jpg"
                  alt="Featured NFT - Genesis Oracle"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className={styles.heroNftImage}
                  priority
                />
                <div className={styles.heroCardOverlay}>
                  <div className={styles.liveTag}>
                    <span className={styles.liveDot} />
                    Live Auction
                  </div>
                </div>
              </div>
              <div className={styles.heroCardInfo}>
                <div className={styles.heroCardCollection}>
                  <span>Genesis Collection</span>
                  <BadgeCheck size={14} className={styles.verifiedSmall} />
                </div>
                <h3 className={styles.heroCardTitle}>Genesis Oracle #001</h3>
                <div className={styles.heroCardMeta}>
                  <div className={styles.heroCardPrice}>
                    <span className={styles.priceLabel}>Current Bid</span>
                    <span className={styles.priceVal}>
                      <span className={styles.ethSymbol}>◆</span> 2.45 ETH
                    </span>
                  </div>
                  <div className={styles.heroCardTimer}>
                    <span className={styles.priceLabel}>Ends In</span>
                    <span className={styles.timerVal}>
                      <Clock size={14} /> 2h 15m 32s
                    </span>
                  </div>
                </div>
                <button className={styles.heroCardBtn}>
                  Place Bid <ArrowRight size={16} />
                </button>
              </div>
            </div>
            {/* Glow effect behind card */}
            <div className={styles.heroCardGlow} />
          </div>
        </div>
      </section>

      {/* ============ TRENDING NFTS ============ */}
      <section className={styles.section} id="trending-section">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitleRow}>
            <TrendingUp size={22} className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Trending NFTs</h2>
          </div>
          <Link href="/marketplace" className={styles.seeAllLink}>
            View All <ChevronRight size={16} />
          </Link>
        </div>

        <div className={styles.nftGrid}>
          {TRENDING_NFTS.map((nft) => (
            <NFTCard key={nft.id} {...nft} />
          ))}
        </div>
      </section>

      {/* ============ TOP CREATORS ============ */}
      <section className={styles.section} id="creators-section">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitleRow}>
            <Flame size={22} className={styles.sectionIconWarm} />
            <h2 className={styles.sectionTitle}>Top Creators</h2>
          </div>
          <Link href="/creators" className={styles.seeAllLink}>
            See More <ChevronRight size={16} />
          </Link>
        </div>

        <div className={styles.creatorsGrid}>
          {TOP_CREATORS.map((creator, index) => (
            <div key={creator.handle} className={styles.creatorCard}>
              <span className={styles.creatorRank}>#{index + 1}</span>
              <div className={styles.creatorAvatarWrapper}>
                <Image
                  src={creator.avatar}
                  alt={creator.name}
                  width={52}
                  height={52}
                  className={styles.creatorAvatar}
                />
                <div className={styles.creatorVerified}>
                  <BadgeCheck size={14} />
                </div>
              </div>
              <div className={styles.creatorInfo}>
                <h4 className={styles.creatorName}>{creator.name}</h4>
                <p className={styles.creatorHandle}>{creator.handle}</p>
                <p className={styles.creatorVolume}>
                  <TrendingUp size={12} /> {creator.volume}
                </p>
              </div>
              <button
                className={`${styles.followButton} ${
                  creator.isFollowing ? styles.following : ""
                }`}
              >
                {creator.isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CATEGORIES ============ */}
      <section className={styles.section} id="categories-section">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitleRow}>
            <Sparkles size={22} className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Browse Categories</h2>
          </div>
        </div>

        <div className={styles.categoriesGrid}>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={`/marketplace?category=${cat.name.toLowerCase()}`}
              className={styles.categoryCard}
              style={{ "--cat-color": cat.color } as React.CSSProperties}
            >
              <div className={styles.categoryIconWrapper}>
                <cat.icon size={28} />
              </div>
              <h4 className={styles.categoryName}>{cat.name}</h4>
              <span className={styles.categoryCount}>{cat.count} items</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ LIVE AUCTIONS ============ */}
      <section className={styles.section} id="auctions-section">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitleRow}>
            <Clock size={22} className={styles.sectionIconDanger} />
            <h2 className={styles.sectionTitle}>Live Auctions</h2>
            <div className={styles.livePulse}>
              <span className={styles.livePulseDot} />
              Live
            </div>
          </div>
          <Link href="/marketplace?status=auction" className={styles.seeAllLink}>
            View All <ChevronRight size={16} />
          </Link>
        </div>

        <div className={styles.auctionGrid}>
          {LIVE_AUCTIONS.map((nft) => (
            <NFTCard key={nft.id} {...nft} />
          ))}
        </div>
      </section>

      {/* ============ CTA SECTION ============ */}
      <section className={styles.ctaSection} id="cta-section">
        <div className={styles.ctaBackground}>
          <div className={styles.ctaOrb1} />
          <div className={styles.ctaOrb2} />
        </div>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>
            Create & Sell Your{" "}
            <span className={styles.ctaTitleAccent}>Digital Masterpiece</span>
          </h2>
          <p className={styles.ctaDesc}>
            Join thousands of creators and collectors on ArtGenesis. Mint your
            first NFT in minutes with our intuitive creation tools.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/create" className={styles.ctaPrimaryBtn}>
              Start Creating <Sparkles size={18} />
            </Link>
            <Link href="/about" className={styles.ctaSecondaryBtn}>
              Learn More <ExternalLink size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
