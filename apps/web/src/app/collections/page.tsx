"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, BadgeCheck, TrendingUp, ChevronDown, Sparkles } from "lucide-react";
import styles from "./page.module.css";

const MOCK_COLLECTIONS = [
  { slug: "genesis-collection", name: "Genesis Collection", image: "/images/RareNFT.jpg", creator: "Hackatao", creatorAvatar: "/images/Hackatao.jpg", isVerified: true, floorPrice: "2.45", totalVolume: "1,234", items: 5000, owners: 2341 },
  { slug: "cosmic-series", name: "Cosmic Series", image: "/images/LiveAuction.jpg", creator: "Mike Parisella", creatorAvatar: "/images/Mike.jpg", isVerified: true, floorPrice: "1.80", totalVolume: "890", items: 3200, owners: 1876 },
  { slug: "nature-art", name: "Nature Art", image: "/images/Savana.jpg", creator: "Reza Afshar", creatorAvatar: "/images/Reeza.jpg", isVerified: false, floorPrice: "0.95", totalVolume: "456", items: 1500, owners: 890 },
  { slug: "skyborne-genesis", name: "Skyborne Genesis", image: "/images/Skyborne.png", creator: "Tobi Schnorpfeil", creatorAvatar: "/images/Tobi.jpg", isVerified: true, floorPrice: "3.20", totalVolume: "2,100", items: 8000, owners: 4532 },
  { slug: "neon-dreams", name: "Neon Dreams", image: "/images/RareNFT.jpg", creator: "Hackatao", creatorAvatar: "/images/Hackatao.jpg", isVerified: true, floorPrice: "0.78", totalVolume: "320", items: 2000, owners: 1200 },
  { slug: "abstract-realms", name: "Abstract Realms", image: "/images/LiveAuction.jpg", creator: "Mike Parisella", creatorAvatar: "/images/Mike.jpg", isVerified: false, floorPrice: "0.45", totalVolume: "180", items: 1000, owners: 650 },
];

export default function CollectionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("volume");

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}><Sparkles size={28} className={styles.titleIcon} /> Collections</h1>
            <p className={styles.subtitle}>Browse the top collections across all blockchains</p>
          </div>
          <div className={styles.controls}>
            <div className={styles.searchBar}>
              <Search size={16} />
              <input type="text" placeholder="Search collections..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={styles.searchInput} id="collections-search" />
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {MOCK_COLLECTIONS.map((col, i) => (
            <Link key={col.slug} href={`/collections/${col.slug}`} className={styles.card}>
              <div className={styles.cardImageWrapper}>
                <Image src={col.image} alt={col.name} fill className={styles.cardImage} sizes="(max-width: 768px) 100vw, 33vw" />
                <div className={styles.rank}>#{i + 1}</div>
              </div>
              <div className={styles.cardInfo}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardName}>{col.name}</h3>
                  {col.isVerified && <BadgeCheck size={16} className={styles.verified} />}
                </div>
                <div className={styles.cardCreator}>
                  <Image src={col.creatorAvatar} alt={col.creator} width={20} height={20} className={styles.creatorAv} />
                  <span>by {col.creator}</span>
                </div>
                <div className={styles.cardStats}>
                  <div><span className={styles.statLabel}>Floor</span><span className={styles.statValue}>◆ {col.floorPrice}</span></div>
                  <div><span className={styles.statLabel}>Volume</span><span className={styles.statValue}>{col.totalVolume} ETH</span></div>
                  <div><span className={styles.statLabel}>Items</span><span className={styles.statValue}>{col.items.toLocaleString()}</span></div>
                  <div><span className={styles.statLabel}>Owners</span><span className={styles.statValue}>{col.owners.toLocaleString()}</span></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
